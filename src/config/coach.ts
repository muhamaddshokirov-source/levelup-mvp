/** Public connection details only. Never add provider API keys or Turnstile secrets here. */
export const coachConfig = {
  endpoint: process.env.EXPO_PUBLIC_COACH_URL?.trim() || 'https://levelup-coach-qlta.onrender.com/feedback',
  siteKey: process.env.EXPO_PUBLIC_TURNSTILE_SITE_KEY?.trim() || '0x4AAAAAAFj5bKBHmQzhrkpM',
};
