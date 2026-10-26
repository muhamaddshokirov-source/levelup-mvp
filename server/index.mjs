import http from 'node:http';
import { timingSafeEqual } from 'node:crypto';
import { geminiFeedback } from './gemini.mjs';

const { GEMINI_API_KEY, COACH_ACCESS_TOKEN, ALLOWED_ORIGIN, TURNSTILE_SECRET_KEY, TURNSTILE_HOSTNAME } = process.env;
const publicMode = !!TURNSTILE_SECRET_KEY;
if (!GEMINI_API_KEY || !ALLOWED_ORIGIN || ALLOWED_ORIGIN === '*' || (publicMode ? !TURNSTILE_HOSTNAME : !COACH_ACCESS_TOKEN || COACH_ACCESS_TOKEN.length < 24)) throw new Error('Set provider key, exact allowed origin, and Turnstile secret/hostname (or private pilot access token).');
const port = Number(process.env.PORT || 3001);
const counts = new Map();
const maxDaily = Number(process.env.COACH_DAILY_LIMIT || 50);
if (!Number.isInteger(maxDaily) || maxDaily < 1 || maxDaily > 1000) throw new Error('COACH_DAILY_LIMIT must be 1–1000');
let used = 0, date = new Date().toISOString().slice(0, 10);
const authorized = value => { const a = Buffer.from(value || ''); const b = Buffer.from(`Bearer ${COACH_ACCESS_TOKEN || ''}`); return a.length === b.length && timingSafeEqual(a, b); };
const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method === 'GET' && (req.url === '/' || req.url === '/health')) { return res.end(JSON.stringify({ service: 'LevelUp Coach', status: 'online', capabilities: ['feedback', 'conversation', 'assistant'], note: 'API ishlayapti. AI feedbackni LevelUp sayti ichidan sinang.' })); }
  if (req.headers.origin !== ALLOWED_ORIGIN) { res.writeHead(403); return res.end(JSON.stringify({ error: 'Origin not allowed' })); }
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const fail = (status, error, code = 'COACH_REQUEST') => { console.warn(JSON.stringify({ event: 'coach_error', status, code })); res.writeHead(status); res.end(JSON.stringify({ error, code })); };
  if (req.url !== '/feedback' || req.method !== 'POST') return fail(404, 'Not found');
  if (!publicMode && !authorized(req.headers.authorization)) return fail(401, 'Access token incorrect', 'COACH_AUTH');
  const nowDate = new Date().toISOString().slice(0, 10);
  if (nowDate !== date) { date = nowDate; used = 0; counts.clear(); }
  const ip = req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const recent = (counts.get(ip) || []).filter(t => now - t < 60000);
  if (recent.length >= 5 || used >= maxDaily) return fail(429, 'Usage limit reached. Try later.', 'COACH_LIMIT');
  // Record attempts before reading the body to limit abusive authorized traffic.
  recent.push(now); counts.set(ip, recent);
  try {
    let body = '';
    for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 20000) return fail(413, 'Request too large'); }
    let input;
    try { input = JSON.parse(body); } catch { return fail(400, 'Invalid JSON'); }
    if (!input || typeof input !== 'object') return fail(400, 'Invalid request');
    if (input.language !== undefined && !['uz', 'ru', 'en'].includes(input.language)) return fail(400, 'Invalid language');
    if (input.level !== undefined && !['A1', 'A2', 'B1', 'B2'].includes(input.level)) return fail(400, 'Invalid practice level');
    if (input.mode !== undefined && !['conversation', 'assistant'].includes(input.mode)) return fail(400, 'Invalid mode');
    if (['conversation', 'assistant'].includes(input.mode) && (!Array.isArray(input.history) || input.history.length > 12 || !input.history.every(item => item && ['user', 'assistant'].includes(item.role) && typeof item.text === 'string' && item.text.length > 0 && item.text.length <= 1200))) return fail(400, 'Invalid history');
    if (typeof input.answer !== 'string' || input.answer.trim().length < (['conversation', 'assistant'].includes(input.mode) ? 1 : 20) || input.answer.length > 4000 || typeof input.question !== 'string' || !input.question.trim() || input.question.length > 1000) return fail(400, 'Invalid question or answer');
    if (publicMode) {
      if (typeof input.verification !== 'string' || !input.verification || input.verification.length > 2048) return fail(401, 'Verification required', 'VERIFY_REQUIRED');
      const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST', signal: AbortSignal.timeout(8000),
        body: new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: input.verification }),
      });
      if (!check.ok) return fail(503, 'Verification service unavailable', 'VERIFY_UNAVAILABLE');
      const proof = await check.json();
      if (proof.success !== true) return fail(401, 'Verification failed', 'VERIFY_FAILED');
      if (proof.hostname !== TURNSTILE_HOSTNAME) return fail(401, 'Verification hostname mismatch', 'VERIFY_HOST');
      if (proof.action !== 'feedback') return fail(401, 'Verification action mismatch', 'VERIFY_ACTION');
    }
    // Verification awaits network; recheck quota before reserving a provider request.
    if (used >= maxDaily) return fail(429, 'Usage limit reached. Try later.', 'COACH_LIMIT');
    used++;
    const result = await geminiFeedback({ apiKey: GEMINI_API_KEY, question: input.question, answer: input.answer, mode: input.mode, level: input.level, language: input.language, history: input.history });
    if (result.status !== 200) return fail(result.status, result.error, result.code);
    res.end(JSON.stringify({ feedback: result.feedback, mode: ['conversation', 'assistant'].includes(input.mode) ? input.mode : 'feedback' }));
  } catch (e) { if (!res.headersSent) fail(502, 'Request failed or timed out. Please try again.', e?.name === 'TimeoutError' ? 'COACH_TIMEOUT' : 'COACH_NETWORK'); }
});
server.requestTimeout = 35000;
server.headersTimeout = 10000;
server.listen(port, '0.0.0.0', () => console.log(`Coach API listening on ${server.address().port}`));
