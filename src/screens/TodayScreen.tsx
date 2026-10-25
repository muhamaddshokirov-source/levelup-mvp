import { PageHeader } from '../components/PageHeader';
import { displaySnapshot } from '../displayPreferences';
import { Text, TextInput } from '../components/LocalizedText';
import { themedStyles } from '../theme';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Card, Icon, Meter, typography as t } from '../components/UI';
import { feedbackFor, LEVEL_XP, PracticeData, questionFor, stats, wordCount } from '../domain/practice';
import { SpeakingTimer } from '../components/SpeakingTimer';
import { CompletionBanner } from '../components/CompletionBanner';
import { weeklyCount } from '../domain/milestones';
import { Settings } from '../domain/settings';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { colors as c } from '../theme';
type Props = { isActive: boolean; onCoach: (answer: string, question: string) => void; settings: Settings; data: PracticeData; today: string; saving: boolean; onSubmit: (answer: string) => Promise<boolean>; onProgress: () => void; onLearn: () => void };
export function TodayScreen({ isActive, onCoach, settings, data, today, saving, onSubmit, onProgress, onLearn }: Props) {
  const layout = useResponsiveLayout();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const input = useRef<TextInput>(null);
  const question = questionFor(today);
  const session = data.sessions.find(s => s.date === today);
  const summary = stats(data, today);
  const words = wordCount(answer);
  const feedback = session ? feedbackFor(session.answer) : null;
  return <View style={{ gap: 26 }}>
    <PageHeader eyebrow="YOUR DAILY DOSE OF CONFIDENCE" title="Small steps. Stronger voice." body={settings.name ? `Good to see you, ${settings.name}. Let’s make a little progress.` : 'A few minutes of English. A little better every day.'} />
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {[{ icon: 'flame-outline' as const, value: summary.streak, label: 'day streak' }, { icon: 'flash-outline' as const, value: summary.xp, label: 'total XP' }, { icon: 'trophy-outline' as const, value: summary.level, label: 'current level' }].map(item => <View key={item.label} style={{ flex: 1, minWidth: 0, gap: 8, padding: 14, borderWidth: 1, borderColor: c.border, borderRadius: 14, backgroundColor: c.surface }}><View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><Icon name={item.icon} size={16} color={c.muted} /><Text style={{ color: c.text, fontSize: 23, fontWeight: '700', letterSpacing: -0.6 }}>{item.value}</Text></View><Text style={[t.small, { fontSize: 11 }]}>{item.label}</Text></View>)}
    </View>
    <View style={[s.columns, layout.columns]}>
      <View style={[s.main, layout.pane]}>
        <Card style={{ borderColor: '#405333', gap: 22 }}>
          <View style={s.between}><View style={s.row}><View style={s.limeIcon}><Icon name="chatbubbles-outline" size={20} /></View><Text style={t.eyebrow}>TODAY’S CHALLENGE</Text></View><Text style={s.reward}>+50 XP</Text></View>
          <View style={{ gap: 13 }}><Text style={s.topic}>{question.topic.toUpperCase()} · DAILY PRACTICE</Text><Text localize={false} style={s.question}>{question.question}</Text><Text localize={false} style={t.body}>{question.hint}</Text></View>
          <View style={s.divider} />
          <View style={s.between}><View style={s.row}><Icon name="time-outline" size={15} color={c.muted} /><Text style={t.small}>2–3 min practice</Text></View><View style={s.row}><Icon name="cellular-outline" size={15} color={c.muted} /><Text style={t.small}>All levels welcome</Text></View></View>
        </Card>
        {session && feedback ? <Card><CompletionBanner /><View style={s.row}><Icon name="checkmark-circle" size={27} /><Text style={t.heading}>Daily challenge complete!</Text></View><Text style={t.heading}>{feedback.title}</Text><Text style={t.body}>{feedback.strength}</Text><View style={s.tip}><Text style={t.eyebrow}>YOUR NEXT STEP</Text><Text style={t.body}>{feedback.tip}</Text></View><Text style={t.small}>Demo feedback · Text-based rules, not AI or pronunciation assessment.</Text><Text style={t.eyebrow}>YOUR RESPONSE · {session.words} WORDS</Text><Text localize={false} selectable style={t.body}>{session.answer}</Text><Button title="AI ustozdan fikr olish" onPress={() => onCoach(session.answer, question.question)} /><Button variant="secondary" title="See your progress" icon="arrow-forward" onPress={onProgress} /><Text style={[t.small, { textAlign: 'center' }]}>50 XP saved. Come back tomorrow for a new challenge.</Text></Card> : <Card>
          <View style={s.between}><Text style={t.heading}>Make it your own</Text><Text style={t.small}>English practice</Text></View>
          <Text style={t.body}>Say your answer out loud, then write it below.</Text>
          <Pressable accessibilityRole="button" accessibilityState={{ expanded: toolsOpen }} aria-expanded={toolsOpen} onPress={() => setToolsOpen(value => !value)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 12, backgroundColor: c.background, borderWidth: 1, borderColor: c.border }}><Icon name="mic-outline" size={18} /><Text style={[t.small, { flex: 1, color: c.text }]}>Speaking tools · Timer & recorder</Text><Icon name={toolsOpen ? 'chevron-up' : 'chevron-down'} color={c.muted} size={16} /></Pressable>
          <View style={toolsOpen ? { gap: 16 } : { display: 'none' }}><SpeakingTimer key={settings.timerSeconds} defaultDuration={settings.timerSeconds} /><VoiceRecorder isActive={isActive && toolsOpen} /></View>
          <TextInput ref={input} accessibilityLabel="Your English answer" multiline textAlignVertical="top" value={answer} onChangeText={setAnswer} editable={!saving} maxLength={4000} placeholder="I would start my perfect day with…" placeholderTextColor="#697893" style={s.input} />
          <View style={s.between}><Text style={[t.small, words >= 20 && { color: c.lime }]}>{words} / 20 words minimum</Text><Text style={t.small}>{answer.length}/4,000</Text></View>
          <Button title={saving ? 'Saving your progress…' : 'Finish practice'} icon="arrow-forward" disabled={words < 20 || saving} onPress={() => { void onSubmit(answer); }} />
          <Text style={[t.small, { textAlign: 'center' }]}><Icon name="lock-closed-outline" size={11} color={c.muted} />  Just for you. Your answers stay on this device.</Text>
        </Card>}
      </View>
      <View style={[s.aside, layout.pane]}>
        <Card><View style={s.between}><Text style={t.heading}>This week’s mission</Text><Icon name="flag-outline" /></View><Text style={{ color: c.text, fontSize: 30, fontWeight: '800' }}>{Math.min(weeklyCount(data, today), settings.weeklyGoal)}<Text style={t.body}> / {settings.weeklyGoal} practices</Text></Text><Meter value={weeklyCount(data, today) / settings.weeklyGoal} /><Text style={t.body}>{weeklyCount(data, today) >= settings.weeklyGoal ? 'Mission complete! Every extra day is a little victory.' : 'Small moments for yourself. Build a habit that sticks.'}</Text><Text style={t.small}>Monday–Sunday · Resets each week</Text></Card>
        <Card><View style={s.between}><Text style={t.heading}>Your next level</Text><Text style={{ color: c.lime, fontWeight: '700' }}>Level {summary.level + 1}</Text></View><Meter value={summary.levelProgress / LEVEL_XP} /><Text style={t.small}>{summary.levelProgress} / {LEVEL_XP} XP</Text><Text style={t.small}>Each daily challenge earns 50 XP. Every 250 XP unlocks the next level.</Text></Card>
        <View style={{ gap: 14, padding: 20, borderRadius: 16, backgroundColor: c.raised }}><Icon name="school-outline" size={22} /><Text style={t.heading}>Prefer a guided lesson?</Text><Text style={t.body}>Start with phrases and a model answer before your daily practice.</Text><Button title="Explore the lessons" variant="secondary" icon="arrow-forward" onPress={onLearn} /></View>
      </View>
    </View>
  </View>;
}
const s = themedStyles(() => ({
  greeting: { flexDirection: 'row', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'center' },
  dayBadge: { flexDirection: 'row', gap: 8, alignItems: 'center', padding: 12, borderWidth: 1, borderColor: c.border, borderRadius: 30 }, badgeText: { color: c.muted, fontSize: 12 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 }, stat: { flex: 1, minWidth: 145, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, statValue: { color: c.text, fontSize: 25, fontWeight: '800' }, statLabel: { color: c.muted, fontSize: 12, fontWeight: '400' },
  columns: { flexDirection: 'row', flexWrap: 'wrap', gap: 22, alignItems: 'flex-start' }, main: { flexGrow: 2, flexBasis: 540, gap: 20 }, aside: { flexGrow: 1, flexBasis: 270, gap: 20 },
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', maxWidth: '100%', gap: 8 }, limeIcon: { padding: 9, borderRadius: 12, backgroundColor: c.limeDark },
  reward: { color: c.lime, backgroundColor: c.limeDark, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, fontWeight: '700', fontSize: 12 },
  topic: { color: c.muted, fontSize: 10, letterSpacing: 1.5, fontWeight: '600' }, question: { color: c.text, fontWeight: '700', fontSize: 29, lineHeight: 38, letterSpacing: -0.7 },
  divider: { height: 1, backgroundColor: c.border }, input: { color: c.text, backgroundColor: c.background, borderColor: c.border, borderWidth: 1, borderRadius: 12, padding: 16, minHeight: 160, fontSize: 15, lineHeight: 25 },
  levelEmblem: { alignSelf: 'center', width: 100, height: 100, borderRadius: 30, borderWidth: 1, borderColor: '#4D653A', backgroundColor: c.limeDark, alignItems: 'center', justifyContent: 'center', gap: 2 }, levelText: { color: c.lime, fontSize: 20, fontWeight: '800' },
  tip: { backgroundColor: c.background, padding: 16, borderRadius: 12, gap: 8 },
}));
