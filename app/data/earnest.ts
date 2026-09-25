/**
 * Earnest — the LLM half of the product, as data.
 *
 * WHY THIS FILE EXISTS. The landing used to describe Earnest in prose spread
 * across the sell sheet, the FAQ, the feature list and a drawn autonomy ring —
 * and every one of them kept describing a surface the app had since retired
 * (the Focus takeover, three "faces", a four-tier trust dial). The app moves
 * weekly; the page did not. Everything the site says about Earnest now lives
 * HERE, once, with the app-repo file it was read from beside it, so the next
 * refresh is a diff of this file and not a hunt through six components.
 *
 * HOW TO UPDATE (the whole recipe — see README "Keeping the Earnest story
 * current"):
 *   1. Ship the change in the app.
 *   2. Add a line to `earnestChangelog` (newest first). The page renders it.
 *   3. If it changes what Earnest can do, touch the matching entry in
 *      `earnestPillars` — a point added or removed, never a superlative.
 *   4. If it touches the guardrails, re-copy `AUTONOMY_SAFETY_FLOOR`,
 *      `AUTONOMY_SMALL_REVERSIBLE` and `AUTONOMY_SETTING` from the app's
 *      `shared/ai-autonomy.ts`, and `HANDS_FREE_NOTE` from `shared/speech-wake.ts`.
 *      `pnpm check:earnest` diffs them against a sibling checkout of the app.
 *   5. If it changes what a reply looks like, edit `talkScript` — every line
 *      there is a shape the app really produces, with real demo-seed numbers.
 *
 * ⚠️ VOICE. The app's own charter (`server/utils/llm/voice.ts`) is the floor
 * for this copy too: accurate before interesting, numbers as they are, no
 * unearned superlatives, nothing the app cannot make good on today. A feature
 * that is designed but not shipped is not on this page. Two things below are
 * explicitly marked as limits (publishing to networks, the built-in voice)
 * because the app itself says so.
 *
 * Every `source` is a path in the app repo, read on 2026-09-25 at `28f598d`.
 */

/* ────────────────────────────────────────────────────────────────────────
   GUARDRAILS — copied, not paraphrased.
   These strings are the app's. `scripts/check-earnest-claims.mjs` compares
   them to the app's `shared/ai-autonomy.ts` and `shared/speech-wake.ts`.
   ──────────────────────────────────────────────────────────────────────── */

/** Actions that NEVER run without a person's tap, and never on a spoken yes. */
export const SAFETY_FLOOR = [
	'send_email',
	'create_invoice',
	'book_meeting',
	'reschedule_meeting',
	'cancel_meeting',
	'set_billing_contact',
] as const;

/** What the one autonomy switch lets run on its own — each one undoable. */
export const SMALL_REVERSIBLE = ['create_ticket', 'add_event', 'add_task', 'update_field', 'connect_invoices'] as const;

/** The switch's own words, from `shared/ai-autonomy.ts` `AUTONOMY_SETTING`. */
export const AUTONOMY_SETTING = {
	label: 'Earnest does small reversible things without asking',
	blurb:
		'Tasks, tickets, events and field edits run on their own, and each can be undone. Email, money and meetings always ask.',
} as const;

/** The platform limits of Hands-free, quoted verbatim from `shared/speech-wake.ts`. */
export const HANDS_FREE_NOTE =
	'Hands-free keeps the microphone open in this tab until you turn it off or leave the page — it is never on after a reload. Only what starts with “Earnest” is sent; everything else is dropped on this device. Your browser may ask for the microphone once per page load. On an iPhone, listening pauses while Earnest is speaking, stops when you switch apps, and uses more battery while it is on.';

/** Human names for tool ids, for the guardrail lists. Keep in step with the two sets above. */
export const TOOL_LABEL: Record<string, string> = {
	send_email: 'Send an email',
	create_invoice: 'Issue an invoice',
	book_meeting: 'Book a meeting',
	reschedule_meeting: 'Move a meeting',
	cancel_meeting: 'Cancel a meeting',
	set_billing_contact: 'Change where invoices go',
	create_ticket: 'Open a ticket',
	add_event: 'Add a project event',
	add_task: 'Add a task',
	update_field: 'Edit a field',
	connect_invoices: 'File an invoice to a project',
};

/* ────────────────────────────────────────────────────────────────────────
   THE VOICE CHARTER — four of its seven lines, verbatim.
   `server/utils/llm/voice.ts` `EARNEST_VOICE_CHARTER`. Every Earnest surface
   inherits it; the page quotes it because it is the product's own promise.
   ──────────────────────────────────────────────────────────────────────── */
export const charterLines = [
	'Be accurate before being interesting. Every claim traces to real data. If you do not have the data, say so plainly instead of guessing.',
	'Calibrate confidence. Distinguish facts (from data) from patterns (inferred) from guesses. Name uncertainty out loud — do not round a “maybe” up to a “definitely”.',
	'Be precise and literal with numbers, dates, and names. Report them as they are; do not dramatize them (“$5,000 outstanding across 2 invoices”, not “a mountain of unpaid invoices”).',
	'Earn trust by being right, not by being loud.',
];

/* ────────────────────────────────────────────────────────────────────────
   THE FOUR PILLARS — what the sell sheet argues, one section each.
   ──────────────────────────────────────────────────────────────────────── */

export interface Pillar {
	key: 'talk' | 'context' | 'act' | 'honest';
	/** The kicker pill above the heading. */
	kicker: string;
	/** Heading, split so the accent span lands on the second half. */
	head: [string, string];
	lead: string;
	points: { text: string; strong?: string }[];
	/** A quiet limit stated in the same breath, when the app itself states one. */
	limit?: string;
	/** Where in the app repo this was read. Not rendered; for the next refresh. */
	source: string[];
}

export const earnestPillars: Pillar[] = [
	{
		key: 'talk',
		kicker: 'Talk to it',
		head: ['Say it out loud.', 'It listens, and it answers back.'],
		lead: 'The mic is on the composer, on every screen. Hold it on a phone, click it on a computer, and your words land in the box as you say them — you read what it heard before anything is sent. Turn on Hands-free and you do not touch anything: anything that starts with “Earnest, …” is a message.',
		points: [
			{
				strong: 'Push-to-talk, then send.',
				text: 'Sending stays a separate act, so a misheard word never goes anywhere. There is a switch for “Send when I stop talking” if you want it.',
			},
			{
				strong: 'Spoken replies.',
				text: 'Turn on “Read replies aloud” and each reply is spoken once it is finished, never mid-stream. Every reply also has its own Speak button.',
			},
			{
				strong: '“Earnest, what’s waiting for me?”',
				text: 'With Hands-free on, only what starts with the name is sent; everything else is dropped on your device. It is on for this tab until you turn it off, and never after a reload.',
			},
			{
				strong: 'A spoken yes on a card.',
				text: 'When a reply ends in an action, Earnest reads the card aloud and “yes” or “no” decides it — except email, money and meetings, which it reads and then says “This one needs a tap.”',
			},
		],
		limit:
			'Voice uses your device’s own recogniser and voice (Chrome, Safari including iPhone, Edge — the button is simply absent in Firefox). A downloaded system voice is picked up automatically; a hosted voice is not part of the product today.',
		source: [
			'app/composables/useSpeechInput.ts',
			'app/composables/useSpeechOutput.ts',
			'app/composables/useHandsFree.ts',
			'shared/speech-wake.ts',
			'docs/earnest-next-plan.md §N5 §N6',
		],
	},
	{
		key: 'context',
		kicker: 'It knows where you are standing',
		head: ['Ask from any screen.', 'It already knows what you’re looking at.'],
		lead: 'Earnest is a column beside every page on a wide screen and a bar at the foot of every page on a phone — the same thread, the same box. On a record, the composer carries that record as a chip. Ask “why hasn’t this been paid?” on an invoice and it is reading that invoice, its client, its billing contacts and its line items, each fact tagged with where it came from.',
		points: [
			{
				strong: 'It reads live rows, not a summary.',
				text: 'Six read tools — search, one record, open invoices, tasks, the calendar, and open-this-page — work over your organization’s own data, capped and scoped, before it answers.',
			},
			{
				strong: 'Suggestions ranked for the page.',
				text: 'Do · Decide · Know chips under the box are chosen for where you are: on a project they are that project’s, and org-wide noise steps back.',
			},
			{
				strong: 'Hand it a file.',
				text: 'Drop a PDF or an image into the box — an RFP, a signed contract, a whiteboard photo — and it reads it directly. Up to three per message, 10 MB each.',
			},
			{
				strong: 'It learns how you work — and shows you.',
				text: 'A short profile, rebuilt nightly from your own conversations and decisions, shapes how it writes for you. You can read it, edit a line, rebuild it, or turn it off and forget it, under Account → Earnest.',
			},
			{
				strong: 'Home speaks first.',
				text: 'Before you type, Home has read the day: a greeting with one true clause from your own numbers, then three sentences at most, each ending in the verb it needs — Mark paid, Draft a reminder, Reschedule, Review them.',
			},
		],
		source: [
			'app/components/Earnest/Column.vue',
			'app/composables/useEarnestAwareness.ts',
			'server/utils/llm/tool-reads.ts',
			'server/utils/entity-context.ts',
			'shared/ai-attachments.ts',
			'server/utils/person-profile.ts',
			'shared/brief.ts',
		],
	},
	{
		key: 'act',
		kicker: 'It does the work',
		head: ['Then it does it.', 'With a receipt, and a way back.'],
		lead: 'A reply is three things in a fixed order: one line of receipts for what it read, the answer, and at most one action card. The card is a real change to your organization, drafted and waiting — Approve, Edit or Skip. Approving here and approving in “Waiting for you” are the same act on the same card.',
		points: [
			{
				strong: 'One switch for the small stuff.',
				text: `“${AUTONOMY_SETTING.label}.” On, it opens tickets, adds tasks and events, edits fields and files invoices on its own — each one logged, each one undoable.`,
			},
			{
				strong: 'The floor never moves.',
				text: 'Sending an email, issuing an invoice, booking, moving or cancelling a meeting, and changing where a client’s invoices go always wait for your tap. Not a setting. Not by voice.',
			},
			{
				strong: 'Undo that refuses to guess.',
				text: 'Undo puts back exactly what it changed — and stops if anyone has touched the record since. An undo that quietly deleted a milestone someone had billed would be the worst bug in the app, so it will not.',
			},
			{
				strong: 'Twenty-odd things it can draft or do.',
				text: 'Reschedule a project and everything under it. Draft the email, the proposal, the content plan, the campaign. Sketch a one-page prototype and hand you the link. Find a time and book it. Open the page you asked for.',
			},
		],
		source: [
			'app/components/AI/ActionCard.vue',
			'shared/ai-autonomy.ts',
			'server/api/ai/actions/[id]/undo.post.ts',
			'server/utils/llm/tools.ts',
			'server/utils/generate-prototype.ts',
		],
	},
	{
		key: 'honest',
		kicker: 'Accurate before interesting',
		head: ['Right,', 'not loud.'],
		lead: 'Earnest runs on Anthropic’s Claude, under no-training terms, with a written charter every surface inherits. It reports numbers as they are, says which facts it read and which it inferred, and when it is thin on context it says what is missing instead of filling the gap with something plausible.',
		points: [
			{
				strong: 'Receipts before answers.',
				text: '“Read invoices · 6 rows · 0.4s” sits above every reply that looked something up, so “you have five overdue invoices” is preceded by the proof that it checked.',
			},
			{
				strong: 'Its own facts, cited.',
				text: 'On a record, every fact it works from carries a source tag — Client Profile, Billing Contacts, Line Items — so you can see what it was reading.',
			},
			{
				strong: 'Your dial, three ways.',
				text: 'Length, warmth and depth sit under the gear on the composer: concise or standard, four warmths, and a fast, balanced or deep model.',
			},
			{
				strong: 'Keep the good ones.',
				text: 'Save a reply and find it again from the thread page. Earned enthusiasm is welcome when the data backs it; spin is not.',
			},
		],
		source: ['server/utils/llm/voice.ts', 'app/utils/earnest-receipts.ts', 'app/composables/useEarnestControls.ts'],
	},
];

/* ────────────────────────────────────────────────────────────────────────
   THE CONVERSATION — the hero, scripted.

   ⚠️ Every line is a shape the app really produces, and every number is the
   solo demo seed's (`scripts/setup-demo-org.ts`: six pending invoices
   INV-SOL-HEL-<year>-0050…0055 — 9,800 not yet due; 4,200 / 12,500 / 7,600 /
   15,300 / 6,400 overdue by 8 / 20 / 46 / 80 / 104 days; the sixth is billed
   to Meridian Law Group; the demo Owner is Sonia). $55,800 is their sum;
   $46,000 the overdue five. The receipt line follows `receiptLine()` in
   `app/utils/earnest-receipts.ts`; the card follows `AI/ActionCard.vue`'s
   pending state; the spoken floor line is `useHandsFree`'s.
   ──────────────────────────────────────────────────────────────────────── */

export type TalkBeat =
	| { kind: 'listen'; text: string }
	| { kind: 'user'; text: string; spoken?: boolean }
	| { kind: 'receipt'; text: string }
	| { kind: 'reply'; text: string }
	| { kind: 'card'; title: string; preview: string; floor: boolean }
	| { kind: 'spoken'; text: string };

export const talkScript: TalkBeat[] = [
	{ kind: 'listen', text: 'Listening…' },
	{ kind: 'user', text: 'Earnest, who owes me money?', spoken: true },
	{ kind: 'receipt', text: 'Read invoices · 6 rows · 0.4s' },
	{
		kind: 'reply',
		text: '$55,800 is outstanding across 6 invoices. Five are overdue — $46,000 — and the oldest is INV-SOL-HEL-2026-0055, $6,400 and 104 days past due. The other $9,800 is not due for 14 days. Want a reminder drafted for the oldest one?',
	},
	{ kind: 'user', text: 'Yes — warm, short, one ask.', spoken: true },
	{ kind: 'receipt', text: 'Read the record · 1 row · 0.2s · Drafted an email' },
	{
		kind: 'card',
		title: 'Payment reminder · INV-SOL-HEL-2026-0055',
		preview: 'To Meridian Law Group · “A quick note on invoice 0055 — $6,400, now 104 days past due…”',
		floor: true,
	},
	{ kind: 'spoken', text: '“This one needs a tap.”' },
];

/* ────────────────────────────────────────────────────────────────────────
   HOME, AS DATA — the coded home in the "Your day" section.

   Home after the 2026-09-22 rethink is four things in order: the greeting
   and one true clause; the opening paragraph (≤ 3 sentences, verb at the
   end); the composer with its chips; "Waiting for you · N" and Recent.
   Numbers are the demo seed's (above) and the 2026-09-01 capture's
   ("5 decisions waiting" — `home-v2-projects.png`).
   ──────────────────────────────────────────────────────────────────────── */

export interface BriefSegment {
	t: string;
	kind?: 'num' | 'link';
}
export interface BriefLine {
	segs: BriefSegment[];
	verbs: string[];
}

export const mockHome = {
	greeting: 'Good morning, Sonia',
	/** `composeIntro` — the "away" clause, the trust clause made concrete. */
	intro: 'Earnest ran 3 things while you were away.',
	brief: [
		{
			segs: [{ t: 'You are owed ' }, { t: '$46,000', kind: 'num' }, { t: ' across ' }, { t: '5', kind: 'num' }, { t: ' invoices, the oldest ' }, { t: '104', kind: 'num' }, { t: ' days overdue, and ' }, { t: '$9,800', kind: 'num' }, { t: ' more is due in two weeks.' }],
			verbs: ['Mark paid', 'Draft a reminder'],
		},
		{
			segs: [{ t: '5', kind: 'num' }, { t: ' things Earnest drafted are waiting on you.' }],
			verbs: ['Review them'],
		},
	] as BriefLine[],
	chips: ['Do', 'Decide', 'Know'],
	placeholder: 'Ask Earnest, or say what to do…',
	waiting: {
		count: 5,
		card: { title: 'Create 2 tasks on Helios — Website Build', meta: 'Add tasks · proposed by Earnest' },
	},
	recent: {
		card: { title: 'Filed INV-SOL-HEL-2026-0054 to Helios — Website Build', meta: 'Done · ran on its own · 2h ago' },
	},
};

/* ────────────────────────────────────────────────────────────────────────
   WHAT'S NEW — newest first. The page renders the first `CHANGELOG_SHOWN`.
   One line each, dated to the commit, in the charter's voice.
   ──────────────────────────────────────────────────────────────────────── */

export interface ChangelogEntry {
	date: string;
	title: string;
	desc: string;
	/** Which pillar it belongs to — the page colours the dot. */
	pillar: Pillar['key'];
}

export const CHANGELOG_SHOWN = 8;

export const earnestChangelog: ChangelogEntry[] = [
	{
		date: '2026-09-24',
		title: 'Hands-free — “Earnest, …” by name',
		desc: 'A session-scoped listener you turn on under the gear. Only what starts with the name is sent; a spoken yes decides a card, and the floor still needs a tap.',
		pillar: 'talk',
	},
	{
		date: '2026-09-24',
		title: 'Open pages from chat',
		desc: '“Show me the pay page for Helios — Website Build” finds the invoice and opens it — in the app, or the client’s pay page in a new tab. Hands-free opens it straight away.',
		pillar: 'act',
	},
	{
		date: '2026-09-24',
		title: 'Earnest sees where a client’s invoices go',
		desc: 'On a client or an invoice it reads the billing contacts the send path would use, and can propose one. Always your tap — it is on the floor.',
		pillar: 'context',
	},
	{
		date: '2026-09-24',
		title: 'One bar on the phone',
		desc: 'Below a laptop width the app rail folds into the composer: apps, the waiting count, the box and the mic in one pill above the safe area.',
		pillar: 'context',
	},
	{
		date: '2026-09-23',
		title: 'Talk to Earnest',
		desc: 'Push-to-talk on the composer and spoken replies, on your device’s own voice. Hold on a phone, click on a computer; sending stays a separate act.',
		pillar: 'talk',
	},
	{
		date: '2026-09-23',
		title: 'Earnest knows you',
		desc: 'A distilled profile of how you think and type, rebuilt nightly from your own conversations and decisions. Readable, editable and forgettable under Account → Earnest.',
		pillar: 'context',
	},
	{
		date: '2026-09-23',
		title: 'A prototype from a chat',
		desc: '“Sketch a landing page for the retainer” writes one self-contained page on the proposal, at a link you can publish, password, expire or revoke. Revise it in the same thread.',
		pillar: 'act',
	},
	{
		date: '2026-09-22',
		title: 'One composer on every screen',
		desc: 'The rethink: a column beside every page or a bar at its foot, read tools with receipts, the action card with Approve · Edit · Skip and Undo, one “Waiting for you” count, one autonomy switch, and files in the box.',
		pillar: 'act',
	},
];

/** The gear's Voice switches, with their exact labels. */
export const voiceSwitches = [
	{ label: 'Send when I stop talking', desc: 'The mic sends as soon as the utterance ends. Off by default.' },
	{ label: 'Read replies aloud', desc: 'Each reply is spoken once it finishes streaming. Off by default.' },
	{ label: 'Hands-free', desc: 'Listen for “Earnest, …” in this tab until you turn it off. Never on after a reload.' },
];
