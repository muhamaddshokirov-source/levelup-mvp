import { AdminScreen } from './src/screens/AdminScreen';
import { useCommunity } from './src/hooks/useCommunity';
import { DisplaySettings } from './src/components/DisplaySettings';
import { loadDisplayPreferences, useDisplayPreferences } from './src/displayPreferences';
import { translate } from './src/domain/translations';
import { Text } from './src/components/LocalizedText';
import { themedStyles } from './src/theme';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Button, Card, Icon, typography as t } from './src/components/UI';
import { usePractice } from './src/hooks/usePractice';
import { TodayScreen } from './src/screens/TodayScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { useSettings } from './src/hooks/useSettings';
import { initials } from './src/domain/settings';
import { VocabularyHubScreen } from './src/screens/VocabularyHubScreen';
import { useVocabulary } from './src/hooks/useVocabulary';
import { CourseScreen } from './src/screens/CourseScreen';
import { CoachScreen } from './src/screens/CoachScreen';
import { LearnerProfile } from './src/domain/learningPlan';
import { useLearner } from './src/hooks/useLearner';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { PlanScreen } from './src/screens/PlanScreen';
import { colors as c } from './src/theme';
export default function App() { return <SafeAreaProvider><LevelUp /></SafeAreaProvider>; }
function LevelUp() {
  const insets = useSafeAreaInsets();
  const display = useDisplayPreferences();
  useEffect(() => { void loadDisplayPreferences(); }, []);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tab, setTab] = useState<'today' | 'progress' | 'profile' | 'vocabulary' | 'course' | 'coach' | 'admin'>('today');
  const [coachInput, setCoachInput] = useState({ answer: '', question: '', key: 0 });
  const openCoach = (answer: string, question: string) => { setCoachInput(value => ({ answer, question, key: value.key + 1 })); navigate('coach'); };
  const learner = useLearner();
  const [planOpen, setPlanOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(false);
  const practice = usePractice();
  const community = useCommunity();
  const notebook = useVocabulary();
  const preferences = useSettings();
  const effectiveProfile = learner.profile ? { ...learner.profile, name: preferences.settings.name || learner.profile.name, days: preferences.settings.weeklyGoal as LearnerProfile['days'] } : null;
  const wide = useWindowDimensions().width >= 1100;
  const scroll = useRef<ScrollView>(null);
  const navigate = (next: 'today' | 'progress' | 'profile' | 'vocabulary' | 'course' | 'coach' | 'admin') => { setSettingsOpen(false); setTab(next); scroll.current?.scrollTo({ y: 0, animated: false }); };
  const primary = [{ id: 'today', title: 'Today', icon: 'grid-outline' }, { id: 'course', title: 'Learn', icon: 'school-outline' }, { id: 'coach', title: 'AI tutor', icon: 'sparkles-outline' }, { id: 'progress', title: 'Progress', icon: 'bar-chart-outline' }, { id: 'vocabulary', title: 'Words', icon: 'book-outline' }] as const;
  const navigation = <View style={[s.tabs, !wide && s.mobileTabs]}>{primary.map(item => <Pressable key={item.id} accessibilityRole="tab" aria-selected={tab === item.id} accessibilityLabel={translate(item.title, display.language)} accessibilityState={{ selected: tab === item.id }} onPress={() => navigate(item.id)} style={[s.tab, !wide && s.mobileTab, tab === item.id && s.activeTab]}><Icon name={item.icon} color={tab === item.id ? c.lime : c.muted} size={20} /><Text numberOfLines={1} style={{ color: tab === item.id ? c.lime : c.muted, fontSize: 11, fontWeight: '600' }}>{item.title}</Text></Pressable>)}</View>;
  const menu = <Modal visible={settingsOpen} transparent animationType="fade" onRequestClose={() => setSettingsOpen(false)}><View style={{ flex: 1, backgroundColor: '#00000080', justifyContent: 'flex-end', alignItems: 'center' }}><View style={{ backgroundColor: c.background, width: '100%', maxWidth: 640, maxHeight: '90%', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1, borderColor: c.border }}><View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18 }}><Text accessibilityRole="header" style={t.heading}>Appearance & language</Text><Pressable accessibilityRole="button" accessibilityLabel={translate('Close', display.language)} onPress={() => setSettingsOpen(false)} style={{ padding: 12 }}><Icon name="close" color={c.text} /></Pressable></View><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 18, paddingTop: 0, paddingBottom: Math.max(30, insets.bottom + 16), gap: 16 }}><DisplaySettings /></ScrollView></View></View></Modal>;
  if (!display.ready || !learner.ready || !preferences.ready || !learner.profile || editingPlan) {
    return <SafeAreaView style={s.root}><StatusBar style={display.theme === 'dark' ? 'light' : 'dark'} /><ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={[s.scroll, { paddingTop: 30 }]} keyboardShouldPersistTaps="handled"><View style={s.content}><View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={s.brandText}>level<Text style={{ color: c.lime }}>up</Text></Text><Pressable accessibilityRole="button" accessibilityLabel={translate('Appearance & language', display.language)} onPress={() => setSettingsOpen(true)} style={{ padding: 12 }}><Icon name="options-outline" /></Pressable></View>
      {!display.ready || !learner.ready || !preferences.ready ? <Card><Text style={t.heading}>Rejangizni ochyapmiz…</Text>{learner.error || preferences.error ? <><Text accessibilityRole="alert" style={t.body}>{learner.error || preferences.error}</Text><Button title="Qayta urinish" onPress={() => { void learner.reload(); void preferences.reload(); }} /></> : <ActivityIndicator color={c.lime} />}</Card> : <OnboardingScreen onStepChange={() => scroll.current?.scrollTo({ y: 0, animated: false })} key={editingPlan ? 'edit' : 'first'} initial={effectiveProfile} saving={learner.saving || preferences.saving} error={learner.error || preferences.error || ''} onCancel={learner.profile ? () => setEditingPlan(false) : undefined} onSave={async profile => {
        // Existing XP, answers and vocabulary are untouched. Persist before entering the app.
        if (!await preferences.save({ ...preferences.settings, name: profile.name.trim(), weeklyGoal: profile.days })) return;
        if (!await learner.save(profile)) return;
        setEditingPlan(false); setPlanOpen(true); navigate('profile');
      }} />}
    </View></ScrollView>{menu}</SafeAreaView>;
  }
  return <SafeAreaView style={s.root}><StatusBar style={display.theme === 'dark' ? 'light' : 'dark'} /><View style={s.header}><View style={s.headerInner}><View style={s.brand}><View style={s.logo}><Icon name="trending-up" color={c.background} size={23} /></View><Text style={s.brandText}>level<Text style={{ color: c.lime }}>up</Text><Text style={{ color: c.muted, fontSize: 12 }}> /</Text></Text></View>{wide && navigation}<Pressable accessibilityRole="button" accessibilityLabel={translate('Open profile and settings', display.language)} onPress={() => navigate('profile')} style={[s.profile, { borderColor: preferences.settings.color, backgroundColor: preferences.settings.color }]}><Text style={{ color: '#17251E', fontWeight: '700', fontSize: 12 }}>{initials(preferences.settings.name)}</Text></Pressable></View></View>
    <ScrollView ref={scroll} style={{ minWidth: 0, width: '100%' }} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag"><View style={s.content}>
      {!practice.ready ? <Card><Text style={t.heading}>Welcome to LevelUp</Text>{practice.error ? <><Text accessibilityRole="alert" style={t.body}>{practice.error}</Text><Button title="Try loading again" onPress={() => { void practice.reload(); }} /></> : <ActivityIndicator color={c.lime} accessibilityLabel="Loading saved progress" />}</Card> : <>
        {practice.error && <Card style={{ borderColor: c.danger }}><Text accessibilityRole="alert" style={{ color: c.danger }}>{practice.error}</Text></Card>}
        {<><View style={tab !== 'today' ? { display: 'none' } : undefined}><TodayScreen onLearn={() => navigate('course')} isActive={tab === 'today'} key={practice.today} settings={preferences.settings} data={practice.data} today={practice.today} saving={practice.saving} onCoach={openCoach} onSubmit={async answer => { const ok = await practice.submit(answer); if (ok) await community.award('daily', answer); return ok; }} onProgress={() => navigate('progress')} /></View>{tab === 'progress' && <ProgressScreen community={community} onAccount={() => navigate('profile')} data={practice.data} today={practice.today} onPractice={() => navigate('today')} />}{<View style={tab !== 'profile' ? { display: 'none' } : undefined}><ProfileScreen onAdmin={() => navigate('admin')} community={community} key={String(preferences.ready)} settings={preferences.settings} ready={preferences.ready} saving={preferences.saving} error={preferences.error} onSave={preferences.save} planOpen={planOpen} onTogglePlan={() => setPlanOpen(value => !value)} plan={<PlanScreen profile={effectiveProfile!} onEdit={() => { setEditingPlan(true); scroll.current?.scrollTo({ y: 0, animated: false }); }} onLearn={() => navigate('course')} onToday={() => navigate('today')} />} onSetup={() => setEditingPlan(true)} onReload={() => { void preferences.reload(); }} data={practice.data} today={practice.today} /></View>}</>}
        {tab === 'admin' && <AdminScreen community={community} onBack={() => navigate('profile')} />}
        <View style={tab !== 'vocabulary' ? { display: 'none' } : undefined}><VocabularyHubScreen notebook={notebook} onModeChange={() => scroll.current?.scrollTo({ y: 0, animated: false })} /></View><View style={tab !== 'course' ? { display: 'none' } : undefined}><CourseScreen community={community} preferredLevel={learner.profile.level} isActive={tab === 'course'} onCoach={openCoach} /></View><View style={tab !== 'coach' ? { display: 'none' } : undefined}><CoachScreen key={coachInput.key} initialAnswer={coachInput.answer} initialQuestion={coachInput.question} onBack={() => navigate('course')} /></View><View style={s.footer}><Text style={t.small}>Built for your next chapter.</Text><Text style={t.small}>LEVELUP · A LITTLE BETTER, EVERY DAY</Text></View>
      </>}
    </View></ScrollView>{!wide && navigation}{menu}
  </SafeAreaView>;
}
const s = themedStyles(() => ({
  root: { flex: 1, backgroundColor: c.background }, header: { borderBottomWidth: 1, borderColor: c.border, paddingHorizontal: 24 }, headerInner: { width: '100%', maxWidth: 1100, alignSelf: 'center', minHeight: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
  brand: { flexDirection: 'row', gap: 10, alignItems: 'center' }, logo: { backgroundColor: c.lime, padding: 8, borderRadius: 11 }, brandText: { color: c.text, fontWeight: '800', fontSize: 25, letterSpacing: -1 }, profile: { backgroundColor: c.limeDark, borderWidth: 1, borderColor: c.border, width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', gap: 2 }, mobileTab: { flex: 1, minWidth: 0, flexDirection: 'column', paddingHorizontal: 2, paddingVertical: 10, gap: 4 }, mobileTabs: { flexShrink: 0, padding: 6, borderTopWidth: 1, borderTopColor: c.border, backgroundColor: c.background, justifyContent: 'space-around' }, tab: { paddingHorizontal: 12, paddingVertical: 13, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }, activeTab: { backgroundColor: c.limeDark, borderRadius: 17 },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 28, paddingBottom: 24 }, content: { minWidth: 0, width: '100%', maxWidth: 1060, alignSelf: 'center', gap: 24 }, footer: { marginTop: 12, paddingTop: 22, borderTopWidth: 1, borderColor: c.border, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
}));
