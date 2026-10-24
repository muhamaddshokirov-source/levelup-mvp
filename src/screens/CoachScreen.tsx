import React, { useState } from 'react';
import { Pressable, Switch, Text, TextInput, View } from 'react-native';
import { Button, Card, Icon, typography as t } from '../components/UI';
import { wordCount } from '../domain/practice';
import { colors as c } from '../theme';
export function CoachScreen({ initialAnswer = '', initialQuestion = '', onBack }: { initialAnswer?: string; initialQuestion?: string; onBack: () => void }) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [question, setQuestion] = useState(initialQuestion);
  const [endpoint, setEndpoint] = useState('');
  const [token, setToken] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const request = async () => {
    setError(''); setFeedback('');
    let url: URL;
    try { url = new URL(endpoint.trim()); if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error(); }
    catch { setError('HTTPS backend manzilini kiriting, masalan https://your-server.example/feedback.'); return; }
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 35000);
    try {
      const response = await fetch(url.toString(), { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.trim()}` }, body: JSON.stringify({ question, answer }) });
      if (!response.ok) throw new Error(response.status === 401 ? 'Kirish kodi noto‘g‘ri.' : response.status === 429 ? 'Foydalanish limiti tugadi. Keyinroq urinib ko‘ring.' : 'AI server javob bermadi. Server sozlamalarini tekshiring.');
      const result = await response.json();
      if (typeof result.feedback !== 'string' || !result.feedback.trim()) throw new Error('Serverdan to‘g‘ri feedback kelmadi.');
      setFeedback(result.feedback.slice(0, 12000));
    } catch (e) { setError(e instanceof Error && e.name === 'AbortError' ? 'Kutish vaqti tugadi. Qayta urinib ko‘ring.' : e instanceof Error ? e.message : 'Ulanishda xato.'); }
    finally { clearTimeout(timer); setLoading(false); }
  };
  const field = { color: c.text, backgroundColor: c.background, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: c.border, fontSize: 15 };
  return <View style={{ gap: 22 }}><Pressable accessibilityRole="button" onPress={onBack}><Text style={{ color: c.lime }}>← Darslarga qaytish</Text></Pressable><View style={{ gap: 10 }}><Text style={t.eyebrow}>AI SPEAKING COACH · BETA</Text><Text style={t.title}>Keyingi qadamingizni toping.</Text><Text style={t.body}>Matn bo‘yicha shaxsiy fikr, yaxshilangan misol va davomiy savol. AI xato qilishi mumkin; bu imtihon bahosi yoki talaffuz tahlili emas.</Text></View>
    <Card><View style={{ flexDirection: 'row', gap: 10 }}><Icon name="server-outline" /><Text style={t.heading}>Backend ulanishi kerak</Text></View><Text style={t.body}>Sayt statik hostingda. AI backend hali ommaviy ulanmagan. Backend egasi HTTPS manzili va alohida kirish kodini beradi. OpenAI API kalitini bu yerga kiritmang.</Text><Text style={t.small}>Backend manzili</Text><TextInput accessibilityLabel="Coach backend URL" value={endpoint} onChangeText={setEndpoint} editable={!loading} autoCapitalize="none" autoCorrect={false} placeholder="https://your-backend/feedback" placeholderTextColor={c.muted} style={field} /><Text style={t.small}>Backend kirish kodi (API kalit emas)</Text><TextInput accessibilityLabel="Coach access code" value={token} onChangeText={setToken} editable={!loading} secureTextEntry autoCapitalize="none" autoCorrect={false} style={field} /><Text style={t.small}>Manzil va kod doimiy saqlanmaydi. Faqat ishonchli serverdan foydalaning.</Text></Card>
    <Card><Text style={t.heading}>Nimani mashq qildingiz?</Text><TextInput accessibilityLabel="Practice question" editable={!loading} value={question} onChangeText={value => { setQuestion(value); setFeedback(''); }} maxLength={1000} placeholder="Your speaking question…" placeholderTextColor={c.muted} style={field} /><TextInput accessibilityLabel="Answer for AI feedback" editable={!loading} multiline value={answer} onChangeText={value => { setAnswer(value); setFeedback(''); }} maxLength={4000} placeholder="Your English answer…" placeholderTextColor={c.muted} style={[field, { minHeight: 160, textAlignVertical: 'top', lineHeight: 24 }]} /><Text style={t.small}>{wordCount(answer)} words · Kamida 20 inglizcha so‘z</Text><View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Switch accessibilityLabel="Consent to send text to AI provider" value={consent} disabled={loading} onValueChange={setConsent} trackColor={{ true: '#526D38', false: c.border }} thumbColor={consent ? c.lime : c.muted} /><Text style={[t.small, { flex: 1 }]}>Savol va javobim kiritilgan backend hamda AI xizmatiga yuborilishiga roziman. Shaxsiy yoki maxfiy ma’lumot kiritmayman. Audio yuborilmaydi.</Text></View><Button title={loading ? 'Ustoz javob tayyorlamoqda…' : 'Feedback olish'} icon="sparkles-outline" disabled={loading || !consent || !endpoint.trim() || !token.trim() || !question.trim() || wordCount(answer) < 20} onPress={() => { void request(); }} />{!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}</Card>
    {!!feedback && <Card><Text style={t.eyebrow}>AI FEEDBACK · TEKSHIRIB FOYDALANING</Text><Text selectable accessibilityLiveRegion="polite" style={[t.body, { color: c.text }]}>{feedback}</Text><Text style={t.small}>Bitta tavsiyani tanlab, javobingizni yana ovoz chiqarib aytib ko‘ring.</Text></Card>}
  </View>;
}
