# Brief — Take the marketing site LIVE: simplify + stronger screenshots

> Paste this whole file as the first message of a new session (working dir:
> `~/Sites/earnest/earnest-marketing`). It is self-contained.

## Context

The Earnest **app is now live in production** at `https://app.earnest.guru` — real
signup works (`/register` → org-creation wizard with an AI "brand voice" step),
the client portal is live, white-label branding works, and the passwordless demo
is public (`/try-demo?persona=solo` and `?persona=agency`). The marketing site has
been gating everything behind an **"early access" request form** ("while we
finalize production"). That framing is now wrong — **the product is live and open
for signup.** Your job: retire the early-access gate, simplify the landing page,
refresh the screenshots into something genuinely impressive, and ship it.

## The repo

- Path: `~/Sites/earnest/earnest-marketing` — Nuxt **3.15.4**, static (`nuxt
  generate`). Git `main` → `pvenableh/earnest-marketing`.
- Run locally: `pnpm dev` (⚠️ Nuxt binds IPv4 — open `http://127.0.0.1:3001`,
  NOT `localhost`, or you may get a 426). Build check: `pnpm generate`.
- Landing page: `app/pages/index.vue` → renders `<SellSheetGlass />` (the current
  "glass" hero experience). The previous homepage is preserved at `/classic`
  (`SellSheetModern.vue`). Legal pages: `privacy-policy`, `terms-of-service`,
  `data-deletion`. Other sell-sheets: `SellSheetAutomation`, `SellSheetDirector`.
- Confirm the deploy mechanism before shipping: check for a Vercel project /
  GitHub Action (there's no `vercel.json` in-repo). The bare domain
  `earnest.guru` is the marketing site (the app is `app.`, Directus is `admin.`).
  Most likely: **push to `main` auto-deploys**. Verify, don't assume.

## Task 1 — Remove the early-interest form; point CTAs at the live app

The early-access form is `app/components/GlassEarlyAccess.vue` (multi-step: name/
email/role/company/goals/timeline → POSTs to a Directus flow
`/flows/trigger/<EARLY_ACCESS_FLOW_ID>`). It's opened by `openEarlyAccess()` — and
**almost every CTA in `SellSheetGlass.vue` calls it** ("Start for free" x2, the
hero prompt buttons, the hunt/re-approach demo buttons, etc.). `SellSheetModern.vue`
also embeds its own copy of the early-access form.

Do:
- Replace the `openEarlyAccess()` CTAs with **real destinations on the live app**:
  - Primary "Start for free" → `https://app.earnest.guru/register`
  - Secondary → the live demo: `https://app.earnest.guru/try-demo?persona=solo`
    (agency variant: `?persona=agency`). `SellSheetModern.vue` already computes
    `soloDemoUrl`/`agencyDemoUrl` from `config.public.appUrl` — reuse that pattern
    (don't hardcode if a config value exists).
- The demo-mimic buttons inside the hero (fake "Send the re-approach" / "Log
  touchpoint" / agenda prompts) should either become inert display elements or
  link to the demo — not the early-access modal.
- **Retire** `GlassEarlyAccess.vue` and the embedded form in `SellSheetModern.vue`
  (delete the components/markup + their submit logic + the Directus-flow calls).
  Grep for stragglers: `grep -rn "early" app/` — kill `openEarlyAccess`,
  `earlyAccessUrl`, `EARLY_ACCESS_FLOW_ID`, `early-access` sources, and any
  analytics `early-access-open/submit` events.
- **Copy sweep for the "it's live" reframe** — the site still says things like
  "request early access to get your own workspace set up **while we finalize
  production**" (see the FAQ answer in `index.vue` ~line 21, kept in sync with the
  FAQ inside `SellSheetGlass.vue`). Rewrite that + any "early access"/"join the
  waitlist"/"coming soon" language to reflect that it's **live now, sign up
  today**. Keep the real facts accurate (see "Product facts" below).

## Task 2 — Rebuild the sell sheet as a tight, point-based argument

**The current landing (`SellSheetGlass.vue`, ~1,118 lines) has too much
information.** It runs ~11 poetic narrative sections (Focus, Learns you, Clarity,
Hunt, The Office, Momentum, Decide, Understands, Context, Rhythm, gamification)
before pricing/FAQ, with several competing interactive demos and abstract copy
("a ladder of certainty," "trust you can dial"). It reads as brand mood, not a
sales argument, and the CTA is diluted (repeated everywhere).

**Restructure it into a strong, scannable, point-based sell argument that builds
to ONE decisive CTA at the end.** Target shape:

1. **Hero** — a single sharp promise (what Earnest is + who it's for) + subhead +
   one primary CTA (Start free) and a quiet "Try the live demo" link. One idea.
2. **The argument — ~5–7 punchy points, in order, each earning the next.** Each
   point = a concrete benefit headline (not poetry) + ONE supporting line + ONE
   strong screenshot/visual. Cut abstract prose; lead with the payoff. Suggested
   points (adjust, keep to ~6):
   - Your whole business in one place (no more app sprawl).
   - An AI that runs the day *with* you — a morning briefing across everything.
   - It only acts when it understands — and nothing moves without your tap.
   - Your money sorted by certainty: banked → owed → in play → cold.
   - A client portal that looks like *you* (white-label).
   - Set up in minutes — it learns your brand voice on day one.
3. **Proof** — the hero-grade screenshots (Task 3) carry the "wow," not more copy.
4. **Pricing** — keep it, tightened (one price, whole team, every feature).
5. **One closing CTA** — a single strong end block: "Start free" + demo link.
   (A short FAQ can sit just above or below it.)

Rules of thumb: **fewer, sharper sections; concrete benefits over evocative
prose; at most one interactive demo if it truly earns its weight (drop the rest);
one CTA that the whole page builds toward.** Keep the "glass" aesthetic and the
brand's calm confidence — trim the *quantity*, not the craft. Don't touch the
legal pages; preserve `/classic` as-is. **Before making large cuts, post your
proposed new section outline (the 6 points + order) in your first summary so the
user can veto or reorder.**

## Task 3 — Generate stronger, more visually interesting screenshots

There's an existing pipeline in the **main app repo** (`~/Sites/earnest/earnest`)
that drives the passwordless demo and writes PNGs into THIS repo:

- `~/Sites/earnest/earnest/scripts/capture-demo-screenshots.ts` (+ docs at
  `scripts/CAPTURE-SCREENSHOTS.md`). It logs into the solo + agency demos and
  writes to `earnest-marketing/public/screenshots/<YYYY-MM>/<slug>.png` **and**
  `public/screenshots/latest/<slug>.png` (the `latest/` mirror is what the site
  reads via `getScreenshotSrc()` in `app/data/features.ts`).
- Run (from the **app** repo root): `pnpm exec playwright install chromium` once,
  then `DEMO_USER_PASSWORD=<...> DEMO_AGENCY_USER_PASSWORD=<...>
  APP_URL=https://app.earnest.guru pnpm tsx scripts/capture-demo-screenshots.ts`.
  Demo passwords are in the app repo's `.env` (or Vercel). You can also target a
  local app (`APP_URL=http://127.0.0.1:3000`).

The current shots (`public/screenshots/2026-05/*`) are flat list/detail views.
Make the new set **more powerful** — these are the app's most visually striking,
"sell-it" surfaces (dark is the default theme and reads premium):
- **Presence home / dashboard** — the AI-first "What's next on the list?" hero
  (chat-first, atmospheric). This is the signature screen.
- **The Boardroom** (`/boardroom`) — live multiplayer strategy room.
- **Money pipeline / Forecast** — the value → paid → to-hunt bar + Hunt list.
- **Client portal** (branded/white-label) — the client-facing experience.
- **Onboarding brand-voice step** — "Draft with Earnest" (shows the AI setup).
- **Scheduler / calendar**, **Generative Canvas**, a **unified detail surface**
  (project/client), **Marketing feed**, **CardDesk**.

Guidance: capture at a generous desktop viewport (e.g. 1440–1600 wide) in **dark
mode**; consider a couple of **mobile** shots too; pick moments with real,
attractive seed data (the demo orgs are seeded). If you want hero-grade imagery,
compose device frames / soft gradient backdrops rather than shipping raw
1:1 captures. Update `app/data/features.ts` slugs if you add/rename shots. Extend
the capture script if a surface it doesn't cover is worth featuring (add routes +
slugs), rather than hand-capturing one-offs where possible.

## Task 4 — Ship it

1. `pnpm generate` must succeed with no errors; spot-check the built site.
2. Verify locally (`127.0.0.1:3001`): CTAs go to `app.earnest.guru/register` +
   `/try-demo`; the early-access modal is gone everywhere; new screenshots render;
   nav/FAQ/legal links work; mobile + dark look right.
3. Commit on `main` (ask before pushing if unsure) and push to deploy. Confirm the
   deployed `earnest.guru` reflects the changes.

## Product facts (keep copy accurate — the app is LIVE)

- Signup: `app.earnest.guru/register` → org-creation wizard (name → plan →
  details → **AI brand-voice** step → optional payment/add-ons → invite team).
- Plans (from the wizard): **Solo $49/mo**, **Studio $149/mo (popular)**, **Agency**;
  monthly or annual (2 months free); "every feature included," client portal seats
  scale by plan. White-label is an Agency add-on (or Enterprise).
- Live capabilities to sell: AI-first presence home, client portal (white-label),
  invoicing + Stripe payments/deposits, proposals/contracts, scheduler + booking,
  marketing/social tools, the Boardroom, tickets/tasks/projects, and an AI layer
  ("Earnest") woven throughout. Passwordless live demo (solo + agency).
- Support/contact email in-copy: `hello@earnest.guru`.

## Guardrails

- Don't touch the main **app** repo except to run/extend the screenshot script.
- Don't break or remove the legal pages or `/classic`.
- Keep everything static-generate-friendly (no new server routes needed).
- Ask before deleting large sections or pushing to production.
