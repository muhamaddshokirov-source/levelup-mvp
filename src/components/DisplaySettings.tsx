import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './LocalizedText';
import { Card, Icon, typography as t } from './UI';
import { useDisplayPreferences, saveDisplayPreferences, loadDisplayPreferences } from '../displayPreferences';
import { colors as c } from '../theme';
export function DisplaySettings() {
  const settings = useDisplayPreferences();
  return <Card><View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Icon name="color-palette-outline" /><Text style={t.heading}>Appearance & language</Text></View>
    <Text style={t.body}>Theme</Text><View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>{(['light', 'dark'] as const).map(theme => <Pressable key={theme} accessibilityRole="radio" accessibilityState={{ checked: settings.theme === theme, disabled: settings.saving || !settings.ready }} disabled={settings.saving || !settings.ready} onPress={() => { void saveDisplayPreferences({ theme }); }} style={{ minHeight: 44, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: settings.theme === theme ? c.lime : c.border, backgroundColor: settings.theme === theme ? c.limeDark : c.background }}><Text style={{ color: c.text }}>{theme === 'light' ? 'Light' : 'Dark'}</Text></Pressable>)}</View>
    <Text style={t.body}>Language</Text><View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>{([['uz', 'O‘zbekcha'], ['ru', 'Русский'], ['en', 'English']] as const).map(([language, title]) => <Pressable key={language} accessibilityRole="radio" accessibilityState={{ checked: settings.language === language, disabled: settings.saving || !settings.ready }} disabled={settings.saving || !settings.ready} onPress={() => { void saveDisplayPreferences({ language }); }} style={{ minHeight: 44, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: settings.language === language ? c.lime : c.border, backgroundColor: settings.language === language ? c.limeDark : c.background }}><Text localize={false} style={{ color: c.text }}>{title}</Text></Pressable>)}</View>
    {!!settings.error && <><Text accessibilityRole="alert" style={{ color: c.danger }}>{settings.error}</Text><Pressable accessibilityRole="button" onPress={() => { void loadDisplayPreferences(); }} style={{ padding: 12 }}><Text style={t.body}>Try again</Text></Pressable></>}
    <Text style={t.small}>Saved on this device</Text><Text style={t.small}>Exercises stay in English. AI replies keep their original language.</Text>
  </Card>;
}
