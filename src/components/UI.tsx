import { Text } from './LocalizedText';
import { themedStyles } from '../theme';
import React from 'react';
import { Pressable, View, ViewStyle, StyleProp, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors as c } from '../theme';
export type IconName = React.ComponentProps<typeof Ionicons>['name'];
export function Icon({ name, size = 20, color = c.lime }: { name: IconName; size?: number; color?: string }) {
  return <Ionicons accessible={false} accessibilityElementsHidden importantForAccessibility="no" aria-hidden name={name} size={size} color={color} />;
}
export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const compact = useWindowDimensions().width < 480;
  return <View style={[styles.card, compact && { padding: 18 }, style]}>{children}</View>;
}
export function Button({ title, onPress, disabled, icon, variant = 'primary' }: { variant?: 'primary' | 'secondary' | 'ghost'; title: string; onPress: () => void; disabled?: boolean; icon?: IconName }) {
  const secondary = variant !== 'primary';
  const ink = secondary ? c.text : c.background;
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, secondary && { backgroundColor: variant === 'ghost' ? 'transparent' : c.raised, borderWidth: 1, borderColor: variant === 'ghost' ? 'transparent' : c.border, boxShadow: 'none' }, disabled && { opacity: 0.45 }, pressed && { opacity: 0.8, transform: [{ scale: 0.985 }] }]}><Text style={[styles.buttonText, { color: ink }]}>{title}</Text>{icon && <Icon name={icon} color={ink} size={19} />}</Pressable>;

}
export function Meter({ value }: { value: number }) {
  return <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }} style={styles.track}><View style={[styles.fill, { width: `${Math.min(100, Math.max(0, value * 100))}%` }]} /></View>;
}
export const typography = themedStyles(() => ({
  eyebrow: { flexShrink: 1, maxWidth: '100%', color: c.lime, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  title: { flexShrink: 1, maxWidth: '100%', color: c.text, fontSize: 34, fontWeight: '800', letterSpacing: -1.2 },
  heading: { flexShrink: 1, maxWidth: '100%', color: c.text, fontSize: 19, fontWeight: '700', letterSpacing: -0.3 },
  body: { flexShrink: 1, maxWidth: '100%', color: c.muted, fontSize: 14, lineHeight: 22 },
  small: { flexShrink: 1, maxWidth: '100%', color: c.muted, fontSize: 12, lineHeight: 19 },
}));
const styles = themedStyles(() => ({
  card: { minWidth: 0, maxWidth: '100%', backgroundColor: c.surface, borderRadius: 18, padding: 24, borderWidth: 1, borderColor: c.border, gap: 16, boxShadow: '0px 2px 8px rgba(0,0,0,0.025)' },
  button: { minWidth: 0, maxWidth: '100%', flexShrink: 1, backgroundColor: c.lime, minHeight: 52, paddingHorizontal: 18, paddingVertical: 14, borderRadius: 16, boxShadow: '0px 4px 14px rgba(98,150,30,0.1)', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 12 },
  buttonText: { flexShrink: 1, minWidth: 0, textAlign: 'center', color: c.background, fontSize: 14, fontWeight: '800' },
  track: { height: 8, borderRadius: 8, backgroundColor: c.border, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: c.lime, borderRadius: 8 },
}));
