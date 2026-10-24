# LevelUp AI backend

Frontend endi manzil yoki kirish kodi so‘ramaydi. Ommaviy web rejimida bitta **AI ustozdan so‘rash** tugmasi va Cloudflare Turnstile tekshiruvi mavjud. API kaliti faqat serverda. Xizmat hali deploy qilinmagan; live provider tekshiruvi ham bajarilmagan.

## Egasi uchun ishga tushirish
1. Docker/Node.js hostingda backendni joylashtiring. Root’dagi `render.yaml` Render Blueprint konfiguratsiyasidir; u o‘z-o‘zidan hosting hisobini yaratmaydi yoki pullik xizmatni yoqmaydi. Tarifni o‘zingiz tanlang. Server Dockerfile root build context bilan ishlaydi.
2. OpenAI hisobida API billing va provider sarf cheklovlarini sozlang. `OPENAI_API_KEY` ni faqat backend hostingning secret bo‘limiga kiriting. Chat yoki GitHub kodiga joylamang.
3. Cloudflare Turnstile widget yarating. Ruxsatli hostname: `muhamaddshokirov-source.github.io`. Backend’da `TURNSTILE_SECRET_KEY` va `TURNSTILE_HOSTNAME=muhamaddshokirov-source.github.io` ni sozlang. Site key ommaviy, secret key maxfiy.
4. Backend `ALLOWED_ORIGIN=https://muhamaddshokirov-source.github.io`, `COACH_DAILY_LIMIT=50`, ixtiyoriy `OPENAI_MODEL=gpt-4o-mini`. HTTPS hosting manzilini oling. Default port 3001; hosting PORT beradi.
5. GitHub repository **Settings → Secrets and variables → Actions → Variables** ichida:
   - `EXPO_PUBLIC_COACH_URL=https://YOUR-HOST/feedback`
   - `EXPO_PUBLIC_TURNSTILE_SITE_KEY=YOUR-PUBLIC-SITE-KEY`
   Bu ikkalasi ommaviy sozlamalar. **OpenAI yoki Turnstile secret’ni EXPO_PUBLIC_ o‘zgaruvchilariga hech qachon qo‘ymang.**
6. Pages build’ni qayta ishga tushiring. Endi foydalanuvchi hech qanday manzil/kod kiritmaydi. Razilikdan so‘ng Turnstile yuklanadi; muvaffaqiyatli tekshiruv tokeni bitta so‘rovda ishlatiladi. Backend hostname/action/token’ni serverda tekshiradi.
7. Telefon orqali: rozilik, tekshiruv, javob kelishi, provider xatosi va limit holatlarini real xizmatda sinang.

## Lokal / eski yopiq pilot
Node.js 22+, tashqi npm paketlarisiz. `.env.example` ni `server/.env` ga nusxalab lokal to‘ldiring:

```bash
node --env-file=server/.env server/index.mjs
node --test server/security.test.mjs
```

Turnstile secret mavjud bo‘lmasa server faqat kuchli `COACH_ACCESS_TOKEN` bilan yopiq pilot rejimida ishlaydi; yangi frontend bu rejimga ulanmaydi. Turnstile sozlanganida bearer token tekshiruvni chetlab o‘tolmaydi.

## Xavfsizlik va xarajatlar
Origin cheklovi mustaqil autentifikatsiya emas. Turnstile bot tekshiruvi, foydalanuvchi akkaunti emas. 5 urinish/minut/IP va 50 provider so‘rovi/UTC kun/process; IP reverse proxy ortida umumiy bo‘lishi mumkin. Limit xotirada: restart’da reset, bir nechta instance’da umumiy emas. Bitta instance, provider billing cap va kichik pilotdan boshlang. Keng reliz oldidan persistent/distributed quota, identity va monitoring kerak. Render Blueprint bularni avtomatik hal qilmaydi.

Matn server kodida log qilinmaydi; hosting va OpenAI’ning ma’lumot siyosatini ham tekshiring. Turnstile Cloudflare xizmatidan foydalanadi, maxfiylik xabarnomasiga kiriting. Audio yuborilmaydi. Natija pronunciation yoki CEFR bahosi emas.
