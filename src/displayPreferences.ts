import { useSyncExternalStore } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DisplayPreferences, parseDisplayPreferences } from './domain/display';
const key = '@levelup/display/v1';
let state: DisplayPreferences & { ready: boolean; saving: boolean; error: string } = { language: 'uz', theme: 'dark', ready: false, saving: false, error: '' };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(fn => fn());
export const displaySnapshot = () => state;
export async function loadDisplayPreferences() {
  try {
    const raw = await AsyncStorage.getItem(key);
    const data = parseDisplayPreferences(raw);
    state = { ...data, ready: true, saving: false, error: '' };
  } catch { state = { ...state, ready: true, error: 'Display settings could not load.' }; }
  emit();
}
export async function saveDisplayPreferences(value: Partial<DisplayPreferences>) {
  if (!state.ready || state.saving) return;
  const next = parseDisplayPreferences(JSON.stringify({ language: state.language, theme: state.theme, ...value }));
  state = { ...state, saving: true, error: '' }; emit();
  try {
    await AsyncStorage.setItem(key, JSON.stringify(next));
    state = { ...next, ready: true, saving: false, error: '' };
  } catch { state = { ...state, saving: false, error: 'Could not save. Try again.' }; }
  emit();
}
export function useDisplayPreferences() {
  return useSyncExternalStore(fn => { listeners.add(fn); return () => { listeners.delete(fn); }; }, displaySnapshot, displaySnapshot);
}
