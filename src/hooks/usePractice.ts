import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { addSession, dateKey, EMPTY_DATA, PracticeData } from '../domain/practice';
import { practiceStorage } from '../storage/practiceStorage';
export function usePractice() {
  const [data, setData] = useState<PracticeData>(EMPTY_DATA);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [today, setToday] = useState(dateKey());
  const busy = useRef(false);
  const load = useCallback(async () => {
    setError(null);
    try { setData(await practiceStorage.load()); setReady(true); }
    catch { setError('Your saved progress could not be loaded. Nothing has been overwritten. Check storage access and try again.'); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const update = () => setToday(dateKey());
    const timer = setInterval(update, 15000);
    const subscription = AppState.addEventListener('change', state => { if (state === 'active') update(); });
    return () => { clearInterval(timer); subscription.remove(); };
  }, []);
  const submit = async (answer: string) => {
    if (busy.current || !ready) return false;
    busy.current = true; setSaving(true); setError(null);
    try {
      const currentDay = dateKey();
      setToday(currentDay);
      if (currentDay !== today) { setError('A new day has started. Please answer today’s new question.'); return false; }
      const next = addSession(data, today, answer);
      await practiceStorage.save(next);
      setData(next);
      return true;
    } catch { setError('Your practice could not be saved. Your answer is still here — please try again.'); return false; }
    finally { busy.current = false; setSaving(false); }
  };
  return { data, ready, error, saving, today, submit, reload: load };
}
