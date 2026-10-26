export type IELTSPart = 1 | 2 | 3;
export const IELTS_SOURCE = 'https://ielts.org/cdn/ielts-downloadable-assets/ielts-sample-tests/ielts-speaking-sample-tasks-2023.pdf';
export type IELTSPack = { id: string; title: string; official: boolean; part1: string[]; cue: string; points: string[]; part3: string[] };
// Only the first pack reproduces short official sample prompts (<200 source words).
// Other packs are original LevelUp practice, not claimed exam predictions or official questions.
export const ieltsPacks: IELTSPack[] = [
  { id: 'official', title: 'Home, possessions & values', official: true,
    part1: ['What kind of place is your home town or village?', 'What’s the most interesting part of your town/village?', 'Tell me about the kind of accommodation you live in?', 'What do you like about living there?'],
    cue: 'Describe something you own which is very important to you.', points: ['where you got it from', 'how long you have had it', 'what you use it for'],
    part3: ['What kind of things give status to people in your country?', 'Have things changed since your parents’ time?', 'Do you think advertising influences what people buy?'] },
  { id: 'learning', title: 'Learning & opportunities', official: false,
    part1: ['What do you enjoy learning at the moment?', 'Do you prefer studying in the morning or the evening?', 'Who do you usually ask when you need help learning?', 'Has the way you study changed recently?'],
    cue: 'Describe a skill you learned that made your life easier.', points: ['what the skill is', 'how you learned it', 'a time you used it', 'why learning it mattered to you'],
    part3: ['How can schools help people become independent learners?', 'Is practical experience always more useful than formal study?', 'How might technology change the skills people need in the future?'] },
  { id: 'places', title: 'Places & community', official: false,
    part1: ['Where do you like spending time near your home?', 'How often do you visit public parks?', 'What would you like to improve in your neighbourhood?', 'Do you enjoy exploring unfamiliar places?'],
    cue: 'Describe a public place where you enjoyed spending time.', points: ['where it is', 'when you went there', 'what you did there', 'why the visit was memorable'],
    part3: ['Why do some public places bring communities together?', 'Who should pay for maintaining public spaces?', 'How could cities balance tourism with residents’ everyday needs?'] },
];
export const ieltsGuidance: Record<IELTSPart, { title: string; focus: string; seconds: number }> = {
  1: { title: 'Part 1 · Introduction', focus: 'Answer directly, add a reason, then a personal detail.', seconds: 45 },
  2: { title: 'Part 2 · Long turn', focus: 'Make brief notes, then connect your ideas into a short story.', seconds: 120 },
  3: { title: 'Part 3 · Discussion', focus: 'State a view, explain it, give an example and consider another perspective.', seconds: 90 },
};
export function ieltsPrompt(pack: IELTSPack, part: IELTSPart, index: number): string {
  if (part === 2) return `${pack.cue}\nYou should say:\n${pack.points.map(point => `• ${point}`).join('\n')}`;
  return (part === 1 ? pack.part1 : pack.part3)[index] || '';
}
export function ieltsReviewQuestion(prompt: string, part: IELTSPart) {
  return `IELTS Speaking Part ${part} practice: ${prompt}. Review only my written/transcribed English for clarity, development, vocabulary and grammar. Quote evidence for corrections. Give an improved version and one next exercise. Do not assign an IELTS band or judge pronunciation, timing or fluency from text.`.slice(0, 1000);
}
