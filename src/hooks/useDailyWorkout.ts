import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EMPTY_WORKOUT, parseWorkout, saveWorkoutDay, WorkoutHistory, WorkoutProgress } from '../domain/dailyWorkout';
const KEY = '@levelup/workout/v1';
export function useDailyWorkout(day: string) {
  const [history, setHistory] = useState<WorkoutHistory>({ version: 1, days: {} });
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);
  const reload = useCallback(async () => { setError(''); try { setHistory(parseWorkout(await AsyncStorage.getItem(KEY))); setReady(true); } catch { setError('Workout progress could not be loaded. Existing data was not overwritten.'); } }, []);
  useEffect(() => { void reload(); }, [reload]);
  const save = async (value: WorkoutProgress) => {
    if (!ready || busy.current) return false;
    busy.current = true; setSaving(true); setError('');
    try { const next = saveWorkoutDay(history, day, value); await AsyncStorage.setItem(KEY, JSON.stringify(next)); setHistory(next); return true; }
    catch { setError('Workout progress could not be saved. Please try again.'); return false; }
    finally { busy.current = false; setSaving(false); }
  };
  return { value: history.days[day] || EMPTY_WORKOUT, ready, saving, error, reload, save };
}
