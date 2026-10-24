import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from './LocalizedText';
import { Button, Card, typography as t } from './UI';
import { Community } from '../hooks/useCommunity';
import { AdminPanel } from './AdminPanel';
import { colors as c } from '../theme';
export function CommunityAccount({ community: q, name }: { community: Community; name: string }) {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState(name); const [consent, setConsent] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  useEffect(() => { setConsent(false); setAdminOpen(false); setPassword(''); }, [q.session?.user.id]);
  useEffect(() => { if (q.member?.name) setNickname(q.member.name); }, [q.member?.name]);
  const input = { color: c.text, backgroundColor: c.background, borderRadius: 12, borderWidth: 1, borderColor: c.border, padding: 14, fontSize: 16 };
  return <View style={{ gap: 20 }}><Card><Text style={t.heading}>Online account & ranking</Text>
    {!q.configured ? <Text style={t.body}>Shared database is not connected yet. The owner must complete the database setup. Local practice still works; no demo rankings are shown.</Text> : !q.ready ? <Text style={t.body}>Loading online account…</Text> : !q.session ? <>
      <Text style={t.body}>Sign in to use the same ranked account on different devices. Email stays private. Public ranking is optional.</Text>
      <TextInput accessibilityLabel="Email" placeholder="Email" autoCapitalize="none" keyboardType="email-address" autoComplete="email" value={email} onChangeText={setEmail} maxLength={254} editable={!q.busy} style={input} />
      <TextInput accessibilityLabel="Password" placeholder="Password" secureTextEntry autoCapitalize="none" autoComplete={signup ? 'new-password' : 'current-password'} value={password} onChangeText={setPassword} maxLength={128} editable={!q.busy} style={input} />
      <Text style={t.small}>Use at least 10 characters. Never share your password or confirmation email.</Text>
      <Button title={q.busy ? 'Please wait…' : signup ? 'Create online account' : 'Sign in'} disabled={q.busy || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || password.length < (signup ? 10 : 1)} onPress={() => { void q.authenticate(email, password, signup).then(ok => { if (ok) setPassword(''); }); }} />
      <Button title={signup ? 'I already have an account' : 'Create an account instead'} disabled={q.busy} onPress={() => { setSignup(value => !value); setPassword(''); }} />
    </> : <>
      <Text style={t.small}>Account ID</Text><Text localize={false} selectable style={t.small}>{q.session.user.id}</Text>
      <Text style={t.body}>Your nickname and ranked XP are visible to signed-in members only after you join. Do not use private information as your nickname.</Text>
      <TextInput accessibilityLabel="Public nickname" placeholder="Public nickname" value={nickname} onChangeText={setNickname} maxLength={30} editable={!q.busy} style={input} />
      <Button title={consent ? 'Public ranking consent: yes' : 'I agree to show my nickname and ranked XP'} onPress={() => setConsent(value => !value)} disabled={q.busy} />
      <Button title={q.member?.joined ? 'Update ranking nickname' : 'Join the ranking'} disabled={q.busy || !consent || nickname.trim().length < 2} onPress={() => { void q.join(nickname); }} />
      {q.member?.banned && <Text style={{ color: c.danger }}>This account is blocked from earning ranked XP.</Text>}
      {q.member?.hidden && <Text style={t.body}>Your ranking profile is hidden by a moderator.</Text>}
      {q.member?.joined && <Button title="Leave public ranking" disabled={q.busy} onPress={() => { void q.leave(); }} />}
      <Button title="Refresh online account" disabled={q.busy} onPress={() => { void q.reloadAccount(); }} />
      <Button title="Sign out on this device" disabled={q.busy} onPress={() => { setAdminOpen(false); void q.logout().then(ok => { if (ok) { setEmail(''); setPassword(''); setNickname(name); } }); }} />
      <Text style={t.small}>Signing out does not hide your ranking. Leave the ranking first if you want it hidden. Local XP and notebook are not deleted.</Text>
      {q.member?.admin && <Button title={adminOpen ? 'Close admin panel' : 'Open admin panel'} onPress={() => setAdminOpen(value => !value)} />}
    </>}
    {!!q.error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{q.error}</Text>}
    {!!q.notice && <Text accessibilityLiveRegion="polite" style={t.body}>{q.notice}</Text>}
    <Text style={t.small}>Online sessions are stored on this device. Local storage is not encrypted. Sign out on shared devices. No audio is sent for rankings.</Text>
  </Card>{adminOpen && q.session && q.member?.admin && <AdminPanel key={q.session.user.id} />}</View>;
}
