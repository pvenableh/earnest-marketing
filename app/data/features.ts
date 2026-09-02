export type PillarKey =
  | 'home'
  | 'people'
  | 'work'
  | 'money'
  | 'marketing'
  | 'chat'
  | 'org'
  | 'earnest'
  | 'looks';

export interface Feature {
  name: string;
  slug: string;
  icon: string;
  /** Which app / pillar this feature lives under in the revamped 7-app shell. */
  pillar: PillarKey;
  desc: string;
  keywords: string[];
  benefits: string[];
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * The apps on the Earnest rail, as it ships: Dashboard · People · Work · Chat ·
 * Money · Mktg, plus the Boardroom in the rail's footer group. Organization and
 * Account moved into the avatar menu in the 2026-08 shell pass, so `org` is a
 * real pillar with no rail chip — hence `nav: false` on it.
 *
 * Two more pillars exist only as groupings and never appear on the rail:
 * `earnest` (the one door — Focus, its faces, AI Actions, the Context Broker)
 * and `looks` (the three Looks, type, contrast and the shell itself).
 *
 * ⚠️ The keys `ai` and `design` were renamed to `earnest` and `looks` in the
 * 2026-09 pass. `SellSheetModern.vue` reads these keys by literal string in two
 * places — grep it before renaming any of them again.
 */
export interface Pillar {
  key: PillarKey;
  /** Short rail label, e.g. HOME, PEOPLE. */
  label: string;
  /** Headline for the pillar tour. */
  title: string;
  tagline: string;
  icon: string;
  /** CSS var for the pillar accent — mirrors the in-app palette ramp. */
  accent: string;
  /** Screenshot slug under /public/screenshots/latest/. */
  shot: DemoShot;
  /** Deep-link path into the live app. */
  path: string;
  /** Floor tabs shown for this app in the revamped shell. */
  tabs: string[];
  /** Whether this pillar is one of the seven rail apps (shown in the tour). */
  nav: boolean;
}

export const pillars: Pillar[] = [
  {
    key: 'home',
    label: 'Home',
    title: 'Home',
    tagline: 'Decide · Do · Know — the day sorted into three piles, under four lenses.',
    icon: 'i-lucide-layout-dashboard',
    accent: 'var(--sm-status-scheduled)',
    shot: 'home-v2',
    path: '/',
    tabs: ['Everything', 'Money', 'Creative', 'Projects'],
    nav: true,
  },
  {
    key: 'people',
    label: 'People',
    title: 'Everyone you work with',
    tagline: 'Clients, contacts, pursuits, and the cards you scan — one relationship graph with Earnest on top.',
    icon: 'i-lucide-users',
    accent: 'var(--sm-status-active)',
    shot: 'people-dashboard',
    path: '/apps/clients',
    tabs: ['Clients', 'Contacts', 'Pursuits', 'CardDesk', 'Intelligence'],
    nav: true,
  },
  {
    key: 'work',
    label: 'Work',
    title: 'The work itself',
    tagline: 'Projects, tasks, tickets, approvals, meetings and time — every workspace with full parity.',
    icon: 'i-lucide-square-kanban',
    accent: 'var(--sm-status-scheduled)',
    shot: 'shell-dock',
    path: '/apps/work',
    tabs: ['Projects', 'Tasks', 'Tickets', 'Approvals', 'Calendar', 'Time', 'Intelligence'],
    nav: true,
  },
  {
    key: 'chat',
    label: 'Chat',
    title: 'Where the team talks',
    tagline: 'Channels and calls, and the Boardroom when a decision needs the whole room.',
    icon: 'i-lucide-messages-square',
    accent: 'var(--sm-status-active)',
    shot: 'channels-home',
    path: '/apps/channels',
    tabs: ['Channels', 'Direct', 'Calls', 'The Boardroom'],
    nav: true,
  },
  {
    key: 'money',
    label: 'Money',
    title: 'The money side',
    tagline: 'Cash flow, AR aging, invoices, payments, expenses — real bookkeeping, not a billing add-on.',
    icon: 'i-lucide-trending-up',
    accent: 'var(--sm-status-success)',
    shot: 'financials-overview',
    path: '/apps/money',
    tabs: ['Cash flow', 'Documents', 'Invoices', 'Payments', 'Expenses', 'Insights'],
    nav: true,
  },
  {
    key: 'marketing',
    label: 'Mktg',
    title: 'Marketing, drafted with you',
    tagline: 'A marketing pulse, campaigns, email, and a Content Studio where posts get written and approved.',
    icon: 'i-lucide-megaphone',
    accent: 'var(--sm-status-pending)',
    shot: 'studio-river',
    path: '/apps/marketing',
    tabs: ['Pulse', 'Campaigns', 'Email', 'Accounts', 'Studio', 'Audience'],
    nav: true,
  },
  {
    key: 'org',
    label: 'Org',
    title: 'Run the organization',
    tagline: 'Brand direction, members, teams, files, billing and white-label — reached from your avatar.',
    icon: 'i-lucide-building-2',
    accent: 'var(--sm-status-active)',
    shot: 'organization-overview',
    // Organization and Account left the rail in the 2026-08 shell pass — both
    // now live in the avatar menu, so this pillar is grouped but not toured.
    path: '/apps/organization',
    tabs: ['Overview', 'Members', 'Teams', 'Files', 'Billing', 'Settings'],
    nav: false,
  },
  {
    key: 'earnest',
    label: 'Earnest',
    title: 'Earnest, one door',
    tagline: 'One control in the header opens Focus full screen, already ranked for wherever you were standing.',
    icon: 'i-lucide-sparkles',
    accent: 'var(--sm-pop)',
    shot: 'focus-takeover',
    path: '/',
    tabs: ['Focus', 'Reflect', 'Work', 'Mirror'],
    nav: false,
  },
  {
    key: 'looks',
    label: 'Looks',
    title: 'Looks & appearance',
    tagline: 'Glass, Paper and Clean — three real redesigns, with type and contrast on their own axes.',
    icon: 'i-lucide-swatch-book',
    accent: 'var(--sm-pop)',
    shot: 'home-v2-paper',
    path: '/account?section=appearance',
    tabs: ['Look', 'Colour', 'Type', 'Contrast', 'Background'],
    nav: false,
  },
];

export const pillarMeta: Record<PillarKey, { label: string; icon: string; accent: string }> = {
  home: { label: 'Home', icon: 'i-lucide-layout-dashboard', accent: 'var(--sm-status-scheduled)' },
  people: { label: 'People', icon: 'i-lucide-users', accent: 'var(--sm-status-active)' },
  work: { label: 'Work', icon: 'i-lucide-square-kanban', accent: 'var(--sm-status-scheduled)' },
  chat: { label: 'Chat & Boardroom', icon: 'i-lucide-messages-square', accent: 'var(--sm-status-active)' },
  money: { label: 'Money', icon: 'i-lucide-trending-up', accent: 'var(--sm-status-success)' },
  marketing: { label: 'Marketing', icon: 'i-lucide-megaphone', accent: 'var(--sm-status-pending)' },
  org: { label: 'Organization', icon: 'i-lucide-building-2', accent: 'var(--sm-status-active)' },
  earnest: { label: 'Earnest', icon: 'i-lucide-sparkles', accent: 'var(--sm-pop)' },
  looks: { label: 'Looks & shell', icon: 'i-lucide-swatch-book', accent: 'var(--sm-pop)' },
};

/** Order pillars appear in the grouped feature list. */
export const pillarOrder: PillarKey[] = [
  'home',
  'earnest',
  'people',
  'work',
  'money',
  'marketing',
  'chat',
  'org',
  'looks',
];

export const features: Feature[] = [
  // ─────────────────────────  HOME  ─────────────────────────
  {
    name: 'Home — Decide, Do, Know',
    slug: 'productivity-engine',
    icon: 'i-lucide-layout-dashboard',
    pillar: 'home',
    desc: 'Your home opens on a greeting with an honest read of the day — “22 things today — 5 need a decision, 13 are one tap each, 4 are just worth knowing” — then sorts everything into three piles. Decide holds what Earnest drafted and is waiting on you for. Do is one tap each. Know needs nothing, and is there so nothing surprises you later. The ranking is pure computation across tickets, projects, tasks, invoices, channels, approvals and deals: it loads instantly and spends no AI tokens. Only the greeting line is written by Claude, and it falls back to an instant one when you would rather it did not.',
    keywords: ['home', 'decide do know', 'daily priorities', 'task prioritization', 'business dashboard'],
    benefits: [
      'Three piles instead of a dashboard: Decide, Do, Know',
      'Ranked instantly across every app — zero AI tokens',
      'Four glance tiles: score, unpaid, pipeline, unread',
      'Hold to arrange it — widgets jiggle, and a gallery holds the rest',
    ],
  },
  {
    name: 'Lenses & the ambient field',
    slug: 'home-lenses',
    icon: 'i-lucide-layers',
    pillar: 'home',
    desc: 'One screen, four ways of reading it. Everything is the arrangement you made; Money, Creative and Projects re-rank the same widgets around one concern and re-tint the animated wave field behind them. When a lens has something true to say, Earnest writes one line under the greeting from data the page has already loaded — “Money lens on. $12k is out, $12k of it past 90 days.” When it has nothing, it stays quiet, because a lens line that always talks is just a label.',
    keywords: ['lenses', 'home modes', 'ambient background', 'focus modes', 'dashboard views'],
    benefits: [
      'Everything · Money · Creative · Projects over one arrangement',
      'A one-line read under the greeting, from data already on screen',
      'The wave field re-tints with the lens — the ground moves too',
      'Nothing is hidden, only re-ranked — and nothing is re-fetched',
    ],
  },
  {
    name: 'Earnest Score',
    slug: 'earnest-score',
    icon: 'i-lucide-trophy',
    pillar: 'home',
    desc: 'The Earnest Score tracks six dimensions of performance — follow-through, consistency, responsiveness, proactivity, depth, and CRM activity — and distills them into a single daily score with a team leaderboard. Levels, streaks, and unlockable badges turn good habits into visible momentum.',
    keywords: ['gamification', 'team score', 'badges', 'streaks', 'leaderboard', 'productivity'],
    benefits: [
      'Six-dimension scoring: Follow-Through, Consistency, Responsiveness, Proactivity, Depth, CRM',
      'Levels from Spark upward with EP-based progression',
      'Badges celebrating milestones like long streaks and first deal closed',
      'Team leaderboard and daily history charts for trend visibility',
    ],
  },
  {
    name: 'Daily digest & web push',
    slug: 'daily-digest',
    icon: 'i-lucide-bell',
    pillar: 'home',
    desc: 'One honest summary a day — what moved, what is waiting on you, what went quiet — and a web push only when something genuinely cannot wait for it. The bar for interrupting you is deliberately high; everything else waits for the digest or the home.',
    keywords: ['daily digest', 'email summary', 'web push', 'notifications'],
    benefits: [
      'One summary a day, not a stream of alerts',
      'Web push reserved for what actually cannot wait',
      'Same ranking as the home, so the two never disagree',
      'Per-channel notification control in your account',
    ],
  },
  {
    name: 'Spotlight search',
    slug: 'spotlight-search',
    icon: 'i-lucide-search',
    pillar: 'home',
    desc: 'One keystroke over every record you have — clients, contacts, projects, tasks, tickets, invoices, proposals, files and messages — with the result opening in place rather than navigating you somewhere and losing your context.',
    keywords: ['search', 'spotlight', 'command palette', 'universal search'],
    benefits: [
      'One shortcut, every record type',
      'Results open in place — you keep where you were',
      'Scoped to your organization and your permissions',
      'Reachable from the first of the three header controls',
    ],
  },
  {
    name: 'Learning goals',
    slug: 'goal-suggestions',
    icon: 'i-lucide-graduation-cap',
    pillar: 'home',
    desc: 'Set what you are making time to get better at, and Earnest keeps it in front of you with a one-tap timer on the home. It can suggest goals from your real data — financial, networking, performance or marketing — and your progress feeds back into how the day is ranked.',
    keywords: ['goal tracking', 'learning goals', 'OKRs', 'business goals', 'skill development'],
    benefits: [
      'A goal widget on the home with a one-tap timer',
      'Earnest suggests goals from your real business data',
      'Financial, networking, performance and marketing categories',
      'Progress feeds back into how your day gets ranked',
    ],
  },

  // ─────────────────────────  PEOPLE  ─────────────────────────
  {
    name: 'People & Companies',
    slug: 'people-and-companies',
    icon: 'i-lucide-users',
    pillar: 'people',
    desc: 'Clients, contacts, leads, and networking connections in one People app. Filter by Active, Prospects, Inactive, or Archived; switch between table and board; and drill into any record without losing your place. Brand context, goals, services, and the full history of every conversation and project travel with each person.',
    keywords: ['CRM', 'contact management', 'client management', 'people', 'business contacts'],
    benefits: [
      'Clients, Contacts, Leads, Card Desk, and Intelligence in one app',
      'Active / Prospects / Inactive / Archived filters with table + board views',
      'Full conversation and project history per record',
      'Brand context and goals attached to every client',
    ],
  },
  {
    name: 'Pursuits',
    slug: 'crm-intelligence',
    icon: 'i-lucide-target',
    pillar: 'people',
    desc: 'Leads and pipeline merged into one lens on the People app. A drag-and-drop board takes a pursuit from first contact to closed-won, or captures why it was lost, and a deal timeline shows how it actually got where it is — every touchpoint, proposal and silence in order. Earnest overlays health scores and a next step for the ones going cold.',
    keywords: ['crm', 'pursuits', 'pipeline', 'kanban', 'leads', 'deals', 'deal timeline'],
    benefits: [
      'One lens for leads and pipeline, not two lists',
      'A deal timeline showing how the pursuit actually got here',
      'New → contacted → qualified → proposal → negotiating → won/lost',
      'Earnest flags what has gone quiet, with a drafted next move',
    ],
  },
  {
    name: 'People Intelligence',
    slug: 'people-intelligence',
    icon: 'i-lucide-brain-circuit',
    pillar: 'people',
    desc: 'An Intelligence tab right inside People. Earnest reads your whole relationship graph — contacts, revenue trends, overdue items, pipeline — and returns CRM health scores, contact strategies, and the relationships worth your attention this week. Algorithmic where it can be, AI where it counts.',
    keywords: ['crm intelligence', 'relationship intelligence', 'contact strategy', 'people analytics'],
    benefits: [
      'Intelligence tab built into the People app',
      'CRM health scores from your real data',
      'Surfaces lapsed contacts and at-risk relationships',
      'Contact strategies generated from full history',
    ],
  },
  {
    name: 'CardDesk',
    slug: 'carddesk',
    icon: 'i-lucide-credit-card',
    pillar: 'people',
    desc: 'Turn every business card and networking event into a CRM relationship. Scan cards with AI vision and a contact lands in People instantly. Now a built-in tab — and still a home-screen companion app — with XP, levels, and badges that gamify your networking.',
    keywords: ['business card scanner', 'networking', 'AI vision', 'contact scanning'],
    benefits: [
      'AI-powered business card scanning into your CRM',
      'Lives as a tab in People and as a companion PWA',
      'Follow-up tracking and reminders',
      'Gamified networking with XP and badges',
    ],
  },
  {
    name: 'Booking page & My Card',
    slug: 'booking-page',
    icon: 'i-lucide-calendar-clock',
    pillar: 'people',
    desc: 'A public page that is both your profile and your scheduler: your CardDesk business card beside your real availability, so someone can read who you are and take a slot in the same breath. Booked meetings land on your calendar and turn into tasks. The page is signed by both wordmarks — yours, and Earnest small at the bottom.',
    keywords: ['booking page', 'scheduler', 'public profile', 'business card', 'availability'],
    benefits: [
      'Profile and scheduler on one public page, at your own slug',
      'Carries your CardDesk card — save-contact included',
      'Booked meetings become calendar events and tasks',
      'Signed by your studio first, Earnest second',
    ],
  },
  {
    name: 'Client Portal',
    slug: 'client-portal',
    icon: 'i-lucide-users-round',
    shot: 'client-portal',
    pillar: 'people',
    desc: 'Give every client their own login to see exactly what you choose — projects, tickets, invoices, proposals, contracts, social content, and marketing — under their own brand-matched experience. Multi-root accounts handle parent/subsidiary structures with inherited access, and clients can comment, approve, and react inline. Preview any client’s portal read-only, right from their record, to see it exactly as they do.',
    keywords: ['client portal', 'client login', 'project visibility', 'invoice approval', 'inherited permissions', 'preview as client'],
    benefits: [
      'Per-client login surfaces projects, tickets, invoices, proposals, and content',
      'Multi-root accounts with inherited access for parent/subsidiary structures',
      'Inline comments, reactions, and content approval keep feedback in-app',
      'Brand-matched chrome and a Submit-a-Ticket CTA make it feel like yours',
      'Preview any client’s portal read-only to see exactly what they see',
    ],
  },
  {
    name: 'Access Control',
    slug: 'client-access-control',
    icon: 'i-lucide-shield-check',
    pillar: 'people',
    desc: 'Role-based client visibility with team assignments and individual overrides. Owners and admins see everything. Managers and members see only the clients assigned to their teams — plus any individual access grants. A MINE / ALL toggle flips between your work and the whole org.',
    keywords: ['access control', 'permissions', 'team management', 'security', 'mine vs all'],
    benefits: [
      'Role-based visibility for clients and data',
      'Team assignments with individual overrides',
      'MINE / ALL scope toggle on every app',
      'Managers and members see only assigned clients',
    ],
  },

  // ─────────────────────────  WORK  ─────────────────────────
  {
    name: 'Workspaces',
    slug: 'workspaces',
    icon: 'i-lucide-app-window',
    pillar: 'work',
    desc: 'Every client and project gets a full workspace with parity tabs — Overview, Conversations, Tasks, Tickets, Time, Documents, Billing, Activity. An Earnest Notices banner flags what is overdue or off-track, and slide-over panels stack push/pop so you can drill from a list to a project to a contact without losing your place.',
    keywords: ['workspaces', 'client workspace', 'project workspace', 'slide-over', 'tabs'],
    benefits: [
      'Tab parity for clients and projects — same structure, predictable everywhere',
      'Earnest Notices flag overdue and off-track work up top',
      'Push/pop slide-over panels with iOS-style spring animations',
      'URL-bound stack — every slide-over is shareable and deep-linkable',
    ],
  },
  {
    name: 'Creative Approvals',
    slug: 'creative-approvals',
    icon: 'i-lucide-clipboard-check',
    pillar: 'work',
    desc: 'A board of work, out with a client at its own link. They open it with no login and no account, and mark each piece approved or ask for a change — with the note pinned to the artwork it is about. Rounds stack up and nothing is ever erased, so six weeks later you can still see who said what and when. The Approvals floor is a triage list grouped by who owes the next move, including when that is you. Included on every plan today.',
    keywords: ['creative approvals', 'client approval', 'proofing', 'design review', 'markup', 'sign-off'],
    benefits: [
      'A client link that needs no login and no seat',
      'Item-by-item approve or request-a-change, with pinned notes',
      'Rounds with un-erasable history — the whole trail survives',
      '@-mention someone into a thread without giving them a seat',
      'Triaged by who owes the next move — including you',
    ],
  },
  {
    name: 'QuickSend',
    slug: 'quicksend',
    icon: 'i-lucide-send',
    pillar: 'work',
    desc: 'Send work for approval in one press. Pick the files, pick who is approving, send — Earnest assembles the board, generates the client link and puts it in front of them, without you building a board first. The same door works for a content plan.',
    keywords: ['quicksend', 'send for approval', 'one press', 'client review'],
    benefits: [
      'From files to a client link in one press',
      'No board to assemble first — it is built for you',
      'Works for content plans as well as files',
      'Everything it sends lands on the Approvals floor like any board',
    ],
  },
  {
    name: 'Project Management',
    slug: 'project-management',
    icon: 'i-lucide-folder-kanban',
    pillar: 'work',
    desc: "Kanban boards, task lists, a timeline, tickets, file attachments, and a command-center project dashboard with stats, documents, billing, and activity feeds. Generate a full project timeline from a service template in one click. Your team always knows what's next.",
    keywords: ['project management', 'kanban', 'task management', 'tickets', 'team collaboration'],
    benefits: [
      'Kanban boards, task lists, tickets, and a timeline',
      'One-click "Generate Timeline" from a service template',
      'Project dashboard with stats, billing, and activity feeds',
      'File attachments and documents linked to the project',
    ],
  },
  {
    name: 'Quick Tasks & AI To-Dos',
    slug: 'quick-tasks-and-ai-to-dos',
    icon: 'i-lucide-check-square',
    pillar: 'work',
    desc: 'Personal task lists with AI-powered suggestions, day and week scheduling, motivational progress tracking, and confetti celebrations. Ask Earnest to generate task ideas based on your workload and brand context so nothing falls through the cracks.',
    keywords: ['task management', 'to-do list', 'AI tasks', 'personal productivity'],
    benefits: [
      'AI-suggested tasks based on your workload',
      'Day and week scheduling views',
      'Motivational progress tracking with celebrations',
      'Context-aware — uses your brand and business data',
    ],
  },
  {
    name: 'Calendar & Scheduling',
    slug: 'calendar-and-crm-hub',
    icon: 'i-lucide-calendar',
    pillar: 'work',
    desc: 'Calendar-first scheduling with meetings, follow-ups, and lead touchpoints on one view. Link meetings to your pipeline, auto-log CRM activities, and schedule directly from a project or lead. Google/Outlook sync, iCal feeds, public booking pages, and video built in.',
    keywords: ['calendar', 'scheduling', 'CRM calendar', 'booking', 'Google Calendar'],
    benefits: [
      'Meetings, follow-ups, and leads in one calendar',
      'Google/Outlook sync and iCal feeds',
      'Public booking pages for clients',
      'Auto-logs CRM activities from calendar events',
    ],
  },
  {
    name: 'Meetings & AI Recap',
    slug: 'meeting-ai-recap',
    icon: 'i-lucide-mic',
    pillar: 'work',
    desc: 'Every Earnest meeting room auto-records and transcribes live the moment the host joins — and the same Earnest is right there in the room, following the conversation as it happens. After the meeting it writes a recap with key decisions, action items, and a follow-up draft — promoted directly into tasks, lead activities, or a meeting note on the project. Live design review includes a Figma drawer and a shared annotation overlay.',
    keywords: ['meeting recording', 'transcription', 'ai recap', 'meeting notes', 'design review', 'live transcript'],
    benefits: [
      'Live transcript + the same Earnest in the room, following along',
      'Recap with decisions, action items, and follow-up draft',
      'Promote recap items to tasks in one click',
      'Live Figma drawer + shared annotation overlay for design review',
    ],
  },
  {
    name: 'Phone & Video',
    slug: 'phone-and-video',
    icon: 'i-lucide-video',
    pillar: 'work',
    desc: 'Twilio-powered calling and Daily.co video meetings linked to your CRM pipeline. Click-to-call contacts, record calls, host team video, and auto-log meetings as lead activities — all without leaving Earnest.',
    keywords: ['phone system', 'video calls', 'VoIP', 'Twilio', 'video meetings'],
    benefits: [
      'Click-to-call contacts directly from the CRM',
      'Video meetings with Daily.co integration',
      'Call recording and auto-logged activities',
      'Linked to your pipeline and lead activities',
    ],
  },
  {
    name: 'Time Tracking & Retainers',
    slug: 'retainer-content-studio',
    icon: 'i-lucide-timer',
    pillar: 'work',
    desc: 'Track time against any project and run hourly retainers as first-class projects with a live hour-pool meter on every entry. Time logged anywhere — including the Content Studio — bills against the retainer pool automatically, so every minute is tracked, billed, and reported.',
    keywords: ['time tracking', 'hourly retainer', 'retainer billing', 'hour pool'],
    benefits: [
      'Track time against projects, tickets, and tasks',
      'Hourly retainers as first-class projects with a live hour-pool meter',
      'Studio time bills against the retainer pool automatically',
      'Every minute tracked, billed, and reported',
    ],
  },
  {
    name: 'Service Offerings',
    slug: 'service-offerings',
    icon: 'i-lucide-package',
    pillar: 'work',
    desc: 'A per-org library of the services you actually sell — name, color, base price, deliverables, scope tree, and timeline. Pick a service on a project and Earnest seeds the events, tasks, deliverables, and pricing from your template. The AI Proposal Drafter uses the same library as its spine, so what you sell stays consistent across projects, proposals, and contracts.',
    keywords: ['service templates', 'service offerings', 'productized services', 'scope tree', 'deliverables'],
    benefits: [
      'Define what you sell once — service, color, base price, deliverables, scope tree',
      'Project creation seeds events, tasks, deliverables, and pricing',
      'Scope tree composes into proposals as a real editable card',
      'Proposals and contracts reuse the same library — always in sync',
    ],
  },

  // ─────────────────────────  MONEY  ─────────────────────────
  {
    name: 'Cash Flow & AR Aging',
    slug: 'cash-flow-ar-aging',
    icon: 'i-lucide-line-chart',
    pillar: 'money',
    desc: 'The Money app opens on cash flow: outstanding, overdue, billed-this-month, and collected — with a true AR aging bar (not-yet-due, 1–30, 31–60, 61–90, 90+). Unpaid invoices and recent expenses sit side by side, so you always know where the money is. This is real bookkeeping, not a billing afterthought.',
    keywords: ['cash flow', 'ar aging', 'accounts receivable', 'financial overview', 'bookkeeping'],
    benefits: [
      'Outstanding, overdue, billed, and collected at a glance',
      'AR aging buckets: not-yet-due, 1–30, 31–60, 61–90, 90+ days',
      'Unpaid invoices and recent expenses side by side',
      'A real financial picture, refreshed live from your data',
    ],
  },
  {
    name: 'Invoicing & Billing',
    slug: 'invoicing-and-billing',
    icon: 'i-lucide-receipt',
    pillar: 'money',
    desc: 'Send branded, themed invoices with rich line items — descriptions formatted with Tiptap, time-block tables pulled from your tracker, manual payment recording for cash/check/ACH, and automatic Stripe Connect processing for online payments. Public invoice pages, portal Pay buttons, and PDF export ship out of the box.',
    keywords: ['invoicing', 'billing', 'payments', 'Stripe', 'manual payments', 'line items'],
    benefits: [
      'Rich line items with formatted descriptions and embedded time-block tables',
      'Record manual payments (cash, check, ACH) alongside Stripe-processed ones',
      'Public invoice pages + portal Pay button for one-click client payment',
      'Themed PDF export and an emailable receipt on every payment',
      'Invoices reach the right people — billing contacts managed once, on the client',
    ],
  },
  {
    name: 'Accept Payments',
    slug: 'accept-payments',
    icon: 'i-lucide-wallet',
    pillar: 'money',
    desc: 'Stripe Connect Standard powers payment acceptance — your customers pay you direct, Earnest never touches the funds. One-click KYC onboarding, automatic payout management, and a "Manage on Stripe" link on every invoice keep the loop tight. Public invoice pages work for any anonymous payer; portal users get a Pay button right on their invoice list.',
    keywords: ['accept payments', 'stripe connect', 'payment processing', 'kyc', 'payouts'],
    benefits: [
      'Stripe Connect Standard — customers pay you direct, no platform middleman',
      'One-click KYC onboarding and automatic payout management',
      'Public invoice pages let anonymous payers pay without logging in',
      '"Manage on Stripe" link surfaces dashboard tools from each invoice',
    ],
  },
  {
    name: 'Expenses & Bank Sync',
    slug: 'bank-sync',
    icon: 'i-lucide-landmark',
    pillar: 'money',
    desc: 'Connect your business bank and credit-card accounts via Plaid and Earnest pulls transactions in automatically. Categorize expenses against projects and clients, match incoming deposits to outstanding invoices, and reconcile your books without leaving the app. The Expenses ledger keeps recurring costs like hosting and subscriptions in view.',
    keywords: ['bank sync', 'plaid', 'expenses', 'transaction sync', 'reconciliation', 'bookkeeping'],
    benefits: [
      'Connect bank + credit-card accounts via Plaid — transactions pull in automatically',
      'Expenses ledger categorizes costs against projects and clients',
      'Match deposits to outstanding invoices for one-click reconciliation',
      'Low-cost monthly add-on — pay only for the accounts you connect',
    ],
  },
  {
    name: 'Proposals & Contracts',
    slug: 'proposals-and-contracts',
    icon: 'i-lucide-file-signature',
    pillar: 'money',
    desc: 'Build proposals and contracts from a reusable block library — bios, terms, pricing, deliverables, NDAs — and ship them as official, branded documents. Convert a winning proposal to a contract in one click, then collect a typed signature through a public link with a full audit log (name, email, IP, timestamp).',
    keywords: ['proposals', 'contracts', 'e-signature', 'sales documents', 'pdf export'],
    benefits: [
      'Block library shared across proposals and contracts — never rewrite terms or pricing',
      'Branded document chrome renders your logo, address, and phone on every page',
      'One-click convert proposal → contract, with a public e-signature flow',
      'Audit log captures name, email, IP, and timestamp on every signature',
      'Track a proposal through its whole life — including cold and rejected — for the record',
    ],
  },
  {
    name: 'Money Pipeline',
    slug: 'money-pipeline',
    icon: 'i-lucide-target',
    pillar: 'money',
    desc: "See exactly where every dollar is — banked, owed, and still out there. One bar splits a contract's value into paid, outstanding, overdue, and not-yet-billed, at the project, client, and whole-studio level. A ranked “Hunt” list tells you who to chase first — biggest and oldest first — and a Revenue Certainty bar lays the whole picture end to end: banked → owed → in play → cold, most certain to most speculative.",
    keywords: ['money pipeline', 'financial clarity', 'accounts receivable', 'revenue certainty', 'cash collection', 'to hunt'],
    benefits: [
      'One bar — paid, outstanding, overdue, not-yet-billed — at the project, client, and org level',
      'A ranked Hunt list: who to chase first, by dollars × how overdue',
      'Revenue Certainty: banked → owed → in play → cold in a single graphic',
      'Partial payments counted honestly — only the unpaid remainder is money to chase',
    ],
  },
  {
    name: 'Pitch pages',
    slug: 'pitch-pages',
    icon: 'i-lucide-sparkles',
    pillar: 'money',
    desc: 'A pitch as its own page rather than an attachment, drafted with Earnest from what it already knows about the client. Share it as a link and the analytics behind that link — who opened it, how far they read, how many times they came back — sit behind a gate you control.',
    keywords: ['pitch page', 'proposal page', 'share link analytics', 'sales collateral'],
    benefits: [
      'A pitch that is a page, not a PDF nobody opens',
      'Drafted from the client context Earnest already holds',
      'Share-link analytics: opened, read depth, return visits',
      'Analytics gated — you decide who sees the numbers',
    ],
  },
  {
    name: 'Retainers → invoices',
    slug: 'retainer-to-invoice',
    icon: 'i-lucide-repeat',
    pillar: 'money',
    desc: 'A retainer that rolls into an invoice on its own schedule, with the hours logged against it already attached. Overage is visible before it becomes an awkward conversation, and the invoice is drafted rather than sent — like everything else that touches money, it waits for your tap.',
    keywords: ['retainer', 'recurring invoice', 'time tracking', 'overage', 'billing'],
    benefits: [
      'Retainers become invoices on schedule, with hours attached',
      'Overage surfaced before the conversation, not after',
      'The invoice is drafted — sending it is still your call',
      'Reconciles against Stripe payments as they land',
    ],
  },
  {
    name: 'Pursuit Tracking',
    slug: 'pursuit-pipeline',
    icon: 'i-lucide-flame',
    pillar: 'money',
    desc: "Track every pitch through its whole life — including the ones that go cold or get rejected. A pursuit timeline merges touchpoints and proposals into one story per lead, client, or contact; a pipeline board runs draft → sent → viewed → cold → won/lost with win-rate and loss-reason analytics; and a Pursuit Money block shows what's pitched, in play, gone cold, and won — so no deal ever slips away quietly.",
    keywords: ['pursuit', 'proposal pipeline', 'sales pipeline', 'cold deals', 'win rate', 'loss reasons', 'revive'],
    benefits: [
      'One pursuit timeline per lead / client / contact — touchpoints and proposals merged',
      'Pipeline board: draft → sent → viewed → cold → won/lost, with win-rate and loss reasons',
      'A derived “cold” state surfaces deals that went quiet — before you forget them',
      'Pursuit money at every scope: pitched, in play, cold (revivable), and won',
    ],
  },
  {
    name: 'Reusable Document Blocks',
    slug: 'document-blocks',
    icon: 'i-lucide-layout-template',
    pillar: 'money',
    desc: 'A per-org library of reusable blocks — bio, references, deliverables, terms, NDA, case studies — that compose into proposals and contracts via a drag-and-drop composer. Edit a block once and every document that references it stays in sync, or override inline for one-off changes.',
    keywords: ['document blocks', 'content library', 'proposal blocks', 'contract templates'],
    benefits: [
      'Per-org library of reusable content blocks',
      'Compose proposals and contracts with drag-and-drop blocks',
      'Edit once, propagate everywhere — or override inline per document',
      'Spans bio, references, terms, NDA, deliverables, and case studies',
    ],
  },
  {
    name: 'Document Themes',
    slug: 'document-themes',
    icon: 'i-lucide-palette',
    pillar: 'money',
    desc: 'Pick one theme on the org settings page and every invoice, proposal, and contract picks it up — including the PDF export and public payment + signing pages. Three themes ship out of the box: Classic (clean white sans-serif), Editorial (warm cream with a serif body), and Mono (minimal black-on-white with your brand accent).',
    keywords: ['document themes', 'branded documents', 'invoice templates', 'pdf themes'],
    benefits: [
      'One brand look across every invoice, proposal, and contract',
      'Three themes: Classic, Editorial (serif/cream), and Mono (with accent)',
      'Theme carries through to PDF export and public payment + signing pages',
      'Org-level setting — change once, every future document follows',
    ],
  },

  // ─────────────────────────  MARKETING  ─────────────────────────
  {
    name: 'Marketing Pulse',
    slug: 'marketing-ai-analyze',
    icon: 'i-lucide-radar',
    pillar: 'marketing',
    desc: 'The Marketing app opens on a Pulse: a marketing health score plus posts, email subscribers, social reach, and contacts at a glance. AI scans your whole business — contacts, social, email, clients, revenue — and returns actionable insights and multi-channel campaign plans. Analyze a single client or your whole organization in one click.',
    keywords: ['marketing analytics', 'marketing pulse', 'campaign planning', 'marketing AI'],
    benefits: [
      'A marketing health score with reach, subscribers, and contacts at a glance',
      'One-click analysis per client or organization-wide',
      'Multi-channel campaign plans generated from your data',
      'Actionable insights, not just dashboards',
    ],
  },
  {
    name: 'Marketing Recommendations',
    slug: 'marketing-recommendations',
    icon: 'i-lucide-megaphone',
    pillar: 'marketing',
    desc: 'Earnest watches your CRM, social, and email for signals — new leads, lapsed contacts, milestone moments — and proposes ready-to-send marketing touches as a feed of campaign cards. Push-button Do-all sends the whole sequence, with per-recipient personalization and a timeline of what is scheduled across email, LinkedIn, Instagram, and more.',
    keywords: ['marketing automation', 'campaign recommendations', 'marketing feed', 'personalization'],
    benefits: [
      'Campaign cards auto-detected from real signals — new leads, lapsed contacts, milestones',
      'Push-button Do-all sends the whole multi-touch sequence in one tap',
      'Per-recipient personalization with editable variants',
      'Timeline view across email, LinkedIn, Instagram, and more',
    ],
  },
  {
    name: 'Content Studio',
    slug: 'social-ai-generate',
    icon: 'i-lucide-palette',
    pillar: 'marketing',
    desc: 'Social posts and campaign emails share one studio — what is drafted, what is out for review, and what is planned next, in the order it happens. Three lenses look at the same content: River is the timeline, Approval groups by who owes the next move, Upcoming is what is dated ahead. Start from an example rather than an empty box, let Earnest draft in your brand voice, and send a whole batch to a client as one approval board. Emails can be test-sent to yourself first. ⚠️ Publishing straight to Instagram, LinkedIn, Facebook, TikTok and Threads is coming soon — today the studio takes it as far as approved and queued.',
    keywords: ['content studio', 'social media planning', 'AI content generation', 'content calendar', 'campaign email'],
    benefits: [
      'Posts and campaign emails in one place, on one timeline',
      'River, Approval and Upcoming — three lenses, same content',
      'A whole batch becomes one client approval board',
      'Test-send an email to yourself before anyone else sees it',
      'Publishing to the networks is coming soon — the send is still yours',
    ],
  },
  {
    name: 'Email Marketing AI',
    slug: 'email-marketing-ai',
    icon: 'i-lucide-mail',
    pillar: 'marketing',
    desc: 'Block-based newsletter builder with AI-powered content generation. Describe your email and get a complete template — subject line, sections, images, and copy — all tuned to your brand voice and audience.',
    keywords: ['email marketing', 'newsletter builder', 'AI email', 'email templates'],
    benefits: [
      'Block-based visual newsletter builder',
      'AI generates complete emails from a description',
      'Subject lines, copy, and images in one step',
      'Tuned to your brand voice and audience',
    ],
  },
  {
    name: 'Brand Awareness AI',
    slug: 'brand-awareness-ai',
    icon: 'i-lucide-palette',
    pillar: 'marketing',
    desc: 'Set brand direction, goals, target audience, and location per client. Every AI feature — from CRM analysis to social posts to email campaigns — uses this context to generate suggestions aligned with your positioning. Not generic advice. Your brand, your voice, your market.',
    keywords: ['brand management', 'brand voice', 'personalized AI', 'positioning'],
    benefits: [
      'Per-client brand direction and voice settings',
      'Every AI feature respects your positioning',
      'Target audience and market context built in',
      'No generic advice — always your brand, your voice',
    ],
  },

  // ─────────────────────────  ORG  ─────────────────────────
  {
    name: 'Brand & Strategy',
    slug: 'brand-strategy',
    icon: 'i-lucide-compass',
    pillar: 'org',
    desc: 'Your organization profile holds brand direction, goals, target audience, and location — the strategic context Earnest reads everywhere. Set it once on the Org overview and every app, every AI call, and every document inherits it.',
    keywords: ['brand strategy', 'organization profile', 'brand direction', 'positioning'],
    benefits: [
      'Brand direction, goals, audience, and location in one place',
      'Read by every AI feature across the platform',
      'Org snapshot: members, plan, status, and contact',
      'The strategic spine the whole platform runs on',
    ],
  },
  {
    name: 'Channels',
    slug: 'channels',
    icon: 'i-lucide-messages-square',
    pillar: 'chat',
    desc: 'A comms hub built for the work — a top-level app on the Earnest rail. Channels is a two-pane messenger: a roster of channels on one side, the conversation on the other, with unread read-state that keeps up as your team talks. Every channel attaches to the projects and clients it’s about, so context lives with the work instead of someone else’s inbox.',
    keywords: ['channels', 'team chat', 'messaging', 'comms', 'slack alternative'],
    benefits: [
      'Two-pane comms — a channel roster beside the conversation',
      'Real-time unread read-state across the whole roster',
      'Channels linked to the projects and clients they’re about',
      'A top-level app on the rail, always one tap away',
    ],
  },
  {
    name: 'Teams & Members',
    slug: 'team-channels',
    icon: 'i-lucide-users-2',
    pillar: 'chat',
    desc: 'Invite members, build teams, and assign clients per team so access is scoped to the people who should see it. Teams organize who works on what; the Channels app keeps their conversations attached to that work.',
    keywords: ['teams', 'members', 'roles', 'access', 'permissions'],
    benefits: [
      'Invite members and organize them into teams',
      'Assign clients to teams for scoped access',
      'Roles and permissions per member',
      'Pairs with Channels for team conversations',
    ],
  },
  {
    name: 'Whitelabel',
    slug: 'whitelabel',
    icon: 'i-lucide-eye-off',
    pillar: 'org',
    desc: 'A single org-level toggle hides "Powered by Earnest." across every client-facing surface — proposals, contracts, invoices, public sign pages, and the portal. Available on Studio, Agency, and Enterprise plans. Your brand, end to end.',
    keywords: ['whitelabel', 'white label', 'branding', 'agency branding'],
    benefits: [
      'Single toggle hides "Powered by Earnest." everywhere',
      'Covers proposals, contracts, invoices, portal, and public pages',
      'Plan-gated to Studio, Agency, and Enterprise',
      'Org-wide setting — no per-document configuration',
    ],
  },
  {
    name: 'Branded Email',
    slug: 'branded-email',
    icon: 'i-lucide-at-sign',
    pillar: 'org',
    desc: 'Send transactional and marketing email from your own brand shell. Org-level reply-to, mailing address, and footer flow into every send — invoices, proposal notifications, campaigns, newsletters — with CAN-SPAM compliance on marketing email handled automatically. A live preview shows exactly what recipients see.',
    keywords: ['branded email', 'transactional email', 'CAN-SPAM', 'email branding'],
    benefits: [
      'Org-level reply-to + mailing address + footer on every send',
      'CAN-SPAM compliance on marketing email handled automatically',
      'Live preview shows exactly what recipients see',
      '10+ ready-to-use templates across the platform',
    ],
  },
  {
    name: 'AI Token Management',
    slug: 'ai-token-management',
    icon: 'i-lucide-coins',
    pillar: 'org',
    desc: 'Admins control AI usage per member — set monthly budgets, toggle access on and off, and monitor usage across the team. Purchase token add-on packages when you need more. Full visibility into who uses what.',
    keywords: ['AI usage', 'token management', 'team admin', 'usage monitoring'],
    benefits: [
      'Per-member AI usage budgets and controls',
      'Toggle AI access on and off per user',
      'Monitor usage across the entire team',
      'Purchase additional token packages as needed',
    ],
  },
  {
    name: 'Files & storage',
    slug: 'files-and-storage',
    icon: 'i-lucide-folder',
    pillar: 'org',
    desc: 'A files floor inside your organization rather than a separate drive to keep in sync — folders per client and per project, with the documents Earnest generates landing where they belong. 25 GB on Solo, 100 GB on Studio, 500 GB on Agency, and extra storage available in 100 GB steps.',
    keywords: ['files', 'file storage', 'document management', 'folders', 'cloud storage'],
    benefits: [
      'A floor of Organization, not a second app to keep in sync',
      'Folders per client and per project, created as you go',
      '25 / 100 / 500 GB by plan, with 100 GB add-ons',
      'Generated documents land in the right folder on their own',
    ],
  },

  // ─────────────────────────  AI  ─────────────────────────
  {
    name: 'Focus — one door to Earnest',
    slug: 'focus',
    icon: 'i-lucide-door-open',
    pillar: 'earnest',
    desc: 'The header is three controls: search, your avatar, and “E.” — the door. It opens Focus full screen, and the chips it offers first are ranked for whatever you were just looking at, so asking from a project opens on that project. There is no docked sidebar any more; there is one door, and it already knows where you are standing. It greets you the same way every time: “I’m here. No rush. What’s the honest version of how things are right now?”',
    keywords: ['focus mode', 'ask earnest', 'ai assistant', 'contextual ai', 'llm', 'one door'],
    benefits: [
      'One control opens Focus full screen, from any screen',
      'Opening chips ranked for the record you were looking at',
      'Three faces: Reflect to think, Work beside a project, Mirror to look back',
      'An autonomy ring on the door shows what Earnest may do on its own',
    ],
  },
  {
    name: 'The Boardroom',
    slug: 'boardroom',
    icon: 'i-lucide-presentation',
    pillar: 'chat',
    desc: 'The same Earnest, sized up to a full room. Convene the board and it presents your whole organization as a live briefing: a read across People, Work, Money and Marketing, each slide ending in a decision already drafted against real numbers. Bring your team in to walk it together, and every session is saved to meeting minutes you can reopen.',
    keywords: ['boardroom', 'ai briefing', 'business review', 'multiplayer strategy', 'meeting minutes'],
    benefits: [
      'A live, presented briefing across every app',
      'Every slide ends in a decision, drafted against real numbers',
      'Convene the room with your team — live and multiplayer',
      'Saved to meeting minutes you can reopen anytime',
    ],
  },
  {
    name: 'AI Actions',
    slug: 'ai-actions',
    icon: 'i-lucide-wand-sparkles',
    pillar: 'ai',
    desc: 'Tell Earnest what to change — it does the work. Reschedule a project and watch every event and task shift automatically. Update a status, add a task, or change a deadline — all from a single sentence. No hunting through menus. Just say it, and a live confirmation shows exactly what changed.',
    keywords: ['ai actions', 'ai mutations', 'natural language updates', 'ai task management'],
    benefits: [
      'Reschedule a project — every linked event and task shifts automatically',
      'Update any field (status, priority, due date) with a sentence',
      'Add tasks from chat — linked to the current project or ticket',
      'Live confirmation shows exactly what changed',
    ],
  },
  {
    name: 'Context Broker',
    slug: 'ai-strategy-engine',
    icon: 'i-lucide-brain',
    pillar: 'ai',
    desc: 'The Context Broker is the engine that makes Earnest different. It assembles a live snapshot of your entire organization — clients, projects, invoices, deals, tickets, and brand direction — and feeds it to a real large language model — Anthropic’s Claude, on no-training terms — on every turn. That’s why Earnest reasons about your actual business instead of guessing from a blank prompt. A 3-tier cache (memory → snapshot → live query) keeps context fresh without burning tokens on redundant fetches.',
    keywords: ['AI strategy', 'context broker', 'business intelligence', 'llm', 'token efficiency'],
    benefits: [
      'A real language model, grounded in your live data — not a generic chatbot',
      'Organization-wide context assembled automatically for every AI call',
      '3-tier caching: in-memory, snapshot, live fallback',
      'Token-efficient — context is shared across all AI features',
    ],
  },
  {
    name: 'AI Proposal Drafter',
    slug: 'ai-proposal-drafter',
    icon: 'i-lucide-wand-2',
    pillar: 'ai',
    desc: "Hand the AI a lead and get back a complete proposal draft. The drafter pulls the lead's full context — contact, prior activities, sourced attribution, brief — uses your service templates as the spine, and slots in library blocks for terms, references, and deliverables. Outputs an editable composer so you stay in control of the final cut.",
    keywords: ['ai proposals', 'proposal generation', 'service templates', 'document automation'],
    benefits: [
      "Drafts a full proposal from a lead's context in one step",
      'Uses your service templates as the structural spine',
      'Pulls library blocks for standard terms, deliverables, and references',
      'Outputs an editable composer — never a black-box send',
    ],
  },
  {
    name: 'Pursuit Strategist',
    slug: 'ai-pursuit-strategist',
    icon: 'i-lucide-sparkles',
    pillar: 'ai',
    desc: "When a deal goes cold, Earnest reads its entire pursuit history — every touchpoint, every proposal, and why it likely stalled — and drafts a fresh re-approach: a short strategic read, a ready-to-send next touch that tries a different angle than what already failed, and an optional trimmed-proposal idea. One tap turns the suggestion into a real, logged touchpoint.",
    keywords: ['ai re-approach', 'cold deal revival', 'pursuit strategist', 'sales ai', 'follow-up', 'stalled deals'],
    benefits: [
      'Reads the full pursuit history — not a blank prompt',
      'Drafts a re-approach that tries a different angle than what already failed',
      'A ready-to-send next touch plus an optional smaller-scope proposal idea',
      'One tap turns the suggestion into a logged touchpoint',
    ],
  },
  {
    name: 'Transparent AI Costs',
    slug: 'ai-token-transparency',
    icon: 'i-lucide-gauge',
    pillar: 'ai',
    desc: 'Every AI feature shows its token cost before you use it, and admins see usage across the team. No surprises, no metered-billing anxiety — just clear, upfront numbers on what each action costs.',
    keywords: ['ai cost transparency', 'token cost', 'ai pricing', 'usage visibility'],
    benefits: [
      'Token cost shown before you run any AI action',
      'Plain-language estimates, not opaque metering',
      'Team-wide usage visibility for admins',
      'Self-serve refills when you need more',
    ],
  },

  // ─────────────────────────  DESIGN / SHELL / MOBILE  ─────────────────────────
  {
    name: 'The shell',
    slug: 'apps-layout',
    icon: 'i-lucide-layout-grid',
    pillar: 'looks',
    desc: 'One shell over the whole app: six circular chips on a floating rail — Dashboard, People, Work, Chat, Money, Mktg — with the Boardroom in its own footer group, and pill-segmented floor strips inside each app. The top chrome is deliberately three controls and nothing else: search, the “E.” door with its autonomy ring, and your avatar. Organization and Account live in the avatar menu rather than taking rail space; Files is a floor of Organization.',
    keywords: ['app shell', 'app rail', 'navigation', 'unified shell', 'app chips'],
    benefits: [
      'Six app chips on a floating rail, plus the Boardroom',
      'A three-control header — search, the Earnest door, your avatar',
      'Pill-segmented floor strips for in-app navigation',
      'Rail position and MINE / ALL scope both configurable',
    ],
  },
  {
    name: 'Looks, type & contrast',
    slug: 'appearance-palettes',
    icon: 'i-lucide-swatch-book',
    pillar: 'looks',
    desc: 'Three looks, and they are real redesigns rather than a colour swap. Glass is translucent surfaces and soft light. Paper is ink on linen — an editorial Didone, hairline rules, tracked caps. Clean is white on white, layered light, condensed caps and exactly one signal blue. Type (Sans, Condensed, Handwritten), colour (Default or Mono), an extra-contrast mode and the animated background each move on their own axis, and every combination is checked against a 210-pair contrast ratchet so no look can ship a stripe you cannot read.',
    keywords: ['appearance', 'looks', 'themes', 'glass', 'paper', 'clean', 'dark mode', 'accessibility contrast'],
    benefits: [
      'Glass, Paper and Clean — three genuinely different designs',
      'Type, colour and contrast on their own independent axes',
      'A 210-pair contrast ratchet checks every combination',
      'Animated background on or off, and a rich dark mode throughout',
    ],
  },
  {
    name: 'Native iOS Feel',
    slug: 'native-ios-navigation',
    icon: 'i-lucide-layers',
    pillar: 'design',
    desc: 'Earnest moves like a native iOS app. Detail surfaces open as slide-over panels that push/pop with a single spring curve — list context stays visible behind, the prior panel scales back and fades, and the URL travels with you so every layer is shareable. Bottom sheets with drag-to-dismiss cover create and edit flows; segmented pill controls and haptic taps round out the feel.',
    keywords: ['ios navigation', 'slide-over', 'panel stack', 'bottom sheet', 'spring animation', 'native feel'],
    benefits: [
      'Slide-over panels push/pop with a single spring curve',
      'Drag-to-dismiss bottom sheets for create + edit',
      'iOS segmented controls with a sliding pill + haptic feedback',
      'URL-bound stack — every panel is deep-linkable and shareable',
    ],
  },
  {
    name: 'Liquid Glass System',
    slug: 'liquid-glass-system',
    icon: 'i-lucide-square-stack',
    pillar: 'design',
    desc: 'Every surface is on a tier of frosted glass. Three system tiers — thin, standard, ultra — layer over an accent-tinted plinth so toolbars, sheets, dropdowns, tooltips, dialogs, and toasts all read as the same material. A hue-driven glass surface picks up the active app accent, so glass in Work feels different from glass in Marketing while staying coherent.',
    keywords: ['glass', 'frosted glass', 'liquid glass', 'backdrop blur', 'design system'],
    benefits: [
      'Three glass tiers applied universally to chrome',
      "Hue-driven glass picks up each app's accent",
      'Glass dialogs, dropdowns, sheets, and toasts',
      'Graceful fallback under prefers-reduced-transparency',
    ],
  },
  {
    name: 'River Timeline',
    slug: 'river-timeline',
    icon: 'i-lucide-waves',
    pillar: 'design',
    desc: 'A visual language for time-on-a-river — a horizontally-scrolling day strip with hour beds, channel-tinted leaves for each item, a temperature curve revealing rhythm gaps, and a glowing "now" indicator. Drives the social calendar, payments timeline, tasks workload, and campaign scheduling. Drag a leaf to reschedule.',
    keywords: ['river', 'timeline', 'calendar', 'workload', 'visualization', 'scheduling'],
    benefits: [
      'Day strip + hour beds with channel-tinted, accent-hued leaves',
      'Live temperature curve exposes rhythm gaps',
      'Drag-to-reschedule on the Content Studio',
      'Glowing "now" indicator anchors past vs. future',
    ],
  },
];

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

export function getFeaturesByPillar(pillar: PillarKey): Feature[] {
  return features.filter((f) => f.pillar === pillar);
}

export function getRelatedFeatures(slug: string, count = 3): Feature[] {
  const current = features.find((f) => f.slug === slug);
  if (!current) return features.slice(0, count);
  // Prefer same-pillar features; fall back to the rest.
  const samePillar = features.filter((f) => f.slug !== slug && f.pillar === current.pillar);
  const others = features.filter((f) => f.slug !== slug && f.pillar !== current.pillar);
  return [...samePillar, ...others].slice(0, count);
}

/**
 * Slugs captured by `scripts/capture-demo-screenshots.ts` in the `earnest` app
 * repo. The script writes each to `public/screenshots/<YYYY-MM>/<shot>.png` AND
 * `public/screenshots/latest/<shot>.png`; the site only ever reads `latest/`,
 * so it always shows the most recent capture regardless of month.
 *
 * ⚠️ Adding a slug here does NOT create a screenshot. Add the shot to `SHOTS`
 * in the capture script first, run it, and confirm the PNG landed — a slug with
 * no file behind it renders as a broken frame with nothing in the build to
 * catch it. The Verification section of the refresh plan has a grep for this.
 *
 * ⚠️ RETIRED 2026-09, and deliberately absent from this union: `presence-home`,
 * `command-center`, `ai-sidebar`, `social-inbox`, `social-analytics`,
 * `apps-rail`, `account-appearance`, `marketing-pulse`, `money-cashflow`. The
 * first six shot surfaces the app no longer has; the last three were declared
 * here for a re-capture that never happened and never had files behind them.
 *
 * The six PNGs are still ON DISK on purpose. The archived sell sheets
 * (`SellSheet{Modern,Glass,Director,Automation,Live}.vue`, all at noindex
 * routes) still render them, and deleting the files would swap a stale claim
 * for a broken image — which is worse. Dropping them from this union is what
 * stops anything NEW from pointing at them; the capture script no longer
 * refreshes them either.
 */
export type DemoShot =
  // HOME — the default home, its lenses and its Looks
  | 'home-v2'
  | 'home-v2-money'
  | 'home-v2-creative'
  | 'home-v2-projects'
  | 'home-v2-arrange'
  | 'home-v2-paper'
  | 'home-v2-clean'
  | 'money-paper'
  | 'appearance-panel'
  // EARNEST — the one door
  | 'focus-takeover'
  | 'focus-working'
  | 'focus-mirror'
  | 'ai-actions'
  // THE SHELL
  | 'shell-dock'
  // PEOPLE
  | 'people-dashboard'
  | 'contact-detail'
  | 'client-detail'
  | 'client-workspace'
  | 'carddesk'
  | 'client-portal'
  | 'booking-page'
  | 'pursuits-lens'
  | 'leads-pipeline'
  // WORK
  | 'project-timeline'
  | 'project-workspace'
  | 'project-documents'
  | 'tickets-kanban'
  | 'quick-tasks'
  | 'time-tracker'
  | 'scheduler-day'
  | 'approvals-floor'
  | 'approvals-board'
  | 'approvals-quicksend'
  // MONEY
  | 'financials-overview'
  | 'revenue-certainty'
  | 'proposal-pipeline'
  | 'pursuit-lead'
  | 'pursuit-reapproach'
  | 'proposals-composer'
  | 'proposals-preview'
  | 'contracts-list'
  | 'contracts-signed'
  | 'pitch-page'
  // MARKETING
  | 'marketing-overview'
  | 'marketing-recommendations'
  | 'studio-river'
  | 'studio-upcoming'
  // CHAT + BOARDROOM
  | 'channels-home'
  | 'director-presentation'
  | 'director-slides'
  // ORG (admin)
  | 'organization-overview'
  | 'organization-teams'
  | 'organization-branding'
  | 'team-detail'
  | 'documents-library'
  | 'files-floor';

interface DemoMapping {
  /** Path under `https://app.earnest.guru` to deep-link the "Try this live" CTA to. */
  path: string;
  /** Screenshot slug used on the feature page. */
  shot: DemoShot;
  /**
   * Which demo persona to sign the visitor into before redirecting. Default
   * is `solo` (Member role). Admin-only destinations (`/apps/organization`,
   * full `/apps/marketing`) should set this to `agency`.
   */
  persona?: 'solo' | 'agency';
}

const DEFAULT_DEMO: DemoMapping = { path: '/', shot: 'home-v2' };

/**
 * Per-feature demo mapping. `path` deep-links the "Try this live" CTA into the
 * running app; `shot` is the still shown on the feature page.
 *
 * ⚠️ Query-param names differ per app and are easy to get wrong: People uses
 * `?view=`, while Work, Money, Marketing and Organization use `?floor=`. A
 * wrong one silently lands on the app's default floor, which looks like the
 * feature does not exist.
 *
 * Features with no dedicated screen fall back to `DEFAULT_DEMO` — the home,
 * which is the broadest single view the Member-role demo user can see.
 */
const FEATURE_DEMO_MAP: Record<string, DemoMapping> = {
  // HOME
  'productivity-engine': { path: '/', shot: 'home-v2' },
  'home-lenses': { path: '/', shot: 'home-v2-money' },
  'earnest-score': { path: '/account?section=score', shot: 'home-v2' },
  'goal-suggestions': { path: '/account?section=goals', shot: 'home-v2' },
  'daily-digest': { path: '/account?section=notifications', shot: 'home-v2' },
  'spotlight-search': { path: '/', shot: 'shell-dock' },
  // PEOPLE
  'people-and-companies': { path: '/apps/clients', shot: 'people-dashboard' },
  'crm-intelligence': { path: '/apps/clients?view=pursuits', shot: 'pursuits-lens', persona: 'agency' },
  'people-intelligence': { path: '/apps/clients?view=intelligence', shot: 'people-dashboard' },
  'carddesk': { path: '/apps/clients?view=carddesk', shot: 'carddesk' },
  'booking-page': { path: '/account?section=profile', shot: 'booking-page', persona: 'agency' },
  'client-portal': { path: '/portal', shot: 'client-portal', persona: 'agency' },
  'client-access-control': { path: '/apps/organization?floor=teams', shot: 'organization-teams', persona: 'agency' },
  // WORK
  'workspaces': { path: '/apps/work', shot: 'project-workspace' },
  'creative-approvals': { path: '/apps/work?floor=approvals', shot: 'approvals-board', persona: 'agency' },
  'quicksend': { path: '/apps/work?floor=approvals', shot: 'approvals-quicksend', persona: 'agency' },
  'project-management': { path: '/apps/work', shot: 'project-workspace' },
  'quick-tasks-and-ai-to-dos': { path: '/apps/work?floor=tasks', shot: 'quick-tasks' },
  'calendar-and-crm-hub': { path: '/apps/work?floor=calendar', shot: 'scheduler-day' },
  'meeting-ai-recap': { path: '/apps/work?floor=meetings', shot: 'scheduler-day' },
  'phone-and-video': { path: '/apps/work?floor=meetings', shot: 'scheduler-day' },
  'retainer-content-studio': { path: '/apps/work?floor=time', shot: 'time-tracker' },
  'service-offerings': { path: '/apps/organization?floor=settings', shot: 'documents-library', persona: 'agency' },
  // MONEY
  'cash-flow-ar-aging': { path: '/apps/money', shot: 'financials-overview' },
  'invoicing-and-billing': { path: '/apps/money?floor=invoices', shot: 'financials-overview' },
  'accept-payments': { path: '/apps/money?floor=payments', shot: 'financials-overview' },
  'bank-sync': { path: '/apps/money?floor=expenses', shot: 'financials-overview' },
  'retainer-to-invoice': { path: '/apps/money?floor=invoices', shot: 'financials-overview' },
  'proposals-and-contracts': { path: '/apps/money?floor=documents', shot: 'proposals-preview' },
  'money-pipeline': { path: '/apps/money?floor=insights', shot: 'revenue-certainty', persona: 'agency' },
  'pitch-pages': { path: '/pitches', shot: 'pitch-page', persona: 'agency' },
  'pursuit-pipeline': { path: '/apps/money?floor=pipeline', shot: 'proposal-pipeline', persona: 'agency' },
  'ai-pursuit-strategist': { path: '/apps/clients?view=pursuits', shot: 'pursuit-reapproach', persona: 'agency' },
  'document-blocks': { path: '/apps/organization?floor=settings', shot: 'documents-library', persona: 'agency' },
  'document-themes': { path: '/apps/organization?floor=branding', shot: 'organization-branding', persona: 'agency' },
  // MARKETING
  'marketing-ai-analyze': { path: '/apps/marketing', shot: 'marketing-overview', persona: 'agency' },
  'marketing-recommendations': { path: '/apps/marketing', shot: 'marketing-recommendations', persona: 'agency' },
  'social-ai-generate': { path: '/apps/marketing?floor=studio&view=calendar', shot: 'studio-river', persona: 'agency' },
  'email-marketing-ai': { path: '/apps/marketing?floor=email', shot: 'studio-upcoming', persona: 'agency' },
  'brand-awareness-ai': { path: '/apps/organization?floor=branding', shot: 'organization-branding', persona: 'agency' },
  // CHAT + BOARDROOM
  channels: { path: '/apps/channels', shot: 'channels-home', persona: 'agency' },
  'team-channels': { path: '/apps/organization?floor=teams', shot: 'organization-teams', persona: 'agency' },
  boardroom: { path: '/boardroom', shot: 'director-presentation' },
  // ORG
  'brand-strategy': { path: '/apps/organization', shot: 'organization-overview', persona: 'agency' },
  'files-and-storage': { path: '/apps/organization?floor=files', shot: 'files-floor', persona: 'agency' },
  whitelabel: { path: '/apps/organization?floor=branding', shot: 'organization-branding', persona: 'agency' },
  'branded-email': { path: '/apps/organization?floor=branding', shot: 'organization-branding', persona: 'agency' },
  'ai-token-management': { path: '/apps/organization?floor=ai', shot: 'organization-overview', persona: 'agency' },
  // EARNEST — the one door
  focus: { path: '/', shot: 'focus-takeover' },
  'ai-actions': { path: '/apps/work', shot: 'ai-actions' },
  'ai-strategy-engine': { path: '/', shot: 'focus-mirror' },
  'ai-proposal-drafter': { path: '/apps/money?floor=documents', shot: 'proposals-composer' },
  'ai-token-transparency': { path: '/apps/organization?floor=ai', shot: 'organization-overview', persona: 'agency' },
  // LOOKS + SHELL
  'apps-layout': { path: '/apps/work', shot: 'shell-dock' },
  'appearance-palettes': { path: '/account?section=appearance', shot: 'appearance-panel' },
  'native-ios-navigation': { path: '/apps/clients', shot: 'client-workspace' },
  'liquid-glass-system': { path: '/', shot: 'home-v2' },
  'river-timeline': { path: '/apps/work?floor=tasks', shot: 'project-workspace' },
};

export function getFeatureDemo(slug: string): DemoMapping {
  return FEATURE_DEMO_MAP[slug] ?? DEFAULT_DEMO;
}

/** Screenshot URL under `/public` — the site reads from `latest/`. */
export function getScreenshotSrc(shot: DemoShot): string {
  return `/screenshots/latest/${shot}.png`;
}
