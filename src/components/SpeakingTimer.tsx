import { Text } from './LocalizedText';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, Pressable, View } from 'react-native';
import { Button, Icon, Meter, typography as t } from './UI';
import { colors as c } from '../theme';
export function SpeakingTimer({ defaultDuration = 60, isActive = true }: { defaultDuration?: number; isActive?: boolean }) {
  const [duration, setDuration] = useState(defaultDuration);
  const [remaining, setRemaining] = useState(defaultDuration);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  useEffect(() => {
    if (!running) return;
    const update = () => { const left = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)); setRemaining(left); if (!left) setRunning(false); };
    const timer = setInterval(update, 200);
    const sub = AppState.addEventListener('change', state => { if (state === 'active') update(); });
    return () => { clearInterval(timer); sub.remove(); };
  }, [running]);
  useEffect(() => { if (!isActive && running) { setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))); setRunning(false); } }, [isActive, running]);
  return <View style={{ backgroundColor: c.background, borderRadius: 14, padding: 16, gap: 14 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}><View style={{ flexDirection: 'row', gap: 8 }}><Icon name="mic-outline" size={18} /><Text style={t.heading}>Find your flow</Text></View><Text style={{ color: c.lime, fontSize: 24, fontWeight: '800', fontVariant: ['tabular-nums'] }}>{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</Text></View>
    <Text style={t.small}>An optional speaking warm-up. No recording — just you and your voice.</Text>
    <View style={{ flexDirection: 'row', gap: 8 }}>{[30, 60, 120].map(seconds => <Pressable key={seconds} accessibilityRole="button" accessibilityState={{ selected: duration === seconds, disabled: running }} disabled={running} onPress={() => { setDuration(seconds); setRemaining(seconds); }} style={{ borderWidth: 1, borderColor: duration === seconds ? c.lime : c.border, borderRadius: 8, paddingVertical: 7, paddingHorizontal: 14 }}><Text style={{ color: duration === seconds ? c.lime : c.muted }}>{seconds}s</Text></Pressable>)}</View>
    <Meter value={1 - remaining / duration} />
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><View style={{ flex: 1 }}><Button title={running ? 'Pause' : remaining === 0 ? 'Speak again' : remaining < duration ? 'Continue' : 'Start speaking'} icon={running ? 'pause' : 'play'} onPress={() => { if (running) { setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))); setRunning(false); } else { const seconds = remaining || duration; setRemaining(seconds); deadline.current = Date.now() + seconds * 1000; setRunning(true); } }} /></View><Pressable accessibilityRole="button" onPress={() => { setRunning(false); setRemaining(duration); }} style={{ padding: 12 }}><Text style={t.body}>Reset</Text></Pressable></View>
    {remaining === 0 && <Text accessibilityLiveRegion="polite" style={{ color: c.lime }}>Nicely done. Take a breath, then capture your thoughts below.</Text>}
  </View>;
}
