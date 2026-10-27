# Global first impression and try-before-you-plan funnel

## Product question

A speaking-practice app should demonstrate its core action before asking someone to configure a multi-step plan. The first screen now offers both plan setup and a 30-second tryout. That tryout is part of the real product lesson preview, rather than a fake animated demo, fabricated learner review, or external marketing checkout.

## What the user can do before onboarding

- On a first visit, the interface follows the browser's first supported locale among English, Russian and Uzbek, otherwise English. A visible EN/RU/UZ control is available before any setup; saved choices always take precedence on subsequent visits.
- Open Prepare / Speak / Reflect to preview a real starter lesson's phrases, prompt and disclosed example.
- Hear the question in the device/browser speech voice.
- With a separate opt-in, start up to 30 seconds of browser-provider speech recognition and view the evolving English transcript; alternatively type a response without voice permission.
- Read a deterministic, text-only prompt to add a reason or example. It does not claim to be AI, a level assessment, pronunciation review or an IELTS score.
- Continue to plan setup or leave without registering. Preview text is not uploaded or persisted by LevelUp and clears on reload.

## Privacy and technical boundaries

Browser speech-recognition providers can process microphone audio outside LevelUp. This is explicitly disclosed beside the opt-in switch before recording starts. The user can type instead. The landing demo does not call the Gemini endpoint, Turnstile, Supabase, analytics or cookies and does not store voice or draft answers. Clicking the main plan CTA is a distinct, explicit next action.

The sample TTS relies on the device/browser's speech-synthesis voice; its sound and availability vary by device. Voice synthesis happens only on the user's click. Browser speech recognition availability and accuracy vary by browser, device, locale, microphone and network; the transcript is not guaranteed to be accurate. This is a tryout, not a full-duplex AI conversation.

## Product/brand choices

- Retain the restrained navy/lime LevelUp product identity and actual interactive lesson preview; add the existing compact studio illustration in context, not stock-photo hero decoration.
- Keep a single primary setup action and a visible, lower-commitment speaking demo. Avoid invented ratings, testimonials, learner counts, guaranteed fluency, pronunciation-accuracy claims or competitor-superiority statements.
- Preserve the free accountless core and make speech-provider processing explicit.
- The English-first browser default helps an international first visit, while saved language settings and a persistent selector protect returning Uzbek/Russian/English learners. Only EN/RU/UZ UI translations are currently available.

## Validation

`node scripts/check-landing-demo.cjs` mocks browser speech, checks browser locale selection and persistence, TTS prompt, microphone consent before recognition, transcript update, local reflection, absence of direct API calls and 320/390/1280px overflow. It cannot validate real speech quality, live browsers' microphone policies or international product-market fit. Those require user/device research; this change is not proof that LevelUp will win a global market.

## Market references

- Speak product site: https://www.speak.com/ — positions guided speech practice, conversation and follow-up as a usable learning loop.
- ELSA's official January 2026 product update: https://elsaspeak.com/en/blog/discover-the-new-elsa-speak-experience-njagqnpovhlnudw7smn1tds1 — emphasizes matching lessons to learner level, goal and interests, plus contextual role-play.

These references informed the immediate tryout and clear user-selected starting point. This was a review of published product descriptions, not a paid hands-on, market-share or superiority study. LevelUp does not make pronunciation-analysis claims or advertise itself as objectively better.

## IELTS visual library

Three product-specific landscape images are used on the corresponding official-sample/LevelUp-original IELTS topic cards. They also introduce the IELTS entry card on Today. They were generated as original LevelUp illustrations, resized to 894×600 and quality-optimized JPEGs (roughly 72–141 KB each) for mobile performance. The IELTS questions themselves remain text, and imagery is not described as official IELTS artwork.
