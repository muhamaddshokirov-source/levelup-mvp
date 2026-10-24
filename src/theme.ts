import { StyleSheet } from 'react-native';
import { displaySnapshot } from './displayPreferences';
const palettes = {
  dark: { background: '#0B1020', surface: '#131B2E', raised: '#192339', border: '#26314A', text: '#F3F5FC', muted: '#98A5BF', lime: '#C3F85C', limeDark: '#253A27', danger: '#FFB8AC' },
  light: { background: '#F4F7EF', surface: '#FFFFFF', raised: '#E9F0E1', border: '#CCD7C2', text: '#17251E', muted: '#52614F', lime: '#41651B', limeDark: '#E4F0D4', danger: '#AD3525' },
};
export const colors = new Proxy(palettes.dark, { get: (_, key: keyof typeof palettes.dark) => palettes[displaySnapshot().theme][key] });
// Existing components keep stable style names; palette-sensitive sheets are rebuilt
// once per theme change, without remounting screens or losing text/audio drafts.
export function themedStyles<T extends StyleSheet.NamedStyles<T>>(factory: () => T): T {
  let cached: T; let theme = '';
  return new Proxy({} as T, { get: (_, property: string) => {
    if (theme !== displaySnapshot().theme) { cached = StyleSheet.create(factory()); theme = displaySnapshot().theme; }
    return cached[property as keyof T];
  } });
}
