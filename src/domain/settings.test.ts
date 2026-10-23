import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultSettings, initials, parseSettings } from './settings';
test('settings default and round trip', () => {
  assert.deepEqual(parseSettings(null), defaultSettings);
  const settings = { ...defaultSettings, name: '  Alex Kim  ', weeklyGoal: 5, timerSeconds: 120 };
  assert.deepEqual(parseSettings(JSON.stringify(settings)), { ...settings, name: 'Alex Kim' });
});
test('invalid saved settings are rejected, not silently replaced', () => {
  for (const raw of ['{', '{}', 'null', JSON.stringify({ ...defaultSettings, weeklyGoal: 0 }), JSON.stringify({ ...defaultSettings, timerSeconds: 90 }), JSON.stringify({ ...defaultSettings, color: 'red' }), JSON.stringify({ ...defaultSettings, name: 'a'.repeat(31) })]) assert.throws(() => parseSettings(raw));
});
test('profile initials handle whitespace and unicode', () => {
  assert.equal(initials(''), 'YOU');
  assert.equal(initials('  Alex   Kim Jones '), 'AK');
  assert.equal(initials('Émilie'), 'É');
});
