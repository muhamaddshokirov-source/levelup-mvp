import { FeatureHero } from './FeatureHero';
import { initials } from '../domain/settings';
import { displaySnapshot } from '../displayPreferences';
import { translate } from '../domain/translations';
import React, { useEffect, useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { Text, TextInput } from './LocalizedText';
import { Button, Card, Icon, typography as t } from './UI';
import { Community } from '../hooks/useCommunity';
import { colors as c } from '../theme';
export function CommunityAccount({ community: q, name, onAdmin }: { community: Community; name: string; onAdmin: () => void }) {
  const compact = useWindowDimensions().width < 900;
  const [focus, setFocus] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState(name); const [consent, setConsent] = useState(false);
  useEffect(() => { setConsent(false); setPassword(''); setShowPassword(false); }, [q.session?.user.id]);
  useEffect(() => { if (q.member?.name) setNickname(q.member.name); }, [q.member?.name]);
  const input = { color: c.text, backgroundColor: c.background, borderRadius: 12, borderWidth: 1, borderColor: c.border, padding: 14, fontSize: 16 };
  return <View style={{ gap: 20 }}><View style={{ flexDirection: compact || q.session ? 'column' : 'row', gap: 20, alignItems: 'stretch' }}>
    {!q.session && <View style={{ flex: compact ? undefined : 0.9, minWidth: 0 }}><FeatureHero stacked eyebrow="YOUR NEXT CHAPTER" title={signup ? 'A new habit starts with you.' : 'Good to have you back.'} body="One account. Your practice, your place in the ranking. Keep showing up for yourself." icon="planet-outline" /></View>}
    <Card style={{ flex: compact || q.session ? undefined : 1.1 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}><View style={{ width: 46, height: 46, borderRadius: 16, backgroundColor: c.limeDark, alignItems: 'center', justifyContent: 'center' }}><Icon name={q.session ? 'person-outline' : 'key-outline'} size={23} /></View><View style={{ flex: 1, gap: 4 }}><Text style={t.eyebrow}>{q.session ? 'Signed in' : signup ? 'Create online account' : 'Sign in'}</Text><Text style={t.heading}>Online account & ranking</Text></View></View>
    {!q.configured ? <Text style={t.body}>Shared database is not connected yet. The owner must complete the database setup. Local practice still works; no demo rankings are shown.</Text> : !q.ready ? <Text style={t.body}>Loading online account…</Text> : !q.session ? <>
      <Text style={t.body}>Sign in to use the same ranked account on different devices. Email stays private. Public ranking is optional.</Text>
      <View style={{ gap: 8 }}><Text style={t.small}>Email</Text><View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, backgroundColor: c.background, borderRadius: 16, borderWidth: 1, borderColor: focus === 'email' ? c.lime : c.border }}><Icon name="mail-outline" color={c.muted} size={19} /><TextInput accessibilityLabel="Email" placeholder="Email" autoCapitalize="none" keyboardType="email-address" autoComplete="email" value={email} onChangeText={setEmail} maxLength={254} editable={!q.busy} onFocus={() => setFocus('email')} onBlur={() => setFocus('')} style={{ flex: 1, minWidth: 0, paddingVertical: 16, color: c.text, fontSize: 16 }} /></View></View>
      <View style={{ gap: 8 }}><Text style={t.small}>Password</Text><View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingLeft: 14, backgroundColor: c.background, borderRadius: 16, borderWidth: 1, borderColor: focus === 'password' ? c.lime : c.border }}><Icon name="lock-closed-outline" color={c.muted} size={19} /><TextInput accessibilityLabel="Password" placeholder="Password" secureTextEntry={!showPassword} autoCapitalize="none" autoComplete={signup ? 'new-password' : 'current-password'} value={password} onChangeText={setPassword} maxLength={128} editable={!q.busy} onFocus={() => setFocus('password')} onBlur={() => setFocus('')} style={{ flex: 1, minWidth: 0, paddingVertical: 16, color: c.text, fontSize: 16 }} /><Pressable accessibilityRole="button" accessibilityLabel={translate(showPassword ? 'Hide password' : 'Show password', displaySnapshot().language)} onPress={() => setShowPassword(value => !value)} style={{ width: 44, minHeight: 48, alignItems: 'center', justifyContent: 'center' }}><Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} color={c.muted} size={19} /></Pressable></View></View>
      <Text style={t.small}>Use at least 10 characters. Never share your password or confirmation email.</Text>
      <Button icon="arrow-forward" title={q.busy ? 'Please wait…' : signup ? 'Create online account' : 'Sign in'} disabled={q.busy || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || password.length < (signup ? 10 : 1)} onPress={() => { void q.authenticate(email, password, signup).then(ok => { if (ok) setPassword(''); }); }} />
      <Button variant="secondary" title={signup ? 'I already have an account' : 'Create an account instead'} disabled={q.busy} onPress={() => { setSignup(value => !value); setPassword(''); }} />
    </> : <>
      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center', padding: 16, borderRadius: 18, backgroundColor: c.background }}><View style={{ width: 48, height: 48, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: c.limeDark }}><Text localize={false} style={{ color: c.lime, fontSize: 20, fontWeight: '800' }}>{initials(q.member?.name || name)}</Text></View><View style={{ flex: 1, gap: 4 }}><Text localize={false} style={t.heading}>{q.member?.name || name || 'LevelUp'}</Text><Text style={t.small}>Your personal space</Text></View><Icon name="checkmark-circle" /></View>
      <Text style={t.small}>Account ID</Text><Text localize={false} selectable style={t.small}>{q.session.user.id}</Text>
      <Text style={t.body}>Your nickname and ranked XP are visible to signed-in members only after you join. Do not use private information as your nickname.</Text>
      <TextInput accessibilityLabel="Public nickname" placeholder="Public nickname" value={nickname} onChangeText={setNickname} maxLength={30} editable={!q.busy} style={input} />
      <Button title={consent ? 'Public ranking consent: yes' : 'I agree to show my nickname and ranked XP'} onPress={() => setConsent(value => !value)} disabled={q.busy} />
      <Button title={q.member?.joined ? 'Update ranking nickname' : 'Join the ranking'} disabled={q.busy || !consent || nickname.trim().length < 2} onPress={() => { void q.join(nickname); }} />
      {q.member?.banned && <Text style={{ color: c.danger }}>This account is blocked from earning ranked XP.</Text>}
      {q.member?.hidden && <Text style={t.body}>Your ranking profile is hidden by a moderator.</Text>}
      {q.member?.joined && <Button variant="secondary" title="Leave public ranking" disabled={q.busy} onPress={() => { void q.leave(); }} />}
      <Button variant="secondary" title="Refresh online account" disabled={q.busy} onPress={() => { void q.reloadAccount(); }} />
      <Button variant="ghost" title="Sign out on this device" disabled={q.busy} onPress={() => { void q.logout().then(ok => { if (ok) { setEmail(''); setPassword(''); setNickname(name); } }); }} />
      <Text style={t.small}>Signing out does not hide your ranking. Leave the ranking first if you want it hidden. Local XP and notebook are not deleted.</Text>
      {q.member?.admin && <Button title="Open admin panel" onPress={onAdmin} />}
    </>}
    {!!q.error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{q.error}</Text>}
    {!!q.notice && <Text accessibilityLiveRegion="polite" style={t.body}>{q.notice}</Text>}
    <Text style={t.small}>Online sessions are stored on this device. Local storage is not encrypted. Sign out on shared devices. No audio is sent for rankings.</Text>
  </Card></View></View>;
}
