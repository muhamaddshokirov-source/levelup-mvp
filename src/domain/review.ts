import { VocabularyEntry } from './vocabulary';
export type ReviewFilter = 'learning' | 'all' | 'learned';
export function reviewDeck(entries: VocabularyEntry[], filter: ReviewFilter, random = Math.random): VocabularyEntry[] {
  const deck = entries.filter(entry => filter === 'all' || entry.learned === (filter === 'learned'));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j]!, deck[i]!];
  }
  return deck.slice(0, 20);
}
