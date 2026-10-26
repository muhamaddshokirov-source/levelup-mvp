import React from 'react';
import { View } from 'react-native';
import { Text } from './LocalizedText';
import { Button, Card, Icon, typography as t } from './UI';
import { colors as c } from '../theme';
import { conversationStats, SpeakingMessage } from '../domain/speaking';
export function SpeakingReview({ messages, onReview, onRetry, disabled }: { messages: SpeakingMessage[]; onReview: () => void; onRetry: () => void; disabled: boolean }) {
  const stats = conversationStats(messages);
  if (!stats.turns) return null;
  return <Card><View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Icon name="trending-up-outline" /><Text style={t.heading}>03 · Reflect and improve</Text></View>
    <View style={{ flexDirection: 'row', gap: 8 }}>{[{ value: stats.turns, label: 'Replies completed' }, { value: stats.words, label: 'Words practised' }, { value: stats.averageWords, label: 'Words per reply' }].map(item => <View key={item.label} style={{ flex: 1, minWidth: 0, gap: 6, padding: 12, borderRadius: 12, backgroundColor: c.background }}><Text style={{ color: c.lime, fontSize: 25, fontWeight: '700' }}>{item.value}</Text><Text style={t.small}>{item.label}</Text></View>)}</View>
    <Text style={t.body}>Did you give a reason, use a concrete example and ask a question? Choose one thing to do better in a second attempt.</Text>
    <Text style={t.small}>These are counts from your submitted text, not pronunciation, fluency or CEFR scores. Dictation mistakes can affect the text.</Text>
    <Button title="Get AI feedback on my conversation" icon="sparkles-outline" disabled={disabled || stats.words < 20} onPress={onReview} /><Text style={t.small}>At least 20 words. Opens the text review for your approval; nothing is sent until you confirm there.</Text>
    <Button title="Try this situation again" variant="secondary" icon="refresh-outline" disabled={disabled} onPress={onRetry} />
  </Card>;
}
