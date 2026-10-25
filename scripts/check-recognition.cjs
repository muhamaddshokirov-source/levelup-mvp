// Regression test for mobile-like recognition: interim-only, cumulative results and missing end events.
// Speech, verification and API are mocked. This does not verify device recognition accuracy.
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
    window.turnstile = { render(_el, options) { setTimeout(() => options.callback('test'), 0); return 'test'; }, remove() {} };
    window.SpeechRecognition = class {
     start() { window.r = this; if (!window.noStart) this.onstart?.(); }
     stop() {} // Simulate mobile engines that fail to emit a final result or onend.
     abort() {}
    };
    window.speechSynthesis.speak = utterance => { window.u = utterance; };
    window.speechSynthesis.cancel = () => {};
   });
   const requests = [];
   await page.route('https://levelup-coach-qlta.onrender.com/feedback', async route => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ mode: 'conversation', feedback: 'Nice. What do you like about that?' }) });
   });
   await page.goto('http://127.0.0.1:8080');
   await page.getByRole('tab', { name: 'AI tutor', exact: true }).click();
   await page.getByRole('switch', { name: 'Consent to AI conversation', exact: true }).click();
   await page.getByRole('switch', { name: 'Consent to browser voice services', exact: true }).click();
   const draft = page.getByLabel('Conversation reply', { exact: true });
   await draft.fill('Earlier words.');
   await page.getByRole('button', { name: 'Speak your reply', exact: true }).click();
   await page.evaluate(() => {
    const result = (text, final = false) => Object.assign([{ transcript: text }], { isFinal: final });
    window.r.onresult({ resultIndex: 0, results: [result('I like cat')] });
    window.r.onresult({ resultIndex: 0, results: [result('I like cooking.', true), result('With my')] });
    window.r.onresult({ resultIndex: 1, results: [result('I like cooking.', true), result('With my friends.')] });
   });
   await page.waitForFunction(() => document.querySelector('[aria-label="Conversation reply"]').value === 'Earlier words. I like cooking. With my friends.');
   await page.getByRole('button', { name: 'Stop microphone', exact: true }).click();
   await page.getByRole('button', { name: 'Speak your reply', exact: true }).waitFor();
   assert.equal(await draft.inputValue(), 'Earlier words. I like cooking. With my friends.');
   assert.equal(requests.length, 0);
   await page.getByRole('button', { name: 'Start conversation', exact: true }).click();
   await page.evaluate(() => window.u.onend());
   await page.getByText('Listening — your turn', { exact: true }).waitFor();
   await page.evaluate(() => {
    window.r.onresult({ results: [Object.assign([{ transcript: 'I enjoy travelling.' }], { isFinal: false })] });
   });
   await page.waitForFunction(() => document.querySelector('[aria-label="Conversation reply"]').value === 'I enjoy travelling.');
   // Silence timer + fallback must submit interim text exactly once, even without onend.
   await page.getByText('Nice. What do you like about that?', { exact: true }).waitFor();
   assert.equal(requests.length, 1); assert.equal(requests[0].answer, 'I enjoy travelling.');
   await page.evaluate(() => window.u.onend());
   await page.getByText('Listening — your turn', { exact: true }).waitFor();
   await page.evaluate(() => { window.r.onresult({ results: [[{ transcript: 'Do not lose these words.' }]] }); window.r.onerror({ error: 'network' }); });
   await page.getByText('The browser speech service could not connect. Check your internet connection or type your reply.', { exact: true }).waitFor();
   assert.equal(await draft.inputValue(), 'Do not lose these words.'); assert.equal(requests.length, 1);
   await page.getByText('Ready when you are', { exact: true }).waitFor();
   if (width === 320) {
    await page.evaluate(() => { window.noStart = true; });
    await page.getByRole('button', { name: 'Start conversation', exact: true }).click();
    await page.evaluate(() => window.u.onend());
    await page.getByText('Opening microphone…', { exact: true }).first().waitFor();
    assert.equal(await page.getByText('Listening — your turn', { exact: true }).count(), 0);
    await page.getByText('Speech recognition did not start. Check microphone permission or use a supported browser.', { exact: true }).waitFor();
    assert.equal(requests.length, 1);
   }
   assert.deepEqual(errors, []);
   console.log(`PASS ${width}px: live interim correction, resultIndex/multiple segments, manual draft preservation, silence auto-send, missing end fallback, network error without auto-send${width === 320 ? ', actual microphone-start timeout' : ''}`);
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
