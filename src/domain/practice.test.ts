import test from 'node:test';
import assert from 'node:assert/strict';
import { addSession, dateKey, EMPTY_DATA, feedbackFor, parseData, questionFor, stats, wordCount } from './practice';
const answer = 'My perfect day starts with a walk outside because I enjoy fresh air and quiet mornings. Then I spend time with my family and cook something delicious.';
test('local date and deterministic rotating question', () => {
  assert.equal(dateKey(new Date(2026, 9, 22)), '2026-10-22');
  assert.deepEqual(questionFor('2026-10-22'), questionFor('2026-10-29'));
  assert.notEqual(questionFor('2026-10-22').id, questionFor('2026-10-23').id);
});
test('counts English words and rejects short answers', () => {
  assert.equal(wordCount("I'm ready to speak."), 4);
  assert.equal(wordCount('123 456 !!!'), 0);
  assert.throws(() => addSession(EMPTY_DATA, '2026-10-22', 'Too short.'));
  assert.throws(() => addSession(EMPTY_DATA, '2026-10-22', answer.repeat(100)));
});
test('daily XP cannot be awarded twice', () => {
  const data = addSession(EMPTY_DATA, '2026-10-22', answer);
  assert.equal(addSession(data, '2026-10-22', answer), data);
  assert.equal(stats(data, '2026-10-22').xp, 50);
  assert.equal(data.sessions[0]?.answer, answer);
});
test('streak spans month boundary and survives until next day', () => {
  let data = addSession(EMPTY_DATA, '2026-09-30', answer);
  data = addSession(data, '2026-10-01', answer);
  assert.equal(stats(data, '2026-10-01').streak, 2);
  assert.equal(stats(data, '2026-10-02').streak, 2);
  assert.equal(stats(data, '2026-10-03').streak, 0);
});
test('five completed days unlock level two', () => {
  let data = EMPTY_DATA;
  for (let day = 1; day <= 5; day++) data = addSession(data, `2026-10-0${day}`, answer);
  assert.equal(stats(data, '2026-10-05').level, 2);
  assert.equal(stats(data, '2026-10-05').levelProgress, 0);
});
test('storage roundtrip and corrupted data validation', () => {
  const data = addSession(EMPTY_DATA, '2026-10-22', answer);
  assert.deepEqual(parseData(JSON.stringify(data)), data);
  assert.deepEqual(parseData(null), EMPTY_DATA);
  for (const raw of ['{', '{}', '{"version":2,"sessions":[]}', JSON.stringify({ ...data, sessions: [...data.sessions, ...data.sessions] }), JSON.stringify({ version: 1, sessions: [{ ...data.sessions[0], xp: 999 }] }), JSON.stringify({ version: 1, sessions: [{ ...data.sessions[0], date: '2026-02-30' }] })]) assert.throws(() => parseData(raw));
});
test('demo feedback offers a concrete next step', () => {
  assert.match(feedbackFor(answer).strength, /reason/);
  assert.match(feedbackFor('I like mornings.').tip, /example/);
});
