# Earnest Marketing Site — Update Instructions

These instructions bring the marketing site in sync with the latest Earnest platform features: Contextual AI, Gamification (Earnest Score), CRM Pipeline, and AI Context Broker.

---

## 1. Update Feature Definitions (`app/data/features.ts`)

### A. Add new feature: "Contextual AI Sidebar"

Add a new feature entry for the entity-scoped AI chat panel:

```ts
{
  slug: 'contextual-ai-sidebar',
  name: 'Contextual AI Sidebar',
  icon: 'MessageSquareMore',
  headline: 'AI that knows what you're looking at',
  description: 'Every client, project, invoice, and lead gets its own AI assistant. The sidebar sees the entity you're working on and pulls in relevant context — past conversations, open tasks, billing history — so you get answers without switching tabs or re-explaining.',
  benefits: [
    'Entity-scoped chat sessions persist across visits',
    'Smart prompt suggestions adapt to the entity type',
    'Save AI responses as notes directly on the record',
    'Feedback loop (thumbs up/down) improves suggestions over time'
  ],
  keywords: ['ai sidebar', 'contextual chat', 'entity ai', 'scoped assistant', 'ai notes'],
  category: 'ai'
}
```

### B. Add new feature: "Earnest Score & Gamification"

```ts
{
  slug: 'earnest-score',
  name: 'Earnest Score',
  icon: 'Trophy',
  headline: 'Your team's commitment, quantified',
  description: 'The Earnest Score tracks six dimensions of team performance — follow-through, consistency, responsiveness, proactivity, depth, and CRM activity — and distills them into a single daily score. Levels, streaks, and 14 unlockable badges turn good habits into visible momentum.',
  benefits: [
    'Six-dimension scoring: Follow-Through, Consistency, Responsiveness, Proactivity, Depth, CRM',
    '9 levels from Spark to Cornerstone with EP-based progression',
    '14 badges celebrating milestones like 100-day streaks and first deal closed',
    'Team leaderboard and daily history charts for trend visibility'
  ],
  keywords: ['gamification', 'team score', 'badges', 'streaks', 'leaderboard', 'productivity'],
  category: 'productivity'
}
```

### C. Update existing "CRM Intelligence" feature

Find the existing CRM Intelligence entry and update its description and benefits to reflect the new pipeline board:

```ts
{
  // keep existing slug, name, icon
  headline: 'Pipeline-first CRM with AI intelligence',
  description: 'A drag-and-drop Kanban pipeline takes leads from first contact to closed-won (or captures why they were lost). AI overlays health scores, growth plans, and next-step recommendations so your team focuses on the deals that matter.',
  benefits: [
    'Drag-and-drop Kanban board: new → contacted → qualified → proposal → negotiating → won/lost',
    'Conversion celebrations and lost-reason capture modals',
    'AI-powered pipeline reviews, contact strategies, and growth plans',
    'Filter by assignee, priority, source, and date range'
  ],
  keywords: ['crm', 'pipeline', 'kanban', 'leads', 'deals', 'conversion', 'sales']
}
```

### D. Update existing "AI Strategy Engine" feature

Update to mention the Context Broker's 3-tier caching and cross-module intelligence:

```ts
{
  // keep existing slug, name, icon
  description: 'Earnest\'s Context Broker assembles a live snapshot of your entire organization — clients, projects, invoices, deals, tickets, and brand direction — then feeds it to every AI conversation. A 3-tier cache (memory → snapshot → live query) keeps context fresh without burning tokens on redundant fetches.',
  benefits: [
    'Organization-wide context assembled automatically for every AI call',
    '3-tier caching: in-memory (5 min), Directus snapshots (30 min), live fallback',
    'Brand-aware responses that respect your positioning and voice',
    'Token-efficient — context is shared across all AI features'
  ],
}
```

---

## 2. Update Landing Page (`app/components/SellSheetModern.vue`)

### A. Update the "See it in action" showcase widgets

Add new showcase cards for:
- **Earnest Score** — Show a mockup of the 6-dimension radar chart with level/streak/badge counts
- **CRM Pipeline** — Show a Kanban board mockup with lead cards in stage columns
- **AI Sidebar** — Show a chat panel with entity context and smart prompts

### B. Update the AI capabilities section ("Your data talks, AI listens")

The current section has 4 capability cards. Add or update to include:

1. **Entity-Scoped AI** — "Open a client, project, or lead — the AI sidebar already knows the context. Ask questions, get strategies, save answers as notes."
2. **Context Broker** — "Every AI conversation draws from a live org snapshot: clients, deals, invoices, tickets, and brand. No copy-pasting context."
3. **CRM Intelligence** — "AI reviews your pipeline health, suggests contact strategies, and flags stalled deals before you notice them."

### C. Update the "One platform replaces" orbit

Consider adding "Pipedrive" or "Close CRM" to the replaced tools orbit, since the pipeline board now competes directly with standalone CRM tools.

### D. Update the features accordion

The expandable feature list should now show the updated feature count (23 features with the two new additions). Ensure the accordion pulls from the updated `features.ts` data.

### E. Update the AI chip animation text

Current: `"AI analyzing 142 contacts..."`
Consider cycling through new contextual messages:
- `"AI reviewing pipeline health..."`
- `"Context Broker assembling org snapshot..."`
- `"Earnest Score: 87 — Resolute level..."`

---

## 3. Update Pricing & Token Table

### A. Pricing plans

If Earnest Score and CRM Pipeline are available on all tiers, no change needed. If there are tier restrictions, update the plan comparison to reflect which tiers get:
- Earnest Score & leaderboard
- Full CRM pipeline board
- AI Sidebar on all entity types
- Context Broker token optimization

### B. AI token cost table

If the Context Broker's caching reduces effective token costs, update the transparent AI costs table to reflect the efficiency gains.

---

## 4. Update SEO & Meta

### A. Feature page meta

New feature pages (`/features/contextual-ai-sidebar` and `/features/earnest-score`) need to be added to the prerender routes in `nuxt.config.ts`:

```ts
nitro: {
  prerender: {
    routes: [
      '/features',
      '/features/contextual-ai-sidebar',
      '/features/earnest-score',
      // ... existing routes
    ]
  }
}
```

### B. Schema.org

Update the SoftwareApplication JSON-LD to mention the new feature categories in the `featureList` property.

### C. Homepage meta description

Update the `<meta name="description">` to mention AI-powered CRM pipeline and gamification if not already present.

---

## 5. Update Blog Content (Directus CMS)

Create blog posts in Directus to announce and explain the new features:

1. **"Introducing the Earnest Score"** — Explain the 6 dimensions, levels, badges, and why team-level gamification drives retention
2. **"Pipeline-First CRM"** — Walk through the Kanban board, conversion flow, and AI pipeline reviews
3. **"Contextual AI: Every Entity Gets Its Own Assistant"** — Show how the sidebar works on clients, projects, invoices, and leads
4. **"How the Context Broker Makes AI Actually Useful"** — Explain the 3-tier caching and why org-wide context is the quality ceiling

---

## 6. Visual Assets Needed

- Screenshot/mockup of the Earnest Score dashboard (dimensions chart, badge grid, leaderboard)
- Screenshot/mockup of the CRM Pipeline Kanban board
- Screenshot/mockup of the Contextual AI Sidebar on a client record
- Updated "feature count" wherever "21 features" appears (now 23)

---

## Summary Checklist

- [ ] Add Contextual AI Sidebar to `features.ts`
- [ ] Add Earnest Score to `features.ts`
- [ ] Update CRM Intelligence feature in `features.ts`
- [ ] Update AI Strategy Engine feature in `features.ts`
- [ ] Add showcase widgets to SellSheetModern.vue
- [ ] Update AI capabilities section copy
- [ ] Update replaced tools orbit (optional: add Pipedrive/Close)
- [ ] Update AI chip animation text
- [ ] Add prerender routes in nuxt.config.ts
- [ ] Update Schema.org and meta descriptions
- [ ] Create blog posts in Directus CMS
- [ ] Gather/create visual assets for new features
- [ ] Update feature count references (21 → 23)
