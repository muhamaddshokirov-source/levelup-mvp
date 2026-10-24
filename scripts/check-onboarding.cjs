// Optional browser smoke test; see check-mobile.cjs for dependencies.
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
(async () => {
  const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  try {
    const page = await browser.newPage();
    const checkWidth = async label => {
      const errors = await page.evaluate(() => [...document.querySelectorAll('div,input,textarea')].filter(el => {
        if (!el.getClientRects().length || el.closest('[role="tab"]') || el.querySelector('[role="tab"]')) return false;
        const r = el.getBoundingClientRect(); return r.width > innerWidth + 1 || r.right > innerWidth + 1 || r.left < -1;
      }).map(el => el.textContent?.slice(0, 60)));
      if (errors.length) throw new Error(`${label}: ${JSON.stringify(errors.slice(0, 5))}`);
    };
    await page.goto('http://127.0.0.1:8080');
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      await page.evaluate(() => localStorage.clear()); await page.reload();
      await page.getByText('LEVELUP’GA XUSH KELIBSIZ', { exact: true }).waitFor();
      await checkWidth('welcome');
      await page.getByText('O‘zimga mos reja tuzaman', { exact: true }).click();
      await page.getByLabel('Ismingiz', { exact: true }).fill('Aziza');
      await page.getByText('Ish va suhbatga tayyorlanish', { exact: true }).click();
      await checkWidth('profile');
      await page.getByText('Davom etish', { exact: true }).click();
      await page.getByText('B1 · Fikrimni sabab va misollar bilan aytaman', { exact: true }).click();
      await checkWidth('level');
      await page.getByText('Davom etish', { exact: true }).click();
      await page.getByText('5 kun', { exact: true }).click();
      await page.getByText('30 daqiqa', { exact: true }).click();
      await checkWidth('schedule');
      await page.getByText('Davom etish', { exact: true }).click();
      await page.getByText('So‘z topishda qiynalaman', { exact: true }).click();
      await page.getByText('8 haftalik maqsad', { exact: true }).click();
      await checkWidth('goals');
      await page.getByText('Shaxsiy rejamni yaratish', { exact: true }).click();
      await page.getByText('5 kun × 30 daqiqa', { exact: true }).waitFor();
      await checkWidth('plan');
      const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('@levelup/learner/v1')));
      if (saved.name !== 'Aziza' || saved.level !== 'B1' || saved.days !== 5 || saved.minutes !== 30 || saved.weeks !== 8 || saved.goal !== 'work') throw new Error('Saved profile mismatch');
      await page.reload();
      await page.getByText('5 kun × 30 daqiqa', { exact: true }).waitFor();
      await page.getByText('B1 darslaridan boshlash', { exact: true }).click();
      await page.getByText('A plan worth pursuing', { exact: true }).waitFor();
      await page.getByText('Yana', { exact: true }).click();
      await page.getByText('Profil', { exact: true }).click();
      await page.getByText('Maqsad va vaqtni qayta tanlash', { exact: true }).click();
      await page.getByLabel('Ismingiz', { exact: true }).fill('Changed');
      await page.getByText('O‘zgartirmasdan qaytish', { exact: true }).click();
      const name = await page.evaluate(() => JSON.parse(localStorage.getItem('@levelup/learner/v1')).name);
      if (name !== 'Aziza') throw new Error('Cancel changed saved profile');
      console.log(`PASS ${width}px welcome → questionnaire → saved plan → B1 lesson → edit/cancel`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
