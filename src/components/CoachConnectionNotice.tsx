import React from 'react';
import { View } from 'react-native';
import { Button, typography as t } from './UI';
import { Text } from './LocalizedText';
import { colors as c } from '../theme';
import type { CoachHealthState } from '../hooks/useCoachHealth';

export function CoachConnectionNotice({ state, onRetry }: { state: CoachHealthState; onRetry: () => void }) {
  if (state === 'idle' || state === 'ready') return null;
  return <View style={{ gap: 8, padding: 12, borderRadius: 12, backgroundColor: c.background }}>
    <Text accessibilityLiveRegion="polite" style={[t.small, { color: state === 'outdated' ? c.danger : c.text }]}>
      {state === 'checking' && 'Starting the free AI service. You can prepare your reply while it wakes up…'}
      {state === 'unavailable' && 'Could not reach the AI service. Your text is still here; try the connection again.'}
      {state === 'outdated' && 'The AI service needs an update before this feature can reply. Please try again later.'}
    </Text>
    {state === 'unavailable' && <Button title="Retry connection" variant="secondary" onPress={onRetry} />}
  </View>;
}
