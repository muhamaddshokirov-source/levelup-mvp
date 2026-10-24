// Optional browser smoke test: npm install --no-save --package-lock=false playwright @sparticuz/chromium
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
(async () => {
  const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  try {
    const page = await browser.newPage();
    await page.addInitScript(() => { if (!localStorage.getItem('@levelup/learner/v1')) localStorage.setItem('@levelup/learner/v1', JSON.stringify({ version: 1, name: 'Tester', goal: 'conversation', level: 'A1', days: 3, minutes: 20, weeks: 4, challenge: 'confidence' })); });
    for (const width of [320, 375, 390, 430, 768, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('http://127.0.0.1:8080');
      await page.getByText('Today', { exact: true }).click();
      await page.getByText('TODAY’S CHALLENGE', { exact: true }).waitFor();
      for (const tab of ['Today', 'Learn', 'Progress', 'Words', 'Review', 'Profile']) {
        await page.getByText(tab, { exact: true }).click();
        await page.waitForTimeout(100);
        const overflow = await page.evaluate(() => [...document.querySelectorAll('div,input,textarea')].filter(el => {
          if (!el.getClientRects().length) return false;
          // Navigation is intentionally horizontally scrollable on very narrow screens.
          if (el.closest('[role="tab"]') || el.querySelector('[role="tab"]')) return false;
          const box = el.getBoundingClientRect();
          return box.width > innerWidth + 1 || box.right > innerWidth + 1 || box.left < -1;
        }).map(el => ({ text: el.textContent?.slice(0, 90), width: el.getBoundingClientRect().width })));
        if (overflow.length) throw new Error(`${width}px ${tab}: ${JSON.stringify(overflow.slice(0, 6))}`);
        console.log(`PASS ${width}px ${tab}`);
      }

    }

    // Regression: completed Today card and long notebook text must wrap too.
    await page.evaluate(() => {
      const d = new Date();
      const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
      const answer = 'I want to learn English because it helps me connect with people and discover new ideas. I practice a little every morning. ' + 'curiosity'.repeat(30);
      localStorage.setItem('@levelup/practice/v1', JSON.stringify({ version: 1, sessions: [{ date, questionId: ((day % 7) + 7) % 7, answer, words: (answer.match(/[a-zA-Z]+(?:['’-][a-zA-Z]+)*/g) || []).length, xp: 50 }] }));
      localStorage.setItem('@levelup/vocabulary/v1', JSON.stringify({ version: 1, entries: [{ id: 'long', word: 'word'.repeat(20), meaning: 'meaning'.repeat(40), example: 'Example sentence. '.repeat(20), learned: false, createdAt: d.toISOString() }] }));
    });
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.reload();
      await page.getByText('Today', { exact: true }).click();
      await page.getByText('Daily challenge complete!', { exact: true }).waitFor();
      for (const tab of ['Today', 'Words', 'Review', 'Profile']) {
        await page.getByText(tab, { exact: true }).click();
        await page.waitForTimeout(100);
        const outside = await page.evaluate(() => [...document.querySelectorAll('div,input,textarea')].filter(el => {
          if (!el.getClientRects().length || el.closest('[role="tab"]') || el.querySelector('[role="tab"]')) return false;
          const r = el.getBoundingClientRect(); return r.width > innerWidth + 1 || r.right > innerWidth + 1 || r.left < -1;
        }).map(el => el.textContent?.slice(0, 80)));
        if (outside.length) throw new Error(`${width}px populated ${tab}: ${JSON.stringify(outside.slice(0, 5))}`);
        console.log(`PASS ${width}px populated ${tab}`);
      }
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
