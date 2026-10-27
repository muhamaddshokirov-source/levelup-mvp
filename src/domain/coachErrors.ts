const messages: Record<string, string> = {
  GEMINI_KEY: 'Google API kaliti qabul qilinmadi. Ilova egasi Render’dagi GEMINI_API_KEY qiymatini tekshirishi kerak.',
  GEMINI_PERMISSION: 'Google loyihasida Gemini uchun ruxsat yo‘q yoki kalit cheklangan. Ilova egasi AI Studio sozlamalarini tekshirishi kerak.',
  GEMINI_MODEL: 'Tanlangan Gemini modeli bu API’da topilmadi. Ilova egasi model sozlamasini yangilashi kerak.',
  GEMINI_QUOTA: 'Gemini bepul limiti tugagan yoki bu loyiha uchun bepul quota mavjud emas. AI Studio’dagi limitni tekshiring; billingni yoqish shart emas.',
  GEMINI_REQUEST: 'Google so‘rovni qabul qilmadi. Ilova egasi model va loyiha sozlamalarini tekshirishi kerak.',
  GEMINI_UNAVAILABLE: 'Google AI xizmati vaqtincha javob bermayapti. Keyinroq qayta urinib ko‘ring.',
  GEMINI_INCOMPLETE: 'AI to‘liq javob tayyorlay olmadi. Javobingizni qisqaroq qilib qayta urinib ko‘ring.',
  GEMINI_EMPTY: 'AI javobi bo‘sh keldi. Qayta urinib ko‘ring.',
  VERIFY_REQUIRED: 'Xavfsizlik tekshiruvini bajaring va yana yuboring.',
  VERIFY_FAILED: 'Xavfsizlik tekshiruvi o‘tmadi yoki muddati tugadi. Yangi tekshiruvni bajaring.',
  VERIFY_HOST: 'Turnstile domen sozlamasi mos kelmadi. Ilova egasi TURNSTILE_HOSTNAME qiymatini tekshirishi kerak.',
  VERIFY_ACTION: 'Turnstile tekshiruv turi mos kelmadi. Ilova egasi sozlamani tekshirishi kerak.',
  VERIFY_UNAVAILABLE: 'Xavfsizlik tekshiruvi xizmatiga ulanib bo‘lmadi. Qayta urinib ko‘ring.',
  COACH_AUTH: 'Server eski kirish rejimida. Ilova egasi Turnstile sozlamalarini tekshirishi kerak.',
  COACH_LIMIT: 'Ilovaning foydalanish limiti tugadi. Keyinroq qayta urinib ko‘ring.',
  COACH_TIMEOUT: 'AI yoki xavfsizlik xizmati vaqtida javob bermadi. Qayta urinib ko‘ring.',
  COACH_NETWORK: 'Server tashqi AI yoki xavfsizlik xizmatiga ulana olmadi. Keyinroq qayta urinib ko‘ring.',
};
/** Only allow-listed error codes are shown; raw server/provider text may contain sensitive data. */
export function coachErrorMessage(status: number, body: unknown): string {
  const code = body && typeof body === 'object' && 'code' in body && typeof body.code === 'string' ? body.code : '';
  const message = messages[code];
  if (message) return `${message} [${code}]`;
  if (status === 401) return 'Xavfsizlik tekshiruvini qayta bajaring. [HTTP_401]';
  if (status === 429) return 'Foydalanish limiti tugadi. Keyinroq qayta urinib ko‘ring. [HTTP_429]';
  return `AI server xatosi. Ilova egasiga shu kodni yuboring: HTTP_${status}.`;
}

export function coachTransportError(error: unknown, timedOut = false): string {
  if (timedOut) return 'AI took too long to reply. Your text is still here; please try again.';
  if (error instanceof TypeError) return 'Could not connect to the AI service. Your text is still here; check your connection and try again.';
  if (error instanceof SyntaxError) return 'The AI service returned an unreadable reply. Your text is still here; please try again.';
  return error instanceof Error ? error.message : 'AI service is unavailable. Your text is still here; please try again.';
}
