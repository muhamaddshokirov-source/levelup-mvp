import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons, parseCourseProgress } from './course';
test('guided lessons cover four levels with three distinct complete starters each', () => {
  assert.equal(lessons.length, 12);
  assert.equal(new Set(lessons.map(l => l.id)).size, lessons.length);
  for (const level of ['A1', 'A2', 'B1', 'B2']) assert.equal(lessons.filter(l => l.level === level).length, 3);
  for (const lesson of lessons) { assert.ok(lesson.prompt && lesson.model && lesson.followup && lesson.tip); assert.equal(lesson.phrases.length, 3); }
  assert.match(lessons.find(l => l.id === 'a1-cafe')!.prompt, /café/i);
  assert.match(lessons.find(l => l.id === 'a2-directions')!.prompt, /directions|how to get/i);
  assert.match(lessons.find(l => l.id === 'b1-feedback')!.prompt, /respectful feedback/i);
  assert.match(lessons.find(l => l.id === 'b2-public-space')!.prompt, /parks, roads or public transport/i);
});
test('course progress loads and deduplicates known lesson IDs', () => {
  assert.deepEqual(parseCourseProgress(null), []);
  assert.deepEqual(parseCourseProgress(JSON.stringify({ version: 1, completed: ['a1-intro', 'a1-intro'] })), ['a1-intro']);
  for (const raw of ['null', '{', '{}', '{"version":1,"completed":["unknown"]}']) assert.throws(() => parseCourseProgress(raw));
});
