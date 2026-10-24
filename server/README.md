# LevelUp Coach API — kichik pilot uchun

Node.js 22+, tashqi npm paketlarisiz. Provider: OpenAI chat completions. GitHub Pages bu serverni ishlatmaydi. Backend HTTPS hostingda alohida ishlashi kerak.

## Lokal sozlash
`server/.env.example` ni `server/.env` sifatida nusxalang va qiymatlarni faqat kompyuteringizda kiriting. Bu fayl Git tomonidan ignore qilinadi. API kalitni chatga, frontendga yoki GitHub’ga yubormang.

```bash
node --env-file=server/.env server/index.mjs
```

Hostingda shu o‘zgaruvchilarni secrets/environment bo‘limida saqlang:
- `OPENAI_API_KEY`: provider server kaliti, billing va sarf limiti bilan.
- `COACH_ACCESS_TOKEN`: kamida 24 belgili tasodifiy alohida kirish kodi. `openssl rand -hex 32` bilan lokal yaratish mumkin. Bu OpenAI kaliti emas.
- `ALLOWED_ORIGIN`: `https://muhamaddshokirov-source.github.io` (path yoki oxirgi slash yo‘q).
- `COACH_DAILY_LIMIT`: 1–1000, default 50 urinish/process/UTC kun. Xatoli provider urinishlari ham hisoblanadi.
- `OPENAI_MODEL`: default `gpt-4o-mini`; akkauntingizda mavjudligini tekshiring.
- `PORT`: hosting belgilaydi, default 3001.

Docker bilan root katalogdan `docker build -f server/Dockerfile -t levelup-coach .`; runtime’da env’larni kiriting. Server 0.0.0.0 ga bog‘lanadi. HTTPS’ni hosting reverse proxy’si ta’minlashi kerak.

## Frontend ulanishi
Learn darsida yoki yakunlangan Today javobida **AI ustozdan fikr olish** tugmasi. AI sahifasida HTTPS `https://HOST/feedback` va alohida access code kiriting; OpenAI kalitini kiritmang. Matn tashqi xizmatga yuborilishiga rozilikni belgilang. Buning uchun mavjud ishlaydigan backend kerak — sahifa hech qanday tayyor server bor deb da’vo qilmaydi.

## Chegaralar
Bu trusted pilot uchun bearer-token gate, ko‘p foydalanuvchili production autentifikatsiya emas. Kodni egasi faqat ruxsatli sinovchilarga beradi; ommaviy frontend env’ga qo‘ymang. CORS mustaqil autentifikatsiya emas. IP quota proxy ortida barcha foydalanuvchini bitta manzil deb olishi mumkin. Xotiradagi quota restart’da reset bo‘ladi va ko‘p process bo‘yicha umumiy emas. Production oldidan persistent quota, identity, distributed rate limit, request monitoring va provider budget cap kerak. Javoblar server kodida log qilinmaydi, ammo hosting/provider o‘z siyosatiga ega.

`node --test server/security.test.mjs` origin/auth/body validationni tekshiradi. Haqiqiy provider so‘rovi bu muhitda bajarilmagan: outbound ruxsat yo‘q va provider credentials sozlanmagan. Feedback matnga asoslanadi, audio yoki pronunciation analiz qilmaydi.
