import test from 'node:test';
import assert from 'node:assert/strict';
import { addSession, EMPTY_DATA } from './practice';
import { bestStreak, milestones, weeklyCount } from './milestones';
const answer = 'I would love to learn English because it helps me meet new people and understand different cultures around the world every day.';
test('weekly mission starts on Monday and excludes future sessions', () => {
  let data = EMPTY_DATA;
  for (const date of ['2026-10-18', '2026-10-19', '2026-10-20', '2026-10-25', '2026-10-26']) data = addSession(data, date, answer);
  assert.equal(weeklyCount(data, '2026-10-20'), 2);
  assert.equal(weeklyCount(data, '2026-10-25'), 3);
  assert.equal(weeklyCount(data, '2026-10-26'), 1);
});
test('best streak and unlocked milestones do not disappear when current streak ends', () => {
  let data = EMPTY_DATA;
  for (const date of ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-08']) data = addSession(data, date, answer);
  assert.equal(bestStreak(data), 3);
  const badge = milestones(data, '2026-10-23').find(b => b.id === 'habit')!;
  assert.equal(badge.current, badge.target);
  assert.equal(bestStreak(EMPTY_DATA), 0);
});
