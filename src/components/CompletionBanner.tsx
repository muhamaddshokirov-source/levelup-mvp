import { Text } from './LocalizedText';
import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, View } from 'react-native';
import { Icon, typography as t } from './UI';
import { colors as c } from '../theme';
export function CompletionBanner() {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (!reduced && active) { scale.setValue(0.92); Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }).start(); }
    });
    return () => { active = false; scale.stopAnimation(); };
  }, [scale]);
  return <Animated.View style={{ transform: [{ scale }], backgroundColor: '#233624', borderRadius: 16, padding: 22, alignItems: 'center', gap: 10 }}><View style={{ width: 56, height: 56, backgroundColor: c.lime, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}><Icon name="checkmark" color={c.background} size={30} /></View><Text accessibilityLiveRegion="polite" style={t.heading}>You showed up. That matters.</Text><Text style={{ color: c.lime, fontSize: 26, fontWeight: '800' }}>+50 XP earned</Text><Text style={t.small}>One more promise to yourself, kept.</Text></Animated.View>;
}
