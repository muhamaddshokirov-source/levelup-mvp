import React from 'react';
import { Text } from 'react-native';
import { typography as t } from './UI';
export function CoachVerification(_props: { siteKey: string; onToken: (token: string) => void }) {
  return <Text style={t.small}>AI ustozni hozir web versiyada oching. Mobil ilova uchun xavfsiz kirish alohida ulanadi.</Text>;
}
