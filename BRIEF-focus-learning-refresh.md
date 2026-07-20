# Marketing site refresh — messaging brief

**Scope chosen:** Full rethink of the landing narrative (not just bolt-on sections).
**Status:** Draft for review — no code yet. Approve / redline the narrative, then I build.
**Target:** `earnest.guru` landing (`SellSheetGlass.vue`), with knock-on updates to `features.ts`.

---

## 1. Why we're touching it

The current site tells a strong but *older* story: **context-aware decision machine → Director's Office → accurate over eager → context-aware → real screens → honest pricing**. It's good. But three things the product now leads with are missing or buried:

| The product does this now | On the site today |
| --- | --- |
| **Focus mode** — a full-screen space where Earnest sits with you and thinks *with* you | **Absent** |
| **Learns your patterns** — it gets to know how you work and earns more autonomy over time (Mirror + trust dial) | **Absent** |
| **The ethos itself** — earnest = honest, understanding, good work | "Honest" is a *pricing* adjective; "Do good work" is only the footer |

The refresh makes the **ethos the spine** and lets Focus + the learning layer carry it, instead of the current feature-tour framing.

---

## 2. The one idea everything hangs on

> **Earnest is the tool that's honest with you, understands you, and helps you do good work.**

Not "an AI that does your admin." The differentiator is *posture*: most AI is eager and confident about everything; Earnest is **accurate, calibrated, and honest** — it earns trust by being right, not by being loud. That's not a tagline we invented for the site; it's the product's actual [Voice Charter](../earnest/server/utils/llm/voice.ts) ("accuracy before interest… name uncertainty out loud… honest over flattering… earn trust by being right"). The site should sound like the product.

Three words to thread through the whole page: **Honest · Understanding · Good work.**

---

## 3. Proposed narrative arc (new section order)

Each section = one beat. Bold = the headline promise; italics = the supporting line.

1. **Hero — the ethos, stated plainly**
   *Current:* "Context in. Accuracy out." (abstract)
   *New:* Lead with the human promise. e.g. **"The one that's honest with you."** / *Earnest reads your whole organization, tells you the truth about it, and helps you do good work — one calm decision at a time.* Keep the live-app hero shot.

2. **Understands you → Focus** *(NEW — headline feature)*
   The full-screen space where Earnest sits with you. Not a chatbot in a corner — a place to think. Pull the real product copy: *"I'm here. No rush. What's the honest version of how things are right now?"* Show the Focus screen. This is the emotional centerpiece and it's brand-new to the site.

3. **Learns your patterns** *(NEW)*
   Earnest gets to know how *you* work — your voice, your rhythm, what you always approve, what you never do. The more it's right, the more you let it carry. Trust compounds. (Mirror surface + per-user trust dial + earned autonomy.) Frame as *a partner that grows into the role*, not "personalization settings."

4. **Honest by design — accurate over eager** *(KEEP, promote)*
   Already on the site and strong ("It doesn't oversell"). This is the *proof* behind the ethos in beat 1. Keep, tighten, and tie explicitly to "honest."

5. **The Director's Office** *(KEEP)*
   Your whole org, presented to you. Still the flagship surface. Keep largely as-is.

6. **Does the work, you say yes** *(KEEP)*
   The decision-flow rhythm + "nothing reaches a client or moves money without your tap." Reinforces the honesty/safety promise.

7. **Every screen is the real app** *(KEEP)*
   No mockups. Strong trust signal — keep.

8. **Honest pricing** *(KEEP)* → now it *rhymes* with the top of the page instead of being the only place "honest" appears.

9. **FAQ / CardDesk / CTA "Do good work."** *(KEEP)* — the CTA line now pays off a theme the whole page built, not a one-off.

**Net change:** two new marquee sections (Focus, Learns-your-patterns) inserted high; the ethos reframes the hero and re-colors everything below; the existing strong material stays but gets re-sequenced so it reads as *evidence for the ethos* rather than a feature list.

---

## 4. Voice guardrails (from the product's own charter)

The site must practice what it sells. So:

- **No unearned hype.** No "revolutionary," "game-changer," "10x." The charter literally forbids this voice internally; the marketing shouldn't contradict it.
- **Calibrated claims.** "Acts when it's sure, proposes when it matters, holds back when it isn't" — keep this honesty front-and-center; it's the whole differentiator.
- **Concrete over grand.** Real screens, real numbers, real product copy (the Focus greeting) beat adjectives.

---

## 5. What I need from you before building

## 6. Decisions locked (2026-07-20)

1. **Hero direction: WARM / human.** Lead with the person, not the abstraction. Draft hero lines (pick/redline one):
   - *"The one that's honest with you."*
   - *"Do good work. Earnest has your back."*
   - *"Your whole business, met with honesty."*
   Sub-line under whichever we pick: *Earnest reads your whole organization, tells you the truth about it, and helps you do good work — one calm decision at a time.*

2. **Public naming (proposed — redline if you disagree):**
   - **Focus** → keep it **"Focus"** (matches the in-app FOCUS label; calm, honest, no coined jargon). Section headline stays warm, e.g. *"When it's a lot, there's Focus."* Descriptor: *a quiet, full-screen space where Earnest sits with you and takes it one honest thing at a time.*
   - **Learning layer** → frame the section as **"It learns how you work,"** and name the underlying idea **"Earned trust."** The story: Earnest learns your voice, your rhythm, what you always approve — and the more it's right, the more you let it carry. Trust that compounds. (Avoids a coined product-noun that needs explaining; the verb-first frame reads more honest.)
   - *Alternatives if "Earned trust" feels off:* "It learns you" / "Grows into the role."

3. **Screenshots — reduced, captivating set (5 hero shots), dark mode + colour palette:**
   | # | Screen | Story beat it carries |
   |---|--------|----------------------|
   | 1 | **Presence home** — "Here's what needs your attention / THE ONE THING" + the Focus nudge | Understands you · honest · the daily rhythm. *(Captured 2026-07-20 — it's the hero.)* |
   | 2 | **Focus mode** — "I'm here. No rush. What's the honest version of how things are right now?" | Focus · calm · honesty |
   | 3 | **A drafted decision / AI action** in your voice, awaiting your tap | Does the work, you say yes · accurate over eager |
   | 4 | **The learning / Mirror surface** (or trust dial) | It learns how you work · earned trust |
   | 5 | **One real app surface** (Work timeline or Money) with real data | Real product, not a mockup |

   *Asset production:* browser-pane screenshots can't be saved straight to `/public/screenshots/latest/`. Options: (a) a small Playwright capture script in the earnest repo driving the `/try-demo` flow → writes PNGs to the marketing `public/` folder; (b) Peter captures them manually against the demo using this shortlist. TBD.

## 7. Next step

Once naming is confirmed, I'll write the copy section-by-section against the arc in §3, then implement in `SellSheetGlass.vue` on a `feat/focus-learning-refresh` branch and preview it. Screenshots slot in as assets land.
