import { CommunityAccount } from '../components/CommunityAccount';
import { Community } from '../hooks/useCommunity';
import { DisplaySettings } from '../components/DisplaySettings';
import { Text, TextInput } from '../components/LocalizedText';
import { themedStyles } from '../theme';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Button, Card, Icon, Meter, typography as t } from '../components/UI';
import { avatarColors, defaultSettings, initials, Settings } from '../domain/settings';
import { PracticeData, stats } from '../domain/practice';
import { weeklyCount } from '../domain/milestones';
import { colors as c } from '../theme';
type Props = { onAdmin: () => void; community: Community; planOpen: boolean; onTogglePlan: () => void; plan: React.ReactNode; onSetup: () => void; settings: Settings; ready: boolean; saving: boolean; error: string | null; onSave: (value: Settings) => Promise<boolean>; onReload: () => void; data: PracticeData; today: string };
export function ProfileScreen({ onAdmin, community, planOpen, onTogglePlan, plan, onSetup, settings, ready, saving, error, onSave, onReload, data, today }: Props) {
  const layout = useResponsiveLayout();
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  const summary = stats(data, today);
  const count = weeklyCount(data, today);
  const dirty = JSON.stringify(draft) !== JSON.stringify(settings);
  const update = (value: Partial<Settings>) => { setDraft(current => ({ ...current, ...value })); setSaved(false); };
  if (!ready) return <Card><Text style={t.heading}>Your personal space</Text>{error ? <><Text accessibilityRole="alert" style={t.body}>{error}</Text><Button title="Try again" onPress={onReload} /></> : <ActivityIndicator color={c.lime} />}</Card>;
  return <View style={{ gap: 24 }}>
    <View style={{ gap: 10, borderLeftWidth: 3, borderLeftColor: c.lime, paddingLeft: 18 }}><Text style={t.eyebrow}>MAKE ROOM FOR YOUR GROWTH</Text><Text style={t.title}>Your journey. Your pace<Text style={{ color: c.lime }}>.</Text></Text><Text style={t.body}>A little more you. A habit that fits your life.</Text></View>
    <CommunityAccount onAdmin={onAdmin} community={community} name={settings.name} />
    <DisplaySettings />
    <Card><Icon name="map-outline" /><Text style={t.heading}>Sizga mos o‘quv yo‘li</Text><Text style={t.body}>Maqsad, daraja, vaqt va qiyinchiliklaringiz asosidagi shaxsiy rejangiz.</Text><Button title={planOpen ? 'Hide my plan' : 'Shaxsiy rejamni ochish'} onPress={onTogglePlan} /><Button variant="secondary" title="Maqsad va vaqtni qayta tanlash" onPress={onSetup} /></Card>
    {planOpen && plan}
    <View style={[s.columns, layout.columns]}><View style={[s.aside, layout.pane]}>
      <Card style={{ alignItems: 'center', paddingVertical: 32 }}><View style={[s.avatar, { backgroundColor: draft.color }]}><Text style={{ color: '#17251E', fontWeight: '800', fontSize: 27 }}>{initials(draft.name)}</Text></View>{draft.name.trim() ? <Text localize={false} style={t.heading}>{draft.name.trim()}</Text> : <Text style={t.heading}>Your next chapter</Text>}<View style={s.badge}><Icon name="shield-checkmark-outline" size={16} /><Text style={{ color: c.lime, fontWeight: '700' }}>Level {summary.level} · Growing every day</Text></View><View style={s.row}><View style={s.stat}><Text style={s.number}>{summary.xp}</Text><Text style={t.small}>total XP</Text></View><View style={s.stat}><Text style={s.number}>{data.sessions.length}</Text><Text style={t.small}>practices</Text></View></View></Card>
      <Card><Icon name="flag-outline" size={26} /><Text style={t.heading}>A goal you can grow into</Text><Text style={t.body}>Consistency doesn’t mean doing everything. It means choosing a small step, and coming back.</Text><Meter value={count / settings.weeklyGoal} /><Text style={t.small}>{count} / {settings.weeklyGoal} practices this week · Saved goal</Text></Card>
    </View><View style={[s.main, layout.pane]}>
      <Card><View style={s.row}><Icon name="person-outline" /><Text style={t.heading}>The person behind the progress</Text></View><Text style={t.body}>What should we call you?</Text><TextInput accessibilityLabel="Display name" value={draft.name} maxLength={30} editable={!saving} onChangeText={name => update({ name })} placeholder="Your name" placeholderTextColor={c.muted} autoCapitalize="words" style={s.input} /><Text style={t.small}>{draft.name.length}/30 · Optional. Only stored on this device.</Text><Text style={t.body}>Choose your color</Text><View style={s.row}>{avatarColors.map(color => <Pressable key={color} disabled={saving} accessibilityRole="button" accessibilityLabel={`Avatar color ${color}`} accessibilityState={{ selected: draft.color === color, disabled: saving }} onPress={() => update({ color })} style={[s.swatch, { backgroundColor: color }, draft.color === color && { borderColor: c.text }]}>{draft.color === color && <Icon name="checkmark" color="#17251E" />}</Pressable>)}</View></Card>
      <Card><View style={s.row}><Icon name="options-outline" /><Text style={t.heading}>Practice, on your terms</Text></View><Text style={t.body}>Weekly practice goal</Text><Choices values={[2, 3, 5, 7]} selected={draft.weeklyGoal} suffix="days" disabled={saving} onChange={weeklyGoal => update({ weeklyGoal })} /><Text style={t.small}>Monday–Sunday. Your mission card updates when you save. XP stays at 50 per completed day.</Text><Text style={t.body}>Default speaking warm-up</Text><Choices values={[30, 60, 120]} selected={draft.timerSeconds} suffix="sec" disabled={saving} onChange={timerSeconds => update({ timerSeconds })} /><Text style={t.small}>Applies to the Today timer after saving. You can still pick a different duration before each practice.</Text></Card>
      {error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}
      {saved && !dirty && <View accessibilityLiveRegion="polite" style={s.notice}><Icon name="checkmark-circle" /><Text style={{ color: c.lime }}>All set. Make yourself at home.</Text></View>}
      <Button title={saving ? 'Saving preferences…' : dirty ? 'Save my preferences' : 'Preferences up to date'} disabled={!dirty || saving} icon="checkmark" onPress={() => { void onSave(draft).then(success => { if (success) { setDraft(current => ({ ...current, name: current.name.trim() })); setSaved(true); } }); }} />
      <Pressable accessibilityRole="button" disabled={saving} onPress={() => update(defaultSettings)} style={{ alignSelf: 'center', padding: 12 }}><Text style={t.small}>Restore default preferences</Text></Pressable>
      <Card><View style={s.row}><Icon name="lock-closed-outline" /><Text style={t.heading}>A private space to practice</Text></View><Text style={t.body}>Your profile and notebook stay on this device. Optional web recordings stay in this page’s memory. AI text is sent to your chosen backend only after you consent.</Text><Text style={t.small}>Local storage is not encrypted. Clearing app or browser data removes your history. Restoring preferences does not delete your practice progress.</Text><View style={s.divider} /><Text style={t.small}>LevelUp 1.0 · Built for small, meaningful steps. Today feedback uses demo rules. The separate AI coach requires a backend and consent; neither assesses pronunciation.</Text></Card>
    </View></View>
  </View>;
}
function Choices({ values, selected, suffix, disabled, onChange }: { values: number[]; selected: number; suffix: string; disabled: boolean; onChange: (value: number) => void }) {
  return <View style={s.row}>{values.map(value => <Pressable key={value} disabled={disabled} accessibilityRole="button" accessibilityState={{ selected: selected === value, disabled }} onPress={() => onChange(value)} style={[s.choice, selected === value && { borderColor: c.lime, backgroundColor: c.limeDark }]}><Text style={{ color: selected === value ? c.lime : c.muted, fontWeight: '700' }}>{value} {suffix}</Text></Pressable>)}</View>;
}
const s = themedStyles(() => ({ columns: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: 22 }, aside: { flexGrow: 1, flexBasis: 280, gap: 20 }, main: { flexGrow: 2, flexBasis: 540, gap: 20 }, row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12 }, avatar: { width: 88, height: 88, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }, badge: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 20, backgroundColor: c.limeDark }, stat: { alignItems: 'center', padding: 12 }, number: { color: c.text, fontSize: 24, fontWeight: '800' }, input: { borderWidth: 1, borderColor: c.border, backgroundColor: c.background, borderRadius: 12, padding: 16, fontSize: 16, color: c.text }, swatch: { width: 46, height: 46, borderWidth: 3, borderColor: 'transparent', borderRadius: 23, alignItems: 'center', justifyContent: 'center' }, choice: { paddingHorizontal: 18, paddingVertical: 14, borderWidth: 1, borderColor: c.border, borderRadius: 12 }, notice: { padding: 16, backgroundColor: c.limeDark, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }, divider: { height: 1, backgroundColor: c.border } }));
