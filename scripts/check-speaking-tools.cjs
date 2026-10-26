// Mocked microphone permission and recording API. Real device recording quality is not asserted.
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
const assert = require('node:assert/strict');
(async () => {
 const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args.filter(x => !x.includes('single-process') && !x.includes('in-process-gpu')), headless: true });
 try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.addInitScript(() => {
   localStorage.setItem('@levelup/display/v1', JSON.stringify({ language: 'en', theme: 'dark' }));
   localStorage.setItem('@levelup/learner/v1', JSON.stringify({ version: 1, name: 'Tester', goal: 'conversation', level: 'A1', days: 3, minutes: 20, weeks: 4, challenge: 'confidence' }));
   window.mediaCalls = 0; window.recordingStarts = 0; window.tracksStopped = 0;
   Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia() { window.mediaCalls++; return new Promise(resolve => { window.allowMedia = () => resolve({ getTracks: () => [{ stop() { window.tracksStopped++; } }] }); }); } } });
   window.MediaRecorder = class {
    constructor() { this.state = 'inactive'; this.mimeType = 'audio/webm'; }
    start() { this.state = 'recording'; window.recordingStarts++; }
    stop() { this.state = 'inactive'; this.ondataavailable?.({ data: new Blob(['mock-audio'], { type: 'audio/webm' }) }); this.onstop?.(); }
   };
  });
  await page.goto('http://127.0.0.1:8080');
  await page.getByRole('tab', { name: 'Today', exact: true }).click();
  const tools = page.getByText('Speaking tools · Timer & recorder', { exact: true });
  await tools.click();
  await page.getByRole('button', { name: 'Start speaking', exact: true }).click();
  await page.getByRole('button', { name: 'Pause', exact: true }).waitFor();
  await page.getByRole('tab', { name: 'AI tutor', exact: true }).click();
  await page.getByRole('tab', { name: 'Today', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Pause', exact: true }).count(), 0);
  const record = page.getByRole('button', { name: 'Record voice', exact: true });
  await record.click();
  await page.waitForFunction(() => window.mediaCalls === 1);
  await tools.click(); // close while permission request is pending
  await page.evaluate(() => window.allowMedia());
  await page.waitForFunction(() => window.tracksStopped > 0);
  assert.equal(await page.evaluate(() => window.recordingStarts), 0);
  await tools.click(); await record.click();
  await page.waitForFunction(() => window.mediaCalls === 2);
  await page.evaluate(() => window.allowMedia());
  await page.getByRole('button', { name: 'Stop recording', exact: true }).waitFor();
  assert.equal(await page.evaluate(() => window.recordingStarts), 1);
  await page.getByText('0:01', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Stop recording', exact: true }).click();
  await page.locator('audio').waitFor();
  assert.match(await page.locator('audio').getAttribute('src'), /^blob:/);
  assert.ok(await page.evaluate(() => window.tracksStopped) >= 2);
  console.log('PASS speaking tools: timer pauses on navigation, late microphone permission does not start hidden recording, real elapsed UI, local audio blob and stopped tracks');
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
