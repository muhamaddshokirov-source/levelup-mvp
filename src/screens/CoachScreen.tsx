import React, { useState } from 'react';
import { Pressable, Switch, Text, TextInput, View } from 'react-native';
import { Button, Card, Icon, typography as t } from '../components/UI';
import { wordCount } from '../domain/practice';
import { CoachVerification } from '../components/CoachVerification';
import { coachConfig } from '../config/coach';
import { colors as c } from '../theme';
export function CoachScreen({ initialAnswer = '', initialQuestion = '', onBack }: { initialAnswer?: string; initialQuestion?: string; onBack: () => void }) {
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
      if (!response.ok) throw new Error(response.status === 401 ? 'Xavfsizlik tekshiruvini qayta bajaring.' : response.status === 429 ? 'Bepul AI limiti tugadi. Keyinroq urinib ko‘ring.' : 'AI ustoz hozir javob bera olmadi. Keyinroq urinib ko‘ring.');
      const result = await response.json();
      if (typeof result.feedback !== 'string' || !result.feedback.trim()) throw new Error('Serverdan to‘g‘ri feedback kelmadi.');
      setFeedback(result.feedback.slice(0, 12000));
    } catch (e) { setError(e instanceof Error && e.name === 'AbortError' ? 'Kutish vaqti tugadi. Bepul server uyg‘onishi vaqt olishi mumkin. Qayta urinib ko‘ring.' : e instanceof Error ? e.message : 'Ulanishda xato.'); }
    finally { clearTimeout(timer); setLoading(false); setVerification(''); setVerificationKey(key => key + 1); }
  };
  const field = { color: c.text, backgroundColor: c.background, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: c.border, fontSize: 15 };
  return <View style={{ gap: 22 }}><Pressable accessibilityRole="button" onPress={onBack}><Text style={{ color: c.lime }}>← Darslarga qaytish</Text></Pressable><View style={{ gap: 10 }}><Text style={t.eyebrow}>AI SPEAKING COACH · BETA</Text><Text style={t.title}>Keyingi qadamingizni toping.</Text><Text style={t.body}>Matn bo‘yicha shaxsiy fikr, yaxshilangan misol va davomiy savol. AI xato qilishi mumkin; bu imtihon bahosi yoki talaffuz tahlili emas.</Text></View>
    {!configured && <Card><View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}><Icon name="sparkles-outline" /><Text style={t.heading}>AI ustoz tez orada</Text></View><Text style={t.body}>Xizmat hali ishga tushirilmagan. Sizdan hech qanday kalit yoki kirish kodi kerak emas. Hozircha Learn darslaridagi namunalar bilan mashq qiling.</Text></Card>}

    <Card><Text style={t.heading}>Nimani mashq qildingiz?</Text><TextInput accessibilityLabel="Practice question" editable={!loading} value={question} onChangeText={value => { setQuestion(value); setFeedback(''); }} maxLength={1000} placeholder="Your speaking question…" placeholderTextColor={c.muted} style={field} /><TextInput accessibilityLabel="Answer for AI feedback" editable={!loading} multiline value={answer} onChangeText={value => { setAnswer(value); setFeedback(''); }} maxLength={4000} placeholder="Your English answer…" placeholderTextColor={c.muted} style={[field, { minHeight: 160, textAlignVertical: 'top', lineHeight: 24 }]} /><Text style={t.small}>{wordCount(answer)} words · Kamida 20 inglizcha so‘z</Text><View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel="Consent to send text to AI provider" value={consent} disabled={loading} onValueChange={setConsent} trackColor={{ true: '#526D38', false: c.border }} thumbColor={consent ? c.lime : c.muted} /><Text style={[t.small, { flex: 1 }]}>Savol va javobim AI feedback olish uchun server va Google Gemini xizmatiga yuborilishiga roziman. Shaxsiy yoki maxfiy ma’lumot kiritmayman. Audio yuborilmaydi. Bepul rejimda matn va javoblar Google mahsulotlarini yaxshilashda ishlatilishi mumkin.</Text></View>{configured && consent && <CoachVerification key={verificationKey} siteKey={siteKey} onToken={setVerification} />}<Button title={loading ? 'Ustoz tayyorlanmoqda…' : 'AI ustozdan so‘rash'} icon="sparkles-outline" disabled={loading || !consent || !configured || !verification || !question.trim() || wordCount(answer) < 20} onPress={() => { void request(); }} /><Text style={t.small}>Bepul server ilk so‘rovda sekinroq ochilishi mumkin. Limit tugasa keyinroq qayta urinib ko‘ring.</Text>{!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}</Card>
    {!!feedback && <Card><Text style={t.eyebrow}>AI FEEDBACK · TEKSHIRIB FOYDALANING</Text><Text selectable accessibilityLiveRegion="polite" style={[t.body, { color: c.text }]}>{feedback}</Text><Text style={t.small}>Bitta tavsiyani tanlab, javobingizni yana ovoz chiqarib aytib ko‘ring.</Text></Card>}
  </View>;
}
