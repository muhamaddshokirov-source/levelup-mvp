import { lessons } from './course';
export const goals = { conversation: 'Erkin suhbatlashish', work: 'Ish va suhbatga tayyorlanish', travel: 'Sayohatda gaplasha olish', exam: 'Speaking imtihoniga tayyorlanish' } as const;
export const challenges = { confidence: 'Gapirishga tortinaman', vocabulary: 'So‘z topishda qiynalaman', grammar: 'Gap tuzishda qiynalaman', fluency: 'Gaplar orasida ko‘p to‘xtayman' } as const;
export type LearnerProfile = { version: 1; name: string; goal: keyof typeof goals; level: 'A1' | 'A2' | 'B1' | 'B2'; days: 2 | 3 | 5 | 7; minutes: 10 | 20 | 30 | 60; weeks: 4 | 8 | 12; challenge: keyof typeof challenges };
export const defaultLearner: LearnerProfile = { version: 1, name: '', goal: 'conversation', level: 'A1', days: 3, minutes: 20, weeks: 4, challenge: 'confidence' };
export function parseLearner(raw: string | null): LearnerProfile | null {
  if (raw === null) return null;
  const p = JSON.parse(raw);
  if (!p || p.version !== 1 || typeof p.name !== 'string' || !p.name.trim() || p.name.length > 30 || typeof p.goal !== 'string' || !Object.hasOwn(goals, p.goal) || typeof p.challenge !== 'string' || !Object.hasOwn(challenges, p.challenge) || !['A1', 'A2', 'B1', 'B2'].includes(p.level) || ![2, 3, 5, 7].includes(p.days) || ![10, 20, 30, 60].includes(p.minutes) || ![4, 8, 12].includes(p.weeks)) throw new Error('Invalid learner profile');
  return { version: 1, name: p.name.trim(), goal: p.goal, level: p.level, days: p.days, minutes: p.minutes, weeks: p.weeks, challenge: p.challenge };
}
export function buildLearningPlan(p: LearnerProfile) {
  const prep = Math.max(2, Math.round(p.minutes * .2));
  const review = Math.max(2, Math.round(p.minutes * .25));
  const speaking = p.minutes - prep - review;
  const focus = { confidence: 'Avval tanish mavzuda qisqa gapiring; yozuvingizdan bitta yaxshi jihat toping.', vocabulary: 'Har mashqda 3 ta foydali iborani Words’ga saqlab, ulardan gap tuzing.', grammar: 'Bitta sodda gap tuzilishini tanlab, 3 xil misolda ishlating.', fluency: 'Avval 30 soniya tayyorlaning, keyin bir fikrni to‘xtamasdan aytib ko‘ring.' }[p.challenge];
  const topics = { conversation: ['O‘zim haqimda', 'Kundalik hayot', 'Qiziqishlar va rejalar', 'Erkin savol-javob'], work: ['Kasbim va tajribam', 'Kuchli tomonlarim', 'Muammoni hal qilish', 'Sinov ish suhbati'], travel: ['O‘zimni tanishtirish', 'Ovqat buyurtma qilish', 'Yo‘l so‘rash va reja', 'Sayohat taassurotlari'], exam: ['Qisqa shaxsiy savollar', 'Bir mavzuni batafsil yoritish', 'Fikr va sabablar', 'Vaqt bilan sinov mashqi'] }[p.goal];
  const weekdays: Record<number, string[]> = { 2: ['Seshanba', 'Shanba'], 3: ['Dushanba', 'Chorshanba', 'Shanba'], 5: ['Dushanba', 'Seshanba', 'Chorshanba', 'Juma', 'Shanba'], 7: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'] };
  return { weeklyMinutes: p.days * p.minutes, totalMinutes: p.days * p.minutes * p.weeks, prep, speaking, review, focus, topics, weekdays: weekdays[p.days]!, lessons: lessons.filter(l => l.level === p.level), target: `${p.weeks} hafta ichida ${p.days * p.weeks} ta mashg‘ulot uchun vaqt ajratasiz. Maqsad — tanlagan vaziyatingizda javobni tuzish va muntazam gapirishni mashq qilish.` };
}
