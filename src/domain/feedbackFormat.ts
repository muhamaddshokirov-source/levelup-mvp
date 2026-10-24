export type FeedbackSection = { kind: 'intro' | 'strength' | 'corrections' | 'improved' | 'question'; title: string; lines: string[] };
const headings: { kind: FeedbackSection['kind']; title: string; pattern: RegExp }[] = [
  { kind: 'strength', title: 'Kuchli tomoningiz', pattern: /^(?:kuchli tomon(?:ingiz|lari|i)?|strengths?)(?:\s*:|$)/i },
  { kind: 'corrections', title: 'Yanada tabiiyroq ayting', pattern: /^(?:tuzatishlar?|corrections?|yaxshilash(?:lar)?)(?:\s*:|$)/i },
  { kind: 'improved', title: 'Yaxshilangan javob', pattern: /^(?:yaxshilangan javob|improved (?:answer|response)|namunaviy javob)(?:\s*:|$)/i },
  { kind: 'question', title: 'Suhbatni davom ettiring', pattern: /^(?:keyingi savol|qo[‘’']shimcha savol|savol|follow[- ]up question)(?:\s*:|$)/i },
];
export function formatFeedback(text: string): FeedbackSection[] {
  const sections: FeedbackSection[] = [];
  let current: FeedbackSection = { kind: 'intro', title: 'Ustoz fikri', lines: [] };
  const flush = () => { if (current.lines.length) sections.push(current); };
  for (const raw of text.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trim().replace(/^#{1,6}\s+/, '').replace(/^[-*+]\s+/, '');
    if (!line || /^```/.test(line)) continue;
    // Remove emphasis only for heading detection, preserving formatting in body text.
    const plain = line.replace(/\*\*|__/g, '').replace(/^\d+[.)]\s+/, '');
    const heading = headings.find(h => h.pattern.test(plain));
    if (heading) {
      flush();
      current = { kind: heading.kind, title: heading.title, lines: [] };
      const body = plain.replace(heading.pattern, '').trim();
      if (body) current.lines.push(body);
    } else current.lines.push(line);
  }
  flush();
  return sections;
}
export function inlineParts(text: string): { text: string; emphasis: boolean }[] {
  return text.split(/(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|`[^`]+`)/g).filter(Boolean).map(part => {
    const marked = /^(\*\*|__|\*|`)/.test(part);
    return { text: marked ? part.replace(/^(\*\*|__|\*|`)|(?:\*\*|__|\*|`)$/g, '') : part, emphasis: marked };
  });
}
