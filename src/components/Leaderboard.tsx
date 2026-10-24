import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './LocalizedText';
import { Button, Card, Icon, typography as t } from './UI';
import { Board, BoardRow, Community, fetchBoard } from '../hooks/useCommunity';
import { colors as c } from '../theme';
function RankRow({ row, mine }: { row: BoardRow; mine: boolean }) {
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12, backgroundColor: mine ? c.limeDark : c.background }}>
    <Text style={{ color: c.lime, width: 32, fontWeight: '800' }}>{row.position}.</Text>
    <Text localize={false} style={{ color: c.text, flex: 1, flexShrink: 1 }} numberOfLines={2}>{row.display_name}</Text>
    <Text style={{ color: c.text, fontWeight: '700' }}>{row.xp} XP</Text>
  </View>;
}
export function Leaderboard({ community: q, onAccount, todayAnswer }: { community: Community; onAccount: () => void; todayAnswer?: string }) {
  const [period, setPeriod] = useState<'week' | 'all'>('week');
  const [board, setBoard] = useState<Board | null>(null); const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); const [refresh, setRefresh] = useState(0);
  const user = q.session?.user.id;
  useEffect(() => {
    let active = true; setBoard(null); setError('');
    if (!q.configured || !user) return;
    setLoading(true);
    void fetchBoard(period).then(data => { if (active) setBoard(data); }).catch(() => { if (active) setError('Ranking could not load. Try again.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [period, refresh, user, q.configured, q.member?.joined, q.member?.hidden, q.notice]);
  return <Card><View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Icon name="trophy-outline" /><Text style={t.heading}>Community ranking</Text></View>
    <Text style={t.body}>Real shared scores, not example players. Weekly rankings reset on Monday, Asia/Tashkent time. Ties use account joining order.</Text>
    {!q.configured ? <Text style={t.body}>Shared database is not connected yet. The owner must complete the database setup. Local practice still works; no demo rankings are shown.</Text> : !user ? <><Text style={t.body}>Sign in to view the ranking and join with a public nickname.</Text><Button title="Open online account" onPress={onAccount} /></> : <>
      <View style={{ flexDirection: 'row', gap: 8 }}>{(['week', 'all'] as const).map(value => <Pressable key={value} accessibilityRole="button" aria-pressed={period === value} onPress={() => setPeriod(value)} style={{ flex: 1, padding: 12, minHeight: 44, alignItems: 'center', borderRadius: 12, backgroundColor: period === value ? c.limeDark : c.background }}><Text style={{ color: c.text }}>{value === 'week' ? 'This week' : 'All time'}</Text></Pressable>)}</View>
      {loading && <Text style={t.body}>Loading ranking…</Text>}
      {!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}
      {board && <><Text style={t.small}>Top 50 · Most ranked XP first</Text>{board.rows.length ? board.rows.map(row => <RankRow key={row.user_id} row={row} mine={row.user_id === user} />) : <Text style={t.body}>No ranked players yet. Be the first to join.</Text>}
        <Text style={t.heading}>Your position</Text>{board.me ? <RankRow row={board.me} mine /> : <Text style={t.body}>You are not listed. Join the ranking or check your profile status.</Text>}</>}
      <Button title="Refresh ranking" disabled={loading} onPress={() => setRefresh(value => value + 1)} />
      {!q.member?.joined && <Button title="Join from my profile" onPress={onAccount} />}
      {q.member?.joined && !q.member.banned && todayAnswer && <Button title="Sync today’s practice to ranking" disabled={q.busy || q.syncing} onPress={() => { void q.award('daily', todayAnswer).then(() => setRefresh(value => value + 1)); }} />}
    </>}
    {!!q.error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{q.error}</Text>}
    {!!q.notice && <Text style={t.body}>{q.notice}</Text>}
    <Text style={t.small}>Ranked XP starts after joining: daily practice +50 once per day; each starter lesson +20 once. Old local totals are not imported. Ranked and local XP may differ.</Text>
    <Text style={t.small}>Text is sent to validate the word count but is not saved in ranking tables. These are practice points, not an exam score. Voice calls are not available yet.</Text>
  </Card>;
}
