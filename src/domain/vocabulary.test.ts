import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyVocabulary, parseVocabulary, upsertEntry, VocabularyEntry } from './vocabulary';
const entry: VocabularyEntry = { id: 'one', word: '  curious ', meaning: 'Eager to learn', example: 'I am curious about new cultures.', learned: false, createdAt: '2026-10-23T12:00:00Z' };
test('notebook defaults, trims input and round trips', () => {
  assert.deepEqual(parseVocabulary(null), emptyVocabulary);
  const data = upsertEntry(emptyVocabulary, entry);
  assert.equal(data.entries[0]?.word, 'curious');
  assert.deepEqual(parseVocabulary(JSON.stringify(data)), data);
});
test('editing and learned status update in place', () => {
  const data = upsertEntry(emptyVocabulary, entry);
  const updated = upsertEntry(data, { ...entry, meaning: 'Interested', learned: true });
  assert.equal(updated.entries.length, 1);
  assert.equal(updated.entries[0]?.learned, true);
  assert.equal(updated.entries[0]?.meaning, 'Interested');
  assert.equal(data.entries[0]?.learned, false);
});
test('case-insensitive duplicate words are rejected', () => {
  const data = upsertEntry(emptyVocabulary, entry);
  assert.throws(() => upsertEntry(data, { ...entry, id: 'two', word: 'CURIOUS' }));
});
test('invalid or duplicate saved vocabulary does not silently reset', () => {
  for (const raw of ['{', 'null', '{}', JSON.stringify({ version: 2, entries: [] }), JSON.stringify({ version: 1, entries: [entry, entry] }), JSON.stringify({ version: 1, entries: [{ ...entry, word: '' }] }), JSON.stringify({ version: 1, entries: [{ ...entry, learned: 'yes' }] }), JSON.stringify({ version: 1, entries: [{ ...entry, example: 'a'.repeat(501) }] })]) assert.throws(() => parseVocabulary(raw));
});
