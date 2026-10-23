import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewDeck } from './review';
import { VocabularyEntry } from './vocabulary';
const entries: VocabularyEntry[] = Array.from({ length: 25 }, (_, i) => ({ id: `${i}`, word: `word ${i}`, meaning: `meaning ${i}`, example: '', learned: i % 2 === 0, createdAt: '2026-10-23T12:00:00Z' }));
test('review filters learned and learning collections', () => {
  assert.equal(reviewDeck(entries, 'learning').length, 12);
  assert.ok(reviewDeck(entries, 'learning').every(e => !e.learned));
  assert.equal(reviewDeck(entries, 'learned').length, 13);
  assert.ok(reviewDeck(entries, 'learned').every(e => e.learned));
});
test('review is capped at 20 unique cards and does not reorder the notebook', () => {
  const before = entries.map(e => e.id);
  const deck = reviewDeck(entries, 'all', () => 0.4);
  assert.equal(deck.length, 20);
  assert.equal(new Set(deck.map(e => e.id)).size, 20);
  assert.deepEqual(entries.map(e => e.id), before);
});
test('empty collections and one-word sessions work', () => {
  assert.deepEqual(reviewDeck([], 'all'), []);
  assert.deepEqual(reviewDeck([entries[0]!], 'all'), [entries[0]!]);
  assert.deepEqual(reviewDeck([entries[0]!], 'learning'), []);
});
