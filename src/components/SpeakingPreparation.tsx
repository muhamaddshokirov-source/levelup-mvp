import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './LocalizedText';
import { Button, Card, Icon, typography as t } from './UI';
import { translate } from '../domain/translations';
import { displaySnapshot } from '../displayPreferences';
import { colors as c } from '../theme';
import { speakingScenarios, SpeakingLevel } from '../domain/speaking';
import type { useVocabulary } from '../hooks/useVocabulary';
export type SpeakingNotebook = ReturnType<typeof useVocabulary>;
export function SpeakingPreparation({ topic, onTopic, level, onLevel, slow, onSlow, patient, onPatient, locked, hasTurns, help, onHelp, onUse, notebook }: {
  topic: number; onTopic: (index: number) => void; level: SpeakingLevel; onLevel: (level: SpeakingLevel) => void;
  slow: boolean; onSlow: (slow: boolean) => void; patient: boolean; onPatient: (patient: boolean) => void;
  locked: boolean; hasTurns: boolean; help: boolean; onHelp: () => void; onUse: (text: string) => void; notebook?: SpeakingNotebook;
}) {
  const [settings, setSettings] = useState(false);
  const [more, setMore] = useState(false);
  const scenario = speakingScenarios[topic]!;
  return <Card>
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}><Icon name="compass-outline" /><Text style={t.heading}>01 · Prepare your conversation</Text></View>
    <Text style={t.body}>Choose a real situation, set your pace, then speak with a clear goal.</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{speakingScenarios.slice(0, more ? undefined : 3).map((item, index) => <View key={item.label} style={{ flexGrow: 1, flexBasis: 180, minWidth: 0 }}><Button title={item.label} variant={topic === index ? 'primary' : 'secondary'} disabled={locked} onPress={() => onTopic(index)} /></View>)}</View>
    <Button title={more ? 'Fewer situations' : 'More situations'} variant="ghost" onPress={() => setMore(value => !value)} />
    {hasTurns && <Text style={t.small}>Changing the situation starts a new unsaved conversation.</Text>}
    <View style={{ gap: 8, padding: 16, borderRadius: 14, backgroundColor: c.background }}><Text style={t.eyebrow}>YOUR MISSION</Text><Text localize={false} style={[t.body, { color: c.text }]}>{scenario.goal}</Text><Text localize={false} style={t.small}>{scenario.role}</Text></View>
    <Button title={settings ? 'Hide practice settings' : 'Practice settings'} variant="ghost" icon="options-outline" onPress={() => setSettings(value => !value)} />
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}><Text localize={false} style={{ color: c.lime, fontWeight: '700' }}>{level}</Text><Text style={t.small}>{slow ? 'Relaxed voice' : 'Normal voice'}</Text><Text style={t.small}>{patient ? 'Longer thinking pause' : 'Standard thinking pause'}</Text></View>
    {settings && <View style={{ gap: 14 }}>
    <Text style={t.small}>Practice level · Self-selected, not an assessment</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{(['A1', 'A2', 'B1', 'B2'] as const).map(value => <Pressable key={value} accessibilityRole="button" accessibilityLabel={`${translate('Practice level', displaySnapshot().language)} ${value}`} aria-pressed={level === value} disabled={locked || hasTurns} onPress={() => onLevel(value)} style={{ minHeight: 44, flex: 1, padding: 12, alignItems: 'center', borderRadius: 10, backgroundColor: level === value ? c.limeDark : c.background, borderWidth: 1, borderColor: level === value ? c.lime : c.border }}><Text localize={false} style={{ color: level === value ? c.lime : c.text, fontWeight: '700' }}>{value}</Text></Pressable>)}</View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}><View style={{ flex: 1, minWidth: 160 }}><Button title={slow ? 'Voice pace: relaxed' : 'Voice pace: normal'} variant="secondary" disabled={locked} onPress={() => onSlow(!slow)} /></View><View style={{ flex: 1, minWidth: 160 }}><Button title={patient ? 'Thinking pause: longer' : 'Thinking pause: standard'} variant="secondary" disabled={locked} onPress={() => onPatient(!patient)} /></View></View>
    </View>}
    <Button title={help ? 'Hide speaking support' : 'Help me respond'} variant="secondary" icon="bulb-outline" onPress={onHelp} />
    {help && <View style={{ gap: 14, borderTopWidth: 1, borderColor: c.border, paddingTop: 16 }}>
      <Text style={t.eyebrow}>PREPARED GUIDANCE · NOT AN AI REPLY</Text><Text localize={false} style={t.body}>{scenario.hint}</Text>
      <Text localize={false} style={[t.body, { color: c.text }]}>{scenario.example}</Text><Button title="Use this example as a draft" variant="secondary" disabled={locked} onPress={() => onUse(scenario.example)} /><Text style={t.small}>Adapt the example to your own experience. Nothing is sent automatically from this button.</Text>
      {scenario.phrases.map(phrase => { const saved = notebook?.data.entries.some(entry => entry.word.toLowerCase() === phrase.word.toLowerCase()); return <View key={phrase.word} style={{ gap: 8, padding: 14, backgroundColor: c.background, borderRadius: 12 }}><Text localize={false} style={[t.body, { color: c.text, fontWeight: '700' }]}>{phrase.word}</Text><Text localize={false} style={t.small}>{phrase.example}</Text>{notebook && <Button title={saved ? 'Saved in your notebook' : 'Save phrase to notebook'} icon="bookmark-outline" variant="ghost" disabled={saved || notebook.saving || !notebook.ready} onPress={() => { void notebook.mutate({ id: `speaking-${Date.now()}-${phrase.word}`, word: phrase.word, meaning: phrase.meaning, example: phrase.example, learned: false, createdAt: new Date().toISOString() }); }} />}</View>; })}
      {!!notebook?.error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{notebook.error}</Text>}
    </View>}
  </Card>;
}
