import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from './LocalizedText';
import { Icon, IconName } from './UI';

/** Decorative brand illustration: not live audio, fabricated statistics or a recording control. */
function VoiceArtwork({ compact }: { compact: boolean }) {
  return <View pointerEvents="none" accessible={false} accessibilityElementsHidden aria-hidden style={{ height: compact ? 138 : 204, width: '100%', maxWidth: 290, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
    {[170, 130, 90].map((size, i) => <View key={size} style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, borderWidth: 1, borderColor: i === 1 ? '#C3F85C30' : '#FFFFFF12', transform: [{ rotateX: '20deg' }, { rotateZ: '-24deg' }] }} />)}
    <View style={{ position: 'absolute', right: 18, top: 8, width: 36, height: 36, backgroundColor: '#C3F85C', borderRadius: 12, justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '12deg' }] }}><Icon name="sparkles" color="#192522" size={19} /></View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 100, paddingHorizontal: 18, borderRadius: 24, backgroundColor: '#111B2CC0', borderWidth: 1, borderColor: '#FFFFFF22', transform: [{ rotate: '-6deg' }] }}>
      {[14, 26, 44, 32, 62, 46, 76, 54, 32, 48, 26, 14].map((height, i) => <View key={i} style={{ height, width: 7, borderRadius: 8, backgroundColor: i > 6 ? '#B7A4FA' : '#C3F85C' }} />)}
    </View>
    {!compact && <View style={{ position: 'absolute', bottom: 9, left: 16, borderWidth: 1, borderColor: '#FFFFFF20', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#202E3F', flexDirection: 'row', alignItems: 'center', gap: 8 }}><View style={{ width: 7, height: 7, backgroundColor: '#C3F85C', borderRadius: 4 }} /><Text style={{ color: '#F5F6FA', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>FIND YOUR VOICE</Text></View>}
  </View>;
}
export function FeatureHero({ eyebrow, title, body, icon = 'mic-outline', stacked = false, children }: { eyebrow: string; title: React.ReactNode; body: React.ReactNode; icon?: IconName; stacked?: boolean; children?: React.ReactNode }) {
  const narrow = useWindowDimensions().width < 700 || stacked;
  return <LinearGradient colors={['#202943', '#122E32', '#202840']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 28, padding: narrow ? 22 : 34, borderWidth: 1, borderColor: '#52647C60', overflow: 'hidden', minWidth: 0 }}>
    <View pointerEvents="none" style={{ position: 'absolute', right: 0, top: 0, width: 170, height: 170, borderRadius: 85, backgroundColor: '#B7A4FA0D' }} />
    <View style={{ flexDirection: narrow ? 'column' : 'row', gap: narrow ? 12 : 26, alignItems: narrow ? 'stretch' : 'center' }}>
      <View style={{ flex: narrow ? undefined : 1, minWidth: 0, gap: 17 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}><View style={{ backgroundColor: '#C3F85C18', borderRadius: 10, padding: 7 }}><Icon name={icon} color="#C3F85C" size={16} /></View><Text style={{ color: '#D0F78D', fontSize: 10, fontWeight: '800', letterSpacing: 1.8, flexShrink: 1 }}>{eyebrow}</Text></View>
        <Text style={{ color: '#F8FAFF', fontSize: narrow ? 33 : 44, lineHeight: narrow ? 39 : 49, letterSpacing: -1.5, fontWeight: '800', flexShrink: 1 }}>{title}</Text>
        <Text style={{ color: '#B8C8D2', fontSize: 14, lineHeight: 23, maxWidth: 530 }}>{body}</Text>
        {children}
      </View>
      <View style={{ width: narrow ? '100%' : 240, flexShrink: 1 }}><VoiceArtwork compact={narrow} /></View>
    </View>
  </LinearGradient>;
}
