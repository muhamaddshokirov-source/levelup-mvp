import test from 'node:test';
import assert from 'node:assert/strict';
import { formatFeedback, inlineParts } from './feedbackFormat';
const sample = `Sizning ingliz tili mashg'ulotingiz uchun fikr-mulohazalar:
* **Kuchli tomoni:** Siz o'z fikringizni aniq bayon qildingiz.
* **Tuzatishlar:**
  1. *Original:* "problem solving skill" -> *Improved:* "problem-solving skills"
  2. *Original:* "an it can" -> *Improved:* "and it can"
* **Yaxshilangan javob:** "I would love to learn problem-solving skills."
* **Savol:** Which specific profession are you planning to pursue?`;
test('formats actual Uzbek coach response into distinct sections without dropping content', () => {
  const result = formatFeedback(sample);
  assert.deepEqual(result.map(s => s.kind), ['intro', 'strength', 'corrections', 'improved', 'question']);
  assert.equal(result[2]?.lines.length, 2);
  assert.match(result[4]!.lines[0]!, /Which specific profession/);
});
test('inline emphasis renders without asterisks and preserves text', () => {
  assert.equal(inlineParts('**Bold** and *italic* with `code`').map(p => p.text).join(''), 'Bold and italic with code');
  assert.equal(inlineParts('2 * 3 = 6').map(p => p.text).join(''), '2 * 3 = 6');
});
test('unstructured responses stay readable and English headings work', () => {
  assert.equal(formatFeedback('A helpful response.')[0]?.lines[0], 'A helpful response.');
  assert.deepEqual(formatFeedback('### Strength: Clear ideas\n## Corrections\nTry a past tense.').map(s => s.kind), ['strength', 'corrections']);
  assert.deepEqual(formatFeedback(''), []);
});
