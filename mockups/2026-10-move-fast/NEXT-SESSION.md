# Next session — Phase 5, posting the spot

Paste everything below the line into a fresh Claude Code session opened on
`~/Sites/earnest/earnest-marketing`.

---

We're continuing the "Move fast. Mean it." campaign on earnest.guru (Nuxt,
deploys to Vercel from `main`). Phases 1–4 are done. This session is
**Phase 5: getting the spot seen.** A posting plan for Reels, Shorts,
LinkedIn, a :06 YouTube bumper, and "Move fast. Mean it." as the email
sign-off. Read these first, in this order:

1. `mockups/2026-10-move-fast/README.md`: the page, the cut-downs, and how
   `record.mjs` renders the spot.
2. `mockups/2026-10-move-fast/move-fast.html`: the animatic, the motion
   rules, the language bank ("Fast hands. Your say." is the short social
   line), and the "Beyond the page" row. Preview: `.claude/launch.json` →
   `mockups` → http://localhost:4173/2026-10-move-fast/move-fast.html
   (`?cut=15`, `?cut=6` for the cut-downs).
3. Memory `move-fast-campaign-2026-10`.

**Where things stand (2026-10-14):**
- LIVE: Phases 1–3 on earnest.guru.
- Phase 4 rendered: `mockups/2026-10-move-fast/out/` holds
  `move-fast-{24,15,06}-{16x9,9x16}.mp4` (1080p30, H.264, AAC at −14 LUFS).
  `out/` is gitignored, so the files exist only on Peter's Mac: if it's
  empty, re-render (README, ~25 min for all six).
- Sound: the six files carry the animatic's own synth bed. Licensed
  alternatives were cut for Peter to audition, from three Mixkit tracks
  (Stock Music Free License: social video posts, online ads and YouTube are
  allowed; TV/radio, music-only remixes and Content ID registration are not):
  `out/move-fast-24-16x9-{tech-house,hazy,deep-urban}.mp4`, sent to Peter
  on 14 Oct. **Ask which bed he chose** before anything is posted. To put
  one on all six files (the MP3s are in `out/tracks/`; re-download from
  Mixkit if `out/` was cleared), run `record.mjs --remux` with:
  - Tech House vibes (Mixkit 130, 122 bpm):
    `--bed out/tracks/tech-house-vibes.mp3 --bpm 122 --from 16.307`
  - Hazy After Hours (Mixkit 132, 121 bpm):
    `--bed out/tracks/hazy-after-hours.mp3 --bpm 121 --from 16.936`
  - Deep Urban (Mixkit 623, 124 bpm):
    `--bed out/tracks/deep-urban.mp3 --bpm 123.98 --from 16.488`
  (no `--tag`, so the files keep their plain names). `--from` is a kick in
  the source, checked against the film's 0.5s grid. The synth files are at
  about −19 LUFS (their loudness is all transients); the licensed mixes at
  −14. The licence text asks for no credit; it forbids registering the
  music with any rights-management service (Content ID), and says to
  forward any claim to team@mixkit.co.
- Still Peter's to decide (don't change them unasked): the Know/Say eyebrows
  ("Know it" / "Book it"; recommendation: keep "One screen" / "From any
  screen"); a seventh creed line (recommendation: no); "Hear the truth" says
  "I'd call before I write a third reminder" while the montage's last cut
  sends the third reminder.
- App-side gaps (app repo, not this one; the site promises none of them):
  no Meta Data Deletion Request endpoint, no TikTok deauthorize endpoint,
  Meta/Threads deauthorization keeps revoked rows indefinitely, Disconnect
  revokes at the provider only for Google Calendar and Stripe. Mention them
  if Meta or TikTok app review comes up.

**The one rule:** *Move fast* is Earnest's half (it drafts; on screen it's
sped up). *Mean it* is the person's half: the tap that email, invoices,
payments and meetings always wait for, shown at real speed. Never show a
held action going out without the tap. Speed is shown by the pace of the
edit, never by numbers. Don't sell Earnest in its own nouns. No "hustle",
"autopilot", "#1". Every ask, fact and card comes from the claim map
(`app/data/good-work.ts`). No new numbers — in captions too.

## Part A: the plan, put to Peter before anything is posted

Write it as a table in `move-fast.html` (a "Posting" section after "On the
site"), one row per placement: file, aspect, length, caption, first frame /
thumbnail, link, and when. Check each platform's current specs on its own
help pages (they change): length limits, safe zones, caption length, cover
image. Things to settle with Peter:

- **Which accounts.** We don't know which Earnest accounts exist on
  Instagram, YouTube and LinkedIn, or whether Peter posts as himself. Ask.
- **Safe zones in 9:16.** Reels and Shorts lay UI over the bottom of the
  frame (caption, buttons) and the top. In the 9:16 the column's composer
  sits in the bottom ~10% and the "Real time · your tap" tag top-right.
  Check stills against the platforms' safe-zone guides
  (`record.mjs --cut 24 --aspect v --still 5200,12400`). If the tap or the
  card falls under UI, the fix is in the 9:16 stage CSS
  (`.stage[data-aspect="v"] .colwrap` bottom, `.rt` top), then re-render
  the 9:16s only.
- **Captions** in the language bank's voice: verbs said to the person,
  "Nothing goes out without you.", sign-off "Earnest. Do good work." and
  earnest.guru. No claims the film doesn't show.
- **The :06 bumper** runs as a YouTube ad (Google Ads, bumper format), so it
  needs an ad account and spend: Peter's call entirely. The YouTube upload
  itself can be unlisted until then.
- **Burned-in subtitles?** The spot has no voice-over; the spoken line in
  "Say it. Tap it." is on screen as text. Probably none needed — say so.

## Part B: the email sign-off

"Move fast. Mean it." over "Earnest. Do good work." in the app's email
footer. That's the app repo (`~/Sites/earnest/earnest`):
`server/emails/_header.mjml`, `_footer.mjml`, `server/utils/email-shell.ts`.
Which emails? Marketing ones (early-access welcome) certainly; transactional
ones (password reset, receipts) probably not — ask Peter. App changes go on
the app's own branch and push rules; ask before pushing either repo.

## Part C: the site

If Peter wants the spot on earnest.guru (e.g. the :15 behind a "Watch" link
or in the hero), it needs a host: video stays out of git, and Vercel serves
`public/` from the repo. Options: a YouTube/Vimeo embed (privacy-enhanced
mode, and the privacy policy's third parties), or Vercel Blob. Don't add it
unasked.

## How to work here

- Mockups server: `mockups` in `.claude/launch.json`. Marketing dev server:
  `marketing-dev` → http://localhost:3001 (127.0.0.1 gives HTTP 426).
- `record.mjs` needs
  `PLAYWRIGHT_MODULE=/Users/peterhoffman/Sites/earnest/earnest/node_modules/playwright`
  and `chromium.launch({ channel: 'chromium' })` (headless-shell crashes).
- Never post, upload, or send anything without Peter's explicit yes for
  that action. Commit in logical pieces on `main` locally; ask before
  pushing (a push deploys earnest.guru). End commits with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Done = the posting plan agreed with Peter and written into
  `move-fast.html`, the email sign-off decided (and built if he says so),
  whatever he approves posted, memory updated, the Phase 6 prompt (or a
  wrap-up) written here.
