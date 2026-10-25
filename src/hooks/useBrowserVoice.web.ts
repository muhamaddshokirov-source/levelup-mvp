import { useCallback, useEffect, useRef, useState } from 'react';
// Browser speech recognition may use the browser vendor's network service.
type Recognition = { lang: string; continuous: boolean; interimResults: boolean; onresult: ((event: any) => void) | null; onerror: ((event: any) => void) | null; onend: (() => void) | null; start: () => void; stop: () => void; abort: () => void };
export function useBrowserVoice(active: boolean, onText: (text: string) => void, onEnd?: () => void, onError?: () => void) {
  const api = typeof window === 'undefined' ? undefined : window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  const Constructor = api?.SpeechRecognition || api?.webkitSpeechRecognition;
  const recognition = useRef<Recognition | null>(null);
  const callback = useRef(onText); callback.current = onText;
  const endCallback = useRef(onEnd); endCallback.current = onEnd;
  const errorCallback = useRef(onError); errorCallback.current = onError;
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const stopSpeaking = useCallback(() => { if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel(); }, []);
  const stop = useCallback(() => { if (recognition.current) { recognition.current.onresult = null; recognition.current.onend = null; recognition.current.onerror = null; recognition.current.abort(); recognition.current = null; } setListening(false); }, []);
  useEffect(() => { if (!active) { stop(); stopSpeaking(); } return () => { stop(); stopSpeaking(); }; }, [active, stop, stopSpeaking]);
  const start = () => {
    if (!Constructor || !active) return;
    stop(); stopSpeaking(); setVoiceError('');
    const instance = new Constructor(); recognition.current = instance;
    instance.lang = 'en-US'; instance.continuous = false; instance.interimResults = false;
    instance.onresult = event => { const text = String(event.results?.[0]?.[0]?.transcript || '').trim(); if (text) callback.current(text.slice(0, 1200)); };
    instance.onerror = () => { setVoiceError('Voice input failed. Check microphone permission or type your reply.'); setListening(false); errorCallback.current?.(); };
    instance.onend = () => { setListening(false); endCallback.current?.(); };
    try { instance.start(); setListening(true); } catch { setVoiceError('Voice input failed. Check microphone permission or type your reply.'); setListening(false); errorCallback.current?.(); }
  };
  const speak = (text: string, onDone?: () => void, onFailure?: () => void) => {
    if (!active || !canSpeak) { onFailure?.(); return; }
    stop(); stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-US'; utterance.rate = 0.9;
    utterance.onend = () => onDone?.(); utterance.onerror = () => onFailure?.();
    try { window.speechSynthesis.speak(utterance); } catch { onFailure?.(); }
  };
  return { supported: !!Constructor, canSpeak, listening, voiceError, start, cancel: stop, stop: () => recognition.current?.stop(), speak, stopSpeaking };
}
