# earnest-marketing

Marketing site for [Earnest](https://earnest.guru). Static Nuxt 4 (Nitro prerender), deployed to Vercel via the project's auto-deploy on push to `main`.

The app itself lives in a separate repo at `~/Sites/earnest/earnest`. This repo contains only the public-facing marketing site, blog, and feature pages.

## Repo layout

```
app/
  pages/                  # Routes
    index.vue             # Homepage: SEO, the FAQPage JSON-LD, the light/dark head script; renders GoodWork/Home
    features/             # /features index + /features/[slug] detail
    blog/                 # /blog index + /blog/[slug] detail (content from Directus CMS)
    meeting-follow-up.vue # The page guests land on after a meeting
    privacy-policy.vue · terms-of-service.vue · data-deletion.vue
  components/
    GoodWork/             # The homepage: Home, Column (Earnest's column, as a picture), Slot (a photo place), Scrub (the scroll-scrubbed app sequence, off until re-recorded)
    SiteNav.vue · SiteFooter.vue  # Nav and footer for the feature, blog and follow-up pages
  composables/
    useGoodWorkMotion.ts  # Reveal, the creed, ambient video (no GSAP)
  data/
    good-work.ts          # Homepage copy, the claim map, the photo places, the FAQ
    landing.ts            # Plans and the capacity ladder
    features.ts           # Feature definitions consumed by /features (and llms.txt)
  assets/css/
    good-work.css         # The homepage, one design, light and dark (everything under .gw)
public/
  photos/ · video/        # Homepage photography and ambient loops (licensed; credits in good-work.ts)
  screenshots/            # Product screenshots — see "Screenshot pipeline" below
  og/good-work.png        # The homepage share image
  llms.txt                # Generated: node scripts/build-llms-txt.mjs
nuxt.config.ts            # Prerender list is built from features.ts at config time; redirects for retired routes
ARCHIVE.md                # What left the tree (the old landings, the Looks switch) and how to restore it
```

## Where content lives

| Surface | File / system |
| --- | --- |
| Homepage copy, columns, FAQ, photo places | [`app/data/good-work.ts`](app/data/good-work.ts) |
| Plans and the capacity ladder | [`app/data/landing.ts`](app/data/landing.ts) |
| Homepage `<meta>`, JSON-LD (`featureList`, FAQPage) | [`app/pages/index.vue`](app/pages/index.vue) |
| Feature copy | [`app/data/features.ts`](app/data/features.ts) |
| `llms.txt` | Generated from `features.ts` plus the prose in [`scripts/build-llms-txt.mjs`](scripts/build-llms-txt.mjs) |
| Blog posts | Directus CMS → [admin.earnest.guru](https://admin.earnest.guru), `posts` collection |
| Privacy / Terms | [`app/pages/privacy-policy.vue`](app/pages/privacy-policy.vue), [`app/pages/terms-of-service.vue`](app/pages/terms-of-service.vue) |
| Screenshots | `public/screenshots/` (captured by the app repo — see below) |

## Adding or editing a feature

1. Add the entry to `app/data/features.ts`. Required fields: `name`, `slug`, `icon` (Lucide), `desc`, `keywords`, `benefits`.
2. If a screenshot exists in `public/screenshots/latest/`, wire it via the `DemoShot` union and the `FEATURE_DEMO_MAP` at the bottom of `features.ts`. Features without a dedicated shot fall back to `DEFAULT_DEMO`.
3. Run `node scripts/build-llms-txt.mjs` to regenerate `llms.txt` (`--check` fails if it is stale).

`features.length` powers the count copy on `app/pages/features/index.vue`, and the homepage's Schema.org `featureList` is built from the same list — no number or name to update by hand. Prerender routes are also built from `features.ts` in `nuxt.config.ts`, so a new feature gets its own prerendered `/features/<slug>` page on next build.

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

## Mockups

Static HTML concepts for the landing page, for review before a port. Nothing
under `mockups/` is wired into the build. "Do good work" (October, round 2) is
the live homepage, ported to `app/components/GoodWork/`; its folder also holds
the plan to re-record the app sequence (`app-seq/RERECORD-PLAN.md`).

| Round | Folder | Open |
| --- | --- | --- |
| September 2026 — the grounded model and the six apps; its round 2 is the live home | `mockups/2026-09-redesign/` | `index.html` |
| October 2026 — "Earnest everywhere": it understands the screen under you, it does the work, including in the client's portal | `mockups/2026-10-everywhere/` | `index.html` |
| October 2026, round 2 — "Do good work": the idea instead of the features. One design, light and dark (`good-work.html`): the creed, the live demo scrubbed by scroll, five commands with the Earnest column under each, photography and ambient video. G and H are the two registers it was built from | `mockups/2026-10-good-work/` | `index.html` |

Each folder's `README.md` carries the rationale, where every word and number
comes from, and the porting notes. `shots/` and `fonts/` inside each are
symlinks into `public/screenshots/latest/` and `app/assets/css/fonts/`.

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
- Homepage Schema.org JSON-LD is in `app/pages/index.vue`: `featureList` is built from `features.ts`, and the FAQPage reads `homeFaqs` in `good-work.ts`, the same list the page shows.
- Sitemap is generated by `@nuxtjs/sitemap` from the prerender list at build time.

## Related repos

- `~/Sites/earnest/earnest` — the Earnest app (Nuxt 4, Directus backend, Stripe billing).
- Directus schema and content live at [admin.earnest.guru](https://admin.earnest.guru).
