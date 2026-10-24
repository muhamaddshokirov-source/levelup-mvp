import { Language } from './translations';
export type DisplayPreferences = { language: Language; theme: 'dark' | 'light' };
export function parseDisplayPreferences(raw: string | null): DisplayPreferences {
  if (raw === null) return { language: 'uz', theme: 'dark' };
  const value = JSON.parse(raw);
  if (!value || !['uz', 'ru', 'en'].includes(value.language) || !['dark', 'light'].includes(value.theme)) throw new Error('Invalid display settings');
  return { language: value.language, theme: value.theme };
}
