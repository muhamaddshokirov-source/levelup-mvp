export type VocabularyEntry = { id: string; word: string; meaning: string; example: string; learned: boolean; createdAt: string };
export type VocabularyData = { version: 1; entries: VocabularyEntry[] };
export const emptyVocabulary: VocabularyData = { version: 1, entries: [] };
export function validateEntry(entry: VocabularyEntry): VocabularyEntry {
  if (!entry || typeof entry.id !== 'string' || !entry.id || typeof entry.word !== 'string' || !entry.word.trim() || entry.word.length > 80 || typeof entry.meaning !== 'string' || !entry.meaning.trim() || entry.meaning.length > 300 || typeof entry.example !== 'string' || entry.example.length > 500 || typeof entry.learned !== 'boolean' || typeof entry.createdAt !== 'string' || !Number.isFinite(Date.parse(entry.createdAt))) throw new Error('Enter a word and meaning within the character limits.');
  return { ...entry, word: entry.word.trim(), meaning: entry.meaning.trim(), example: entry.example.trim() };
}
export function parseVocabulary(raw: string | null): VocabularyData {
  if (raw === null) return { version: 1, entries: [] };
  const value = JSON.parse(raw);
  if (!value || value.version !== 1 || !Array.isArray(value.entries)) throw new Error('Invalid vocabulary data');
  const entries: VocabularyEntry[] = value.entries.map(validateEntry);
  if (new Set(entries.map(e => e.id)).size !== entries.length || new Set(entries.map(e => e.word.toLowerCase())).size !== entries.length) throw new Error('Duplicate vocabulary entries');
  return { version: 1, entries };
}
export function upsertEntry(data: VocabularyData, entry: VocabularyEntry): VocabularyData {
  const valid = validateEntry(entry);
  if (data.entries.some(e => e.id !== valid.id && e.word.toLowerCase() === valid.word.toLowerCase())) throw new Error('That word is already in your notebook. Edit the existing entry instead.');
  return { version: 1, entries: data.entries.some(e => e.id === valid.id) ? data.entries.map(e => e.id === valid.id ? valid : e) : [valid, ...data.entries] };
}
