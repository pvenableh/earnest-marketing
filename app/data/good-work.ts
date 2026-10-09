/**
 * The homepage, "Do good work." (October 2026), as data.
 *
 * Ported from `mockups/2026-10-good-work/good-work.html`; the concept, the
 * brief and the claim map are in that folder's README. The page sells the
 * idea (doing good work) and lets the product appear only as proof: under
 * each beat, one column — Earnest as it ships since the rethink (the app's
 * `Earnest/Column.vue`): the thread above, Do · Decide · Know chips, the
 * composer at the foot with the scope chip inside it.
 *
 * ⚠️ THE CLAIM MAP. Every ask below names a tool that ships
 * (`server/utils/llm/tools.ts` in the app repo), every held card is on the
 * hold list (`shared/ai-autonomy.ts`), and every number is the seeded demo
 * workspace's — the same figures `landing.ts` carries. Two stay illustrative,
 * as before: the $350 check and the $6,200 milestone. If a beat cannot point
 * at one of those, it does not belong on the page.
 *
 * ⚠️ VOICE. Don't sell Earnest in Earnest's own nouns: no home, door, lens,
 * pile, floor or rail as a promise. "Do · Decide · Know" appears only inside
 * a column, as the UI shows it.
 */
import type { Faq } from './landing';

const APP_ORIGIN = 'https://app.earnest.guru';

/* ── Photography ──────────────────────────────────────────────────────────
   Licensed copies, in `public/photos/` (1800px, and a 1000px one for phones)
   and `public/video/` (12 s, 720p, no audio, ~0.5–0.8 MB). Downloaded
   2026-10-09 with Peter's go-ahead; each `credit` names the source page and
   its licence. Unsplash License and the Mixkit Stock Video Free License both
   allow commercial use on a website without attribution; the credit is kept
   here so a swap knows what it is replacing. A slot with `src: null` renders
   the gradient made for that place (good-work.css · slots), so a real shoot
   replaces each one by its `src` and nothing else. The README's shot list
   says what each place is for.

   ⚠️ Mixkit has TWO licences. The mockup's hero sunrise (26532) is under the
   Restricted Licence — personal use only — so it is not here. Peter moved
   the hero off skies altogether (sun and cloud read "heavenly", not
   motivating): it is a working office now, sped up. Check the item page
   before adding any clip. */
export interface PhotoSlot {
	/** A file under `public/`, e.g. `/photos/hero.jpg`. Null renders the fallback. */
	src: string | null;
	/** The same photograph at 1000px, for phones. */
	small?: string;
	alt: string;
	/** An ambient loop over the still, e.g. `/video/hero.mp4`. Played only in view, never under reduced motion or Save-Data. */
	video?: string | null;
	credit?: string;
}

export const photos: Record<'hero' | 'client' | 'field' | 'keep' | 'close', PhotoSlot> = {
	hero: {
		src: '/photos/hero.jpg',
		small: '/photos/hero-1000.jpg',
		video: '/video/hero.mp4',
		alt: 'A crowd walking a city street in the morning, out of focus',
		credit:
			'Still: Diego Apolo, unsplash.com/photos/DpKt0-Nvi6I (Unsplash License). Loop: Mixkit 914 “Open office space” (Mixkit Stock Video Free License), played at 1.5× speed.',
	},
	client: {
		src: '/photos/client.jpg',
		small: '/photos/client-1000.jpg',
		alt: 'A small team and a client in a sunlit office, mid-conversation',
		credit: 'Sable Flow, unsplash.com/photos/KHpjeuaWOec (Unsplash License).',
	},
	field: {
		src: '/photos/field.jpg',
		small: '/photos/field-1000.jpg',
		video: '/video/field.mp4',
		alt: 'A white curtain in daylight',
		credit:
			'Still: J Shim, unsplash.com/photos/UHhlWF-hVE4 (Unsplash License). Loop: Mixkit 1709 “Sunlight crossing the branches of trees” (Mixkit Stock Video Free License).',
	},
	keep: {
		src: '/photos/keep.jpg',
		small: '/photos/keep-1000.jpg',
		alt: 'Low gold light across two cups on a dark table',
		// The mockup's photograph here could not be traced to a source page, so
		// its licence could not be checked; this one replaced it.
		credit: 'David Grandmougin, unsplash.com/photos/qPQKd1tjdtE (Unsplash License).',
	},
	close: {
		src: '/photos/close.jpg',
		small: '/photos/close-1000.jpg',
		alt: 'A potter shaping clay on a wheel in a workshop',
		credit: 'Vitaly Gariev, unsplash.com/photos/xUlNEFpNIaY (Unsplash License).',
	},
};

/* ── The app, scrubbed by scroll ──────────────────────────────────────────
   The mockup's Apple-style sequence: 100 JPEG frames drawn to a canvas as
   the visitor scrolls. ⚠️ NOT SHIPPED (2026-10-09). The frames were recorded
   from the public demo, and they disagree with the page — the demo's home
   read "3 waiting on a yes" and "$7,200 owed" where every other number here
   is the seeded workspace's, most invoice rows showed $0.00, and the ask it
   ends on ("Why is invoice 0007 overdue?") is one the demo answers with a
   mock rather than Claude. Re-record once the demo is fixed, put the frames
   in `public/app-seq/`, and set this. `GoodWork/Scrub.vue` is ready for it. */
export const appSequence: { frames: string; count: number; pad: number } | null = null;

/** The creed. Each line's own "Good work" is invisible in the sticky stage, so the predicate wraps under the held subject. */
export const creed: { lead?: string; rest: string; em: string; after?: string }[] = [
	{ rest: 'is ', em: 'finished', after: '.' },
	{ rest: 'gets ', em: 'paid', after: '.' },
	{ rest: 'sounds like ', em: 'you', after: '.' },
	{ rest: 'knows what’s overdue ', em: 'before the client does', after: '.' },
	{ rest: 'is honest about ', em: 'where it stands', after: '.' },
	{ rest: 'doesn’t need a bigger team.', em: '' },
];
export const creedTurn = 'It needs a better Tuesday.';

/* ── The column ───────────────────────────────────────────────────────── */
export type Lane = 'do' | 'decide' | 'know';

export interface ColumnCard {
	/** The card's kind, as the app labels it: "Book meeting", "Create tasks". */
	kind: string;
	/** Right of the kind: who proposed it, or where it lands. */
	meta?: string;
	/** On the hold list — renders "held · your tap" in the warning ink. */
	held?: boolean;
	title: string;
	rows?: [string, string][];
	/** The first is the primary action. */
	acts: string[];
	note?: string;
}

export interface Column {
	label: string;
	you?: string;
	lede: string;
	/** Number-first facts, at most four — the app's reply shape. */
	facts?: { v: string; t: string; bad?: boolean }[];
	/** The reasoned answer to a "why"; may hold <b>. */
	prose?: string;
	/** Said when the data cannot support a judgement. */
	hedge?: string;
	ask?: string;
	card?: ColumnCard;
	/** The spoken line under the card. */
	say?: string;
	chips: { lane: Lane; text: string }[];
	/** The scope chip in the composer: what Earnest can see. */
	scope?: { noun: string; name: string };
}

export interface Beat {
	id?: string;
	eyebrow: string;
	/** Before, the accented phrase, after. */
	title: [string, string, string];
	sub: string;
	move: { k: string; text: string };
	more: { to: string; label: string };
	column: Column;
}

const WAITING = 5;
export const columnWaiting = WAITING;

/** The first two beats, on the page's own ground. */
export const beatsOpen: Beat[] = [
	{
		id: 'how',
		eyebrow: 'One screen',
		title: ['Know where ', 'you stand', '.'],
		sub: 'One honest read of the day, written from your records. Then what needs you, what’s one tap, and what you only need to know.',
		move: { k: 'The move', text: 'Open it. The number that’s wrong is first.' },
		more: { to: '/features/productivity-engine', label: 'Everything on Home' },
		column: {
			label: 'Earnest reading the day',
			you: 'Read my day',
			lede: '5 waiting on you. Two are urgent.',
			facts: [
				{ v: '$12k', t: 'unpaid, all past 90 days', bad: true },
				{ v: '30 d', t: 'Helios West past its deadline', bad: true },
				{ v: '$286k', t: 'in play across 12 pursuits' },
				{ v: '5', t: 'pieces out with clients' },
			],
			card: {
				kind: 'Create tasks',
				meta: 'proposed by Earnest',
				title: '2 tasks on Helios — Website Build',
				rows: [['From', 'Friday’s launch review notes']],
				acts: ['Approve', 'Adjust'],
				note: `Decide · 1 of ${WAITING}`,
			},
			chips: [
				{ lane: 'do', text: 'Mark Helios West in progress' },
				{ lane: 'know', text: 'What’s coming up this week?' },
			],
		},
	},
	{
		eyebrow: 'From any screen',
		title: ['Say the ', 'next move', '.'],
		sub: 'It knows the screen you’re on and the record you opened. Say what should change. It writes the card; you tap.',
		move: {
			k: 'Held',
			text: 'Email, invoices, payments and meetings always wait for your tap. Small reversible things can run alone, and can be undone.',
		},
		more: { to: '/features/ai-actions', label: 'Everything it can do' },
		column: {
			label: 'Earnest booking a meeting',
			you: 'Find a time with Helios Friday, 60 minutes',
			lede: 'Friday 10:00 is open on both calendars.',
			card: {
				kind: 'Book meeting',
				held: true,
				title: 'Helios — launch review · Fri 10:00–11:00',
				rows: [
					['With', 'David Park'],
					['Lands on', 'your Google calendar'],
					['Invite', 'drafted, not sent'],
				],
				acts: ['Approve', 'Adjust', 'Skip'],
			},
			say: 'Friday at ten works for both of you. Want me to send David the invite?',
			chips: [
				{ lane: 'do', text: 'Draft an agenda' },
				{ lane: 'do', text: 'Draft a reminder to attendees' },
			],
			scope: { noun: 'Client', name: 'Helios Studio' },
		},
	},
];

/** The two beats that scroll over the client photograph. */
export const beatsOverPhoto: Beat[] = [
	{
		eyebrow: 'No unearned hype',
		title: ['Hear ', 'the truth', '.'],
		sub: 'When the numbers are a win it says so, loudly. When they aren’t, it says so, kindly. When it doesn’t know, it says that.',
		move: { k: 'The move', text: 'Ask why. A “why” gets a reasoned answer, not a list.' },
		more: { to: '/features/ai-token-transparency', label: 'How it answers' },
		column: {
			label: 'Earnest reasoning about an invoice',
			you: 'Why is this invoice overdue?',
			lede: 'Because nobody at Meridian has answered in 92 days.',
			prose:
				'Two reminders went out, on day 30 and day 60, both to <b>Amara Okafor</b>, who holds the billing contact. Neither got a reply, and the last real conversation with anyone there was <b>159 days</b> ago. The second invoice, 0038, is older still at <b>104 days</b>, so this isn’t one slow approval; the account has gone quiet.',
			hedge: 'No satisfaction data — only signals.',
			ask: 'I’d call before I write a third reminder.',
			chips: [
				{ lane: 'do', text: 'Draft a payment reminder' },
				{ lane: 'do', text: 'Schedule a call with Amara' },
			],
			scope: { noun: 'Invoice', name: 'INV-SOL-MER-2026-0042' },
		},
	},
	{
		eyebrow: 'Three voices, one memory',
		title: ['Sound like ', 'yourself', '.'],
		sub: 'Your voice on your organization. The client’s on each client. A profile of how you talk to Earnest, written overnight. Every draft inherits all three.',
		move: { k: 'The move', text: 'Say “warmer”, “shorter”, “like the last one”. It remembers which.' },
		more: { to: '/features/brand-strategy', label: 'Brand & voice' },
		column: {
			label: 'Earnest redrafting a post',
			you: 'Rewrite this warmer',
			lede: 'Warmer, same three points.',
			card: {
				kind: 'Redraft',
				meta: 'Pinecrest Clinic · LinkedIn · Thu 9:00',
				title:
					'“We changed three things on the Pinecrest site this month. Each one came from something a patient told us at the front desk.”',
				acts: ['Use this', 'Again'],
				note: 'scheduled · not published',
			},
			chips: [
				{ lane: 'do', text: 'Draft two more like it' },
				{ lane: 'know', text: 'What else is queued this week?' },
			],
			scope: { noun: 'Post', name: 'Three things we changed on the Pinecrest site' },
		},
	},
];

/** "Keep your word": a signed contract becomes a project becomes an invoice. */
export const kept = {
	eyebrow: 'One app, so the promise travels',
	title: ['Keep ', 'your word', '.'] as [string, string, string],
	sub: 'A promise made in one place is kept in another. The check-in you promised is on the calendar. The signed contract is already a project. The payment plan in the PDF is the invoice schedule.',
	move: { k: 'The move', text: 'Sign it. The rest is one press each.' },
	more: { to: '/features/proposals-and-contracts', label: 'Proposals, contracts, invoices' },
	steps: [
		{ k: 'Signed', t: 'Helios — booking site, three phases', s: '$18,500 · e-signed in the portal · Tuesday' },
		{ k: 'Project', t: 'Helios — Website Build', s: '3 phases from the contract · dates from the PDF · booking flow QA last' },
		{ k: 'Billed', t: 'Milestone 1 · $6,200', s: 'one press · Stripe · lands on cash flow' },
	],
};

/** What it never does. Each one is a rule in the app, not a setting. */
export const never = [
	'It won’t send what you haven’t seen.',
	'It won’t move money.',
	'It won’t approve creative work for a client.',
	'It won’t read another organization’s data.',
	'It won’t train on yours.',
];

/**
 * The FAQ this page shows, and — through `index.vue` — the FAQPage JSON-LD.
 * One list, both forms (see `landing.ts` for why). The long list in
 * `landing.ts` stays with the archived landings.
 */
export const homeFaqs: (Faq & { more?: { to: string; label: string } })[] = [
	{
		q: 'What do I actually see when I open it?',
		a: 'One screen. A greeting with an honest read of the day, what is waiting on a yes, and further down what is one tap each and what you only need to know. Earnest sits in a column on the right of every screen: the conversation above, its suggestions, and the composer at the foot.',
		aText:
			'One screen. A greeting with an honest read of the day, what is waiting on a yes, and further down what is one tap each and what you only need to know. Earnest sits in a column on the right of every screen: the conversation above, its suggestions, and the composer at the foot.',
	},
	{
		q: 'Who is it for?',
		a: 'Businesses that do work for people: <strong>agencies, firms, practices and shops</strong>, from one person to a whole team. Say which you are when you sign up and the words change with you: an agency sees clients and approvals, a firm sees sign-offs and requests, a shop sees customers and quotes.',
		aText:
			'Businesses that do work for people: agencies, firms, practices and shops, from one person to a whole team. Say which you are when you sign up and the words change with you: an agency sees clients and approvals, a firm sees sign-offs and requests, a shop sees customers and quotes.',
	},
	{
		q: 'What are all the features, apps and abilities?',
		a: 'There’s a page for that. This one is the idea; <a href="/features">earnest.guru/features</a> is the literal list: every app, and everything Earnest can do in each. Each section above links to its part of it.',
		aText:
			'There’s a page for that. This one is the idea; earnest.guru/features is the literal list: every app, and everything Earnest can do in each. Each section above links to its part of it.',
		more: { to: '/features', label: 'See every feature →' },
	},
	{
		q: 'Will it send emails or move money on its own?',
		a: 'No. Email, invoices, payments, meetings and campaign launches always wait for your tap. Small reversible things like a task or a ticket can run on their own if you switch that on, with an audit trail and an Undo.',
		aText:
			'No. Email, invoices, payments, meetings and campaign launches always wait for your tap. Small reversible things like a task or a ticket can run on their own if you switch that on, with an audit trail and an Undo.',
	},
	{
		q: 'Can my clients use it?',
		a: 'If you switch it on. In their portal Earnest answers as your business and sees only what that client can already open. It can log a request, leave a note or book time with you. Nothing else.',
		aText:
			'If you switch it on. In their portal Earnest answers as your business and sees only what that client can already open. It can log a request, leave a note or book time with you. Nothing else.',
	},
	{
		q: 'Who can see my data?',
		a: 'Only the members you invite. Your workspace is isolated from every other organization, we never sell your data, and Earnest reads it only to produce your own results. It runs on Anthropic’s Claude, on no-training terms. From your calendar it keeps busy times, never a title, a guest or a location. Full detail is in our <a href="/privacy-policy">privacy policy</a>.',
		aText:
			'Only the members you invite. Your workspace is isolated from every other organization, we never sell your data, and Earnest reads it only to produce your own results. It runs on Anthropic’s Claude, on no-training terms. From your calendar it keeps busy times, never a title, a guest or a location. Full detail is in our privacy policy.',
	},
];

export const links = {
	register: `${APP_ORIGIN}/register`,
	demo: `${APP_ORIGIN}/try-demo?persona=solo`,
	// ⚠️ `/auth/signin`, not `/login` — the app has no `/login` route.
	signin: `${APP_ORIGIN}/auth/signin`,
};
