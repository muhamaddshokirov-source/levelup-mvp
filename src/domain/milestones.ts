import { dayNumber, PracticeData, stats } from './practice';
export function milestones(data: PracticeData, today: string) {
  const summary = stats(data, today);
  return [
    { id: 'first', icon: 'leaf-outline' as const, title: 'First words', description: 'Complete your first practice', current: data.sessions.length, target: 1 },
    { id: 'habit', icon: 'flame-outline' as const, title: 'On a roll', description: 'Build a 3-day streak', current: bestStreak(data), target: 3 },
    { id: 'voice', icon: 'chatbubbles-outline' as const, title: 'Finding your voice', description: 'Write 500 words in total', current: summary.words, target: 500 },
    { id: 'five', icon: 'diamond-outline' as const, title: 'High five', description: 'Complete 5 daily practices', current: data.sessions.length, target: 5 },
  ];
}
export function bestStreak(data: PracticeData) {
  const days = [...new Set(data.sessions.map(s => dayNumber(s.date)))].sort((a, b) => a - b);
  let best = 0, run = 0, previous = -Infinity;
  for (const day of days) { run = day === previous + 1 ? run + 1 : 1; previous = day; best = Math.max(best, run); }
  return best;
}
export function weeklyCount(data: PracticeData, today: string) {
  const d = new Date(`${today}T12:00:00`);
  const monday = dayNumber(today) - (d.getDay() + 6) % 7;
  return data.sessions.filter(s => dayNumber(s.date) >= monday && dayNumber(s.date) <= dayNumber(today)).length;
}
