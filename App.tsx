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
import { CourseScreen } from './src/screens/CourseScreen';
import { CoachScreen } from './src/screens/CoachScreen';
import { LearnerProfile } from './src/domain/learningPlan';
import { useLearner } from './src/hooks/useLearner';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { PlanScreen } from './src/screens/PlanScreen';
import { colors as c } from './src/theme';
export default function App() { return <SafeAreaProvider><LevelUp /></SafeAreaProvider>; }
function LevelUp() {
  const [tab, setTab] = useState<'today' | 'progress' | 'profile' | 'vocabulary' | 'review' | 'course' | 'coach' | 'plan'>('plan');
  const [coachInput, setCoachInput] = useState({ answer: '', question: '', key: 0 });
  const openCoach = (answer: string, question: string) => { setCoachInput(value => ({ answer, question, key: value.key + 1 })); navigate('coach'); };
  const learner = useLearner();
  const [editingPlan, setEditingPlan] = useState(false);
  const practice = usePractice();
  const notebook = useVocabulary();
  const preferences = useSettings();
  const effectiveProfile = learner.profile ? { ...learner.profile, name: preferences.settings.name || learner.profile.name, days: preferences.settings.weeklyGoal as LearnerProfile['days'] } : null;
  const wide = useWindowDimensions().width >= 1100;
  const scroll = useRef<ScrollView>(null);
  const navigate = (next: 'today' | 'progress' | 'profile' | 'vocabulary' | 'review' | 'course' | 'coach' | 'plan') => { setTab(next); scroll.current?.scrollTo({ y: 0, animated: false }); };
  const navigation = <View style={[s.tabs, !wide && s.mobileTabs]}>{([{ id: 'plan', title: 'My plan', icon: 'map-outline' }, { id: 'today', title: 'Today', icon: 'grid-outline' }, { id: 'course', title: 'Learn', icon: 'school-outline' }, { id: 'progress', title: 'Progress', icon: 'bar-chart-outline' }, { id: 'vocabulary', title: 'Words', icon: 'book-outline' }, { id: 'review', title: 'Review', icon: 'albums-outline' }, { id: 'profile', title: 'Profile', icon: 'person-outline' }] as const).map(item => <Pressable key={item.id} accessibilityRole="tab" accessibilityState={{ selected: tab === item.id }} onPress={() => navigate(item.id)} style={[s.tab, !wide && { flexDirection: 'column', paddingHorizontal: 4, gap: 5 }, tab === item.id && s.activeTab]}><Icon name={item.icon} color={tab === item.id ? c.lime : c.muted} size={18} /><Text style={{ color: tab === item.id ? c.lime : c.muted, fontSize: 13, fontWeight: '600' }}>{item.title}</Text></Pressable>)}</View>;
  if (!learner.ready || !preferences.ready || !learner.profile || editingPlan) {
    return <SafeAreaView style={s.root}><StatusBar style="light" /><ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={[s.scroll, { paddingTop: 30 }]} keyboardShouldPersistTaps="handled"><View style={s.content}><Text style={s.brandText}>level<Text style={{ color: c.lime }}>up</Text></Text>
      {!learner.ready || !preferences.ready ? <Card><Text style={t.heading}>Rejangizni ochyapmiz…</Text>{learner.error || preferences.error ? <><Text accessibilityRole="alert" style={t.body}>{learner.error || preferences.error}</Text><Button title="Qayta urinish" onPress={() => { void learner.reload(); void preferences.reload(); }} /></> : <ActivityIndicator color={c.lime} />}</Card> : <OnboardingScreen onStepChange={() => scroll.current?.scrollTo({ y: 0, animated: false })} key={editingPlan ? 'edit' : 'first'} initial={effectiveProfile} saving={learner.saving || preferences.saving} error={learner.error || preferences.error || ''} onCancel={learner.profile ? () => setEditingPlan(false) : undefined} onSave={async profile => {
        // Existing XP, answers and vocabulary are untouched. Persist before entering the app.
        if (!await preferences.save({ ...preferences.settings, name: profile.name.trim(), weeklyGoal: profile.days })) return;
        if (!await learner.save(profile)) return;
        setEditingPlan(false); navigate('plan');
      }} />}
    </View></ScrollView></SafeAreaView>;
  }
  return <SafeAreaView style={s.root}><StatusBar style="light" /><View style={s.header}><View style={s.headerInner}><View style={s.brand}><View style={s.logo}><Icon name="trending-up" color={c.background} size={23} /></View><Text style={s.brandText}>level<Text style={{ color: c.lime }}>up</Text><Text style={{ color: c.muted, fontSize: 12 }}> /</Text></Text></View>{wide && navigation}<Pressable accessibilityRole="button" accessibilityLabel="Open profile and settings" onPress={() => navigate('profile')} style={[s.profile, { borderColor: preferences.settings.color }]}><Text style={{ color: preferences.settings.color, fontWeight: '700', fontSize: 12 }}>{initials(preferences.settings.name)}</Text></Pressable></View></View>
    <ScrollView ref={scroll} style={{ minWidth: 0, width: '100%' }} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag"><View style={s.content}>
      {!practice.ready ? <Card><Text style={t.heading}>Welcome to LevelUp</Text>{practice.error ? <><Text accessibilityRole="alert" style={t.body}>{practice.error}</Text><Button title="Try loading again" onPress={() => { void practice.reload(); }} /></> : <ActivityIndicator color={c.lime} accessibilityLabel="Loading saved progress" />}</Card> : <>
        {practice.error && <Card style={{ borderColor: c.danger }}><Text accessibilityRole="alert" style={{ color: c.danger }}>{practice.error}</Text></Card>}
        {<><View style={tab !== 'today' ? { display: 'none' } : undefined}><TodayScreen isActive={tab === 'today'} key={practice.today} settings={preferences.settings} data={practice.data} today={practice.today} saving={practice.saving} onCoach={openCoach} onSubmit={practice.submit} onProgress={() => navigate('progress')} /></View>{tab === 'progress' && <ProgressScreen data={practice.data} today={practice.today} onPractice={() => navigate('today')} />}{<View style={tab !== 'profile' ? { display: 'none' } : undefined}><ProfileScreen key={String(preferences.ready)} settings={preferences.settings} ready={preferences.ready} saving={preferences.saving} error={preferences.error} onSave={preferences.save} onPlan={() => navigate('plan')} onSetup={() => setEditingPlan(true)} onReload={() => { void preferences.reload(); }} data={practice.data} today={practice.today} /></View>}</>}
        <View style={tab !== 'vocabulary' ? { display: 'none' } : undefined}><VocabularyScreen notebook={notebook} onReview={() => navigate('review')} /></View><View style={tab !== 'review' ? { display: 'none' } : undefined}><ReviewScreen notebook={notebook} onNotebook={() => navigate('vocabulary')} /></View><View style={tab !== 'course' ? { display: 'none' } : undefined}><CourseScreen preferredLevel={learner.profile.level} isActive={tab === 'course'} onCoach={openCoach} /></View><View style={tab !== 'coach' ? { display: 'none' } : undefined}><CoachScreen key={coachInput.key} initialAnswer={coachInput.answer} initialQuestion={coachInput.question} onBack={() => navigate('course')} /></View>{tab === 'plan' && <PlanScreen profile={effectiveProfile!} onEdit={() => { setEditingPlan(true); scroll.current?.scrollTo({ y: 0, animated: false }); }} onLearn={() => navigate('course')} onToday={() => navigate('today')} />}<View style={s.footer}><Text style={t.small}>Built for your next chapter.</Text><Text style={t.small}>LEVELUP · A LITTLE BETTER, EVERY DAY</Text></View>
      </>}
    </View></ScrollView>{!wide && <View style={{ borderTopWidth: 1, borderColor: c.border }}><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}>{navigation}</ScrollView></View>}
  </SafeAreaView>;
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.background }, header: { borderBottomWidth: 1, borderColor: c.border, paddingHorizontal: 24 }, headerInner: { width: '100%', maxWidth: 1100, alignSelf: 'center', minHeight: 84, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
  brand: { flexDirection: 'row', gap: 10, alignItems: 'center' }, logo: { backgroundColor: c.lime, padding: 7, borderRadius: 10 }, brandText: { color: c.text, fontWeight: '800', fontSize: 25, letterSpacing: -1 }, profile: { backgroundColor: '#233126', borderWidth: 1, borderColor: '#3B5030', width: 39, height: 39, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', gap: 2 }, mobileTabs: { flexGrow: 1, padding: 6, borderTopWidth: 1, borderTopColor: c.border, backgroundColor: c.background, justifyContent: 'space-around' }, tab: { paddingHorizontal: 12, paddingVertical: 13, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }, activeTab: { backgroundColor: '#202E25' },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 38, paddingBottom: 24 }, content: { minWidth: 0, width: '100%', maxWidth: 1060, alignSelf: 'center', gap: 24 }, footer: { marginTop: 12, paddingTop: 22, borderTopWidth: 1, borderColor: c.border, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
});
