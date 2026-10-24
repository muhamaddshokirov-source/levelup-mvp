import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LearnerProfile, parseLearner } from '../domain/learningPlan';
const KEY = '@levelup/learner/v1';
export function useLearner() {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const busy = useRef(false);
  const reload = useCallback(async () => { setError(''); try { setProfile(parseLearner(await AsyncStorage.getItem(KEY))); setReady(true); } catch { setError('Shaxsiy reja yuklanmadi. Ma’lumotlar ustiga yozilmadi. Qayta urinib ko‘ring.'); } }, []);
  useEffect(() => { void reload(); }, [reload]);
  const save = async (value: LearnerProfile) => {
    if (!ready || busy.current) return false;
    busy.current = true; setSaving(true); setError('');
    try { const valid = parseLearner(JSON.stringify(value)); await AsyncStorage.setItem(KEY, JSON.stringify(valid)); setProfile(valid); return true; }
    catch { setError('Reja saqlanmadi. Javoblaringiz shu yerda — qayta urinib ko‘ring.'); return false; }
    finally { busy.current = false; setSaving(false); }
  };
  return { profile, ready, error, saving, reload, save };
}
