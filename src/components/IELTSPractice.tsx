import React, { useEffect, useRef, useState } from 'react';
import { Image, Linking, Pressable, Switch, View, useWindowDimensions } from 'react-native';
import { Text, TextInput } from './LocalizedText';
import { Button, Card, Icon, Meter, typography as t } from './UI';
import { ieltsPacks, ieltsGuidance, ieltsPrompt, ieltsReviewQuestion, IELTS_SOURCE, IELTSPart } from '../domain/ielts';
import { useBrowserVoice } from '../hooks/useBrowserVoice';
import { VoiceRecorder } from './VoiceRecorder';
import { wordCount } from '../domain/practice';
import { translate } from '../domain/translations';
import { displaySnapshot } from '../displayPreferences';
import { colors as c } from '../theme';
const packImages = [require('../../assets/ielts-home.jpg'), require('../../assets/ielts-learning.jpg'), require('../../assets/ielts-places.jpg')];
export function IELTSPractice({ active, initialPart = 1, onReview }: { active: boolean; initialPart?: IELTSPart; onReview: (answer: string, question: string) => void }) {
  const wide = useWindowDimensions().width >= 650;
  const [part, setPart] = useState<IELTSPart>(initialPart);
  const [packIndex, setPackIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [recorderOpen, setRecorderOpen] = useState(false);
  const [phase, setPhase] = useState<'prepare' | 'speak' | 'done'>(initialPart === 2 ? 'prepare' : 'speak');
  const [remaining, setRemaining] = useState(initialPart === 2 ? 60 : ieltsGuidance[initialPart].seconds);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  const base = useRef('');
  const pack = ieltsPacks[packIndex]!;
  const key = `${pack.id}:${part}:${index}`;
  const keyRef = useRef(key); keyRef.current = key;
  const draft = drafts[key] || '';
  const voice = useBrowserVoice(active && consent && !recorderOpen, text => setDrafts(previous => ({ ...previous, [keyRef.current]: `${base.current} ${text}`.trim().slice(0, 4000) })), undefined, undefined, text => setDrafts(previous => ({ ...previous, [keyRef.current]: `${base.current} ${text}`.trim().slice(0, 4000) })), undefined, { autoStop: false, maxTurnMs: 120000 });
  const finishVoice = useRef(voice.stop); finishVoice.current = voice.stop;
  const prompt = ieltsPrompt(pack, part, index);
  const count = part === 2 ? 1 : (part === 1 ? pack.part1 : pack.part3).length;
  useEffect(() => { setRunning(false); setPhase(part === 2 ? 'prepare' : 'speak'); setRemaining(part === 2 ? 60 : ieltsGuidance[part].seconds); }, [key]);
  useEffect(() => { if (!active) { setRunning(false); setRecorderOpen(false); } }, [active]);
  useEffect(() => {
    if (!running || !active) return;
    const update = () => { const left = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)); setRemaining(left); if (!left) { setRunning(false); finishVoice.current(); if (phase === 'prepare') { setPhase('speak'); setRemaining(120); } else setPhase('done'); } };
    const timer = setInterval(update, 200); return () => clearInterval(timer);
  }, [running, active, phase]);
  useEffect(() => { if (typeof document === 'undefined') return; const hide = () => { if (document.hidden) { setRunning(false); voice.cancel(); voice.stopSpeaking(); } }; document.addEventListener('visibilitychange', hide); return () => document.removeEventListener('visibilitychange', hide); }, []);
  const switchTask = (nextPart: IELTSPart, nextPack = packIndex, nextIndex = 0) => { voice.cancel(); voice.stopSpeaking(); setRecorderOpen(false); setPart(nextPart); setPackIndex(nextPack); setIndex(nextIndex); };
  const startTimer = () => { const seconds = remaining || (part === 2 && phase === 'prepare' ? 60 : ieltsGuidance[part].seconds); setRemaining(seconds); deadline.current = Date.now() + seconds * 1000; if (phase === 'done') setPhase('speak'); setRunning(true); };
  return <View style={{ gap: 18 }}>
    <Card><View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Icon name="school-outline" /><Text style={t.heading}>IELTS Speaking practice</Text></View><Text style={t.body}>Practise each part with a clear task, notes and an optional timer. This is independent practice, not an official test or a band-score prediction.</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{([1, 2, 3] as const).map(value => <View key={value} style={{ flex: 1, minWidth: 70 }}><Button title={`Part ${value}`} variant={part === value ? 'primary' : 'secondary'} onPress={() => switchTask(value)} /></View>)}</View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>{ieltsPacks.map((item, i) => <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={translate(item.title, displaySnapshot().language)} aria-pressed={packIndex === i} onPress={() => switchTask(part, i)} style={{ flexGrow: 1, flexBasis: wide ? 170 : 190, minWidth: 0, minHeight: wide ? 158 : 84, overflow: 'hidden', flexDirection: wide ? 'column' : 'row', alignItems: 'center', gap: wide ? 0 : 12, padding: wide ? 0 : 8, borderRadius: 15, borderWidth: 1, borderColor: packIndex === i ? c.lime : c.border, backgroundColor: packIndex === i ? c.limeDark : c.background }}><Image source={packImages[i]} accessibilityIgnoresInvertColors resizeMode="cover" style={{ width: wide ? '100%' : 72, height: wide ? 96 : 66, borderRadius: wide ? 0 : 10 }} /><View style={{ flex: 1, minWidth: 0, gap: 5, padding: wide ? 12 : 3 }}><Text style={{ color: packIndex === i ? c.lime : c.text, fontSize: 13, fontWeight: '700' }}>{item.title}</Text><Text style={[t.small, { fontSize: 10 }]}>{item.official ? 'IELTS official sample' : 'LevelUp original'}</Text></View></Pressable>)}</View>
      <Text style={t.small}>{pack.official ? 'Based on IELTS.org sample tasks. Some wording is adapted for context.' : 'Original LevelUp questions using the IELTS task format. Not official exam questions.'}</Text>
      <Button title="Open the official sample source" variant="ghost" icon="open-outline" onPress={() => { void Linking.openURL(IELTS_SOURCE); }} />
    </Card>
    <Card style={{ borderColor: c.lime }}><Text style={t.eyebrow}>{ieltsGuidance[part].title}</Text><Text localize={false} accessibilityRole="header" style={[t.heading, { fontSize: 25, lineHeight: 33 }]}>{part === 2 ? pack.cue : prompt}</Text>
      {part === 2 && <View style={{ gap: 10 }}>{pack.points.map(point => <Text localize={false} key={point} style={t.body}>• {point}</Text>)}</View>}
      <Text style={t.body}>{ieltsGuidance[part].focus}</Text>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}><View style={{ gap: 5 }}><Text style={t.small}>{phase === 'prepare' ? 'Preparation · 1 minute' : phase === 'done' ? 'Time complete · Your answer is kept' : part === 2 ? 'Long turn · Up to 2 minutes' : 'Optional per-question practice timer'}</Text><Text localize={false} style={{ color: c.lime, fontSize: 38, fontWeight: '800', fontVariant: ['tabular-nums'] }}>{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</Text></View><Button title={running ? 'Pause timer' : phase === 'prepare' ? 'Start preparation' : 'Start speaking timer'} variant="secondary" onPress={() => { if (running) { setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))); setRunning(false); } else startTimer(); }} /></View>
      <Meter value={1 - remaining / (phase === 'prepare' ? 60 : ieltsGuidance[part].seconds)} />
      {part === 2 && <><TextInput accessibilityLabel="IELTS preparation notes" multiline value={notes[pack.id] || ''} onChangeText={text => setNotes(previous => ({ ...previous, [pack.id]: text }))} maxLength={1000} placeholder="Keywords only — not a full script…" placeholderTextColor={c.muted} style={{ color: c.text, minHeight: 90, padding: 14, backgroundColor: c.background, borderRadius: 12, fontSize: 16 }} />{phase === 'prepare' && <Button title="Ready · Begin long turn" variant="secondary" onPress={() => { setRunning(false); setPhase('speak'); setRemaining(120); }} />}</>}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel={translate('Consent to IELTS browser voice', displaySnapshot().language)} value={consent} onValueChange={value => { voice.cancel(); voice.stopSpeaking(); setConsent(value); }} /><Text style={[t.small, { flex: 1 }]}>Enable browser speech services. Audio or text may be processed by the browser provider. This page does not automatically send your answers to Gemini.</Text></View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}><Button title="Hear the question" icon="volume-high-outline" variant="secondary" disabled={!consent || !voice.canSpeak || recorderOpen || voice.listening || voice.starting} onPress={() => voice.speak(prompt)} /><Button title={voice.listening || voice.starting ? 'Finish dictation' : 'Dictate my answer'} icon="mic-outline" variant="secondary" disabled={!consent || !voice.supported || recorderOpen} onPress={() => { if (voice.listening || voice.starting) voice.stop(); else { base.current = draft; voice.start(); } }} /><Button title="Stop playback" variant="ghost" onPress={voice.stopSpeaking} /></View>
      <TextInput accessibilityLabel="IELTS answer" multiline editable={!voice.listening && !voice.starting} value={draft} onChangeText={text => setDrafts(previous => ({ ...previous, [key]: text }))} maxLength={4000} placeholder="Your answer or live dictation…" placeholderTextColor={c.muted} style={{ color: c.text, minHeight: 160, textAlignVertical: 'top', lineHeight: 25, padding: 16, borderRadius: 12, backgroundColor: c.background, fontSize: 16 }} />
      <Text style={t.small}>{wordCount(draft)} / 20 words minimum</Text>
      {!!voice.voiceError && <Text accessibilityRole="alert" style={{ color: c.danger }}>{voice.voiceError}</Text>}
      <Button title="Review this IELTS answer with AI" icon="sparkles-outline" disabled={wordCount(draft) < 20 || voice.listening || voice.starting || recorderOpen} onPress={() => { setRunning(false); voice.cancel(); voice.stopSpeaking(); onReview(draft, ieltsReviewQuestion(prompt, part)); }} />
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}><Text style={t.small}>{index + 1} / {count}</Text>{part !== 2 && <Button title="Next question" variant="secondary" onPress={() => switchTask(part, packIndex, (index + 1) % count)} />}</View>
      <Button title={recorderOpen ? 'Hide local recorder' : 'Record and listen back'} variant="ghost" onPress={() => { voice.cancel(); voice.stopSpeaking(); setRecorderOpen(value => !value); }} />
      {recorderOpen && <VoiceRecorder isActive={active && recorderOpen} />}
      <Text style={t.small}>Drafts and notes stay in this screen until reload. Audio is temporary. No XP or official band is awarded here. Browser dictation can stop early; finish and restart it to continue your answer.</Text>
    </Card>
  </View>;
}
