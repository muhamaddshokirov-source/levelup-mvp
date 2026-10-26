import test from 'node:test';
import assert from 'node:assert/strict';
import { ieltsPacks, ieltsPrompt, ieltsReviewQuestion, ieltsGuidance, IELTS_SOURCE } from './ielts';
test('IELTS bank distinguishes sourced samples from original practice and covers all three parts', () => {
  assert.equal(ieltsPacks.length, 3); assert.equal(ieltsPacks.filter(p => p.official).length, 1);
  assert.match(IELTS_SOURCE, /^https:\/\/ielts.org\//);
  for (const pack of ieltsPacks) { assert.equal(pack.part1.length, 4); assert.equal(pack.part3.length, 3); assert.ok(pack.points.length >= 3); assert.match(ieltsPrompt(pack, 2, 0), /You should say/); assert.equal(ieltsPrompt(pack, 1, 0), pack.part1[0]); assert.equal(ieltsPrompt(pack, 3, 0), pack.part3[0]); }
  assert.equal(ieltsGuidance[2].seconds, 120);
});
test('IELTS review is bounded and explicitly disallows band and pronunciation claims', () => {
  const prompt = ieltsReviewQuestion('Describe a place.', 2); assert.match(prompt, /Part 2/); assert.match(prompt, /Do not assign an IELTS band/); assert.match(prompt, /pronunciation/);
  assert.ok(ieltsReviewQuestion('a'.repeat(2000), 3).length <= 1000);
});
