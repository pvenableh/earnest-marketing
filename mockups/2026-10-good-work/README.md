# Landing concepts — "Do good work" (October 2026, round 2)

Open `index.html` in a browser. It presents two concepts and links each one.
Nothing in this folder is wired into the Nuxt build; it is static HTML for
review, like `../2026-10-everywhere/` (whose `shared.css` and `shared.js`
these pages borrow for the looks, the theme control, the ladder and Hue's
footer). The one new primitive, in `good-work.css`, is **the column**:
Earnest as it ships since the rethink (app `Earnest/Column.vue`, October), a
360px column with the thread above, Do · Decide · Know chips, and the
composer at its foot with the scope chip inside it. Every callout on both
pages is one of these, not the old bar.

## The brief

The live home (`SellSheetHome.vue`, ported 2026-10-01) sells **features**:
a walk through 36 floors, a catalogue of 30 verbs, a two-sided invoice, six
apps, brand, three looks, a ladder. It is accurate and it is dense. It
answers "what does it do?" and never asks "who are you when you use it?"

This round moves the pitch up one level, to **the idea**: doing good work.
The references are the three campaigns that sold a stance rather than a
spec sheet, and what they have in common is the whole brief:

| | The line | What it actually sells |
| --- | --- | --- |
| Apple, 1997 | *Think different.* | A stance. Who you are if you choose this. Not one feature of a Mac. |
| BMW, 1975– | *The ultimate driving machine.* | A feeling you own. Not horsepower, torque or trim levels. |
| Nike, 1988 | *Just do it.* | A command that flatters you into motion. Not the shoe. |

Each line is a promise about the person, not the product. The product shows
up later, as proof. So both concepts below lead with a line that is a stance
or a command about doing good work, and the capabilities appear only as
**callouts**: one ask you could type into Earnest, the card it becomes, your
tap. Never as a section called "Features".

The five qualities Peter named are the proof ladder both concepts climb, in
different orders and different registers:

1. **Honest, motivating assistance** — it tells you the truth, kindly, and
   celebrates only what the numbers back (the app's own Voice Charter,
   `server/utils/llm/voice.ts`).
2. **A bird's-eye view** — one honest read of the day; the whole studio at
   once.
3. **Contextual awareness** — it knows the screen you're on and the record
   you opened.
4. **Brand voice** — every draft sounds like you, or like the client.
5. **Integrated effort** — one memory, not seven tabs; a promise made in one
   place is kept in another.

## What changed in the product, and what the live site gets wrong now

Surveyed the app repo at `main` (`f3a25353`, 2026-10-08): 1,696 commits
since July. Three corrections are owed **regardless of which concept ships**,
because the site's own rule is that it is never the first place a promise is
made:

| On the live site today | In the app today | Fix |
| --- | --- | --- |
| "Team channels and **the Boardroom**" (Studio plan), "all six apps, **the Boardroom**, Creative Approvals" (compare lead), a Boardroom feature page, `/features/boardroom`, "Chat & Boardroom" | **Removed** in the September rethink (S8, ~2026-09-22, `docs/earnest-rethink-archive.md`), along with the Command Center, Focus mode and Mirror. | Strike every mention. `features.ts` needs a pass (Boardroom, Command Center, Focus, Director, Dashboard). |
| Plans named **Solo · Studio · Agency** | Renamed **Solo · Team · Business** (S11, 2026-10-06, `shared/plan-pricing.ts`). Keys and prices unchanged ($49 / $149 / $299). | Rename in `landing.ts` plans, compare table and the solo-or-studio FAQ. |
| "business software for **agencies, studios and freelancers**" | Four **shapes** at signup: agency, firm, practice, shop (`shared/org-shapes.ts`). Words and modules change per shape ("Client · Approval" vs "Patient · Appointment"). | Widen the who. Both concepts say "studio, firm, practice or shop". |

And what shipped that the site does not yet know about, which is the raw
material for the callouts (each one is a real tool or route, with its file):

| Shipped | What a visitor can be told |
| --- | --- |
| **27 action tools, 6 read tools** on every screen (`server/utils/llm/tools.ts:1223-1262`) | The callouts. Every ask on both pages names a tool that exists. |
| **Hold list** (`shared/ai-autonomy.ts:23-36`) | Email, invoices, payments, meetings, billing contact and campaign launch always wait for a tap. Five small reversible actions can run alone and be undone. |
| **Read-back after an action** (`server/utils/ai-action-verify.ts`) | Earnest checks the record landed. No model call. |
| **Reply shape** (`prompts/chat.ts:96-103`): bold line ≤ 8 words, ≤ 4 facts number-first, under 40 words, and a hedge when the data can't support a judgement ("No satisfaction data — only signals") | The honesty beat has a literal example. |
| **Reasoning answers** (R4, 2026-10-06): why / how should / compare → a 180-word prose answer | "Why is this invoice overdue?" is a real ask with a real shape. |
| **80% budget notice** (`server/utils/ai-budget-notice.ts`) | It says so before it runs out. |
| **"Earnest knows you"** (`server/utils/person-profile.ts`) | A nightly profile of how *you* talk to it. |
| **Promised check-ins become scheduled follow-ups** (early Sept) · **a signed contract builds its project** · **a dropped PDF becomes a timeline and payment plan** (`extract_agreement`) | The "keep your word" beat in Concept H. |
| **Client-scoped lists** (L1–L11, Oct 8): a client's list mails *as the client*, its own domain, per-sender unsubscribe | Brand voice extends to the From line. |
| **Email builder** (Oct 8–9): one canvas, autosave, merge-tag fallbacks checked before send, missing footer address asked for | Proof for "it stops and asks". |
| **Phone, two-way calendar sync (Google, Outlook, Apple/CalDAV, ICS), double-booking guard** (Oct 1–3) | Integrated effort, literally. |
| **Voice**: push-to-talk, spoken replies, hands-free "Earnest, …" with a spoken yes on a card; Custom Voice add-on $9/mo | A second channel for the same honesty. |
| **Client Earnest** in the portal, three reads + three proposals (`portal-earnest-tools.ts`) | Already on the live home; both concepts keep it as one line, not a section. |

Still off, still "coming soon": social publishing. Still parked: World. Not
built: an MCP server. None of these appear on either page.

## The thesis both concepts share

> **Earnest is an adjective before it is a product.**

To be earnest is to mean it. The name already says what the software is for:
a business run by someone who means it, assisted by something that tells the
truth. That is the whole positioning. The two concepts are two registers of
the same sentence.

| | Concept G | Concept H |
| --- | --- | --- |
| Line | **Do good work.** | **Mean it.** |
| Register | Apple. A creed: belief statements. | BMW / Nike. A drive: commands. |
| The feeling | Calm. Someone whose work is in hand. | Momentum. Someone in control of the day. |
| Look | Paper, light (editorial serif, ink on linen). | Glass, dark (cinematic, the wave). |
| How the product appears | A footnote under each belief: one ask, one card. | A move under each command: one ask, one card, your tap. |
| Sign-off | *Earnest. Do good work.* | *Mean it. Do good work. Earnest.* |

---

## Concept G — "Do good work." (`concept-g.html`, Paper light)

**Leads with the creed.** The page is a manifesto in the Apple register: one
column, big serif, short declarative beliefs. The product is never
introduced; it is *overheard*, as the ask under each belief.

### Hero

> **Do good work.**
>
> Not more work. Not faster work. Good work: finished, paid for, said in your
> own voice, and known about before anyone has to ask. Earnest is business
> software for people who mean that.
>
> [Start free] [Try the live demo]
> 14-day trial, no card · Solo $49/mo · every feature on every plan · your data never trains the model

### The creed (one screen, type only)

> Good work is finished.
> Good work gets paid.
> Good work sounds like you.
> Good work knows what's overdue before the client does.
> Good work is honest about where it stands.
> Good work doesn't need a bigger team. It needs a better Tuesday.

### The beats — each belief, then one ask

Each beat is a belief as the headline, one sentence, and a **callout**: the
column, with the ask you typed, what came back, the card and where the tap
is. Order follows the creed.

1. **It tells you the truth, kindly.** *(honest, motivating assistance)*
   Earnest's charter is accuracy before interest. If the numbers are good it
   says so with energy; if they're not, it says that too, and says what's
   missing rather than guessing.
   Callout — ask: *"How are things with Meridian Law?"* → reply: **$9,400
   overdue, 159 days quiet.** · 2 invoices past 90 days · last real touch
   May · *No satisfaction data — only signals.* → row: **Draft a payment
   reminder** (held · your tap).

2. **See the whole thing at once.** *(bird's-eye view)*
   One screen, one honest read of the day. The greeting is written from your
   records, not a template.
   Callout — the Home line: *"22 things today, 5 need a decision."* · Unpaid
   $12k · Pipeline $286k · ask: *"What's coming up this week?"*

3. **It knows where you're standing.** *(contextual awareness)*
   Every screen tells Earnest where you are. Open a record and the record
   goes instead. The chip above the composer shows what it can see.
   Callout — chip `PROJECT · Helios West Hotel Launch` · ask: *"Push the
   dates back a week"* → card: **Reschedule project** · 14 items move ·
   locked dates stay · [Approve] [Adjust].

4. **Every sentence sounds like you.** *(brand voice)*
   Direction, audience and voice live on your organization and on each
   client. Every draft reads from them, down to the From line: a client's
   list mails as the client.
   Callout — ask: *"Two posts for Pinecrest in their voice"* → two drafts,
   one with the chip `CLIENT · Pinecrest Clinic · voice: warm, plain`.

5. **One memory, not seven tabs.** *(integrated effort)*
   Clients, work, money, marketing and the calendar are one app. A payment
   recorded here settles the invoice there. A signed contract builds its
   project. A check-in you promised in a meeting is on the calendar.
   Callout — ask: *"Dana paid 0031 by check, $350"* → card: **Record
   payment** · settles INV-…-0031 · [Approve] · then: *Checked. 0031 is
   paid.*

### What it never does (the short list, under the beats)

> It won't send what you haven't seen. It won't move money. It won't approve
> creative work for a client. It won't read another studio's data. It won't
> train on yours.

### Then, unchanged from the live home

The pricing ladder (renamed Solo · Team · Business), three FAQs (what do I
see, how does it know, who can see my data), the closing CTA.

### Closing

> **Earnest.** *Do good work.*
> Start with the pile that's bothering you.

### What it would change on the live home

- The hero: the walk comes out. The hero is type. The column is the
  callout under each beat.
- The verb catalogue, the two-sided invoice, the app switcher and the Looks
  section come out as sections. The verbs survive as the five callouts; the
  portal survives as one FAQ; Looks survives as the nav control (the page
  still wears whatever the visitor picks).
- `landing.ts` gains a `beliefs` array and a `callouts` array; `landing-
  floors.ts` is still the source for the chip and row strings.

### Strengths and risks

- **Strongest on the idea.** It is the only page a visitor could quote back.
- **Shortest page the site has had**; the port removes more than it adds.
- **Risk:** a creed can read as empty if the callouts are not visibly real.
  Every callout on the page is a tool that ships; that is the whole defence.
- **Risk:** Paper reads editorial, and some visitors will take it for a
  magazine. The nav control is there for that.

---

## Concept H — "Mean it." (`concept-h.html`, Glass dark)

**Leads with the drive.** The page is a sequence of commands in the Nike
register, with BMW's sense of a machine you own. The feeling is momentum:
you know where you stand, you say the next move, it happens. Dark, with the
wave field under the hero.

### Hero

> **Mean it.**
>
> Every invoice. Every send. Every number you say out loud in a meeting.
> Earnest is business software that runs your studio, firm, practice or shop
> like you mean it: honest about where it stands, ready with the next move,
> waiting for your word.
>
> [Start free] [Try the live demo]

Under the hero, the one honest line from Home, as a receipt, not a feature:
*"22 things today. 5 need you."*

### The commands — one each, with the move underneath

Every beat is a two- or three-word command, one sentence, and **the move**:
the ask, what Earnest does, your tap. This is the BMW half: the product is
the machine under the feeling.

1. **Know where you stand.** *(bird's-eye view)*
   One screen. One honest read, written from your records. Four numbers,
   then what needs you, what's one tap, and what you only need to know.
   Move — the Home head: 22 today · 5 decisions · $12k unpaid · $286k in
   play · and the Decide row: *Create 2 tasks on Helios — Website Build ·
   proposed by Earnest* [Approve].

2. **Say the next move.** *(executable commands, contextual)*
   From any screen. It writes the card; you tap. Nothing that reaches a
   client or moves money goes without you.
   Move — ask: *"Find a time with Helios Friday, 60 minutes"* → card: **Book
   meeting** · Fri 10:00–11:00 · on your Google calendar · invite drafted ·
   [Approve] [Adjust]. Line under it: *Held. Meetings always wait for you.*

3. **Hear the truth.** *(honest, motivating assistance)*
   No unearned hype. When the numbers are a win it says so loudly; when
   they're not, it says so kindly, and it says what it doesn't know.
   Move — ask: *"Why is this invoice overdue?"* → the reasoned answer, four
   lines: 92 days · two reminders, no reply · Amara holds it · *No
   satisfaction data — only signals.* → row: **Draft a payment reminder**
   (held).

4. **Sound like yourself.** *(brand voice)*
   Your voice on your organization, the client's on each client, and a
   profile of how you talk to Earnest that it writes overnight. The drafts
   inherit all three. A client's newsletter mails as the client.
   Move — ask: *"Rewrite this warmer"* on a scheduled LinkedIn post → the
   redraft with the chip `POST · Three things we changed on the Pinecrest
   site`.

5. **Keep your word.** *(integrated effort)*
   A promise made in one place is kept in another. The check-in you said
   you'd do in a meeting is on the calendar. The signed contract is already
   a project. The payment plan in the PDF you dropped is the invoice
   schedule.
   Move — a three-step strip: *Signed contract* → *Project with 4 phases* →
   *Milestone 1 billed, one press.*

### The machine (one band, three lines, no headings)

> Runs on Anthropic's Claude, on no-training terms. Reads your records, never
> your calendar's event details. Says so at 80% of your AI budget.

### Then, unchanged from the live home

Pricing ladder (Solo · Team · Business), three FAQs, the CTA.

### Closing

> **Mean it.**
> *Do good work.*
> **Earnest.**

### What it would change on the live home

- The hero: the walk comes out; the hero is the line and the receipt. The
  column is the "move" under each command.
- The verb catalogue comes out; five moves replace thirty verbs. The
  catalogue's "Never" column survives as one sentence in beat 2.
- The two-sided invoice, the app switcher, the brand card and the Looks
  section come out as sections. Brand is beat 4. Looks is the nav control.
- `landing.ts` gains a `commands` array with the move for each.

### Strengths and risks

- **Strongest feeling.** It is the page that makes someone want it, which
  is what Nike and BMW sold.
- **Strongest on the new product**: beat 5 is the September "proposal →
  project → payment" work and the October calendar sync, which the live
  home does not mention.
- **Risk:** "Mean it." is a dare, and a dare can land as pressure. The
  lede's "waiting for your word" and beat 3's kindness are the counterweight.
- **Risk:** commands in Clean's condensed caps will shout; the page defaults
  to Glass and reads fine in Paper. Worth a look in all three before
  choosing.

---

## Rules both pages obey

- **Do not sell Earnest in Earnest's own nouns.** No home, door, lens, pile,
  floor, rail, Boardroom. "Decide · Do · Know" appears only inside a
  callout, as the UI shows it, never as a promise.
- **Every number is the demo workspace's**, the same ones the live home
  uses (`app/data/landing.ts`): 22 things today, 5 decisions, $12k unpaid
  across 6 invoices, $9,400 past 90 days at Meridian Law, $286k pipeline
  across 12, Helios West 30 days late, INV-…-0042 $6,400 at 92 days, Amara
  Okafor 159 days quiet, the $350 check settling 0031. Two figures stay
  illustrative, as before: the $45 Figma charge and the $350 check.
- **Every ask names a tool that ships** (`server/utils/llm/tools.ts`), and
  every held card is one on the hold list (`shared/ai-autonomy.ts`).
- **The honesty rules carry over**: social publishing is coming soon;
  Creative Approvals is included, never priced; Personal Brand is built,
  not on sale; the Boardroom does not exist.
- **The Voice Charter applies to the site.** No "amazing", no "game-changer".
  The biggest word on either page is "good".

## Photography

Peter (2026-10-09): the pages felt too digital. Both now carry photographs,
serious but positive: blurred people walking, people working, rooms, a client
across a table. They are **stock placeholders, hot-linked from Unsplash**
(free to use under the Unsplash license, no files in the repo), each tagged
`stock · replace` on the page and `data-slot` in the markup, so a real shoot
replaces each one by its `src`. The Unsplash page is the credit.

| Slot | Page · place | What it is | Source |
| --- | --- | --- | --- |
| `g-hero` | G · under the hero type | Blurred crowd on a city street, morning | [unsplash.com/photos/DpKt0-Nvi6I](https://unsplash.com/photos/blurred-crowd-of-people-walking-in-a-city-street-DpKt0-Nvi6I) |
| `g-room` | G · band after the creed, "Where the work gets done." | A quiet studio room, glass divider, white curtain | [unsplash.com/photos/rSpMla5RItA](https://unsplash.com/photos/room-with-glass-divider-and-white-curtain-rSpMla5RItA) |
| `g-client` | G · band between beats 3 and 4, "The client, across the table." | A small team and a client in a sunlit office | [unsplash.com/photos/KHpjeuaWOec](https://unsplash.com/photos/people-in-sunlit-office-workspace-meeting-KHpjeuaWOec) |
| `g-close` | G · behind the closing "Earnest. Do good work." | A potter at the wheel (the shop shape; good work, literally) | [unsplash.com/photos/xUlNEFpNIaY](https://unsplash.com/photos/a-potter-molds-clay-on-a-wheel-in-his-workshop-xUlNEFpNIaY) |
| `h-hero` | H · under "Mean it." | A blurred figure walking toward light | [unsplash.com/photos/iVhrpMspZRI](https://unsplash.com/photos/blurred-figures-walking-in-darkness-with-bright-light-iVhrpMspZRI) |
| `h-work` | H · trio after "Hear the truth", "Working." | Someone at a desk, head down | [unsplash.com/photos/_ITadYbx6Ls](https://unsplash.com/photos/man-working-on-a-computer-at-a-desk-_ITadYbx6Ls) |
| `h-room` | H · trio, "The room." | An office with a window | [unsplash.com/photos/HYYHvBsZOfU](https://unsplash.com/photos/an-office-with-a-desk-and-chairs-and-a-window-HYYHvBsZOfU) |
| `h-present` | H · trio, "The presentation." | Presenting to a small group with laptops | [unsplash.com/photos/gMsnXqILjp4](https://unsplash.com/photos/man-standing-in-front-of-people-sitting-beside-table-with-laptop-computers-gMsnXqILjp4) |
| `h-close` | H · behind the closing "Mean it." | A woman presenting a chart to a room | [unsplash.com/photos/LzBMjkvZfh8](https://unsplash.com/photos/woman-presenting-a-graph-to-an-audience-LzBMjkvZfh8) |

How they are treated (`good-work.css` · Photography): heroes and closings sit
under the type, washed toward the page colour with a gradient so the line
stays legible in every look and mode; Paper desaturates and warms them,
dark modes dim them; bands and the trio are plain frames with a one-word
caption. Nothing is a screenshot; the product stays in the column.

**Shot list for the real shoot** (what to replace each slot with, same
order): someone walking to work, blurred, early; the studio or shop with
nobody in it; a client across your own table, mid-sentence; you at your
desk, head down; the presentation, from the back of the room; one closing
frame of the work itself being made, hands in it. Serious, warm, no stock
smiles, no laptops-as-props. Same person through G if possible.

## Round 3 — one design, light and dark (`good-work.html`)

Peter (2026-10-09): *"I'm leaning away from the theme system. I want this
page to reflect clean, idea-driven beauty of the conceptual advantage of
the Earnest app. Focus on one design that switches between light and dark."*
And, the same day: more abstract photographs and MP4s for movement (sun
rising, grass, palms), an MP4 of the app working that animates on scroll,
and the whole thing to feel like an iPhone page on apple.com, with a human
and beauty to it.

**`good-work.html` is that page.** G and H stay in the folder as the two
registers it was built from; the review page leads with the one design.

### What it is

| | |
| --- | --- |
| Line | **Do good work.** under a sunrise; **Mean it. · Do good work. · Earnest.** to close |
| Tokens | `one.css`. Light: warm white (`#fbfaf7`) and ink. Dark: near-black (`#0b0d12`). One accent (`#0a7fc4` / `#4fb3ec`). No Glass, no Paper, no Clean. |
| Type | The body face (Proxima Nova) at weight 300, large and tight, for every headline. The wordmark keeps Bauer Bodoni. No handwriting face. |
| Mode | ☾ / ☀ in the nav; remembered on the browser; `#dark` / `#light` deep-link; the system preference is the default. |
| Order | Hero → the creed (six lines) → **the app, scrubbed by scroll** → Know where you stand → Say the next move → the client across the table → Hear the truth → Sound like yourself → a field in wind ("Steady.") → Keep your word → the never list → an abstract still → the machine band → pricing → four FAQs → the closing over the potter → footer |

### Motion (`motion.js`, the Motion block in `good-work.css`)

- **Ambient video** under the hero and in the wide band: Mixkit stock, free
  license, hot-linked at 720p, fading in only once it is actually playing;
  the still photograph under it is the fallback and the reduced-motion
  state. Hero: sunrise over green hills (mixkit 26532). Band: a field in
  wind (mixkit 1709). Candidates looked at and not used: a mountain sunrise
  over firs (6850, H's hero), a palm frond on grey sky (44501, H's band),
  wildflowers (2562).
- **The app sequence** is Apple's iPhone-page move: a sticky stage, one
  JPEG frame per scroll step drawn to a canvas, four captions that follow
  the progress (Open it · Go where the money is · Ask · It answers from your
  records, you tap). 100 frames at 1280 wide, 5.4 MB, in
  `app-seq/frames/`. Under reduced motion it shows the last frame with all
  four captions.
- **Reveal**: copy and columns rise 18px as they come into view.

### How the app sequence was made (`app-seq/`)

`record.mjs` drives the public live demo
(`app.earnest.guru/try-demo?persona=solo`) headless with Playwright and
records it: dismiss the walkthrough, Home, scroll, Invoices, click the
$12,000 row, type *"Why is invoice 0007 overdue?"* into the column, send.
Nothing is approved and nothing is sent to anyone. `rec-dark.webm` is the
raw recording; the frames are two cuts of it (Home 21–26.5 s, Invoices and
the typing 30–41.2 s) at 6 fps, and `app-loop.mp4` is the same 16.7 s as an
H.264 loop (295 KB) for anywhere a plain autoplay is wanted.

Two things to know before a real capture:

1. **The demo's Earnest answered the ask with a mock.** "Why is invoice
   0007 overdue?" came back as *"Proposed an invoice · failed · 60ms — I have
   put an invoice together for you to look over."* That is the demo
   provider, not Claude, and it is wrong twice over (it did not propose an
   invoice, and the reasoned answer never came). The sequence therefore
   stops at the typed ask; the reply is the coded column in the next beat.
   Worth fixing in the demo before any public capture: a visitor who tries
   the same ask will see the same thing.
2. **The demo renders dark whatever the browser prefers** (the demo user's
   theme), so the stage is dark on the light page too. A real capture should
   set the demo user's look to match, or capture both and switch by mode.

### Feedback pass (Peter, from the preview, 9 Oct)

- Lede cut to two lines: *Not more work. Not faster work. / Business software for people who mean it.*
- The creed is now a sticky stage: "Good work" holds on the left and the predicate lines arrive one at a time with the scroll (`.creed` in `one.css`, the creed handler in `motion.js`); the last line turns to the accent. Reduced motion lists them.
- No rules between sections. Beats are full-bleed; every other one carries a gradient with an inner shadow (`.beat.tone`). On md+ the copy sticks at 22vh while the column scrolls up to it.
- "Hear the truth" and "Sound like yourself" sit on the client photograph, full-bleed (`.over-photo`), with a lead line over it: *The client, across the table.* The columns go dark glass there.
- The signed → project → billed cards arrive one after another (`.kept .step[data-reveal]`, staggered).
- Nav links are uppercase.
- **The literal page stays separate.** Each beat ends in a small link into the live site's feature pages (`earnest.guru/features/<slug>`), and the FAQ gained *"What are all the features, apps and abilities?"* pointing at `/features`. Recommendation: keep this page the idea, keep `/features` the list, and give `/features` its own cleanup (Boardroom, Command Center, Focus and Director entries are stale there).
- Preview: `.claude/launch.json` has a `mockups` server (`python3 -m http.server 4173 --directory mockups`); the page is at `http://localhost:4173/2026-10-good-work/good-work.html`.

### Feedback pass 2 (Peter, from the preview, 9 Oct)

- The client photograph **holds while the two beats scroll over it**: a sticky 100vh layer under the content (`.over-photo__bg`), not `background-attachment: fixed`, so phones get it too. (`overflow: clip` on the section, not `hidden`, or the sticky breaks.)
- **"Steady."** is a full-bleed section with the field-in-wind clip behind it and a line under the word: *Not busy. Not loud. The whole business in hand, every day, and the calm that comes from knowing where it stands.*
- **"Keep your word"** sits on the golden-light photograph, full width, copy and the three cards over it (`.over-photo--short`). The separate abstract band is gone.
- The features FAQ has a visible **See every feature →** button to `/features`.
- Footer links are uppercase, like the nav.

### The claim map, unchanged

Every ask on the page names a tool that ships, every held card is on the
hold list, every number is the demo workspace's, and nothing is a Boardroom.

### Files

```
good-work.html    the one design (light and dark)
one.css           its tokens and the few component overrides
motion.js         ambient video, the scroll-scrubbed sequence, reveal
good-work.css     the column, the beat layout, the photo slots, the motion CSS
app-seq/          record.mjs, rec-dark.webm, frames/ (100 JPEG), app-loop.mp4, app-poster.jpg
concept-g.html    G · the creed (Paper)   — superseded, kept for reference
concept-h.html    H · the drive (Glass)   — superseded, kept for reference
index.html        the review page
thumbs/           renders: the one design light and dark (full page, hero, the sequence), G and H full page, the review page
```

## Recommendation

**Ship `good-work.html`.** It is H's beats under G's line, with the creed
kept, in one design that switches light and dark. (Earlier in the round the
recommendation was H's hero and beats with G's creed for the About page;
Peter's direction on the 9th folded both into one.)

Either way, do the three corrections (Boardroom, plan names, four shapes)
first, on `main`, this week. They are wrong now.

## Files

```
index.html        the review page (both concepts, the brief, the claim map)
concept-g.html    G · Do good work.   (Paper, light)
concept-h.html    H · Mean it.        (Glass, dark)
good-work.css     the column, the beat layout, the never list, the machine band, the photo slots
make-thumbs.mjs   renders thumbs/ at 1440×900, full page and 390 wide
                  (PLAYWRIGHT_MODULE=<app repo>/node_modules/playwright node make-thumbs.mjs)
thumbs/           the renders
```

Both pages link `../2026-10-everywhere/shared.css` and `shared.js` for the
looks, the theme control, the ladder, the FAQ, the CTA, the wave and Hue's
footer. The creed and the command layouts are inline in each file.
