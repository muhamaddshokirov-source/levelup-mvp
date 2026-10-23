import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors as c } from '../theme';
export type IconName = React.ComponentProps<typeof Ionicons>['name'];
export function Icon({ name, size = 20, color = c.lime }: { name: IconName; size?: number; color?: string }) {
  return <Ionicons name={name} size={size} color={color} />;
}
export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
export function Button({ title, onPress, disabled, icon }: { title: string; onPress: () => void; disabled?: boolean; icon?: IconName }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, disabled && { opacity: 0.45 }, pressed && { opacity: 0.8 }]}><Text style={styles.buttonText}>{title}</Text>{icon && <Icon name={icon} color={c.background} size={19} />}</Pressable>;
}
export function Meter({ value }: { value: number }) {
  return <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }} style={styles.track}><View style={[styles.fill, { width: `${Math.min(100, Math.max(0, value * 100))}%` }]} /></View>;
}
export const typography = StyleSheet.create({
  eyebrow: { color: c.lime, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  title: { color: c.text, fontSize: 34, fontWeight: '800', letterSpacing: -1.2 },
  heading: { color: c.text, fontSize: 19, fontWeight: '700', letterSpacing: -0.3 },
  body: { color: c.muted, fontSize: 14, lineHeight: 22 },
  small: { color: c.muted, fontSize: 12, lineHeight: 19 },
});
const styles = StyleSheet.create({
  card: { backgroundColor: c.surface, borderRadius: 20, padding: 24, borderWidth: 1, borderColor: c.border, gap: 16 },
  button: { backgroundColor: c.lime, minHeight: 50, paddingHorizontal: 22, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 12 },
  buttonText: { color: c.background, fontSize: 14, fontWeight: '800' },
  track: { height: 7, borderRadius: 8, backgroundColor: c.border, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: c.lime, borderRadius: 8 },
});
