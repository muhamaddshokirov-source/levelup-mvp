import test from 'node:test';
import assert from 'node:assert/strict';
import { speakingScenarios, conversationStats, conversationReview } from './speaking';
test('six complete real-world speaking scenarios have goals and useful notebook-ready phrases', () => {
  assert.equal(speakingScenarios.length, 6);
  assert.equal(new Set(speakingScenarios.map(s => s.label)).size, 6);
  for (const scenario of speakingScenarios) {
    for (const value of [scenario.role, scenario.goal, scenario.opening, scenario.hint, scenario.example]) assert.ok(value.trim().length > 10);
    for (const phrase of scenario.phrases) { assert.ok(phrase.word.length <= 80); assert.ok(phrase.meaning && phrase.example); }
  }
});
test('speaking metrics count only actually submitted learner text, not AI or draft', () => {
  assert.deepEqual(conversationStats([]), { turns: 0, words: 0, averageWords: 0 });
  assert.deepEqual(conversationStats([{ role: 'assistant', text: 'Do not count these words.' }, { role: 'user', text: 'I enjoy learning English.' }, { role: 'user', text: 'It is useful.' }]), { turns: 2, words: 7, averageWords: 4 });
});
test('review exports learner evidence, bounds payload and makes no audio claims', () => {
  const result = conversationReview([{ role: 'assistant', text: 'Private tutor words' }, { role: 'user', text: 'I enjoy travel.' }], 'Travel', 'A2');
  assert.match(result.answer, /I enjoy travel/); assert.ok(!result.answer.includes('Private tutor'));
  assert.match(result.question, /self-selected A2/); assert.match(result.question, /Do not assess pronunciation/);
  assert.equal(conversationReview([{ role: 'user', text: 'a'.repeat(5000) }], 'Travel', 'A1').answer.length, 4000);
});
