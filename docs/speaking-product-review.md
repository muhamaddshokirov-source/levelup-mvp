# LevelUp speaking: reference review and implementation

Research date: 26 October 2026. Desk research of public product descriptions, not hands-on paid subscriptions or an independent accuracy benchmark. Product claims below are attributed to their owners. No claim that LevelUp outperforms them.

## Official references

- Speak: https://www.speak.com/ — describes Learn → Practice → Apply, guided phrases followed by AI conversation, personalization and pronunciation feedback. Adopted the learning loop, not its proprietary speech stack.
- Praktika: https://praktika.ai/ — describes personal plans, contextual phrase suggestions, gentle corrections and free conversation. Adopted low-friction support and realistic situations, without copying avatars or promising its speech accuracy.
- ELSA role-play FAQ: https://elsaspeak.com/en/faqs/roleplays/ — describes real-life role-play and post-conversation feedback including pronunciation, vocabulary and grammar. Adopted explicit review after practice. LevelUp cannot reproduce pronunciation analysis from a text-only Gemini request.

## Problems in LevelUp before this pass

Three generic topics; no clear communicative goal; fixed voice speed and silence gap; no in-conversation scaffolding; AI/text-review and notebook were disconnected; the transcript did not turn into a repeatable learning task. Repeated full-width cards also weakened the desktop hierarchy.

## Implemented loop

1. **Prepare:** six situations (daily life, travel, interview, café, work meeting, opinion), role and communicative goal; self-selected A1–B2 defaults from learner profile. Advanced controls tuck away behind Practice settings.
2. **Speak:** actual speech/listening/thinking/verification status, live transcript, manual fallback, optional longer 3.5-second pause and relaxed 0.8x browser voice. Existing default speech hook settings remain for other callers. No microphone during TTS. Error, visibility, cap and cancellation protections retained.
3. **Support:** prepared hint, adaptable model and two relevant phrases per situation. A hint pauses a live call rather than allowing microphone transmission while reading guidance. Using an example only fills a draft. Saving a phrase writes the real, existing local vocabulary notebook with meaning and example, including duplicate/loading/error handling.
4. **Reflect:** counts of submitted learner turns, words and words per reply, plus a concrete self-review prompt. Never scores for audio, fluency or CEFR. At 20+ learner words the review action transfers bounded learner text to the existing AI feedback screen; explicit consent/verification and submit remain required there.
5. **Repeat:** repeat-situation action clears the unsaved conversation for another attempt. No new chat history retention or fake XP.

Desktop uses preparation/permissions on the left and practice/review on the right; mobile stacks. Permissions collapse only after both consents are given and can be reopened/revoked. All new UI copy is translated in UZ/RU/EN; English teaching material intentionally remains English.

## Reliability changes outside the AI screen

Daily-practice timer pauses when its tools/page become inactive. Local voice recorder shows actual elapsed recording time, prevents duplicate pending microphone requests and rejects permission results that arrive after the page closed. Existing local-only audio and two-minute cap remain.

## Limits and validation

Gemini is still protected by exact-origin CORS, Turnstile, per-minute/daily quotas, bounded history and a six-turn cap. New optional practice-level input is validated server-side and adjusts the instruction without certification claims. Deploy the updated backend to enable that instruction; the question also carries the practice context for backward compatibility. No paid audio model, realtime interruption, speech accuracy guarantee, durable cloud conversation memory or pronunciation scoring was added.

Domain/backend tests cover scenario completeness, evidence-only counts, bounded review text, level instructions and existing security. Browser tests mock speech/provider/verification; notebook persistence, UI handoff and navigation use the real app. Physical device QA (Chrome Android, Safari iOS, desktop; permission denial; slow network; natural pauses and accented English) and live backend validation remain necessary before describing this as production-grade speech accuracy.
