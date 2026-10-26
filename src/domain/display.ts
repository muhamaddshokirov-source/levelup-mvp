import { Language } from './translations';
export function detectDisplayLanguage(languages: readonly string[] = typeof navigator === 'undefined' ? [] : (navigator.languages?.length ? navigator.languages : [navigator.language])): Language {
  for (const value of languages) { const short = (typeof value === 'string' ? value : '').toLowerCase().split('-')[0]; if (short === 'en' || short === 'ru' || short === 'uz') return short; }
  return 'en';
}
export type DisplayPreferences = { language: Language; theme: 'dark' | 'light' };
export function parseDisplayPreferences(raw: string | null, preferredLanguage = detectDisplayLanguage()): DisplayPreferences {
  if (raw === null) return { language: preferredLanguage, theme: 'dark' };
  const value = JSON.parse(raw);
  if (!value || !['uz', 'ru', 'en'].includes(value.language) || !['dark', 'light'].includes(value.theme)) throw new Error('Invalid display settings');
  return { language: value.language, theme: value.theme };
}
