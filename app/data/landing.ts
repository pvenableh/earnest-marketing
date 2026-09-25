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
 * Everything about EARNEST ITSELF — what it can do, say and refuse — lives in
 * `~/data/earnest.ts`, with the app-repo file each claim was read from. The
 * FAQ answers below that touch Earnest are written from that file, not from
 * memory; when it changes, they change.
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
 *   · The Boardroom, Director, Focus and the trust dial were RETIRED in the
 *     2026-09-22 rethink (app repo `docs/earnest-rethink-direction.md`, "What
 *     goes"). Nothing here may mention them as a feature.
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
		q: 'Can I actually talk to it?',
		a: 'Yes. There is a mic on the composer on every screen: hold it on a phone, click it on a computer, and your words land in the box as you say them. Sending stays a separate act unless you switch on <strong>“Send when I stop talking”</strong>. Switch on <strong>“Read replies aloud”</strong> and it speaks each reply once it is finished. Switch on <strong>Hands-free</strong> and anything that starts with “Earnest, …” is sent without touching anything — only what starts with the name; everything else is dropped on your device, and it is off again after a reload. It uses your device’s own recogniser and voice (Chrome, Safari including iPhone, Edge; the button is absent in Firefox).',
		aText:
			'Yes. There is a mic on the composer on every screen: hold it on a phone, click it on a computer, and your words land in the box as you say them. Sending stays a separate act unless you switch on “Send when I stop talking”. Switch on “Read replies aloud” and it speaks each reply once it is finished. Switch on Hands-free and anything that starts with “Earnest, …” is sent without touching anything — only what starts with the name; everything else is dropped on your device, and it is off again after a reload. It uses your device’s own recogniser and voice (Chrome, Safari including iPhone, Edge; the button is absent in Firefox).',
	},
	{
		q: 'What do I actually see when I open it?',
		a: 'Home speaks first. A greeting with one true clause from your own numbers, then an opening paragraph of three sentences at most — <em>“You are owed $46,000 across 5 invoices, the oldest 104 days overdue. Mark paid · Draft a reminder.”</em> — each ending in the verb it needs. Under that, the composer with <strong>Do · Decide · Know</strong> suggestions, then <strong>Waiting for you</strong> (the things Earnest drafted and is waiting on you for) and <strong>Recent</strong> (what it did, with Undo). On a wide screen Earnest is a column beside every page; on a phone it is the bar at the foot of every page.',
		aText:
			'Home speaks first. A greeting with one true clause from your own numbers, then an opening paragraph of three sentences at most — “You are owed $46,000 across 5 invoices, the oldest 104 days overdue. Mark paid · Draft a reminder.” — each ending in the verb it needs. Under that, the composer with Do · Decide · Know suggestions, then Waiting for you (the things Earnest drafted and is waiting on you for) and Recent (what it did, with Undo). On a wide screen Earnest is a column beside every page; on a phone it is the bar at the foot of every page.',
	},
	{
		q: 'How is this different from ChatGPT or a generic AI assistant?',
		a: 'Earnest runs on a <strong>real large language model</strong> — Anthropic’s Claude, on no-training terms — but it does not start from a blank prompt. It starts from your organization: your clients, your work, your money, your brand voice, and the page you are on. It reads <strong>live rows</strong> before it answers and shows a receipt for what it read. And it can <strong>do</strong> things — draft the email, add the tasks, reschedule the project, sketch the prototype — as a card you approve, edit or skip.',
		aText:
			'Earnest runs on a real large language model — Anthropic’s Claude, on no-training terms — but it does not start from a blank prompt. It starts from your organization: your clients, your work, your money, your brand voice, and the page you are on. It reads live rows before it answers and shows a receipt for what it read. And it can do things — draft the email, add the tasks, reschedule the project, sketch the prototype — as a card you approve, edit or skip.',
	},
	{
		q: 'Does it learn how I work?',
		a: 'If you let it. A short profile — how you write, what you approve untouched, what you come back to — is distilled nightly from your own conversations and decisions and used when it writes for you. It is <strong>yours to read</strong>: under Account → Earnest you can see it, edit a line, rebuild it now, or turn it off and forget it. It is never used to train the model.',
		aText:
			'If you let it. A short profile — how you write, what you approve untouched, what you come back to — is distilled nightly from your own conversations and decisions and used when it writes for you. It is yours to read: under Account → Earnest you can see it, edit a line, rebuild it now, or turn it off and forget it. It is never used to train the model.',
	},
	{
		q: 'What happens when Earnest doesn’t have enough context?',
		a: 'It stops and asks. If it is thin on your brand, a client’s voice or the record you mean, it tells you what is missing rather than filling the gap with something plausible. Its charter says it out loud: <em>if you do not have the data, say so plainly instead of guessing.</em>',
		aText:
			'It stops and asks. If it is thin on your brand, a client’s voice or the record you mean, it tells you what is missing rather than filling the gap with something plausible. Its charter says it out loud: if you do not have the data, say so plainly instead of guessing.',
	},
	{
		q: 'Will Earnest send emails or move money on its own?',
		a: 'No. There is one switch — <strong>“Earnest does small reversible things without asking”</strong>. On, it opens tickets, adds tasks and events, edits fields and files invoices on its own, each logged and each undoable. The floor never moves: <strong>sending an email, issuing an invoice, booking, moving or cancelling a meeting, and changing where a client’s invoices go always wait for your tap</strong> — not a setting, and never on a spoken “yes”.',
		aText:
			'No. There is one switch — “Earnest does small reversible things without asking”. On, it opens tickets, adds tasks and events, edits fields and files invoices on its own, each logged and each undoable. The floor never moves: sending an email, issuing an invoice, booking, moving or cancelling a meeting, and changing where a client’s invoices go always wait for your tap — not a setting, and never on a spoken “yes”.',
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
		a: 'Three plans: <strong>Solo $49/mo</strong>, <strong>Studio $149/mo</strong>, <strong>Agency $299/mo</strong> — per workspace, not per action, with every feature on every plan. Annual saves two months. There is a 14-day trial with no card.',
		aText:
			'Three plans: Solo $49/mo, Studio $149/mo, Agency $299/mo — per workspace, not per action, with every feature on every plan. Annual saves two months. There is a 14-day trial with no card.',
	},
	{
		q: 'Is Earnest for solo operators or bigger studios?',
		a: 'Both, and the daily rhythm is the same either way. Solo is the one-person shop doing serious work; Studio and Agency add seats and team channels as you grow. You are choosing scale, not a feature set.',
		aText:
			'Both, and the daily rhythm is the same either way. Solo is the one-person shop doing serious work; Studio and Agency add seats and team channels as you grow. You are choosing scale, not a feature set.',
	},
	{
		q: 'Do I have to replace all my tools at once?',
		a: 'No. Start where it hurts most — chasing an invoice, running one project, getting a round of artwork signed off — and let Earnest earn the rest.',
		aText:
			'No. Start where it hurts most — chasing an invoice, running one project, getting a round of artwork signed off — and let Earnest earn the rest.',
	},
	{
		q: 'Who can see my data?',
		a: 'Only the members you invite. Your workspace is isolated from every other organization, we never sell your data, and Earnest’s AI reads it only to produce your own results, under no-training terms. What you say to the mic is handled by your own device’s recogniser; with Hands-free on, anything that does not start with “Earnest” is dropped on the device. Full detail is in our <a href="/privacy-policy">privacy policy</a>.',
		aText:
			'Only the members you invite. Your workspace is isolated from every other organization, we never sell your data, and Earnest’s AI reads it only to produce your own results, under no-training terms. What you say to the mic is handled by your own device’s recogniser; with Hands-free on, anything that does not start with “Earnest” is dropped on the device. Full detail is in our privacy policy.',
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
			'Team channels',
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
	{ label: '“Earnest, who owes me money?”', icon: 'i-lucide-mic' },
	{ label: 'Receipts before answers', icon: 'i-lucide-receipt-text' },
	{ label: 'It knows what you’re looking at', icon: 'i-lucide-scan-eye' },
	{ label: 'Approve · Edit · Skip · Undo', icon: 'i-lucide-list-checks' },
	{ label: 'Nothing moves without your tap', icon: 'i-lucide-hand' },
	{ label: 'Right, not loud', icon: 'i-lucide-badge-check' },
	{ label: 'Three looks, one Earnest', icon: 'i-lucide-swatch-book' },
];

/**
 * The three Looks, and the capture that proves each one.
 *
 * ⚠️ The captures are from 2026-09-01 and show the Home the app had BEFORE
 * the 2026-09-22 rethink (lenses, tiles, piles). The LOOK in each is still
 * exactly what ships — that is the claim this section makes — but the Home
 * under it is not, which the section says in its caption. Re-capture with the
 * app repo's `scripts/capture-demo-screenshots.ts` and delete `capturedNote`.
 */
export const looks = [
	{ key: 'glass', label: 'Glass', shot: 'home-v2' },
	{ key: 'paper', label: 'Paper', shot: 'home-v2-paper' },
	{ key: 'clean', label: 'Clean', shot: 'home-v2-clean' },
];
export const looksCapturedNote =
	'Captured 2026-09-01. The look is exactly what ships; the Home in the frame predates the September simplification drawn in the section above.';

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
		icon: 'i-lucide-layout-template',
		title: 'A prototype from a chat',
		desc: '“Sketch a landing page for the retainer” writes one self-contained page on the proposal, at a link you can publish, password, expire or revoke — and revise in the same thread.',
	},
	{
		icon: 'i-lucide-file-search',
		title: 'Read the RFP, draft the proposal',
		desc: 'Drop a PDF in the box. Earnest reads it directly, pulls the agreement out of it, and drafts the proposal into your organization from your own service templates and blocks.',
	},
	{
		icon: 'i-lucide-video',
		title: 'Earnest beside a live call',
		desc: 'On a video meeting it slides in beside the call rather than over it — summarise what was covered, draft the action items, capture a follow-up — scoped to that meeting.',
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
		desc: 'Leads and pipeline in one lens, with the deal timeline that shows how a pursuit actually got where it is — and a re-approach drafted when one goes cold.',
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
		desc: 'Delivery end to end, on a timeline that keeps itself honest as dates move — and that Earnest can reschedule in one card.',
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
		desc: 'Your own positioning, voice and proof points — written once, applied to your business card and booking page in one press, and used when the Studio drafts in your name. Built and in the app; not on sale yet, and not charged for.',
	},
	{
		icon: 'i-lucide-bell',
		title: 'Daily digest & push',
		desc: 'One honest summary a day, and a web push when something genuinely cannot wait for it.',
	},
	{
		icon: 'i-lucide-search',
		title: 'Spotlight search',
		desc: 'One keystroke over every record you have — clients, projects, invoices, files, messages. No match? It falls through to Earnest.',
	},
];
