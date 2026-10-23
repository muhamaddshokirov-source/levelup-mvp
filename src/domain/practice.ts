export type Session = { date: string; questionId: number; answer: string; words: number; xp: number };
export type PracticeData = { version: 1; sessions: Session[] };
export const EMPTY_DATA: PracticeData = { version: 1, sessions: [] };
export const DAILY_XP = 50;
export const LEVEL_XP = 250;
export const questions = [
  { topic: 'Everyday life', question: 'What does your perfect day look like?', hint: 'Think about your morning, the people you spend time with, and what makes you feel happy.' },
  { topic: 'Travel & discovery', question: 'If you could visit any place, where would you go?', hint: 'Describe the place, why it interests you, and what you would do there.' },
  { topic: 'Personal growth', question: 'What is one skill you would love to learn?', hint: 'Explain why you chose it, how you would start, and how it might change your life.' },
  { topic: 'People & connections', question: 'Who has had a positive impact on your life?', hint: 'Introduce the person, share a memory, and explain what you learned from them.' },
  { topic: 'Memories', question: 'What is a small moment you will always remember?', hint: 'Set the scene, describe what happened, and explain why it matters to you.' },
  { topic: 'Food & culture', question: 'What dish would you recommend to a visitor?', hint: 'Describe the taste, when people eat it, and what makes it special.' },
  { topic: 'Dreams & goals', question: 'Where would you like to be one year from now?', hint: 'Talk about a goal, the steps you can take, and how success would feel.' },
];
export function dateKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function dayNumber(key: string): number {
  const [y, m, d] = key.split('-').map(Number);
  return Math.floor(Date.UTC(y!, m! - 1, d!) / 86400000);
}
export function questionFor(key: string) {
  const id = ((dayNumber(key) % questions.length) + questions.length) % questions.length;
  return { ...questions[id]!, id };
}
export function wordCount(text: string): number {
  return (text.match(/[a-zA-Z]+(?:['’-][a-zA-Z]+)*/g) ?? []).length;
}
export function feedbackFor(answer: string) {
  const words = wordCount(answer);
  const hasReason = /\b(because|since|so|therefore)\b/i.test(answer);
  return {
    words,
    title: words >= 60 ? 'You brought your ideas to life.' : 'A little practice. A real step forward.',
    strength: hasReason ? 'You connected your ideas with a reason. That makes your response easier to follow.' : 'You put your thoughts into English. Consistent practice is how confidence grows.',
    tip: words < 40 ? 'Go a little further: add a specific example and explain why it matters to you.' : !hasReason ? 'Try connecting two ideas with “because” and give a reason for your answer.' : 'Read your answer aloud once more. Pause between ideas and notice any words you find difficult.',
  };
}
export function addSession(data: PracticeData, date: string, answer: string): PracticeData {
  if (data.sessions.some(s => s.date === date)) return data;
  if (wordCount(answer) < 20 || answer.length > 4000) throw new Error('Write at least 20 English words (maximum 4,000 characters).');
  return { version: 1, sessions: [...data.sessions, { date, questionId: questionFor(date).id, answer: answer.trim(), words: wordCount(answer), xp: DAILY_XP }] };
}
export function stats(data: PracticeData, today: string) {
  const dates = new Set(data.sessions.map(s => s.date));
  let cursor = dayNumber(today);
  if (!dates.has(today)) cursor--;
  const days = new Set([...dates].map(dayNumber));
  let streak = 0;
  while (days.has(cursor--)) streak++;
  const xp = data.sessions.reduce((sum, s) => sum + s.xp, 0);
  return { xp, streak, level: Math.floor(xp / LEVEL_XP) + 1, levelProgress: xp % LEVEL_XP, words: data.sessions.reduce((sum, s) => sum + s.words, 0) };
}
export function parseData(raw: string | null): PracticeData {
  if (raw === null) return { version: 1, sessions: [] };
  const data: unknown = JSON.parse(raw);
  if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1 || !('sessions' in data) || !Array.isArray(data.sessions)) throw new Error('Invalid saved data');
  const dates = new Set<string>();
  for (const s of data.sessions) {
    if (!s || typeof s !== 'object' || typeof s.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s.date) || !Number.isFinite(dayNumber(s.date)) || dateKey(new Date(`${s.date}T12:00:00`)) !== s.date || dates.has(s.date) || !Number.isInteger(s.questionId) || s.questionId !== questionFor(s.date).id || typeof s.answer !== 'string' || s.answer.length > 4000 || wordCount(s.answer) < 20 || s.words !== wordCount(s.answer) || s.xp !== DAILY_XP) throw new Error('Invalid saved session');
    dates.add(s.date);
  }
  return data as PracticeData;
}
