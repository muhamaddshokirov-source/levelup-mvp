import { AIAssistant } from '../components/AIAssistant';
import { IELTSPractice } from '../components/IELTSPractice';
import { IELTSPart } from '../domain/ielts';
import { PageHeader } from '../components/PageHeader';
import { SpeakingNotebook } from '../components/SpeakingPreparation';
import { SpeakingLevel } from '../domain/speaking';
import { AIConversation } from '../components/AIConversation';
import { Text, TextInput } from '../components/LocalizedText';
import React, { useState } from 'react';
import { Pressable, Switch, View } from 'react-native';
import { Button, Card, Icon, typography as t } from '../components/UI';
import { coachErrorMessage } from '../domain/coachErrors';
import { wordCount } from '../domain/practice';
import { CoachVerification } from '../components/CoachVerification';
import { CoachFeedback } from '../components/CoachFeedback';
import { coachConfig } from '../config/coach';
import { colors as c } from '../theme';
function FeedbackScreen({ initialAnswer = '', initialQuestion = '', onBack }: { initialAnswer?: string; initialQuestion?: string; onBack: () => void }) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [question, setQuestion] = useState(initialQuestion);
  const endpoint = coachConfig.endpoint;
  const siteKey = coachConfig.siteKey;
  const configured = endpoint.startsWith('https://') && !!siteKey;
  const [verification, setVerification] = useState('');
  const [verificationKey, setVerificationKey] = useState(0);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const request = async () => {
    if (!configured || !verification || loading) return;
    setError(''); setFeedback('');
    let url: URL;
    try { url = new URL(endpoint.trim()); if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error(); }
    catch { setError('AI ustoz vaqtincha mavjud emas. Keyinroq urinib ko‘ring.'); return; }
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120000);
    try {
      const response = await fetch(url.toString(), { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question, answer, verification }) });
      let result;
      try { result = await response.json(); } catch { throw new Error(`Server javobi noto‘g‘ri. [HTTP_${response.status}]`); }
      if (!response.ok) throw new Error(coachErrorMessage(response.status, result));
      if (typeof result.feedback !== 'string' || !result.feedback.trim()) throw new Error('Serverdan to‘g‘ri feedback kelmadi.');
      setFeedback(result.feedback.slice(0, 12000));
    } catch (e) { setError(e instanceof Error && e.name === 'AbortError' ? 'Kutish vaqti tugadi. Bepul server uyg‘onishi vaqt olishi mumkin. Qayta urinib ko‘ring.' : e instanceof Error ? e.message : 'Ulanishda xato.'); }
    finally { clearTimeout(timer); setLoading(false); setVerification(''); setVerificationKey(key => key + 1); }
  };
  const field = { color: c.text, backgroundColor: c.background, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: c.border, fontSize: 15 };
  return <View style={{ gap: 18 }}><Text style={t.heading}>Review your answer</Text><Text style={t.small}>Text-based coaching. No official score or pronunciation assessment.</Text>
    {!configured && <Card><View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}><Icon name="sparkles-outline" /><Text style={t.heading}>AI ustoz tez orada</Text></View><Text style={t.body}>Xizmat hali ishga tushirilmagan. Sizdan hech qanday kalit yoki kirish kodi kerak emas. Hozircha Learn darslaridagi namunalar bilan mashq qiling.</Text></Card>}

    <Card><Text style={t.heading}>Nimani mashq qildingiz?</Text><TextInput accessibilityLabel="Practice question" editable={!loading} value={question} onChangeText={value => { setQuestion(value); setFeedback(''); }} maxLength={1000} placeholder="Your speaking question…" placeholderTextColor={c.muted} style={field} /><TextInput accessibilityLabel="Answer for AI feedback" editable={!loading} multiline value={answer} onChangeText={value => { setAnswer(value); setFeedback(''); }} maxLength={4000} placeholder="Your English answer…" placeholderTextColor={c.muted} style={[field, { minHeight: 160, textAlignVertical: 'top', lineHeight: 24 }]} /><Text style={t.small}>{wordCount(answer)} words · Kamida 20 inglizcha so‘z</Text><View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel="Consent to send text to AI provider" value={consent} disabled={loading} onValueChange={setConsent} trackColor={{ true: '#526D38', false: c.border }} thumbColor={consent ? c.lime : c.muted} /><Text style={[t.small, { flex: 1 }]}>Savol va javobim AI feedback olish uchun server va Google Gemini xizmatiga yuborilishiga roziman. Shaxsiy yoki maxfiy ma’lumot kiritmayman. Audio yuborilmaydi. Bepul rejimda matn va javoblar Google mahsulotlarini yaxshilashda ishlatilishi mumkin.</Text></View>{configured && consent && <CoachVerification key={verificationKey} siteKey={siteKey} onToken={setVerification} />}<Button title={loading ? 'Ustoz tayyorlanmoqda…' : 'AI ustozdan so‘rash'} icon="sparkles-outline" disabled={loading || !consent || !configured || !verification || !question.trim() || wordCount(answer) < 20} onPress={() => { void request(); }} /><Text style={t.small}>Bepul server ilk so‘rovda sekinroq ochilishi mumkin. Limit tugasa keyinroq qayta urinib ko‘ring.</Text>{!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}</Card>
    {!!feedback && <CoachFeedback feedback={feedback} />}
  </View>;
}

export type CoachMode = 'conversation' | 'feedback' | 'assistant' | 'ielts';
export function CoachScreen({ initialAnswer = '', initialQuestion = '', onBack, isActive = true, notebook, preferredLevel, initialMode = 'conversation', initialPart = 1 }: { initialAnswer?: string; initialQuestion?: string; onBack: () => void; isActive?: boolean; notebook?: SpeakingNotebook; preferredLevel?: SpeakingLevel; initialMode?: CoachMode; initialPart?: IELTSPart }) {
  const [reviewInput, setReviewInput] = useState({ answer: initialAnswer, question: initialQuestion });
  const [mode, setMode] = useState<CoachMode>(initialAnswer || initialQuestion ? 'feedback' : initialMode);
  const review = (answer: string, question: string) => { setReviewInput({ answer, question }); setMode('feedback'); };
  return <View style={{ gap: 20 }}><PageHeader eyebrow="LEVELUP SPEAKING STUDIO" title="Your speaking space." body="One place for guided help, real conversation and IELTS practice." icon="mic-outline" /><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{[
    { id: 'assistant' as const, title: 'AI assistant', icon: 'sparkles-outline' as const },
    { id: 'conversation' as const, title: 'AI conversation', icon: 'chatbubbles-outline' as const },
    { id: 'ielts' as const, title: 'IELTS speaking', icon: 'school-outline' as const },
    { id: 'feedback' as const, title: 'Writing feedback', icon: 'create-outline' as const },
  ].map(item => <View key={item.id} style={{ flexGrow: 1, flexBasis: 140, minWidth: 0 }}><Button title={item.title} icon={item.icon} variant={mode === item.id ? 'primary' : 'secondary'} onPress={() => setMode(item.id)} /></View>)}</View>
    <View style={mode !== 'assistant' ? { display: 'none' } : undefined}><AIAssistant active={isActive && mode === 'assistant'} /></View>
    <View style={mode !== 'conversation' ? { display: 'none' } : undefined}><AIConversation active={isActive && mode === 'conversation'} preferredLevel={preferredLevel} notebook={notebook} onReview={review} /></View>
    <View style={mode !== 'ielts' ? { display: 'none' } : undefined}><IELTSPractice active={isActive && mode === 'ielts'} initialPart={initialPart} onReview={review} /></View>
    {mode === 'feedback' && <FeedbackScreen initialAnswer={reviewInput.answer} initialQuestion={reviewInput.question} onBack={onBack} />}
  </View>;
}
