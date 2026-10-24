import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLearningPlan, defaultLearner, parseLearner } from './learningPlan';
const profile = { ...defaultLearner, name: 'Aziza' };
test('learner storage is versioned, validated and backward independent', () => {
  assert.equal(parseLearner(null), null);
  assert.deepEqual(parseLearner(JSON.stringify({ ...profile, name: ' Aziza ' })), profile);
  for (const raw of ['null', '{}', '{', JSON.stringify({ ...profile, days: 0 }), JSON.stringify({ ...profile, minutes: 10000 }), JSON.stringify({ ...profile, goal: '__proto__' }), JSON.stringify({ ...profile, level: 'C2' }), JSON.stringify({ ...profile, name: '  ' })]) assert.throws(() => parseLearner(raw));
});
test('session allocations always sum to the chosen duration', () => {
  for (const minutes of [10, 20, 30, 60] as const) for (const days of [2, 3, 5, 7] as const) {
    const p = buildLearningPlan({ ...profile, minutes, days });
    assert.equal(p.prep + p.speaking + p.review, minutes);
    assert.equal(p.weeklyMinutes, minutes * days);
    assert.equal(p.weekdays.length, days);
    assert.ok(p.speaking > 0);
  }
});
test('level, goal, challenge and horizon personalize the plan', () => {
  const a = buildLearningPlan(profile);
  const b = buildLearningPlan({ ...profile, level: 'B2', goal: 'work', challenge: 'vocabulary', weeks: 12 });
  assert.ok(b.lessons.every(l => l.level === 'B2'));
  assert.notDeepEqual(a.topics, b.topics);
  assert.notEqual(a.focus, b.focus);
  assert.equal(b.totalMinutes, profile.days * profile.minutes * 12);
  assert.equal(b.topics.length, 4);
});
