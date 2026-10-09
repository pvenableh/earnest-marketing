/**
 * Landing-page copy, in one place.
 *
 * WHY THIS FILE EXISTS. The FAQ used to live twice: once as HTML inside the
 * landing component and once, hand-copied to plain text, inside `index.vue`'s
 * FAQPage JSON-LD. They drifted — the structured data kept answering questions
 * the page had already reworded. Every answer here carries BOTH forms:
 *   · `a`      the rendered answer, with links and emphasis
 *   · `aText`  the same answer as plain prose, for the rich result
 * Google strips markup from FAQPage anyway, so the two never disagree again.
 *
 * ⚠️ VOICE. This is marketing copy for a product whose own charter is "earn
 * trust by being right, not by being loud" (`server/utils/llm/voice.ts` in the
 * app repo). Concrete numbers over adjectives; no claim the app cannot make
 * good on today. In particular:
 *   · Publishing to social networks is COMING SOON — the kill-switch is off in
 *     production and the app itself says so. Drafting and planning are live.
 *     Never write "schedule across channels".
 *   · Creative Approvals is "included on every plan today". It has an intended
 *     $19/mo price and no Stripe price id, so it is free for every org. Do not
 *     print a price for something nobody is charged.
 *   · Personal Brand is BUILT BUT NOT ON SALE — a distinction worth keeping
 *     straight. Phase 1 shipped (the profile editor, "apply to card & booking
 *     page", Earnest drafting the profile), so it is not vapour. But
 *     `personal_brand` still has `stripePriceId: null`, is deliberately out of
 *     `ALWAYS_INCLUDED_ADDONS`, and `requireAddon` 402s anyone not entitled by
 *     script — so nobody can buy it and almost nobody has it. The app renders a
 *     dimmed "Coming soon" row with NO PRICE; do the same here. The intended
 *     $19/mo is not a price anyone can pay.
 *   · Capacity numbers mirror `EARNEST_PLANS` in the app's `server/utils/
 *     stripe.ts`. If they move there, they move here.
 */

const APP_ORIGIN = 'https://app.earnest.guru';
const REGISTER_URL = `${APP_ORIGIN}/register`;

export interface Faq {
	q: string;
	/** Rendered answer — may contain links and <strong>. */
	a: string;
	/** The same answer, flattened, for the FAQPage rich result. */
	aText: string;
}

export const faqs: Faq[] = [
	{
		q: 'Is Earnest actually live?',
		a: `Yes. Earnest runs in production — sign up at <a href="${REGISTER_URL}">app.earnest.guru</a> and your workspace is ready in a few minutes. There is also a <strong>live demo</strong> with sample data, no sign-up needed.`,
		aText:
			'Yes. Earnest runs in production — sign up at app.earnest.guru and your workspace is ready in a few minutes. There is also a live demo with sample data, no sign-up needed.',
	},
	{
		q: 'What do I actually see when I open it?',
		a: 'One screen. A greeting with an honest read of the day — “22 things today, 5 need a decision” — four numbers at a glance, and then three piles: <strong>Decide</strong> (things Earnest drafted and is waiting on you for), <strong>Do</strong> (one tap each) and <strong>Know</strong> (nothing required, but worth knowing). Four lenses re-rank the same screen around money, creative work or projects.',
		aText:
			'One screen. A greeting with an honest read of the day — “22 things today, 5 need a decision” — four numbers at a glance, and then three piles: Decide (things Earnest drafted and is waiting on you for), Do (one tap each) and Know (nothing required, but worth knowing). Four lenses re-rank the same screen around money, creative work or projects.',
	},
	{
		q: 'How does it know which screen I’m on?',
		a: 'Every screen of every app has its own sentence, and that sentence travels with every ask. Open a record and its own context goes instead. The chip in the composer shows what Earnest can see.',
		aText:
			'Every screen of every app has its own sentence, and that sentence travels with every ask. Open a record and its own context goes instead. The chip in the composer shows what Earnest can see.',
	},
	{
		q: 'Can my clients use Earnest?',
		a: 'If you switch it on. In their portal, Earnest answers as your business and sees only what that client can already open. It can log a request, leave a note or book time with you. Nothing else. Tokens bill your plan, so it is off by default.',
		aText:
			'If you switch it on. In their portal, Earnest answers as your business and sees only what that client can already open. It can log a request, leave a note or book time with you. Nothing else. Tokens bill your plan, so it is off by default.',
	},
	{
		q: 'How is this different from ChatGPT or a generic AI assistant?',
		a: 'Earnest runs on a <strong>real large language model</strong> — Anthropic’s Claude — but it does not start from a blank prompt. It starts from your organization: your clients, your work, your money, your brand voice. It sits beside every screen, and already knows where you are standing when you ask. Your data is never used to train the model.',
		aText:
			'Earnest runs on a real large language model — Anthropic’s Claude — but it does not start from a blank prompt. It starts from your organization: your clients, your work, your money, your brand voice. It sits beside every screen, and already knows where you are standing when you ask. Your data is never used to train the model.',
	},
	{
		q: 'What happens when Earnest doesn’t have enough context?',
		a: 'It stops and asks. If it is thin on your brand, your goals or a client’s voice, it tells you what is missing rather than filling the gap with something plausible. Real context over generic confidence.',
		aText:
			'It stops and asks. If it is thin on your brand, your goals or a client’s voice, it tells you what is missing rather than filling the gap with something plausible. Real context over generic confidence.',
	},
	{
		q: 'Will Earnest send emails or move money on its own?',
		a: 'No. Low-stakes, reversible work — reconciling a payment, summarising a meeting, enriching a contact — can run on its own with a full audit trail, and you can dial how much of that it handles. The floor never moves: <strong>nothing reaches a client and no money moves without your tap</strong>.',
		aText:
			'No. Low-stakes, reversible work — reconciling a payment, summarising a meeting, enriching a contact — can run on its own with a full audit trail, and you can dial how much of that it handles. The floor never moves: nothing reaches a client and no money moves without your tap.',
	},
	{
		q: 'Can Earnest post to Instagram or LinkedIn for me?',
		a: 'Not yet. What is live today is the <strong>drafting and the planning</strong>: on-brand posts and campaign emails, content plans, an approval round with your client, and a queue of what goes out next. <strong>Publishing straight to the networks is coming soon</strong> — until it ships, the last step is yours.',
		aText:
			'Not yet. What is live today is the drafting and the planning: on-brand posts and campaign emails, content plans, an approval round with your client, and a queue of what goes out next. Publishing straight to the networks is coming soon — until it ships, the last step is yours.',
	},
	{
		q: 'How do clients approve work?',
		a: 'You send it in one press. Your client opens a link — no login, no account — and marks each piece approved or asks for a change, with notes pinned to the artwork. Rounds stack up and nothing is erased, so six weeks later you can still see who said what. <strong>Included on every plan today.</strong>',
		aText:
			'You send it in one press. Your client opens a link — no login, no account — and marks each piece approved or asks for a change, with notes pinned to the artwork. Rounds stack up and nothing is erased, so six weeks later you can still see who said what. Included on every plan today.',
	},
	{
		q: 'Can Earnest write in my own voice, not just my studio’s?',
		a: 'Earnest already works from your <em>studio’s</em> brand direction and audience. <strong>Personal Brand</strong> is the layer above that — your own positioning, voice, audience and proof points, written once (Earnest drafts the first pass from what it already knows about you), then applied to your business card and your booking page in one press, and used when the Content Studio drafts in your name. <strong>It is built, but it is not on sale yet</strong>: you will see it in the app listed as coming soon, with no price, and nobody is being charged for it.',
		aText:
			'Earnest already works from your studio’s brand direction and audience. Personal Brand is the layer above that — your own positioning, voice, audience and proof points, written once (Earnest drafts the first pass from what it already knows about you), then applied to your business card and your booking page in one press, and used when the Content Studio drafts in your name. It is built, but it is not on sale yet: you will see it in the app listed as coming soon, with no price, and nobody is being charged for it.',
	},
	{
		q: 'Can I change how it looks?',
		a: 'Three looks, and they are real redesigns rather than a colour swap: <strong>Glass</strong> (translucent surfaces and soft light), <strong>Paper</strong> (ink on linen, editorial serif, hairline rules) and <strong>Clean</strong> (white on white, condensed caps, one signal blue). Type, colour and an extra-contrast mode sit on their own axes, and every combination is checked against a 210-pair contrast ratchet.',
		aText:
			'Three looks, and they are real redesigns rather than a colour swap: Glass (translucent surfaces and soft light), Paper (ink on linen, editorial serif, hairline rules) and Clean (white on white, condensed caps, one signal blue). Type, colour and an extra-contrast mode sit on their own axes, and every combination is checked against a 210-pair contrast ratchet.',
	},
	{
		q: 'What does it cost?',
		a: 'Three plans: <strong>Solo $49/mo</strong>, <strong>Team $149/mo</strong>, <strong>Business $299/mo</strong> — per workspace, not per action, with every feature on every plan. Annual saves two months. There is a 14-day trial with no card.',
		aText:
			'Three plans: Solo $49/mo, Team $149/mo, Business $299/mo — per workspace, not per action, with every feature on every plan. Annual saves two months. There is a 14-day trial with no card.',
	},
	{
		q: 'Is Earnest for solo operators or bigger teams?',
		a: 'Both, and the daily rhythm is the same either way. Solo is the one-person business doing serious work; Team and Business add seats, AI tokens, storage and client-portal seats as you grow. You are choosing scale, not a feature set.',
		aText:
			'Both, and the daily rhythm is the same either way. Solo is the one-person business doing serious work; Team and Business add seats, AI tokens, storage and client-portal seats as you grow. You are choosing scale, not a feature set.',
	},
	{
		q: 'Do I have to replace all my tools at once?',
		a: 'No. Start where it hurts most — chasing an invoice, running one project, getting a round of artwork signed off — and let Earnest earn the rest.',
		aText:
			'No. Start where it hurts most — chasing an invoice, running one project, getting a round of artwork signed off — and let Earnest earn the rest.',
	},
	{
		q: 'Who can see my data?',
		a: 'Only the members you invite. Your workspace is isolated from every other organization, we never sell your data, and Earnest’s AI reads it only to produce your own results. Your data is never used to train the model. Full detail is in our <a href="/privacy-policy">privacy policy</a>.',
		aText:
			'Only the members you invite. Your workspace is isolated from every other organization, we never sell your data, and Earnest’s AI reads it only to produce your own results. Your data is never used to train the model. Full detail is in our privacy policy.',
	},
];

export interface Plan {
	name: string;
	price: string;
	desc: string;
	featured: boolean;
	features: string[];
	cta: string;
	href: string;
}

/** Mirrors `EARNEST_PLANS` — seats, portal seats, storage, tokens, scans. */
export const plans: Plan[] = [
	{
		name: 'Solo',
		price: '49',
		desc: 'The one-person shop doing serious work.',
		featured: false,
		features: [
			'1 seat',
			'Every feature, including Creative Approvals',
			'100K AI tokens a month',
			'25 GB of files',
			'5 client-portal seats',
			'Monthly, or two months free on annual',
		],
		cta: 'Start free',
		href: REGISTER_URL,
	},
	{
		name: 'Team',
		price: '149',
		desc: 'A team that has outgrown the group chat.',
		featured: true,
		features: [
			'8 seats',
			'Everything in Solo',
			'400K AI tokens a month',
			'100 GB of files',
			'Channels and calls for the whole team',
			'15 client-portal seats',
		],
		cta: 'Start free',
		href: REGISTER_URL,
	},
	{
		name: 'Business',
		price: '299',
		desc: 'A business that has grown into something real.',
		featured: false,
		features: [
			'15 seats',
			'Everything in Team',
			'1M AI tokens a month',
			'500 GB of files',
			'Unlimited client-portal seats',
			'Priority support and onboarding',
		],
		cta: 'Start free',
		href: REGISTER_URL,
	},
];

/**
 * The capacity ladder. Every feature ships on every plan — what you are
 * choosing is scale, so this table only lists what actually scales.
 */
export const compareRows = [
	{ label: 'Team seats', solo: '1', studio: '8', agency: '15' },
	{ label: 'AI tokens / month', solo: '100K', studio: '400K', agency: '1M' },
	{ label: 'File storage', solo: '25 GB', studio: '100 GB', agency: '500 GB' },
	{ label: 'Card scans / month', solo: '25', studio: '150', agency: '500' },
	{ label: 'Client-portal seats', solo: '5', studio: '15', agency: 'Unlimited' },
	{ label: 'White-label branding', solo: '—', studio: '—', agency: 'Add-on' },
];

/** The scrolling band under the hero — each one a claim the page then earns. */
export const marqueeItems = [
	{ label: 'Knows the floor you’re on', icon: 'i-lucide-map-pin' },
	{ label: 'Decide · Do · Know', icon: 'i-lucide-layers' },
	{ label: 'Earnest in the client portal', icon: 'i-lucide-users' },
	{ label: 'Money sorted by certainty', icon: 'i-lucide-trending-up' },
	{ label: 'Approvals in one press', icon: 'i-lucide-send' },
	{ label: 'Three looks, one Earnest', icon: 'i-lucide-swatch-book' },
	{ label: 'Nothing moves without your tap', icon: 'i-lucide-hand' },
	{ label: 'Set up in minutes', icon: 'i-lucide-rocket' },
];

/**
 * The four lenses, as the home actually ships them. `line` is the shape the
 * app's own `useHomeV2ModeLine` writes under the greeting — the strings here
 * are the ones the seeded demo workspace produced on 2026-09-01, which is
 * also what the screenshots show. Everything has no line by design: a lens
 * line that always talks is a label, and a label that repeats the lens name
 * is noise.
 */
export interface Lens {
	key: string;
	label: string;
	icon: string;
	/** HSL triple — mirrors the app's own lens tints in useHomeV2Layout.ts. */
	hue: string | null;
	line: string | null;
	note: string;
	/** Which stat tiles the lens leaves standing, in order — keys of `mockStats`. */
	stats: string[];
	/** Which rail widgets it leaves standing — keys of `mockWidgets`. */
	widgets: string[];
}

export const lenses: Lens[] = [
	{
		key: 'everything',
		label: 'Everything',
		icon: 'i-lucide-layout-grid',
		hue: null,
		line: null,
		note: 'Everything you arranged, in full.',
		stats: ['score', 'unpaid', 'pipeline', 'unread', 'learning'],
		widgets: ['outstanding', 'pipeline', 'content'],
	},
	{
		key: 'money',
		label: 'Money',
		icon: 'i-lucide-banknote',
		// var(--success) in the app.
		hue: '142 72% 46%',
		line: 'Money lens on. $12k is out, $12k of it past 90 days. $286k in play across 12 open deals.',
		note: 'Cash, ageing and pipeline come forward. Everything else steps back.',
		stats: ['unpaid', 'pipeline'],
		widgets: ['outstanding', 'pipeline'],
	},
	{
		key: 'creative',
		label: 'Creative',
		icon: 'i-lucide-palette',
		// var(--tag-4) in the app.
		hue: '194 73% 59%',
		line: 'Creative lens on. 5 pieces out with clients. 4 posts queued.',
		note: 'What is out for approval, and what goes out next.',
		stats: ['unread'],
		widgets: ['approvals', 'content'],
	},
	{
		key: 'projects',
		label: 'Projects',
		icon: 'i-lucide-folder-kanban',
		// var(--tag-3) in the app.
		hue: '188 70% 61%',
		line: 'Projects lens on. 5 decisions waiting. 13 things one tap away.',
		note: 'Today, as the work actually asks for it.',
		stats: ['score', 'unread'],
		widgets: [],
	},
];

/* ────────────────────────────────────────────────────────────────────────
   THE HOME, AS DATA.

   The hero used to hold a PNG of the home. It holds a coded one now
   (`Landing/HomeMock.vue`), so the app on the hero wears whatever look,
   palette, type and mode the visitor has picked — which a capture cannot
   do, and which is the whole claim the Looks section makes.

   ⚠️ Every number below is read off the seeded solo demo workspace the
   2026-09 captures were taken from — `public/screenshots/latest/home-v2*.png`
   are the receipts, and they are still on the page in the Looks section. A
   coded mock is allowed to re-render those numbers; it is NOT allowed to
   invent friendlier ones. If the demo seed moves, these move with it.
   ──────────────────────────────────────────────────────────────────────── */

export interface MockStat {
	label: string;
	value: string;
	/** The quiet half of the tile — "/ 100", "invoices", "12 open". */
	unit: string;
}

export const mockStats: Record<string, MockStat> = {
	score: { label: 'Score', value: '43', unit: '/ 100' },
	unpaid: { label: 'Unpaid', value: '$12k', unit: 'invoices' },
	pipeline: { label: 'Pipeline', value: '$286k', unit: '12 open' },
	unread: { label: 'Unread', value: '0', unit: 'messages' },
	learning: { label: 'Learning', value: '0m', unit: 'this wk' },
};

export interface MockPile {
	key: string;
	label: string;
	sub: string;
	count: number;
	title: string;
	/** The one line under the item's title. */
	meta: string;
	/** What the row offers: a draft to approve, a status to move, or a read. */
	action: 'approve' | 'status' | 'open';
	actionLabel?: string;
}

/**
 * The three piles do not change with the lens — the same three rows stand at
 * the top of all four captures. What a lens changes is what surrounds them.
 */
export const mockPiles: MockPile[] = [
	{
		key: 'decide',
		label: 'Decide',
		sub: 'Earnest drafted these — approve or adjust',
		count: 5,
		title: 'Create 2 tasks on Helios — Website Build',
		meta: 'Create tasks · proposed by Earnest',
		action: 'approve',
		actionLabel: 'Approve',
	},
	{
		key: 'do',
		label: 'Do',
		sub: 'One tap each',
		count: 13,
		title: 'Project Overdue: Helios West Hotel Launch',
		meta: '30 days past deadline for Earnest Demo — Solo',
		action: 'status',
		actionLabel: 'In Progress',
	},
	{
		key: 'know',
		label: 'Know',
		sub: 'Nothing required',
		count: 4,
		title: '$12,000 in Outstanding Invoices',
		meta: 'Consider sending payment reminders to improve cash flow',
		action: 'open',
	},
];

export type MockWidget =
	| { kind: 'bars'; title: string; value: string; rows: { label: string; pct: number; tone?: 'danger' }[] }
	| { kind: 'chart'; title: string; value: string; bars: number[] }
	| { kind: 'facts'; title: string; value: string; rows: { label: string; value: string }[] };

export const mockWidgets: Record<string, MockWidget> = {
	outstanding: {
		kind: 'bars',
		title: 'Outstanding',
		value: '$12k',
		rows: [
			{ label: 'Current', pct: 0 },
			{ label: '1–30 days', pct: 0 },
			{ label: '31–90 days', pct: 0 },
			// All of it. That is the point of the widget, and the reason the
			// Money lens says "$12k of it past 90 days" out loud.
			{ label: '90+ days', pct: 100, tone: 'danger' },
		],
	},
	pipeline: {
		kind: 'bars',
		title: 'Pipeline',
		value: '$230k',
		rows: [
			{ label: 'New', pct: 0 },
			{ label: 'Contacted', pct: 26 },
			{ label: 'Qualified', pct: 100 },
			{ label: 'Proposal sent', pct: 5 },
			{ label: 'Negotiating', pct: 0 },
		],
	},
	content: {
		kind: 'chart',
		title: 'Content',
		value: '11 published · 8 wk',
		bars: [42, 62, 92, 44, 46, 48, 44, 30],
	},
	approvals: {
		kind: 'facts',
		title: 'Approvals',
		value: '8 wk',
		rows: [
			{ label: 'Out with clients', value: '5' },
			{ label: 'Queued to go out', value: '4' },
		],
	},
};

/**
 * The three Looks, and the capture that proves each one.
 *
 * ⚠️ The blurbs used to live here too, and now live once, in
 * `useLandingAppearance.ts` beside the option they describe — the appearance
 * panel needs a hint per option on all four axes, and a second copy of three
 * of them here was a second copy that could disagree. What is left is what
 * only this list knows: which screenshot shows which look.
 */
export const looks = [
	{ key: 'glass', label: 'Glass', shot: 'home-v2' },
	{ key: 'paper', label: 'Paper', shot: 'home-v2-paper' },
	{ key: 'clean', label: 'Clean', shot: 'home-v2-clean' },
];

export interface MoreCard {
	icon: string;
	title: string;
	desc: string;
	/**
	 * Renders a "Coming soon" tag and dims the card.
	 *
	 * ⚠️ Reserved for exactly what the app ITSELF advertises as coming soon.
	 * The site must never be the first place a promise is made. Note this can
	 * mean "built but not purchasable" (Personal Brand) as much as "not built
	 * yet" (publishing) — from a buyer's side both are "I cannot have this
	 * today", which is the only distinction the tag needs to carry.
	 */
	soon?: boolean;
}

/**
 * The breadth carousel — everything the long-form argument does not have room
 * to make a section about. Everything without `soon` is on every plan today.
 */
export const moreCards: MoreCard[] = [
	{
		icon: 'i-lucide-receipt',
		title: 'Invoicing & payments',
		desc: 'Invoices, deposits and Stripe payments, reconciled as they land. Retainers roll into invoices on their own schedule.',
	},
	{
		icon: 'i-lucide-file-signature',
		title: 'Proposals & contracts',
		desc: 'Draft, send and e-sign. Every proposal is tracked from opened to won — or flagged when it has gone quiet.',
	},
	{
		icon: 'i-lucide-target',
		title: 'Pursuits',
		desc: 'Leads and pipeline in one lens, with the deal timeline that shows how a pursuit actually got where it is.',
	},
	{
		icon: 'i-lucide-sparkles',
		title: 'Pitch pages',
		desc: 'A pitch as its own page, with share-link analytics behind a gate so you know who read it and how far they got.',
	},
	{
		icon: 'i-lucide-folder',
		title: 'Files',
		desc: 'A floor of your organization rather than a separate drive — 25, 100 or 500 GB depending on the plan.',
	},
	{
		icon: 'i-lucide-calendar-clock',
		title: 'Scheduler & booking',
		desc: 'Share your availability on a public page that carries your card. Booked meetings land on the calendar and become tasks.',
	},
	{
		icon: 'i-lucide-square-kanban',
		title: 'Tickets, tasks & projects',
		desc: 'Delivery end to end, on a timeline that keeps itself honest as dates move.',
	},
	{
		icon: 'i-lucide-scan-line',
		title: 'CardDesk',
		desc: 'Snap a business card and the contact lands in your CRM — enriched, deduped, and yours.',
	},
	{
		icon: 'i-lucide-id-card',
		title: 'Personal Brand',
		soon: true,
		desc: 'Your own positioning, voice and proof points — written once, applied to your business card and booking page in one press, and used when the Content Studio drafts in your name. Built and in the app; not on sale yet, and not charged for.',
	},
	{
		icon: 'i-lucide-bell',
		title: 'Daily digest & push',
		desc: 'One honest summary a day, and a web push when something genuinely cannot wait for it.',
	},
	{
		icon: 'i-lucide-search',
		title: 'Spotlight search',
		desc: 'One keystroke over every record you have — clients, projects, invoices, files, messages.',
	},
];

/* ═══════════════════════════════════════════════════════════════════════════
   Round 2 (2026-09) — the combined home. Everything below is read by the
   hero's Focus demo, the app switcher, the brand and AI Actions sections.
   Every number is from the seeded demo workspace the September captures were
   taken from, so it agrees with `mockStats` and the screenshots.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface FocusQuestion {
	/** The chip label and the "you" bubble. */
	q: string;
	/** What Earnest answers, typed out. */
	a: string;
	/** The "Read" strip — what it consulted before it spoke. */
	read: string[];
	/** Two follow-ups; the first is primary. Both go to the live demo. */
	actions: [string, string];
}

/** The four questions the hero's Focus demo can answer. */
export const focusQuestions: FocusQuestion[] = [
	{
		q: 'What needs my attention today?',
		a: '22 things. Five need a decision, and two of those are urgent: the Helios West launch is 30 days past its deadline, and Meridian Law’s invoice is 92 days out. I’ve drafted a status note for Helios and a gentle nudge for Amara. The other 13 are one tap each.',
		read: ['9 projects', '118 tasks', '12 invoices', '6 meetings'],
		actions: ['Approve both drafts', 'Show the 13'],
	},
	{
		q: 'Who has gone quiet?',
		a: 'Four clients, all 140+ days since a real touch: David Park at Helios Studio (242d), Priya Shah at Pinecrest (174d), Amara Okafor and Tom Bennett at Meridian Law (159d, 146d). Meridian also holds the overdue invoice, so I’d start there. Want a re-approach for each, in your voice?',
		read: ['41 contacts', 'last touch', 'pipeline', 'brand voice'],
		actions: ['Draft all four', 'Just Meridian'],
	},
	{
		q: 'Draft the Helios proposal',
		a: 'Done. Three phases, each one something Helios can see before paying for the next, priced from your Website Build offering at $12,000 and the brand identity block at $6,500. It reads warm and direct, first names, no jargon, the way your brand direction says. It is a draft in Money → Documents, not sent.',
		read: ['brand direction', '2 service offerings', 'last 3 proposals', 'client history'],
		actions: ['Open the draft', 'Change the phases'],
	},
	{
		q: 'Where is the money?',
		a: '$12,000 is out across 6 invoices, and $9,400 of it is past 90 days, all Meridian Law. Pipeline is $286k across 12 open pursuits, but only $60k is past “proposal sent”. Billed this month: $0, which is the real thing to fix. Two milestones are ready to invoice today.',
		read: ['12 invoices', 'AR aging', '12 pursuits', 'cash flow 2026'],
		actions: ['Draft both invoices', 'Draft the reminders'],
	},
];

export interface AppTab {
	key: string;
	/** Tab label. */
	label: string;
	/** Lucide icon, the same one the app's rail uses. */
	icon: string;
	title: string;
	desc: string;
	/**
	 * Screenshot slug under /screenshots/latest/, and an optional per-look
	 * override. Only September 2026 captures belong here — the July files
	 * still in `latest/` show the old shell.
	 */
	shot: string;
	shotByLook?: Record<string, string>;
	/** What Earnest offers from inside this app, unprompted. Drafted, not sent. */
	chip: string;
}

/**
 * Home, the rail's first entry. It gets the same Earnest column as the six
 * apps, but no `shot`: its view is the coded home (`HomeMock.vue`), and the
 * lens picker lives in the column rather than as a second row of tabs under
 * the rail. The chip is the demo's first Decide item — see `mockPiles`.
 */
export const homeTab = {
	title: 'Your day, already sorted',
	desc: 'Every app’s loose ends in three piles: decide, do, know. Earnest’s drafts sit on top, waiting for your tap.',
	chip: '5 need a decision. The first is drafted: 2 tasks on Helios — Website Build. Approve?',
};

/** The six-app switcher under the hero. */
export const appTabs: AppTab[] = [
	{
		key: 'people',
		label: 'People',
		icon: 'i-lucide-users',
		title: 'Everyone you work with',
		desc: 'Clients, contacts and pursuits in one relationship graph, with the whole history attached and a cold-contact alert before the silence costs you.',
		shot: 'pursuits-lens',
		chip: '4 clients are 140+ days quiet. Meridian Law also holds the overdue invoice. Draft a re-approach?',
	},
	{
		key: 'work',
		label: 'Work',
		icon: 'i-lucide-square-kanban',
		title: 'The work itself',
		desc: 'Projects, tasks, tickets, Creative Approvals, meetings with AI recap, and time. Move a date and every dependency moves with it.',
		shot: 'shell-dock',
		chip: 'Helios West is 30 days past deadline and the hero image is still in Round 2. Nudge Dana?',
	},
	{
		key: 'money',
		label: 'Money',
		icon: 'i-lucide-trending-up',
		title: 'The money side',
		desc: 'Money sorted by certainty, banked to cold. Cash flow, AR aging, invoices, payments, expenses, proposals and contracts.',
		shot: 'revenue-certainty',
		shotByLook: { paper: 'money-paper' },
		chip: '$9,400 of the $12k out is past 90 days. Two milestones are ready to invoice today. Draft both?',
	},
	{
		key: 'marketing',
		label: 'Marketing',
		icon: 'i-lucide-megaphone',
		title: 'Marketing, drafted with you',
		desc: 'A marketing pulse, campaigns, email, and a Content Studio where posts get written in the client’s voice, planned on the river, and approved.',
		shot: 'studio-river',
		chip: 'Pinecrest has nothing scheduled after Thursday. Three post ideas from this month’s wins, in their voice?',
	},
	{
		key: 'schedule',
		label: 'Schedule',
		icon: 'i-lucide-calendar',
		title: 'Schedules that follow the work',
		desc: 'A booking page with your card on it, a calendar, instant video, follow-ups, and a recap after every meeting that becomes tasks on the right project.',
		shot: 'booking-page',
		chip: 'Two follow-ups are due today and you have a gap at 2. Book the Meridian call there?',
	},
	{
		key: 'organization',
		label: 'Organization',
		icon: 'i-lucide-building-2',
		title: 'Run the organization',
		desc: 'Brand direction, members, teams, files, document themes and white-label, reached from your avatar. Set the brand here and every app inherits it.',
		shot: 'files-floor',
		chip: 'Your brand direction is set, but Helios has no client voice yet. Draft one from their last three approvals?',
	},
];

/** The strip under the switcher — what a studio stops paying for. */
export const replaces = [
	'a CRM',
	'a project tool',
	'invoicing',
	'proposals',
	'a scheduler',
	'a social planner',
	'a client portal',
	'a ChatGPT tab',
];

/** The organization profile the brand section shows, as a studio would fill it. */
export const brandProfile = [
	{ k: 'Direction', v: 'Quiet confidence. Fewer, better clients. Proof over promises.' },
	{ k: 'Audience', v: 'Boutique hospitality and healthcare, Pacific Northwest' },
	{ k: 'Voice', v: 'Warm, direct, no jargon. First names.' },
];

/** Three drafts written from that profile. */
export const brandOutputs = [
	{ kind: 'Proposal', text: 'Helios, you asked for a site that books rooms without a phone call. Here is the plan, in three phases.' },
	{ kind: 'Post', text: 'Three things we changed on the Pinecrest site this month, and what each did to bookings.' },
	{ kind: 'Reminder', text: 'Hi Priya, invoice 0042 is 30 days out. Just making sure it didn’t get lost.' },
];

export interface ActionRow {
	app: string;
	what: string;
	delta: string;
	/** Held for the visitor’s tap rather than proposed as a change. */
	held?: boolean;
}

/** One sentence, and everything it touches. */
export const actionSaid = 'Push Helios West Hotel Launch two weeks. Tell Dana.';
export const actionRows: ActionRow[] = [
	{ app: 'Work', what: 'Move 7 tasks, dependency order kept', delta: '+14 d' },
	{ app: 'Work', what: 'Move 4 events, skip the Oct 12 holiday', delta: '+14 d' },
	{ app: 'Money', what: 'Milestone invoice 2 of 3, new due date', delta: 'Nov 3' },
	{ app: 'Mktg', what: 'Launch-week posts, re-planned', delta: '+14 d' },
	{ app: 'People', what: 'Email to Dana, drafted in your voice', delta: 'held', held: true },
];
