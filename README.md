# LevelUp

Ingliz tilida speaking mashq qilish uchun Expo + React Native + TypeScript starter. Dark navy va lime dizayn, telefon/planshet/web uchun moslashuvchan interfeys. Asosiy lokal imkoniyatlar backend yoki akkauntsiz ishlaydi. Ixtiyoriy AI coach uchun alohida backend va provider kaliti kerak.

## Ishga tushirish

Node.js **20.19.4 yoki yangiroq LTS** va npm kerak.

```bash
npm ci
npm start
```

Telefon: Expo SDK 54 bilan mos Expo Go ilovasida terminaldagi QR kodni oching. Telefon va kompyuter bir tarmoqda bo‘lsin. Yangi Expo Go eski SDKni qo‘llamasa, SDK 54 bilan mos development build yoki Android Expo Go versiyasidan foydalaning.

```bash
npm run android  # Android emulator / ulangan Android qurilma
npm run ios      # macOS + Xcode iOS simulator
npm run web      # brauzer
```

`android` va `ios` buyruqlari Expo development server orqali ishlaydi; native emulator vositalari alohida o‘rnatiladi. Expo Router ishlatilmagan: `App.tsx` kirish nuqtasi, navigatsiya lokal React state bilan boshqariladi. `app/` katalogi bu konfiguratsiya uchun kerak emas.

## To‘liq fayllar xaritasi

```text
levelup-mvp/
├── App.tsx                         # SafeArea, yuklanish, xatolar, Today/Progress navigatsiyasi
├── app.json                        # Expo, Android, iOS va web konfiguratsiyasi
├── package.json                    # Bog‘liqliklar va npm buyruqlari
├── package-lock.json               # Takrorlanuvchi o‘rnatish uchun lockfile
├── tsconfig.json                   # Strict TypeScript
├── .gitignore                      # Build va lokal fayllarni Git’dan chiqaradi
├── README.md                       # Ushbu qo‘llanma
└── src/
    ├── theme.ts                    # Dark navy / accent lime ranglar
    ├── components/
    │   └── UI.tsx                  # Card, Button, Icon, Meter, typography
    ├── domain/
    │   ├── practice.ts             # Savollar, XP, level, streak, feedback, validatsiya
    │   └── practice.test.ts        # Domain va milestone testlari
    ├── hooks/
    │   └── usePractice.ts          # Yuklash/saqlash, kun almashuvi, submit holati
    ├── screens/
    │   ├── TodayScreen.tsx         # Kunlik savol, javob, feedback, XP kartalari
    │   └── ProgressScreen.tsx      # Statistika, 7 kunlik faollik, javoblar tarixi
    └── storage/
        └── practiceStorage.ts      # AsyncStorage adapteri
```

Barcha fayllarda to‘liq kod mavjud. Alohida Babel/Metro konfiguratsiyasi talab qilinmaydi: Expo standart konfiguratsiyasi ishlatiladi. Rasm va tashqi shrift xizmati kerak emas; ikonkalar npm paketi ichidan yuklanadi.

## Ishlash qoidalari

- Savol qurilmaning lokal kalendar sanasi bo‘yicha tanlanadi; 7 ta savol aylanishi mavjud.
- Javobni avval ovoz chiqarib aytish, keyin yozish tavsiya etiladi. HTTPS web’da ixtiyoriy mikrofon yozuvi va qayta eshitish mavjud. Speech-to-text va talaffuz tahlili yo‘q.
- Eng kamida **20 ta inglizcha so‘z**, ko‘pi bilan **4 000 belgi**. Raqamlar so‘z hisoblanmaydi.
- Muvaffaqiyatli saqlangan kunlik javob **50 XP** beradi. Bir sanada ikkinchi marta XP berilmaydi.
- Har **250 XP** yangi level. Birinchi level — 1.
- Streak bugun yoki kecha tugagan uzluksiz kunlar ketma-ketligidir. Bugungi mashq hali qilinmagan bo‘lsa, kechagi streak saqlanadi; bir kun o‘tkazib yuborilganda uziladi.
- Kun almashuvi har 15 soniyada va ilova aktiv holatga qaytganda tekshiriladi. Yangi kunda javob maydoni yangilanadi.
- Feedback matn uzunligi va bog‘lovchi so‘zlarga asoslangan **demo**; AI, grammatika yoki talaffuzni baholash emas. Interfeysda bu cheklov yozilgan.
- Sana qurilma soatiga bog‘liq; bu starter server tomonidan tasdiqlangan anti-cheat tizimini o‘z ichiga olmaydi.

## AsyncStorage

Kalit: `@levelup/practice/v1`. Saqlanadigan format:

```ts
type Session = {
  date: string;
  questionId: number;
  answer: string;
  words: number;
  xp: number;
};
type PracticeData = { version: 1; sessions: Session[] };
```

Ilova avval storage’ni yuklaydi va tekshiradi. Yuklash xatosida mavjud ma’lumot ustiga yozilmaydi; qayta urinish tugmasi ko‘rsatiladi. Saqlash tugamaguncha XP interfeysga qo‘shilmaydi. Saqlash muvaffaqiyatsiz bo‘lsa, javob maydonda qoladi va qayta urinish mumkin. Takroriy submit bloklangan.

Android/iOS’da AsyncStorage, web’da shu adapter orqali brauzer lokal storage’i ishlaydi. Ma’lumot qurilma/brauzerga xos: ilovani o‘chirish yoki brauzer ma’lumotini tozalash tarixni yo‘qotadi. Cloud sync yo‘q. AsyncStorage shifrlangan maxfiy saqlash tizimi emas; javoblarga maxfiy ma’lumot kiritmang. Tugallanmagan draft doimiy saqlanmaydi; tab almashtirilganda saqlanib turadi, ammo ilova qayta ochilganda yoki kun almashganda yo‘qoladi.

## Tekshiruvlar

```bash
npm run typecheck
npm test
npx expo install --check
npx expo export --platform web
```

Ushbu muhitda TypeScript, 9 test va web export muvaffaqiyatli tekshirildi. Expo dependency tekshiruvi tarmoq cheklovi sabab `EXPO_OFFLINE=1` bilan bajarildi; paketlar SDK 54 lokal compatibility ro‘yxatiga mos. Android/iOS qurilmada ishga tushirish ushbu muhitda tekshirilmagan.

Qo‘lda tekshirish:
1. 20 so‘zdan kam javobda Finish practice bloklanganini tekshiring.
2. 20+ inglizcha so‘z kiriting va yakunlang: 50 XP, feedback va journal yozuvi paydo bo‘ladi.
3. Ilovani qayta oching: XP, javob va tarix saqlanadi; bir kunda yana XP berilmaydi.
4. Progress’da daraja, hafta faolligi va yozilgan so‘zlar ko‘rinadi.
5. Kichik ekranda pastki navigatsiya, keng ekranda yuqori navigatsiya ko‘rinadi.

## Bog‘liqliklar xavfsizligi

`npm audit fix` orqali mos yangilanishlar qo‘llandi. Tekshiruv paytida Expo/React Native toolchain tranzitiv paketlarida 28 ta audit ogohlantirishi (5 moderate, 23 high) qoldi. `npm audit fix --force` SDK mosligini buzadigan major versiyalarni taklif qilgani uchun qo‘llanilmadi. Production reliz oldidan qo‘llab-quvvatlanadigan yangi Expo SDKga rejalashtirilgan migratsiya va audit kerak. Development serverni ishonchsiz tarmoqda ochiq qoldirmang.


## Qo‘shimcha imkoniyatlar

- **Speaking timer** (`src/components/SpeakingTimer.tsx`): 30, 60 yoki 120 soniyalik warm-up; pause, continue va reset. Deadline asosida hisoblanadi, ilova background’dan qaytganda vaqt yangilanadi. Mikrofonni yozmaydi va qo‘shimcha XP bermaydi.
- **Weekly mission**: lokal vaqt bilan dushanba–yakshanba oralig‘ida 3 kunlik practice maqsadi. Oldingi tarixdan hisoblanadi, storage formatini o‘zgartirmaydi.
- **Milestones** (`src/domain/milestones.ts`): birinchi practice, 3 kunlik eng yaxshi streak, jami 500 so‘z va 5 practice. Eng yaxshi streak oldingi tarixdan hisoblanadi; hozirgi streak uzilsa badge yo‘qolmaydi.
- **Practice journal**: savol, javob yoki ISO sana bo‘yicha qidirish, uzun javoblarni ochish/yopish, qidiruv natijasi yo‘q holati.
- **Completion delight** (`src/components/CompletionBanner.tsx`): XP kartasi va reduced-motion sozlamasini hurmat qiladigan spring animatsiya.
- Today ekrani tablar orasida mounted saqlanadi: joriy draft va timer tab almashtirilganda yo‘qolmaydi. Ilova qayta yuklanganda draft tiklanmaydi.

## Profile & Settings

Profile tab yoki yuqoridagi avatar orqali ochiladi. Ism (30 belgigacha), 4 avatar rangi, haftalik maqsad (2/3/5/7 kun) va warm-up davomiyligi (30/60/120 soniya) sozlanadi. `Save my preferences` lokal saqlaydi; yozilmagan o‘zgarishlar tab almashtirilganda qoladi. `Restore default preferences` faqat formani boshlang‘ich holatga qaytaradi: tasdiqlash uchun Save bosing. Practice tarixi o‘chirilmaydi.

Fayllar: `src/screens/ProfileScreen.tsx`, `src/hooks/useSettings.ts`, `src/domain/settings.ts`, `src/domain/settings.test.ts`. Storage kaliti: `@levelup/settings/v1`. Sozlamalar practice tarixidan alohida saqlanadi. Xatoda retry va saqlash holatlari mavjud. Saqlangan maqsad Today mission kartasiga, timer davomiyligi warm-up’ga, ism va rang avatar hamda salomlashuvga qo‘llanadi. Timer davomiyligi o‘zgarsa, faol timer qayta boshlang‘ich holatga keladi.

## Vocabulary notebook

Yangi **Words** tab: so‘z/ibora (80 belgi), ma’no (300 belgi) va ixtiyoriy misol (500 belgi) qo‘shish, tahrirlash va tasdiqlash orqali o‘chirish. Qidiruv so‘z, ma’no va misollarni tekshiradi; All/Learning/Learned filtrlari mavjud. Learned holati qo‘lda belgilanadi va bekor qilinadi. Takroriy so‘zlar katta-kichik harfdan qat’i nazar bloklanadi.

Fayllar: `src/screens/VocabularyScreen.tsx`, `src/hooks/useVocabulary.ts`, `src/domain/vocabulary.ts`, `src/domain/vocabulary.test.ts`. Storage kaliti `@levelup/vocabulary/v1`; practice va settings ma’lumotlariga tegmaydi. Muvaffaqiyatli yozilgandan keyingina interfeys yangilanadi, xatoda forma saqlanib qoladi. Notebook drafti tab almashtirilganda saqlanadi, ilova qayta yuklansa yo‘qoladi. Lug‘at uchun XP berilmaydi, avtomatik tarjima yoki AI mavjud emas. Lokal ma’lumot shifrlanmagan va qurilmalar o‘rtasida sinxronlanmaydi.

## Vocabulary Review

**Review** tab yoki Words sahifasidagi **Review my words** tugmasidan ochiladi. Learning / All / Learned to‘plamidan tasodifiy tartibda 20 tagacha flashcard yaratiladi. Avval so‘z ko‘rsatiladi; Reveal meaning ma’no va misolni ochadi. Got it va Practice again tanlovlari sessiya yakunida recalled/revisit sonlarini ko‘rsatadi. Revisit tugmasi qiyin so‘zlardan yangi sessiya boshlaydi.

`src/screens/ReviewScreen.tsx`, `src/domain/review.ts`, `src/domain/review.test.ts`. Notebook hook App darajasiga ko‘tarilgan: Words va Review bir xil holatdan foydalanadi. Learned yorliqlari avtomatik o‘zgarmaydi, XP berilmaydi. Sessiya tablar orasida saqlanadi, reload’dan keyin yo‘qoladi. Kartalar sessiya boshidagi snapshot bo‘yicha olinadi; notebook’da so‘z o‘zgartirilsa, keyingi yangi sessiyaga qo‘llanadi. End review joriy sessiyadan chiqadi va natijasini saqlamaydi.

## GitHub Pages deployment

`.github/workflows/pages.yml` builds and deploys this session branch (`arena/e4114631-levelup-mvp`). `app.config.ts` applies `/levelup-mvp` only when the workflow sets `EXPO_PUBLIC_BASE_URL`; normal local preview stays at `/`.

Repository Settings → Pages → Build and deployment → Source: **GitHub Actions**. If the github-pages environment restricts deployment branches, allow `arena/e4114631-levelup-mvp`. After enabling Pages, rerun the Deploy LevelUp to GitHub Pages workflow from the Actions tab (or push another change). The deploy job reports the actual public URL.

This repository is currently private. Pages availability for private repositories depends on the GitHub plan. If GitHub requires a plan upgrade or a public repository, the owner must choose; this setup does not change repository visibility. The Arena GitHub integration returned HTTP 403 for the Pages settings API, so enabling Pages may require the owner to do it in GitHub. No successful publication is assumed until the deploy job succeeds.

The deployed site is publicly reachable unless the owner configures supported Pages access controls. User answers and notebooks remain local to each browser, not in the deployed files. Opening the public URL will not transfer data from Arena preview because it uses a different browser origin.


## Speaking yo‘nalishi va AI beta

- **Learn**: A1–B2 uchun 8 ta starter dars; prompt, o‘zbekcha yo‘riq, tayanch iboralar, namuna, follow-up. `src/domain/course.ts`, `src/screens/CourseScreen.tsx`. `@levelup/course/v1` faqat bajarilgan dars IDlarini saqlaydi. Bu to‘liq CEFR kursi emas.
- **Web audio**: Today va Learn’da `src/components/VoiceRecorder.web.tsx`. HTTPS va mikrofon ruxsati kerak; MediaRecorder qo‘llaydigan brauzer. Ikki daqiqalik limit, qayta eshitish, o‘chirish, tab almashtirishda yozuvni to‘xtatish. Audio vaqtinchalik blob; tashqi serverga yuborilmaydi. Native fallback aniq tushuntiriladi, Expo native yozuvi yoqilmagan. Telefonning fon/ekran-qulfi xatti-harakatlari real qurilmada tekshirilishi kerak.
- **AI coach**: darsdan yoki Today completion’dan ochiladi. `src/screens/CoachScreen.tsx`, `server/index.mjs`. Frontend’da backend manzili va kirish kodi so‘ralmaydi; egasi build vaqtida HTTPS endpoint va ommaviy Turnstile site key’ni sozlaydi. Foydalanuvchi roziligi va serverda tekshiriladigan bot himoyasi kerak. GitHub Pages faqat frontend; backend/provider hosting va billing **hali sozlanmagan**. Kalitni frontendga qo‘ymang. [Server qo‘llanmasi](server/README.md).
- **Rivojlanish rejasi**: [mahsulot rejasi, sifat mezonlari va qolgan ishlar](docs/PRODUCT_PLAN.md).

Tekshiruv: `npm run typecheck`, `npm test`, `node --test server/security.test.mjs`, `npx expo export --platform web`. Mikrofonning haqiqiy qurilmada ishlashi va haqiqiy AI javobi avtomatik domain testlari bilan tasdiqlanmaydi; ular alohida acceptance sinovi talab qiladi.

## Mobil layout regressiyasi

`useResponsiveLayout` 860px dan tor oynalarda Today/Profile/Words/Review ustunlarini 100% kenglikka o‘tkazadi. Desktop flex basis telefon kartalariga qo‘llanmaydi; Card, matn va tugmalar kengligi cheklangan va o‘raladi. `scripts/check-mobile.cjs` — ixtiyoriy Playwright smoke test (Playwright va @sparticuz/chromium alohida o‘rnatiladi, OS Chromium kutubxonalari ham kerak). Lokal web export 8080 portda turganda skript 320/375/390/430/768/1280px da 6 sahifani va 320/390px da uzun matnli saqlangan holatlarni tekshiradi. Bu Chromium viewport testi, haqiqiy iOS Safari tekshiruvi emas.


## Soddalashtirilgan AI ustoz

AI sahifasidan manzil/kod maydonlari olib tashlandi. Egasi sozlagan `EXPO_PUBLIC_COACH_URL` va `EXPO_PUBLIC_TURNSTILE_SITE_KEY` build vaqtida olinadi. Ular bo‘sh bo‘lsa “AI ustoz tez orada” xabari va o‘chirilgan tugma ko‘rinadi; soxta feedback qaytarilmaydi. Maxfiy provider kaliti va Turnstile secret faqat backendda. `render.yaml` — ixtiyoriy hosting konfiguratsiyasi. Aniq qadamlar: [server/README.md](server/README.md). Oldingi backend manzili/access-code kiritish haqidagi yo‘riq endi eskirgan.


## Gemini Free Tier adapteri

AI backend OpenAI o‘rniga `server/gemini.mjs` orqali `gemini-3.1-flash-lite` ishlatadi. Bepul loyiha yaratish va `GEMINI_API_KEY` ulash qadamlarini [server qo‘llanmasida](server/README.md) ko‘ring. Eski OpenAI billing/OPENAI_API_KEY yo‘riqlari endi amal qilmaydi. API hali jonli ulanmagan. Billing ulangan bo‘lsa server bepul foydalanishni kafolatlay olmaydi — xarajatsiz pilot uchun Google loyihasini Free Tier’da saqlang. Quota tugasa xabar qaytadi; boshqa providerga avtomatik o‘tmaydi. Rozilik matnida Google Gemini va bepul rejimdagi ma’lumot ishlatilishi ochiq ko‘rsatilgan. Adapter testlari: `node --test server/*.test.mjs`.


## Jonli AI ulanishining ommaviy sozlamalari

`src/config/coach.ts` foydalanuvchi bergan ommaviy Turnstile Site Key va Render HTTPS endpointini saqlaydi. Bular maxfiy emas. GitHub integration Actions Variables yozishga 403 qaytargani uchun fallback qiymatlar kodda berilgan; bo‘sh workflow variables ulanishni o‘chirmaydi. EXPO_PUBLIC_ env qiymatlari mavjud bo‘lsa override qiladi. Gemini API key va Turnstile Secret Key bu faylga kiritilmaydi, ular faqat Render secrets’da. Frontend build muvaffaqiyati haqiqiy Google/Turnstile javobi kelganini tasdiqlamaydi; real brauzerda rozilik, Turnstile va feedbackni tekshirish kerak.

## AI feedback ko‘rinishi

`CoachFeedback` javobni kuchli tomon, tuzatishlar, namunaviy javob va keyingi savol kartalariga ajratadi. Uzbek/English sarlavhalar aniqlanadi; noma’lum matn ham yo‘qolmaydi, oddiy blokda chiqadi. Qalin/urg‘uli markdown native Text bilan ko‘rsatiladi; HTML yoki tashqi havolalar bajarilmaydi. Backend javob formati va maxfiy sozlamalar o‘zgarmaydi. Siz yuborgan feedback namunasi `feedbackFormat.test.ts` regressiya testiga qo‘shilgan.

## Welcome, profil savolnomasi va shaxsiy reja

Birinchi ochishda sayt nima ekanini, foydalanish ketma-ketligini va maxfiylik chegaralarini tushuntiruvchi o‘zbekcha tanishtiruv chiqadi. Keyin 4 bosqich: ism/maqsad → self-assessed A1–B2 → haftalik kunlar va 10/20/30/60 daqiqa → asosiy qiyinchilik va 4/8/12 haftalik baholash muddati. Tanlovlar qoidaga asoslangan rejaga aylantiriladi; AI diagnostikasi, CEFR sertifikati yoki natija kafolati emas.

`@levelup/learner/v1` profil maqsadi/daraja/vaqtni saqlaydi. Ism va haftalik kunlar mavjud settings bilan sinxronlanadi; Profile’dagi joriy ism/weekly goal reja ko‘rinishida ham hisobga olinadi. Savolnoma birinchi marta tugatilmaguncha asosiy navigatsiya chiqmaydi; keyin default sahifa Bugun; reja Profil ichida ochiladi. Oldingi foydalanuvchilar ham bir marta tanishtiruvdan o‘tadi, ammo XP, journal va Words kalitlari o‘zgarmaydi. Save muvaffaqiyatli bo‘lmaguncha app’ga o‘tilmaydi, xatoda qayta urinish mavjud. Settings va learner ikki alohida storage yozuvi: birinchisi saqlanib, ikkinchisi xato bersa settings yangilangan bo‘lishi mumkin, savolnoma qayta urinish uchun ochiq qoladi.

Reja: haftalik/jami vaqt, daqiqalari tanlangan sessiyaga teng 3 mashq bosqichi, tavsiya kunlar, qiyinchilikka mos yo‘riq va maqsadga mos dastlabki 4 haftalik mavzular. 8/12 hafta tanlansa bu umumiy odat maqsadi, qo‘shimcha yozilgan darslar va’da qilinmaydi. Hozirgi 8 dars orasidan tanlangan darajadagi 2 tasi ochiladi. Jadval tavsiya; avtomatik reminder, login/cloud sync yoki yakuniy sertifikat yo‘q.

Profile → shaxsiy reja va savolnomani qayta ochish mavjud. Tahrirni bekor qilish learner qiymatini o‘zgartirmaydi. Tahrir rejimiga o‘tishda sahifalar unmount bo‘ladi: tugallanmagan vaqtinchalik draft/audio’ni avval tugating. Brauzer ma’lumotini tozalash onboarding/rejani ham o‘chiradi.

Asosiy fayllar: `src/domain/learningPlan.ts`, `src/hooks/useLearner.ts`, `src/screens/OnboardingScreen.tsx`, `src/screens/PlanScreen.tsx`. `scripts/check-onboarding.cjs` — optional Playwright smoke test: 320/390/1280px, welcome → savolnoma → saqlash → reload → B1 darsi → tahrir/cancel. Haqiqiy telefon sinovi ham tavsiya etiladi.

## Ixcham navigatsiya, uch til va och/qorong‘i ko‘rinish

Asosiy menyu 5 ta tugma: **Bugun / Darslar / AI ustoz / Natijalar / Lug‘at**. Yana menyusi olib tashlangan. Pastki menyu gorizontal aylantirilmaydi: 320px telefonda ham beshtalasi ko‘rinadi. Profil tepadagi avatar orqali ochiladi; shaxsiy reja shu profil ichida ochilib/yopiladi, alohida navigatsiya sahifasi emas. Lug‘at va Takrorlash bitta `VocabularyHubScreen` ichidagi ikkita rejim: ikkalasi mounted qoladi, draft va aktiv deck yo‘qolmaydi. Rejim almashtirilganda scroll yuqoriga qaytadi. Kompyuterda ham shu besh bo‘lim qoladi. Saytga qayta kirilganda Bugun ochiladi; onboarding tugagach Profil ichida yaratilgan reja ko‘rsatiladi.

**Tepadagi avatar → Profil → Ko‘rinish va til** orqali:
- Och (yorug‘, yashil aksentli) / Qorong‘i (navy, lime aksentli) fon.
- O‘zbekcha / Русский / English interfeysi, tanishtiruv va savolnomani ham qamrab oladi.
- Tanlovlar `@levelup/display/v1` da saqlanadi; default: uz/dark. Tanishtiruv sarlavhasidagi sozlamalar tugmasi profil yaratishdan oldin ham ishlaydi.

Bu **interfeys** tarjimasi: inglizcha dars savollari/namunalari/iboralar inglizcha qoladi. Ism, foydalanuvchi javobi va lug‘at yozuvlari o‘zgartirilmaydi. AI javobi asl tilida (joriy backend asosan o‘zbekcha). Cloudflare widget’i uchinchi tomon elementi. Display sozlamasi o‘zgarsa ekranlar remount qilinmaydi, vaqtinchalik javob drafti saqlanadi; brauzerni reload qilish draftlarni saqlamaydi. XP va boshqa storage yozuvlariga tegilmaydi. Saqlash xatosida oldingi tanlov qoladi va xato ko‘rsatiladi.

Fayllar: `src/domain/translations.ts` (uch tilli lug‘at va sonli UI matnlari), `src/domain/display.ts` (storage validatsiyasi), `src/displayPreferences.ts` (AsyncStorage store), `src/theme.ts` (dinamik palitralar va keshlangan themed style sheets), `src/components/LocalizedText.tsx`, `src/components/DisplaySettings.tsx`. Yangi UI matni qo‘shilganda lug‘atni ham yangilang; foydalanuvchi yoki dars matniga `localize={false}` qo‘ying. Locale sanalarini moslaydi, dars darajasi yoki reja hisobini o‘zgartirmaydi.

Optional brauzer testi: `node scripts/check-display.cjs` (avval static export serverini 8080 da ishga tushiring; Playwright/Chromium dependency’lari `check-mobile.cjs` dagidek). 3 til, 2 fon, reload persistence, nom/draft saqlanishi, 320/390/768/1280px besh tugmali navigatsiya tekshiriladi. `npm test` display storage va lug‘at to‘liqligini ham tekshiradi.

## Umumiy reyting va admin panel

Natijalar → **Umumiy reyting**; Profil → **Online hisob va reyting**. Email login, rozilik bilan public nickname, haftalik/all-time top50 va o‘z o‘rni, server hisoblaydigan +50 daily/+20 bir martalik starter dars XP qo‘shildi. Admin panel faqat DB’da egasi bergan rol uchun ochiladi: ishtirokchilar, yashirish/bloklash va sababli audit. Avvalgi XP va lug‘at o‘zgarmaydi, eski lokal ballar ishonchli manba deb olinib import qilinmaydi.

**Ulanish holati:** egasi umumiy bazani yaratib SQL’ni bajardi; Project URL va ommaviy publishable key frontend konfiguratsiyasiga ulandi. Haqiqiy signup/login va admin rolini berish hali tekshirilishi kerak. Ishga tushirishning to‘liq yo‘riqnomasi: [`supabase/README.md`](supabase/README.md). SQL: `supabase/migrations/202610240001_rankings.sql`. Project URL va public publishable/anon key Pages build’ga berilishi, egasining user ID’si `rank_admins`ga kiritilishi kerak. Maxfiy service-role key frontendga kerak emas va qo‘yilmaydi. Konfiguratsiyasiz app soxta ranking o‘rniga “baza ulanmagan” holatini ko‘rsatadi. Live voice speaking/matchmaking bu bosqichga kirmaydi.

### Alohida admin sahifasi

Profil → Online hisob → Admin panelni ochish endi `src/screens/AdminScreen.tsx` alohida sahifasiga olib o‘tadi. Profil kartasi ichida panel render qilinmaydi. Sahifada Profilga qaytish tugmasi mavjud; pastki beshta asosiy bo‘lim o‘zgarmagan. Session/admin roli yo‘qolsa panel unmount bo‘ladi va ma’lumot so‘ralmaydi; DB RPC himoyasi avvalgidek qoladi. Admin sahifasi app ichidagi alohida destination, yangi public admin ro‘yxatdan o‘tishi yoki alohida login emas.

## Visual refresh

`src/components/FeatureHero.tsx` — Expo LinearGradient va React Native View’lardan tayyorlangan navy/lime/lavender sarlavha bloki va dekorativ ovoz to‘lqini (live audio yoki reyting statistikasi emas). Welcome’da boshlash tugmasi endi yuqorida. Login desktopda ikki ustun, telefonda bitta ustun; focus holati, email/lock ikonkalar va parolni ko‘rsatish/yashirish tugmasi mavjud. `Button` primary/secondary/ghost variantlari muhim va yordamchi amallarni farqlaydi. Today, Learn, Results va alohida Admin sahifasida shu vizual til ishlatiladi. Light/dark, uz/ru/en, auth/XP/saqlash qoidalari o‘zgarmagan. Illustratsiyalar statik, autoplay/animatsiya va tashqi rasm xizmati kerak emas.

### Product-focused design

- `src/components/WelcomeLanding.tsx`: responsive product entry with a real first-lesson preview (Prepare / Speak / Reflect), honest course scope, and expandable account/privacy/AI FAQ. Preview interactions never write learner progress or start recording.
- `src/components/PageHeader.tsx`: compact internal workspace headings; decorative marketing heroes no longer repeat on study screens.
- Today prioritizes the daily task and answer. Optional timer/recorder tools can be expanded, and the guided-lesson action opens the existing course. Account entry explains precisely what is shared across devices versus local-only.
- All new interface copy is available in Uzbek, Russian and English. Existing exercises remain English.
- Optional browser smoke test: `node scripts/check-landing.cjs` against a production export on port 8080 (same Playwright/Chromium setup as the other browser scripts).

### AI conversation (web voice beta)

`AI ustoz → AI conversation` provides three situations (everyday life, travel, interview), up to six learner turns, reviewed dictation and browser speech playback. The prepared opening is explicitly marked; subsequent replies use Gemini via the existing protected `/feedback` endpoint with `mode: "conversation"`. Existing writing feedback remains available. No XP, permanent chat history, realtime audio streaming, pronunciation scoring, new paid APIs or automatic retries are added.

Two separate consents cover conversation-text transmission and browser voice services. Browser speech recognition/voices may rely on vendor network services; LevelUp sends text plus bounded history to Gemini, never raw microphone audio. In manual mode text can be reviewed before sending; hands-free mode automatically sends recognized speech after the microphone turn ends. Unsupported devices can type. Leaving the AI tab aborts pending conversation requests and stops microphone/playback. Real microphone permissions, recognition accuracy, mobile browser compatibility and device voice quality require testing on the user's actual device; browser integration tests mock these services.

Deploy **both** the Pages frontend and updated Render backend from the working branch. `/health` includes `capabilities: ["feedback", "conversation"]` on the updated API. The existing exact-origin, Turnstile action `feedback`, per-minute and daily free-tier limits cover both modes. Render is configured for this branch in `render.yaml`; actual live backend rollout depends on its deployment configuration/status.

Optional mocked UI test: `node scripts/check-conversation.cjs` (production web export on port 8080, Playwright/Chromium as above). Tests dictation/playback wiring, context, consent, quota errors preserving draft, topic reset, navigation cleanup, legacy feedback and responsive layout. Provider adapter and HTTP validation tests run with `node --test server/*.test.mjs` without live API keys.


### Hands-free voice conversation

In `AI ustoz → AI conversation`, accept text/voice consents and press **Start conversation**. The prepared opening is spoken, then the browser listens. Final recognized speech is automatically sent once recognition ends (no Send press); the AI reply is spoken and listening resumes. Recognition is off while AI audio plays to avoid recording its own reply. Both speech-recognition and speech-synthesis support are required; manual dictation/text remains available otherwise.

**End conversation**, navigation, component unmount, browser-tab hiding and consent revocation cancel recognition, playback and the current HTTP request. Generation guards prevent delayed speech callbacks from restarting a stopped session. Silence, speech errors, stalled speech/verification and API failures stop rather than retry automatically. The existing six-turn cap and protected per-turn Turnstile/free-tier quotas remain. Playback/listening/verification have bounded wait times; there is no realtime audio streaming, interruption/barge-in, persistent recording or new paid provider.

Privacy notice explicitly discloses automatic transmission and nearby speech risk. Device/browser vendor speech services can process audio/text. Real microphone recognition, permission and playback on mobile devices still require physical-device QA. Mocked integration: `node scripts/check-handsfree.cjs` tests the six-turn loop, no listening during AI playback, consent, silence/denial, late callbacks after stop, hidden-tab/navigation stop, quota failure without retry, verification wait and cancellation while waiting for the API at 320/390/1280px.

### Recognition reliability fixes

Browser recognition now shows cumulative interim text while speaking, processes every result segment with `resultIndex`, and commits a transcript once per microphone turn (instead of appending repeated snapshots). Manual dictation preserves the text that was already in the input. A 2.2-second gap in recognition updates requests a turn end; a 1.2-second fallback commits the latest interim text if the browser fails to emit final/onend events. Recognition is bounded to 30 seconds per turn; a microphone-start event must arrive within 8 seconds. Service/permission failures preserve visible partial text without automatically submitting it. Empty turns report no speech rather than silently failing.

Hands-free status distinguishes opening the microphone from actual listening. Live transcript, specific speech errors, API errors and an optional **Finish my turn** fallback appear in the call panel, not only below the full history. Transcription remains browser/vendor-dependent and English (`en-US`), not a guaranteed recorder or server-side speech model. Device/network accuracy still requires physical-device testing.

Regression script: `node scripts/check-recognition.cjs` against the export on port 8080. Simulates interim corrections, multiple cumulative segments, missing end/final events, manual text preservation, silence-driven auto-send, service errors and a missing microphone-start event. Existing manual-conversation and hands-free scripts remain valid.

### Speaking Studio learning loop

The AI tutor now connects **Prepare → Speak → Reflect → Repeat**: six goal-driven situations, profile-based A1–B2 practice selection, relaxed/normal TTS and adjustable thinking pause, prepared hints and examples, direct phrase saving to the real vocabulary notebook, and evidence-only session metrics. The review action transfers learner text to the existing consent-gated AI feedback workflow instead of silently making another provider request. See `docs/speaking-product-review.md` for official product references, implementation decisions and explicit limits.

New UI/domain files: `SpeakingPreparation.tsx`, `SpeakingReview.tsx`, `src/domain/speaking.ts`. Optional browser integration: `node scripts/check-speaking-studio.cjs` against port 8080. This verifies scenario/config changes, hints without network submission, notebook persistence after reload and review handoff without an automatic request. Existing hands-free/recognition/mobile/display checks remain applicable. Daily-practice timer and voice-recorder lifecycle safeguards were also strengthened.

### AI assistant, IELTS and daily workout

- AI tutor now has four internal modes: AI assistant, AI conversation, IELTS Speaking and text feedback. Hidden modes retain drafts but cannot keep listening or sending requests.
- IELTS includes Parts 1/2/3, three labelled task packs, official-source links, Part 2 preparation/long-turn timers, optional dictation/recording and consent-gated AI review. Original LevelUp questions are distinguished from the short IELTS.org sample excerpts.
- Today now offers warm-up → daily answer → idea stretch, with local extra-step persistence and unchanged daily XP/ranking rules. An optimized AI-generated illustration replaces decorative clutter.
- See `docs/ielts-assistant-workout.md` for attribution, data/retention boundaries and deployment requirements. Optional browser QA: `node scripts/check-ielts-workout.cjs` against the export on port 8080. The updated Render backend is required for the new `assistant` mode.

### First-visit conversion

- A first-time visitor gets the best supported browser locale automatically (English fallback), with always-visible EN/RU/UZ controls before onboarding; an explicit choice is remembered.
- The welcome product preview includes real browser speech playback and an optional, 30-second, consent-gated speech-to-text tryout. Text is not automatically uploaded, stored or band-scored. A disclosed, deterministic text-only reflection points to one concrete next step.
- Run `node scripts/check-landing-demo.cjs` against the exported site on 8080 to verify onboarding locales, browser voice consent, live transcript and no direct API calls at 320/390/1280px.

### Global first-visit experience

- New visitors now get browser-locale-aware EN/RU/UZ selection (English fallback), plus a visible first-screen language switcher.
- The welcome lesson offers a real 30-second before-onboarding voice/text tryout, sample speech playback and local text-only next-step reflection. Voice recording requires clear browser-provider consent; it never calls AI or persists/sends the sample automatically.
- See `docs/global-first-impression.md` for limits, privacy and research notes. Browser QA: `node scripts/check-landing-demo.cjs`.

### IELTS visual cards

- Three original optimized editorial images now make IELTS topic selection visual (personal objects, learning, and places/community). Today’s IELTS entry also carries a places image. Each card distinguishes the official sample pack from LevelUp-authored practice; images are not official IELTS material. See `docs/global-first-impression.md`.
