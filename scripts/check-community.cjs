// MOCKED UI integration test, never a live leaderboard or live Supabase project.
// Build with EXPO_PUBLIC_SUPABASE_URL=https://qa-community.supabase.co and
// EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_test_only; serve that export on 8081.
// Database permissions and XP rules are tested separately with real PostgreSQL (PGlite).
const { chromium: browserType } = require('playwright');
const chromium = require('@sparticuz/chromium').default;
const assert = require('node:assert/strict');
(async () => {
  const browser = await browserType.launch({ executablePath: await chromium.executablePath(), args: chromium.args.filter(x => !x.includes('single-process') && !x.includes('in-process-gpu')), headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 320, height: 844 } });
    const uid = '00000000-0000-4000-8000-000000000001';
    const targetId = '00000000-0000-4000-8000-000000000002';
    let admin = false, joined = false, xp = 0, hidden = false, banned = false;
    let audit = []; const events = new Set(); const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      localStorage.setItem('@levelup/display/v1', JSON.stringify({ language: 'en', theme: 'light' }));
      localStorage.setItem('@levelup/learner/v1', JSON.stringify({ version: 1, name: 'Test One', goal: 'work', level: 'A1', days: 3, minutes: 20, weeks: 4, challenge: 'confidence' }));
    });
    await page.route('https://qa-community.supabase.co/**', async route => {
      const path = new URL(route.request().url()).pathname;
      const input = route.request().postDataJSON() || {};
      const send = body => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
      if (path.endsWith('/signup')) return send({ user: { id: uid }, session: null });
      if (path.endsWith('/token')) {
        admin = input.email?.includes('admin');
        const user = { id: uid, aud: 'authenticated', role: 'authenticated', email: input.email, app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() };
        const payload = { sub: uid, aud: 'authenticated', role: 'authenticated', exp: Math.floor(Date.now() / 1000) + 3600, iat: Math.floor(Date.now() / 1000) };
        const token = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url') + '.' + Buffer.from(JSON.stringify(payload)).toString('base64url') + '.test';
        return send({ access_token: token, refresh_token: 'test-only-refresh-token', expires_in: 3600, token_type: 'bearer', user });
      }
      if (path.endsWith('/logout')) return send(null);
      if (path.endsWith('/rank_account')) return send({ user_id: uid, name: 'Test One', joined, admin, hidden: false, banned: false });
      if (path.endsWith('/rank_join')) { joined = true; return send({ user_id: uid, name: input.p_name, joined, admin, hidden: false, banned: false }); }
      if (path.endsWith('/rank_leave')) { joined = false; return send(null); }
      if (path.endsWith('/rank_award')) { const key = input.p_kind + input.p_lesson; const points = events.has(key) ? 0 : input.p_kind === 'daily' ? 50 : 20; events.add(key); xp += points; return send({ awarded: points }); }
      if (path.endsWith('/rank_board')) {
        const me = { user_id: uid, display_name: 'Test One', xp, position: xp >= 50 ? 1 : 2 };
        const other = { user_id: targetId, display_name: 'Test Two', xp: 30, position: xp >= 50 ? 2 : 1 };
        return send({ rows: joined ? [me, other].sort((a,b) => a.position - b.position) : [other], me: joined ? me : null, period: input.p_period, timezone: 'Asia/Tashkent' });
      }
      if (path.endsWith('/rank_admin_list') && admin) return send({ total: 1, users: [{ user_id: targetId, display_name: 'Test Two', xp: 30, opted_in: true, hidden, banned }], audit });
      if (path.endsWith('/rank_admin_moderate') && admin) { hidden = input.p_hidden; banned = input.p_banned; audit = [{ id: 1, actor: uid, target: targetId, action: JSON.stringify({ hidden, banned }), reason: input.p_reason, created_at: new Date().toISOString() }]; return send(null); }
      return route.fulfill({ status: 403, contentType: 'application/json', body: JSON.stringify({ message: 'ADMIN_REQUIRED' }) });
    });
    await page.goto('http://127.0.0.1:8081');
    await page.getByRole('tab', { name: 'Progress', exact: true }).click();
    await page.getByText('Sign in to view the ranking and join with a public nickname.', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open online account', exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill('qa@example.test');
    await page.getByLabel('Password', { exact: true }).fill('test-password-123');
    await page.getByRole('button', { name: 'Show password', exact: true }).click();
    assert.equal(await page.getByLabel('Password', { exact: true }).evaluate(el => el.type), 'text');
    await page.getByRole('button', { name: 'Hide password', exact: true }).click();
    assert.equal(await page.getByLabel('Password', { exact: true }).evaluate(el => el.type), 'password');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByText('Account ID', { exact: true }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Open admin panel', exact: true }).count(), 0);
    await page.getByLabel('Public nickname', { exact: true }).fill('Test One');
    await page.getByRole('button', { name: 'I agree to show my nickname and ranked XP', exact: true }).click();
    await page.getByRole('button', { name: 'Join the ranking', exact: true }).click();
    await page.getByRole('button', { name: 'Leave public ranking', exact: true }).waitFor();
    await page.getByRole('tab', { name: 'Today', exact: true }).click();
    await page.getByLabel('Your English answer', { exact: true }).fill('I want to learn English because I enjoy meeting new people and sharing my ideas with friends from different countries every day.');
    await page.getByRole('button', { name: 'Finish practice', exact: true }).click();
    await page.getByText('Daily challenge complete!', { exact: true }).waitFor();
    await page.getByRole('tab', { name: 'Progress', exact: true }).click();
    await page.getByRole('button', { name: 'Sync today’s practice to ranking', exact: true }).click();
    await page.getByText('This activity already has ranked XP. No duplicate points.', { exact: true }).first().waitFor();
    assert.equal(xp, 50);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      const overflow = await page.evaluate(() => [...document.querySelectorAll('div,input,textarea')].filter(el => el.getClientRects().length).some(el => { const r = el.getBoundingClientRect(); return r.width > innerWidth + 1 || r.right > innerWidth + 1 || r.left < -1; }));
      assert.equal(overflow, false);
    }
    await page.getByRole('button', { name: 'Open profile and settings', exact: true }).click();
    await page.getByRole('button', { name: 'Sign out on this device', exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill('admin@example.test');
    await page.getByLabel('Password', { exact: true }).fill('test-password-123');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByRole('button', { name: 'Open admin panel', exact: true }).click();
    await page.getByRole('button', { name: 'Back to profile', exact: true }).waitFor();
    assert.equal(await page.getByText('Online account & ranking', { exact: true }).isVisible(), false, 'admin must be a separate page');
    await page.getByRole('button', { name: 'Moderate member', exact: true }).click();
    await page.getByRole('button', { name: 'Hidden: no', exact: true }).click();
    await page.getByLabel('Moderation reason', { exact: true }).fill('QA moderation test');
    await page.getByRole('button', { name: 'Confirm and save audit entry', exact: true }).click();
    await page.getByText('QA moderation test', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Back to profile', exact: true }).click();
    await page.getByRole('button', { name: 'Open admin panel', exact: true }).waitFor();
    assert.equal(hidden, true); assert.equal(audit.length, 1); assert.deepEqual(errors, []);
    console.log('PASS mocked browser: account → consent → ranked daily XP → replay → shared board → admin moderation/audit; 320/390/1280px');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
