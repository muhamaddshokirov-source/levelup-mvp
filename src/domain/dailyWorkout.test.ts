import test from 'node:test';
import assert from 'node:assert/strict';
import { dailyWorkout, parseWorkout, saveWorkoutDay, EMPTY_WORKOUT } from './dailyWorkout';
import { questionFor } from './practice';
test('daily workout varies by date while retaining the existing XP question identity', () => {
  const first = dailyWorkout('2026-10-26'); assert.deepEqual(first.main, questionFor('2026-10-26')); assert.notEqual(first.warmup, dailyWorkout('2026-10-27').warmup); assert.ok(first.stretch && first.phrase);
});
test('workout progress is versioned, validated and bounded to fourteen dates without XP', () => {
  assert.deepEqual(parseWorkout(null), { version: 1, days: {} });
  let history = parseWorkout(null); for (let i = 1; i <= 20; i++) history = saveWorkoutDay(history, `2026-10-${String(i).padStart(2, '0')}`, { ...EMPTY_WORKOUT, warmup: true });
  assert.equal(Object.keys(history.days).length, 14); assert.ok(!('xp' in history.days['2026-10-20']!));
  assert.deepEqual(parseWorkout(JSON.stringify(history)), history); assert.throws(() => parseWorkout('{')); assert.throws(() => parseWorkout('{"version":1,"days":{"2026-10-26":{"warmup":true}}}'));
});
