import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emptyVocabulary, parseVocabulary, upsertEntry, VocabularyEntry } from '../domain/vocabulary';
const KEY = '@levelup/vocabulary/v1';
export function useVocabulary() {
  const [data, setData] = useState(emptyVocabulary);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busy = useRef(false);
  const reload = useCallback(async () => {
    setError(null);
    try { setData(parseVocabulary(await AsyncStorage.getItem(KEY))); setReady(true); }
    catch { setError('Your notebook could not be loaded. Nothing has been overwritten. Please try again.'); }
  }, []);
  useEffect(() => { void reload(); }, [reload]);
  const mutate = async (entry: VocabularyEntry, remove = false) => {
    if (!ready || busy.current) return false;
    busy.current = true; setSaving(true); setError(null);
    try {
      const next = remove ? { ...data, entries: data.entries.filter(e => e.id !== entry.id) } : upsertEntry(data, entry);
      await AsyncStorage.setItem(KEY, JSON.stringify(next)); setData(next); return true;
    } catch (e) { setError(e instanceof Error && e.message.includes('already in your notebook') ? e.message : 'Your changes could not be saved. Please try again.'); return false; }
    finally { busy.current = false; setSaving(false); }
  };
  return { data, ready, saving, error, reload, mutate };
}
