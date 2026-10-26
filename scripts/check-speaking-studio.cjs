// Mocked provider/verification, real local notebook persistence and navigation.
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
const assert = require('node:assert/strict');
(async () => {
 const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args.filter(x => !x.includes('single-process') && !x.includes('in-process-gpu')), headless: true });
 try {
  for (const width of [320, 390, 1280]) {
   const page = await browser.newPage({ viewport: { width, height: 900 } });
   const errors = []; page.on('pageerror', e => errors.push(e.message));
   await page.addInitScript(() => {
    localStorage.setItem('@levelup/display/v1', JSON.stringify({ language: 'en', theme: 'dark' }));
    localStorage.setItem('@levelup/learner/v1', JSON.stringify({ version: 1, name: 'Tester', goal: 'conversation', level: 'A1', days: 3, minutes: 20, weeks: 4, challenge: 'confidence' }));
    window.turnstile = { render(_el, options) { setTimeout(() => options.callback('test'), 0); return 'test'; }, remove() {} };
   });
   const requests = [];
   await page.route('https://levelup-coach-qlta.onrender.com/feedback', async route => {
    requests.push(route.request().postDataJSON()); await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ mode: 'conversation', feedback: 'Of course. Would you like anything else with your order?' }) });
   });
   await page.goto('http://127.0.0.1:8080');
   await page.getByRole('tab', { name: 'AI tutor', exact: true }).click();
   await page.getByText('LEVELUP SPEAKING STUDIO', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'More situations', exact: true }).click();
   await page.getByRole('button', { name: 'At a café', exact: true }).click();
   await page.getByText('Good morning! What would you like to order today?', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'Practice settings', exact: true }).click();
   await page.getByRole('button', { name: 'Practice level B2', exact: true }).click();
   assert.equal(await page.getByRole('button', { name: 'Practice level B2', exact: true }).getAttribute('aria-pressed'), 'true');
   await page.getByRole('button', { name: 'Voice pace: relaxed', exact: true }).click();
   await page.getByRole('button', { name: 'Voice pace: normal', exact: true }).waitFor();
   await page.getByRole('button', { name: 'Help me respond', exact: true }).click();
   await page.getByRole('button', { name: 'Use this example as a draft', exact: true }).click();
   const draft = page.getByLabel('Conversation reply', { exact: true });
   assert.match(await draft.inputValue(), /Could I have a coffee/);
   assert.equal(requests.length, 0);
   await page.getByRole('button', { name: 'Save phrase to notebook', exact: true }).first().click();
   await page.getByRole('button', { name: 'Saved in your notebook', exact: true }).waitFor();
   const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('@levelup/vocabulary/v1')));
   assert.equal(stored.entries[0].word, 'Could I have'); assert.ok(stored.entries[0].meaning);
   await page.getByRole('switch', { name: 'Consent to AI conversation', exact: true }).click();
   const answer = 'Could I have a coffee and a sandwich please? I would like my coffee without sugar because I prefer its natural taste. Do you have any vegetarian sandwiches available today?';
   await draft.fill(answer);
   await page.getByRole('button', { name: 'Send reply', exact: true }).click();
   await page.getByText('Of course. Would you like anything else with your order?', { exact: true }).waitFor();
   assert.equal(requests.length, 1); assert.equal(requests[0].level, 'B2'); assert.match(requests[0].question, /café server/);
   await page.getByText('03 · Reflect and improve', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'Get AI feedback on my conversation', exact: true }).click();
   assert.match(await page.getByLabel('Answer for AI feedback', { exact: true }).inputValue(), /natural taste/);
   assert.match(await page.getByLabel('Practice question', { exact: true }).inputValue(), /self-selected B2/);
   assert.equal(requests.length, 1); // review must not submit text before consent/verification
   await page.getByRole('tab', { name: 'Words', exact: true }).click();
   await page.getByText('Could I have', { exact: true }).filter({ visible: true }).waitFor();
   await page.reload();
   await page.getByRole('tab', { name: 'Words', exact: true }).click();
   await page.getByText('Could I have', { exact: true }).filter({ visible: true }).waitFor();
   await page.getByRole('tab', { name: 'AI tutor', exact: true }).click();
   await page.evaluate(() => document.querySelectorAll('div').forEach(el => { if (el.scrollHeight > el.clientHeight) el.scrollTop = 0; }));
   await page.screenshot({ path: `/home/user/levelup-speaking-studio-${width}.png`, fullPage: true });
   assert.deepEqual(errors, []);
   console.log(`PASS ${width}px: six scenarios, level/pace, non-sending hint, saved phrase persists, real summary, approved review handoff`);
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
