import { useEffect, useState } from 'react';
import { coachConfig } from '../config/coach';

export type CoachHealthState = 'idle' | 'checking' | 'ready' | 'unavailable' | 'outdated';

/** Wake the free API before the first prompt and verify the requested feature is deployed. */
export function useCoachHealth(active: boolean, capability: 'conversation' | 'assistant') {
  const [state, setState] = useState<CoachHealthState>('idle');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!active) {
      setState('idle');
      return;
    }

    const startedAt = Date.now();
    let current = true;
    let request: AbortController | undefined;
    let healthUrl: string;
    try {
      healthUrl = new URL('/health', coachConfig.endpoint).toString();
    } catch {
      setState('unavailable');
      return;
    }
    setState('checking');

    const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
    const checkUntilReady = async () => {
      let retry = 0;
      while (current && Date.now() - startedAt < 120_000) {
        request = new AbortController();
        const attemptTimeout = setTimeout(() => request?.abort(), 10_000);
        try {
          const response = await fetch(healthUrl, { method: 'GET', cache: 'no-store', signal: request.signal });
          if (response.ok) {
            const result: unknown = await response.json();
            if (result && typeof result === 'object') {
              const health = result as { service?: unknown; status?: unknown; capabilities?: unknown };
              if (health.service === 'LevelUp Coach' && health.status === 'online' && Array.isArray(health.capabilities)) {
                if (current) setState(health.capabilities.includes(capability) ? 'ready' : 'outdated');
                return;
              }
            }
          }
          // Render's free service can respond with a temporary HTML wake-up page. Keep waking it.
        } catch {
          // Network/CORS failures can also happen while the sleeping service starts.
        } finally {
          clearTimeout(attemptTimeout);
          request = undefined;
        }
        if (!current) return;
        const delay = Math.min(1000 * (2 ** retry), 8000);
        retry++;
        await wait(delay);
      }
      if (current) setState('unavailable');
    };

    void checkUntilReady();
    return () => {
      current = false;
      request?.abort();
    };
  }, [active, attempt, capability]);

  return { state, retry: () => setAttempt(value => value + 1) };
}
