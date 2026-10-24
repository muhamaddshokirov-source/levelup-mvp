import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { typography as t } from './UI';
type Turnstile = { render: (container: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }
let scriptReady: Promise<void> | undefined;
function loadScript() {
  if (window.turnstile) return Promise.resolve();
  if (!scriptReady) scriptReady = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { script.remove(); scriptReady = undefined; reject(new Error('Verification unavailable')); };
    document.head.appendChild(script);
  });
  return scriptReady;
}
export function CoachVerification({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const callback = useRef(onToken); callback.current = onToken;
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true, id: string | undefined;
    void loadScript().then(() => {
      if (!active || !container.current || !window.turnstile) return;
      id = window.turnstile.render(container.current, {
        sitekey: siteKey, action: 'feedback', theme: 'dark', size: 'flexible',
        callback: (token: string) => { setError(false); callback.current(token); },
        'expired-callback': () => callback.current(''),
        'error-callback': () => { callback.current(''); setError(true); },
      });
    }).catch(() => { if (active) setError(true); });
    return () => { active = false; callback.current(''); if (id) window.turnstile?.remove(id); };
  }, [siteKey]);
  return <View style={{ gap: 8, minWidth: 0 }}><div ref={container} style={{ width: '100%', minWidth: 0 }} />{error && <Text accessibilityRole="alert" style={t.small}>Xavfsizlik tekshiruvi ochilmadi. Internetni tekshirib sahifani yangilang.</Text>}</View>;
}
