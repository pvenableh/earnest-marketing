# Landing page redesign (September 2026)

Open `index.html` in a browser. It leads with the round-2 combined home and
links to the three round-1 concepts it was built from.

## Round 2 — the combined home (`earnest-home.html`)

Concept A's thesis (the model, grounded in the studio) with Concept B's
breadth (the six-app switcher), in about half the words, presented in all
three of the app's looks from one file. A look switcher sits bottom-right;
`#glass`, `#paper` and `#clean` deep-link to a look, and the choice is
remembered per browser.

Page order: nav · hero (copy | Focus demo) · six-app switcher · replace strip ·
brand (profile card, three drafts) · AI Actions (diff, guardrail) · Decide ·
Do · Know · pricing ladder · three FAQs · CTA.

The looks are one token set each on `<html data-look>`, the same mechanism
the app uses. Paper swaps the home and Money screenshots to their Paper
captures; Clean swaps the home. The other switcher tabs show Glass captures
in every look, because only the home and Money screens were captured in
Paper and Clean.

Wording: "no-training terms" is now "your data is never used to train the
model" on every page here.

## Round 1 — three concepts

Three complete, self-contained mockups, each leading with a different claim.

Nothing in this folder is wired into the Nuxt build. It is static HTML for
review. `shots/` and `fonts/` are symlinks into `public/screenshots/latest/`
and `app/assets/css/fonts/`, so the mockups use the same brand faces the live
site ships.

## Screenshots: only the September pass

`public/screenshots/latest/` is a mirror, not a single capture. Tracing each
file back to its dated folder shows the 1 September 2026 run covered 25
screens; the other 39 files in `latest/` are still July 2026 captures of the
old shell. The mockups link only September files (the `shots/` symlinks are
exactly that set). Where a screen has no September capture, the mockup uses a
coded card instead:

| Screen | Newest capture | Used instead |
| --- | --- | --- |
| Calendar (`scheduler-day`) | July | `booking-page` (September) |
| Organization brand settings (`organization-branding`) | July | `files-floor` (September, the Organization app) |
| Proposal preview (`proposals-preview`) | July | a coded, themed proposal card |
| People overview (`people-dashboard`) | July | `pursuits-lens` (September) |
| Money cash flow (`financials-overview`) | July | `revenue-certainty` (September) |
| Project workspace / timeline | July | `shell-dock`, `approvals-floor` (September) |

To close the gaps, re-run the capture script from the app repo against the
live demo (`APP_URL=https://app.earnest.guru`, with the demo passwords), then
add `scheduler-day`, `organization-branding` and `proposals-preview` back to
the concepts.

## What every concept has to sell

The brief: sell the Earnest app on four things.

| Claim | What it means in the product |
| --- | --- |
| The organization LLM | Focus, the Context Broker, AI Actions. A real model grounded in the studio's live clients, work, money, marketing and schedule, not a blank prompt. |
| Brand awareness | Brand direction, audience, voice and goals set once per organization and per client, read by every draft and every document. |
| Execution | Tasks, projects, clients, money, marketing and schedules, run in six apps on one rail. |
| The guardrail | Nothing reaches a client or moves money without your tap. It is what lets a studio trust the other three. |

Each concept leads with a different one of these and earns the rest on the way
down. Each is built in one of the app's own three looks, so the site and the
product match. Every number in the copy is from the live demo workspace
(Helios, Pinecrest Clinic, Meridian Law, Atlas Fintech; $12k outstanding,
$286k pipeline, 22 items today).

## Concept A — "It already knows" (`concept-a.html`, Glass look)

**Leads with the model.** The hero is Focus itself, working on sample data:
four question chips, four grounded answers typed out live, each with a "Read"
strip showing what Earnest consulted before it spoke.

- Differentiates on the one thing HoneyBook, Bonsai or a ChatGPT tab cannot
  claim: an LLM that starts from the studio's own data.
- The Context Broker diagram makes "organization LLM" concrete: six sources,
  one door, three kinds of output.
- Brand is shown as cause and effect: one profile card, three drafts that
  sound like it (proposal, post, reminder).
- AI Actions is a proposed change with one item held (the client email), so
  the guardrail is demonstrated rather than asserted.
- Weakest on breadth: the six apps are a strip, not a section.

## Concept B — "One place" (`concept-b.html`, Clean look)

**Leads with breadth.** The hero is an app switcher: six tabs, six real
screens, and an Earnest chip that changes with the room.

- Answers the first question a studio owner has (does it do everything I do?)
  with six screens before any copy.
- A "what it replaces" strip prices the switch: nine tools out, one in.
- The bento is execution-first, with demo numbers on the tiles.
- The LLM gets its own section, "Earnest is in every room", with three
  grounded answers from three apps.
- Weakest on difference: breadth-first pages read as "another all-in-one".

## Concept C — "A day with it" (`concept-c.html`, Paper look)

**Leads with the outcome.** One Tuesday, 8:07 to 6:00, eight stops. Each stop
is an app, a thing Earnest drafted, and a thing you tapped.

- The most memorable and the easiest to retell.
- Earnest / You at every stop makes the guardrail the structure of the page;
  the tally (7 decisions, 17 drafts, 0 sent without you) makes it a number.
- Brand is proven in retrospect: it wrote in your voice all day because you
  told it once.
- Weakest on skimmability, and it costs the most to keep true, because the
  story depends on the screenshots matching the copy.

## Recommendation (round 1)

Ship **A** as the homepage, with **B's app switcher** as its breadth section.
This is what round 2 does.
The grounded-LLM claim is the one competitors cannot copy by adding a feature,
and the Focus demo proves it fastest. A's only gap is breadth, and B's
switcher closes it in one section.

Keep **C** as the blog post, launch email and sales deck; its eight stops are
also the outline for an in-demo product tour. Use **B** as the shape of the
per-feature pages and any SEO landing where the visitor arrives with a
category in mind.

## Porting notes

- All three use the existing plans, compare rows, FAQ answers and pillar
  data. They port into `SellSheetHome.vue` with `app/data/landing.ts` and
  `app/data/features.ts` unchanged.
- A's Focus demo and B's switcher are the only new interactive pieces; each
  is under 60 lines of script in its mockup.
- A's wave hero can reuse `Landing/WaveField.vue` directly.
- The `thumbs/` PNGs are 1440×900 captures of each hero for the review page;
  regenerate them if a concept changes.
