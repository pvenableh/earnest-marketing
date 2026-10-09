# Archive — what left the tree, and how to get it back

Peter, 2026-10-09, on the alternate landings and the Looks switch: _"they
should go… but archive them."_ They live in git, not in the tree: dead pages
left in the tree are pages that keep selling what the app no longer has (the
Boardroom, Focus, the Director's Office), and every one of these did.

## The tag

| Tag | Commit | What it holds |
| --- | --- | --- |
| `archive/landings-2026-10` | `8314ff7` | The last commit with every file below in the tree, after the October copy fixes (no Boardroom, Solo · Team · Business). **Use this one.** |
| branch `sellsheet-2026-10-everywhere` | `9ac64e8` | The whole site as it stood before "Do good work." replaced the homepage: `SellSheetHome` at `/`, with its Looks switch working. |

Restore one file:

```bash
git checkout archive/landings-2026-10 -- app/components/SellSheetGlass.vue
```

Restore everything (then re-add the routes' entries to `nuxt.config.ts` —
the 301s below would otherwise shadow them):

```bash
git checkout archive/landings-2026-10 -- app/pages/{next,director,automation,classic,glass,live-2026-07}.vue \
  app/components/SellSheet{Home,Glass,Modern,Director,Automation,Live}.vue app/components/Landing \
  app/components/LogoEarnest.vue app/components/ui app/composables/{useABTest,useLandingAppearance,useGlassMotion}.ts \
  app/assets/css/sellsheet-{director,glass-sections,glass,home,modern}.css app/data/landing-floors.ts app/data/landing.ts
```

⚠️ `landing.ts` was cut down to the plans and the capacity ladder when these
left; the archived pages need the full file from the tag.

## What left, 2026-10 (42 files, 12,580 lines)

Every route below now 301s to `/` (`nuxt.config.ts` routeRules), so an old
share link lands on the homepage.

| Route | Page | Component | What it was |
| --- | --- | --- | --- |
| — (was `/`) | — | `SellSheetHome.vue` (538) | The September sell sheet: the walk, 30 verbs, the two-sided invoice, six apps, brand, **the Looks switch** (Glass · Paper · Clean, the whole page re-skinned), pricing, FAQ. |
| `/classic` | `classic.vue` | `SellSheetModern.vue` (903) | The spring/summer site, "seven apps", the early-access dialog. |
| `/glass` | `glass.vue` | `SellSheetGlass.vue` (1,123) | The July glass sell sheet: Focus, the trust dial, the Director's Office. |
| `/director` | `director.vue` | `SellSheetGlass.vue` | The same, entered at the Director's Office. |
| `/next` | `next.vue` | `SellSheetDirector.vue` (615) | "Introducing the Director's Office" — the morning briefing deck. |
| `/automation` | `automation.vue` | `SellSheetAutomation.vue` (421) | Automation-first variant: the AI sidebar and "honest automation". |
| `/live-2026-07` | `live-2026-07.vue` | `SellSheetLive.vue` (636) | The July point-based sell sheet, kept "stale on purpose" as a record. |

What only they used, gone with them:

| File | Lines | Used by |
| --- | ---: | --- |
| `app/components/Landing/*` (10 files: AppSwitcher, Appearance, Door, FocusDemo, HomeMock, Looks, TwoSides, Verbs, Walk, WaveField) | 2,296 | `SellSheetHome` (Door and FocusDemo already by nothing) |
| `app/composables/useLandingAppearance.ts` | 128 | the Looks switch (`SellSheetHome`, `Landing/Appearance`, `Landing/Looks`, `Landing/AppSwitcher`) |
| `app/composables/useGlassMotion.ts` | 177 | the GSAP motion engine of every sell sheet |
| `app/composables/useABTest.ts` | 6 | `SellSheetModern`, `SellSheetDirector` |
| `app/assets/css/sellsheet-{home,glass,glass-sections,modern,director}.css` | 4,852 | the sell sheets |
| `app/components/ui/dialog/*` (10 files) | 260 | the early-access dialog in `SellSheetModern` |
| `app/components/LogoEarnest.vue` | 60 | the sell sheets' nav |
| `app/data/landing-floors.ts` | 404 | the walk, the verbs, the Glass Focus section |
| most of `app/data/landing.ts` | ~650 | the long FAQ, lenses, the coded home, the app switcher, the Focus and brand demos |

Still in `package.json` and now unused by the tree — left for a separate
`pnpm remove`, because a lockfile change deserves its own commit: `gsap`
(useGlassMotion), `reka-ui` and `tw-animate-css` (the dialog; its `@import`
is still in `main.css`), `class-variance-authority`, `embla-carousel-vue`,
`lucide-vue-next`. Check each with a grep before removing.
