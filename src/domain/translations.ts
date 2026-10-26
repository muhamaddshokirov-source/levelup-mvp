export type Language = 'uz' | 'ru' | 'en';
// UI copy only. English exercises, user text and AI responses are never translated.
let english = `Choose your language|Tilni tanlang|Выберите язык
Try it|Sinab ko‘ring|Попробовать
Hear the question|Savolni tinglang|Прослушать вопрос
Hear question|Savolni tinglang|Прослушать вопрос
Browser voice · Sound varies by device|Brauzer ovozi · Ovoz qurilmaga qarab farq qiladi|Голос браузера · Звучание зависит от устройства
30-SECOND SAMPLE|30 SONIYALIK NAMUNA|ПРОБА · 30 СЕКУНД
Try one answer. No account needed.|Bitta javobni sinab ko‘ring. Hisob kerak emas.|Попробуйте ответить. Аккаунт не нужен.
Illustration of a microphone and notebook|Mikrofon va daftar tasviri|Иллюстрация микрофона и блокнота
Consent to browser speech processing|Brauzerda nutqni qayta ishlashga rozilik|Согласие на обработку речи браузером
Browser provider may process voice. Nothing is sent to LevelUp.|Brauzer nutq xizmati ovozni qayta ishlashi mumkin. LevelUp’ga hech narsa yuborilmaydi.|Поставщик браузерной речи может обрабатывать голос. В LevelUp ничего не отправляется.
Finish answer|Javobni tugatish|Завершить ответ
Speak for 30 seconds|30 soniya gapiring|Говорите 30 секунд
Try a speaking answer|Speaking javobini sinab ko‘rish|Пробный устный ответ
Speak or type your answer…|Gapiring yoki javobingizni yozing…|Произнесите или напишите ответ…
QUICK REFLECTION · TEXT ONLY|TEZKOR TAHLIL · FAQAT MATN|КРАТКИЙ РАЗБОР · ТОЛЬКО ТЕКСТ
words|so‘z|слов
Try adding one more detail.|Yana bitta tafsilot qo‘shing.|Добавьте ещё одну подробность.
You gave a reason. Try adding one specific example.|Sabab keltirdingiz. Bitta aniq misol qo‘shing.|Вы привели причину. Добавьте конкретный пример.
Try adding a reason with “because”.|“Because” bilan sabab qo‘shib ko‘ring.|Попробуйте добавить причину со словом «because».
Demo stays in this browser tab until you leave. No AI score or automatic upload.|Demo sahifadan chiqmaguningizcha shu brauzerda qoladi. AI bahosi yo‘q va avtomatik yuborilmaydi.|Демо остаётся в этой вкладке, пока вы её не закроете. Без оценки ИИ и автоматической отправки.
Microphone access was denied. Allow microphone access in browser settings, then try again.|Mikrofonga ruxsat berilmadi. Brauzer sozlamalarida mikrofonga ruxsat bering va qayta urinib ko‘ring.|Нет доступа к микрофону. Разрешите доступ в настройках браузера и попробуйте снова.
No microphone was found. Check your microphone connection and browser settings.|Mikrofon topilmadi. Ulanishi va brauzer sozlamalarini tekshiring.|Микрофон не найден. Проверьте подключение и настройки браузера.
The browser speech service could not connect. Check your internet connection or type your reply.|Brauzer nutq xizmatiga ulanilmadi. Internetni tekshiring yoki javobni yozing.|Не удалось подключиться к службе речи браузера. Проверьте интернет или напишите ответ.
Speech recognition did not start. Check microphone permission or use a supported browser.|Nutqni aniqlash boshlanmadi. Mikrofonga ruxsatni yoki qo‘llab-quvvatlanadigan brauzerni tekshiring.|Распознавание речи не запустилось. Проверьте доступ к микрофону или используйте поддерживаемый браузер.
No speech detected. Start again when you are ready.|Nutq aniqlanmadi. Tayyor bo‘lsangiz qayta boshlang.|Речь не обнаружена. Начните снова, когда будете готовы.
Voice input failed. Check microphone permission or type your reply.|Ovozli kiritish bajarilmadi. Mikrofonga ruxsatni tekshiring yoki javobni yozing.|Не удалось распознать речь. Проверьте доступ к микрофону или напишите ответ.
/ 3 activities|/ 3 mashq|/ 3 задания
Your six-minute speaking routine.|Olti daqiqalik speaking mashg‘ulotingiz.|Ваша шестиминутная разговорная тренировка.
Your speaking space.|Sizning speaking maydoningiz.|Ваше пространство для разговорной практики.
One place for guided help, real conversation and IELTS practice.|Yordam, haqiqiy suhbat va IELTS mashqlari — bir joyda.|Подсказки, общение и практика IELTS — в одном месте.
AI assistant|AI yordamchi|ИИ-помощник
AI ASSISTANT|AI YORDAMCHI|ИИ-ПОМОЩНИК
IELTS speaking|IELTS speaking|IELTS Speaking
Your speaking assistant|Speaking yordamchingiz|Ваш помощник по разговорной практике
Ask for a short plan, an explanation or a better way to express an idea. The assistant only sees what you send, not your microphone or private notebook.|Qisqa reja, tushuntirish yoki fikringizni yaxshiroq ifodalash uchun yordam so‘rang. Yordamchi faqat yuborgan matningizni ko‘radi, mikrofon yoki shaxsiy lug‘atingizni emas.|Попросите короткий план, объяснение или помощь с формулировкой. Помощник видит только отправленный текст, не микрофон и не личный словарь.
Build a 10-minute speaking plan|10 daqiqalik speaking rejasi|План разговорной практики на 10 минут
Help me develop an IELTS answer|IELTS javobini kengaytirishga yordam|Помогите развить ответ IELTS
Explain a speaking mistake|Speaking xatosini tushuntirish|Объясните ошибку в речи
Consent to assistant text|AI yordamchiga matn yuborish roziligi|Согласие на отправку текста помощнику
I agree to send my messages to the server and Google Gemini. Do not include private information. Free-tier data may be used to improve Google products. AI can make mistakes.|Xabarlarim server va Google Gemini xizmatiga yuborilishiga roziman. Maxfiy ma’lumot kiritmang. Bepul rejimdagi ma’lumotlar Google mahsulotlarini yaxshilashda ishlatilishi mumkin. AI xato qilishi mumkin.|Я согласен отправлять сообщения серверу и Google Gemini. Не вводите личные данные. Данные бесплатного тарифа могут использоваться для улучшения продуктов Google. ИИ может ошибаться.
This session is complete. Start a new chat to continue.|Bu suhbat tugadi. Davom etish uchun yangi chat boshlang.|Сеанс завершён. Начните новый чат, чтобы продолжить.
New assistant chat|Yangi yordamchi chati|Новый чат с помощником
Ask the AI assistant|AI yordamchiga savol|Вопрос ИИ-помощнику
What would you like help with?|Nimada yordam kerak?|С чем вам помочь?
Ask assistant|Yordamchidan so‘rash|Спросить помощника
Short text-coaching sessions, not unlimited chat. Free limits apply. Messages disappear after reload. No official IELTS scores.|Qisqa matnli maslahatlar, cheksiz chat emas. Bepul limitlar bor. Sahifa yangilanganda xabarlar o‘chadi. Rasmiy IELTS bahosi berilmaydi.|Короткие консультации, не безлимитный чат. Действуют бесплатные лимиты. После перезагрузки сообщения исчезают. Официальные баллы IELTS не выставляются.
The assistant server needs its latest update. Please try again later.|Yordamchi serverini so‘nggi versiyaga yangilash kerak. Keyinroq qayta urining.|Сервер помощника нужно обновить. Попробуйте позже.
Request stopped. Your draft is kept.|So‘rov to‘xtadi. Qoralamangiz saqlandi.|Запрос остановлен. Черновик сохранён.
Review your answer|Javobingizni tahlil qiling|Разберите свой ответ
Text-based coaching. No official score or pronunciation assessment.|Matn bo‘yicha tavsiyalar. Rasmiy ball yoki talaffuz bahosi berilmaydi.|Рекомендации по тексту. Без официальной оценки и анализа произношения.
IELTS Speaking practice|IELTS Speaking mashqlari|Практика IELTS Speaking
Practise each part with a clear task, notes and an optional timer. This is independent practice, not an official test or a band-score prediction.|Har bir qismni aniq vazifa, qaydlar va ixtiyoriy taymer bilan mashq qiling. Bu mustaqil mashq, rasmiy test yoki band bashorati emas.|Практикуйте каждую часть с понятным заданием, заметками и таймером. Это самостоятельная практика, не официальный тест и не прогноз балла.
Based on IELTS.org sample tasks. Some wording is adapted for context.|IELTS.org namunalariga asoslangan. Ayrim so‘zlar kontekst uchun moslashtirilgan.|На основе образцов IELTS.org. Часть формулировок адаптирована для контекста.
Original LevelUp questions using the IELTS task format. Not official exam questions.|IELTS formatidagi LevelUp savollari. Rasmiy imtihon savollari emas.|Собственные вопросы LevelUp в формате IELTS. Это не официальные экзаменационные вопросы.
Open the official sample source|Rasmiy namuna manbasini ochish|Открыть официальный источник
Part 1 · Introduction|Part 1 · Tanishuv|Часть 1 · Знакомство
Part 2 · Long turn|Part 2 · Uzun javob|Часть 2 · Развёрнутый ответ
Part 3 · Discussion|Part 3 · Muhokama|Часть 3 · Обсуждение
Answer directly, add a reason, then a personal detail.|Aniq javob bering, sabab va shaxsiy tafsilot qo‘shing.|Ответьте прямо, добавьте причину и личную деталь.
Make brief notes, then connect your ideas into a short story.|Qisqa qaydlar yozing, keyin fikrlarni kichik hikoyaga bog‘lang.|Сделайте короткие заметки, затем свяжите мысли в небольшой рассказ.
State a view, explain it, give an example and consider another perspective.|Fikr bildiring, tushuntiring, misol keltiring va boshqa qarashni ham hisobga oling.|Выскажите мнение, объясните его, приведите пример и рассмотрите другую точку зрения.
Preparation · 1 minute|Tayyorgarlik · 1 daqiqa|Подготовка · 1 минута
Time complete · Your answer is kept|Vaqt tugadi · Javob saqlanib turibdi|Время истекло · Ответ сохранён
Long turn · Up to 2 minutes|Uzun javob · 2 daqiqagacha|Развёрнутый ответ · До 2 минут
Optional per-question practice timer|Har savol uchun ixtiyoriy mashq taymeri|Необязательный таймер на вопрос
Pause timer|Taymerni pauza qilish|Приостановить таймер
Start preparation|Tayyorgarlikni boshlash|Начать подготовку
Start speaking timer|Gapirish taymerini boshlash|Запустить таймер ответа
IELTS preparation notes|IELTS tayyorgarlik qaydlari|Заметки для подготовки IELTS
Keywords only — not a full script…|Faqat kalit so‘zlar — to‘liq matn emas…|Только ключевые слова — не полный текст…
Ready · Begin long turn|Tayyorman · Uzun javobni boshlash|Готов · Начать развёрнутый ответ
Consent to IELTS browser voice|IELTS brauzer ovoziga rozilik|Согласие на голосовые службы IELTS
Enable browser speech services. Audio or text may be processed by the browser provider. This page does not automatically send your answers to Gemini.|Brauzer ovoz xizmatlarini yoqish. Audio yoki matn brauzer xizmati tomonidan qayta ishlanishi mumkin. Bu sahifa javoblarni Gemini xizmatiga avtomatik yubormaydi.|Включить голосовые службы браузера. Аудио или текст может обрабатываться поставщиком браузера. Страница не отправляет ответы в Gemini автоматически.
Hear the question|Savolni tinglash|Прослушать вопрос
Finish dictation|Ovozdan yozishni tugatish|Завершить диктовку
Dictate my answer|Javobimni aytib yozish|Продиктовать ответ
IELTS answer|IELTS javobi|Ответ IELTS
Your answer or live dictation…|Javobingiz yoki jonli ovozdan matn…|Ваш ответ или распознанная речь…
Review this IELTS answer with AI|IELTS javobini AI bilan tahlil qilish|Разобрать ответ IELTS с ИИ
Next question|Keyingi savol|Следующий вопрос
Hide local recorder|Mahalliy yozuv vositasini yashirish|Скрыть локальную запись
Record and listen back|Yozib, qayta tinglash|Записать и прослушать
Drafts and notes stay in this screen until reload. Audio is temporary. No XP or official band is awarded here. Browser dictation can stop early; finish and restart it to continue your answer.|Qoralama va qaydlar sahifa yangilanguncha shu bo‘limda qoladi. Audio vaqtinchalik. XP yoki rasmiy band berilmaydi. Ovozdan yozish erta to‘xtashi mumkin; javobni davom ettirish uchun qayta yoqing.|Черновики и заметки остаются до перезагрузки. Аудио временное. XP и официальный балл не начисляются. Диктовка может завершиться раньше; перезапустите её, чтобы продолжить ответ.
YOUR DAILY SPEAKING WORKOUT|KUNLIK SPEAKING MASHG‘ULOTI|ЕЖЕДНЕВНАЯ РАЗГОВОРНАЯ ТРЕНИРОВКА
A small routine. A stronger voice.|Kichik mashg‘ulot. Dadilroq ovoz.|Небольшая тренировка. Более уверенная речь.
Warm up, develop an answer and stretch your ideas. A complete speaking routine, not just another question.|Qizishing, javobni rivojlantiring va fikrni kengaytiring. Shunchaki bitta savol emas, to‘liq speaking mashg‘uloti.|Разомнитесь, развейте ответ и расширьте мысли. Полная разговорная тренировка, а не просто ещё один вопрос.
Start today's workout|Bugungi mashg‘ulotni boshlash|Начать сегодняшнюю тренировку
Ask my assistant|Yordamchimdan so‘rash|Спросить моего помощника
Warm up|Qizish mashqi|Разминка
1 min · Find your voice|1 daqiqa · Gapirishga kirishing|1 минута · Начните говорить
Daily speaking|Asosiy speaking|Основная практика
3 min · Build your answer|3 daqiqa · Javobni rivojlantiring|3 минуты · Развейте ответ
Go a little further|Fikrni kengaytirish|Развить мысль
2 min · Add depth|2 daqiqa · Chuqurroq fikrlang|2 минуты · Добавьте глубину
01 · WARM UP|01 · QIZISH|01 · РАЗМИНКА
Speak for 30–60 seconds. Keep going even if your sentences are simple. This step is self-reported and earns no extra XP.|30–60 soniya gapiring. Gaplaringiz oddiy bo‘lsa ham davom eting. Bu bosqichni o‘zingiz belgilaysiz, qo‘shimcha XP berilmaydi.|Говорите 30–60 секунд, даже простыми предложениями. Этот этап вы отмечаете сами, дополнительный XP не начисляется.
Warm-up complete · Continue|Qizish bajarilgan · Davom etish|Разминка завершена · Продолжить
I warmed up · Continue|Qizishdim · Davom etish|Размялся · Продолжить
Saved · 50 XP|Saqlandi · 50 XP|Сохранено · 50 XP
Try this connector|Shu bog‘lovchini sinang|Попробуйте эту связку
50 XP saved once for today. Your warm-up and stretch remain available.|Bugun uchun 50 XP bir marta saqlandi. Qizish va kengaytirish mashqlari ochiq.|50 XP за сегодня сохранены один раз. Разминка и расширение ответа остаются доступны.
Continue to the stretch|Kengaytirish mashqiga o‘tish|Перейти к расширению ответа
Speak first, then capture your answer. Add a reason and a specific example.|Avval gapiring, keyin javobni yozing. Sabab va aniq misol qo‘shing.|Сначала произнесите, затем запишите ответ. Добавьте причину и конкретный пример.
Start with your idea, then add a reason…|Fikringizdan boshlang, keyin sabab qo‘shing…|Начните с мысли, затем добавьте причину…
Your answer stays on this device. AI review is optional.|Javob shu qurilmada qoladi. AI tahlili ixtiyoriy.|Ответ остаётся на этом устройстве. Разбор ИИ необязателен.
03 · STRETCH YOUR IDEAS|03 · FIKRLARNI KENGAYTIRING|03 · РАЗВЕЙТЕ МЫСЛИ
Use your daily answer as a starting point. Write at least eight English words. This extra practice is saved locally without additional XP.|Asosiy javobdan boshlang. Kamida sakkizta inglizcha so‘z yozing. Qo‘shimcha mashq qurilmada saqlanadi, qo‘shimcha XP berilmaydi.|Оттолкнитесь от основного ответа. Напишите минимум восемь английских слов. Дополнительная практика сохраняется локально, без нового XP.
Stretch answer|Kengaytirilgan javob|Расширенный ответ
Add another perspective or example…|Boshqa qarash yoki misol qo‘shing…|Добавьте другую точку зрения или пример…
Update stretch answer|Kengaytirilgan javobni yangilash|Обновить расширенный ответ
Finish stretch|Kengaytirish mashqini tugatish|Завершить расширение ответа
Stretch saved. Your ideas went a little further.|Kengaytirilgan javob saqlandi. Fikrlaringiz yana rivojlandi.|Расширенный ответ сохранён. Ваши мысли стали глубже.
Try loading workout again|Mashg‘ulotni qayta yuklash|Загрузить тренировку снова
Completed daily answers · Monday–Sunday|Tugallangan kunlik javoblar · Dushanba–yakshanba|Завершённые дневные ответы · Понедельник–воскресенье
Train for IELTS|IELTS uchun mashq|Подготовка к IELTS
Part 1 interviews, Part 2 cue cards and Part 3 discussion. Clear tasks, notes and timers.|Part 1 suhbat, Part 2 cue card va Part 3 muhokama. Aniq vazifalar, qaydlar va taymerlar.|Интервью Part 1, карточки Part 2 и дискуссия Part 3. Понятные задания, заметки и таймеры.
Open IELTS practice|IELTS mashqlarini ochish|Открыть практику IELTS
Workout progress could not be loaded. Existing data was not overwritten.|Mashg‘ulot natijalari yuklanmadi. Eski ma’lumotlar o‘zgartirilmadi.|Не удалось загрузить прогресс. Существующие данные не перезаписаны.
Workout progress could not be saved. Please try again.|Mashg‘ulot natijalari saqlanmadi. Qayta urining.|Не удалось сохранить прогресс. Попробуйте снова.
Practice level|Mashq darajasi|Уровень практики
Enable text and voice permissions in the preparation panel before starting. Manual text practice needs only text consent.|Boshlashdan oldin tayyorgarlik panelida matn va ovoz ruxsatlarini yoqing. Matnli mashq uchun faqat matn roziligi kerak.|Перед началом включите разрешения на текст и голос в панели подготовки. Для текстовой практики достаточно согласия на отправку текста.
Hide practice settings|Mashq sozlamalarini yashirish|Скрыть настройки практики
Practice settings|Mashq sozlamalari|Настройки практики
Relaxed voice|Sekin ovoz|Медленный голос
Normal voice|Odatiy ovoz|Обычный голос
Longer thinking pause|Uzunroq o‘ylash pauzasi|Длинная пауза для размышления
Standard thinking pause|Odatiy o‘ylash pauzasi|Обычная пауза для размышления
Text and browser voice services enabled. You control when a session starts.|Matn va brauzer ovoz xizmatlari yoqilgan. Suhbat qachon boshlanishini o‘zingiz boshqarasiz.|Текстовые и голосовые службы включены. Вы управляете началом сеанса.
Review permissions|Ruxsatlarni ko‘rish|Просмотреть разрешения
Hide permissions|Ruxsatlarni yashirish|Скрыть разрешения
LEVELUP SPEAKING STUDIO|LEVELUP SPEAKING STUDIYASI|РАЗГОВОРНАЯ СТУДИЯ LEVELUP
A little preparation. A better conversation.|Yaxshi tayyorgarlik. Yaxshiroq suhbat.|Немного подготовки. Более уверенный разговор.
Choose a mission, practise with support, then turn your own words into your next lesson.|Vazifa tanlang, yordam bilan mashq qiling va aytgan gaplaringizni keyingi darsga aylantiring.|Выберите задачу, практикуйтесь с поддержкой и превратите свои слова в следующий урок.
01 · Prepare your conversation|01 · Suhbatga tayyorlaning|01 · Подготовьтесь к разговору
Choose a real situation, set your pace, then speak with a clear goal.|Hayotiy vaziyat tanlang, tezlikni sozlang va aniq maqsad bilan gapiring.|Выберите жизненную ситуацию, настройте темп и говорите с понятной целью.
At a café|Kafeda|В кафе
Work meeting|Ish yig‘ilishi|Рабочая встреча
Opinion practice|Fikr bildirish mashqi|Практика аргументации
Fewer situations|Kamroq vaziyatlar|Меньше ситуаций
More situations|Yana vaziyatlar|Больше ситуаций
Changing the situation starts a new unsaved conversation.|Vaziyatni o‘zgartirsangiz, saqlanmaydigan yangi suhbat boshlanadi.|Смена ситуации начинает новый несохраняемый разговор.
YOUR MISSION|VAZIFANGIZ|ВАША ЗАДАЧА
Practice level · Self-selected, not an assessment|Mashq darajasi · O‘zingiz tanlaysiz, bu baholash emas|Уровень практики · Вы выбираете сами, это не оценка
Voice pace: relaxed|Ovoz tezligi: sekin|Темп голоса: медленный
Voice pace: normal|Ovoz tezligi: odatiy|Темп голоса: обычный
Thinking pause: longer|O‘ylash uchun pauza: uzunroq|Пауза для размышления: длиннее
Thinking pause: standard|O‘ylash uchun pauza: odatiy|Пауза для размышления: обычная
Hide speaking support|Gapirish yordamini yashirish|Скрыть подсказки
Help me respond|Javob berishga yordam|Помогите ответить
PREPARED GUIDANCE · NOT AN AI REPLY|TAYYOR KO‘RSATMA · AI JAVOBI EMAS|ГОТОВАЯ ПОДСКАЗКА · НЕ ОТВЕТ ИИ
Use this example as a draft|Namunani qoralamaga qo‘yish|Использовать пример как черновик
Adapt the example to your own experience. Nothing is sent automatically from this button.|Namunani o‘z tajribangizga moslang. Bu tugma hech narsani avtomatik yubormaydi.|Адаптируйте пример под свой опыт. Эта кнопка ничего не отправляет автоматически.
Saved in your notebook|Lug‘atingizga saqlangan|Сохранено в словаре
Save phrase to notebook|Iborani lug‘atga saqlash|Сохранить фразу в словарь
02 · SPEAK WITH PURPOSE|02 · MAQSAD BILAN GAPIRING|02 · ГОВОРИТЕ С ЦЕЛЬЮ
Pause for a hint|Yordam uchun tanaffus|Пауза для подсказки
03 · Reflect and improve|03 · Tahlil va yaxshilash|03 · Разбор и улучшение
Replies completed|Yuborilgan javoblar|Отправлено ответов
Words practised|Mashq qilingan so‘zlar|Слов в практике
Words per reply|Har javobdagi so‘zlar|Слов в ответе
Did you give a reason, use a concrete example and ask a question? Choose one thing to do better in a second attempt.|Sabab aytdingizmi, aniq misol keltirdingizmi va savol berdingizmi? Keyingi urinishda yaxshilash uchun bitta jihat tanlang.|Вы объяснили причину, привели пример и задали вопрос? Выберите один момент для улучшения во второй попытке.
These are counts from your submitted text, not pronunciation, fluency or CEFR scores. Dictation mistakes can affect the text.|Bu yuborilgan matn hisobi, talaffuz, ravonlik yoki CEFR bahosi emas. Ovozni tanishdagi xatolar matnga ta’sir qilishi mumkin.|Это подсчёты по отправленному тексту, не оценка произношения, беглости или CEFR. Ошибки распознавания могут влиять на текст.
Get AI feedback on my conversation|Suhbatimni AI bilan tahlil qilish|Получить разбор разговора от ИИ
At least 20 words. Opens the text review for your approval; nothing is sent until you confirm there.|Kamida 20 so‘z. Matnni ko‘rib tasdiqlash uchun tahlil bo‘limi ochiladi; u yerda tasdiqlamaguncha hech narsa yuborilmaydi.|Минимум 20 слов. Откроется текст для проверки; ничего не отправится, пока вы не подтвердите там.
Try this situation again|Shu vaziyatni qayta mashq qilish|Повторить эту ситуацию
Opening microphone…|Mikrofon ochilmoqda…|Включение микрофона…
Your recognized words|Tanilgan gaplaringiz|Распознанная речь
Finish my turn|Gapimni tugatdim|Я закончил говорить
Microphone access was denied. Allow microphone access in browser settings, then try again.|Mikrofon ruxsati rad etildi. Brauzer sozlamalarida mikrofonga ruxsat berib, qayta urining.|Доступ к микрофону запрещён. Разрешите его в настройках браузера и попробуйте снова.
No microphone was found. Check your microphone connection and browser settings.|Mikrofon topilmadi. Mikrofon ulanishi va brauzer sozlamalarini tekshiring.|Микрофон не найден. Проверьте подключение и настройки браузера.
The browser speech service could not connect. Check your internet connection or type your reply.|Brauzer ovozni tanish xizmatiga ulana olmadi. Internetni tekshiring yoki javobni yozing.|Не удалось подключиться к службе распознавания речи браузера. Проверьте интернет или напишите ответ.
Speech recognition did not start. Check microphone permission or use a supported browser.|Ovozni tanish ishga tushmadi. Mikrofon ruxsatini tekshiring yoki mos brauzerdan foydalaning.|Распознавание речи не запустилось. Проверьте разрешение микрофона или используйте совместимый браузер.
Start a hands-free conversation, or dictate and send each reply manually. The AI responds in English and asks the next question.|Avtomatik suhbatni boshlang yoki har bir javobni aytib, qo‘lda yuboring. AI inglizcha javob beradi va keyingi savolni so‘raydi.|Начните автоматический разговор или диктуйте и отправляйте каждый ответ вручную. ИИ отвечает по-английски и задаёт следующий вопрос.
Hands-free conversation|Avtomatik ovozli suhbat|Голосовой разговор без кнопок
Start once. The AI speaks, then listens and sends your recognized words automatically when you finish. Wait while the AI speaks. This is not a real-time call; pauses and free usage limits apply.|Bir marta boshlang. AI gapiradi, keyin tinglaydi va gapingiz tugagach tanilgan matnni avtomatik yuboradi. AI gapirayotganda kuting. Bu real vaqtli qo‘ng‘iroq emas; pauzalar va bepul limitlar bor.|Нажмите один раз. ИИ говорит, затем слушает и автоматически отправляет распознанную речь, когда вы закончите. Подождите, пока ИИ говорит. Это не звонок в реальном времени; действуют паузы и бесплатные лимиты.
Only start in a quiet place. Nearby speech may also be recognized and sent. Leaving this page or hiding the browser tab ends the session.|Faqat tinch joyda boshlang. Atrofdagi gaplar ham tanilib yuborilishi mumkin. Sahifadan chiqish yoki brauzer oynasini yashirish suhbatni tugatadi.|Начинайте в тихом месте. Речь рядом тоже может распознаваться и отправляться. Уход со страницы или скрытие вкладки завершает сеанс.
AI is speaking…|AI gapirmoqda…|ИИ говорит…
Listening — your turn|Tinglanmoqda — navbat sizda|Слушаю — ваша очередь
AI is thinking…|AI o‘ylamoqda…|ИИ думает…
Waiting for security verification…|Xavfsizlik tekshiruvi kutilmoqda…|Ожидание проверки безопасности…
Ready when you are|Tayyor bo‘lsangiz, boshlang|Начните, когда будете готовы
End conversation|Suhbatni tugatish|Завершить разговор
Start conversation|Suhbatni boshlash|Начать разговор
No speech detected. Start again when you are ready.|Ovoz aniqlanmadi. Tayyor bo‘lganda qayta boshlang.|Речь не обнаружена. Начните снова, когда будете готовы.
Voice playback failed. Start again or use the manual conversation.|Ovozli o‘qish ishlamadi. Qayta boshlang yoki qo‘lda suhbatni davom ettiring.|Не удалось озвучить ответ. Начните снова или продолжите вручную.
Voice session paused. Start again or continue manually.|Ovozli suhbat to‘xtatildi. Qayta boshlang yoki qo‘lda davom eting.|Голосовой сеанс остановлен. Начните снова или продолжите вручную.
Enable browser voice services. Voice recognition and playback may send audio or text to your browser or device provider. LevelUp sends recognized text to Gemini, not microphone audio. In hands-free mode, recognized speech is sent automatically.|Brauzer ovoz xizmatlarini yoqish. Ovozni tanish va o‘qish audio yoki matnni brauzer yoki qurilma xizmatiga yuborishi mumkin. LevelUp Gemini xizmatiga audio emas, tanilgan matnni yuboradi. Avtomatik rejimda tanilgan gaplar avtomatik yuboriladi.|Включить голосовые службы браузера. Распознавание и озвучивание могут отправлять аудио или текст поставщику браузера или устройства. LevelUp отправляет Gemini распознанный текст, не аудио микрофона. В автоматическом режиме речь отправляется автоматически.
The conversation server is being updated. Please try again shortly.|Suhbat serveri yangilanmoqda. Birozdan keyin qayta urinib ko‘ring.|Сервер разговоров обновляется. Попробуйте чуть позже.
AI conversation|AI bilan suhbat|Разговор с ИИ
Writing feedback|Matn tahlili|Разбор текста
Talk with your AI partner|AI hamrohingiz bilan gaplashing|Поговорите с ИИ
Speak in English, check your transcript, then send. The AI responds to your words and asks the next question. This is turn-by-turn practice, not a live phone call.|Inglizcha gapiring, tanilgan matnni tekshiring va yuboring. AI javob beradi va keyingi savolni so‘raydi. Bu navbatma-navbat mashq, jonli qo‘ng‘iroq emas.|Говорите по-английски, проверьте распознанный текст и отправьте. ИИ ответит и задаст следующий вопрос. Это поочерёдная практика, не живой звонок.
Everyday life|Kundalik hayot|Повседневная жизнь
Travel|Sayohat|Путешествия
Job interview|Ish suhbati|Собеседование
Consent to AI conversation|AI suhbatiga rozilik|Согласие на разговор с ИИ
Consent to browser voice services|Brauzer ovoz xizmatlariga rozilik|Согласие на голосовые службы браузера
I agree to send this conversation text to the server and Google Gemini. Do not include private details. Free-tier data may be used to improve Google products. AI can make mistakes.|Suhbat matnini server va Google Gemini xizmatiga yuborishga roziman. Maxfiy ma’lumot kiritmang. Bepul rejimdagi ma’lumotlar Google mahsulotlarini yaxshilashda ishlatilishi mumkin. AI xato qilishi mumkin.|Я согласен отправить текст разговора серверу и Google Gemini. Не сообщайте личные данные. Данные бесплатного тарифа могут использоваться для улучшения продуктов Google. ИИ может ошибаться.
Enable browser voice services. Voice recognition and playback may send audio or text to your browser or device provider. LevelUp sends only the reviewed text to Gemini, not microphone audio.|Brauzer ovoz xizmatlarini yoqish. Ovozni tanish va o‘qish audio yoki matnni brauzer yoki qurilma xizmatiga yuborishi mumkin. LevelUp Gemini xizmatiga mikrofon audiosini emas, tekshirilgan matnnigina yuboradi.|Включить голосовые службы браузера. Распознавание и озвучивание могут отправлять аудио или текст поставщику браузера или устройства. LevelUp отправляет Gemini только проверенный текст, не звук микрофона.
Voice input is not available in this browser. Try a supported browser such as Chrome, or type your reply below.|Bu brauzerda ovozdan matn olish mavjud emas. Chrome kabi mos brauzerni sinang yoki javobingizni yozing.|Голосовой ввод недоступен в этом браузере. Попробуйте совместимый браузер, например Chrome, или напишите ответ.
The first question is a prepared starter. Later replies come from AI. This conversation is not saved after a reload and does not award XP. No pronunciation score.|Birinchi savol oldindan tayyorlangan. Keyingi javoblar AIdan keladi. Suhbat sahifa yangilanganda saqlanmaydi va XP bermaydi. Talaffuz baholanmaydi.|Первый вопрос подготовлен заранее. Дальнейшие ответы генерирует ИИ. Разговор не сохраняется после перезагрузки и не даёт XP. Произношение не оценивается.
Conversation|Suhbat|Разговор
YOU|SIZ|ВЫ
STARTER QUESTION|BOSHLANG‘ICH SAVOL|НАЧАЛЬНЫЙ ВОПРОС
AI PARTNER|AI HAMROH|ИИ-СОБЕСЕДНИК
Listen|Tinglash|Прослушать
AI is preparing a reply…|AI javob tayyorlamoqda…|ИИ готовит ответ…
Practice complete. Start a fresh conversation when you are ready.|Mashq tugadi. Tayyor bo‘lsangiz, yangi suhbat boshlang.|Практика завершена. Начните новый разговор, когда будете готовы.
New conversation|Yangi suhbat|Новый разговор
Conversation reply|Suhbatga javob|Ответ в разговоре
Type or dictate your English reply…|Inglizcha javobingizni yozing yoki ayting…|Напишите или продиктуйте ответ по-английски…
Stop microphone|Mikrofonni to‘xtatish|Остановить микрофон
Speak your reply|Javobingizni ayting|Произнесите ответ
Stop playback|O‘qishni to‘xtatish|Остановить озвучивание
Read AI replies aloud|AI javoblarini ovozli o‘qish|Озвучивать ответы ИИ
Waiting for AI…|AI kutilmoqda…|Ожидание ИИ…
Send reply|Javobni yuborish|Отправить ответ
AI conversation unavailable. Please try again.|AI suhbati mavjud emas. Qayta urinib ko‘ring.|Разговор с ИИ недоступен. Попробуйте ещё раз.
Free AI limits apply. Each reply needs verification; the free server may take a moment to wake up.|Bepul AI limitlari amal qiladi. Har bir javob uchun tekshiruv kerak; bepul server uyg‘onishi biroz vaqt olishi mumkin.|Действуют лимиты бесплатного ИИ. Для каждого ответа нужна проверка; бесплатному серверу может понадобиться время на запуск.
Voice input failed. Check microphone permission or type your reply.|Ovozni tanib bo‘lmadi. Mikrofon ruxsatini tekshiring yoki javobni yozing.|Не удалось распознать речь. Проверьте доступ к микрофону или напишите ответ.
AI returned an empty reply. Please try again.|AI javobi bo‘sh keldi. Qayta urinib ko‘ring.|ИИ вернул пустой ответ. Попробуйте ещё раз.
Request stopped. Your reply is still here; try again when ready.|So‘rov to‘xtadi. Javobingiz saqlanib turibdi; tayyor bo‘lganda qayta urining.|Запрос остановлен. Ваш ответ остался здесь; попробуйте снова, когда будете готовы.
Your ranked identity, across devices. Your everyday practice stays on this device.|Reyting hisobingiz turli qurilmalarda ishlaydi. Kundalik mashqlar shu qurilmada qoladi.|Рейтинговый аккаунт доступен на разных устройствах. Повседневная практика остаётся на этом устройстве.
One ranked identity|Yagona reyting hisobi|Единый рейтинговый аккаунт
Keep your nickname and ranked XP when you sign in elsewhere.|Boshqa qurilmada kirganda ham taxallus va reyting XPsi saqlanadi.|Псевдоним и рейтинговый XP сохраняются при входе на другом устройстве.
Public only by choice|Faqat xohishingiz bilan ochiq|Публичность только по выбору
Choose whether to join. Your email never appears in the ranking.|Qo‘shilish ixtiyoriy. Emailingiz reytingda ko‘rinmaydi.|Участие добровольное. Почта не отображается в рейтинге.
Less hesitation.|Kamroq ikkilanish.|Меньше сомнений.
More conversation.|Ko‘proq suhbat.|Больше общения.
A clear plan, practical speaking tasks and feedback you can act on. Build an English habit that fits your day.|Aniq reja, amaliy gapirish mashqlari va foydali tavsiyalar. Kuningizga mos ingliz tili odatini yarating.|Понятный план, разговорные задания и полезные рекомендации. Создайте привычку, которая впишется в ваш день.
2-minute setup · No payment card · Start without an account|2 daqiqada sozlash · Karta kerak emas · Hisobsiz boshlash|Настройка за 2 минуты · Без карты · Можно без аккаунта
Choose your starting level|Boshlang‘ich darajani tanlang|Выберите начальный уровень
Guided starter lessons|Yo‘naltirilgan boshlang‘ich darslar|Вводные уроки с подсказками
A realistic daily start|Har kun uchun qulay boshlanish|Реалистичный ежедневный старт
INSIDE LEVELUP|LEVELUP ICHIDA|ВНУТРИ LEVELUP
A real lesson. Try the preview.|Haqiqiy dars. Namunasini sinab ko‘ring.|Настоящий урок. Попробуйте пример.
Prepare|Tayyorlanish|Подготовка
Speak|Gapirish|Речь
Reflect|Tahlil|Разбор
USEFUL PHRASES|FOYDALI IBORALAR|ПОЛЕЗНЫЕ ФРАЗЫ
YOUR SPEAKING TASK|GAPIRISH VAZIFANGIZ|ВАШЕ РАЗГОВОРНОЕ ЗАДАНИЕ
Read it aloud. This preview does not record you.|Ovoz chiqarib o‘qing. Bu namuna ovozingizni yozmaydi.|Прочитайте вслух. Этот пример не записывает ваш голос.
MODEL ANSWER|NAMUNAVIY JAVOB|ПРИМЕР ОТВЕТА
An example, not the only right answer.|Bu namuna, yagona to‘g‘ri javob emas.|Это пример, а не единственный верный ответ.
Preview only · Progress is not saved here|Faqat namuna · Bu yerda natija saqlanmaydi|Только пример · Прогресс здесь не сохраняется
BUILT AROUND YOUR PRACTICE|MASHQLARINGIZ UCHUN YARATILGAN|ВСЁ ДЛЯ ВАШЕЙ ПРАКТИКИ
Not another tab to open. A routine to return to.|Yana bir sahifa emas. Qaytishga arziydigan odat.|Не ещё одна вкладка. Привычка, к которой хочется вернуться.
A plan that fits|Sizga mos reja|План под вас
Choose your goal, starting level and available time. Get a practical four-week starting path.|Maqsad, boshlang‘ich daraja va vaqtingizni tanlang. To‘rt haftalik amaliy yo‘lni oling.|Выберите цель, уровень и время. Получите практичный план на четыре недели.
Practice with direction|Aniq yo‘nalishda mashq|Практика с ориентиром
Use useful phrases, speak aloud and listen back. Improve one thing at a time.|Foydali iboralar bilan gapiring va yozuvni tinglang. Har safar bir jihatni yaxshilang.|Используйте полезные фразы, говорите и слушайте запись. Улучшайте что-то одно за раз.
Progress you can revisit|Natijalarga qaytish imkoniyati|Прогресс, к которому можно вернуться
Keep a practice journal, review your words and optionally join the shared ranking.|Mashq kundaligini yuriting, so‘zlarni takrorlang va xohlasangiz umumiy reytingga qo‘shiling.|Ведите дневник, повторяйте слова и по желанию участвуйте в рейтинге.
GOOD TO KNOW|BILIB QO‘YISH FOYDALI|ПОЛЕЗНО ЗНАТЬ
Clear from the start.|Boshidanoq tushunarli.|Всё понятно с самого начала.
Starter practice, not a full CEFR course. No level guarantees, no hidden promise.|Bu boshlang‘ich mashqlar, to‘liq CEFR kursi emas. Daraja kafolati yoki yashirin va’dalar yo‘q.|Это вводная практика, не полный курс CEFR. Без гарантий уровня и скрытых обещаний.
Do I need an account?|Hisob ochishim kerakmi?|Нужен ли аккаунт?
Core practice works without an account. Sign in only when you want to join the shared ranking.|Asosiy mashqlar hisobsiz ishlaydi. Umumiy reytingga qo‘shilish uchun hisobga kiring.|Основные упражнения работают без аккаунта. Вход нужен для общего рейтинга.
What is saved, and where?|Nima va qayerda saqlanadi?|Что и где сохраняется?
Your plan, notebook and journal stay on this device. Audio is temporary. Ranked XP is stored in the shared database after you opt in.|Reja, lug‘at va kundalik shu qurilmada saqlanadi. Audio vaqtinchalik. Roziligingizdan keyin reyting XPsi umumiy bazada saqlanadi.|План, словарь и дневник хранятся на этом устройстве. Аудио временное. После согласия рейтинговый XP хранится в общей базе.
How does AI feedback work?|AI tavsiyalari qanday ishlaydi?|Как работают рекомендации ИИ?
AI is optional and limited. Text is sent only with your consent. It can make mistakes and does not assess pronunciation.|AI ixtiyoriy va cheklangan. Matn faqat roziligingiz bilan yuboriladi. U xato qilishi mumkin va talaffuzni baholamaydi.|ИИ необязателен и ограничен. Текст отправляется только с вашего согласия. Он может ошибаться и не оценивает произношение.
Speaking tools · Timer & recorder|Gapirish vositalari · Taymer va ovoz yozish|Инструменты речи · Таймер и запись
Prefer a guided lesson?|Yo‘naltirilgan darsdan boshlaysizmi?|Хотите начать с урока?
Start with phrases and a model answer before your daily practice.|Kundalik mashqdan oldin iboralar va namunaviy javobdan boshlang.|Перед ежедневной практикой изучите фразы и пример ответа.
Explore the lessons|Darslarni ko‘rish|Посмотреть уроки
current level|joriy bosqich|текущий уровень
Your voice. Your next level.|Sizning ovozingiz. Yangi bosqichingiz.|Ваш голос. Ваш новый уровень.
Small steps. Stronger voice.|Kichik qadamlar. Dadilroq ovoz.|Маленькие шаги. Увереннее голос.
YOUR NEXT CHAPTER|YANGI BOSQICHINGIZ|ВАША СЛЕДУЮЩАЯ ГЛАВА
FIND YOUR VOICE|O‘Z OVOZINGIZNI TOPING|НАЙДИТЕ СВОЙ ГОЛОС
Good to have you back.|Qaytganingizdan xursandmiz.|Рады вашему возвращению.
A new habit starts with you.|Yangi odat sizdan boshlanadi.|Новая привычка начинается с вас.
One account. Your practice, your place in the ranking. Keep showing up for yourself.|Bitta hisob. Mashqlaringiz va reytingdagi o‘rningiz. O‘zingiz uchun harakatdan to‘xtamang.|Один аккаунт. Ваша практика и место в рейтинге. Продолжайте стараться для себя.
Signed in|Hisobga kirilgan|Вход выполнен
Show password|Parolni ko‘rsatish|Показать пароль
Hide password|Parolni yashirish|Скрыть пароль
Back to profile|Profilga qaytish|Назад в профиль
ADMINISTRATION|BOSHQARUV|АДМИНИСТРИРОВАНИЕ
Manage ranking members and review moderation history.|Reyting ishtirokchilarini boshqaring va moderatsiya tarixini ko‘ring.|Управляйте участниками рейтинга и просматривайте историю модерации.
Checking administrator access…|Admin ruxsati tekshirilmoqda…|Проверка прав администратора…
AI tutor|AI ustoz|ИИ
Hide my plan|Rejani yashirish|Скрыть мой план
My plan|Rejam|Мой план
Today|Bugun|Сегодня
Learn|Darslar|Уроки
Progress|Natijalar|Прогресс
Words|Lug‘at|Словарь
Review|Takrorlash|Повторение
Profile|Profil|Профиль
More|Yana|Ещё
Close|Yopish|Закрыть
Appearance & language|Ko‘rinish va til|Оформление и язык
Theme|Fon|Тема
Light|Och|Светлая
Dark|Qorong‘i|Тёмная
Language|Til|Язык
Saved on this device|Shu qurilmada saqlanadi|Сохраняется на этом устройстве
Could not save. Try again.|Saqlanmadi. Qayta urinib ko‘ring.|Не удалось сохранить. Попробуйте снова.
Display settings could not load.|Ko‘rinish sozlamalari yuklanmadi.|Не удалось загрузить настройки оформления.
Exercises stay in English. AI replies keep their original language.|Dars mashqlari inglizcha qoladi. AI javoblari asl tilida ko‘rsatiladi.|Упражнения остаются на английском. Ответы ИИ показаны на исходном языке.
Your personal space|Shaxsiy sahifangiz|Ваше личное пространство
Try again|Qayta urinish|Попробовать снова
MAKE ROOM FOR YOUR GROWTH|O‘SISH UCHUN JOY AJRATING|МЕСТО ДЛЯ ВАШЕГО РОСТА
Your journey. Your pace|Sizning yo‘lingiz. Sizning sur’atingiz|Ваш путь. Ваш темп
A little more you. A habit that fits your life.|Hayotingizga mos kichik odat.|Привычка, которая подходит вашей жизни.
Your next chapter|Keyingi bosqichingiz|Ваша следующая глава
Level|Daraja|Уровень
· Growing every day|· Har kuni rivojlanish|· Рост каждый день
total XP|jami XP|всего XP
practices|mashg‘ulot|занятий
A goal you can grow into|Sizga mos maqsad|Цель, к которой можно расти
Consistency doesn’t mean doing everything. It means choosing a small step, and coming back.|Muntazamlik — hammasini qilish emas, kichik qadamni qayta-qayta tashlash.|Регулярность — не делать всё сразу, а возвращаться к небольшим шагам.
practices this week · Saved goal|bu haftadagi mashqlar · Saqlangan maqsad|занятий за неделю · Сохранённая цель
The person behind the progress|Natijalar ortidagi inson|Человек за результатами
What should we call you?|Sizni qanday chaqiraylik?|Как к вам обращаться?
Display name|Ko‘rinadigan ism|Отображаемое имя
Your name|Ismingiz|Ваше имя
/30 · Optional. Only stored on this device.|/30 · Ixtiyoriy. Faqat shu qurilmada saqlanadi.|/30 · Необязательно. Хранится только на этом устройстве.
Choose your color|Rangingizni tanlang|Выберите свой цвет
Practice, on your terms|O‘zingizga mos mashq|Занятия на ваших условиях
Weekly practice goal|Haftalik mashq maqsadi|Цель занятий на неделю
Monday–Sunday. Your mission card updates when you save. XP stays at 50 per completed day.|Dushanba–yakshanba. Saqlanganda haftalik maqsad yangilanadi. Har bajarilgan kun uchun 50 XP.|Понедельник–воскресенье. Цель обновится после сохранения. За выполненный день — 50 XP.
Default speaking warm-up|Boshlang‘ich gapirish taymeri|Таймер речевой разминки
Applies to the Today timer after saving. You can still pick a different duration before each practice.|Saqlangandan keyin Bugun taymeriga qo‘llanadi. Har mashq oldidan vaqtni o‘zgartirish mumkin.|После сохранения применяется к таймеру «Сегодня». Перед занятием время можно изменить.
All set. Make yourself at home.|Tayyor. O‘zingizni erkin his qiling.|Всё готово. Чувствуйте себя как дома.
Saving preferences…|Sozlamalar saqlanmoqda…|Сохранение настроек…
Save my preferences|Sozlamalarni saqlash|Сохранить настройки
Preferences up to date|Sozlamalar saqlangan|Настройки сохранены
Restore default preferences|Dastlabki sozlamalarni qaytarish|Восстановить настройки по умолчанию
A private space to practice|Shaxsiy mashq joyi|Личное пространство для занятий
Your profile and notebook stay on this device. Optional web recordings stay in this page’s memory. AI text is sent to your chosen backend only after you consent.|Profil va lug‘at shu qurilmada qoladi. Audio sahifa xotirasida turadi. AI matni faqat rozilikdan keyin serverga yuboriladi.|Профиль и словарь остаются на устройстве. Аудио хранится в памяти страницы. Текст для ИИ отправляется на сервер только с вашего согласия.
Local storage is not encrypted. Clearing app or browser data removes your history. Restoring preferences does not delete your practice progress.|Mahalliy xotira shifrlanmagan. Brauzer ma’lumotlarini tozalash tarixni o‘chiradi. Sozlamalarni tiklash mashq natijalarini o‘chirmaydi.|Локальные данные не зашифрованы. Очистка данных браузера удалит историю. Сброс настроек не удаляет результаты занятий.
LevelUp 1.0 · Built for small, meaningful steps. Today feedback uses demo rules. The separate AI coach requires a backend and consent; neither assesses pronunciation.|LevelUp 1.0 · Kichik, mazmunli qadamlar. Bugun bo‘limi demo qoidalardan foydalanadi. AI ustoz server va rozilikni talab qiladi. Hech biri talaffuzni baholamaydi.|LevelUp 1.0 · Небольшие осмысленные шаги. В разделе «Сегодня» действуют демо-правила. Для ИИ нужны сервер и согласие. Произношение не оценивается.
LOOK HOW FAR YOU’VE COME|QANCHA YO‘L BOSGANINGIZNI KO‘RING|ПОСМОТРИТЕ, КАК ДАЛЕКО ВЫ ПРОДВИНУЛИСЬ
Your effort adds up|Harakatingiz natija beradi|Ваши усилия складываются
Every answer is another step toward a more confident you.|Har javob ishonch sari yana bir qadam.|Каждый ответ — ещё один шаг к уверенности.
Total XP|Jami XP|Всего XP
Day streak|Ketma-ket kunlar|Дней подряд
Practices|Mashg‘ulotlar|Занятия
Words written|Yozilgan so‘zlar|Написано слов
XP to level|XP keyingi darajagacha|XP до уровня
Each daily challenge earns 50 XP. Every 250 XP unlocks the next level.|Har kunlik mashq uchun 50 XP. Har 250 XP yangi darajani ochadi.|За ежедневное задание — 50 XP. Каждые 250 XP открывают следующий уровень.
Building your rhythm|O‘z ritmingizni toping|Создавайте свой ритм
Your last 7 days · A little consistency goes a long way.|So‘nggi 7 kun · Muntazamlik katta yordam beradi.|Последние 7 дней · Немного регулярности даёт многое.
Your milestones|Yutuqlaringiz|Ваши достижения
Best streak:|Eng uzun seriya:|Лучшая серия:
days|kun|дн.
sec|soniya|сек.
s|s|с
Unlocked · Yours to keep|Ochildi · Sizniki|Открыто · Ваше навсегда
Practice journal|Mashqlar kundaligi|Дневник занятий
completed|bajarilgan|выполнено
not completed|bajarilmagan|не выполнено
Search practice journal|Kundalikdan qidirish|Поиск в дневнике
Search your answers, questions or dates…|Javob, savol yoki sanadan qidiring…|Поиск по ответам, вопросам или датам…
No matching moments yet|Mos yozuv topilmadi|Совпадений пока нет
Try a different word or a date like 2026-10.|Boshqa so‘z yoki 2026-10 kabi sana kiriting.|Попробуйте другое слово или дату, например 2026-10.
Clear search|Qidiruvni tozalash|Очистить поиск
Your story starts with one answer.|Hikoyangiz bitta javobdan boshlanadi.|Ваша история начинается с одного ответа.
Finish your first daily challenge to grow your journal.|Kundalikni boshlash uchun birinchi kunlik mashqni tugating.|Завершите первое ежедневное задание, чтобы начать дневник.
Start today’s practice|Bugungi mashqni boshlash|Начать сегодняшнее занятие
Show less ↑|Kamroq ko‘rsatish ↑|Свернуть ↑
Read full response ↓|Javobni to‘liq o‘qish ↓|Читать полный ответ ↓
words · Daily challenge completed|so‘z · Kunlik mashq bajarildi|слов · Ежедневное задание выполнено
Getting your words ready|So‘zlar tayyorlanmoqda|Готовим ваши слова
A LITTLE RECALL. A LASTING CONNECTION.|BIR OZ TAKRORLASH. MUSTAHKAM XOTIRA.|НЕМНОГО ПОВТОРЕНИЯ. ПРОЧНЫЕ СВЯЗИ.
Make your words stick|So‘zlarni yodda saqlang|Запоминайте слова надолго
Think of the meaning. Reveal it. Be honest with yourself. That’s how it grows.|Ma’nosini eslang. Javobni oching. O‘zingizni halol baholang.|Вспомните значение. Откройте ответ. Оцените себя честно.
Your pocket-sized review|Qisqa takrorlash|Компактное повторение
Choose your collection. We’ll shuffle up to 20 words into a quick, self-paced session.|To‘plamni tanlang. 20 tagacha so‘zni aralashtirib, qulay sur’atda takrorlaysiz.|Выберите подборку. Мы перемешаем до 20 слов для повторения в вашем темпе.
words ready to revisit|ta so‘z takrorlashga tayyor|слов готовы к повторению
No words in this collection. Choose another filter or add a new discovery.|Bu to‘plamda so‘z yo‘q. Boshqa filtr tanlang yoki so‘z qo‘shing.|В этой подборке нет слов. Выберите другой фильтр или добавьте слово.
Your first flashcard starts with a word. Add one to your notebook, then come back here.|Birinchi kartochka so‘zdan boshlanadi. Lug‘atga so‘z qo‘shib, qayting.|Первая карточка начинается со слова. Добавьте его в словарь и возвращайтесь.
Open my notebook|Lug‘atni ochish|Открыть словарь
Recall before you reveal.|Ochishdan oldin eslab ko‘ring.|Вспомните, прежде чем открыть.
Say the meaning out loud. Even a small attempt strengthens the connection.|Ma’nosini ovoz chiqarib ayting. Har bir urinish xotirani mustahkamlaydi.|Назовите значение вслух. Даже небольшая попытка укрепляет память.
“Got it” means you remembered. “Practice again” collects words for another round.|“Esladim” — eslaganingizni bildiradi. “Yana mashq” so‘zni keyingi davraga qo‘shadi.|«Помню» означает, что вы вспомнили. «Ещё раз» собирает слова для нового круга.
Self-check only · No XP awarded. Your notebook’s learned labels don’t change. Active review sessions are not saved after reloading.|Faqat o‘z-o‘zini tekshirish · XP berilmaydi. Lug‘atdagi belgilar o‘zgarmaydi. Sahifa yangilansa takrorlash sessiyasi saqlanmaydi.|Только самопроверка · Без XP. Метки в словаре не меняются. После перезагрузки сессия повторения не сохраняется.
CARD|KARTOCHKA|КАРТОЧКА
OF|/|ИЗ
End review|Takrorlashni tugatish|Завершить повторение
THE CONNECTION|BOG‘LANISH|СВЯЗЬ
WHAT DOES THIS MEAN?|BU NIMA DEGANI?|ЧТО ЭТО ЗНАЧИТ?
Take a breath. Try to recall the meaning|Nafas oling. Ma’nosini eslang|Вдохните. Попробуйте вспомнить значение
or use it in a sentence.|yoki gapda ishlating.|или используйте в предложении.
Reveal meaning|Ma’nosini ochish|Показать значение
Practice again|Yana mashq|Ещё раз
Got it|Esladim|Помню
recalled ·|eslandi ·|вспомнили ·
to revisit · No rush. This is your pace.|qayta ko‘riladi · Shoshilmang. Bu sizning sur’atingiz.|на повторение · Не спешите. Это ваш темп.
REVIEW COMPLETE|TAKRORLASH TUGADI|ПОВТОРЕНИЕ ЗАВЕРШЕНО
Another connection made.|Yana bir so‘z mustahkamlandi.|Ещё одна связь укреплена.
You revisited|Siz takrorladingiz:|Вы повторили
words. Every attempt counts — even the ones that need another look.|ta so‘z. Har bir urinish muhim — yana takrorlash kerak bo‘lsa ham.|слов. Каждая попытка важна — даже если нужно повторить снова.
recalled|eslandi|вспомнили
to revisit|takrorlash kerak|на повторение
Choose another collection|Boshqa to‘plam tanlash|Выбрать другую подборку
Back to my notebook →|Lug‘atga qaytish →|Назад в словарь →
YOUR DAILY DOSE OF CONFIDENCE|HAR KUNGI ISHONCH QADAMI|ВАША ЕЖЕДНЕВНАЯ ПОРЦИЯ УВЕРЕННОСТИ
Small steps.|Kichik qadamlar.|Маленькие шаги.
Stronger voice|Dadilroq ovoz|Увереннее голос
A few minutes of English. A little better every day.|Bir necha daqiqa ingliz tili. Har kuni ozgina yaxshiroq.|Несколько минут английского. Каждый день немного лучше.
A fresh opportunity|Yangi imkoniyat|Новая возможность
day streak|kunlik seriya|дней подряд
current level|joriy daraja|текущий уровень
TODAY’S CHALLENGE|BUGUNGI MASHQ|СЕГОДНЯШНЕЕ ЗАДАНИЕ
· DAILY PRACTICE|· KUNLIK MASHQ|· ЕЖЕДНЕВНАЯ ПРАКТИКА
2–3 min practice|2–3 daqiqalik mashq|Практика на 2–3 минуты
All levels welcome|Barcha darajalar uchun|Для любого уровня
Daily challenge complete!|Kunlik mashq bajarildi!|Ежедневное задание выполнено!
YOUR NEXT STEP|KEYINGI QADAMINGIZ|ВАШ СЛЕДУЮЩИЙ ШАГ
Demo feedback · Text-based rules, not AI or pronunciation assessment.|Demo tavsiya · Matn qoidalari, AI yoki talaffuz bahosi emas.|Демо-отзыв · Текстовые правила, не ИИ и не оценка произношения.
YOUR RESPONSE ·|JAVOBINGIZ ·|ВАШ ОТВЕТ ·
WORDS|SO‘Z|СЛОВ
See your progress|Natijalarni ko‘rish|Посмотреть прогресс
50 XP saved. Come back tomorrow for a new challenge.|50 XP saqlandi. Ertaga yangi mashq uchun qayting.|50 XP сохранено. Возвращайтесь завтра за новым заданием.
Make it your own|O‘zingizga moslang|Сделайте по-своему
English practice|Ingliz tili mashqi|Практика английского
Say your answer out loud, then write it below.|Javobingizni ovoz chiqarib ayting, keyin pastga yozing.|Произнесите ответ вслух, затем запишите ниже.
Your English answer|Inglizcha javobingiz|Ваш ответ на английском
I would start my perfect day with…|Inglizcha javobingizni yozing…|Напишите ответ на английском…
/ 20 words minimum|/ kamida 20 so‘z|/ минимум 20 слов
Saving your progress…|Natijangiz saqlanmoqda…|Сохранение прогресса…
Finish practice|Mashqni tugatish|Завершить занятие
Just for you. Your answers stay on this device.|Faqat siz uchun. Javoblar shu qurilmada qoladi.|Только для вас. Ответы остаются на устройстве.
This week’s mission|Bu haftadagi maqsad|Цель этой недели
Mission complete! Every extra day is a little victory.|Maqsad bajarildi! Har qo‘shimcha kun — kichik g‘alaba.|Цель выполнена! Каждый дополнительный день — маленькая победа.
Small moments for yourself. Build a habit that sticks.|O‘zingiz uchun kichik vaqt. Mustahkam odat yarating.|Немного времени для себя. Создавайте устойчивую привычку.
Monday–Sunday · Resets each week|Dushanba–yakshanba · Har hafta yangilanadi|Понедельник–воскресенье · Обновляется каждую неделю
Your next level|Keyingi darajangiz|Ваш следующий уровень
The confidence builder|Ishonchni oshirish|Развиваем уверенность
Every practice is a promise|Har mashq — o‘zingizga bergan|Каждое занятие — обещание,
you keep to yourself.|va’dani bajarishdir.|которое вы выполняете для себя.
Progress, not perfection.|Mukammallik emas, rivojlanish.|Прогресс, а не совершенство.
Don’t wait for the perfect words. Speak slowly, stay curious, and let mistakes be part of the journey.|Mukammal so‘zlarni kutmang. Sekin gapiring, qiziqing va xatolarni yo‘lning bir qismi deb biling.|Не ждите идеальных слов. Говорите медленно, сохраняйте любопытство и разрешите себе ошибаться.
You’ve got this  ↗|Siz buni uddalaysiz ↗|У вас получится ↗
THE LEVELUP WAY|LEVELUP YO‘LI|ПУТЬ LEVELUP
Show up. Speak up. Level up.|Keling. Gapiring. Rivojlaning.|Приходите. Говорите. Растите.
One small habit. Endless possibilities.|Bitta kichik odat. Cheksiz imkoniyatlar.|Одна маленькая привычка. Безграничные возможности.
Word updated. Keep making it yours.|So‘z yangilandi. Mashq qilishda davom eting.|Слово обновлено. Продолжайте практику.
A new word, a new possibility. Saved!|Yangi so‘z — yangi imkoniyat. Saqlandi!|Новое слово — новая возможность. Сохранено!
Opening your notebook|Lug‘atingiz ochilmoqda|Открываем словарь
COLLECT WORDS. UNLOCK IDEAS.|SO‘Z YIG‘ING. FIKR OCHING.|СОБИРАЙТЕ СЛОВА. ОТКРЫВАЙТЕ ИДЕИ.
Words worth keeping|Eslab qolishga arzigulik so‘zlar|Слова, которые стоит сохранить
Your own little dictionary. Ready for your next conversation.|Keyingi suhbatingiz uchun shaxsiy lug‘atingiz.|Ваш личный словарь для следующего разговора.
Make it clearer|Aniqlik kiriting|Уточните
Catch a new word|Yangi so‘z qo‘shing|Поймайте новое слово
Save a word or phrase and give it a little context.|So‘z yoki iborani ma’nosi bilan saqlang.|Сохраните слово или фразу и добавьте контекст.
Word or phrase|So‘z yoki ibora|Слово или фраза
e.g. look forward to|Masalan: look forward to|Например: look forward to
Meaning|Ma’nosi|Значение
What does it mean to you?|Bu nima degani?|Что это значит?
Example sentence (optional)|Namuna gap (ixtiyoriy)|Пример предложения (необязательно)
Use it in a sentence of your own.|O‘zingiz gap tuzing.|Используйте в своём предложении.
Saving…|Saqlanmoqda…|Сохранение…
Save changes|O‘zgarishlarni saqlash|Сохранить изменения
Add to my notebook|Lug‘atga qo‘shish|Добавить в словарь
Cancel editing|Tahrirni bekor qilish|Отменить редактирование
Make the word your own.|So‘zni o‘zingizniki qiling.|Сделайте слово своим.
Try using a saved word in today’s speaking answer. A real sentence helps it stick.|Saqlangan so‘zni bugungi javobingizda ishlating. Haqiqiy gap yodda qolishga yordam beradi.|Используйте сохранённое слово в сегодняшнем ответе. Живое предложение помогает запомнить.
learned ·|o‘rganilgan ·|выучено ·
still growing|o‘rganilmoqda|изучается
Review my words|So‘zlarni takrorlash|Повторить слова
Your collection|To‘plamingiz|Ваша коллекция
words & phrases|so‘z va ibora|слов и фраз
Search vocabulary|Lug‘atdan qidirish|Поиск по словарю
Search words, meanings or examples…|So‘z, ma’no yoki misol qidiring…|Поиск слов, значений или примеров…
No words found here|So‘z topilmadi|Слова не найдены
Every word is a new beginning.|Har bir so‘z — yangi boshlanish.|Каждое слово — новое начало.
Try a different search or filter.|Boshqa so‘z yoki filtrni sinang.|Попробуйте другой запрос или фильтр.
Add your first word using the form. Your collection grows one discovery at a time.|Forma orqali birinchi so‘zingizni qo‘shing. To‘plamingiz asta-sekin o‘sadi.|Добавьте первое слово через форму. Коллекция растёт с каждым открытием.
Show all words|Barcha so‘zlar|Все слова
Learned|O‘rganilgan|Выучено
Learning|O‘rganilmoqda|Изучается
All|Hammasi|Все
Keep practicing|Mashq qilish|Продолжать учить
Mark as learned|O‘rganilgan deb belgilash|Отметить как выученное
Edit|Tahrirlash|Изменить
Delete|O‘chirish|Удалить
Back in your learning list.|O‘rganilayotganlar ro‘yxatiga qaytdi.|Слово вернулось в список изучения.
Look at you grow. Word marked as learned!|Ajoyib! So‘z o‘rganilgan deb belgilandi.|Отлично! Слово отмечено как выученное.
Remove “|O‘chirilsinmi: “|Удалить «
” from your notebook? This cannot be undone.|”? Buni qaytarib bo‘lmaydi.|» из словаря? Это действие нельзя отменить.
Remove word|So‘zni o‘chirish|Удалить слово
Word removed from your notebook.|So‘z lug‘atdan o‘chirildi.|Слово удалено из словаря.
Keep it|Qoldirish|Оставить
Only on this device · Your notebook is saved automatically after each change. Vocabulary does not award XP.|Faqat shu qurilmada · Har o‘zgarish avtomatik saqlanadi. Lug‘at uchun XP berilmaydi.|Только на этом устройстве · Изменения сохраняются автоматически. За словарь XP не начисляется.
You showed up. That matters.|Siz mashq qildingiz. Bu muhim.|Вы пришли. Это важно.
+50 XP earned|+50 XP olindi|Получено +50 XP
One more promise to yourself, kept.|O‘zingizga bergan yana bir va’da bajarildi.|Ещё одно обещание себе выполнено.
Find your flow|O‘z ritmingizni toping|Найдите свой ритм
An optional speaking warm-up. No recording — just you and your voice.|Ixtiyoriy gapirish mashqi. Yozib olinmaydi — faqat siz va ovozingiz.|Необязательная речевая разминка. Без записи — только вы и ваш голос.
Pause|Pauza|Пауза
Speak again|Yana gapirish|Говорить снова
Continue|Davom etish|Продолжить
Start speaking|Gapirishni boshlash|Начать говорить
Reset|Qayta boshlash|Сбросить
Nicely done. Take a breath, then capture your thoughts below.|Ajoyib. Nafas oling va fikrlaringizni pastga yozing.|Отлично. Вдохните и запишите свои мысли ниже.
Verification unavailable|Tekshiruv mavjud emas|Проверка недоступна
Practice question|Mashq savoli|Вопрос для практики
Your speaking question…|Speaking savolingiz…|Ваш вопрос для практики…
Answer for AI feedback|AI tavsiyasi uchun javob|Ответ для отзыва ИИ
Your English answer…|Inglizcha javobingiz…|Ваш ответ на английском…
Lesson answer|Dars javobi|Ответ к уроку
Write what you said…|Aytganlaringizni yozing…|Запишите то, что сказали…
Built for your next chapter.|Keyingi bosqichingiz uchun.|Для вашей следующей главы.
LEVELUP · A LITTLE BETTER, EVERY DAY|LEVELUP · HAR KUNI BIR OZ YAXSHIROQ|LEVELUP · КАЖДЫЙ ДЕНЬ НЕМНОГО ЛУЧШЕ
Welcome to LevelUp|LevelUp’ga xush kelibsiz|Добро пожаловать в LevelUp
Try loading again|Qayta yuklash|Загрузить снова
Open profile and settings|Profil va sozlamalarni ochish|Открыть профиль и настройки
Loading saved progress|Saqlangan natijalar yuklanmoqda|Загрузка сохранённого прогресса`;
let uzbek = `LEVELUP’GA XUSH KELIBSIZ|ДОБРО ПОЖАЛОВАТЬ В LEVELUP|WELCOME TO LEVELUP
Inglizcha gapirish.|Говорите по-английски.|Speak English.
Sizning sur’atingizda|В вашем темпе|At your own pace
Qayerdan boshlashni bilmayapsizmi? Maqsadingiz va vaqtingizga mos yo‘l tanlaymiz. Kichik, muntazam mashqlar bilan o‘z ovozingizga ishonch hosil qiling.|Не знаете, с чего начать? Подберём путь под вашу цель и время. Небольшие регулярные занятия помогут говорить увереннее.|Not sure where to start? We’ll find a path for your goals and time. Build confidence through small, regular practice.
LevelUp nima?|Что такое LevelUp?|What is LevelUp?
Bu inglizcha speaking mashq qilish joyi: yo‘naltirilgan darslar, ovoz yozib eshitish, shaxsiy lug‘at va AI tavsiyalari bir joyda.|Это место для практики английской речи: уроки, запись голоса, личный словарь и советы ИИ — всё вместе.|A place to practise speaking English: guided lessons, voice recording, a personal notebook and AI advice in one place.
Rejangizni tuzing|Составьте план|Build your plan
Darajangiz, maqsadingiz va bo‘sh vaqtingiz haqida 2 daqiqalik savollar.|Две минуты вопросов о вашем уровне, цели и свободном времени.|Two minutes of questions about your level, goals and available time.
Gapirib ko‘ring|Попробуйте говорить|Try speaking
Learn darsidagi iboralarni o‘rganing, ovoz chiqarib ayting va o‘zingizni eshiting.|Изучайте фразы в уроках, говорите вслух и слушайте себя.|Learn phrases in lessons, say them aloud and listen to yourself.
Bitta jihatni yaxshilang|Улучшите что-то одно|Improve one thing
Namuna yoki AI tavsiyasidan foydalaning, yangi so‘zlarni qaytaring.|Используйте пример или совет ИИ, повторяйте новые слова.|Use a model answer or AI advice, and review new words.
Boshidan ochiq aytamiz|Сразу о важном|A few things to know
Asosiy mashqlar akkauntsiz ishlaydi. Profil va reja shu brauzerda saqlanadi. Audio vaqtinchalik. AI ixtiyoriy, limitli va xato qilishi mumkin; matn faqat roziligingiz bilan tashqi xizmatga yuboriladi.|Основные упражнения доступны без аккаунта. Профиль и план хранятся в браузере. Аудио временное. ИИ необязателен, имеет лимиты и может ошибаться; текст передаётся внешнему сервису только с вашего согласия.|Core exercises work without an account. Your profile and plan stay in this browser. Audio is temporary. AI is optional, limited and may make mistakes; text is sent to an external service only with your consent.
Daraja va natija kafolatlanmaydi. Bu rasmiy CEFR testi yoki to‘liq imtihon kursi emas.|Уровень и результат не гарантируются. Это не официальный тест CEFR и не полный экзаменационный курс.|No level or outcome is guaranteed. This is not an official CEFR test or a complete exam course.
O‘zimga mos reja tuzaman|Создать мой план|Build my plan
SIZNI YAXSHIROQ BILIB OLAYLIK ·|ПОЗНАКОМИМСЯ БЛИЖЕ ·|LET’S GET TO KNOW YOU ·
Avval siz haqingizda|Сначала о вас|First, a little about you
Hozir qayerdasiz?|Какой у вас уровень?|Where are you now?
Qancha vaqt ajratasiz?|Сколько времени вы выделите?|How much time can you give?
Nimaga e’tibor beramiz?|На чём сосредоточимся?|What should we focus on?
To‘g‘ri yoki noto‘g‘ri javob yo‘q. Rejani keyin o‘zgartirish mumkin.|Нет правильных и неправильных ответов. План можно изменить позже.|There are no wrong answers. You can change your plan later.
Sizni qanday chaqiraylik?|Как к вам обращаться?|What should we call you?
Ismingiz|Ваше имя|Your name
Ingliz tili sizga nima uchun kerak?|Для чего вам английский?|Why do you need English?
Erkin suhbatlashish|Свободное общение|Everyday conversation
Ish va suhbatga tayyorlanish|Работа и собеседования|Work and job interviews
Sayohatda gaplasha olish|Общение в путешествиях|Speaking while travelling
Speaking imtihoniga tayyorlanish|Подготовка к устному экзамену|Preparing for a speaking exam
Qaysi ta’rif sizga yaqin?|Какое описание вам ближе?|Which description fits you?
A1 · Oddiy so‘zlar va juda qisqa gaplar|A1 · Простые слова и очень короткие фразы|A1 · Simple words and very short sentences
A2 · Tanish mavzuda sodda suhbat|A2 · Простой разговор на знакомую тему|A2 · Simple conversation on familiar topics
B1 · Fikrimni sabab va misollar bilan aytaman|B1 · Выражаю мысли с причинами и примерами|B1 · I explain ideas with reasons and examples
B2 · Murakkab mavzuda fikrni asoslay olaman|B2 · Могу обосновать мнение на сложную тему|B2 · I can support opinions on complex topics
Bu o‘z-o‘zingizni baholash. Ishonchingiz komil bo‘lmasa A1’dan boshlang va darslar oson bo‘lsa darajani o‘zgartiring.|Это самооценка. Если сомневаетесь, начните с A1 и смените уровень, если уроки окажутся лёгкими.|This is a self-assessment. If unsure, start with A1 and move up if lessons feel easy.
Haftasiga necha kun?|Сколько дней в неделю?|How many days a week?
Har mashg‘ulotga qancha vaqt?|Сколько времени на занятие?|How long per session?
Haqiqatan ajrata oladigan vaqtni tanlang. Kuniga 10 daqiqa ham yaxshi boshlanish.|Выберите реалистичное время. Даже 10 минут в день — хорошее начало.|Choose a realistic amount of time. Even 10 minutes a day is a good start.
Gapirishda asosiy qiyinchilik?|Что сложнее всего в речи?|What is your main speaking challenge?
Gapirishga tortinaman|Стесняюсь говорить|I feel shy about speaking
So‘z topishda qiynalaman|Трудно подобрать слова|I struggle to find words
Gap tuzishda qiynalaman|Трудно строить предложения|I struggle to build sentences
Gaplar orasida ko‘p to‘xtayman|Часто делаю паузы|I pause a lot between sentences
Birinchi natijani qachon ko‘rib chiqamiz?|Когда оценим первые результаты?|When should we review your progress?
Avval 4 haftalik boshlang‘ich yo‘l ko‘rsatiladi. Tanlangan muddatda odat va javoblaringizni qayta baholaysiz; muayyan darajaga chiqish va’da qilinmaydi.|Сначала вы увидите стартовый план на 4 недели. В выбранный срок оцените привычку и ответы заново; достижение определённого уровня не обещается.|You’ll first see a four-week starter path. At your chosen checkpoint, review your habits and answers; reaching a specific level is not promised.
Rejangiz saqlanmoqda…|Сохраняем ваш план…|Saving your plan…
Shaxsiy rejamni yaratish|Создать личный план|Create my personal plan
Davom etish|Продолжить|Continue
← Ortga|← Назад|← Back
O‘zgartirmasdan qaytish|Вернуться без изменений|Return without changes
Parol, telefon raqam yoki to‘lov kartasi so‘ralmaydi.|Пароль, телефон и банковская карта не нужны.|No password, phone number or payment card needed.
SIZNING SHAXSIY YO‘LINGIZ|ВАШ ЛИЧНЫЙ ПУТЬ|YOUR PERSONAL PATH
, kichik qadamdan boshlaymiz|, начнём с маленького шага|, let’s start small
boshlang‘ich yo‘nalish|стартовый уровень|starting level
Vaqtingizga mos, bajarish mumkin bo‘lgan reja|Реалистичный план под ваше время|An achievable plan that fits your time
kun ×|дн. ×|days ×
daqiqa|мин.|min
Haftasiga|В неделю|Per week
soat|ч.|hours
daqiqa ·|мин. ·|min ·
haftada|нед. —|weeks —
daqiqa ajratish rejasi|минут запланировано|minutes planned
Bugungi kunlik mashq|Сегодняшняя практика|Today’s daily practice
Bir mashg‘ulot qanday o‘tadi?|Как проходит занятие?|What does a session look like?
Tayyorlanish|Подготовка|Preparation
Promptni o‘qing, 2–3 tayanch ibora va bir misol tanlang.|Прочитайте задание, выберите 2–3 опорные фразы и один пример.|Read the prompt, choose 2–3 useful phrases and one example.
Gapirish va qayta aytish|Речь и повторная попытка|Speaking and trying again
Ovoz chiqarib javob bering. Yozib eshiting, bitta jihatni yaxshilab yana ayting.|Ответьте вслух. Запишите и послушайте, улучшите что-то одно и повторите.|Answer aloud. Record and listen, improve one thing and try again.
Mustahkamlash|Закрепление|Review
Namunani tekshiring, yangi so‘zlarni Words’ga yozing va Review’da takrorlang.|Проверьте пример, сохраните новые слова в словарь и повторите их.|Check the model, save new words in your notebook and review them.
Uzun mashg‘ulotda bir necha qisqa yozuv qiling: bitta audio yozuvi 2 daqiqagacha.|Для длинного занятия сделайте несколько коротких записей: одна запись — до 2 минут.|For longer sessions, make several short recordings: each recording is limited to 2 minutes.
Sizga alohida e’tibor|Ваш личный фокус|Your personal focus
Tavsiyalar javoblaringizdan aniq qoidalar asosida tuzilgan, AI diagnostikasi emas.|Советы составлены по правилам на основе ваших ответов, это не диагностика ИИ.|Advice follows explicit rules based on your answers, not AI diagnosis.
Haftalik ritm|Ритм недели|Weekly rhythm
Tavsiya etilgan kunlar:|Рекомендуемые дни:|Suggested days:
Bu taklif, qat’iy jadval emas. Qulay kunlarga ko‘chiring; bildirishnoma avtomatik yuborilmaydi.|Это рекомендация, не жёсткое расписание. Выбирайте удобные дни; автоматических уведомлений нет.|This is a suggestion, not a fixed schedule. Move sessions to convenient days; no automatic reminders are sent.
Dastlabki 4 hafta|Первые 4 недели|Your first 4 weeks
-HAFTA ·|-Я НЕДЕЛЯ ·|— WEEK ·
MASHG‘ULOT|ЗАНЯТИЙ|SESSIONS
Qisqa javobdan boshlang. Har javobga bitta shaxsiy misol qo‘shing.|Начните с коротких ответов. Добавляйте по одному личному примеру.|Start with short answers. Add one personal example to each.
Sabab va tafsilot qo‘shing. Bir javobni ikki marta aytib taqqoslang.|Добавьте причины и детали. Произнесите ответ дважды и сравните.|Add reasons and details. Say one answer twice and compare.
Qo‘shimcha savollarga javob bering. Avvalgi haftadagi 3 iborani ishlating.|Отвечайте на дополнительные вопросы. Используйте 3 фразы прошлой недели.|Answer follow-up questions. Use 3 phrases from last week.
Birinchi yozuvingiz bilan yangisini taqqoslang. Nima osonlashganini yozing va keyingi maqsadni tanlang.|Сравните первую и новую записи. Запишите, что стало легче, и выберите следующую цель.|Compare your first recording with a new one. Note what became easier and choose your next goal.
Boshlash uchun mavjud darslar|Доступные уроки для старта|Available starter lessons
Kutubxonada hozir 8 ta starter dars mavjud. Haftalik mavzular mustaqil mashq uchun; ular alohida tayyor darslar yoki to‘liq kurs emas. 4 haftadan so‘ng rejani qayta ko‘rib chiqing.|В библиотеке сейчас 8 стартовых уроков. Недельные темы — для самостоятельной практики, это не отдельные готовые уроки и не полный курс. Через 4 недели пересмотрите план.|There are currently 8 starter lessons. Weekly topics are for independent practice, not separate prepared lessons or a complete course. Revisit your plan after 4 weeks.
Reja va profilni o‘zgartirish|Изменить план и профиль|Edit plan and profile
Sizga mos o‘quv yo‘li|Ваш учебный путь|A learning path for you
Maqsad, daraja, vaqt va qiyinchiliklaringiz asosidagi shaxsiy rejangiz.|Личный план на основе цели, уровня, времени и трудностей.|Your personal plan based on your goal, level, time and challenges.
Shaxsiy rejamni ochish|Открыть мой план|Open my plan
Maqsad va vaqtni qayta tanlash|Изменить цель и время|Change goal and schedule
Rejangizni ochyapmiz…|Открываем ваш план…|Opening your plan…
Qayta urinish|Попробовать снова|Try again
Dushanba|Понедельник|Monday
Seshanba|Вторник|Tuesday
Chorshanba|Среда|Wednesday
Payshanba|Четверг|Thursday
Juma|Пятница|Friday
Shanba|Суббота|Saturday
Yakshanba|Воскресенье|Sunday
O‘zim haqimda|О себе|About me
Kundalik hayot|Повседневная жизнь|Daily life
Qiziqishlar va rejalar|Интересы и планы|Interests and plans
Erkin savol-javob|Свободные вопросы и ответы|Open questions and answers
Kasbim va tajribam|Профессия и опыт|My work and experience
Kuchli tomonlarim|Мои сильные стороны|My strengths
Muammoni hal qilish|Решение проблемы|Solving a problem
Sinov ish suhbati|Пробное собеседование|Mock job interview
O‘zimni tanishtirish|Знакомство|Introducing myself
Ovqat buyurtma qilish|Заказ еды|Ordering food
Yo‘l so‘rash va reja|Как спросить дорогу и составить план|Directions and plans
Sayohat taassurotlari|Впечатления от поездки|Travel experiences
Qisqa shaxsiy savollar|Короткие личные вопросы|Short personal questions
Bir mavzuni batafsil yoritish|Подробный рассказ на тему|Exploring a topic in detail
Fikr va sabablar|Мнения и причины|Opinions and reasons
Vaqt bilan sinov mashqi|Пробное задание на время|Timed mock practice
Avval tanish mavzuda qisqa gapiring; yozuvingizdan bitta yaxshi jihat toping.|Начните с короткого ответа на знакомую тему; найдите в записи одну сильную сторону.|Start with a short answer on a familiar topic; find one strength in your recording.
Har mashqda 3 ta foydali iborani Words’ga saqlab, ulardan gap tuzing.|На каждом занятии сохраняйте в словарь 3 полезные фразы и составляйте с ними предложения.|Save 3 useful phrases in your notebook each session and make sentences with them.
Bitta sodda gap tuzilishini tanlab, 3 xil misolda ishlating.|Выберите простую конструкцию и используйте в 3 разных примерах.|Choose one simple sentence pattern and use it in 3 different examples.
Avval 30 soniya tayyorlaning, keyin bir fikrni to‘xtamasdan aytib ko‘ring.|Сначала готовьтесь 30 секунд, затем попробуйте высказать одну мысль без остановки.|Prepare for 30 seconds, then try expressing one idea without stopping.
Gapirishni odat qiling|Сделайте речь привычкой|Make speaking a habit
8 ta boshlang‘ich dars: maqsad, tayanch iboralar, ovozli mashq va yozma refleksiya. Bu to‘liq CEFR kursi yoki daraja testi emas.|8 стартовых уроков: цель, опорные фразы, устная практика и письменная рефлексия. Это не полный курс CEFR и не тест уровня.|8 starter lessons with goals, useful phrases, speaking practice and reflection. Not a complete CEFR course or a level test.
Qayta yuklash|Загрузить снова|Reload
← Barcha darslar|← Все уроки|← All lessons
· GUIDED SPEAKING|· ПРАКТИКА С ПОДСКАЗКАМИ|· GUIDED SPEAKING
1 · TAYYORLANING|1 · ПОДГОТОВЬТЕСЬ|1 · PREPARE
2 · OVOZ CHIQARIB AYTIB KO‘RING|2 · СКАЖИТЕ ВСЛУХ|2 · SAY IT ALOUD
3 · JAVOBINGIZNI YOZING|3 · ЗАПИШИТЕ ОТВЕТ|3 · WRITE YOUR ANSWER
words · Kamida 20 inglizcha so‘z|слов · Минимум 20 английских слов|words · At least 20 English words
words · Kamida 20 inglizcha so‘z ·|слов · Минимум 20 английских слов ·|words · At least 20 English words ·
Namunani yashirish|Скрыть пример|Hide model answer
Namuna bilan taqqoslash|Сравнить с примером|Compare with a model
Bu yagona to‘g‘ri javob emas. Namunani ko‘chirmay, o‘z misolingizni ayting.|Это не единственный правильный ответ. Не копируйте пример, расскажите свой.|This is not the only correct answer. Use your own example instead of copying.
4 · YANA BIR QADAM|4 · ЕЩЁ ОДИН ШАГ|4 · ONE MORE STEP
O‘zingizni tekshiring: savolga javob berdimmi? Kamida bitta sabab yoki misol keltirdimmi? Keyingi safar nimani yaxshilayman?|Проверьте себя: ответил ли я на вопрос? Привёл хотя бы одну причину или пример? Что улучшить в следующий раз?|Check yourself: did I answer the question? Did I give a reason or example? What can I improve next time?
Saqlanmoqda…|Сохранение…|Saving…
Dars bajarilgan ✓|Урок выполнен ✓|Lesson complete ✓
Darsni yakunlash|Завершить урок|Complete lesson
AI ustozdan fikr olish|Получить отзыв ИИ|Get AI feedback
Dars yakunlash — o‘z-o‘zini baholash. Qo‘shimcha XP berilmaydi. Faqat bajarilgan dars belgisi saqlanadi; matn va audio doimiy saqlanmaydi.|Завершение урока — самооценка, без дополнительных XP. Сохраняется только отметка выполнения; текст и аудио не сохраняются постоянно.|Lesson completion is self-assessment, with no extra XP. Only completion is saved; text and audio are not stored permanently.
dars yakunlangan|уроков выполнено|lessons complete
O‘zingizga mos darajani tanlang. Qiyin bo‘lsa, oldingi bosqichga qayting — bu ham rivojlanish.|Выберите подходящий уровень. Если сложно, вернитесь на предыдущий — это тоже прогресс.|Choose a level that suits you. If it feels hard, go back a level — that’s progress too.
AI ustoz|ИИ-наставник|AI coach
5–10 daqiqa ·|5–10 минут ·|5–10 min ·
Bajarilgan|Выполнено|Completed
Boshlashga tayyor|Готово к старту|Ready to start
Qayta mashq qilish|Практиковаться снова|Practise again
Darsni boshlash|Начать урок|Start lesson
← Darslarga qaytish|← Вернуться к урокам|← Back to lessons
Keyingi qadamingizni toping.|Найдите свой следующий шаг.|Find your next step.
Matn bo‘yicha shaxsiy fikr, yaxshilangan misol va davomiy savol. AI xato qilishi mumkin; bu imtihon bahosi yoki talaffuz tahlili emas.|Личный отзыв по тексту, улучшенный пример и дополнительный вопрос. ИИ может ошибаться; это не экзаменационная оценка и не анализ произношения.|Personal text feedback, an improved example and a follow-up question. AI can make mistakes; this is not an exam grade or pronunciation analysis.
AI ustoz tez orada|ИИ-наставник скоро появится|AI coach coming soon
Xizmat hali ishga tushirilmagan. Sizdan hech qanday kalit yoki kirish kodi kerak emas. Hozircha Learn darslaridagi namunalar bilan mashq qiling.|Сервис пока не запущен. Ключи и коды доступа не нужны. Пока практикуйтесь с примерами в уроках.|This service isn’t available yet. No key or access code is needed. For now, practise with the model answers in lessons.
Nimani mashq qildingiz?|Что вы практиковали?|What did you practise?
Savol va javobim AI feedback olish uchun server va Google Gemini xizmatiga yuborilishiga roziman. Shaxsiy yoki maxfiy ma’lumot kiritmayman. Audio yuborilmaydi. Bepul rejimda matn va javoblar Google mahsulotlarini yaxshilashda ishlatilishi mumkin.|Я согласен на отправку вопроса и ответа на сервер и в Google Gemini для отзыва ИИ. Не ввожу личные или конфиденциальные данные. Аудио не отправляется. В бесплатном режиме текст и ответы могут использоваться для улучшения продуктов Google.|I agree to send my question and answer to the server and Google Gemini for AI feedback. I will not include personal or confidential information. Audio is not sent. In the free tier, text and responses may be used to improve Google products.
Ustoz tayyorlanmoqda…|Наставник готовится…|Coach is preparing…
AI ustozdan so‘rash|Спросить ИИ-наставника|Ask the AI coach
Bepul server ilk so‘rovda sekinroq ochilishi mumkin. Limit tugasa keyinroq qayta urinib ko‘ring.|Бесплатный сервер может запускаться медленнее при первом запросе. Если лимит исчерпан, попробуйте позже.|The free server may take longer on the first request. If the limit is reached, try again later.
SHAXSIY FEEDBACK|ЛИЧНЫЙ ОТЗЫВ|PERSONAL FEEDBACK
01 · KUCHLI TOMON|01 · СИЛЬНАЯ СТОРОНА|01 · STRENGTH
02 · KICHIK TUZATISHLAR|02 · НЕБОЛЬШИЕ ИСПРАВЛЕНИЯ|02 · SMALL CORRECTIONS
03 · NAMUNAVIY JAVOB|03 · ПРИМЕР ОТВЕТА|03 · MODEL ANSWER
04 · KEYINGI QADAM|04 · СЛЕДУЮЩИЙ ШАГ|04 · NEXT STEP
Bir qadam oldinga.|Ещё один шаг вперёд.|One step forward.
AI ustoz fikri · O‘rganing, tekshiring, yana aytib ko‘ring.|Отзыв ИИ · Изучите, проверьте и скажите ещё раз.|AI coach feedback · Learn, check and try again.
Endi yana bir bor ayting|Теперь скажите ещё раз|Now say it once more
Bitta tavsiyani tanlang va javobingizni ovoz chiqarib takrorlang. Maqsad — mukammallik emas, kichik o‘sish.|Выберите один совет и повторите ответ вслух. Цель — не совершенство, а небольшой рост.|Choose one suggestion and repeat your answer aloud. Aim for small improvement, not perfection.
AI xato qilishi mumkin. Bu matn bo‘yicha tavsiya, talaffuz tahlili yoki rasmiy daraja bahosi emas.|ИИ может ошибаться. Это совет по тексту, не анализ произношения и не официальная оценка уровня.|AI can make mistakes. This is text advice, not pronunciation analysis or an official level assessment.
Ovozli mashq|Устная практика|Voice practice
Ovozingizni eshiting|Послушайте свой голос|Listen to your voice
2 daqiqagacha yozing va qayta eshiting. Audio faqat shu sahifa xotirasida; serverga yuborilmaydi. Yangi yozuv eskisini almashtiradi.|Запишите до 2 минут и послушайте. Аудио хранится только в памяти страницы и не отправляется на сервер. Новая запись заменяет старую.|Record up to 2 minutes and listen back. Audio stays in this page’s memory and is not sent to a server. A new recording replaces the old one.
Mikrofon ochilmoqda…|Открываем микрофон…|Opening microphone…
Yozishni to‘xtatish|Остановить запись|Stop recording
Ovoz yozish|Записать голос|Record voice
● Yozilmoqda · 2 daqiqada avtomatik to‘xtaydi|● Запись · Остановится автоматически через 2 минуты|● Recording · Stops automatically after 2 minutes
Yozuvni o‘chirish|Удалить запись|Delete recording`;
english += `
AI SPEAKING COACH · BETA|AI SPEAKING USTOZ · BETA|ИИ-НАСТАВНИК ПО РЕЧИ · БЕТА
SPEAKING PATH · A1 → B2|SPEAKING YO‘LI · A1 → B2|ПУТЬ РАЗВИТИЯ РЕЧИ · A1 → B2
Consent to send text to AI provider|Matnni AI xizmatiga yuborishga rozilik|Согласие на отправку текста сервису ИИ
First words|Birinchi so‘zlar|Первые слова
Complete your first practice|Birinchi mashqni bajaring|Завершите первое занятие
On a roll|Maromda|На волне
Build a 3-day streak|3 kun ketma-ket mashq qiling|Занимайтесь 3 дня подряд
Finding your voice|O‘z ovozingizni toping|Найдите свой голос
Write 500 words in total|Jami 500 so‘z yozing|Напишите всего 500 слов
High five|Beshga besh|Дай пять
Complete 5 daily practices|5 ta kunlik mashqni bajaring|Завершите 5 ежедневных занятий
You brought your ideas to life.|Fikrlaringizni jonlantirdingiz.|Вы оживили свои идеи.
A little practice. A real step forward.|Kichik mashq. Haqiqiy qadam.|Немного практики. Настоящий шаг вперёд.
You connected your ideas with a reason. That makes your response easier to follow.|Fikrlaringizni sabab bilan bog‘ladingiz. Bu javobni tushunarli qiladi.|Вы связали идеи с причиной. Так за ответом легче следить.
You put your thoughts into English. Consistent practice is how confidence grows.|Fikrlaringizni inglizcha ifodaladingiz. Muntazam mashq ishonchni oshiradi.|Вы выразили мысли по-английски. Регулярная практика помогает уверенности расти.
Go a little further: add a specific example and explain why it matters to you.|Yana bir qadam: aniq misol qo‘shing va nega muhimligini ayting.|Сделайте ещё шаг: добавьте конкретный пример и объясните, почему он важен.
Try connecting two ideas with “because” and give a reason for your answer.|Ikki fikrni “because” bilan bog‘lab, javobingizga sabab keltiring.|Попробуйте связать две идеи через “because” и обосновать ответ.
Read your answer aloud once more. Pause between ideas and notice any words you find difficult.|Javobni yana ovoz chiqarib o‘qing. Fikrlar orasida to‘xtab, qiyin so‘zlarni belgilang.|Прочитайте ответ вслух ещё раз. Делайте паузы между мыслями и отмечайте трудные слова.
Settings could not be loaded. Your saved preferences have not been overwritten. Please try again.|Sozlamalar yuklanmadi. Saqlangan sozlamalar ustiga yozilmadi. Qayta urinib ko‘ring.|Не удалось загрузить настройки. Сохранённые данные не перезаписаны. Попробуйте снова.
We couldn’t save your settings. Your changes are still here. Please try again.|Sozlamalar saqlanmadi. O‘zgarishlaringiz shu yerda. Qayta urinib ko‘ring.|Не удалось сохранить настройки. Изменения остаются здесь. Попробуйте снова.
Your notebook could not be loaded. Nothing has been overwritten. Please try again.|Lug‘at yuklanmadi. Ma’lumotlar ustiga yozilmadi. Qayta urinib ko‘ring.|Не удалось загрузить словарь. Ничего не перезаписано. Попробуйте снова.
Your changes could not be saved. Please try again.|O‘zgarishlar saqlanmadi. Qayta urinib ko‘ring.|Не удалось сохранить изменения. Попробуйте снова.
That word is already in your notebook. Edit the existing entry instead.|Bu so‘z lug‘atingizda bor. Mavjud yozuvni tahrirlang.|Это слово уже есть в словаре. Измените существующую запись.
Enter a word and meaning within the character limits.|Belgi chegarasidan oshmagan so‘z va ma’no kiriting.|Введите слово и значение в пределах ограничения символов.
Your saved progress could not be loaded. Nothing has been overwritten. Check storage access and try again.|Natijalar yuklanmadi. Hech narsa ustiga yozilmadi. Xotiraga ruxsatni tekshirib qayta urinib ko‘ring.|Не удалось загрузить прогресс. Ничего не перезаписано. Проверьте доступ к хранилищу и попробуйте снова.
A new day has started. Please answer today’s new question.|Yangi kun boshlandi. Bugungi yangi savolga javob bering.|Начался новый день. Ответьте на новый сегодняшний вопрос.
Your practice could not be saved. Your answer is still here — please try again.|Mashq saqlanmadi. Javobingiz shu yerda — qayta urinib ko‘ring.|Не удалось сохранить занятие. Ваш ответ остаётся здесь — попробуйте снова.
Write at least 20 English words (maximum 4,000 characters).|Kamida 20 inglizcha so‘z yozing (ko‘pi bilan 4000 belgi).|Напишите минимум 20 английских слов (не более 4000 символов).`;
uzbek += `
AI ustoz vaqtincha mavjud emas. Keyinroq urinib ko‘ring.|ИИ-наставник временно недоступен. Попробуйте позже.|The AI coach is temporarily unavailable. Try again later.
Serverdan to‘g‘ri feedback kelmadi.|Сервер вернул некорректный отзыв.|The server did not return valid feedback.
Kutish vaqti tugadi. Bepul server uyg‘onishi vaqt olishi mumkin. Qayta urinib ko‘ring.|Время ожидания истекло. Бесплатному серверу может потребоваться время на запуск. Попробуйте снова.|The request timed out. The free server may take time to wake up. Try again.
Ulanishda xato.|Ошибка соединения.|Connection error.
Darslar tarixi yuklanmadi. Hech narsa ustiga yozilmadi. Qayta urinib ko‘ring.|История уроков не загрузилась. Ничего не перезаписано. Попробуйте снова.|Lesson history could not load. Nothing was overwritten. Try again.
Saqlanmadi. Javobingiz shu yerda, qayta urinib ko‘ring.|Не сохранено. Ваш ответ остаётся здесь, попробуйте снова.|Not saved. Your answer is still here; try again.
AI ustozni hozir web versiyada oching. Mobil ilova uchun xavfsiz kirish alohida ulanadi.|Откройте ИИ-наставника в веб-версии. Безопасный доступ в мобильном приложении подключается отдельно.|Open the AI coach in the web version. Secure native app access is configured separately.
Xavfsizlik tekshiruvi ochilmadi. Internetni tekshirib sahifani yangilang.|Проверка безопасности не загрузилась. Проверьте интернет и обновите страницу.|The security check did not load. Check your connection and refresh.
Ovoz yozish hozir HTTPS orqali ochilgan web versiyada mavjud. Telefonda saytni Safari yoki Chrome’da oching. Native Expo yozuvi bu versiyada yoqilmagan.|Запись голоса доступна в веб-версии через HTTPS. На телефоне откройте сайт в Safari или Chrome. Нативная запись Expo в этой версии не включена.|Voice recording is available on the HTTPS web version. Open the site in Safari or Chrome on your phone. Native Expo recording is not enabled in this version.
Bu brauzer ovoz yozishni qo‘llamaydi. Yangilangan Safari yoki Chrome va HTTPS saytini ishlating.|Браузер не поддерживает запись. Используйте обновлённый Safari или Chrome и HTTPS.|This browser does not support recording. Use an updated Safari or Chrome and HTTPS.
Yozishda xato yuz berdi. Qayta urinib ko‘ring.|Ошибка записи. Попробуйте снова.|A recording error occurred. Try again.
Mikrofonga ruxsat berilmadi. Brauzer sozlamasida ruxsat berib, qayta urinib ko‘ring.|Нет доступа к микрофону. Разрешите его в настройках браузера и попробуйте снова.|Microphone access was denied. Allow it in browser settings and try again.
Mikrofon ochilmadi.|Не удалось открыть микрофон.|Could not open microphone.
Shaxsiy reja yuklanmadi. Ma’lumotlar ustiga yozilmadi. Qayta urinib ko‘ring.|Личный план не загрузился. Данные не перезаписаны. Попробуйте снова.|Your personal plan could not load. Nothing was overwritten. Try again.
Reja saqlanmadi. Javoblaringiz shu yerda — qayta urinib ko‘ring.|План не сохранился. Ваши ответы остаются здесь — попробуйте снова.|Your plan was not saved. Your answers are still here — try again.
Google API kaliti qabul qilinmadi. Ilova egasi Render’dagi GEMINI_API_KEY qiymatini tekshirishi kerak.|Ключ Google API не принят. Владельцу приложения нужно проверить GEMINI_API_KEY в Render.|The Google API key was rejected. The app owner should check GEMINI_API_KEY in Render.
Google loyihasida Gemini uchun ruxsat yo‘q yoki kalit cheklangan. Ilova egasi AI Studio sozlamalarini tekshirishi kerak.|Нет разрешения на Gemini или ключ ограничен. Владельцу нужно проверить AI Studio.|Gemini permission is missing or the key is restricted. The app owner should check AI Studio.
Tanlangan Gemini modeli bu API’da topilmadi. Ilova egasi model sozlamasini yangilashi kerak.|Модель Gemini не найдена в API. Владельцу нужно обновить настройку модели.|The chosen Gemini model was not found. The app owner should update the model configuration.
Gemini bepul limiti tugagan yoki bu loyiha uchun bepul quota mavjud emas. AI Studio’dagi limitni tekshiring; billingni yoqish shart emas.|Бесплатный лимит Gemini исчерпан или недоступен для проекта. Проверьте лимиты AI Studio; включать оплату не обязательно.|Gemini’s free quota is exhausted or unavailable for this project. Check AI Studio limits; you do not need to enable billing.
Google so‘rovni qabul qilmadi. Ilova egasi model va loyiha sozlamalarini tekshirishi kerak.|Google отклонил запрос. Владельцу нужно проверить настройки модели и проекта.|Google rejected the request. The app owner should check model and project settings.
Google AI xizmati vaqtincha javob bermayapti. Keyinroq qayta urinib ko‘ring.|Google AI временно не отвечает. Попробуйте позже.|Google AI is temporarily unavailable. Try again later.
AI to‘liq javob tayyorlay olmadi. Javobingizni qisqaroq qilib qayta urinib ko‘ring.|ИИ не смог завершить ответ. Сократите текст и попробуйте снова.|AI could not finish its response. Shorten your answer and try again.
AI javobi bo‘sh keldi. Qayta urinib ko‘ring.|ИИ вернул пустой ответ. Попробуйте снова.|AI returned an empty response. Try again.
Xavfsizlik tekshiruvini bajaring va yana yuboring.|Пройдите проверку безопасности и отправьте снова.|Complete the security check and send again.
Xavfsizlik tekshiruvi o‘tmadi yoki muddati tugadi. Yangi tekshiruvni bajaring.|Проверка не пройдена или истекла. Пройдите новую проверку.|The security check failed or expired. Complete a new check.
Turnstile domen sozlamasi mos kelmadi. Ilova egasi TURNSTILE_HOSTNAME qiymatini tekshirishi kerak.|Домен Turnstile не совпадает. Владельцу нужно проверить TURNSTILE_HOSTNAME.|The Turnstile domain did not match. The app owner should check TURNSTILE_HOSTNAME.
Turnstile tekshiruv turi mos kelmadi. Ilova egasi sozlamani tekshirishi kerak.|Тип проверки Turnstile не совпадает. Владельцу нужно проверить настройки.|The Turnstile action did not match. The app owner should check the configuration.
Xavfsizlik tekshiruvi xizmatiga ulanib bo‘lmadi. Qayta urinib ko‘ring.|Не удалось подключиться к сервису проверки. Попробуйте снова.|Could not connect to the security check service. Try again.
Server eski kirish rejimida. Ilova egasi Turnstile sozlamalarini tekshirishi kerak.|Сервер использует старый режим доступа. Владельцу нужно проверить Turnstile.|The server is in legacy access mode. The app owner should check Turnstile settings.
Ilovaning foydalanish limiti tugadi. Keyinroq qayta urinib ko‘ring.|Лимит приложения исчерпан. Попробуйте позже.|The app usage limit was reached. Try again later.
AI yoki xavfsizlik xizmati vaqtida javob bermadi. Qayta urinib ko‘ring.|ИИ или сервис проверки не ответил вовремя. Попробуйте снова.|AI or the security service timed out. Try again.
Server tashqi AI yoki xavfsizlik xizmatiga ulana olmadi. Keyinroq qayta urinib ko‘ring.|Сервер не смог подключиться к ИИ или проверке. Попробуйте позже.|The server could not connect to AI or the security service. Try again later.
Xavfsizlik tekshiruvini qayta bajaring.|Пройдите проверку безопасности заново.|Complete the security check again.
Foydalanish limiti tugadi. Keyinroq qayta urinib ko‘ring.|Лимит исчерпан. Попробуйте позже.|The usage limit was reached. Try again later.`;
uzbek += `
Ismingiz, qayerdan ekaningiz va qiziqishingizni ayting. Qisqa gaplar ham yetarli.|Назовите имя, откуда вы и ваши интересы. Коротких фраз достаточно.|Say your name, where you are from and what you enjoy. Short sentences are enough.
First, then va after that bilan voqealarni tartiblang.|Упорядочьте события с помощью first, then и after that.|Put events in order using first, then and after that.
Faqat taom nomini aytmang: uning ta’mi va siz uchun ahamiyatini ham tushuntiring.|Не просто назовите блюдо: опишите вкус и почему оно важно для вас.|Don’t just name the dish: describe its taste and why it matters to you.
O‘tgan voqea uchun visited, went, felt kabi fe’llarni ishlating.|Для рассказа о прошлом используйте visited, went, felt.|Use past-tense verbs such as visited, went and felt.
Maqsad → sabab → amaliy qadam → qiyinchilik → yechim tartibida gapiring.|Говорите в порядке: цель → причина → шаг → трудность → решение.|Follow this order: goal → reason → practical step → challenge → solution.
Ikkala variantning ham bir jihatini ayting, so‘ng shaxsiy misol bilan tanlovingizni asoslang.|Назовите особенность каждого варианта и обоснуйте выбор личным примером.|Mention one aspect of each option, then support your choice with a personal example.
Keskin umumlashtirishdan saqlaning. Qaysi sharoitda fikringiz to‘g‘ri ekanini tushuntiring.|Избегайте резких обобщений. Объясните, при каких условиях ваше мнение верно.|Avoid sweeping generalisations. Explain when your opinion applies.
Fikr → sabab → oqibat → yechim. Bu mashq rasmiy CEFR imtihoni yoki daraja sertifikati emas.|Мнение → причина → последствие → решение. Это не официальный экзамен CEFR и не сертификат уровня.|Opinion → reason → consequence → solution. This exercise is not an official CEFR exam or level certificate.`;
english += `
Online account & ranking|Online hisob va reyting|Онлайн-аккаунт и рейтинг
Shared database is not connected yet. The owner must complete the database setup. Local practice still works; no demo rankings are shown.|Umumiy baza hali ulanmagan. Ilova egasi baza sozlamalarini yakunlashi kerak. Mahalliy mashqlar ishlaydi; soxta reyting ko‘rsatilmaydi.|Общая база пока не подключена. Владельцу нужно завершить настройку. Локальные упражнения работают; вымышленных рейтингов нет.
Loading online account…|Online hisob yuklanmoqda…|Загрузка онлайн-аккаунта…
Sign in to use the same ranked account on different devices. Email stays private. Public ranking is optional.|Turli qurilmalarda bir xil reyting hisobidan foydalanish uchun kiring. Email maxfiy qoladi. Reytingda qatnashish ixtiyoriy.|Войдите для одного рейтингового аккаунта на разных устройствах. Email остаётся закрытым. Участие в рейтинге необязательно.
Email|Email|Email
Password|Parol|Пароль
Use at least 10 characters. Never share your password or confirmation email.|Kamida 10 belgi ishlating. Parol yoki tasdiqlash xatini hech kimga yubormang.|Используйте минимум 10 символов. Никому не передавайте пароль и письмо подтверждения.
Please wait…|Kuting…|Подождите…
Create online account|Online hisob yaratish|Создать онлайн-аккаунт
Sign in|Kirish|Войти
I already have an account|Menda hisob bor|У меня уже есть аккаунт
Create an account instead|Yangi hisob yaratish|Создать новый аккаунт
Account ID|Hisob IDsi|ID аккаунта
Your nickname and ranked XP are visible to signed-in members only after you join. Do not use private information as your nickname.|Qo‘shilganingizdan keyin taxallus va reyting ballingiz boshqa hisobga kirganlarga ko‘rinadi. Taxallusga maxfiy ma’lumot yozmang.|После вступления никнейм и рейтинговые XP видны вошедшим участникам. Не используйте личные данные в никнейме.
Public nickname|Ommaviy taxallus|Публичный никнейм
Public ranking consent: yes|Reytingda ko‘rinishga roziman: ha|Согласие на публичный рейтинг: да
I agree to show my nickname and ranked XP|Taxallus va reyting ballim ko‘rinishiga roziman|Согласен показывать никнейм и рейтинговые XP
Update ranking nickname|Reyting taxallusini yangilash|Обновить никнейм
Join the ranking|Reytingga qo‘shilish|Вступить в рейтинг
This account is blocked from earning ranked XP.|Bu hisobga reyting balli olish taqiqlangan.|Аккаунту запрещено получать рейтинговые XP.
Your ranking profile is hidden by a moderator.|Reyting profilingiz moderator tomonidan yashirilgan.|Профиль рейтинга скрыт модератором.
Leave public ranking|Ommaviy reytingdan chiqish|Выйти из публичного рейтинга
Refresh online account|Online hisobni yangilash|Обновить онлайн-аккаунт
Sign out on this device|Shu qurilmada hisobdan chiqish|Выйти на этом устройстве
Signing out does not hide your ranking. Leave the ranking first if you want it hidden. Local XP and notebook are not deleted.|Hisobdan chiqish reytingni yashirmaydi. Yashirish uchun avval reytingdan chiqing. Mahalliy XP va lug‘at o‘chirilmaydi.|Выход из аккаунта не скрывает рейтинг. Чтобы скрыть его, сначала покиньте рейтинг. Локальные XP и словарь не удаляются.
Close admin panel|Admin panelni yopish|Закрыть панель администратора
Open admin panel|Admin panelni ochish|Открыть панель администратора
Online sessions are stored on this device. Local storage is not encrypted. Sign out on shared devices. No audio is sent for rankings.|Online sessiya shu qurilmada saqlanadi. Xotira shifrlanmagan. Umumiy qurilmada hisobdan chiqing. Reyting uchun audio yuborilmaydi.|Онлайн-сессия хранится на устройстве без шифрования. Выходите на общих устройствах. Аудио для рейтинга не отправляется.
Community ranking|Umumiy reyting|Общий рейтинг
Real shared scores, not example players. Weekly rankings reset on Monday, Asia/Tashkent time. Ties use account joining order.|Bu haqiqiy umumiy ballar. Haftalik reyting Toshkent vaqti bilan dushanbadan boshlanadi. Ball teng bo‘lsa, oldin qo‘shilgan yuqorida turadi.|Это реальные общие баллы. Неделя начинается в понедельник по времени Ташкента. При равенстве выше тот, кто вступил раньше.
Sign in to view the ranking and join with a public nickname.|Reytingni ko‘rish va taxallus bilan qo‘shilish uchun hisobga kiring.|Войдите, чтобы увидеть рейтинг и присоединиться с никнеймом.
Open online account|Online hisobni ochish|Открыть онлайн-аккаунт
This week|Bu hafta|Эта неделя
All time|Barcha vaqt|За всё время
Loading ranking…|Reyting yuklanmoqda…|Загрузка рейтинга…
Top 50 · Most ranked XP first|Top 50 · Eng ko‘p ball yuqorida|Топ-50 · Больше XP — выше место
No ranked players yet. Be the first to join.|Hozircha ishtirokchi yo‘q. Birinchi bo‘lib qo‘shiling.|Участников пока нет. Присоединяйтесь первым.
Your position|Sizning o‘rningiz|Ваше место
You are not listed. Join the ranking or check your profile status.|Siz ro‘yxatda yo‘qsiz. Reytingga qo‘shiling yoki profil holatini tekshiring.|Вас нет в списке. Вступите в рейтинг или проверьте статус профиля.
Refresh ranking|Reytingni yangilash|Обновить рейтинг
Join from my profile|Profil orqali qo‘shilish|Присоединиться через профиль
Sync today’s practice to ranking|Bugungi mashq ballini reytingga yuborish|Отправить баллы сегодняшнего занятия
Ranked XP starts after joining: daily practice +50 once per day; each starter lesson +20 once. Old local totals are not imported. Ranked and local XP may differ.|Reyting balli qo‘shilgandan keyin boshlanadi: kunlik mashq +50 kuniga bir marta; har starter dars +20 bir marta. Eski mahalliy ballar ko‘chirilmaydi. Reyting va mahalliy XP farq qilishi mumkin.|Рейтинговые XP начинаются после вступления: +50 за ежедневное задание раз в день; +20 за каждый стартовый урок один раз. Старые локальные баллы не импортируются. Рейтинговые и локальные XP могут отличаться.
Text is sent to validate the word count but is not saved in ranking tables. These are practice points, not an exam score. Voice calls are not available yet.|Matn so‘z sonini tekshirish uchun yuboriladi, reyting jadvallariga saqlanmaydi. Bu mashq ballari, imtihon bahosi emas. Ovozli qo‘ng‘iroq hali mavjud emas.|Текст отправляется для проверки числа слов, но не сохраняется в таблицах рейтинга. Это баллы практики, не экзамена. Голосовые звонки пока недоступны.
Administrator panel|Admin panel|Панель администратора
Database permissions enforce access. This panel cannot grant administrators, edit XP or read practice answers. Every moderation change is audited.|Ruxsatlar bazada tekshiriladi. Panel admin tayinlay olmaydi, XPni o‘zgartirmaydi va mashq javoblarini o‘qimaydi. Har moderatsiya yozib boriladi.|Доступ проверяется в базе. Панель не назначает администраторов, не меняет XP и не читает ответы. Все действия модерации записываются.
Loading members…|Ishtirokchilar yuklanmoqda…|Загрузка участников…
Refresh members|Ishtirokchilarni yangilash|Обновить участников
Members:|Ishtirokchilar:|Участники:
· Page|· Sahifa|· Страница
Blocked|Bloklangan|Заблокирован
Active|Faol|Активен
Hidden|Yashirilgan|Скрыт
Visible|Ko‘rinadi|Виден
Moderate member|Ishtirokchini boshqarish|Модерировать участника
Previous page|Oldingi sahifa|Предыдущая страница
Next page|Keyingi sahifa|Следующая страница
Latest 20 moderation actions|Oxirgi 20 moderatsiya amali|Последние 20 действий модерации
No moderation actions yet.|Hozircha moderatsiya amali yo‘q.|Действий модерации пока нет.
Confirm moderation|Moderatsiyani tasdiqlash|Подтвердить модерацию
Hidden: yes|Yashirish: ha|Скрыть: да
Hidden: no|Yashirish: yo‘q|Скрыть: нет
Blocked: yes|Bloklash: ha|Блокировать: да
Blocked: no|Bloklash: yo‘q|Блокировать: нет
Hidden removes a member from rankings. Blocked also prevents new ranked XP. Local practice is not deleted.|Yashirish ishtirokchini reytingdan oladi. Bloklash yangi reyting ballarini ham to‘xtatadi. Mahalliy mashqlar o‘chirilmaydi.|Скрытие убирает участника из рейтинга. Блокировка также запрещает новые XP. Локальная практика не удаляется.
Moderation reason|Moderatsiya sababi|Причина модерации
Confirm and save audit entry|Tasdiqlash va tarixga yozish|Подтвердить и записать в журнал
Cancel|Bekor qilish|Отмена
Sync this lesson to ranking|Bu dars ballini reytingga yuborish|Отправить баллы этого урока в рейтинг
Lesson completion is self-assessment. Local XP does not change. Ranked members can earn 20 online XP once per lesson. Text and audio are not stored permanently.|Darsni tugatish — o‘z-o‘zini baholash. Mahalliy XP o‘zgarmaydi. Reyting a’zolari har darsdan bir marta 20 online XP olishi mumkin. Matn va audio doimiy saqlanmaydi.|Завершение урока — самооценка. Локальные XP не меняются. Участники рейтинга могут получить 20 онлайн-XP за урок один раз. Текст и аудио не сохраняются постоянно.
Online request failed. Check your connection, account and project setup, then try again.|Online so‘rov bajarilmadi. Internet, hisob va loyiha sozlamalarini tekshirib qayta urinib ko‘ring.|Онлайн-запрос не выполнен. Проверьте соединение, аккаунт и настройки проекта и повторите.
Online session could not load. Try signing in again.|Online sessiya yuklanmadi. Qayta hisobga kiring.|Онлайн-сессия не загрузилась. Попробуйте войти снова.
Check your email to confirm your account, then sign in.|Hisobni tasdiqlash uchun emailingizni tekshiring, keyin kiring.|Подтвердите аккаунт через письмо на email, затем войдите.
Signed in. Choose a public nickname to join the ranking.|Hisobga kirildi. Reytingga qo‘shilish uchun taxallus tanlang.|Вы вошли. Выберите никнейм для вступления в рейтинг.
Ranking profile saved. Only your nickname and ranked XP are public.|Reyting profili saqlandi. Faqat taxallus va reyting XP ko‘rinadi.|Профиль рейтинга сохранён. Видны только никнейм и рейтинговые XP.
You are no longer shown in the ranking.|Siz endi reytingda ko‘rinmaysiz.|Вы больше не отображаетесь в рейтинге.
This activity already has ranked XP. No duplicate points.|Bu mashq uchun reyting balli berilgan. Takroriy ball berilmaydi.|За это задание XP уже начислены. Повторных баллов нет.
Online XP was not confirmed. Retry from Results with your current activity. Local progress is safe.|Online XP tasdiqlanmadi. Joriy mashqni Natijalar orqali qayta yuboring. Mahalliy natijalar saqlangan.|Онлайн-XP не подтверждены. Повторите отправку текущего задания из результатов. Локальный прогресс сохранён.
Administrator access is required.|Admin ruxsati kerak.|Нужны права администратора.
Administrator accounts cannot be moderated here.|Admin hisoblarini bu yerdan boshqarib bo‘lmaydi.|Аккаунты администраторов нельзя модерировать здесь.
Ranking could not load. Try again.|Reyting yuklanmadi. Qayta urinib ko‘ring.|Рейтинг не загрузился. Попробуйте снова.
Administrator request failed. Check your access and try again.|Admin so‘rovi bajarilmadi. Ruxsatingizni tekshirib qayta urinib ko‘ring.|Запрос администратора не выполнен. Проверьте права и повторите.
Moderation failed. Check your access and try again.|Moderatsiya bajarilmadi. Ruxsatingizni tekshirib qayta urinib ko‘ring.|Модерация не выполнена. Проверьте права и повторите.`;
export const translations: Record<string, Record<Language, string>> = {};
for (const line of english.split('\n')) { const [en, uz, ru] = line.split('|'); translations[en!] = { en: en!, uz: uz!, ru: ru! }; }
for (const line of uzbek.split('\n')) { const [uz, ru, en] = line.split('|'); translations[uz!] = { uz: uz!, ru: ru!, en: en! }; }
export function translate(text: string, language: Language): string {
  const key = text.trim();
  const found = translations[key];
  if (found) return text.replace(key, found[language]);
  const code = /^(.*) (\[[A-Z0-9_]+\])$/.exec(key);
  if (code && translations[code[1]!]) return `${translations[code[1]!]![language]} ${code[2]}`;
  const serverError = /^AI server xatosi\. Ilova egasiga shu kodni yuboring: (HTTP_\d+)\.$/.exec(key);
  if (serverError && language !== 'uz') return language === 'ru' ? `Ошибка сервера ИИ. Передайте владельцу приложения код: ${serverError[1]}.` : `AI server error. Send this code to the app owner: ${serverError[1]}.`;
  const rankedXP = /^Ranked XP saved: \+(\d+)$/.exec(key);
  if (rankedXP && language !== 'en') return language === 'ru' ? `Рейтинговые XP сохранены: +${rankedXP[1]}` : `Reyting XP saqlandi: +${rankedXP[1]}`;
  const greeting = /^Good to see you, (.*)\. Let’s make a little progress\.$/.exec(key);
  if (greeting && language !== 'en') return language === 'ru' ? `Рады видеть вас, ${greeting[1]}. Сделаем ещё один шаг.` : `Sizni ko‘rishdan xursandmiz, ${greeting[1]}. Yana bir qadam tashlaymiz.`;
  const review = /^(Review|Revisit) (\d+) words$/.exec(key);
  if (review && language !== 'en') return language === 'ru' ? `Повторить ${review[2]} слов` : `${review[2]} ta so‘zni takrorlash`;
  const days = /^(\d+) kun$/.exec(key);
  if (days) return language === 'uz' ? text : `${days[1]} ${language === 'ru' ? 'дн.' : 'days'}`;
  const minutes = /^(\d+) daqiqa( · 1 soat)?$/.exec(key);
  if (minutes) return language === 'uz' ? text : `${minutes[1]} ${language === 'ru' ? 'мин.' : 'min'}${minutes[2] ? language === 'ru' ? ' · 1 час' : ' · 1 hour' : ''}`;
  const weeks = /^(\d+) haftalik maqsad$/.exec(key);
  if (weeks) return language === 'uz' ? text : language === 'ru' ? `Цель на ${weeks[1]} нед.` : `${weeks[1]}-week goal`;
  const start = /^(A1|A2|B1|B2) darslaridan boshlash$/.exec(key);
  if (start) return language === 'uz' ? text : language === 'ru' ? `Начать уроки ${start[1]}` : `Start ${start[1]} lessons`;
  const target = /^(\d+) hafta ichida (\d+) ta mashg‘ulot uchun vaqt ajratasiz\./.exec(key);
  if (target && language !== 'uz') return language === 'ru' ? `За ${target[1]} нед. вы планируете ${target[2]} занятий. Цель — строить ответы в выбранной ситуации и регулярно говорить.` : `You plan time for ${target[2]} sessions over ${target[1]} weeks. The goal is to build answers for your chosen situation and practise speaking regularly.`;
  return text;
}
