# LevelUp AI ustoz — Gemini Free Tier pilot

Frontend endi URL yoki kirish kodi so‘ramaydi. API kaliti faqat backendda. Ommaviy so‘rovlar Turnstile bilan tekshiriladi. **Haqiqiy xizmat hali ulanmagan** — Google hisobi/kaliti va backend hostingini egasi sozlashi kerak.

## 1. Bepul Gemini kaliti

1. https://aistudio.google.com/apikey sahifasiga Google hisobingiz bilan kiring.
2. Hisobingizda mavjud bo‘lsa yangi loyiha yarating yoki tanlang, API key yarating.
3. Xarajatsiz pilot uchun billing hisobini **ulamang**, Paid Tier’ni yoqmang. AI Studio’da loyiha **Free Tier** ekanini tekshiring. Agar free access mavjud bo‘lmasa, to‘lov ulash o‘rniga to‘xtang.
4. Kalitni chatga, GitHub’ga, skrinshotga yoki EXPO_PUBLIC_ env’ga yubormang. Uni faqat backend secret sifatida saqlang.

Adapter `gemini-2.5-flash-lite` modelini ishlatadi. 2026-10-24 tekshiruvida rasmiy pricing bu model uchun Free Tier ko‘rsatadi; shartlar keyinchalik o‘zgarishi mumkin. Code hisob billing holatini tekshira olmaydi: **billing ulangan loyihada shu endpoint ham pullik bo‘lishi mumkin**. “Bepul model” degan nom hech qachon xarajat bo‘lmasligiga dasturiy kafolat emas.

Limit tugasa 429 qaytariladi. Boshqa model/providerga fallback yoki avtomatik retry yo‘q. Google’ning o‘z quota’si AI Studio’da tekshiriladi; raqamlar hisobga qarab farq qiladi. Free Tier matn/javoblari Google mahsulotlarini yaxshilash uchun ishlatilishi mumkin. Maxfiy matn yubormang.

## 2. Backend (hosting hisobida egasi bajaradi)

Root’dagi `render.yaml` Docker service uchun **plan: free** va session branch’ni belgilaydi. Render’da repo’ni ulab Blueprint yarating; tarif Free ekanini va workspace billing/bandwidth/build limitlarini tekshiring. Hosting tariflari va verifikatsiya talablari o‘zgarishi mumkin; code hisob ochmaydi va to‘lov yoqmaydi.

Secrets:
- `GEMINI_API_KEY`: Google AI Studio kaliti.
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret.
- `TURNSTILE_HOSTNAME=muhamaddshokirov-source.github.io`.
- `ALLOWED_ORIGIN=https://muhamaddshokirov-source.github.io`.
- `COACH_DAILY_LIMIT=50` (ilovaning process limiti, Google quota’si emas).

Cloudflare Turnstile’da shu hostname uchun widget yarating. Site key ommaviy; secret key faqat backendda. Backendni HTTPS bilan oching. Dockerfile yangi `gemini.mjs` adapterini ham ko‘chiradi.

## 3. Frontend (egasi build vaqtida)

GitHub Settings → Secrets and variables → Actions → Variables:
- `EXPO_PUBLIC_COACH_URL=https://YOUR-HOST/feedback`
- `EXPO_PUBLIC_TURNSTILE_SITE_KEY=YOUR-PUBLIC-SITE-KEY`

Bular maxfiy emas. Provider/Turnstile secret’ni EXPO_PUBLIC_ ga qo‘ymang. Pages build’ni qayta ishga tushiring. Foydalanuvchi faqat savol/javob, rozilik va zarur bot tekshiruvini ko‘radi. Sozlamalar bo‘sh bo‘lsa AI tugmasi faol emas va “tez orada” ko‘rinadi.

Render Free idle’dan keyin uxlaydi; dastlabki so‘rov kechikishi mumkin. Frontend 120 soniya kutadi. Xotiradagi limit restart’da reset bo‘ladi. Katta ommaviy relizdan oldin persistent quota va login kerak. Turnstile inson/bot tekshiruvi, foydalanuvchi akkaunti emas. Quota billing lock emas.

## Lokal test

Node 22+, tashqi paket kerak emas:
```bash
node --env-file=server/.env server/index.mjs
node --test server/*.test.mjs
```
`.env.example` ni lokal `.env` ga nusxalang (Git ignore qiladi). Turnstile secret’siz server faqat 24+ belgili `COACH_ACCESS_TOKEN` bilan eski private test rejimida ishlaydi; frontend bu rejimga ulanmaydi. Public mode’da bearer token Turnstile’ni chetlab o‘tolmaydi.

Testlar mock Gemini javobini va HTTP kirish cheklovlarini tekshiradi; real Google/Cloudflare ulanishi ushbu muhitda (outbound cheklov va secrets yo‘qligi sabab) tekshirilmagan. Production’da real telefonda muvaffaqiyat, quota, provider xatosi va rozilik holatlarini sinang. Audio yuborilmaydi, talaffuz yoki CEFR baholanmaydi.

Rasmiy manbalar:
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/rate-limits
- https://ai.google.dev/gemini-api/docs/billing
- https://ai.google.dev/gemini-api/docs/available-regions
- https://render.com/docs/free
