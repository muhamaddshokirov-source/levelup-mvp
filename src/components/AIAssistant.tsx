import React, { useEffect, useRef, useState } from 'react';
import { Switch, View } from 'react-native';
import { Text, TextInput } from './LocalizedText';
import { Button, Card, Icon, typography as t } from './UI';
import { CoachVerification } from './CoachVerification';
import { coachConfig } from '../config/coach';
import { coachErrorMessage } from '../domain/coachErrors';
import { displaySnapshot } from '../displayPreferences';
import { translate } from '../domain/translations';
import { colors as c } from '../theme';
type Message = { role: 'user' | 'assistant'; text: string };
export function AIAssistant({ active }: { active: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState('');
  const [verificationKey, setVerificationKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const controller = useRef<AbortController | null>(null);
  const sending = useRef(false);
  useEffect(() => { if (!active) controller.current?.abort(); return () => controller.current?.abort(); }, [active]);
  const configured = coachConfig.endpoint.startsWith('https://') && !!coachConfig.siteKey;
  const send = async () => {
    if (!active || sending.current || !consent || !token || !draft.trim() || !configured || messages.length >= 8) return;
    sending.current = true; setBusy(true); setError(''); const text = draft.trim();
    const request = new AbortController(); controller.current = request;
    const timeout = setTimeout(() => request.abort(), 120000);
    try {
      const response = await fetch(coachConfig.endpoint, { method: 'POST', signal: request.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'assistant', language: displaySnapshot().language, question: 'Help this learner with English speaking practice, IELTS preparation or a realistic study plan.', answer: text, history: messages, verification: token }) });
      const result = await response.json();
      if (response.status === 400 && result.error === 'Invalid mode') throw new Error('The assistant server needs its latest update. Please try again later.');
      if (!response.ok) throw new Error(coachErrorMessage(response.status, result));
      if (result.mode !== 'assistant') throw new Error('The assistant server needs its latest update. Please try again later.');
      if (typeof result.feedback !== 'string' || !result.feedback.trim()) throw new Error('AI returned an empty reply. Please try again.');
      if (request.signal.aborted) return;
      setMessages(previous => [...previous, { role: 'user', text }, { role: 'assistant', text: result.feedback.slice(0, 1200) }]); setDraft('');
    } catch (e) { setError(request.signal.aborted ? 'Request stopped. Your draft is kept.' : e instanceof Error ? e.message : 'AI conversation unavailable. Please try again.'); }
    finally { clearTimeout(timeout); sending.current = false; setBusy(false); setToken(''); setVerificationKey(value => value + 1); controller.current = null; }
  };
  return <View style={{ gap: 18 }}><Card><View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Icon name="sparkles-outline" /><Text style={t.heading}>Your speaking assistant</Text></View><Text style={t.body}>Ask for a short plan, an explanation or a better way to express an idea. The assistant only sees what you send, not your microphone or private notebook.</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{['Build a 10-minute speaking plan', 'Help me develop an IELTS answer', 'Explain a speaking mistake'].map((label, i) => <Button key={label} title={label} variant="secondary" disabled={busy} onPress={() => setDraft(['Please suggest a realistic ten-minute English speaking workout for today.', 'How can I develop an IELTS Speaking answer with reasons and examples? Please show a short example without claiming a band score.', 'Please help me understand this sentence and improve it: '][i]!)} />)}</View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel={translate('Consent to assistant text', displaySnapshot().language)} disabled={busy} value={consent} onValueChange={value => { setConsent(value); setToken(''); }} /><Text style={[t.small, { flex: 1 }]}>I agree to send my messages to the server and Google Gemini. Do not include private information. Free-tier data may be used to improve Google products. AI can make mistakes.</Text></View>
    {messages.map((message, i) => <View key={i} style={{ gap: 8 }}><Text style={t.eyebrow}>{message.role === 'user' ? 'YOU' : 'AI ASSISTANT'}</Text>{message.role === 'assistant' ? <View style={{ padding: 16, borderRadius: 12, backgroundColor: c.raised }}><Text localize={false} selectable style={[t.body, { color: c.text }]}>{message.text}</Text></View> : <Text localize={false} style={[t.body, { color: c.text }]}>{message.text}</Text>}</View>)}
    {messages.length >= 8 ? <><Text style={t.body}>This session is complete. Start a new chat to continue.</Text><Button title="New assistant chat" variant="secondary" onPress={() => { setMessages([]); setError(''); setToken(''); setVerificationKey(value => value + 1); }} /></> : <><TextInput accessibilityLabel="Ask the AI assistant" multiline value={draft} onChangeText={setDraft} editable={!busy} maxLength={1200} placeholder="What would you like help with?" placeholderTextColor={c.muted} style={{ minHeight: 110, color: c.text, backgroundColor: c.background, padding: 16, borderRadius: 12, fontSize: 16, textAlignVertical: 'top' }} />
    {configured && consent && active && <CoachVerification key={verificationKey} siteKey={coachConfig.siteKey} onToken={setToken} />}
    <Button title={busy ? 'Waiting for AI…' : 'Ask assistant'} icon="arrow-forward" disabled={busy || !consent || !token || !draft.trim() || !configured} onPress={() => { void send(); }} /></>}
    {!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}<Text style={t.small}>Short text-coaching sessions, not unlimited chat. Free limits apply. Messages disappear after reload. No official IELTS scores.</Text>
  </Card></View>;
}
