// Verifies a translation-aware, no-account first visit and opt-in browser-voice demo. No speech/provider network calls.
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
const assert = require('node:assert/strict');
(async () => {
 const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args.filter(x => !x.includes('single-process') && !x.includes('in-process-gpu')), headless: true });
 try {
  for (const width of [320, 390, 1280]) {
   const page = await browser.newPage({ viewport: { width, height: 900 } });
   const errors = [], network = []; page.on('pageerror', e => errors.push(e.message));
   await page.addInitScript(() => {
    if (!sessionStorage.getItem('welcome-test-init')) { localStorage.clear(); sessionStorage.setItem('welcome-test-init', '1'); }
    window.turnstile = { render(_el, options) { queueMicrotask(() => options.callback('unused')); return 'demo'; }, remove() {} };
    window.SpeechRecognition = class { start() { window.recognizer = this; this.onstart?.(); } stop() { this.onend?.(); } abort() {} };
    window.speechSynthesis.speak = utterance => { window.utterance = utterance; }; window.speechSynthesis.cancel = () => {};
   });
   await page.route('https://**/*', route => { network.push(route.request().url()); return route.abort(); });
   await page.goto('http://127.0.0.1:8080');
   await page.waitForFunction(() => document.querySelector('[role=radio][aria-label=EN]')?.getAttribute('style')?.includes('rgb(37, 58, 39)')); assert.ok((await page.getByRole('radio', { name: 'EN', exact: true }).getAttribute('style')).includes('rgb(37, 58, 39)'), 'English browser locale selects an English first visit');
   await page.getByRole('radio', { name: 'EN', exact: true }).click();
   await page.getByRole('heading', { name: 'Less hesitation. More conversation.' }).waitFor();
   assert.equal(await page.getByRole('heading', { name: 'Less hesitation. More conversation.' }).count(), 1);
   await page.getByRole('radio', { name: 'RU', exact: true }).click();
   await page.getByText('Меньше сомнений.', { exact: true }).waitFor();
   await page.reload(); await page.getByText('Меньше сомнений.', { exact: true }).waitFor();
   await page.getByRole('radio', { name: 'EN', exact: true }).click();
   await page.getByRole('button', { name: /2\. Speak/ }).click();
   await page.getByRole('button', { name: 'Hear the question', exact: true }).click();
   assert.match(await page.evaluate(() => window.utterance.text), /Introduce yourself/i);
   await page.getByRole('button', { name: 'Try a 30-second speaking sample', exact: true }).click();
   const start = page.getByRole('button', { name: 'Speak for 30 seconds', exact: true });
   assert.equal(await start.isDisabled(), true, 'No microphone starts before browser-provider consent');
   await page.getByRole('switch', { name: 'Consent to browser speech processing', exact: true }).click();
   await start.click();
   const answer = 'I enjoy learning English because it helps me share new ideas. For example, I can speak with visitors in my city.';
   await page.evaluate(text => window.recognizer.onresult({ resultIndex: 0, results: [Object.assign([{ transcript: text }], { isFinal: false })] }), answer);
   await page.waitForFunction(text => document.querySelector('[aria-label="Try a speaking answer"]')?.value === text, answer);
   assert.equal(await page.getByLabel('Try a speaking answer', { exact: true }).inputValue(), answer);
   await page.getByRole('button', { name: 'Finish answer', exact: true }).click();
   await page.getByText(/You gave a reason\. Try adding one specific example\./, { exact: true }).waitFor();
   assert.equal(network.length, 0, 'Landing demo does not call backend/provider APIs directly');
   const overflow = await page.evaluate(() => [...document.querySelectorAll('div,button,input,textarea')].filter(el => { if (!el.getClientRects().length) return false; const r = el.getBoundingClientRect(); return r.width > innerWidth + 1 || r.left < -1 || r.right > innerWidth + 1; }).map(el => el.textContent?.slice(0, 50)));
   assert.deepEqual(overflow, []); assert.deepEqual(errors, []);
   console.log(`PASS ${width}px: first-run language picker, retained language, spoken prompt, browser-consent mic, interim transcript, instant reflection, no automatic upload, no horizontal overflow`);
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
