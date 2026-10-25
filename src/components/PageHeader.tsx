import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Text } from './LocalizedText';
import { Icon, IconName, typography as t } from './UI';
import { colors as c } from '../theme';
/** Quiet workspace header. Marketing illustrations belong on entry screens. */
export function PageHeader({ eyebrow, title, body, icon = 'grid-outline' }: { eyebrow: string; title: React.ReactNode; body: React.ReactNode; icon?: IconName }) {
  const compact = useWindowDimensions().width < 700;
  return <View style={{ flexDirection: 'row', gap: 18, alignItems: 'flex-start', paddingBottom: 24, borderBottomWidth: 1, borderColor: c.border }}>
    <View style={{ flex: 1, minWidth: 0, gap: 10 }}><Text style={[t.eyebrow, { color: c.muted, fontSize: 10, letterSpacing: 1.5 }]}>{eyebrow}</Text><Text accessibilityRole="header" style={[t.title, { fontSize: compact ? 29 : 36, lineHeight: compact ? 36 : 43 }]}>{title}</Text><Text style={[t.body, { maxWidth: 680 }]}>{body}</Text></View>
    {!compact && <View style={{ width: 46, height: 46, borderRadius: 14, borderWidth: 1, borderColor: c.border, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface }}><Icon name={icon} color={c.muted} size={21} /></View>}
  </View>;
}
