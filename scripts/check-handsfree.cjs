// Mocked browser services only: no live microphone, paid API or vendor speech requests.
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
const assert = require('node:assert/strict');
(async () => {
 const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args.filter(x => !x.includes('single-process') && !x.includes('in-process-gpu')), headless: true });
 try {
  for (const width of [320, 390, 1280]) {
   const page = await browser.newPage({ viewport: { width, height: 844 } });
   const errors = []; page.on('pageerror', error => errors.push(error.message));
   await page.addInitScript(() => {
    localStorage.setItem('@levelup/display/v1', JSON.stringify({ language: 'en', theme: 'dark' }));
    localStorage.setItem('@levelup/learner/v1', JSON.stringify({ version: 1, name: 'Tester', goal: 'conversation', level: 'A1', days: 3, minutes: 20, weeks: 4, challenge: 'confidence' }));
    window.turnstile = { render(_el, options) { window.verification = options; setTimeout(() => options.callback('test-token'), 0); return 'test'; }, remove() {} };
    window.starts = 0; window.aborts = 0;
    window.SpeechRecognition = class {
     start() { window.starts++; window.recognition = this; }
     stop() { this.onend?.(); }
     abort() { window.aborts++; }
    };
    window.speechSynthesis.speak = utterance => { window.utterance = utterance; };
    window.speechSynthesis.cancel = () => {};
   });
   let requests = [], quota = false, hold = false, release;
   await page.route('https://levelup-coach-qlta.onrender.com/feedback', async route => {
    requests.push(route.request().postDataJSON());
    if (hold) await new Promise(resolve => { release = resolve; });
    await route.fulfill({ status: quota ? 429 : 200, contentType: 'application/json', body: JSON.stringify(quota ? { code: 'GEMINI_QUOTA' } : { mode: 'conversation', feedback: `Interesting answer ${requests.length}. What else do you enjoy?` }) }).catch(() => {});
   });
   await page.goto('http://127.0.0.1:8080');
   await page.getByRole('tab', { name: 'AI tutor', exact: true }).click();
   const start = page.getByRole('button', { name: 'Start conversation', exact: true });
   assert.equal(await start.isEnabled(), false);
   await page.getByRole('switch', { name: 'Consent to AI conversation', exact: true }).click();
   assert.equal(await start.isEnabled(), false);
   await page.getByRole('switch', { name: 'Consent to browser voice services', exact: true }).click();
   await start.click();
   await page.getByText('AI is speaking…', { exact: true }).waitFor();
   assert.equal(await page.evaluate(() => window.starts), 0);
   for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.utterance.onend());
    await page.getByText('Listening — your turn', { exact: true }).waitFor();
    assert.equal(await page.evaluate(() => window.starts), i + 1);
    await page.evaluate(i => { const r = window.recognition; r.onresult({ results: [[{ transcript: `I enjoy this practice number ${i}.` }]] }); r.onend(); r.onend?.(); }, i);
    await page.getByText(`Interesting answer ${i + 1}. What else do you enjoy?`, { exact: true }).waitFor();
    await page.getByText('AI is speaking…', { exact: true }).waitFor();
    assert.equal(requests.length, i + 1);
    assert.equal(requests[i].history.length, 1 + i * 2);
   }
   await page.evaluate(() => window.utterance.onend());
   await page.getByText('Ready when you are', { exact: true }).waitFor();
   assert.equal(await start.isEnabled(), false);
   await page.getByRole('button', { name: 'New conversation', exact: true }).click();
   await start.click(); await page.getByText('AI is speaking…', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'End conversation', exact: true }).click();
   await page.evaluate(() => window.utterance.onend()); // stale completion cannot restart the mic
   assert.equal(await page.evaluate(() => window.starts), 6);
   await start.click(); await page.evaluate(() => window.utterance.onend());
   await page.getByText('Listening — your turn', { exact: true }).waitFor();
   await page.evaluate(() => window.recognition.onend());
   await page.getByText('No speech detected. Start again when you are ready.', { exact: true }).waitFor();
   assert.equal(requests.length, 6);
   await start.click(); await page.evaluate(() => window.utterance.onend());
   await page.getByText('Listening — your turn', { exact: true }).waitFor();
   await page.evaluate(() => window.recognition.onerror({ error: 'not-allowed' }));
   await page.getByText('Ready when you are', { exact: true }).waitFor();
   assert.equal(requests.length, 6);
   await start.click(); await page.evaluate(() => window.utterance.onend());
   await page.getByText('Listening — your turn', { exact: true }).waitFor();
   const before = await page.evaluate(() => window.aborts);
   await page.getByRole('tab', { name: 'Today', exact: true }).click();
   assert.ok(await page.evaluate(() => window.aborts) > before);
   await page.getByRole('tab', { name: 'AI tutor', exact: true }).click();
   await page.getByText('Ready when you are', { exact: true }).waitFor();
   await start.click(); await page.evaluate(() => window.utterance.onend());
   await page.getByText('Listening — your turn', { exact: true }).waitFor();
   await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
   await page.getByText('Ready when you are', { exact: true }).waitFor();
   await page.evaluate(() => Object.defineProperty(document, 'hidden', { configurable: true, value: false }));
   quota = true;
   await start.click(); await page.evaluate(() => window.utterance.onend());
   await page.getByText('Listening — your turn', { exact: true }).waitFor();
   await page.evaluate(() => { window.recognition.onresult({ results: [[{ transcript: 'Keep this answer on failure.' }]] }); window.recognition.onend(); });
   await page.getByRole('alert').filter({ hasText: /./ }).first().waitFor();
   await page.getByText('Ready when you are', { exact: true }).waitFor();
   assert.equal(requests.length, 7);
   assert.equal(await page.getByLabel('Conversation reply', { exact: true }).inputValue(), 'Keep this answer on failure.');
   quota = false; hold = true;
   await page.getByRole('button', { name: 'Travel', exact: true }).click();
   await start.click(); await page.evaluate(() => window.utterance.onend());
   await page.getByText('Listening — your turn', { exact: true }).waitFor();
   await page.evaluate(() => {
    window.verification['expired-callback']();
   });
   await page.evaluate(() => { window.recognition.onresult({ results: [[{ transcript: 'I want to visit Japan.' }]] }); window.recognition.onend(); });
   await page.getByText('Waiting for security verification…', { exact: true }).waitFor();
   assert.equal(requests.length, 7);
   await page.evaluate(() => window.verification.callback('fresh-token'));
   await page.getByText('AI is thinking…', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'End conversation', exact: true }).click();
   if (release) release();
   await page.waitForFunction(() => [...document.querySelectorAll('[role="button"]')].some(el => el.textContent.includes('Start conversation') && el.getAttribute('aria-disabled') !== 'true'));
   assert.equal(await page.getByText('AI is speaking…', { exact: true }).count(), 0);
   await page.getByText('0 / 6', { exact: true }).waitFor();
   assert.deepEqual(errors, []);
   console.log(`PASS ${width}px: automatic 6-turn loop, no echo listening, consent, cap, stop/stale callbacks, silence, denial, navigation, hidden tab, quota no retry, verification wait, cancel in-flight`);
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
