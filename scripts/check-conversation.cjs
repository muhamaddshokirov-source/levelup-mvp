// Mocked speech/verification/provider UI integration. Does NOT test real microphone/vendor services.
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
    window.turnstile = { render(_el, opts) { setTimeout(() => opts.callback('test-token'), 0); return 'mock'; }, remove() {} };
    window.speechCalls = []; window.voiceAborts = 0;
    window.SpeechRecognition = class { start() { window.currentRecognition = this; this.onstart?.(); } stop() { this.onend?.(); } abort() { window.voiceAborts++; } };
    window.speechSynthesis.speak = utterance => window.speechCalls.push(utterance.text);
    window.speechSynthesis.cancel = () => {};
   });
   let bodies = [], fail = false;
   await page.route('https://levelup-coach-qlta.onrender.com/health', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ service: 'LevelUp Coach', status: 'online', capabilities: ['feedback', 'conversation', 'assistant'] }) }));
   await page.route('https://levelup-coach-qlta.onrender.com/feedback', async route => {
    const input = route.request().postDataJSON(); bodies.push(input);
    await route.fulfill({ status: fail ? 429 : 200, contentType: 'application/json', body: JSON.stringify(fail ? { code: 'GEMINI_QUOTA' } : { mode: 'conversation', feedback: 'That sounds interesting. What do you enjoy most about it?' }) });
   });
   await page.goto('http://127.0.0.1:8080');
   await page.getByRole('tab', { name: 'AI tutor', exact: true }).click();
   const send = page.getByRole('button', { name: 'Send reply', exact: true });
   assert.equal(await send.isEnabled(), false);
   await page.getByRole('switch', { name: 'Consent to AI conversation', exact: true }).click();
   await page.getByRole('switch', { name: 'Consent to browser voice services', exact: true }).click();
   await page.getByRole('button', { name: 'Speak your reply', exact: true }).click();
   await page.evaluate(() => { const r = window.currentRecognition; r.onresult({ results: [[{ transcript: 'I enjoy cooking with my friends.' }]] }); r.onend(); });
   const draft = page.getByLabel('Conversation reply', { exact: true });
   await page.waitForFunction(() => document.querySelector('[aria-label="Conversation reply"]')?.value.includes('cooking'));
   assert.match(await draft.inputValue(), /cooking/);
   await send.click();
   await page.getByText('That sounds interesting. What do you enjoy most about it?', { exact: true }).waitFor();
   assert.equal(bodies[0].mode, 'conversation'); assert.equal(bodies[0].history.length, 1);
   assert.deepEqual(await page.evaluate(() => window.speechCalls), ['That sounds interesting. What do you enjoy most about it?']);
   await draft.fill('I like learning new recipes.'); await send.click();
   await page.getByText('2 / 6', { exact: true }).waitFor();
   assert.equal(bodies[1].history.length, 3); assert.equal(bodies[1].history[1].role, 'user');
   fail = true; await draft.fill('Please keep my answer if the request fails.'); await send.click();
   await page.getByRole('alert').waitFor(); assert.match(await draft.inputValue(), /keep my answer/);
   fail = false;
   await page.getByRole('button', { name: 'Travel', exact: true }).click();
   await page.getByText('Welcome! Where would you like to travel, and why?', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'Speak your reply', exact: true }).click();
   const before = await page.evaluate(() => window.voiceAborts);
   await page.getByRole('tab', { name: 'Today', exact: true }).click();
   assert.ok(await page.evaluate(() => window.voiceAborts) > before);
   await page.getByRole('tab', { name: 'AI tutor', exact: true }).click();
   assert.equal(await page.getByRole('button', { name: 'Stop microphone', exact: true }).count(), 0);
   await page.getByRole('button', { name: 'Writing feedback', exact: true }).click();
   await page.getByLabel('Answer for AI feedback', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'AI conversation', exact: true }).click();
   const bad = await page.evaluate(() => [...document.querySelectorAll('div,input,textarea')].filter(el => { if (!el.getClientRects().length) return false; const r = el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; }).map(el => el.textContent.slice(0, 45)));
   assert.deepEqual(bad, []); assert.deepEqual(errors, []);
   await page.close(); console.log(`PASS ${width}px: mocked dictation/playback, history, consent, quota retry, topics, tab cleanup, feedback fallback, layout`);
  }
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
