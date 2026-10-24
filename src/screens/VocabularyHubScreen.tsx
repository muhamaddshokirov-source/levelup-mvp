import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../components/LocalizedText';
import { Icon } from '../components/UI';
import { colors as c } from '../theme';
import { useVocabulary } from '../hooks/useVocabulary';
import { VocabularyScreen } from './VocabularyScreen';
import { ReviewScreen } from './ReviewScreen';
/** One destination, two local modes. Keep both mounted to preserve drafts/decks. */
export function VocabularyHubScreen({ notebook, onModeChange }: { notebook: ReturnType<typeof useVocabulary>; onModeChange: () => void }) {
  const [mode, setMode] = useState<'words' | 'review'>('words');
  const changeMode = (next: 'words' | 'review') => { setMode(next); onModeChange(); };
  return <View style={{ gap: 20 }}>
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {([{ id: 'words', title: 'Words', icon: 'book-outline' }, { id: 'review', title: 'Review', icon: 'albums-outline' }] as const).map(item => <Pressable key={item.id} accessibilityRole="button" aria-pressed={mode === item.id} accessibilityState={{ selected: mode === item.id }} onPress={() => changeMode(item.id)} style={{ flex: 1, minHeight: 48, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: mode === item.id ? c.lime : c.border, backgroundColor: mode === item.id ? c.limeDark : c.surface, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}><Icon name={item.icon} size={18} /><Text style={{ color: mode === item.id ? c.lime : c.muted, fontWeight: '700' }}>{item.title}</Text></Pressable>)}
    </View>
    <View style={mode !== 'words' ? { display: 'none' } : undefined}><VocabularyScreen notebook={notebook} onReview={() => changeMode('review')} /></View>
    <View style={mode !== 'review' ? { display: 'none' } : undefined}><ReviewScreen notebook={notebook} onNotebook={() => changeMode('words')} /></View>
  </View>;
}
