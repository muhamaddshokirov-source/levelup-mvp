import { Text } from './LocalizedText';
import React from 'react';
import { } from 'react-native';
import { Card, typography as t } from './UI';
export function VoiceRecorder(_props: { isActive?: boolean }) { return <Card><Text style={t.heading}>Ovozli mashq</Text><Text style={t.body}>Ovoz yozish hozir HTTPS orqali ochilgan web versiyada mavjud. Telefonda saytni Safari yoki Chrome’da oching. Native Expo yozuvi bu versiyada yoqilmagan.</Text></Card>; }
