// Production-export smoke test for the interactive, non-saving lesson preview.
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
const assert = require('node:assert/strict');
(async () => {
  const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args.filter(x => !x.includes('single-process') && !x.includes('in-process-gpu')), headless: true });
  try {
    for (const width of [320, 390, 1280]) for (const language of ['en', 'uz', 'ru']) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = []; page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(({ language }) => localStorage.setItem('@levelup/display/v1', JSON.stringify({ language, theme: 'dark' })), { language });
      await page.goto('http://127.0.0.1:8080');
      await page.getByText('This is me', { exact: true }).waitFor();
      const names = language === 'en' ? ['Speak', 'Reflect', 'Do I need an account?'] : language === 'uz' ? ['Gapirish', 'Tahlil', 'Hisob ochishim kerakmi?'] : ['Речь', 'Разбор', 'Нужен ли аккаунт?'];
      await page.getByRole('button', { name: `2. ${names[0]}` }).click();
      await page.getByText('Introduce yourself to a new classmate.', { exact: false }).waitFor();
      await page.getByRole('button', { name: `3. ${names[1]}` }).click();
      await page.getByText('My name is Aziza.', { exact: false }).waitFor();
      const faq = page.getByRole('button', { name: names[2], exact: true });
      await faq.click(); assert.equal(await faq.getAttribute('aria-expanded'), 'true');
      await faq.click(); assert.equal(await faq.getAttribute('aria-expanded'), 'false');
      const bad = await page.evaluate(() => [...document.querySelectorAll('div')].filter(el => { const r = el.getBoundingClientRect(); return el.getClientRects().length && (r.right > innerWidth + 1 || r.left < -1); }).map(el => el.textContent.slice(0, 50)));
      assert.deepEqual(bad, []); assert.deepEqual(errors, []);
      assert.equal(await page.evaluate(() => localStorage.getItem('@levelup/learner/v1')), null);
      await page.evaluate(() => document.querySelectorAll('div').forEach(el => { if (el.scrollHeight > el.clientHeight) el.scrollTop = 0; }));
      if (language === 'en') await page.screenshot({ path: `/home/user/levelup-startup-${width}.png`, fullPage: true });
      console.log(`PASS ${width}px ${language}: lesson preview, FAQ, no overflow, no saved progress`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
