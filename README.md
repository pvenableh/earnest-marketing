# earnest-marketing

Marketing site for [Earnest](https://earnest.guru). Static Nuxt 4 (Nitro prerender), deployed to Vercel via the project's auto-deploy on push to `main`.

The app itself lives in a separate repo at `~/Sites/earnest/earnest`. This repo contains only the public-facing marketing site, blog, and feature pages.

## Repo layout

```
app/
  pages/                  # Routes
    index.vue             # Homepage (renders SellSheetModern)
    features/             # /features index + /features/[slug] detail
    blog/                 # /blog index + /blog/[slug] detail (content from Directus CMS)
    privacy-policy.vue
    terms-of-service.vue
  components/
    SiteNav.vue           # Top nav
    SiteFooter.vue        # Footer
    SellSheetModern.vue   # Homepage hero + sections + feature accordion
    Logo.vue              # Wordmark
  data/
    features.ts           # Feature definitions consumed by /features and SellSheetModern
public/
  screenshots/            # Product screenshots — see "Screenshot pipeline" below
  llms.txt                # Opt-in directives for LLM crawlers
nuxt.config.ts            # Prerender list is built from features.ts at config time
```

## Where content lives

| Surface | File / system |
| --- | --- |
| Feature copy | [`app/data/features.ts`](app/data/features.ts) |
| **Everything the site says about Earnest itself** — voice, context, actions, guardrails, the charter, the changelog | [`app/data/earnest.ts`](app/data/earnest.ts) — see below |
| Homepage FAQ, plans, marquee, breadth cards | [`app/data/landing.ts`](app/data/landing.ts) |
| Homepage sections | [`app/components/SellSheetHome.vue`](app/components/SellSheetHome.vue) (renders the two data files; adds no copy of its own about Earnest) |
| Homepage `<meta>` + Schema.org `featureList` | [`app/pages/index.vue`](app/pages/index.vue) |
| Blog posts | Directus CMS → [admin.earnest.guru](https://admin.earnest.guru), `posts` collection |
| Privacy / Terms | [`app/pages/privacy-policy.vue`](app/pages/privacy-policy.vue), [`app/pages/terms-of-service.vue`](app/pages/terms-of-service.vue) |
| Screenshots | `public/screenshots/` (captured by the app repo — see below) |

## Keeping the Earnest story current

The app's assistant changes weekly; the page used to lag it by a month. The fix is that **every claim about Earnest lives in one file, [`app/data/earnest.ts`](app/data/earnest.ts)**, with the app-repo file each claim was read from beside it. The homepage, the FAQ and the feature pages render that file. When Earnest changes:

1. **Add a line to `earnestChangelog`** (newest first). The homepage "What's new in Earnest" section renders the first `CHANGELOG_SHOWN` entries. One sentence, dated to the commit, no superlatives.
2. **Touch the matching pillar in `earnestPillars`** (`talk`, `context`, `act`, `honest`) — add or remove a point. If the app itself states a limit, put it in `limit`; the page prints it in the same breath.
3. **Guardrails are copied, not paraphrased.** `SAFETY_FLOOR`, `SMALL_REVERSIBLE`, `AUTONOMY_SETTING` come from the app's `shared/ai-autonomy.ts`; `HANDS_FREE_NOTE` from `shared/speech-wake.ts`. Run `pnpm check:earnest` with the app checked out beside this repo (or `EARNEST_APP_DIR=…`) and it fails on any drift.
4. **The hero conversation is `talkScript`** and the drawn Home is `mockHome`. Every line is a shape the app really produces, with the solo demo seed's numbers; change them there, not in the components.
5. **If a feature page needs it**, add or edit the entry under `EARNEST` in `features.ts`. Earnest surfaces with no honest capture yet use `drawn: 'talk'` in `FEATURE_DEMO_MAP`, which renders the same drawn conversation; drop it once `capture-demo-screenshots.ts` has a shot of the column.
6. Run `pnpm build:llms` — `public/llms.txt` is generated from `features.ts`, and its prose sections (how it works, what it does not do) are authored in `scripts/build-llms-txt.mjs`. Update those by hand when the assistant's shape changes.

The voice rule for all of it is the app's own charter (`server/utils/llm/voice.ts`): accurate before interesting, numbers as they are, nothing the app cannot make good on today.

## Adding or editing a feature

1. Add the entry to `app/data/features.ts`. Required fields: `name`, `slug`, `icon` (Lucide), `desc`, `keywords`, `benefits`.
2. If a screenshot exists in `public/screenshots/latest/`, wire it via the `DemoShot` union and the `FEATURE_DEMO_MAP` at the bottom of `features.ts`. Features without a dedicated shot fall back to `command-center`.
3. Update the homepage Schema.org `featureList` in `app/pages/index.vue` to include the new name.
4. If it is an Earnest capability, also add a changelog line in `app/data/earnest.ts` (see above).

`features.length` powers the count copy in `SellSheetModern.vue` and `app/pages/features/index.vue` automatically — no number to update by hand. Prerender routes are also built from `features.ts` in `nuxt.config.ts`, so a new feature gets its own prerendered `/features/<slug>` page on next build.

## Screenshot pipeline

Captures live in the **app** repo, not here:

- Script: `~/Sites/earnest/earnest/scripts/capture-demo-screenshots.ts`
- Docs: `~/Sites/earnest/earnest/scripts/CAPTURE-SCREENSHOTS.md`
- Output: this repo's `public/screenshots/<YYYY-MM>/` + `public/screenshots/latest/`

The script signs in to the Solo and Agency demo orgs (`demo@earnest.guru` / `demo-agency@earnest.guru`), drives Playwright through a list of routes at 1440×900 hero or 1280×720 inline, and writes both a dated archive and a `latest/` mirror. Feature pages read from `latest/` so the site always shows the most recent capture.

To refresh:

```sh
cd ~/Sites/earnest/earnest
DEMO_USER_PASSWORD=… DEMO_AGENCY_USER_PASSWORD=… APP_URL=http://127.0.0.1:3000 \
  pnpm tsx scripts/capture-demo-screenshots.ts
```

Use `127.0.0.1`, not `localhost` — see `reference_dev_server_ipv6.md` in the app repo's memory for the IPv6 426 gotcha.

## Local dev

```sh
pnpm install
pnpm dev
```

Default port is `3000`; if the app dev server is already on `3000`, Nuxt picks the next free port (typically `3001`). Watch the dev server output for the actual URL.

## Build & deploy

```sh
pnpm build      # Nitro prerender — output in .output/
pnpm generate   # Static export
```

Auto-deploys to Vercel on push to `main`. The Vercel project is linked to this repo and serves from `earnest.guru`. To deploy the app (not this site), see `~/Sites/earnest/earnest`.

## SEO

- Per-feature pages at `/features/[slug]` include their own `useSeoMeta` block in `app/pages/features/[slug].vue`.
- Homepage Schema.org JSON-LD is in `app/pages/index.vue` — keep `featureList` in sync with `features.ts` when adding features.
- Sitemap is generated by `@nuxtjs/sitemap` from the prerender list at build time.

## Related repos

- `~/Sites/earnest/earnest` — the Earnest app (Nuxt 4, Directus backend, Stripe billing).
- Directus schema and content live at [admin.earnest.guru](https://admin.earnest.guru).
