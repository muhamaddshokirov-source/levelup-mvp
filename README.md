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
