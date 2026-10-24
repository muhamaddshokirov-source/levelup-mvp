import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from './LocalizedText';
import { Button, Card, typography as t } from './UI';
import { AdminData, AdminUser, fetchAdmin, moderateUser } from '../hooks/useCommunity';
import { colors as c } from '../theme';
export function AdminPanel() {
  const [page, setPage] = useState(0); const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState<AdminData | null>(null); const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); const [saving, setSaving] = useState(false);
  const [target, setTarget] = useState<AdminUser | null>(null); const [reason, setReason] = useState('');
  useEffect(() => {
    let active = true; setLoading(true); setData(null); setTarget(null); setError('');
    void fetchAdmin(page).then(value => { if (active) setData(value); }).catch(() => { if (active) setError('Administrator request failed. Check your access and try again.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, refresh]);
  return <Card><Text style={t.heading}>Administrator panel</Text><Text style={t.body}>Database permissions enforce access. This panel cannot grant administrators, edit XP or read practice answers. Every moderation change is audited.</Text>
    {loading && <Text style={t.body}>Loading members…</Text>}{!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}
    <Button title="Refresh members" disabled={loading || saving} onPress={() => setRefresh(value => value + 1)} />
    {data && <><Text style={t.small}>Members: {data.total} · Page {page + 1}</Text>{data.users.map(user => <View key={user.user_id} style={{ padding: 14, borderRadius: 12, gap: 10, backgroundColor: c.background }}>
      <Text localize={false} style={t.heading}>{user.display_name}</Text><Text localize={false} selectable style={t.small}>{user.user_id}</Text><Text style={t.body}>{user.xp} XP · {user.banned ? 'Blocked' : 'Active'} · {user.hidden ? 'Hidden' : 'Visible'}</Text>
      <Button title="Moderate member" disabled={saving} onPress={() => { setTarget({ ...user }); setReason(''); }} />
    </View>)}
    <View style={{ gap: 10 }}><Button title="Previous page" disabled={page === 0 || saving || loading} onPress={() => setPage(value => value - 1)} /><Button title="Next page" disabled={(page + 1) * 25 >= data.total || saving || loading} onPress={() => setPage(value => value + 1)} /></View>
    <Text style={t.heading}>Latest 20 moderation actions</Text>{data.audit.length ? data.audit.map(item => <View key={item.id} style={{ gap: 6, paddingVertical: 10, borderTopWidth: 1, borderColor: c.border }}><Text localize={false} selectable style={t.small}>{item.created_at} · {item.actor} → {item.target}</Text><Text localize={false} style={t.body}>{item.action}</Text><Text localize={false} style={t.body}>{item.reason}</Text></View>) : <Text style={t.body}>No moderation actions yet.</Text>}</>}
    {target && <Card><Text style={t.heading}>Confirm moderation</Text><Text localize={false} style={t.body}>{target.display_name}</Text>
      <Button title={target.hidden ? 'Hidden: yes' : 'Hidden: no'} disabled={saving} onPress={() => setTarget(value => value && ({ ...value, hidden: !value.hidden }))} />
      <Button title={target.banned ? 'Blocked: yes' : 'Blocked: no'} disabled={saving} onPress={() => setTarget(value => value && ({ ...value, banned: !value.banned }))} />
      <Text style={t.small}>Hidden removes a member from rankings. Blocked also prevents new ranked XP. Local practice is not deleted.</Text>
      <TextInput accessibilityLabel="Moderation reason" placeholder="Moderation reason" multiline maxLength={500} value={reason} onChangeText={setReason} editable={!saving} style={{ color: c.text, backgroundColor: c.background, padding: 14, borderRadius: 12, fontSize: 16 }} />
      <Button title={saving ? 'Please wait…' : 'Confirm and save audit entry'} disabled={saving || reason.trim().length < 3} onPress={() => {
        if (saving) return; setSaving(true); setError('');
        void moderateUser(target.user_id, target.hidden, target.banned, reason).then(() => { setTarget(null); setRefresh(value => value + 1); }).catch(() => setError('Moderation failed. Check your access and try again.')).finally(() => setSaving(false));
      }} /><Button title="Cancel" disabled={saving} onPress={() => setTarget(null)} />
    </Card>}
  </Card>;
}
