import React, { useEffect, useRef, useState } from 'react';
import { Switch, View, useWindowDimensions } from 'react-native';
import { Text, TextInput } from './LocalizedText';
import { Button, Card, Icon, typography as t } from './UI';
import { CoachVerification } from './CoachVerification';
import { coachConfig } from '../config/coach';
import { coachErrorMessage } from '../domain/coachErrors';
import { useBrowserVoice } from '../hooks/useBrowserVoice';
import { colors as c } from '../theme';

import { speakingScenarios as topics, SpeakingLevel, SpeakingMessage as Message, conversationReview } from '../domain/speaking';
import { SpeakingPreparation, SpeakingNotebook } from './SpeakingPreparation';
import { SpeakingReview } from './SpeakingReview';
export function AIConversation({ active, preferredLevel = 'A1', notebook, onReview }: { active: boolean; preferredLevel?: SpeakingLevel; notebook?: SpeakingNotebook; onReview?: (answer: string, question: string) => void }) {
  const wide = useWindowDimensions().width >= 1000;
  const [permissionsOpen, setPermissionsOpen] = useState(true);
  const [topic, setTopic] = useState(0);
  const [level, setLevel] = useState<SpeakingLevel>(preferredLevel);
  const [slow, setSlow] = useState(true);
  const [patient, setPatient] = useState(preferredLevel === 'A1' || preferredLevel === 'A2');
  const [help, setHelp] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: topics[0]!.opening }]);
  const [draft, setDraft] = useState('');
  const [consent, setConsent] = useState(false);
  const [voiceConsent, setVoiceConsent] = useState(false);
  const [readReplies, setReadReplies] = useState(true);
  const [token, setToken] = useState('');
  const [verificationKey, setVerificationKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const requestRef = useRef<AbortController | null>(null);
  const sending = useRef(false);
  const running = useRef(false);
  const stage = useRef('off');
  const [callPhase, setCallPhase] = useState('off');
  const [autoAnswer, setAutoAnswer] = useState('');
  const heard = useRef('');
  const generation = useRef(0);
  const manualBase = useRef('');
  const changePhase = (phase: string) => { stage.current = phase; setCallPhase(phase); };
  const voice = useBrowserVoice(active && consent && voiceConsent, text => {
    if (running.current) {
      if (stage.current !== 'listening') return;
      heard.current = text;
      setDraft(heard.current);
    } else setDraft(`${manualBase.current} ${text}`.trim().slice(0, 1200));
  }, () => {
    if (!running.current || stage.current !== 'listening') return;
    if (!heard.current.trim()) { stopCall(); setError('No speech detected. Start again when you are ready.'); return; }
    changePhase('verifying'); setAutoAnswer(heard.current.trim());
  }, () => { if (running.current) stopCall(); }, text => {
    if (running.current) {
      if (stage.current !== 'listening' && stage.current !== 'opening') return;
      heard.current = text; setDraft(text);
    } else setDraft(`${manualBase.current} ${text}`.trim().slice(0, 1200));
  }, () => { if (running.current && stage.current === 'opening') changePhase('listening'); }, { rate: slow ? 0.8 : 1, pauseMs: patient ? 3500 : 2200 });
  const startManual = () => { manualBase.current = draft.trim(); voice.start(); };
  function stopCall() {
    running.current = false; generation.current++; heard.current = ''; setAutoAnswer(''); changePhase('off');
    voice.cancel(); voice.stopSpeaking(); requestRef.current?.abort();
  }
  function listenNext(id: number) {
    if (!running.current || generation.current !== id) return;
    heard.current = ''; setDraft(''); changePhase('opening'); voice.start();
  }
  function readTurn(text: string, id: number, last = false) {
    changePhase('speaking');
    voice.speak(text, () => {
      if (!running.current || generation.current !== id) return;
      if (last) stopCall(); else listenNext(id);
    }, () => {
      if (!running.current || generation.current !== id) return;
      stopCall(); setError('Voice playback failed. Start again or use the manual conversation.');
    });
  }
  const startCall = () => {
    if (!active || busy || !consent || !voiceConsent || !voice.supported || !voice.canSpeak || !configured || completedTurns >= 6) return;
    voice.cancel(); voice.stopSpeaking(); setError(''); setDraft(''); setAutoAnswer('');
    running.current = true; const id = ++generation.current;
    readTurn(messages[messages.length - 1]!.text, id);
  };
  const completedTurns = messages.filter(message => message.role === 'user').length;
  const configured = coachConfig.endpoint.startsWith('https://') && !!coachConfig.siteKey;
  useEffect(() => { if (!active) stopCall(); return () => { stopCall(); }; }, [active]);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const hide = () => { if (document.hidden) stopCall(); };
    document.addEventListener('visibilitychange', hide);
    return () => document.removeEventListener('visibilitychange', hide);
  }, []);
  const reset = (nextTopic: number) => {
    stopCall(); setTopic(nextTopic); setHelp(false); setMessages([{ role: 'assistant', text: topics[nextTopic]!.opening }]); setDraft(''); setError(''); setToken(''); setVerificationKey(key => key + 1);
  };
  const send = async (automaticText?: string) => {
    const automatic = !!automaticText; const callId = generation.current;
    if (sending.current || !active || !consent || !token || !(automaticText || draft).trim() || completedTurns >= 6 || !configured) return;
    sending.current = true; setBusy(true); setError(''); voice.cancel(); voice.stopSpeaking();
    if (automatic) { changePhase('thinking'); setAutoAnswer(''); }
    const answer = (automaticText || draft).trim();
    const controller = new AbortController(); requestRef.current = controller;
    const timer = setTimeout(() => controller.abort(), 120000);
    try {
      const response = await fetch(coachConfig.endpoint, { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'conversation', level, question: `Situation: ${topics[topic]!.label}. Role: ${topics[topic]!.role}. Goal: ${topics[topic]!.goal}. Learner practice level: ${level}. Have a short English practice conversation with the learner.`, answer, history: messages, verification: token }) });
      const result = await response.json();
      if (!response.ok) throw new Error(coachErrorMessage(response.status, result));
      if (result.mode !== 'conversation') throw new Error('The conversation server is being updated. Please try again shortly.');
      if (typeof result.feedback !== 'string' || !result.feedback.trim()) throw new Error('AI returned an empty reply. Please try again.');
      const reply = result.feedback.trim().slice(0, 1200);
      if (controller.signal.aborted) return;
      setMessages(previous => [...previous, { role: 'user', text: answer }, { role: 'assistant', text: reply }]); setDraft('');
      if (automatic && running.current && generation.current === callId) readTurn(reply, callId, completedTurns + 1 >= 6);
      else if (!automatic && readReplies && voiceConsent) voice.speak(reply);
    } catch (e) { const cancelled = controller.signal.aborted; if (automatic) stopCall(); if (!cancelled) setError(e instanceof Error ? e.message : 'AI conversation unavailable. Please try again.'); else if (!automatic) setError('Request stopped. Your reply is still here; try again when ready.'); }
    finally { clearTimeout(timer); sending.current = false; setBusy(false); setToken(''); setVerificationKey(key => key + 1); requestRef.current = null; }
  };
  useEffect(() => {
    if (active && running.current && stage.current === 'verifying' && autoAnswer && token && !busy) void send(autoAnswer);
  }, [active, autoAnswer, token, busy]);
  useEffect(() => {
    if (callPhase !== 'speaking' && callPhase !== 'opening' && callPhase !== 'listening' && callPhase !== 'verifying') return;
    const timer = setTimeout(() => {
      if (running.current) { stopCall(); setError('Voice session paused. Start again or continue manually.'); }
    }, callPhase === 'speaking' ? 60000 : 30000);
    return () => clearTimeout(timer);
  }, [callPhase]);
  return <View style={{ gap: 20, flexDirection: wide ? 'row' : 'column', alignItems: 'flex-start' }}><View style={{ width: wide ? 350 : '100%', minWidth: 0, gap: 18 }}>
    <SpeakingPreparation topic={topic} onTopic={reset} level={level} onLevel={setLevel} slow={slow} onSlow={setSlow} patient={patient} onPatient={setPatient} locked={busy || callPhase !== 'off' || voice.listening || voice.starting} hasTurns={completedTurns > 0} help={help} onHelp={() => { if (running.current || voice.listening || voice.starting) { stopCall(); setHelp(true); } else setHelp(value => !value); }} onUse={setDraft} notebook={notebook} />
    <Card><Text style={t.heading}>Talk with your AI partner</Text>{consent && voiceConsent && !permissionsOpen ? <><Text style={t.small}>Text and browser voice services enabled. You control when a session starts.</Text><Button title="Review permissions" variant="ghost" onPress={() => setPermissionsOpen(true)} /></> : <><Text style={t.body}>Start a hands-free conversation, or dictate and send each reply manually. The AI responds in English and asks the next question.</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel="Consent to AI conversation" value={consent} disabled={busy} onValueChange={value => { stopCall(); setConsent(value); setToken(''); if (value && voiceConsent) setPermissionsOpen(false); }} /><Text style={[t.small, { flex: 1 }]}>I agree to send this conversation text to the server and Google Gemini. Do not include private details. Free-tier data may be used to improve Google products. AI can make mistakes.</Text></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel="Consent to browser voice services" value={voiceConsent} disabled={busy} onValueChange={value => { stopCall(); setVoiceConsent(value); if (value && consent) setPermissionsOpen(false); }} /><Text style={[t.small, { flex: 1 }]}>Enable browser voice services. Voice recognition and playback may send audio or text to your browser or device provider. LevelUp sends recognized text to Gemini, not microphone audio. In hands-free mode, recognized speech is sent automatically.</Text></View>
      {consent && voiceConsent && <Button title="Hide permissions" variant="ghost" onPress={() => setPermissionsOpen(false)} />}</>}
      {!voice.supported && <Text style={t.small}>Voice input is not available in this browser. Try a supported browser such as Chrome, or type your reply below.</Text>}
      <Text style={t.small}>The first question is a prepared starter. Later replies come from AI. This conversation is not saved after a reload and does not award XP. No pronunciation score.</Text>
    </Card>
    </View><View style={{ flex: 1, width: '100%', minWidth: 0, gap: 18 }}>
    <Card style={{ borderColor: callPhase !== 'off' ? c.lime : c.border }}><View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}><View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: c.limeDark, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: callPhase === 'listening' ? c.lime : c.border }}><Icon name={callPhase === 'listening' ? 'mic-outline' : callPhase === 'speaking' ? 'volume-high-outline' : 'sparkles-outline'} size={28} /></View><View style={{ flex: 1, gap: 7 }}><Text style={t.eyebrow}>02 · SPEAK WITH PURPOSE</Text><Text style={t.heading}>Hands-free conversation</Text></View></View><Text style={t.body}>Start once. The AI speaks, then listens and sends your recognized words automatically when you finish. Wait while the AI speaks. This is not a real-time call; pauses and free usage limits apply.</Text><Text style={t.small}>Only start in a quiet place. Nearby speech may also be recognized and sent. Leaving this page or hiding the browser tab ends the session.</Text>
      <Text accessibilityLiveRegion="polite" style={[t.body, { color: c.lime, fontWeight: '700' }]}>{callPhase === 'speaking' ? 'AI is speaking…' : callPhase === 'opening' ? 'Opening microphone…' : callPhase === 'listening' ? 'Listening — your turn' : callPhase === 'thinking' ? 'AI is thinking…' : callPhase === 'verifying' ? 'Waiting for security verification…' : 'Ready when you are'}</Text>
      {(!consent || !voiceConsent) && <Text style={t.small}>Enable text and voice permissions in the preparation panel before starting. Manual text practice needs only text consent.</Text>}
      <Button title={callPhase !== 'off' ? 'End conversation' : 'Start conversation'} icon={callPhase !== 'off' ? 'stop-circle-outline' : 'call-outline'} disabled={callPhase === 'off' && (busy || !consent || !voiceConsent || !voice.supported || !voice.canSpeak || !configured || completedTurns >= 6)} onPress={callPhase !== 'off' ? stopCall : startCall} />
      {(voice.listening || voice.starting || callPhase === 'verifying' || callPhase === 'thinking') && <View style={{ gap: 6, padding: 14, backgroundColor: c.background, borderRadius: 12 }}><Text style={t.small}>Your recognized words</Text><Text localize={false} style={[t.body, { color: c.text }]}>{draft || '…'}</Text></View>}
      {callPhase !== 'off' && <Button title="Pause for a hint" variant="secondary" onPress={() => { stopCall(); setHelp(true); }} />}
      {callPhase === 'listening' && <Button title="Finish my turn" variant="secondary" onPress={voice.stop} />}
      {!!voice.voiceError && <Text accessibilityRole="alert" style={{ color: c.danger }}>{voice.voiceError}</Text>}
      {!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}
    </Card>
    <Card><View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}><Text style={t.heading}>Conversation</Text><Text style={t.small}>{completedTurns} / 6</Text></View>
      {messages.map((message, index) => <View key={index} style={{ gap: 10, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: c.border, backgroundColor: message.role === 'user' ? c.background : c.raised }}><Text style={[t.eyebrow, { fontSize: 10 }]}>{message.role === 'user' ? 'YOU' : index === 0 ? 'STARTER QUESTION' : 'AI PARTNER'}</Text><Text localize={false} selectable style={[t.body, { color: c.text }]}>{message.text}</Text>{message.role === 'assistant' && voice.canSpeak && <Button title="Listen" variant="ghost" icon="volume-high-outline" disabled={!consent || !voiceConsent || busy || callPhase !== 'off'} onPress={() => voice.speak(message.text)} />}</View>)}
      {busy && <Text accessibilityLiveRegion="polite" style={t.small}>AI is preparing a reply…</Text>}
      {completedTurns >= 6 ? <><Text style={t.body}>Practice complete. Start a fresh conversation when you are ready.</Text><Button title="New conversation" variant="secondary" onPress={() => reset(topic)} /></> : <>
        <TextInput accessibilityLabel="Conversation reply" editable={!busy && !voice.starting && !voice.listening && callPhase === 'off'} multiline value={draft} onChangeText={setDraft} maxLength={1200} placeholder="Type or dictate your English reply…" placeholderTextColor={c.muted} style={{ minHeight: 110, color: c.text, backgroundColor: c.background, borderWidth: 1, borderColor: c.border, borderRadius: 12, padding: 16, textAlignVertical: 'top', fontSize: 16, lineHeight: 24 }} />
        <Text style={t.small}>{draft.length} / 1200</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}><Button title={voice.starting ? 'Opening microphone…' : voice.listening ? 'Stop microphone' : 'Speak your reply'} icon={voice.listening ? 'stop-circle-outline' : 'mic-outline'} variant="secondary" disabled={!voice.supported || !consent || !voiceConsent || busy || callPhase !== 'off'} onPress={voice.listening || voice.starting ? voice.stop : startManual} /><Button title="Stop playback" variant="ghost" disabled={!voice.canSpeak || callPhase !== 'off'} onPress={voice.stopSpeaking} /></View>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><Switch accessibilityLabel="Read AI replies aloud" disabled={busy || callPhase !== 'off'} value={readReplies} onValueChange={value => { voice.stopSpeaking(); setReadReplies(value); }} /><Text style={t.small}>Read AI replies aloud</Text></View>
        {configured && consent && active && <CoachVerification key={verificationKey} siteKey={coachConfig.siteKey} onToken={setToken} />}
        <Button title={busy ? 'Waiting for AI…' : 'Send reply'} icon="arrow-forward" disabled={busy || callPhase !== 'off' || voice.starting || voice.listening || !consent || !token || !draft.trim() || !configured} onPress={() => { void send(); }} />
        {!configured && <Text style={t.small}>AI conversation unavailable. Please try again.</Text>}
        <Text style={t.small}>Free AI limits apply. Each reply needs verification; the free server may take a moment to wake up.</Text>
      </>}
    </Card>
    <SpeakingReview messages={messages} disabled={busy || callPhase !== 'off' || voice.listening || voice.starting} onRetry={() => reset(topic)} onReview={() => { const review = conversationReview(messages, topics[topic]!.label, level); stopCall(); onReview?.(review.answer, review.question); }} />
  </View></View>;
}
