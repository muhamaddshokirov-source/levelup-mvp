// Mocked Gemini/Turnstile/speech. Tests real local workout persistence, navigation and IELTS timers.
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
const assert = require('node:assert/strict');
(async () => {
 const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args.filter(x => !x.includes('single-process') && !x.includes('in-process-gpu')), headless: true });
 try {
  for (const width of [320, 390, 1280]) {
   const page = await browser.newPage({ viewport: { width, height: 900 } });
   const errors = []; page.on('pageerror', error => errors.push(error.message));
   await page.clock.install();
   await page.addInitScript(() => {
    localStorage.setItem('@levelup/display/v1', JSON.stringify({ language: 'en', theme: 'dark' }));
    localStorage.setItem('@levelup/learner/v1', JSON.stringify({ version: 1, name: 'Tester', goal: 'conversation', level: 'A1', days: 3, minutes: 20, weeks: 4, challenge: 'confidence' }));
    window.turnstile = { render(_el, options) { queueMicrotask(() => options.callback('test')); return 'test'; }, remove() {} };
    window.SpeechRecognition = class { start() { window.recognizer = this; window.recognizerStops = 0; this.onstart?.(); } stop() { window.recognizerStops++; this.onend?.(); } abort() {} };
    window.speechSynthesis.speak = utterance => { window.utterance = utterance; }; window.speechSynthesis.cancel = () => {};
   });
   let requests = [], quota = false;
   await page.route('https://levelup-coach-qlta.onrender.com/feedback', async route => { const input = route.request().postDataJSON(); requests.push(input); await route.fulfill({ status: quota ? 429 : 200, contentType: 'application/json', body: JSON.stringify(quota ? { code: 'GEMINI_QUOTA' } : { mode: input.mode, feedback: 'Start with one clear idea. Add a reason and a personal example, then practise saying it aloud.' }) }); });
   await page.goto('http://127.0.0.1:8080');
   await page.getByRole('button', { name: "Start today's workout", exact: true }).click();
   await page.getByRole('button', { name: 'I warmed up · Continue', exact: true }).click();
   await page.getByLabel('Your English answer', { exact: true }).fill('I enjoy practising English because it helps me explain my ideas and connect with new people. For example, I can share stories with a friend.');
   await page.getByRole('button', { name: 'Finish practice', exact: true }).click();
   await page.getByText('Daily challenge complete!', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'Continue to the stretch', exact: true }).click();
   await page.getByLabel('Stretch answer', { exact: true }).fill('Another perspective is that small daily habits are easier to maintain than long sessions.');
   await page.getByRole('button', { name: 'Finish stretch', exact: true }).click();
   await page.getByText('Stretch saved. Your ideas went a little further.', { exact: true }).waitFor();
   const stored = await page.evaluate(() => ({ workout: JSON.parse(localStorage.getItem('@levelup/workout/v1')), practice: JSON.parse(localStorage.getItem('@levelup/practice/v1')) }));
   assert.equal(stored.practice.sessions.length, 1); assert.equal(stored.practice.sessions[0].xp, 50);
   assert.equal(Object.values(stored.workout.days)[0].warmup, true); assert.equal(Object.values(stored.workout.days)[0].stretch, true);
   await page.reload();
   await page.getByText('3 / 3 activities', { exact: true }).waitFor();
   await page.evaluate(() => document.querySelectorAll('div').forEach(el => { if (el.scrollHeight > el.clientHeight) el.scrollTop = 0; }));
   await page.screenshot({ path: `/home/user/levelup-workout-${width}.png`, fullPage: true });
   await page.waitForFunction(() => [...document.querySelectorAll('img')].some(image => image.src.includes('ielts-places') && image.complete && image.naturalWidth > 0));
   await page.getByRole('button', { name: 'Open IELTS practice', exact: true }).click();
   await page.waitForFunction(() => ['ielts-home', 'ielts-learning', 'ielts-places'].every(name => [...document.querySelectorAll('img')].some(image => image.src.includes(name) && image.complete && image.naturalWidth > 0)));
   await page.getByRole('button', { name: 'Part 2', exact: true }).click();
   await page.getByLabel('IELTS preparation notes', { exact: true }).fill('gift, birthday, useful, important');
   await page.getByRole('button', { name: 'Start preparation', exact: true }).click();
   await page.clock.fastForward(60000);
   await page.getByText('Long turn · Up to 2 minutes', { exact: true }).waitFor();
   await page.getByRole('switch', { name: 'Consent to IELTS browser voice', exact: true }).click();
   await page.getByRole('button', { name: 'Start speaking timer', exact: true }).click();
   await page.getByRole('button', { name: 'Dictate my answer', exact: true }).click();
   const answer = 'My favourite possession is a notebook that my friend gave me. I use it to write down ideas and memories because it helps me remember important moments in my life.';
   await page.evaluate(text => window.recognizer.onresult({ results: [Object.assign([{ transcript: text }], { isFinal: false })] }), answer);
   await page.clock.fastForward(3000);
   assert.equal(await page.evaluate(() => window.recognizerStops), 0); // long turn does not stop at short pauses
   await page.clock.fastForward(117000);
   await page.getByText('Time complete · Your answer is kept', { exact: true }).waitFor();
   assert.equal(await page.getByLabel('IELTS answer', { exact: true }).inputValue(), answer);
   await page.getByRole('button', { name: 'Review this IELTS answer with AI', exact: true }).click();
   assert.equal(await page.getByLabel('Answer for AI feedback', { exact: true }).inputValue(), answer);
   assert.match(await page.getByLabel('Practice question', { exact: true }).inputValue(), /Part 2/);
   assert.equal(requests.length, 0);
   await page.getByRole('button', { name: 'IELTS speaking', exact: true }).click();
   assert.equal(await page.getByLabel('IELTS preparation notes', { exact: true }).inputValue(), 'gift, birthday, useful, important');
   await page.getByRole('button', { name: 'Part 1', exact: true }).click();
   await page.getByRole('button', { name: 'Next question', exact: true }).click();
   await page.getByText('What’s the most interesting part of your town/village?', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'Part 3', exact: true }).click();
   await page.getByText('What kind of things give status to people in your country?', { exact: true }).waitFor();
   await page.getByRole('button', { name: 'Learning & opportunities', exact: true }).click();
   await page.getByText('Original LevelUp questions using the IELTS task format. Not official exam questions.', { exact: true }).waitFor();
   await page.evaluate(() => document.querySelectorAll('div').forEach(el => { if (el.scrollHeight > el.clientHeight) el.scrollTop = 0; }));
   await page.screenshot({ path: `/home/user/levelup-ielts-${width}.png`, fullPage: true });
   await page.getByRole('button', { name: 'AI assistant', exact: true }).click();
   await page.getByRole('button', { name: 'Build a 10-minute speaking plan', exact: true }).click();
   assert.match(await page.getByLabel('Ask the AI assistant', { exact: true }).inputValue(), /ten-minute/); assert.equal(requests.length, 0);
   await page.getByRole('switch', { name: 'Consent to assistant text', exact: true }).click();
   await page.getByRole('button', { name: 'Ask assistant', exact: true }).click();
   await page.getByText('Start with one clear idea. Add a reason and a personal example, then practise saying it aloud.', { exact: true }).waitFor();
   assert.equal(requests[0].mode, 'assistant'); assert.equal(requests[0].language, 'en');
   quota = true; await page.getByLabel('Ask the AI assistant', { exact: true }).fill('Keep this draft if the service is busy.');
   await page.getByRole('button', { name: 'Ask assistant', exact: true }).click();
   await page.getByRole('alert').filter({ visible: true }).first().waitFor();
   assert.equal(await page.getByLabel('Ask the AI assistant', { exact: true }).inputValue(), 'Keep this draft if the service is busy.');
   const overflow = await page.evaluate(() => [...document.querySelectorAll('div,button,input,textarea')].filter(el => { if (!el.getClientRects().length) return false; const r = el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; }).map(el => el.textContent?.slice(0, 40)));
   assert.deepEqual(overflow, []); assert.deepEqual(errors, []);
   console.log(`PASS ${width}px: persisted 3-step workout, XP once, IELTS 60/120 timers, long dictation/notes, all parts/sources, consent-gated review, assistant and quota draft`);
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
