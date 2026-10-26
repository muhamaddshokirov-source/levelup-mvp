# IELTS, assistant and daily workout

## IELTS materials and source

Reference checked on 26 October 2026:
https://ielts.org/cdn/ielts-downloadable-assets/ielts-sample-tests/ielts-speaking-sample-tasks-2023.pdf

The `official` pack contains short sample questions and a cue card from the IELTS.org examiner frames; its first question expands the original short question to supply the missing home-town context. The UI explicitly states that some wording is adapted. No candidate transcript, recording or model answer from that PDF was copied. The other two packs are **original LevelUp practice** in the IELTS task format, explicitly marked as not official exam questions or predictions. The user did not supply a specific “IELTS Speaking Practice” URL; no affiliation with a similarly named site is claimed.

`src/domain/ielts.ts` holds 3 packs × (4 Part 1 questions + 1 Part 2 cue card + 3 Part 3 questions): 24 practice tasks. Part 2 has a 60-second preparation stage and up to 120 seconds of speaking. Part 1/3 timers are optional per-question practice defaults, not claimed full-exam section timings. There is no band prediction, certification or pronunciation/fluency score.

`IELTSPractice.tsx` preserves per-task drafts and cue-card notes across part/pack/mode navigation until reload. Browser dictation is optional, requires separate consent, supports live interim text and a longer 120-second turn without the short-pause auto-stop used in calls. Browsers can still end recognition early; the user can resume without losing the existing answer. Local recording and dictation are mutually exclusive. The AI review action only transfers the current prompt/text to the existing review screen; approval, verification and submission remain required there.

## AI assistant

`AIAssistant.tsx` adds a real, optional Gemini-backed text coach for speaking plans, explanations and answer development. Prepared quick-start buttons only fill a draft. The `assistant` request mode is separately validated, uses bounded history, supports UZ/RU/EN explanations, and inherits exact-origin CORS, Turnstile and existing free-tier quotas. Four exchanges per session keep it bounded. No access to microphone, private notebook or external web tools is claimed. Switching modes retains the draft but cancels an in-flight request. Reload clears messages. **The updated Render server must be deployed for the assistant mode to work.** Older servers produce an explicit update/error message, not fake AI content.

## Today is now a workout

`dailyWorkout.ts`, `useDailyWorkout.ts` and `TodayScreen.tsx` provide date-rotating warm-up, the existing XP-bearing daily answer, and a separate idea-development stretch. Warm-up is explicitly self-reported. Stretch requires at least eight English words. Extra progress and stretch text are stored in `@levelup/workout/v1`, bounded to 14 dates. Failed/corrupt reads are not silently overwritten. These extra steps do not award XP. The original daily answer format, question identity, 50-XP-once rule, weekly mission, historical sessions and shared ranking rules stay unchanged.

The new Today hero uses `assets/speaking-studio.webp`, an AI-generated illustration cropped/optimized for this product. Its dimensions are bounded on desktop/mobile; no fake human testimonial or player photo is used. Repeated level/motivation panels and rule-based demo-feedback clutter were removed from Today. The five primary destinations remain unchanged. AI submodes share one compact header and preserve their drafts while hidden; only the active mode can use speech/request services.

## Validation and limits

`check-ielts-workout.cjs` mocks speech/Gemini/Turnstile and uses real local storage/navigation. It verifies the 3-step routine and XP-once persistence, 60/120-second transitions, long-turn dictation, notes and drafts, source labels, review consent boundary, assistant mode/language and quota draft recovery at 320/390/1280px. Domain tests validate question-bank structure, review bounds and workout retention. Backend tests cover assistant instruction and validation/security. Existing mobile/display/voice/recording tests continue to apply.

Physical microphone quality, vendor speech-service availability, mobile permission/autoplay behaviour and the live Render rollout still require real-device/live validation. The implementation is not realtime full-duplex audio and no paid service was enabled.
