import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDisplayPreferences } from './display';
import { translate, translations } from './translations';
test('display defaults and all six valid saved language/theme combinations', () => {
  assert.deepEqual(parseDisplayPreferences(null), { language: 'uz', theme: 'dark' });
  for (const language of ['uz', 'ru', 'en']) for (const theme of ['dark', 'light']) assert.deepEqual(parseDisplayPreferences(JSON.stringify({ language, theme })), { language, theme });
  for (const raw of ['{', 'null', '{}', '{"language":"fr","theme":"dark"}', '{"language":"en","theme":"blue"}']) assert.throws(() => parseDisplayPreferences(raw));
});
test('every UI dictionary row has all three nonempty translations', () => {
  assert.ok(Object.keys(translations).length > 380);
  for (const [key, row] of Object.entries(translations)) for (const language of ['uz', 'ru', 'en'] as const) assert.ok(row[language]?.trim(), `${key}: ${language}`);
  assert.equal(translate('My plan', 'uz'), 'Rejam');
  assert.equal(translate('My plan', 'ru'), 'Мой план');
  assert.equal(translate('Shaxsiy rejamni yaratish', 'en'), 'Create my personal plan');
  assert.equal(translate('  Today ', 'ru'), '  Сегодня ');
});
test('dynamic UI numbers and error codes survive localization; unknown text is unchanged', () => {
  assert.equal(translate('5 kun', 'ru'), '5 дн.');
  assert.equal(translate('60 daqiqa · 1 soat', 'en'), '60 min · 1 hour');
  assert.equal(translate('8 haftalik maqsad', 'en'), '8-week goal');
  assert.equal(translate('B2 darslaridan boshlash', 'ru'), 'Начать уроки B2');
  assert.equal(translate('Review 12 words', 'uz'), '12 ta so‘zni takrorlash');
  assert.equal(translate('AI javobi bo‘sh keldi. Qayta urinib ko‘ring. [GEMINI_EMPTY]', 'en'), 'AI returned an empty response. Try again. [GEMINI_EMPTY]');
  assert.equal(translate('My own unknown English answer', 'ru'), 'My own unknown English answer');
  assert.match(translate('Good to see you, Today. Let’s make a little progress.', 'ru'), /Today/);
});
