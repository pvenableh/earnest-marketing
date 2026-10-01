/**
 * The app as Earnest sees it: every app, every floor, the sentence Earnest is
 * told on that floor, the three rows it offers there, and one record per
 * floor with its own rows. The hero's walk (`Landing/Walk.vue`) draws from
 * this; so do the verbs section and the client split.
 *
 * ⚠️ Every sentence and row is the app's own string — `FLOOR_FOCUS` and
 * `ENTITY_PROMPTS` in `app/composables/useEarnestAwareness.ts`, `FLOOR_ROWS`
 * in `app/composables/useEarnestPrompts.ts`, and `PORTAL_FLOOR_ROWS` in
 * `shared/portal-earnest.ts`, all in the app repo at `main` on 2026-10-01.
 * The records are the seeded demo workspace's, the same ones `landing.ts`
 * uses. If a row changes there, it changes here; nothing is invented.
 */

export type Lane = 'do' | 'decide' | 'know';
export interface Row {
	lane: Lane;
	t: string;
}
export interface Rec {
	/** The chip's noun — "invoice", "project". */
	noun: string;
	label: string;
	sub: string;
	v: string;
	bad?: boolean;
	/** The record's own rows. A record without them is a list entry only. */
	rows?: Row[];
}
export interface Floor {
	key: string;
	label: string;
	focus: string;
	rows: Row[];
	recs: Rec[];
}
export interface App {
	key: string;
	label: string;
	icon: string;
	floors: Floor[];
}

const r = (lane: Lane, t: string): Row => ({ lane, t });

export const apps: App[] = [
	{
		key: 'clients',
		label: 'People',
		icon: 'i-lucide-users',
		floors: [
			{
				key: 'clients',
				label: 'Clients',
				focus: 'the People app, Clients floor — every client, who is active and who has gone quiet',
				rows: [r('do', 'Schedule a check-in with a quiet client'), r('decide', 'Which clients have gone quiet?'), r('know', 'What does each client owe right now?')],
				recs: [
					{ noun: 'client', label: 'Meridian Law', sub: '159 days since a real touch', v: '$9,400 overdue', bad: true, rows: [r('know', 'Summarize recent activity for this client'), r('do', 'Draft a follow-up email'), r('know', "What's outstanding for this client?")] },
					{ noun: 'client', label: 'Helios Studio', sub: 'Website build · brand system · hotel launch', v: '3 projects' },
					{ noun: 'client', label: 'Pinecrest Clinic', sub: '174 days since a real touch', v: 'quiet' },
				],
			},
			{
				key: 'contacts',
				label: 'Contacts',
				focus: 'the People app, Contacts floor — the people at each client and how to reach them',
				rows: [r('do', 'Draft an email to a contact'), r('do', 'Log a conversation I just had'), r('do', 'Add a contact')],
				recs: [
					{ noun: 'contact', label: 'Amara Okafor', sub: 'Meridian Law · last touch 159 d', v: 'holds the overdue', rows: [r('do', 'Draft an email to Amara'), r('do', 'Log a conversation with Amara'), r('know', 'When did we last talk?')] },
					{ noun: 'contact', label: 'David Park', sub: 'Helios Studio · last touch 242 d', v: 'quiet' },
				],
			},
			{
				key: 'pursuits',
				label: 'Pursuits',
				focus: 'the People app, Pursuits floor — leads and the next step on each',
				rows: [r('do', 'Create a lead'), r('do', 'Draft a proposal for a pursuit'), r('decide', 'Which pursuits have stalled?')],
				recs: [
					{ noun: 'lead', label: 'Atlas Fintech', sub: 'Qualified · no movement in 3 weeks', v: 'stalled', bad: true, rows: [r('know', 'Summarize this lead and where it stands'), r('decide', "What's the next best action?"), r('do', 'Move this to Proposal Sent')] },
					{ noun: 'lead', label: 'Driftwood Roasters', sub: 'Proposal sent', v: 'waiting' },
				],
			},
			{
				key: 'intelligence',
				label: 'Intelligence',
				focus: 'the People app, Intelligence floor — findings across clients, contacts and leads',
				rows: [r('decide', 'Who should I reconnect with first?'), r('know', 'Where is the relationship risk?'), r('do', 'Draft a check-in to a client')],
				recs: [],
			},
		],
	},
	{
		key: 'work',
		label: 'Work',
		icon: 'i-lucide-square-kanban',
		floors: [
			{
				key: 'projects',
				label: 'Projects',
				focus: 'the Work app, Projects floor — every project, its timeline and what is at risk',
				rows: [r('do', 'Start a new project'), r('know', 'Which milestones are coming up?'), r('do', "Push a project's dates back")],
				recs: [
					{ noun: 'project', label: 'Helios West Hotel Launch', sub: 'Helios Studio · hero image still in Round 2', v: '30 d past deadline', bad: true, rows: [r('know', "What's blocking progress on this project?"), r('know', 'Summarize the task status'), r('do', 'Push the start date back 2 weeks')] },
					{ noun: 'project', label: 'Helios — Website Build', sub: 'Booking flow QA + launch', v: 'on track' },
					{ noun: 'project', label: 'Driftwood Roasters — Brand', sub: 'Kickoff next week', v: 'not started' },
				],
			},
			{
				key: 'tasks',
				label: 'Tasks',
				focus: 'the Work app, Tasks floor — what is open, due and overdue',
				rows: [r('know', "Plan today's priorities"), r('do', 'Add a task'), r('decide', 'Which overdue tasks should I let go?')],
				recs: [
					{ noun: 'task', label: 'Reply to Julia Holt re: intro', sub: 'Personal · due today', v: 'today', rows: [r('know', 'What is this task waiting on?'), r('do', 'Push the due date back a week'), r('do', 'Mark this task done')] },
					{ noun: 'task', label: 'Pull Q1 utilization report', sub: 'Personal', v: 'this week' },
				],
			},
			{
				key: 'approvals',
				label: 'Approvals',
				focus: 'the Work app, Approvals floor — creative work sent to clients for sign-off',
				rows: [r('do', 'Send work for approval'), r('decide', 'Which approvals have been sitting with the client too long?'), r('do', 'Draft a nudge for a waiting approval')],
				recs: [
					{ noun: 'approval', label: 'Helios — hero image, Round 2', sub: '5 pieces · with the client 9 days', v: 'no reply', bad: true, rows: [r('know', "Who hasn't responded?"), r('know', 'Summarize the feedback so far'), r('do', 'Draft a nudge to the client')] },
					{ noun: 'approval', label: 'Pinecrest — October posts', sub: '4 pieces', v: '3 of 4 approved' },
				],
			},
			{
				key: 'calendar',
				label: 'Calendar',
				focus: 'the Work app, Calendar floor — the week ahead and what to book',
				rows: [r('know', "What's on today?"), r('do', 'Find a time to meet'), r('do', 'Book a meeting')],
				recs: [
					{ noun: 'appointment', label: 'Meridian Law — catch-up', sub: 'Thu 2:00 · 30 min · video', v: 'Thu', rows: [r('do', 'Draft an agenda for this'), r('do', 'Draft a reminder to the attendees'), r('do', 'Reschedule this')] },
					{ noun: 'appointment', label: 'Helios — launch review', sub: 'Fri 10:00 · 60 min', v: 'Fri' },
				],
			},
			{
				key: 'time',
				label: 'Time',
				focus: 'the Work app, Time floor — tracked hours, by project and client, and what is unbilled',
				rows: [r('do', 'Start the timer'), r('know', 'Where did my time go this week?'), r('do', 'Invoice my unbilled time')],
				recs: [],
			},
		],
	},
	{
		key: 'money',
		label: 'Money',
		icon: 'i-lucide-trending-up',
		floors: [
			{
				key: 'cashflow',
				label: 'Cash flow',
				focus: 'the Money app, Cash flow floor — money in, money out and what is at risk',
				rows: [r('decide', 'What money is at risk this month?'), r('know', 'What is due to come in?'), r('do', 'Draft reminders for everything overdue')],
				recs: [],
			},
			{
				key: 'invoices',
				label: 'Invoices',
				focus: 'the Money app, Invoices floor — what is owed, overdue and paid',
				rows: [r('do', 'Draft a reminder for my oldest overdue invoice'), r('do', 'Create an invoice'), r('know', 'Who owes me, and for how long?')],
				recs: [
					{ noun: 'invoice', label: 'INV-SOL-MER-2026-0042', sub: 'Meridian Law · $6,400', v: '92 d overdue', bad: true, rows: [r('know', 'Why is this invoice overdue?'), r('do', 'Draft a payment reminder email'), r('know', 'Summarize payment history')] },
					{ noun: 'invoice', label: 'INV-SOL-MER-2026-0038', sub: 'Meridian Law · $3,000', v: '104 d overdue', bad: true },
					{ noun: 'invoice', label: 'INV-SOL-HEL-2026-0055', sub: 'Helios Studio · $2,600', v: 'due in 14 d' },
				],
			},
			{
				key: 'payments',
				label: 'Payments',
				focus: 'the Money app, Payments floor — payments received and the invoices they settled',
				rows: [r('do', 'Mark an invoice paid'), r('know', 'Which invoices are part-paid?'), r('do', 'Send a client their payment link')],
				recs: [
					{ noun: 'payment', label: '$350 · check', sub: 'Pinecrest Clinic · settles INV-…-0031', v: 'today', rows: [r('know', 'What is still owed on this invoice?'), r('know', 'When was this received, and how?'), r('know', 'Has this client paid on time before?')] },
				],
			},
			{
				key: 'expenses',
				label: 'Expenses',
				focus: 'the Money app, Expenses floor — what was spent, on what, and what is billable',
				rows: [r('do', 'Record an expense'), r('know', 'What am I spending most on?'), r('decide', 'Which expenses should I bill to a client?')],
				recs: [
					{ noun: 'expense', label: 'Figma', sub: 'Software & SaaS · monthly', v: 'billable?', rows: [r('decide', 'Is this expense billable to a client?'), r('know', 'What else did we spend with this vendor?'), r('know', 'Is a receipt attached?')] },
				],
			},
			{
				key: 'documents',
				label: 'Documents',
				focus: 'the Money app, Documents floor — proposals and contracts, drafted, sent and signed',
				rows: [r('do', 'Draft a proposal'), r('do', 'Draft a contract from a proposal'), r('know', 'Which documents are waiting on a signature?')],
				recs: [
					{ noun: 'proposal', label: 'Helios — booking site, three phases', sub: '$18,500 · draft', v: 'not sent', rows: [r('know', 'Summarize this proposal'), r('do', 'Turn this into a contract'), r('do', 'Change the phases')] },
				],
			},
		],
	},
	{
		key: 'marketing',
		label: 'Marketing',
		icon: 'i-lucide-megaphone',
		floors: [
			{
				key: 'campaigns',
				label: 'Campaigns',
				focus: 'the Marketing app, Campaigns floor — campaigns to plan, target and launch',
				rows: [r('do', 'Draft a campaign for this month'), r('do', 'Plan a 3-touch campaign for a client'), r('do', 'Launch the draft campaign')],
				recs: [
					{ noun: 'campaign', label: 'Pinecrest — autumn check-ups', sub: '3 touches · draft', v: 'not launched', rows: [r('know', 'How is this campaign doing?'), r('do', 'Regenerate the second touch'), r('do', 'Launch this campaign')] },
				],
			},
			{
				key: 'studio',
				label: 'Studio',
				focus: 'the Marketing app, Studio floor — social posts to draft, design and schedule',
				rows: [r('do', 'Draft a few social posts'), r('do', 'Plan a month of content'), r('know', 'What should I post about this week?')],
				recs: [
					{ noun: 'post', label: 'Three things we changed on the Pinecrest site', sub: 'LinkedIn · Thu 9:00', v: 'scheduled', rows: [r('do', 'Rewrite this in a warmer voice'), r('do', 'Draft two more like it'), r('know', 'Why this slot?')] },
				],
			},
			{
				key: 'email',
				label: 'Email',
				focus: 'the Marketing app, Email floor — newsletters, templates and how sends performed',
				rows: [r('know', 'How is email engagement trending?'), r('do', 'Write a newsletter for this month'), r('do', 'Suggest five subject lines')],
				recs: [],
			},
			{
				key: 'audience',
				label: 'Audience',
				focus: 'the Marketing app, Audience floor — mailing lists and the subscribers on them',
				rows: [r('do', 'Target a campaign at a list'), r('know', 'How should I segment my audience?'), r('do', 'Draft a welcome email for new subscribers')],
				recs: [],
			},
		],
	},
	{
		key: 'organization',
		label: 'Organization',
		icon: 'i-lucide-building-2',
		floors: [
			{
				key: 'members',
				label: 'Members',
				focus: 'the Organization app, Members floor — who is in the workspace and their roles',
				rows: [r('know', 'Who is in the workspace?'), r('know', 'Who is working on what?'), r('do', 'Draft a welcome note for a new member')],
				recs: [],
			},
			{
				key: 'templates',
				label: 'Templates',
				focus: 'the Organization app, Templates floor — reusable content blocks and service offerings',
				rows: [r('do', 'Write a reusable scope block'), r('do', 'Describe a service offering'), r('do', 'Draft a proposal from my templates')],
				recs: [],
			},
			{
				key: 'ai',
				label: 'AI & Tokens',
				focus: 'the Organization app, AI & Tokens floor — token usage and what Earnest may do',
				rows: [r('know', 'What can you do for me?'), r('know', 'What do you ask before acting?'), r('do', 'Open my Earnest settings')],
				recs: [],
			},
			{
				key: 'settings',
				label: 'Settings',
				focus: 'the Organization app, Settings floor — the workspace name, brand and defaults',
				rows: [r('do', 'Write a one-line description of the studio'), r('know', 'What should I set up first?'), r('do', 'Open Billing')],
				recs: [],
			},
		],
	},
];

/** The tour the walk takes on its own until the visitor touches it. */
export const tour: Array<{ app?: string; floor?: string; rec: number | null }> = [
	{ app: 'money', floor: 'invoices', rec: null },
	{ rec: 0 },
	{ app: 'work', floor: 'projects', rec: null },
	{ rec: 0 },
	{ app: 'clients', floor: 'pursuits', rec: null },
	{ rec: 0 },
	{ app: 'work', floor: 'calendar', rec: null },
	{ rec: 0 },
	{ app: 'marketing', floor: 'studio', rec: null },
	{ app: 'money', floor: 'expenses', rec: null },
	{ rec: 0 },
	{ app: 'clients', floor: 'clients', rec: null },
	{ rec: 0 },
];

/* ── The verbs: what Earnest can do, by app. ──
   Each is a tool with a name in `server/utils/llm/tools.ts`. `held` marks the
   ones that reach a client or move money, which always wait for a tap. */
export interface Verb {
	t: string;
	held?: boolean;
}
export interface VerbGroup {
	key: string;
	label: string;
	icon: string;
	note: string;
	verbs: Verb[];
}

export const verbGroups: VerbGroup[] = [
	{
		key: 'people',
		label: 'People',
		icon: 'i-lucide-users',
		note: 'clients · contacts · pursuits',
		verbs: [{ t: 'Add a contact' }, { t: 'Create a lead' }, { t: 'Log a conversation' }, { t: 'Schedule a check-in' }, { t: 'Move a lead’s stage' }, { t: 'Email a client', held: true }],
	},
	{
		key: 'work',
		label: 'Work',
		icon: 'i-lucide-square-kanban',
		note: 'projects · tasks · calendar',
		verbs: [{ t: 'Create a project' }, { t: 'Add a task' }, { t: 'Add a phase or event' }, { t: 'Push a project’s dates' }, { t: 'Open a ticket' }, { t: 'Find a time, book a meeting' }],
	},
	{
		key: 'money',
		label: 'Money',
		icon: 'i-lucide-trending-up',
		note: 'invoices · payments · expenses',
		verbs: [{ t: 'Create an invoice' }, { t: 'Record a payment' }, { t: 'Record an expense' }, { t: 'Draft a proposal or contract' }, { t: 'Draft a prototype' }, { t: 'Send an invoice or reminder', held: true }],
	},
	{
		key: 'marketing',
		label: 'Marketing',
		icon: 'i-lucide-megaphone',
		note: 'campaigns · studio · email',
		verbs: [{ t: 'Create a campaign' }, { t: 'Target it at a list' }, { t: 'Plan a month of content' }, { t: 'Draft posts in the client’s voice' }, { t: 'Launch the campaign', held: true }],
	},
	{
		key: 'anywhere',
		label: 'Anywhere',
		icon: 'i-lucide-search',
		note: 'reads, no tap needed',
		verbs: [{ t: 'Search records' }, { t: 'Open a record or page' }, { t: 'List open invoices' }, { t: 'List tasks' }, { t: 'What’s coming up' }, { t: 'Change a field on what’s open' }],
	},
	{
		key: 'never',
		label: 'Never',
		icon: 'i-lucide-ban',
		note: 'by design',
		verbs: [{ t: 'Approve creative work for a client' }, { t: 'Move money anywhere' }, { t: 'Send anything you have not seen' }, { t: 'Read another studio’s data' }, { t: 'Train the model on yours' }],
	},
];

/** Verbs that act, counted for the section head — the five app groups, not Never. */
export const verbCount = verbGroups.filter((g) => g.key !== 'never').reduce((n, g) => n + g.verbs.length, 0);

/* ── The client split: one invoice, two sides of the glass. ── */
export interface Side {
	who: string;
	org: string;
	chip: { noun: string; label: string };
	rec: { label: string; sub: string; v: string };
	you: string;
	lede: string;
	facts: Array<{ n: string; t: string; bad?: boolean }>;
	ask: string;
	acts: [string, string];
	sees: string;
	/** What this side cannot see — struck through. Empty for the studio. */
	not: string[];
}

export const sides: Side[] = [
	{
		who: 'Your side',
		org: 'Earnest Demo — Agency',
		chip: { noun: 'invoice', label: 'INV-AGY-MER-2026-0042' },
		rec: { label: 'INV-AGY-MER-2026-0042', sub: 'Meridian Law · $6,400 · sent 92 days ago', v: '92 d overdue' },
		you: 'Why is this invoice overdue?',
		lede: 'Nobody has asked, in 92 days',
		facts: [
			{ n: '92 days', t: 'since it was sent; no reminder yet', bad: true },
			{ n: '159 days', t: 'since Meridian heard from you' },
		],
		ask: 'Draft a reminder to Amara, in your voice?',
		acts: ['Draft the reminder', 'Log a call instead'],
		sees: 'the invoice, its history, your notes, your brand voice, the other 11 invoices.',
		not: [],
	},
	{
		who: 'Their side · the portal',
		org: 'Meridian Law',
		chip: { noun: 'invoice', label: '0042' },
		rec: { label: 'Invoice 0042', sub: 'From Earnest Demo — Agency · $6,400', v: 'due 92 days ago' },
		you: 'What do I owe right now?',
		lede: '$6,400, overdue',
		facts: [
			{ n: '$6,400', t: 'invoice 0042, due 92 days ago', bad: true },
			{ n: '1', t: 'contract waiting for your signature' },
		],
		ask: 'Open the invoice to pay it, or book time with the team?',
		acts: ['Open the invoice', 'Book time with the team'],
		sees: 'their invoices, projects, requests, boards and meetings.',
		not: ['your notes', 'your margins', 'your other clients', 'your pipeline'],
	},
];
