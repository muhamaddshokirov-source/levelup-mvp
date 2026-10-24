import test from 'node:test';
import assert from 'node:assert/strict';
import { coachErrorMessage } from './coachErrors';
test('coach shows safe actionable error codes', () => {
  assert.match(coachErrorMessage(502, { code: 'GEMINI_MODEL' }), /GEMINI_MODEL/);
  assert.match(coachErrorMessage(502, { code: 'GEMINI_KEY' }), /GEMINI_API_KEY/);
  assert.match(coachErrorMessage(429, { code: 'GEMINI_QUOTA' }), /quota/);
});
test('unknown provider text is never shown to the user', () => {
  const message = coachErrorMessage(502, { code: 'SECRET_KEY_VALUE', error: 'secret raw key and provider body' });
  assert.match(message, /HTTP_502/);
  assert.ok(!message.includes('secret'));
  assert.match(coachErrorMessage(403, null), /HTTP_403/);
});
