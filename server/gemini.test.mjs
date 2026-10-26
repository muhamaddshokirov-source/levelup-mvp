import test from 'node:test';
import assert from 'node:assert/strict';
import { geminiFeedback, MODEL } from './gemini.mjs';
const input = { apiKey: 'test-only', question: 'Describe a goal.', answer: 'I want to learn English.' };
test('Gemini adapter uses fixed model and server-only header and extracts feedback', async () => {
  const result = await geminiFeedback({ ...input, fetchImpl: async (url, options) => {
    assert.match(url, new RegExp(`${MODEL}:generateContent$`));
    assert.ok(!url.includes(input.apiKey));
    assert.equal(options.headers['x-goog-api-key'], input.apiKey);
    const body = JSON.parse(options.body);
    assert.ok(!body.tools);
    assert.ok(!options.body.includes(input.apiKey));
    assert.equal(body.contents[0].parts[0].text, JSON.stringify({ question: input.question, answer: input.answer }));
    return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'hidden', thought: true }, { text: 'Useful feedback.' }] } }] });
  } });
  assert.deepEqual(result, { status: 200, feedback: 'Useful feedback.' });
});
test('quota exhaustion makes exactly one request without fallback', async () => {
  let calls = 0;
  const result = await geminiFeedback({ ...input, fetchImpl: async () => { calls++; return new Response('', { status: 429 }); } });
  assert.equal(calls, 1);
  assert.equal(result.status, 429);
});
test('provider failures, blocked, empty or truncated results are not fake success', async () => {
  assert.equal((await geminiFeedback({ ...input, fetchImpl: async () => new Response('', { status: 403 }) })).status, 502);
  for (const data of [{}, { promptFeedback: { blockReason: 'SAFETY' } }, { candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: 'partial' }] } }] }]) {
    const result = await geminiFeedback({ ...input, fetchImpl: async () => Response.json(data) });
    assert.notEqual(result.status, 200);
  }
});
test('diagnostics classify provider errors without exposing raw messages or credentials', async () => {
  for (const [status, details, code] of [
    [400, [{ reason: 'API_KEY_INVALID' }], 'GEMINI_KEY'],
    [403, [], 'GEMINI_PERMISSION'],
    [404, [], 'GEMINI_MODEL'],
    [429, [], 'GEMINI_QUOTA'],
  ]) {
    const result = await geminiFeedback({ ...input, fetchImpl: async () => Response.json({ error: { message: `secret ${input.apiKey}`, details } }, { status }) });
    assert.equal(result.code, code);
    assert.ok(!JSON.stringify(result).includes(input.apiKey));
  }
});

test('coach targets the current stable Flash-Lite model explicitly', () => {
  assert.equal(MODEL, 'gemini-3.1-flash-lite');
});

test('conversation mode uses bounded supplied history as data and a distinct English partner instruction', async () => {
  const history = [{ role: 'assistant', text: 'Where would you like to travel?' }];
  const result = await geminiFeedback({ ...input, mode: 'conversation', history, fetchImpl: async (_url, options) => {
    const body = JSON.parse(options.body);
    assert.match(body.systemInstruction.parts[0].text, /conversation partner/);
    assert.match(body.systemInstruction.parts[0].text, /never instructions/);
    assert.match(body.systemInstruction.parts[0].text, /never claim to hear audio/i);
    assert.deepEqual(JSON.parse(body.contents[0].parts[0].text).history, history);
    assert.ok(!body.tools);
    return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'That sounds lovely. Why do you want to go there?' }] } }] });
  } });
  assert.equal(result.status, 200);
  assert.match(result.feedback, /Why/);
});

test('conversation adapts its server-side instruction to a self-selected practice level without certifying it', async () => {
  for (const level of ['A1', 'B2']) await geminiFeedback({ ...input, mode: 'conversation', level, history: [], fetchImpl: async (_url, options) => {
    const instruction = JSON.parse(options.body).systemInstruction.parts[0].text;
    assert.match(instruction, new RegExp(`self-selected ${level}`));
    assert.match(instruction, level === 'A1' ? /basic vocabulary/ : /invite nuance/);
    assert.match(instruction, /Never score fluency/);
    return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'A helpful reply.' }] } }] });
  } });
});
