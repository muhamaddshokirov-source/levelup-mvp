import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultSettings, parseSettings, Settings } from '../domain/settings';
const KEY = '@levelup/settings/v1';
export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const busy = useRef(false);
  const reload = useCallback(async () => {
    setError(null);
    try { setSettings(parseSettings(await AsyncStorage.getItem(KEY))); setReady(true); }
    catch { setError('Settings could not be loaded. Your saved preferences have not been overwritten. Please try again.'); }
  }, []);
  useEffect(() => { void reload(); }, [reload]);
  const save = async (next: Settings) => {
    if (!ready || busy.current) return false;
    busy.current = true; setSaving(true); setError(null);
    try { const validated = parseSettings(JSON.stringify(next)); await AsyncStorage.setItem(KEY, JSON.stringify(validated)); setSettings(validated); return true; }
    catch { setError('We couldn’t save your settings. Your changes are still here. Please try again.'); return false; }
    finally { busy.current = false; setSaving(false); }
  };
  return { settings, ready, error, saving, save, reload };
}
