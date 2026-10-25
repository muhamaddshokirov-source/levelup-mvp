import React from 'react';
import { View } from 'react-native';
import { AdminPanel } from '../components/AdminPanel';
import { Button, Card, Icon, typography as t } from '../components/UI';
import { Text } from '../components/LocalizedText';
import { Community } from '../hooks/useCommunity';

/** Separate destination; no private admin data is fetched until role verification. */
export function AdminScreen({ community, onBack }: { community: Community; onBack: () => void }) {
  return <View style={{ gap: 24 }}>
    <Button title="Back to profile" icon="arrow-back" onPress={onBack} />
    <View style={{ gap: 10 }}><Icon name="shield-checkmark-outline" size={30} /><Text style={t.eyebrow}>ADMINISTRATION</Text><Text style={t.title}>Administrator panel</Text><Text style={t.body}>Manage ranking members and review moderation history.</Text></View>
    {!community.ready || (community.session && !community.member && !community.error) ? <Card><Text style={t.body}>Checking administrator access…</Text></Card> : community.session && community.member?.admin ? <AdminPanel key={community.session.user.id} /> : <Card><Text accessibilityRole="alert" style={t.body}>Administrator access is required.</Text><Button title="Refresh online account" onPress={() => { void community.reloadAccount(); }} /></Card>}
  </View>;
}
