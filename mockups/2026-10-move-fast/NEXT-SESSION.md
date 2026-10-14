# Next session — Phase 3, the rhythm

Paste everything below the line into a fresh Claude Code session opened on
`~/Sites/earnest/earnest-marketing`.

---

We're continuing the "Move fast. Mean it." campaign on earnest.guru (Nuxt,
deploys to Vercel from `main`). Phases 1 and 2 are live. This session is
**Phase 3: the rest of the homepage moves on the campaign's rhythm.** Read
these first, in this order:

1. `mockups/2026-10-move-fast/move-fast.html`: the animatic, the eight
   motion rules, the language bank, and the "On the site" table. Its Phase 3
   rows are this session's spec. Preview: `.claude/launch.json` → `mockups` →
   http://localhost:4173/2026-10-move-fast/move-fast.html
2. `app/components/GoodWork/Montage.vue`: the Phase 2 engine. Scroll sets one
   clock `t`, and the stage is a pure function of it. The tap is the
   exception: once reached, it plays 400ms on a real clock with the footage
   slowed to 0.08×. A per-cut "plan" holds the local times (ask, lede, facts,
   card, say, tap, stamp).
3. `app/components/GoodWork/Column.vue`: its optional `frame` prop
   (`ColumnFrame` in `app/data/good-work.ts`) draws a column mid-motion.
   Without a frame it is drawn whole. Also read `good-work.ts` (its header is
   the CLAIM MAP, and `montage` holds the five cuts) and `Home.vue`.
4. `app/composables/useGoodWorkMotion.ts`: reveals, the creed, and ambient
   video (in view only, never under reduced motion or Save-Data).

**Where things stand (2026-10-14):**
- LIVE: hero "Move fast. Mean it." (5cc4be8); the montage in the old scrub's
  place, five cuts ending on "Say it. Tap it." (e273fe1); the voice FAQ and
  "typed or out loud" (cddf73c); the meetings truth fix (ecc3398); the
  animatic at :24 with the voice cut (528429c); deletion copy matching the
  app (8f8c593).
- App side: the archive purge and day-23 recording deletion are live
  (`ORG_CLEANUP_DRY_RUN=false`, app d1a737b3).

**The one rule:** *Move fast* is Earnest's half (it drafts; on screen it's
sped up). *Mean it* is the person's half: the tap that email, invoices,
payments and meetings always wait for, shown at real speed. Never show a held
action going out without the tap. Speed is shown by the pace of the edit,
never by numbers. Don't sell Earnest in its own nouns. No "hustle",
"autopilot", "#1". Every ask, fact and card comes from the claim map. No new
numbers.

## Part A: share the engine first

The four pieces below all play cuts. Before building them, lift the
timeline out of `Montage.vue` into one place: a cut plan built from a
`Column`, a `frame(lt, tapState)`, and the real-clock tap, e.g.
`app/composables/useCutTimeline.ts`. Then Montage and everything below use
it, with no second copy. The montage must behave exactly as before: re-run
the checks in "How to work here" on it.

## Part B: Phase 3 (from the "On the site" table)

1. **Know / Say beats: micro-cuts.** The columns beside "Know where you
   stand" and "Say the next move" each play their cut once, by clock, when
   they come into view: ask types, reply, card, tap at real speed, ✓. Then
   they rest drawn whole. No whips here: those belong only inside the
   montage. Eyebrows become the verbs ("Know it", "Book it"). Ask Peter
   before replacing "One screen" / "From any screen" if that loses meaning.
2. **Keep your word: on the beat.** The three steps (Signed → Project →
   Billed) arrive 500ms apart, and the last ends with a ✓ "Billed" stamp.
   Same data.
3. **Steady.: the speed ramp.** As "Steady." scrolls into view, the field
   loop's playbackRate eases from 2× to 0.35×, so the page does what the film
   does: fast, then still. It's driven by scroll position, in
   `useGoodWorkMotion` beside the ambient-video code. Under reduced motion or
   Save-Data there's no video at all, as now.
4. **Hero: a loop of four asks.** Over the office loop, under the H1, one
   column cycles four asks on the beat, by clock. Use four of the montage's
   cuts and give each the real-time tap. It pauses when off screen or the tab
   is hidden. Under reduced motion it's one still column. It must not push
   the hero's CTAs or the plain "what is this" paragraph (Google's OAuth
   review reads it) below the fold on a phone. If it can't fit at 390px, it
   shows from 900px up and phones keep today's hero. Say which you chose.
5. **Client photo beats** (optional, last): their columns play at real
   speed with no whips, as the counterpoint to the montage.

## Part C: small things to put to Peter (don't change, ask)

- **Creed:** add a seventh line, "Good work moves fast — and means it.",
  before "It needs a better Tuesday."? The reference recommends keeping the
  creed out of the campaign.
- **"Hear the truth" vs the montage:** that column's Earnest says "I'd call
  before I write a third reminder", while the montage's last cut sends the
  third reminder. Leave it, or change the montage's lede?
- **`app/pages/data-deletion.vue` §3–4:** these describe a "Settings →
  Connected Accounts" disconnect screen, a 24-hour token removal, and a
  choice of which synced data to delete. None of that was found in the app on
  2026-10-14. The page may matter for Meta and TikTok app review. Verify
  against the app (`~/Sites/earnest/earnest`), then show Peter the
  differences.

## How to work here

- Dev server: `marketing-dev` in `.claude/launch.json` →
  http://localhost:3001 (127.0.0.1 gives HTTP 426). Verify with a local
  Playwright script, not the Browser pane:
  `PLAYWRIGHT_MODULE=/Users/peterhoffman/Sites/earnest/earnest/node_modules/playwright`,
  `chromium.launch({ channel: 'chromium' })` (headless-shell crashes on this
  site). Screenshot desktop light, desktop dark, 390px, and reduced motion
  (`reducedMotion: 'reduce'`). Check `scrollWidth === innerWidth`.
- ⚠️ The page has `scroll-behavior: smooth`. Scripted scrolls must use
  `scrollTo({ top, behavior: 'instant' })`, or the readings lag.
- `curl http://localhost:3001/` shows the server render. Every moving piece
  needs a readable still there (no empty boxes), and no hydration warnings
  in the console.
- Facts about the app come from the app repo, read, not assumed. If a claim
  can't point at code, it doesn't go on the page.
- Commit in logical pieces on `main` locally. Ask Peter before pushing (a
  push deploys earnest.guru). End commits with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Done = Part A in place with the montage unchanged; Part B 1–4 committed
  (5 if time allows), each verified in both modes, on a phone and under
  reduced motion, with screenshots shown to Peter; Part C put to him. Then
  mark the Phase 3 rows in `move-fast.html`'s "On the site" table, write the
  Phase 4 prompt here (record the stage to MP4 with Playwright at 1080p in
  both aspects, a sound bed, a :15 and a :06), and update memory.
