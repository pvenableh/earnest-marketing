# Re-recording the app sequence — plan

The homepage has a scroll-scrubbed "app in motion" section built and switched
off (`app/components/GoodWork/Scrub.vue`; `appSequence` is `null` in
`app/data/good-work.ts`). The October recording (`frames/`, `rec-dark.webm`)
can't ship. This is the plan to replace it. Researched 2026-10-09 against the
app repo (`~/Sites/earnest/earnest`) and read-only queries on prod; nothing was
changed. App paths below are in the app repo.

## Why the first take can't ship

| What the frames show | Root cause | Fix |
| --- | --- | --- |
| The column answers "Why is invoice 0007 overdue?" with **"Proposed an invoice · failed"** | Deliberate: every request from the shared demo login is routed to `MockClaudeProvider` so visitors can't spend tokens on our key (`server/middleware/demo-ai-mock.ts:18-69` → `server/utils/llm/factory.ts:35-47`; kill-switch `NUXT_PUBLIC_DEMO_AI_MOCK`, on by default, `nuxt.config.ts:405-413`). The mock reads **any** ask containing "invoice" as "create an invoice" (`server/utils/llm/mock-claude.ts:912-929`), and that proposal fails because the open record is an invoice, not a client (`server/utils/llm/tool-proposals.ts:1912-1919`). | **Every demo visitor who asks about an invoice sees this today.** Tighten the regex at `mock-claude.ts:914` to need a create verb, and add a `get_record`-based "why … overdue" branch (pattern: `openPage`, `mock-claude.ts:716-796`). Capture with real Claude, not a scripted answer: the page says "Anthropic's Claude". |
| Most invoices read **$0.00** | The Directus flow "Invoice: Calculate Total" recomputes `total_amount` from `line_items`, and `seedMoneyTransactions` (`scripts/setup-demo-org.ts:546-669`) creates invoices 0050–0057 with a total but **no line items**. | Seed a line item per invoice, as `seedInvoice` already does (`setup-demo-org.ts:489-536`). Use client-correct codes (every code says HEL today, though they alternate Helios/Meridian). |
| Home reads **"3 waiting on a yes"**, **"$7,200 owed · oldest 144 days"**, People 0, "Approvals aren't on" | $7,200 is a leftover April row, MER-0007 ($12,000 less a $4,800 payment), in no current seed. The 3 come from `scripts/seed-demo-home-v2.ts` (3 `create_tasks` sets), which also expire after 14 days (`server/api/ai/actions/expire-stale.ts:40`). The solo seed has no touchpoints. Approvals show "not on" when the approvals read fails or no board exists. | Archive MER-0007, HEL-0042 and the zeroed rows (status `archived` is excluded from reads), re-seed to the target below, re-run `seed-demo-home-v2.ts --live` the day of the take. Seed dates are relative to the run day and don't move on their own: the demo has been ageing since 2026-07-28. |
| The stage is **dark on the light page** | `nuxt.config.ts:563-567` pins `colorMode` to dark and ignores `prefers-color-scheme`; the mode lives only in localStorage `nuxt-color-mode`. | Capture-only: set `nuxt-color-mode` (and `earnest-theme='glass'`, `earnest.appGlassChrome='true'`, `earnest.appPaletteTint='true'`) in `addInitScript` before navigating. Record once light, once dark. |

## Decisions for Peter

1. **How the take gets real Claude.**
   - **(Recommended)** Flip `NUXT_PUBLIC_DEMO_AI_MOCK=false` on Vercel for the session (a redeploy), raise the solo org's `ai_token_limit_monthly` first, record, flip it back. Spend is bounded by the 100k/day top-up cron (`server/api/cron/demo-token-topup.ts`), and the window is minutes. Gotcha: `setup-demo-org.ts` writes `ai_token_limit_monthly: 10_000` on every run, so raise it after seeding.
   - Or sign in as a non-demo member of the solo org; the middleware keys on email only. Not this way, though: the only such member is the Meta reviewer account, whose password is hard-coded in the committed `scripts/setup-meta-reviewer-user.ts:30-36` (worth rotating in its own right), and that user's Home would differ (pending actions belong to the demo user).
2. **Which numbers.** The homepage's copy (`app/data/good-work.ts`) is the target, so the frames agree with the columns under them:

   | Where | Target |
   | --- | --- |
   | Home, waiting | **5** waiting on a yes (seed 5 decide sets, not 3) · 13 one tap · 4 worth knowing |
   | Money | **$12,000** unpaid across 6 invoices, **all past 90 days** |
   | Meridian Law | **INV-SOL-MER-2026-0042**, $6,400, **92 days**; **INV-SOL-MER-2026-0038**, **104 days**; Amara Okafor holds billing, last real touch **159 days** ago |
   | Helios | Helios West Hotel Launch **30 days** past deadline (the `helios-launch` patch sets `due_date: isoDay(5)`; make it −30) |
   | Pipeline | **$286k** across 12 pursuits · 5 pieces out with clients |

   If you'd rather keep an AR-ageing spread for the Money screenshots ($9,400 of the $12k past 90 days), the page's column fact and caption 2 change with it: tell me which.
3. **One mode or two.** Two is better (the stage matches the page). `Scrub.vue` takes one frame pattern today. Two modes needs a small change: a pattern per mode, chosen from `data-gw-mode`, reloaded on toggle.

## The procedure

1. **App-side fixes (fix the demo for everyone; app repo, its own PR):**
   - `mock-claude.ts:914`: needs a create verb ("make / draft / create / send / bill").
   - `mock-claude.ts`: a "why … overdue / late / unpaid" branch that answers from `get_record` (amount, days past due, client, last touch).
   - `setup-demo-org.ts` `seedMoneyTransactions`: line items, client-correct codes, the six invoices above.
   - `seed-demo-home-v2.ts`: 5 decide sets; keep the in-review approvals board.
   - Both seeds write to **prod**. Run them deliberately; `seed-demo-home-v2.ts` needs `--live`.
2. **Prepare the take (same day):** run both seeds; archive MER-0007 / HEL-0042 / old 0050–0057; set the solo org's `ai_token_limit_monthly` ≥ 1M and `ai_tokens_used_this_period` to 0 (Directus); flip the mock off. Pick a quiet hour: the demo is shared, and visitors change counts and threads mid-take. The column reloads the latest thread for an open record (`useContextualChat.ts:284-316`), which is another reason for new invoice rows.
3. **Script it** from `record.mjs`, borrowing the app's capture helpers (`scripts/capture-demo-screenshots.ts`): `loginAsDemo` + `pinSelectedOrg` (1160-1208), the per-page init script with `{look, colorMode}` (1236-1250), `HIDE_OVERLAYS_CSS`. Not `openFocus` / `pickFocusFace` (929-966): they drive the removed Focus UI. Log in **once** per run and reuse `storageState`. Prod's login rate limit trips at about 15 quick logins and answers with a misleading `401 Invalid credentials`.
   - Start at `/try-demo?persona=solo&redirect=/` (skips the tour), 1440×900, `deviceScaleFactor` 1.
   - Home: hold ~4 s, slow scroll. `/invoices`: hold on $12,000 with the 90+ rows. Click Meridian 0042.
   - Type into `getByLabel('Ask Earnest')` with `delay: 45`: **"Why is this one overdue?"** (no number; caption 3 is "It knows which invoice you mean").
   - Wait for the reply: `.composer--busy` appears, then detaches (timeout 60 s), then the last `.thread__msg--assistant` stops changing for ~1.5 s. Check `ol[aria-label="What Earnest did"] .thread__receipt` has no `--failed`. Hold ~3 s.
   - Column selectors: `aside.earnest-col[data-earnest="column"]` (Home: `[data-earnest="home"]`), `Earnest/Column.vue:622, 849-853`; composer `Earnest/Composer.vue:302-303, 368, 425-441`; thread `Earnest/Thread.vue:86-141`.
   - Do several takes; live wording varies. Keep the one whose reply reads like the "Hear the truth" column. Then repeat in the other mode.
   - `recordVideo` at 1440×900; if text is soft (VP8 is low bitrate), use CDP `Page.startScreencast` (JPEG q85) and resample to a constant frame rate.
4. **Cut 100 frames per mode**, segments in proportion to the captions (0 / 0.35 / 0.7 / 0.93):

   ```bash
   ffmpeg -i rec-light.webm -filter_complex \
     "[0:v]trim=A:B,setpts=PTS-STARTPTS[a];[0:v]trim=C:D,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[c];[c]fps=100/TOTAL_SECONDS,scale=1280:800:flags=lanczos[o]" \
     -map "[o]" -frames:v 100 -q:v 5 public/app-seq/light/f-%03d.jpg
   ```

   Budget ≤ 6 MB per mode (the last set was ~54 KB/frame, 5.4 MB). Raise `-q:v` toward 7 or scale to 1200×750 if over. **Look at the frames** before committing: every number on screen should match the table above.
5. **Switch it on (marketing repo):** frames in `public/app-seq/light/` and `public/app-seq/dark/`; the two-mode change to `Scrub.vue`; set `appSequence` in `good-work.ts`; re-check caption 2's numbers. Verify lazy loading (no frame requests at load), reduced motion (one frame, all captions) and phone width, as the component was verified on 2026-10-09 with the old frames.
6. **Turn the mock back on** and confirm a demo visitor's invoice ask now gets the fixed mock answer.

## Risks

Real token spend during the take (bounded, minutes) · two prod seeds · non-deterministic wording (several takes) · the 14-day expiry of seeded decisions and visitor drift between seeding and the take · the 10k token limit the seed rewrites.
