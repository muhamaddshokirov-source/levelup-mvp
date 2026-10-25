# LevelUp — umumiy reyting va admin panelni ulash

**Holat:** egasi SQL migration’ni dashboard’da muvaffaqiyatli bajarganini ko‘rsatdi. `src/config/community.ts` da egasi bergan Project URL va browser uchun ommaviy publishable key fallback sifatida ulangan; env orqali override qilish mumkin. Haqiqiy email signup/login, redirect, ikki hisob reytingi va admin bootstrap hali owner acceptance talab qiladi. Bu repo o‘zi Supabase loyihasini yaratmaydi. Project URL/public key sozlanmaguncha frontend ochiq aytadi: umumiy baza ulanmagan. Hech qanday sun’iy ismlar/ballar ko‘rsatilmaydi. Render AI servisini o‘zgartirish kerak emas. Ovozli 1:1 suhbat hali yo‘q.

## Egasi bir marta bajaradi

1. https://supabase.com/ da o‘z hisobingizda **Free** loyiha yarating. Tarif/limitlarni tekshiring; paid plan, billing yoki pullik SMTP’ni yoqmang. Database passwordni faqat o‘zingizda saqlang, chatga yubormang.
2. SQL Editor → New query’da **`supabase/migrations/202610240001_rankings.sql`** faylini to‘liq bir marta bajaring. Yangi loyiha uchun migration; takror bajarish table exists xatosi beradi, production jadvallarini o‘chirish kerak emas. Keyingi o‘zgarishlar yangi migration orqali.
3. Authentication → Email provider’ni yoqing, **Confirm email** ni yoqilgan holda qoldiring. Site URL va ruxsat etilgan redirect URL: `https://muhamaddshokirov-source.github.io/levelup-mvp/`. Kamida 10 belgili parol siyosati va signup/login rate limitlarini sozlang. Test xatlarini faqat o‘z emailingizga yuboring; default email xizmati limitli bo‘lishi mumkin. Yetmasa paid xizmat ulashdan oldin to‘xtang.
4. Project Settings / API’dan **Project URL** va **publishable key** (yoki legacy **anon** key) ni oling. Bular browser uchun ommaviy qiymatlar. **secret/service_role** keyni hech qachon app, GitHub Actions frontend variable yoki chatga qo‘ymang.
5. Repo Settings → Secrets and variables → Actions → **Variables**:
   - `EXPO_PUBLIC_SUPABASE_URL` — loyihangizning `https://…supabase.co` URL’i (oxirida `/`siz).
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` — publishable/anon key.
   Pages workflow’ni qayta ishga tushiring. Lokal test uchun shu ikkita qiymat `.env` da bo‘lishi mumkin (`.env` Git’ga kirmaydi). Lokal export’da env o‘zgarganda `npx expo export --platform web --clear` ishlating: Metro transform cache eski qiymatni ushlab qolishi mumkin.
6. Saytda Profil → Online hisob → hisob yarating, emailni tasdiqlang, kiring va ommaviy taxallus/reytingga rozilik bering. **Account ID** ni o‘zingiz qayd qiling.
7. Supabase **Table Editor**’da `rank_admins` jadvaliga faqat egasining tasdiqlangan Auth user UUID’sini `user_id` sifatida bir qator qilib kiriting. UUID’ni Authentication → Users’dan yoki app’dagi Account ID’dan oling; tasodifiy UUID yoki boshqa odamning ID’sini ishlatmang. Bu amal owner SQL/Table Editor’dan bajariladi, oddiy app foydalanuvchisi buni qila olmaydi.
8. Profil → **Online hisobni yangilash** → **Admin panelni ochish**. Oddiy hisobda tugma yo‘q; RPC ham admin bo‘lmagan so‘rovni rad etadi. Admin huquqini olish uchun `rank_admins` qatorini owner dashboard’dan o‘chiring.

## Ishlash tartibi

- Auth: email/parol va tasdiqlash, Supabase session refresh. Parol app tomonidan saqlanmaydi; session tokeni AsyncStorage’da. Web storage shifrlanmagan: umumiy kompyuterda sign out qiling. Hisob bir nechta qurilmada **ranked XP**ni birlashtiradi, lekin mavjud lokal dars drafti, profil/reja, journal/audio va lug‘atni cloud’ga ko‘chirmaydi.
- Reyting: Natijalar ichida haftalik/umumiy top 50, o‘z o‘rni top 50dan tashqarida bo‘lsa ham qaytariladi. Faqat hisobga kirganlar ko‘radi. Haftalik chegara dushanba 00:00 **Asia/Tashkent**, barcha vaqt natijasi saqlanadi. Teng XP’da oldin qo‘shilgan ustun, so‘ng UUID bilan qat’iy tartib.
- Public ma’lumot: UUID, taxallus, ranked XP/o‘rin. Email, parol, javob/audio ommaviy emas. Alohida roziliksiz reytingga qo‘shilmaydi. Chiqish/leave jadvaldan yashiradi, ballarni yo‘qotmaydi. Sign outning o‘zi leave emas.
- Kunlik mashq: server sanasi bo‘yicha **+50 bir marta/kun**. 8 starter darsning har biri **+20 bir marta**, client o‘zicha lesson ID, sana yoki ball bera olmaydi. SQL min. 20 English word/max.4000 belgi tekshiradi; javob ranking jadvallarida saqlanmaydi. Hosting/provider texnik loglari ularning siyosatiga bog‘liq.
- Eski lokal XP import qilinmaydi: localStorage’dagi soxta ballni reytingga ko‘chirish mumkin emas. Bugungi mashq Results’dan qayta sync qilinishi mumkin; eski darsni sync qilish uchun darsdagi javobni qayta kiriting. Qayta yuborish unique constraint/transaction sababli qo‘shimcha XP bermaydi. Offline local save ishlayveradi, avtomatik backfill/offline queue yo‘q; online xato ko‘rsatiladi va qo‘lda qayta urinish mumkin.
- Mahalliy XP avvalgidek kunlik +50. Ranked XP va lokal XP turli hisoblar; UI buni tushuntiradi. Darsni yakunlash self-assessment, imtihon bahosi emas.
- Admin: 25 tadan paginated ishtirokchilar, jami son/XP/holat; yashirish, ball olishdan bloklash va qayta ochish; kamida 3 belgili sabab va oxirgi 20 audit yozuvi. Admin akkauntiga panel orqali tegib bo‘lmaydi. XPni qo‘lda o‘zgartirish, parol/email ko‘rish, admin tayinlash yoki ishtirokchilarni ommaviy o‘chirish panelda yo‘q.

## Xavfsizlik chegaralari va pilot cheklovlari

Barcha 4 jadvalda RLS yoqilgan, `anon`/`authenticated` uchun bevosita jadval/sequence huquqlari olib tashlangan. Faqat aniq grant qilingan RPC’lar bor. `SECURITY DEFINER` funksiyalarining `search_path=''`, obyektlari schema-qualified. Admin funksiyalarining har chaqiruvida `auth.uid()` `rank_admins` bilan tekshiriladi. JWT’ni Supabase tekshiradi; clientdagi admin tugmasi himoya emas. Service-role key kerak emas.

Bu **to‘liq anti-cheat emas**: 20 so‘z qoidasini avtomatlashtirish, bir nechta tasdiqlangan email orqali akkaunt ochish yoki mazmunsiz matn bilan mashq belgilash mumkin. U speaking sifatini isbotlamaydi. Signup abuse’ni Supabase Auth email/rate limitlari bilan nazorat qiling. Katta ommaviy relizdan oldin server-side CAPTCHA integration, firibgarlik moderatsiyasi, password recovery/self-service account deletion, backup/retention siyosati va iste’mol limitlarini qo‘shish kerak. Ushbu MVP’da recovery/account deletion egasi tomonidan Supabase dashboard’da bajariladi; app’da tayyor flow yo‘q. Admin huquqini va zaxira nusxalarni owner nazorat qiladi. Anonymous/offline xp saqlanadi, lekin shared reyting uchun internet/hisob kerak.

## Test

`npm test`: PGlite **haqiqiy PostgreSQL** engine’ida migration bajariladi: role/RLS/table grants, ikki user ballari, +50/+20, replay/invalid answer/id, hafta filtri, admin bo‘lmagan user rad etilishi, ban/rejoin, audit, leave qayta join tekshiriladi. Auth schema/uid test fixture; haqiqiy Supabase signup/SMTP/redirect hali egasining loyihasida acceptance test talab qiladi.

Optional `scripts/check-community.cjs`: alohida test export va browser API **mock** bilan signin → consent → daily → replay → board → admin/audit, 320/390/1280px. Testdagi account/playerlar faqat test fixture’lari; production’ga tushmaydi. Env yuqoridagi fayl boshida ko‘rsatilgan; static server 8081. Oddiy regression skriptlari konfiguratsiya yo‘q holatni ham tekshiradi.

## Ulangandan keyin acceptance

Ikki turli haqiqiy hisob bilan kiring va rozilik bering. Bittasida daily, boshqasida daily+dars bajaring: 50 va 70, 70 yuqorida. Takroriy sync ballni oshirmasin. Haftalik/umumiy ko‘rinsin. Oddiy akkaunt admin RPC’ga kira olmasin. Admin blok/yashirishni tekshirsin; audit ko‘rinsin. Logout/reload/ikkinchi qurilma session va reytingni saqlasin. So‘ng faqat owner nazoratidagi test userlarni dashboard orqali o‘chiring. Real foydalanuvchi yoki mavjud ballarni reset qilmang.
