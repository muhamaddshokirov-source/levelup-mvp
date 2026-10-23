export const avatarColors = ['#C3F85C', '#B7A4FA', '#FFBA75', '#81D8ED'] as const;
export type Settings = { version: 1; name: string; color: string; weeklyGoal: number; timerSeconds: number };
export const defaultSettings: Settings = { version: 1, name: '', color: avatarColors[0], weeklyGoal: 3, timerSeconds: 60 };
export function parseSettings(raw: string | null): Settings {
  if (raw === null) return { ...defaultSettings };
  const value = JSON.parse(raw);
  if (!value || value.version !== 1 || typeof value.name !== 'string' || value.name.length > 30 || !avatarColors.some(c => c === value.color) || ![2, 3, 5, 7].includes(value.weeklyGoal) || ![30, 60, 120].includes(value.timerSeconds)) throw new Error('Invalid settings');
  return { version: 1, name: value.name.trim(), color: value.color, weeklyGoal: value.weeklyGoal, timerSeconds: value.timerSeconds };
}
export function initials(name: string) {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => Array.from(part)[0]).join('').toUpperCase() || 'YOU';
}
