import React, { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Button, Card, Icon, typography as t } from './src/components/UI';
import { usePractice } from './src/hooks/usePractice';
import { TodayScreen } from './src/screens/TodayScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { useSettings } from './src/hooks/useSettings';
import { initials } from './src/domain/settings';
import { VocabularyScreen } from './src/screens/VocabularyScreen';
import { ReviewScreen } from './src/screens/ReviewScreen';
import { useVocabulary } from './src/hooks/useVocabulary';
import { colors as c } from './src/theme';
export default function App() { return <SafeAreaProvider><LevelUp /></SafeAreaProvider>; }
function LevelUp() {
  const [tab, setTab] = useState<'today' | 'progress' | 'profile' | 'vocabulary' | 'review'>('today');
  const practice = usePractice();
  const notebook = useVocabulary();
  const preferences = useSettings();
  const wide = useWindowDimensions().width >= 900;
  const scroll = useRef<ScrollView>(null);
  const navigate = (next: 'today' | 'progress' | 'profile' | 'vocabulary' | 'review') => { setTab(next); scroll.current?.scrollTo({ y: 0, animated: false }); };
  const navigation = <View style={[s.tabs, !wide && s.mobileTabs]}>{([{ id: 'today', title: 'Today', icon: 'grid-outline' }, { id: 'progress', title: 'Progress', icon: 'bar-chart-outline' }, { id: 'vocabulary', title: 'Words', icon: 'book-outline' }, { id: 'review', title: 'Review', icon: 'albums-outline' }, { id: 'profile', title: 'Profile', icon: 'person-outline' }] as const).map(item => <Pressable key={item.id} accessibilityRole="tab" accessibilityState={{ selected: tab === item.id }} onPress={() => navigate(item.id)} style={[s.tab, !wide && { flexDirection: 'column', paddingHorizontal: 4, gap: 5 }, tab === item.id && s.activeTab]}><Icon name={item.icon} color={tab === item.id ? c.lime : c.muted} size={18} /><Text style={{ color: tab === item.id ? c.lime : c.muted, fontSize: 13, fontWeight: '600' }}>{item.title}</Text></Pressable>)}</View>;
  return <SafeAreaView style={s.root}><StatusBar style="light" /><View style={s.header}><View style={s.headerInner}><View style={s.brand}><View style={s.logo}><Icon name="trending-up" color={c.background} size={23} /></View><Text style={s.brandText}>level<Text style={{ color: c.lime }}>up</Text><Text style={{ color: c.muted, fontSize: 12 }}> /</Text></Text></View>{wide && navigation}<Pressable accessibilityRole="button" accessibilityLabel="Open profile and settings" onPress={() => navigate('profile')} style={[s.profile, { borderColor: preferences.settings.color }]}><Text style={{ color: preferences.settings.color, fontWeight: '700', fontSize: 12 }}>{initials(preferences.settings.name)}</Text></Pressable></View></View>
    <ScrollView ref={scroll} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag"><View style={s.content}>
      {!practice.ready ? <Card><Text style={t.heading}>Welcome to LevelUp</Text>{practice.error ? <><Text accessibilityRole="alert" style={t.body}>{practice.error}</Text><Button title="Try loading again" onPress={() => { void practice.reload(); }} /></> : <ActivityIndicator color={c.lime} accessibilityLabel="Loading saved progress" />}</Card> : <>
        {practice.error && <Card style={{ borderColor: c.danger }}><Text accessibilityRole="alert" style={{ color: c.danger }}>{practice.error}</Text></Card>}
        {<><View style={tab !== 'today' ? { display: 'none' } : undefined}><TodayScreen key={practice.today} settings={preferences.settings} data={practice.data} today={practice.today} saving={practice.saving} onSubmit={practice.submit} onProgress={() => navigate('progress')} /></View>{tab === 'progress' && <ProgressScreen data={practice.data} today={practice.today} onPractice={() => navigate('today')} />}{<View style={tab !== 'profile' ? { display: 'none' } : undefined}><ProfileScreen key={String(preferences.ready)} settings={preferences.settings} ready={preferences.ready} saving={preferences.saving} error={preferences.error} onSave={preferences.save} onReload={() => { void preferences.reload(); }} data={practice.data} today={practice.today} /></View>}</>}
        <View style={tab !== 'vocabulary' ? { display: 'none' } : undefined}><VocabularyScreen notebook={notebook} onReview={() => navigate('review')} /></View><View style={tab !== 'review' ? { display: 'none' } : undefined}><ReviewScreen notebook={notebook} onNotebook={() => navigate('vocabulary')} /></View><View style={s.footer}><Text style={t.small}>Built for your next chapter.</Text><Text style={t.small}>LEVELUP · A LITTLE BETTER, EVERY DAY</Text></View>
      </>}
    </View></ScrollView>{!wide && navigation}
  </SafeAreaView>;
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.background }, header: { borderBottomWidth: 1, borderColor: c.border, paddingHorizontal: 24 }, headerInner: { width: '100%', maxWidth: 1100, alignSelf: 'center', minHeight: 84, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
  brand: { flexDirection: 'row', gap: 10, alignItems: 'center' }, logo: { backgroundColor: c.lime, padding: 7, borderRadius: 10 }, brandText: { color: c.text, fontWeight: '800', fontSize: 25, letterSpacing: -1 }, profile: { backgroundColor: '#233126', borderWidth: 1, borderColor: '#3B5030', width: 39, height: 39, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', gap: 2 }, mobileTabs: { padding: 10, borderTopWidth: 1, borderTopColor: c.border, backgroundColor: c.background, justifyContent: 'space-around' }, tab: { paddingHorizontal: 12, paddingVertical: 13, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }, activeTab: { backgroundColor: '#202E25' },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 38, paddingBottom: 24 }, content: { width: '100%', maxWidth: 1060, alignSelf: 'center', gap: 24 }, footer: { marginTop: 12, paddingTop: 22, borderTopWidth: 1, borderColor: c.border, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
});
