import { PageHeader } from '../components/PageHeader';
import { Community } from '../hooks/useCommunity';
import { Text, TextInput } from '../components/LocalizedText';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessons, parseCourseProgress } from '../domain/course';
import { wordCount } from '../domain/practice';
import { displaySnapshot } from '../displayPreferences';
import { translate } from '../domain/translations';
import { Button, Card, Icon, Meter, typography as t } from '../components/UI';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { colors as c } from '../theme';
const KEY = '@levelup/course/v1';
export function CourseScreen({ community, onCoach, isActive, preferredLevel = 'A1' }: { community: Community; preferredLevel?: string; isActive: boolean; onCoach: (answer: string, question: string) => void }) {
  const [level, setLevel] = useState(preferredLevel);
  useEffect(() => { setLevel(preferredLevel); }, [preferredLevel]);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [model, setModel] = useState(false);
  const load = async () => { setError(''); try { const raw = await AsyncStorage.getItem(KEY); setCompleted(parseCourseProgress(raw)); setReady(true); } catch { setError('Darslar tarixi yuklanmadi. Hech narsa ustiga yozilmadi. Qayta urinib ko‘ring.'); } };
  useEffect(() => { void load(); }, []);
  const lesson = lessons.find(l => l.id === selected);
  const answer = lesson ? drafts[lesson.id] ?? '' : '';
  const finish = async () => { if (!lesson || saving) return; setSaving(true); setError(''); try { const next = [...new Set([...completed, lesson.id])]; await AsyncStorage.setItem(KEY, JSON.stringify({ version: 1, completed: next })); setCompleted(next); await community.award('lesson', answer, lesson.id); } catch { setError('Saqlanmadi. Javobingiz shu yerda, qayta urinib ko‘ring.'); } finally { setSaving(false); } };
  return <View style={{ gap: 22 }}><PageHeader eyebrow="SPEAKING PATH · A1 → B2" title="Gapirishni odat qiling" body="Darajani tanlab, maqsad, tayanch iboralar, speaking va refleksiya bilan mashq qiling. Bu to‘liq CEFR kursi yoki daraja testi emas." icon="school-outline" />
    {!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}
    {!ready ? <Card>{error ? <Button title="Qayta yuklash" onPress={() => { void load(); }} /> : <ActivityIndicator color={c.lime} />}</Card> : lesson ? <>
      <Pressable accessibilityRole="button" onPress={() => { setSelected(null); setModel(false); }} style={{ padding: 10 }}><Text style={{ color: c.lime }}>← Barcha darslar</Text></Pressable>
      <Card><Text style={t.eyebrow}>{lesson.level} · GUIDED SPEAKING</Text><Text localize={false} style={t.title}>{lesson.title}</Text><Text localize={false} style={t.heading}>{lesson.goal}</Text><Text style={t.body}>{lesson.tip}</Text><Text style={t.eyebrow}>1 · TAYYORLANING</Text><Text localize={false} style={t.body}>{lesson.prompt}</Text>{lesson.phrases.map(phrase => <Text key={phrase} selectable style={{ color: c.lime, fontSize: 16 }}>↗ {phrase}</Text>)}<Text style={t.eyebrow}>2 · OVOZ CHIQARIB AYTIB KO‘RING</Text><VoiceRecorder isActive={isActive} /><Text style={t.eyebrow}>3 · JAVOBINGIZNI YOZING</Text><TextInput accessibilityLabel="Lesson answer" value={answer} onChangeText={text => setDrafts(current => ({ ...current, [lesson.id]: text }))} multiline maxLength={4000} placeholder="Write what you said…" placeholderTextColor={c.muted} style={{ color: c.text, backgroundColor: c.background, padding: 16, borderRadius: 12, minHeight: 150, textAlignVertical: 'top', lineHeight: 24 }} /><Text style={t.small}>{wordCount(answer)} words · Kamida 20 inglizcha so‘z · {answer.length}/4000</Text><Button title={model ? 'Namunani yashirish' : 'Namuna bilan taqqoslash'} onPress={() => setModel(!model)} />{model && <><Text localize={false} style={t.body}>{lesson.model}</Text><Text style={t.small}>Bu yagona to‘g‘ri javob emas. Namunani ko‘chirmay, o‘z misolingizni ayting.</Text></>}<Text style={t.eyebrow}>4 · YANA BIR QADAM</Text><Text localize={false} style={t.body}>{lesson.followup}</Text><Text style={t.small}>O‘zingizni tekshiring: savolga javob berdimmi? Kamida bitta sabab yoki misol keltirdimmi? Keyingi safar nimani yaxshilayman?</Text><Button title={saving ? 'Saqlanmoqda…' : completed.includes(lesson.id) ? 'Dars bajarilgan ✓' : 'Darsni yakunlash'} disabled={saving || wordCount(answer) < 20 || completed.includes(lesson.id)} onPress={() => { void finish(); }} />{community.member?.joined && !community.member.banned && <Button variant="secondary" title="Sync this lesson to ranking" disabled={saving || community.syncing || wordCount(answer) < 20} onPress={() => { void community.award('lesson', answer, lesson.id); }} />}{!!community.notice && <Text style={t.small}>{community.notice}</Text>}{!!community.error && <Text style={{ color: c.danger }}>{community.error}</Text>}<Button variant="secondary" title="AI ustozdan fikr olish" disabled={wordCount(answer) < 20} onPress={() => onCoach(answer, lesson.prompt)} /><Text style={t.small}>Lesson completion is self-assessment. Local XP does not change. Ranked members can earn 20 online XP once per lesson. Text and audio are not stored permanently.</Text></Card>
    </> : <><Card><Text localize={false} style={t.heading}>{translate(`${completed.length} / ${lessons.length} dars yakunlangan`, displaySnapshot().language)}</Text><Meter value={completed.length / lessons.length} /><Text style={t.small}>O‘zingizga mos darajani tanlang. Qiyin bo‘lsa, oldingi bosqichga qayting — bu ham rivojlanish.</Text><Button title="AI ustoz" icon="sparkles-outline" onPress={() => onCoach('', '')} /></Card><View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>{['A1', 'A2', 'B1', 'B2'].map(value => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: value === level }} onPress={() => setLevel(value)} style={{ paddingVertical: 14, paddingHorizontal: 24, backgroundColor: value === level ? c.limeDark : c.surface, borderRadius: 12, borderWidth: 1, borderColor: value === level ? c.lime : c.border }}><Text style={{ color: value === level ? c.lime : c.muted }}>{value}</Text></Pressable>)}</View>{lessons.filter(l => l.level === level).map(l => <Card key={l.id}><View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Icon name={completed.includes(l.id) ? 'checkmark-circle' : 'chatbubble-outline'} /><Text localize={false} style={t.heading}>{l.title}</Text></View><Text localize={false} style={t.body}>{l.goal}</Text><Text style={t.small}>5–10 daqiqa · {l.level} · {completed.includes(l.id) ? 'Bajarilgan' : 'Boshlashga tayyor'}</Text><Button title={completed.includes(l.id) ? 'Qayta mashq qilish' : 'Darsni boshlash'} icon="arrow-forward" onPress={() => { setSelected(l.id); setModel(false); }} /></Card>)}</>}
  </View>;
}
