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
		a: 'One home. A greeting with an honest read of the day, four numbers at a glance, and then three piles: <strong>Decide</strong> (things Earnest drafted and is waiting on you for), <strong>Do</strong> (one tap each) and <strong>Know</strong> (nothing required, but worth knowing). Four lenses re-rank the same home around money, creative work or projects.',
		aText:
			'One home. A greeting with an honest read of the day, four numbers at a glance, and then three piles: Decide (things Earnest drafted and is waiting on you for), Do (one tap each) and Know (nothing required, but worth knowing). Four lenses re-rank the same home around money, creative work or projects.',
	},
	{
		q: 'How is this different from ChatGPT or a generic AI assistant?',
		a: 'Earnest runs on a <strong>real large language model</strong> — Anthropic’s Claude, on no-training terms — but it does not start from a blank prompt. It starts from your organization: your clients, your work, your money, your brand voice. One door, and it already knows where you are standing when you open it.',
		aText:
			'Earnest runs on a real large language model — Anthropic’s Claude, on no-training terms — but it does not start from a blank prompt. It starts from your organization: your clients, your work, your money, your brand voice. One door, and it already knows where you are standing when you open it.',
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
		q: 'Can I change how it looks?',
		a: 'Three looks, and they are real redesigns rather than a colour swap: <strong>Glass</strong> (translucent surfaces and soft light), <strong>Paper</strong> (ink on linen, editorial serif, hairline rules) and <strong>Clean</strong> (white on white, condensed caps, one signal blue). Type, colour and an extra-contrast mode sit on their own axes, and every combination is checked against a 210-pair contrast ratchet.',
		aText:
			'Three looks, and they are real redesigns rather than a colour swap: Glass (translucent surfaces and soft light), Paper (ink on linen, editorial serif, hairline rules) and Clean (white on white, condensed caps, one signal blue). Type, colour and an extra-contrast mode sit on their own axes, and every combination is checked against a 210-pair contrast ratchet.',
	},
	{
		q: 'What does it cost?',
		a: 'Three plans: <strong>Solo $49/mo</strong>, <strong>Studio $149/mo</strong>, <strong>Agency $299/mo</strong> — per workspace, not per action, with every feature on every plan. Annual saves two months. There is a 14-day trial with no card.',
		aText:
			'Three plans: Solo $49/mo, Studio $149/mo, Agency $299/mo — per workspace, not per action, with every feature on every plan. Annual saves two months. There is a 14-day trial with no card.',
	},
	{
		q: 'Is Earnest for solo operators or bigger studios?',
		a: 'Both, and the daily rhythm is the same either way. Solo is the one-person shop doing serious work; Studio and Agency add seats, team channels and the Boardroom as you grow. You are choosing scale, not a feature set.',
		aText:
			'Both, and the daily rhythm is the same either way. Solo is the one-person shop doing serious work; Studio and Agency add seats, team channels and the Boardroom as you grow. You are choosing scale, not a feature set.',
	},
	{
		q: 'Do I have to replace all my tools at once?',
		a: 'No. Start where it hurts most — chasing an invoice, running one project, getting a round of artwork signed off — and let Earnest earn the rest.',
		aText:
			'No. Start where it hurts most — chasing an invoice, running one project, getting a round of artwork signed off — and let Earnest earn the rest.',
	},
	{
		q: 'Who can see my data?',
		a: 'Only the members you invite. Your workspace is isolated from every other organization, we never sell your data, and Earnest’s AI reads it only to produce your own results, under no-training terms. Full detail is in our <a href="/privacy-policy">privacy policy</a>.',
		aText:
			'Only the members you invite. Your workspace is isolated from every other organization, we never sell your data, and Earnest’s AI reads it only to produce your own results, under no-training terms. Full detail is in our privacy policy.',
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
		name: 'Studio',
		price: '149',
		desc: 'A team that has outgrown the group chat.',
		featured: true,
		features: [
			'8 seats',
			'Everything in Solo',
			'400K AI tokens a month',
			'100 GB of files',
			'Team channels and the Boardroom',
			'15 client-portal seats',
		],
		cta: 'Start free',
		href: REGISTER_URL,
	},
	{
		name: 'Agency',
		price: '299',
		desc: 'A studio that has grown into something real.',
		featured: false,
		features: [
			'15 seats',
			'Everything in Studio',
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
	{ label: 'Decide · Do · Know', icon: 'i-lucide-layers' },
	{ label: 'One door to Earnest', icon: 'i-lucide-door-open' },
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
	shot: string;
	/**
	 * The same lens captured in the other two Looks, where such a capture
	 * exists. Only Everything has all three — it is the lens the page opens
	 * on, so it is the one a visitor sees after switching the page's look,
	 * and a Clean page showing a Glass app is the mismatch worth spending
	 * two extra captures to avoid. The other lenses fall back to `shot`.
	 */
	shotByLook?: Record<string, string>;
	line: string | null;
	note: string;
}

export const lenses: Lens[] = [
	{
		key: 'everything',
		label: 'Everything',
		icon: 'i-lucide-layout-grid',
		hue: null,
		shot: 'home-v2',
		shotByLook: { glass: 'home-v2', paper: 'home-v2-paper', clean: 'home-v2-clean' },
		line: null,
		note: 'The home you arranged, in full.',
	},
	{
		key: 'money',
		label: 'Money',
		icon: 'i-lucide-banknote',
		// var(--success) in the app.
		hue: '142 72% 46%',
		shot: 'home-v2-money',
		line: 'Money lens on. $12k is out, $12k of it past 90 days. $286k in play across 12 open deals.',
		note: 'Cash, ageing and pipeline come forward. Everything else steps back.',
	},
	{
		key: 'creative',
		label: 'Creative',
		icon: 'i-lucide-palette',
		// var(--tag-4) in the app.
		hue: '194 73% 59%',
		shot: 'home-v2-creative',
		line: 'Creative lens on. 5 pieces out with clients. 4 posts queued.',
		note: 'What is out for approval, and what goes out next.',
	},
	{
		key: 'projects',
		label: 'Projects',
		icon: 'i-lucide-folder-kanban',
		// var(--tag-3) in the app.
		hue: '188 70% 61%',
		shot: 'home-v2-projects',
		line: 'Projects lens on. 5 decisions waiting. 13 things one tap away.',
		note: 'Today, as the work actually asks for it.',
	},
];

/** The three Looks, for the switcher in the Looks section. */
export const looks = [
	{
		key: 'glass',
		label: 'Glass',
		shot: 'home-v2',
		blurb: 'Translucent surfaces, soft light, rounded chrome. The default.',
	},
	{
		key: 'paper',
		label: 'Paper',
		shot: 'home-v2-paper',
		blurb: 'Ink on linen — an editorial serif, hairline rules, tracked caps.',
	},
	{
		key: 'clean',
		label: 'Clean',
		shot: 'home-v2-clean',
		blurb: 'White on white, layered light, condensed caps and one signal blue.',
	},
];

/**
 * The breadth carousel — everything the long-form argument does not have room
 * to make a section about. All of it is on every plan.
 */
export const moreCards = [
	{
		icon: 'i-lucide-presentation',
		title: 'The Boardroom',
		desc: 'Convene the whole org on one question and work the decision together, with Earnest drafting a plan against real numbers.',
	},
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
