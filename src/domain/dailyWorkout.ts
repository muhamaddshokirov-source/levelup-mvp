import { dateKey, dayNumber, questionFor } from './practice';
export type WorkoutProgress = { warmup: boolean; stretch: boolean; answer: string };
export type WorkoutHistory = { version: 1; days: Record<string, WorkoutProgress> };
export const EMPTY_WORKOUT: WorkoutProgress = { warmup: false, stretch: false, answer: '' };
const warmups = ['Describe three things you can see around you.', 'Talk about something you enjoyed yesterday.', 'Describe one small plan for tomorrow.', 'Explain one thing you do every morning.', 'Say what you like about your neighbourhood.', 'Describe a meal you recently enjoyed.', 'Tell someone about a hobby you want to try.'];
const stretches = ['Compare your answer with what a friend might say. Why could your choices differ?', 'Give a specific example that supports your main answer.', 'Explain how your answer might change five years from now.', 'Describe one possible difficulty and suggest a solution.', 'Ask a follow-up question, then give your own answer to it.', 'Give another point of view and explain whether you agree.', 'Tell a short story connected to your main answer.'];
export function dailyWorkout(day: string) { const n = ((dayNumber(day) % 7) + 7) % 7; return { warmup: warmups[n]!, main: questionFor(day), stretch: stretches[n]!, phrase: ['For example,', 'The main reason is', 'Compared with', 'What I enjoy most is', 'One possibility is', 'On the other hand,', 'In the future,'][n]! }; }
export function parseWorkout(raw: string | null): WorkoutHistory {
  if (raw === null) return { version: 1, days: {} };
  const data = JSON.parse(raw);
  if (!data || data.version !== 1 || !data.days || typeof data.days !== 'object' || Array.isArray(data.days)) throw new Error('Invalid workout progress');
  for (const [day, value] of Object.entries(data.days)) {
    const item = value as WorkoutProgress;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || dateKey(new Date(`${day}T12:00:00`)) !== day || !item || typeof item.warmup !== 'boolean' || typeof item.stretch !== 'boolean' || typeof item.answer !== 'string' || item.answer.length > 1000) throw new Error('Invalid workout progress');
  }
  return data;
}
export function saveWorkoutDay(history: WorkoutHistory, day: string, value: WorkoutProgress): WorkoutHistory {
  const days = { ...history.days, [day]: value };
  return { version: 1, days: Object.fromEntries(Object.keys(days).sort().reverse().slice(0, 14).map(key => [key, days[key]!])) };
}
