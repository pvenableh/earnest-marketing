# Next session — Phase 4, the spot

Paste everything below the line into a fresh Claude Code session opened on
`~/Sites/earnest/earnest-marketing`.

---

We're continuing the "Move fast. Mean it." campaign on earnest.guru (Nuxt,
deploys to Vercel from `main`). Phases 1–3 are built. This session is
**Phase 4: the spot.** Turn the animatic into real video files: a :24 in
16:9 and 9:16 at 1080p with a sound bed, then a :15 and a :06. Read these
first, in this order:

1. `mockups/2026-10-move-fast/move-fast.html`: the animatic (the stage, its
   timeline, its click track), the eight motion rules, the storyboard, and
   the cut-downs: *"To make a :15, drop cuts 3 and 4 and halve each cut to
   two beats (keep 'Say it. Tap it.' at four: the tap is the point). For a
   :06 bumper, use the open, 'Move fast.', 'Mean it.' and the end card."*
   Preview: `.claude/launch.json` → `mockups` →
   http://localhost:4173/2026-10-move-fast/move-fast.html
2. `mockups/2026-10-move-fast/README.md`, and memory `move-fast-campaign-2026-10`.
3. For the shared engine on the live site (if a cut-down needs it):
   `app/composables/useCutTimeline.ts`, used by `GoodWork/Montage.vue`,
   `Cut.vue` and `HeroLoop.vue`.

**Where things stand (2026-10-14):**
- LIVE: Phases 1–2 (hero copy, the montage, voice FAQ, deletion copy).
- BUILT on local `main`, check whether Peter has pushed them (`git status`,
  `git log origin/main..main`): 2922a18 one cut timeline (useCutTimeline),
  cc899f7 Know/Say micro-cuts (`Cut.vue`), 41ae547 Keep your word on the
  beat, 2a9b390 Steady speed ramp, 95bddc2 hero loop (`HeroLoop.vue`, ≥901px
  only), 9537139 client-photo beats at real speed.
- Questions put to Peter on 14 Oct (check the memory for his answers before
  touching them): the Know/Say eyebrows → "Know it" / "Book it"; a seventh
  creed line; the "Hear the truth" vs montage third-reminder tension; and
  `app/pages/data-deletion.vue` §3–4 vs what the app really does.

**The one rule:** *Move fast* is Earnest's half (it drafts; on screen it's
sped up). *Mean it* is the person's half: the tap that email, invoices,
payments and meetings always wait for, shown at real speed. Never show a held
action going out without the tap. Speed is shown by the pace of the edit,
never by numbers. Don't sell Earnest in its own nouns. No "hustle",
"autopilot", "#1". Every ask, fact and card comes from the claim map
(`app/data/good-work.ts`). No new numbers.

## Part A: record the stage, frame by frame

Real-time screen recording (Playwright `recordVideo`) drops frames and is
soft. Render deterministically instead:

1. The animatic's script is an IIFE with `seek(ms)` and `render()` inside.
   Expose a recording hook only when the URL has `?record`, e.g.
   `window.__animatic = { DUR, seek, setAspect }`, and hide the page chrome
   so the stage alone fills the viewport. Don't change how the page behaves
   without `?record`.
2. The background is a `<video>` whose playback rate changes along the
   timeline (fast through the montage, ramping 3× → 0.35× into "Mean it.").
   For a deterministic frame, compute the footage's own time as the integral
   of that rate up to `t` and set `video.currentTime`, waiting for `seeked`
   before each screenshot. Write that rate function once and use it for both.
3. Playwright with `chromium.launch({ channel: 'chromium' })` (headless-shell
   crashes on this site),
   `PLAYWRIGHT_MODULE=/Users/peterhoffman/Sites/earnest/earnest/node_modules/playwright`.
   Viewport 1920×1080 (16:9) and 1080×1920 (9:16), `deviceScaleFactor: 1`.
   Seek, wait two rAFs, screenshot to PNG at 30 fps (720 frames for the :24).
   Light and dark: the animatic has one look; use it as it is.
4. `ffmpeg` is at `/usr/local/bin/ffmpeg` (8.1). Encode H.264, yuv420p,
   `-crf 18`, `+faststart`. Put renders in `mockups/2026-10-move-fast/out/`
   and gitignore that folder: video doesn't go in the repo. Send Peter the
   files with SendUserFile.
5. Check: the 400ms tap holds really hold (count frames: 12 at 30 fps), the
   whips are 140ms (4 frames, never a dissolve), nothing is cut off in 9:16,
   and the end card is clean for a thumbnail.

## Part B: sound

A dry percussion bed at 120 bpm that drops out at "Mean it." (room tone
only), with a tap sound on each real-time tap. The animatic already
synthesises this (`blip('hat' | 'kick' | 'tap')`, WebAudio). Two options;
put them to Peter before choosing:

- **Render the animatic's own synth offline** (an `OfflineAudioContext` with
  the same schedule, exported to WAV, muxed with ffmpeg). Free, exact to the
  frame, but it sounds like a sketch.
- **A licensed track** cut to 120 bpm. Check the licence page before
  downloading anything; Mixkit has two licences and only the free one allows
  commercial use. Ask Peter before any download.

## Part C: the cut-downs

- **:15** as the reference says: drop cuts 3 and 4, halve each cut to two
  beats, keep "Say it. Tap it." at four. Build it as a second timeline in
  the animatic (a `?cut=15` param), not as a separate page.
- **:06 bumper**: the open, "Move fast.", "Mean it.", the end card.
- Both aspects for each. Name the files `move-fast-24-16x9.mp4`, etc.

## How to work here

- Mockups server: `mockups` in `.claude/launch.json`. Marketing dev server:
  `marketing-dev` → http://localhost:3001 (127.0.0.1 gives HTTP 426).
- Verify with a local Playwright script, not the Browser pane. The homepage
  has `scroll-behavior: smooth`: scripted scrolls must use
  `scrollTo({ top, behavior: 'instant' })`. Headless screenshots can catch a
  140ms CSS entry animation at its first keyframe (the column looks blank);
  sample `getComputedStyle` per rAF to tell a capture artifact from a bug.
- Commit in logical pieces on `main` locally. Ask Peter before pushing (a
  push deploys earnest.guru) and before posting anything anywhere. End
  commits with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Done = the :24 in both aspects with sound, the :15 and :06 in both, sent to
  Peter; the "Beyond the page" row and the Phase 4 card in `move-fast.html`
  marked; the Phase 5 prompt written here (posting plan: Reels, Shorts,
  LinkedIn, the YouTube bumper, the email sign-off); memory updated.
