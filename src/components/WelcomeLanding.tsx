import React, { useState } from 'react';
import { Image, Platform, Pressable, Switch, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TextInput } from './LocalizedText';
import { Button, Card, Icon, typography as t } from './UI';
import { colors as c } from '../theme';
import { lessons } from '../domain/course';
import { useBrowserVoice } from '../hooks/useBrowserVoice';
import { wordCount } from '../domain/practice';
import { useDisplayPreferences } from '../displayPreferences';
import { translate } from '../domain/translations';

/** A real starter lesson preview, not fabricated activity, reviews or AI output. */
export function WelcomeLanding({ onStart }: { onStart: () => void }) {
  const wide = useWindowDimensions().width >= 900;
  const { language } = useDisplayPreferences();
  const [preview, setPreview] = useState<'prepare' | 'speak' | 'reflect' | 'try'>('prepare');
  const [speechConsent, setSpeechConsent] = useState(false);
  const [demoText, setDemoText] = useState('');
  const voice = useBrowserVoice((preview === 'try' && speechConsent) || preview === 'speak', setDemoText, undefined, undefined, setDemoText, undefined, { autoStop: false, maxTurnMs: 30000 });
  const [faq, setFaq] = useState<number | null>(null);
  const lesson = lessons[0];
  const openTryDemo = () => { setPreview('try'); if (Platform.OS === 'web' && typeof document !== 'undefined') setTimeout(() => document.getElementById('levelup-speaking-demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100); };
  return <View style={{ gap: wide ? 54 : 34 }}>
    <View style={{ flexDirection: wide ? 'row' : 'column', gap: wide ? 44 : 28, alignItems: 'stretch' }}>
      <View style={{ flex: wide ? 1 : undefined, minWidth: 0, gap: 22, paddingVertical: wide ? 32 : 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><View style={{ width: 6, height: 6, borderRadius: 4, backgroundColor: c.lime }} /><Text style={t.eyebrow}>LEVELUP’GA XUSH KELIBSIZ</Text></View>
        <Text accessibilityRole="header" style={{ color: c.text, fontWeight: '800', fontSize: wide ? 58 : 40, lineHeight: wide ? 65 : 46, letterSpacing: -2 }}><Text>Less hesitation.</Text><Text style={{ color: c.lime }}>{'\n'}<Text>More conversation.</Text></Text></Text>
        <Text style={[t.body, { fontSize: 16, lineHeight: 27, maxWidth: 490 }]}>A clear plan, practical speaking tasks and feedback you can act on. Build an English habit that fits your day.</Text>
        <View style={{ gap: 8, maxWidth: wide ? 370 : undefined }}><Button title="O‘zimga mos reja tuzaman" icon="arrow-forward" onPress={onStart} /><Button title="Try a 30-second speaking sample" variant="ghost" icon="mic-outline" onPress={openTryDemo} /><Text style={t.small}>2-minute setup · No payment card · Start without an account</Text></View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18, borderTopWidth: 1, borderColor: c.border, paddingTop: 20 }}>
          {[['A1–B2', 'Choose your starting level'], [String(lessons.length), 'Guided starter lessons'], ['10 min', 'A realistic daily start']].map(([value, label]) => <View key={label} style={{ gap: 5, flex: 1, minWidth: 90 }}><Text localize={false} style={{ color: c.text, fontSize: 22, fontWeight: '700', letterSpacing: -0.6 }}>{value}</Text><Text style={[t.small, { fontSize: 11 }]}>{label}</Text></View>)}
        </View>
      </View>
      <View nativeID="levelup-speaking-demo" style={{ flex: wide ? 1 : undefined, minWidth: 0 }}>
        <LinearGradient colors={[c.limeDark, c.raised, c.background]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, padding: wide ? 22 : 14, borderRadius: 26, borderWidth: 1, borderColor: c.border, justifyContent: 'center' }}>
          <Card style={{ borderRadius: 18, gap: 20, boxShadow: '0px 20px 40px rgba(0,0,0,0.12)' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><Icon name="school-outline" size={18} /><Text style={t.small}>INSIDE LEVELUP</Text></View><Text style={{ color: c.lime, fontSize: 11, fontWeight: '700', padding: 8, borderRadius: 8, backgroundColor: c.limeDark }}>A1</Text></View>
            <View style={{ gap: 8 }}><Text style={t.small}>A real lesson. Try the preview.</Text><Text localize={false} style={[t.heading, { fontSize: 27, lineHeight: 33 }]}>{lesson.title}</Text></View>
            <View style={{ flexDirection: 'row', padding: 4, gap: 3, borderRadius: 10, backgroundColor: c.background }}>{(['prepare', 'speak', 'reflect', 'try'] as const).map((mode, index) => <Pressable key={mode} accessibilityRole="button" accessibilityState={{ selected: preview === mode }} aria-pressed={preview === mode} onPress={() => setPreview(mode)} style={{ flex: 1, minWidth: 0, minHeight: 44, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: preview === mode ? c.raised : 'transparent' }}><Text style={{ fontSize: 10, color: preview === mode ? c.text : c.muted, fontWeight: '600', textAlign: 'center' }}>{index + 1}. <Text>{mode === 'prepare' ? 'Prepare' : mode === 'speak' ? 'Speak' : mode === 'reflect' ? 'Reflect' : 'Try it'}</Text></Text></Pressable>)}</View>
            <View style={{ gap: 12, minHeight: 170 }}>
              {preview === 'prepare' ? <><Text style={t.small}>USEFUL PHRASES</Text>{lesson.phrases.map(phrase => <View key={phrase} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Icon name="arrow-forward" size={14} /><Text localize={false} style={[t.body, { color: c.text, flex: 1 }]}>{phrase}</Text></View>)}</> : preview === 'speak' ? <><Text style={t.small}>YOUR SPEAKING TASK</Text><Text localize={false} style={[t.body, { color: c.text }]}>{lesson.prompt}</Text><Button title="Hear the question" icon="volume-high-outline" variant="secondary" disabled={!voice.canSpeak || voice.listening} onPress={() => voice.speak(lesson.prompt)} /><Text style={t.small}>Browser voice · Sound varies by device</Text></> : preview === 'reflect' ? <><Text style={t.small}>MODEL ANSWER</Text><Text localize={false} style={t.body}>{lesson.model}</Text><Text style={[t.small, { color: c.lime }]}>An example, not the only right answer.</Text></> : <><View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><Image source={require('../../assets/speaking-studio.webp')} accessibilityLabel="Illustration of a microphone and notebook" resizeMode="cover" style={{ width: 70, height: 70, borderRadius: 12 }} /><View style={{ flex: 1, gap: 4 }}><Text style={t.eyebrow}>30-SECOND SAMPLE</Text><Text style={t.small}>Try one answer. No account needed.</Text></View></View><Text localize={false} style={[t.body, { color: c.text }]}>{lesson.prompt}</Text><View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Switch accessibilityLabel="Consent to browser speech processing" value={speechConsent} onValueChange={value => { voice.cancel(); setSpeechConsent(value); }} trackColor={{ true: '#526D38', false: c.border }} thumbColor={speechConsent ? c.lime : c.muted} /><Text style={[t.small, { flex: 1 }]}>Browser provider may process voice. Nothing is sent to LevelUp.</Text></View><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}><Button title="Hear question" variant="secondary" icon="volume-high-outline" disabled={!voice.canSpeak || voice.listening || voice.starting} onPress={() => voice.speak(lesson.prompt)} /><Button title={voice.listening || voice.starting ? 'Finish answer' : 'Speak for 30 seconds'} variant="secondary" icon="mic-outline" disabled={!speechConsent || !voice.supported} onPress={() => voice.listening || voice.starting ? voice.stop() : (setDemoText(''), voice.start())} /></View><TextInput accessibilityLabel="Try a speaking answer" multiline value={demoText} onChangeText={setDemoText} maxLength={1200} placeholder="Speak or type your answer…" placeholderTextColor={c.muted} style={{ color: c.text, minHeight: 76, maxHeight: 120, padding: 12, backgroundColor: c.background, borderRadius: 10, borderWidth: 1, borderColor: c.border, fontSize: 14 }} />{wordCount(demoText) > 0 && <View style={{ padding: 12, borderRadius: 10, backgroundColor: c.limeDark, gap: 4 }}><Text style={t.small}>QUICK REFLECTION · TEXT ONLY</Text><Text style={t.body}>{wordCount(demoText)} <Text>words</Text> · <Text>{wordCount(demoText) < 12 ? 'Try adding one more detail.' : /\b(because|since)\b/i.test(demoText) ? 'You gave a reason. Try adding one specific example.' : 'Try adding a reason with “because”.'}</Text></Text></View>}<Text style={t.small}>{voice.voiceError ? translate(voice.voiceError, language) : 'Demo stays in this browser tab until you leave. No AI score or automatic upload.'}</Text></>}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, borderTopWidth: 1, borderColor: c.border, paddingTop: 14 }}><Icon name="eye-outline" size={15} color={c.muted} /><Text style={t.small}>Preview only · Progress is not saved here</Text></View>
          </Card>
        </LinearGradient>
      </View>
    </View>
    <View style={{ gap: 22 }}><View style={{ gap: 10 }}><Text style={t.eyebrow}>BUILT AROUND YOUR PRACTICE</Text><Text style={[t.heading, { fontSize: wide ? 30 : 25, lineHeight: 34 }]}>Not another tab to open. A routine to return to.</Text></View>
      <View style={{ flexDirection: wide ? 'row' : 'column', gap: 16 }}>{[
        { icon: 'map-outline' as const, title: 'A plan that fits', body: 'Choose your goal, starting level and available time. Get a practical four-week starting path.' },
        { icon: 'mic-outline' as const, title: 'Practice with direction', body: 'Use useful phrases, speak aloud and listen back. Improve one thing at a time.' },
        { icon: 'trending-up-outline' as const, title: 'Progress you can revisit', body: 'Keep a practice journal, review your words and optionally join the shared ranking.' },
      ].map(item => <View key={item.title} style={{ flex: wide ? 1 : undefined, minWidth: 0, gap: 14, padding: 22, borderTopWidth: 2, borderTopColor: c.border, backgroundColor: c.surface, borderRadius: 14 }}><Icon name={item.icon} size={24} /><Text style={t.heading}>{item.title}</Text><Text style={t.body}>{item.body}</Text></View>)}</View>
    </View>
    <View style={{ flexDirection: wide ? 'row' : 'column', gap: 24, paddingTop: 30, borderTopWidth: 1, borderColor: c.border }}>
      <View style={{ flex: wide ? 0.8 : undefined, gap: 12 }}><Text style={t.eyebrow}>GOOD TO KNOW</Text><Text style={[t.heading, { fontSize: 27 }]}>Clear from the start.</Text><Text style={t.body}>Starter practice, not a full CEFR course. No level guarantees, no hidden promise.</Text></View>
      <View style={{ flex: wide ? 1.2 : undefined, gap: 0 }}>{[
        ['Do I need an account?', 'Core practice works without an account. Sign in only when you want to join the shared ranking.'],
        ['What is saved, and where?', 'Your plan, notebook and journal stay on this device. Audio is temporary. Ranked XP is stored in the shared database after you opt in.'],
        ['How does AI feedback work?', 'AI is optional and limited. Text is sent only with your consent. It can make mistakes and does not assess pronunciation.'],
      ].map(([question, answer], index) => <View key={question} style={{ borderBottomWidth: 1, borderColor: c.border, paddingVertical: 16, gap: 12 }}><Pressable accessibilityRole="button" accessibilityState={{ expanded: faq === index }} aria-expanded={faq === index} onPress={() => setFaq(value => value === index ? null : index)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 28 }}><Text style={[t.body, { color: c.text, fontWeight: '600', flex: 1 }]}>{question}</Text><Icon name={faq === index ? 'remove' : 'add'} size={18} color={c.muted} /></Pressable>{faq === index && <Text style={t.body}>{answer}</Text>}</View>)}</View>
    </View>
  </View>;
}
