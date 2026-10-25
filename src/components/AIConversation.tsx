import React, { useEffect, useRef, useState } from 'react';
import { Switch, View } from 'react-native';
import { Text, TextInput } from './LocalizedText';
import { Button, Card, typography as t } from './UI';
import { CoachVerification } from './CoachVerification';
import { coachConfig } from '../config/coach';
import { coachErrorMessage } from '../domain/coachErrors';
import { useBrowserVoice } from '../hooks/useBrowserVoice';
import { colors as c } from '../theme';

type Message = { role: 'user' | 'assistant'; text: string };
const topics = [
  { label: 'Everyday life', opening: 'Hi! What do you usually enjoy doing after a busy day?' },
  { label: 'Travel', opening: 'Welcome! Where would you like to travel, and why?' },
  { label: 'Job interview', opening: 'Hello, nice to meet you. Could you tell me a little about yourself and the work you want to do?' },
];
export function AIConversation({ active }: { active: boolean }) {
  const [topic, setTopic] = useState(0);
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
  const voice = useBrowserVoice(active && consent && voiceConsent, text => setDraft(previous => `${previous} ${text}`.trim().slice(0, 1200)));
  const completedTurns = messages.filter(message => message.role === 'user').length;
  const configured = coachConfig.endpoint.startsWith('https://') && !!coachConfig.siteKey;
  useEffect(() => { if (!active) requestRef.current?.abort(); return () => requestRef.current?.abort(); }, [active]);
  const reset = (nextTopic: number) => {
    voice.stop(); voice.stopSpeaking(); setTopic(nextTopic); setMessages([{ role: 'assistant', text: topics[nextTopic]!.opening }]); setDraft(''); setError(''); setToken(''); setVerificationKey(key => key + 1);
  };
  const send = async () => {
    if (sending.current || !active || !consent || !token || !draft.trim() || completedTurns >= 6 || !configured) return;
    sending.current = true; setBusy(true); setError(''); voice.stop(); voice.stopSpeaking();
    const answer = draft.trim();
    const controller = new AbortController(); requestRef.current = controller;
    const timer = setTimeout(() => controller.abort(), 120000);
    try {
      const response = await fetch(coachConfig.endpoint, { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'conversation', question: `Situation: ${topics[topic]!.label}. Have a short English practice conversation with the learner.`, answer, history: messages, verification: token }) });
      const result = await response.json();
      if (!response.ok) throw new Error(coachErrorMessage(response.status, result));
      if (typeof result.feedback !== 'string' || !result.feedback.trim()) throw new Error('AI returned an empty reply. Please try again.');
      const reply = result.feedback.trim().slice(0, 1200);
      if (controller.signal.aborted) return;
      setMessages(previous => [...previous, { role: 'user', text: answer }, { role: 'assistant', text: reply }]); setDraft('');
      if (readReplies && voiceConsent) voice.speak(reply);
    } catch (e) { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : 'AI conversation unavailable. Please try again.'); else setError('Request stopped. Your reply is still here; try again when ready.'); }
    finally { clearTimeout(timer); sending.current = false; setBusy(false); setToken(''); setVerificationKey(key => key + 1); requestRef.current = null; }
  };
  return <View style={{ gap: 18 }}>
    <Card><Text style={t.heading}>Talk with your AI partner</Text><Text style={t.body}>Speak in English, check your transcript, then send. The AI responds to your words and asks the next question. This is turn-by-turn practice, not a live phone call.</Text>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>{topics.map((item, index) => <Button key={item.label} title={item.label} variant={topic === index ? 'primary' : 'secondary'} disabled={busy} onPress={() => reset(index)} />)}</View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel="Consent to AI conversation" value={consent} disabled={busy} onValueChange={value => { voice.stop(); voice.stopSpeaking(); setConsent(value); setToken(''); }} /><Text style={[t.small, { flex: 1 }]}>I agree to send this conversation text to the server and Google Gemini. Do not include private details. Free-tier data may be used to improve Google products. AI can make mistakes.</Text></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel="Consent to browser voice services" value={voiceConsent} disabled={busy} onValueChange={value => { voice.stop(); voice.stopSpeaking(); setVoiceConsent(value); }} /><Text style={[t.small, { flex: 1 }]}>Enable browser voice services. Voice recognition and playback may send audio or text to your browser or device provider. LevelUp sends only the reviewed text to Gemini, not microphone audio.</Text></View>
      {!voice.supported && <Text style={t.small}>Voice input is not available in this browser. Try a supported browser such as Chrome, or type your reply below.</Text>}
      <Text style={t.small}>The first question is a prepared starter. Later replies come from AI. This conversation is not saved after a reload and does not award XP. No pronunciation score.</Text>
    </Card>
    <Card><View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}><Text style={t.heading}>Conversation</Text><Text style={t.small}>{completedTurns} / 6</Text></View>
      {messages.map((message, index) => <View key={index} style={{ gap: 10, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: c.border, backgroundColor: message.role === 'user' ? c.background : c.raised }}><Text style={[t.eyebrow, { fontSize: 10 }]}>{message.role === 'user' ? 'YOU' : index === 0 ? 'STARTER QUESTION' : 'AI PARTNER'}</Text><Text localize={false} selectable style={[t.body, { color: c.text }]}>{message.text}</Text>{message.role === 'assistant' && voice.canSpeak && <Button title="Listen" variant="ghost" icon="volume-high-outline" disabled={!consent || !voiceConsent || busy} onPress={() => voice.speak(message.text)} />}</View>)}
      {busy && <Text accessibilityLiveRegion="polite" style={t.small}>AI is preparing a reply…</Text>}
      {completedTurns >= 6 ? <><Text style={t.body}>Practice complete. Start a fresh conversation when you are ready.</Text><Button title="New conversation" variant="secondary" onPress={() => reset(topic)} /></> : <>
        <TextInput accessibilityLabel="Conversation reply" editable={!busy && !voice.listening} multiline value={draft} onChangeText={setDraft} maxLength={1200} placeholder="Type or dictate your English reply…" placeholderTextColor={c.muted} style={{ minHeight: 110, color: c.text, backgroundColor: c.background, borderWidth: 1, borderColor: c.border, borderRadius: 12, padding: 16, textAlignVertical: 'top', fontSize: 16, lineHeight: 24 }} />
        <Text style={t.small}>{draft.length} / 1200</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}><Button title={voice.listening ? 'Stop microphone' : 'Speak your reply'} icon={voice.listening ? 'stop-circle-outline' : 'mic-outline'} variant="secondary" disabled={!voice.supported || !consent || !voiceConsent || busy} onPress={voice.listening ? voice.stop : voice.start} /><Button title="Stop playback" variant="ghost" disabled={!voice.canSpeak} onPress={voice.stopSpeaking} /></View>
        {!!voice.voiceError && <Text accessibilityRole="alert" style={{ color: c.danger }}>{voice.voiceError}</Text>}
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><Switch accessibilityLabel="Read AI replies aloud" disabled={busy} value={readReplies} onValueChange={value => { voice.stopSpeaking(); setReadReplies(value); }} /><Text style={t.small}>Read AI replies aloud</Text></View>
        {configured && consent && active && <CoachVerification key={verificationKey} siteKey={coachConfig.siteKey} onToken={setToken} />}
        <Button title={busy ? 'Waiting for AI…' : 'Send reply'} icon="arrow-forward" disabled={busy || voice.listening || !consent || !token || !draft.trim() || !configured} onPress={() => { void send(); }} />
        {!configured && <Text style={t.small}>AI conversation unavailable. Please try again.</Text>}
        <Text style={t.small}>Free AI limits apply. Each reply needs verification; the free server may take a moment to wake up.</Text>
      </>}
      {!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}
    </Card>
  </View>;
}
