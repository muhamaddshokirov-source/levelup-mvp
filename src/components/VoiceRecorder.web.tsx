import { Text } from './LocalizedText';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Icon, typography as t } from './UI';
import { colors as c } from '../theme';
export function VoiceRecorder({ isActive = true }: { isActive?: boolean }) {
  const [recording, setRecording] = useState(false);
  const [pending, setPending] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const currentUrl = useRef('');
  const active = useRef(true);
  const visible = useRef(isActive);
  visible.current = isActive;
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stop = () => { if (recorder.current?.state === 'recording') recorder.current.stop(); stream.current?.getTracks().forEach(track => track.stop()); if (timeout.current) clearTimeout(timeout.current); };
  useEffect(() => { active.current = true; return () => { active.current = false; stop(); if (currentUrl.current) URL.revokeObjectURL(currentUrl.current); }; }, []);
  useEffect(() => { if (!isActive) stop(); }, [isActive]);
  useEffect(() => { const onHide = () => { if (document.hidden) stop(); }; document.addEventListener('visibilitychange', onHide); return () => document.removeEventListener('visibilitychange', onHide); }, []);
  const start = async () => {
    setError(''); setPending(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') throw new Error('Bu brauzer ovoz yozishni qo‘llamaydi. Yangilangan Safari yoki Chrome va HTTPS saytini ishlating.');
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!active.current || !visible.current) { media.getTracks().forEach(t => t.stop()); return; }
      stream.current = media;
      const instance = new MediaRecorder(media);
      recorder.current = instance;
      const chunks: Blob[] = [];
      instance.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      instance.onstop = () => {
        media.getTracks().forEach(t => t.stop());
        if (!active.current) return;
        setRecording(false);
        if (chunks.length) { if (currentUrl.current) URL.revokeObjectURL(currentUrl.current); const next = URL.createObjectURL(new Blob(chunks, { type: instance.mimeType || chunks[0]?.type })); currentUrl.current = next; setUrl(next); }
      };
      instance.onerror = () => { stop(); if (active.current) { setRecording(false); setError('Yozishda xato yuz berdi. Qayta urinib ko‘ring.'); } };
      instance.start(); setRecording(true);
      timeout.current = setTimeout(stop, 120000);
    } catch (e) { stream.current?.getTracks().forEach(t => t.stop()); if (active.current) setError(e instanceof Error && e.name === 'NotAllowedError' ? 'Mikrofonga ruxsat berilmadi. Brauzer sozlamasida ruxsat berib, qayta urinib ko‘ring.' : e instanceof Error ? e.message : 'Mikrofon ochilmadi.'); }
    finally { if (active.current) setPending(false); }
  };
  return <View style={{ gap: 14, padding: 18, borderWidth: 1, borderColor: recording ? c.lime : c.border, borderRadius: 16, backgroundColor: c.background }}><View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}><Icon name="mic-outline" /><Text style={t.heading}>Ovozingizni eshiting</Text></View><Text style={t.small}>2 daqiqagacha yozing va qayta eshiting. Audio faqat shu sahifa xotirasida; serverga yuborilmaydi. Yangi yozuv eskisini almashtiradi.</Text><Button title={pending ? 'Mikrofon ochilmoqda…' : recording ? 'Yozishni to‘xtatish' : 'Ovoz yozish'} disabled={pending} icon={recording ? 'stop' : 'mic-outline'} onPress={() => { if (recording) stop(); else void start(); }} />{recording && <Text accessibilityLiveRegion="polite" style={{ color: c.lime }}>● Yozilmoqda · 2 daqiqada avtomatik to‘xtaydi</Text>}{!!url && !recording && <><audio controls src={url} style={{ width: '100%' }} /><Pressable accessibilityRole="button" onPress={() => { URL.revokeObjectURL(currentUrl.current); currentUrl.current = ''; setUrl(''); }}><Text style={t.small}>Yozuvni o‘chirish</Text></Pressable></>}{!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}</View>;
}
