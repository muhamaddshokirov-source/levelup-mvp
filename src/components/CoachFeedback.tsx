import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatFeedback, inlineParts, FeedbackSection } from '../domain/feedbackFormat';
import { Card, Icon, IconName, typography as t } from './UI';
import { colors as c } from '../theme';
const accents: Record<FeedbackSection['kind'], { color: string; icon: IconName; label: string }> = {
  intro: { color: c.lime, icon: 'sparkles-outline', label: 'SHAXSIY FEEDBACK' },
  strength: { color: c.lime, icon: 'checkmark-circle-outline', label: '01 · KUCHLI TOMON' },
  corrections: { color: '#FFBA75', icon: 'create-outline', label: '02 · KICHIK TUZATISHLAR' },
  improved: { color: '#B7A4FA', icon: 'chatbubble-ellipses-outline', label: '03 · NAMUNAVIY JAVOB' },
  question: { color: '#81D8ED', icon: 'arrow-forward-circle-outline', label: '04 · KEYINGI QADAM' },
};
function RichText({ text, color = c.text }: { text: string; color?: string }) {
  return <Text selectable style={[t.body, { color, lineHeight: 26, fontSize: 15 }]}>{inlineParts(text).map((part, index) => <Text key={index} style={part.emphasis ? { fontWeight: '700', color } : undefined}>{part.text}</Text>)}</Text>;
}
export function CoachFeedback({ feedback }: { feedback: string }) {
  const sections = formatFeedback(feedback);
  return <View style={{ gap: 18 }} accessibilityLiveRegion="polite">
    <View style={s.header}><View style={s.seal}><Icon name="sparkles-outline" size={24} /></View><View style={{ flex: 1, minWidth: 0, gap: 4 }}><Text style={t.heading}>Bir qadam oldinga.</Text><Text style={t.small}>AI ustoz fikri · O‘rganing, tekshiring, yana aytib ko‘ring.</Text></View></View>
    {sections.map((section, index) => {
      const accent = accents[section.kind];
      return <Card key={`${section.kind}-${index}`} style={{ borderColor: `${accent.color}50`, gap: 18 }}>
        <View style={s.header}><View style={[s.sectionIcon, { backgroundColor: `${accent.color}15` }]}><Icon name={accent.icon} color={accent.color} size={21} /></View><View style={{ flex: 1, minWidth: 0, gap: 4 }}><Text style={[t.eyebrow, { color: accent.color, fontSize: 10 }]}>{accent.label}</Text><Text accessibilityRole="header" style={t.heading}>{section.title}</Text></View></View>
        {section.lines.map((line, row) => {
          const numbered = /^(\d+)[.)]\s+/.exec(line);
          const body = line.replace(/^\d+[.)]\s+/, '').replace(/\s*->\s*/g, ' → ');
          return <View key={row} style={[s.line, section.kind === 'improved' && s.quote]}>{section.kind === 'corrections' && <View style={s.number}><Text style={{ color: accent.color, fontWeight: '700', fontSize: 12 }}>{numbered?.[1] ?? row + 1}</Text></View>}<View style={{ flex: 1, minWidth: 0 }}><RichText text={body} color={section.kind === 'improved' ? '#E0D8FF' : c.text} /></View></View>;
        })}
      </Card>;
    })}
    <View style={s.next}><Icon name="mic-outline" /><View style={{ flex: 1, minWidth: 0, gap: 5 }}><Text style={t.heading}>Endi yana bir bor ayting</Text><Text style={t.body}>Bitta tavsiyani tanlang va javobingizni ovoz chiqarib takrorlang. Maqsad — mukammallik emas, kichik o‘sish.</Text></View></View>
    <Text style={t.small}>AI xato qilishi mumkin. Bu matn bo‘yicha tavsiya, talaffuz tahlili yoki rasmiy daraja bahosi emas.</Text>
  </View>;
}
const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, minWidth: 0 },
  seal: { width: 48, height: 48, borderRadius: 16, backgroundColor: c.limeDark, alignItems: 'center', justifyContent: 'center' },
  sectionIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  line: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, minWidth: 0 },
  number: { width: 25, height: 25, borderRadius: 8, backgroundColor: '#FFBA7515', alignItems: 'center', justifyContent: 'center' },
  quote: { padding: 18, borderRadius: 12, backgroundColor: '#B7A4FA0C', borderLeftWidth: 3, borderLeftColor: '#B7A4FA' },
  next: { flexDirection: 'row', gap: 12, padding: 20, borderRadius: 16, backgroundColor: c.limeDark },
});
