import { useCallback, useEffect, useRef, useState } from 'react';
// Recognition is vendor-provided, not a recording/transcription service owned by LevelUp.
type Recognition = { lang: string; continuous: boolean; interimResults: boolean; onstart: (() => void) | null; onresult: ((event: any) => void) | null; onerror: ((event: any) => void) | null; onend: (() => void) | null; start: () => void; stop: () => void; abort: () => void };
export function useBrowserVoice(active: boolean, onText: (text: string) => void, onEnd?: () => void, onError?: () => void, onPreview?: (text: string) => void, onReady?: () => void, options?: { rate?: number; pauseMs?: number }) {
  const api = typeof window === 'undefined' ? undefined : window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  const Constructor = api?.SpeechRecognition || api?.webkitSpeechRecognition;
  const recognition = useRef<Recognition | null>(null);
  const callbacks = useRef({ onText, onEnd, onError, onPreview, onReady });
  callbacks.current = { onText, onEnd, onError, onPreview, onReady };
  const [listening, setListening] = useState(false);
  const [starting, setStarting] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const finish = useRef<(() => void) | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const clearTimers = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  const stopSpeaking = useCallback(() => { if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel(); }, []);
  const cancel = useCallback(() => {
    clearTimers(); finish.current = null;
    const instance = recognition.current; recognition.current = null;
    if (instance) { instance.onstart = null; instance.onresult = null; instance.onend = null; instance.onerror = null; try { instance.abort(); } catch {} }
    setListening(false); setStarting(false);
  }, [clearTimers]);
  useEffect(() => { if (!active) { cancel(); stopSpeaking(); } return () => { cancel(); stopSpeaking(); }; }, [active, cancel, stopSpeaking]);
  const start = () => {
    if (!Constructor || !active) return;
    cancel(); stopSpeaking(); setVoiceError(''); setStarting(true);
    const instance = new Constructor(); recognition.current = instance;
    let transcript = '', done = false, started = false;
    let silence: ReturnType<typeof setTimeout> | undefined;
    const results = new Map<number, string>();
    const fail = (code: string) => {
      if (done || recognition.current !== instance) return;
      // Keep any partial text visible, but never auto-send it after a service error.
      done = true;
      const message = code === 'not-allowed' || code === 'service-not-allowed' ? 'Microphone access was denied. Allow microphone access in browser settings, then try again.'
        : code === 'audio-capture' ? 'No microphone was found. Check your microphone connection and browser settings.'
        : code === 'network' ? 'The browser speech service could not connect. Check your internet connection or type your reply.'
        : code === 'start-timeout' ? 'Speech recognition did not start. Check microphone permission or use a supported browser.'
        : code === 'no-speech' ? 'No speech detected. Start again when you are ready.'
        : 'Voice input failed. Check microphone permission or type your reply.';
      setVoiceError(message); cancel(); callbacks.current.onError?.();
    };
    const complete = () => {
      if (done || recognition.current !== instance) return;
      done = true; const text = transcript.trim().slice(0, 1200);
      cancel();
      // Final results are sometimes absent on mobile: retain the latest interim snapshot.
      if (!text) { setVoiceError('No speech detected. Start again when you are ready.'); callbacks.current.onError?.(); return; }
      callbacks.current.onText(text);
      callbacks.current.onEnd?.();
    };
    const finishTurn = () => {
      if (done || recognition.current !== instance) return;
      try { instance.stop(); } catch { complete(); return; }
      // Some engines never dispatch onend after stop. Still commit the captured text once.
      if (!done) timers.current.push(setTimeout(complete, 1200));
    };
    finish.current = finishTurn;
    instance.lang = 'en-US'; instance.continuous = true; instance.interimResults = true;
    instance.onstart = () => {
      if (recognition.current !== instance || done) return;
      started = true; setStarting(false); setListening(true); callbacks.current.onReady?.();
    };
    instance.onresult = event => {
      if (done || recognition.current !== instance) return;
      if (!started) instance.onstart?.();
      // Each event is a cumulative result list, not a fresh string to append.
      const length = event.results?.length || 0;
      for (let i = event.resultIndex || 0; i < length; i++) results.set(i, String(event.results[i]?.[0]?.transcript || '').trim());
      for (const index of results.keys()) if (index >= length) results.delete(index);
      transcript = [...results.entries()].sort(([a], [b]) => a - b).map(([, text]) => text).filter(Boolean).join(' ').slice(0, 1200);
      callbacks.current.onPreview?.(transcript);
      if (silence) clearTimeout(silence);
      if (transcript) {
        // A short natural pause ends a turn even if continuous recognition stays open.
        silence = setTimeout(finishTurn, Math.max(1500, Math.min(5000, options?.pauseMs ?? 2200))); timers.current.push(silence);
      }
    };
    instance.onerror = event => { if (event.error === 'no-speech' && transcript.trim()) complete(); else fail(String(event.error || 'unknown')); };
    instance.onend = complete;
    timers.current.push(setTimeout(() => { if (!done && recognition.current === instance) { if (transcript) finishTurn(); else fail('no-speech'); } }, 30000));
    // Avoid showing "listening" indefinitely if the engine never actually starts.
    timers.current.push(setTimeout(() => { if (!done && recognition.current === instance && !started) fail('start-timeout'); }, 8000));
    try { instance.start(); } catch { fail('unknown'); }
  };
  const speak = (text: string, onDone?: () => void, onFailure?: () => void) => {
    if (!active || !canSpeak) { onFailure?.(); return; }
    cancel(); stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-US'; utterance.rate = Math.max(0.6, Math.min(1.2, options?.rate ?? 0.9));
    utterance.onend = () => onDone?.(); utterance.onerror = () => onFailure?.();
    try { window.speechSynthesis.speak(utterance); } catch { onFailure?.(); }
  };
  return { supported: !!Constructor, canSpeak, listening, starting, voiceError, start, cancel, stop: () => finish.current?.(), speak, stopSpeaking };
}
