# LevelUp — foydali mahsulotga yo‘l

## Kim uchun?
O‘zbek tilida yo‘l-yo‘riqni tushunadigan, inglizcha gapirishga qiynalayotgan A1–B2 o‘rganuvchilar. Dastlabki foydalanish: telefondagi HTTPS web-sayt, 5–10 daqiqalik individual mashq.

## Asosiy va’da
Har safar foydalanuvchi: (1) nima haqida gapirishini biladi, (2) gapirib ko‘radi, (3) o‘zini eshitadi, (4) bitta aniq yaxshilash nuqtasini tanlaydi. XP — yordamchi motivatsiya; haqiqiy natija yoki til darajasi o‘lchovi emas.

## Hozir qo‘shilgan poydevor
- A1–B2, har darajada 2 tadan starter dars: maqsad, 3 tayanch ibora, o‘zbekcha maslahat, prompt, misol, follow-up va refleksiya.
- Dars bajarilgan belgisi lokal saqlanadi. Matn drafti reload’da tiklanmaydi.
- HTTPS web’da mikrofon yozuvi va qayta eshitish. 2 daqiqa cheklovi, ruxsat/xato holatlari, sahifadan chiqishda mikrofonni to‘xtatish. Audio vaqtinchalik va tashqi serverga yuborilmaydi.
- AI coach beta sahifasi va serveri. Rozilik, serverda tekshiriladigan Turnstile, provider kaliti faqat serverda, vaqt/so‘rov limiti. Backend ulanishi va provider billing hali zarur.

## Birinchi foydalanuvchi yo‘li
1. Profile’da ism va real haftalik maqsadni tanlaydi.
2. Learn’da mos daraja va darsni tanlaydi.
3. Promptni o‘qib, iboralar bilan o‘z fikrini tayyorlaydi.
4. Mikrofon ruxsatini berib gapiradi, to‘xtatadi va qayta eshitadi.
5. Aytgan fikrini matn shaklida yozadi. Namunani o‘z javobi bilan solishtiradi.
6. O‘zini tekshirib darsni belgilaydi. Xohlasa AI sahifasiga javobini olib o‘tadi.
7. Yangi so‘zni Words’da saqlaydi, Review’da takrorlaydi.

## Keyingi bosqichlar — bajarildi deb ko‘rsatilmaydi
### 1. Yopiq AI pilot
- HTTPS backendni joylashtirish; Gemini kalitini hosting secrets’da saqlash, Google loyihasi Free Tier’da va billingsiz ekanini tekshirish.
- AI javobining muvaffaqiyat/xato/limit holatlarini real xizmat bilan tekshirish.
- 5–10 sinovchi; yangi web frontend kod so‘ramaydi, Turnstile ishlatadi. Bu ommaviy mahsulotning hisob/autentifikatsiya tizimi emas.
- Limitlar hozir bitta process xotirasida: restart’da reset bo‘ladi. Ommaviy reliz oldidan persistent quota va foydalanuvchi autentifikatsiyasi kerak.

### 2. Kontent sifati
- Ingliz tili o‘qituvchisiga darslarni tekshirtirish.
- Har daraja uchun kamida 10 sifatli dars va amaliy mavzular: ish, suhbat, xizmatlar, safar.
- Daraja diagnostikasi; CEFR belgilari hozir taxminiy yo‘nalish, tasdiqlangan baho emas.
- Izohli correction misollari va sekin/normal namunaviy audio (litsenziyalangan manba bilan).

### 3. Ishonchlilik va maxfiylik
- iPhone Safari va Android Chrome’da: ruxsat berish/rad etish, boshqa tabga o‘tish, ekran qulfi, audio ijrosi, internet uzilishi, qayta yuklashni tekshirish.
- Native Expo audio, transkripsiya va talaffuz tahlili alohida ish; hozir yo‘q.
- Matn draftlarini saqlash, eksport/import, hisob va cloud sync oldidan aniq saqlash/o‘chirish siyosati.
- Backend abuse himoyasi, persistent rate limits, hisob bo‘yicha quota, audit va provider ma’lumot siyosatini foydalanuvchiga ko‘rsatish.
- Audit ogohlantirishlarini rejalashtirilgan SDK yangilanishi bilan bartaraf qilish.

### 4. Foydani o‘lchash
Analytics hozir ulanmagan; maxfiy yozuvlarni to‘plamasdan, rozilik bilan o‘lchash kerak.
- 5 sinovchidan kamida 4 tasi yordamsiz birinchi darsni yakunlay oladimi?
- Foydalanuvchi 1 ta konkret yaxshilash nuqtasini ayta oladimi?
- Bir haftada kamida 3 marta qaytish; qaytmaganlarda sababni suhbat orqali o‘rganish.
- AI noto‘g‘ri correction bergan holatlarni o‘qituvchi bilan tahlil qilish.
- Ishonchlilik: draft yo‘qolishi, ikki marta XP berilishi, mikrofonning yashirin qolishi — relizni to‘xtatuvchi xatolar.

## Release darvozasi
TypeScript + testlar + build → haqiqiy telefon sinovi → 5 kishilik pilot → kontent/AI tekshiruvi → keng ommaga chiqarish. Hozirgi holat — starter beta, to‘liq sertifikatlangan speaking kursi yoki tayyor ommaviy AI mahsuloti emas.
