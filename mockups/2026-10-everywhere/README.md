# Landing page concepts — "Earnest everywhere" (October 2026)

Open `index.html` in a browser. It presents three concepts for the next
landing page and links each one. Nothing in this folder is wired into the
Nuxt build; it is static HTML for review, like `../2026-09-redesign/`.

## What changed in the product, and why the page has to follow

The live home (`SellSheetHome.vue`, the September round 2) sells the grounded
model, the six apps, brand, AI Actions and the looks. Since it shipped, the
app repo's "Earnest everywhere" plan (`docs/earnest-everywhere-plan.md`,
E0–E6 and P0–P6, all on `main` by 1 October) changed what Earnest is on every
screen:

| Shipped | What a visitor can now be told |
| --- | --- |
| The floor is part of the route (E1) | Every floor of every app — 36 of them — has a one-sentence focus in its own verbs, sent with every ask, and three rows (Do · Decide · Know) above the composer. The chip reads `MONEY · Invoices` until a record opens, then `INVOICE · INV-…`. |
| Four record types (E2–E4) | Expenses, payments, appointments and approval boards were invisible to Earnest; each now has its rows and its server context. |
| Four new verbs (E2–E3) | `record_expense`, `record_payment`, `create_lead`, `add_contact` — each proposes a card; the person taps. `approve_board` is deliberately not a tool. |
| The reply shape (`docs/earnest-reply-shape-plan.md`, R1–R3) | Screen: a bold line, up to four facts with the number first, the ask, under 40 words. Voice: a separate `<say>` block for "read replies aloud". |
| One bar below lg (`docs/earnest-one-bar-plan.md`, B1–B3) | The rail folds into the composer on a phone; the apps open from a grid button; the waiting count sits in the pill. |
| Earnest for clients (P3) | Opt-in per studio (`Organization → AI & Tokens`, off by default, tokens bill the studio's plan). Answers as the studio in its brand voice, sees only what the client can already open, three verbs: `create_ticket`, `post_comment`, `book_meeting`. The leak probe refuses. |
| The portal has floors (P1, P5) | Home · Work · Requests · Approvals · Schedule · Money, three rows each (`shared/portal-earnest.ts`). |

The brief this round: sell **understanding** (it knows the screen under you)
and **execution** (it does the work, from any screen) across the whole app,
and now across the client's portal too.

## The three concepts

Each leads with a different half of the claim and earns the rest on the way
down. Each opens in one of the app's three looks; the control in the nav shows
any concept in any look and mode (`#paper-dark` and the like deep-link).

### D — "It knows where you're standing" (`concept-d.html`, Glass dark)

**Leads with understanding.** The hero is a walk through the app: a rail, a
floor strip, a floor's records and the Earnest bar. Pick an app, a floor, a
record, and the chip, the sentence Earnest is told, and the three rows change
under your feet. It tours on its own until you touch it. Then: a band of all
36 floor sentences, two replies side by side (screen and spoken), two cards
from two rows (one held), the client's bar with the switch, one phone,
pricing, three FAQs, the CTA.

- The most direct proof of "it knows", and the hardest for a competitor to
  screenshot their way past.
- Cheapest to port: the walk is a table (`shared.js`) and sixty lines of
  script.
- Weakest on "what does it do": execution gets one section.

### E — "Say it. Tap it. Done." (`concept-e.html`, Clean light)

**Leads with execution.** The hero is an ask typed into the bar, the card it
becomes, and the record it lands as after your tap — four asks to try (an
expense, a payment, a lead, a meeting). Then the catalogue of verbs grouped by
app with the held ones marked and a "Never" column, three rooms showing the
rows following the floor and the record, one reply, the client's request card
beside the leak probe, pricing, FAQs, CTA.

- The clearest answer to "but what does it actually do?" — every verb is
  named, and the guardrail is marked on each row that reaches a client rather
  than asserted once.
- The Never column sells the design decisions (no approve tool, no money
  moves) as features.
- Weakest on atmosphere: a catalogue is a catalogue.

### F — "Every room, including the client's" (`concept-f.html`, Paper light)

**Leads with everywhere, portal included.** The hero is one invoice seen from
both sides of the glass — the studio's Earnest (`INVOICE · INV-AGY-MER-…`)
and the client's (`INVOICE · 0042`) — each answering from only what its side
can see, with a "Sees:" line under each. Then a Tuesday through six rooms
(the chip, the three rows, the one tapped, the card, your tap) and the tally,
the client's six floors with their rows, the switch, two phones (yours and
theirs), pricing with the switch as a row, FAQs about the client's Earnest.

- The strongest single picture of the portal, and the only concept that
  makes the scope boundary visible.
- The Tuesday is also the launch post and the sales deck.
- Weakest on skimmability and on the solo persona, who has no portal clients.

## Recommendation

Ship **D's hero** on the live home, with **E's verb catalogue** as its second
section and **F's two-sided invoice** as its third; keep F whole as the
agency-persona landing. The walk proves understanding faster than any
sentence; the catalogue answers the question "AI" never answers; the split
hero is the portal's picture. All three keep the September pricing ladder,
FAQ shape, CTA and Hue's footer, so a port into `SellSheetHome.vue` leaves
`landing.ts`'s plans and compare rows untouched.

## Where the words and numbers come from

- **Every floor sentence and every row is the app's own string**, copied from
  `app/composables/useEarnestAwareness.ts` (`FLOOR_FOCUS`, `ENTITY_PROMPTS`),
  `app/composables/useEarnestPrompts.ts` (`FLOOR_ROWS`) and
  `shared/portal-earnest.ts` (`PORTAL_FLOOR_ROWS`) in the app repo at `main`
  on 2026-10-01. They live once, in `shared.js`; all three concepts draw from
  it. The record rows for a contact, proposal, campaign and post are
  illustrative where the app's catalogue is per-record rather than a fixed
  list.
- **Every number is the demo workspace's**, the same ones the live home uses
  (`app/data/landing.ts`): $12,000 out across 6 invoices, $9,400 of it past 90
  days at Meridian Law, 22 things today, Helios West 30 days late, $286k
  pipeline across 12 pursuits, $60k past "proposal sent", the four quiet
  contacts and their days. Two figures are illustrative: the $45 Figma charge
  and the $350 check (the E6 smoke run on Test Lab recorded $12 and $350).
- **The bars are coded, not captured.** The September screenshots predate the
  floor chip and the lane rows, so the mockups draw the bar from the app's
  strings. A capture run against the live demo (`scripts/capture-demo-
  screenshots.ts` in the app repo) would let the real thing stand in; the
  `shots/` symlinks are ready for it.
- **Looks** are one token set per look × mode in `shared.css`, switched on
  `<html data-look data-mode>` as the app does it. Pricing, FAQ, CTA and the
  footer are the September home's.

## Files

```
index.html        the review page (thumbs, rationale, claim map, phone shots)
concept-d.html    D · It knows where you're standing   (Glass, dark)
concept-e.html    E · Say it. Tap it. Done.            (Clean, light)
concept-f.html    F · Every room, including the client's (Paper, light)
shared.css        tokens for the three looks, the bar, the card, the reply, the ladder, the footer
shared.js         the data table (apps · floors · sentences · rows · records · portal rows), theme control, wave, footer
make-thumbs.mjs   renders thumbs/ at 1440×900 and 390×844 (node make-thumbs.mjs; PLAYWRIGHT_MODULE=… if playwright is not on the path)
thumbs/           the renders the review page shows
shots/, fonts/    symlinks into public/screenshots/latest/ and app/assets/css/fonts/
```

## Porting notes

- D's walk, E's rooms and F's Tuesday all read `E.APPS`; a port makes that a
  `landing-floors.ts` beside `landing.ts` and keeps the same shape.
- The bar (`.ebar`: chip row, lanes, composer) and the card (`.pcard`) are the
  only new primitives; both are under forty lines of CSS each.
- The theme control reuses the live site's `useLandingAppearance`; the mockups
  carry their own only so the files stand alone.
- The marquee in D respects `prefers-reduced-motion` (it wraps instead of
  scrolling); the walk's self-tour and every typed line do the same.
