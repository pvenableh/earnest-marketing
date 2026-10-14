# Next session — voice on the homepage, two truth fixes, then the montage

Paste everything below the line into a fresh Claude Code session opened on
`~/Sites/earnest/earnest-marketing`.

---

We're continuing the "Move fast. Mean it." campaign on earnest.guru (Nuxt,
deploys to Vercel from `main`). Read these first, in this order:

1. `mockups/2026-10-move-fast/move-fast.html` — the animatic AND the campaign
   reference: storyboard, the eight motion rules, the language bank, the
   section-by-section map onto the homepage, the four-phase build path.
   Preview: `.claude/launch.json` → `mockups` → http://localhost:4173/2026-10-move-fast/move-fast.html
2. `app/components/GoodWork/Home.vue`, `app/data/good-work.ts` (its header is
   the CLAIM MAP — every number and ask on the homepage must trace to the app),
   `app/assets/css/good-work.css`.
3. `app/pages/privacy-policy.vue` §18 `#voice` — the voice facts, already
   verified against the app on 2026-10-13.

**Where things stand (2026-10-13):**
- Phase 1 is LIVE (`5cc4be8`): hero H1 "Move fast. Mean it.", lede "It drafts.
  You decide. Nothing reaches a client or moves money without your tap.",
  "Fast is never careless." over the never list, closing bookend, share image
  `public/og/move-fast.png` (source `mockups/2026-10-move-fast/og.html`).
- Privacy §18 "Voice, Phone Calls and Video Meetings" is LIVE (`63067d4`).
  It promises recordings are deleted from Twilio and Daily within 30 days of
  account closure. That's done by the app's cleanup cron at day 23
  (`earnest` repo `b457ea78`) — **committed on the app's local `main` but NOT
  pushed**. First thing: check `git -C ~/Sites/earnest/earnest log origin/main..main`.
  If `b457ea78` is still unpushed, tell Peter before anything else: the promise
  only holds once the app deploys (within ~3 weeks of today to be safe). Do
  not push the app yourself; its `main` carries other unshipped work.

**The one rule everything hangs on:** *Move fast* is Earnest's half (it
drafts, and on screen it's sped up); *Mean it* is the person's half (the tap
that email, invoices, payments and meetings always wait for, shown at real
speed). Never show or say a held action going out without the tap. Speed is
shown by the pace of the edit, never by numbers ("in seconds", "10×", clocks).
Don't sell Earnest in its own nouns (Home, column, lanes, lens…). No "hustle",
"autopilot", "#1".

## Part A — two truth fixes (small, do first)

1. **Meetings overclaim.** `app/data/features.ts` ~line 489 ("Meetings & AI
   Recap") says every room "auto-records and transcribes live the moment the
   host joins — and the same Earnest is right there in the room". Truth (app
   `server/utils/meeting-defaults.ts` `planDefaults`): Free gets neither; Solo
   transcribes, recording off by default; Team (`studio`) / Business
   (`agency`) / Enterprise both on; the host can change it per meeting.
   Earnest in a meeting is a TEXT side panel (`Meeting/EarnestPanel.vue`) — it
   never speaks or listens in the call. Rewrite the desc and bullets, then
   `node scripts/build-llms-txt.mjs` (and `--check`).
2. **Retention contradiction — ask Peter, don't guess.** Privacy §9 says
   "Upon account deletion, we will delete or anonymize your personal
   information within 30 days", and `app/pages/data-deletion.vue` describes a
   "Settings → Account → Delete Account" flow. The app archives an org and
   hard-deletes it after 90 days (`shared/org-retention.ts`
   `ORG_RETENTION_DAYS`, `ArchiveOrgSheet.vue`, `server/api/org/cleanup-archived.ts`).
   Verify in the app what deleting a personal account vs archiving an org
   actually does and when, then show Peter the mismatch and the two honest
   options (policy says 90, or app shortens to 30). Change nothing until he picks.

## Part B — voice in the campaign

Voice ships on every plan (browser Web Speech API; no Firefox): the mic in
Earnest's composer, replies read aloud (each reply has a short spoken
`<say>` line), and Hands-free — "Hey Earnest, …" with spoken yes/no. **Email,
invoices and meetings can never be approved by voice** (`AUTONOMY_SAFETY_FLOOR`,
app `useHandsFree.ts`). That's the campaign in miniature: your voice gets it
moving, your hand makes it real. Custom Voice ($9/mo) reads replies in hosted
ElevenLabs voices. The phone lines have NO AI on calls — never imply a
receptionist.

1. Homepage FAQ in `homeFaqs` (`app/data/good-work.ts`; it also feeds the
   FAQPage JSON-LD): "Can I just talk to it?" — the honest answer above, with
   both the HTML `a` and the plain `aText` twin.
2. The "Say the next move" beat (`beatsOpen[1]`): one line that says you can
   say it out loud, and that held things still wait for your tap. Keep the
   column's ask/claim map intact.
3. The animatic: add a cut "Say it. Tap it." — "Hey Earnest, chase Meridian"
   arrives as voice (a listening state in the composer, the words streaming
   in), the card is read aloud (show the spoken line), then the real-time tap.
   Update SCENES, DUR, the scrubber marks, the storyboard copy (":23" appears
   in several places) and the language bank.
4. `scripts/build-llms-txt.mjs` "How it works": one line on voice, true to the above.

## Part C — Phase 2: `GoodWork/Montage.vue` (the main build)

Port the animatic's timeline engine (the `<script>` at the foot of
`move-fast.html`: one clock `t`, the stage a pure function of it; `data-at`,
`data-type`/`data-type-end`, `data-tap`, `data-l` are local times inside each
`.shot`) into a component that takes the parked app scrub's place in
`Home.vue` (`<GoodWorkScrub v-if="appSequence" …>`; `appSequence` is `null`
because the demo recording disagreed with the page — see `good-work.ts`).

- Driven by SCROLL (a pinned section; scroll progress → `t`), reusing
  `GoodWork/Column.vue` for the panel and the claim-map data for every ask,
  fact and card — no new numbers.
- Five cuts → the ✓ receipts → "Move fast." Then let the existing "Steady."
  section be the stillness (that speed-ramp is Phase 3; don't build it yet).
- Motion rules from the animatic: whip only inside the montage, the tap held
  real-time with the background slowed, ✓ copy says what really happened.
- Reduced motion / no JS / server render: a static, readable sequence (the
  five cuts as a list of columns or one representative frame) — never an
  empty pinned box. Follow how `useGoodWorkMotion.ts` and the creed handle it.
- Light and dark (`data-gw-mode`), phone width with no sideways scroll.

## How to work here

- Dev server: `marketing-dev` in `.claude/launch.json` → http://localhost:3001
  (127.0.0.1 gives HTTP 426). The Browser pane reports a 0×0 viewport; verify
  with a local Playwright script instead:
  `PLAYWRIGHT_MODULE=/Users/peterhoffman/Sites/earnest/earnest/node_modules/playwright`,
  `chromium.launch({ channel: 'chromium' })` (headless-shell crashes on this site),
  plus `getComputedStyle` checks. Screenshot desktop light, desktop dark, 390px.
- Facts about the app come from the app repo (`~/Sites/earnest/earnest`), read
  not assumed. If a claim can't point at code, it doesn't go on the page.
- Commit in logical pieces on `main` locally; ask Peter before pushing (a push
  deploys earnest.guru). End commits with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Done = Part A1 shipped + A2 put to Peter; Part B 1–4 committed; Montage.vue
  rendering in place of the scrub, verified in both modes and on a phone, with
  screenshots shown to Peter. Then update the "On the site" table and build
  path in `move-fast.html` to say what's done.
