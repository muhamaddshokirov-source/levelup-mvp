import { FeatureHero } from '../components/FeatureHero';
import React from 'react';
import { View } from 'react-native';
import { AdminPanel } from '../components/AdminPanel';
import { Button, Card, Icon, typography as t } from '../components/UI';
import { Text } from '../components/LocalizedText';
import { Community } from '../hooks/useCommunity';

/** Separate destination; no private admin data is fetched until role verification. */
export function AdminScreen({ community, onBack }: { community: Community; onBack: () => void }) {
  return <View style={{ gap: 24 }}>
    <Button variant="secondary" title="Back to profile" icon="arrow-back" onPress={onBack} />
    <FeatureHero eyebrow="ADMINISTRATION" title="Administrator panel" body="Manage ranking members and review moderation history." icon="shield-checkmark-outline" />
    {!community.ready || (community.session && !community.member && !community.error) ? <Card><Text style={t.body}>Checking administrator access…</Text></Card> : community.session && community.member?.admin ? <AdminPanel key={community.session.user.id} /> : <Card><Text accessibilityRole="alert" style={t.body}>Administrator access is required.</Text><Button title="Refresh online account" onPress={() => { void community.reloadAccount(); }} /></Card>}
  </View>;
}
