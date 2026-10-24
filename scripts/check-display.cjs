// Optional Playwright smoke test. Run against the exported site on port 8080.
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
const assert = require('node:assert/strict');
(async () => {
  const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 320, height: 844 } });
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:8080');
    await page.evaluate(() => localStorage.clear()); await page.reload();
    await page.getByLabel('Ko‘rinish va til', { exact: true }).click();
    await page.getByRole('radio', { name: 'Русский', exact: true }).click();
    await page.getByText('Оформление и язык', { exact: true }).waitFor();
    await page.getByRole('radio', { name: 'Светлая', exact: true }).click();
    await page.getByLabel('Закрыть', { exact: true }).click();
    await page.getByText('ДОБРО ПОЖАЛОВАТЬ В LEVELUP', { exact: true }).waitFor();
    await page.reload();
    await page.getByText('ДОБРО ПОЖАЛОВАТЬ В LEVELUP', { exact: true }).waitFor();
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('@levelup/display/v1'))), { language: 'ru', theme: 'light' });
    await page.getByText('Создать мой план', { exact: true }).click();
    await page.getByLabel('Ваше имя', { exact: true }).fill('Today');
    await page.getByText('Продолжить', { exact: true }).click();
    await page.getByText('Продолжить', { exact: true }).click();
    await page.getByText('Продолжить', { exact: true }).click();
    await page.getByText('Создать личный план', { exact: true }).click();
    await page.getByText('Реалистичный план под ваше время', { exact: true }).waitFor();
    assert.equal(await page.locator('[role="tab"]').count(), 4);
    const more = () => page.locator('[role="tab"]').last().click();
    await more();
    await page.getByRole('radio', { name: 'English', exact: true }).click();
    await page.getByLabel('Close', { exact: true }).click();
    await page.getByText('An achievable plan that fits your time', { exact: true }).waitFor();
    await page.getByText('Today', { exact: true }).last().click();
    await page.getByLabel('Your English answer', { exact: true }).fill('This draft must stay exactly as written. Today');
    await more();
    await page.getByRole('radio', { name: 'Dark', exact: true }).click();
    await page.getByRole('radio', { name: 'O‘zbekcha', exact: true }).click();
    await page.getByLabel('Yopish', { exact: true }).click();
    await page.getByText('BUGUNGI MASHQ', { exact: true }).waitFor();
    assert.equal(await page.getByLabel('Inglizcha javobingiz', { exact: true }).inputValue(), 'This draft must stay exactly as written. Today');
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      await more();
      await page.getByRole('radio', { name: 'Och', exact: true }).click();
      await page.getByLabel('Yopish', { exact: true }).click();
      const rootColor = await page.locator('#root > div').evaluate(el => getComputedStyle(el).backgroundColor);
      // Native root can be wrapped in the safe-area provider; check actual palette panels.
      assert.ok(await page.locator('body').evaluate(() => [...document.querySelectorAll('div')].some(el => getComputedStyle(el).backgroundColor === 'rgb(244, 247, 239)')), rootColor);
      assert.equal(await page.locator('[role="tab"]').count(), 4);
      const overflow = await page.locator('[role="tab"]').evaluateAll(els => els.some(el => { const r = el.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth + 1; }));
      assert.equal(overflow, false);
      console.log(`PASS ${width}px light theme + four fixed navigation items`);
    }
    await page.reload();
    await page.getByText('Rejam', { exact: true }).waitFor();
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('@levelup/display/v1'))), { language: 'uz', theme: 'light' });
    // The learner's name matches a dictionary key; it must stay untouched.
    await page.getByText('Today', { exact: true }).last().waitFor();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('@levelup/learner/v1')).name), 'Today');
    assert.deepEqual(errors, []);
    console.log('PASS RU/UZ/EN, onboarding settings, persistence, theme switching, draft/name preservation, no browser errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
