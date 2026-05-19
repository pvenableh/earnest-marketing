export interface Feature {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  keywords: string[];
  benefits: string[];
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const features: Feature[] = [
  {
    name: 'Apps Layout',
    slug: 'apps-layout',
    icon: 'i-lucide-layout-grid',
    desc: 'A unified shell — circular gradient app chips on a floating rail, a glass top chrome, and pill-segmented floor strips inside each app. Move between Work, Clients, Money, Marketing, and Organization without losing context. The palette tints the rail plinth so every app has its own visual home.',
    keywords: ['app layout', 'app rail', 'navigation', 'palette tint', 'unified shell', 'app chips'],
    benefits: [
      'Circular gradient app chips with palette-driven accents per app',
      'Glass top chrome with universal search, notifications, and AI launcher',
      'Pill-segmented floor strips for in-app navigation (Projects, Tasks, Tickets, etc.)',
      'Rail position is configurable — left, right, top, bottom, or floating',
    ],
  },
  {
    name: 'Workspaces',
    slug: 'workspaces',
    icon: 'i-lucide-app-window',
    desc: 'Every client and project gets a full workspace with parity tabs — Activity, Tasks, Tickets, Channels, Meetings, Invoices, Documents, Files. Slide-over panels stack push/pop with iOS-style spring animations, so you can drill from a list to a client to a contact without losing your place.',
    keywords: ['workspaces', 'client workspace', 'project workspace', 'slide-over', 'panel stack', 'iOS animation'],
    benefits: [
      '8-tab parity for clients and projects — same structure, predictable everywhere',
      'Push/pop slide-over panels with Framework7-style spring animations',
      'Cross-panel navigation — Client → Contact → Project keeps the trail',
      'URL-bound stack — every slide-over is shareable and deep-linkable',
    ],
  },
  {
    name: 'Productivity Engine',
    slug: 'productivity-engine',
    icon: 'i-lucide-zap',
    desc: 'Your command center. Scans tickets, projects, tasks, invoices, channels, social, deals, and goals — then surfaces prioritized actions, urgent items, and intelligent suggestions. No AI tokens needed — pure algorithmic intelligence that loads instantly every time you open Earnest.',
    keywords: ['productivity', 'task prioritization', 'command center', 'business dashboard'],
    benefits: [
      'Surfaces prioritized actions across every module',
      'Zero AI tokens — pure algorithmic intelligence',
      'Loads instantly on every session',
      'Scans tickets, projects, invoices, social, and goals automatically',
    ],
  },
  {
    name: 'CRM Intelligence',
    slug: 'crm-intelligence',
    icon: 'i-lucide-scan-search',
    desc: 'A drag-and-drop Kanban pipeline takes leads from first contact to closed-won (or captures why they were lost). AI overlays health scores, growth plans, and next-step recommendations so your team focuses on the deals that matter.',
    keywords: ['crm', 'pipeline', 'kanban', 'leads', 'deals', 'conversion', 'sales'],
    benefits: [
      'Drag-and-drop Kanban board: new → contacted → qualified → proposal → negotiating → won/lost',
      'Conversion celebrations and lost-reason capture modals',
      'AI-powered pipeline reviews, contact strategies, and growth plans',
      'Filter by assignee, priority, source, and date range',
    ],
  },
  {
    name: 'Health Snapshots',
    slug: 'health-snapshots',
    icon: 'i-lucide-activity',
    desc: 'Instant CRM and marketing health scores computed from your real data — no AI tokens, no waiting. Algorithmic analysis of contacts, revenue trends, overdue items, and pipeline health gives you a live pulse on your business the moment you open the dashboard.',
    keywords: ['health score', 'business analytics', 'dashboard', 'revenue trends'],
    benefits: [
      'Instant health scores with zero AI token cost',
      'Live pulse on contacts, revenue, and pipeline',
      'Tracks overdue items and trending metrics',
      'Available the moment you open your dashboard',
    ],
  },
  {
    name: 'Marketing AI Analyze',
    slug: 'marketing-ai-analyze',
    icon: 'i-lucide-bar-chart-3',
    desc: 'AI scans your entire business — contacts, social, email, clients, revenue — and returns a marketing health score, actionable insights, and multi-channel campaign plans. Analyze for a specific client or your whole organization. One click.',
    keywords: ['marketing analytics', 'campaign planning', 'marketing AI', 'business intelligence'],
    benefits: [
      'One-click marketing health assessment',
      'Multi-channel campaign plans generated from your data',
      'Analyze per client or organization-wide',
      'Actionable insights, not just dashboards',
    ],
  },
  {
    name: 'Marketing Recommendations',
    slug: 'marketing-recommendations',
    icon: 'i-lucide-megaphone',
    desc: 'Earnest watches your CRM, social, and email for signals — new leads, lapsed contacts, milestone moments — and proposes ready-to-send marketing touches as a feed of campaign cards. Push-button Do-all sends the whole sequence, with per-recipient personalization and a Gantt-style timeline of what is scheduled across email, LinkedIn, Instagram, and Twitter.',
    keywords: ['marketing automation', 'campaign recommendations', 'marketing feed', 'marketing timeline', 'lead reengagement', 'personalization'],
    benefits: [
      'Campaign cards auto-detected from real signals — new leads, lapsed contacts, milestones',
      'Push-button Do-all sends the whole multi-touch sequence in one tap',
      'Per-recipient personalization with editable variants on every touch',
      'Timeline view across email, LinkedIn, Instagram, and Twitter — past + scheduled in one Gantt',
    ],
  },
  {
    name: 'AI Strategy Engine',
    slug: 'ai-strategy-engine',
    icon: 'i-lucide-brain',
    desc: 'Earnest\'s Context Broker assembles a live snapshot of your entire organization — clients, projects, invoices, deals, tickets, and brand direction — then feeds it to every AI conversation. A 3-tier cache (memory → snapshot → live query) keeps context fresh without burning tokens on redundant fetches.',
    keywords: ['AI strategy', 'context broker', 'business intelligence', 'campaign generation', 'opportunity detection'],
    benefits: [
      'Organization-wide context assembled automatically for every AI call',
      '3-tier caching: in-memory (5 min), Directus snapshots (30 min), live fallback',
      'Brand-aware responses that respect your positioning and voice',
      'Token-efficient — context is shared across all AI features',
    ],
  },
  {
    name: 'Brand Awareness AI',
    slug: 'brand-awareness-ai',
    icon: 'i-lucide-palette',
    desc: 'Set brand direction, goals, target audience, and location per client. Every AI feature — from CRM analysis to social posts to email campaigns — uses this context to generate suggestions aligned with your positioning. Not generic advice. Your brand, your voice, your market.',
    keywords: ['brand management', 'brand voice', 'personalized AI', 'positioning'],
    benefits: [
      'Per-client brand direction and voice settings',
      'Every AI feature respects your positioning',
      'Target audience and market context built in',
      'No generic advice — always your brand, your voice',
    ],
  },
  {
    name: 'Social AI Generate',
    slug: 'social-ai-generate',
    icon: 'i-lucide-sparkles',
    desc: 'Schedule to Instagram, LinkedIn, Facebook, and Threads. AI generates platform-optimized posts, hashtags, and image suggestions — all informed by your brand direction and target audience — in seconds.',
    keywords: ['social media management', 'AI content generation', 'social scheduling', 'Instagram', 'LinkedIn'],
    benefits: [
      'Post to Instagram, LinkedIn, Facebook, and Threads',
      'AI generates platform-optimized content in seconds',
      'Hashtag and image suggestions included',
      'Brand-aware — uses your voice and audience context',
    ],
  },
  {
    name: 'Social Inbox',
    slug: 'social-inbox',
    icon: 'i-lucide-inbox',
    desc: 'A unified inbox for DMs, comment replies, and mentions across Facebook, Instagram, and Threads. One queue, per-platform filter, archived/active views — reply directly from the thread without bouncing between native apps.',
    keywords: ['social inbox', 'social DMs', 'social messaging', 'Instagram DMs', 'Facebook messenger', 'Threads', 'community management'],
    benefits: [
      'DMs, replies, and mentions unified in a single queue',
      'Filter by platform (Facebook, Instagram, Threads) and active vs. archived',
      'Reply inline from the thread view — no platform switching',
      'Archive resolved threads to keep your queue focused',
    ],
  },
  {
    name: 'Social Analytics',
    slug: 'social-analytics',
    icon: 'i-lucide-trending-up',
    desc: 'Followers, reach, impressions, and engagement-rate trends per account or rolled up across every connected platform. Filter by client, pick a 7/14/30/90-day window, and see your top-performing posts surfaced automatically.',
    keywords: ['social analytics', 'social media analytics', 'engagement rate', 'follower growth', 'top posts', 'Instagram analytics', 'Meta analytics'],
    benefits: [
      'Followers, reach, impressions, and engagement-rate over time',
      'Filter by client or roll up every connected account',
      '7, 14, 30, or 90-day windows with daily breakdowns',
      'Top-performing posts surfaced automatically',
    ],
  },
  {
    name: 'Email Marketing AI',
    slug: 'email-marketing-ai',
    icon: 'i-lucide-mail',
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
    name: 'Goal Suggestions',
    slug: 'goal-suggestions',
    icon: 'i-lucide-target',
    desc: 'AI suggests strategic goals based on your actual data, brand direction, and business objectives — financial, networking, performance, marketing, or custom. Track progress with periodic snapshots and let the productivity engine factor your goals into daily priorities.',
    keywords: ['goal tracking', 'OKRs', 'business goals', 'strategic planning'],
    benefits: [
      'AI-suggested goals from your real business data',
      'Financial, networking, performance, and marketing categories',
      'Progress tracking with periodic snapshots',
      'Goals feed into your daily productivity priorities',
    ],
  },
  {
    name: 'Project Management',
    slug: 'project-management',
    icon: 'i-lucide-folder-kanban',
    desc: "Kanban boards, task lists, timelines, file attachments, and a command-center project dashboard with stats, document uploads, invoices, and activity feeds. Your team always knows what's next.",
    keywords: ['project management', 'kanban', 'task management', 'team collaboration'],
    benefits: [
      'Kanban boards, task lists, and timelines',
      'File attachments and document uploads',
      'Project dashboard with stats and activity feeds',
      'Invoicing linked directly to projects',
    ],
  },
  {
    name: 'People & Companies',
    slug: 'people-and-companies',
    icon: 'i-lucide-building-2',
    desc: 'Every person and company in one unified CRM — clients, contacts, prospects, and networking connections from CardDesk. Brand context, goals, services, and the full history of every conversation and project.',
    keywords: ['CRM', 'contact management', 'client management', 'business contacts'],
    benefits: [
      'Unified view of clients, contacts, and prospects',
      'Full conversation and project history per contact',
      'Brand context and goals per client',
      'CardDesk networking connections integrated',
    ],
  },
  {
    name: 'Quick Tasks & AI To-Dos',
    slug: 'quick-tasks-and-ai-to-dos',
    icon: 'i-lucide-check-square',
    desc: 'Personal task lists with AI-powered suggestions, day and week scheduling, motivational progress tracking, and confetti celebrations. AI generates task ideas based on your workload and brand context so nothing falls through the cracks.',
    keywords: ['task management', 'to-do list', 'AI tasks', 'personal productivity'],
    benefits: [
      'AI-suggested tasks based on your workload',
      'Day and week scheduling views',
      'Motivational progress tracking',
      'Context-aware — uses your brand and business data',
    ],
  },
  {
    name: 'AI Token Management',
    slug: 'ai-token-management',
    icon: 'i-lucide-coins',
    desc: 'Admins control AI usage per member — set monthly budgets, toggle access on and off, monitor usage across the team. Purchase token add-on packages when you need more. Full visibility into who uses what.',
    keywords: ['AI usage', 'token management', 'team admin', 'usage monitoring'],
    benefits: [
      'Per-member AI usage budgets and controls',
      'Toggle AI access on and off per user',
      'Monitor usage across the entire team',
      'Purchase additional token packages as needed',
    ],
  },
  {
    name: 'Client Access Control',
    slug: 'client-access-control',
    icon: 'i-lucide-shield-check',
    desc: 'Role-based client visibility with team assignments and individual overrides. Owners and admins see everything. Managers and members see only the clients assigned to their teams — plus any individual access grants.',
    keywords: ['access control', 'permissions', 'team management', 'security'],
    benefits: [
      'Role-based visibility for clients and data',
      'Team assignments with individual overrides',
      'Owners and admins have full access',
      'Managers and members see only assigned clients',
    ],
  },
  {
    name: 'Invoicing & Billing',
    slug: 'invoicing-and-billing',
    icon: 'i-lucide-receipt',
    desc: 'Send branded, themed invoices with rich line items — descriptions formatted with Tiptap, time-block tables pulled from your tracker, manual payment recording for cash/check/ACH, and automatic Stripe Connect processing for online payments. Public invoice pages, portal Pay buttons, and PDF export ship out of the box.',
    keywords: ['invoicing', 'billing', 'payments', 'Stripe', 'manual payments', 'time tracking', 'line items', 'payment recording'],
    benefits: [
      'Rich line items with formatted descriptions and embedded time-block tables',
      'Record manual payments (cash, check, ACH) alongside Stripe-processed ones',
      'Public invoice pages + portal Pay button for one-click client payment',
      'Themed PDF export and an emailable receipt on every payment',
    ],
  },
  {
    name: 'Contracts & E-Signing',
    slug: 'contracts',
    icon: 'i-lucide-file-signature',
    desc: 'Send branded contracts and collect typed signatures without a third-party tab. Convert any won proposal into a contract in one click, share a public sign link, and capture a signature audit log (name, email, IP, timestamp). Lives in the same document system as proposals — same blocks, same branding, same footer.',
    keywords: ['contracts', 'e-signing', 'electronic signature', 'agreements', 'document signing'],
    benefits: [
      'Convert any won proposal into a contract in one click',
      'Public sign link with typed signature — no third-party dependency',
      'Audit log captures name, email, IP, and timestamp on every signature',
      'Same document system as proposals — reuse blocks, branding, and footer',
    ],
  },
  {
    name: 'AI Proposal Drafter',
    slug: 'ai-proposal-drafter',
    icon: 'i-lucide-wand-2',
    desc: 'Hand the AI a lead and get back a complete proposal draft. The drafter pulls the lead\'s full context — contact, prior activities, sourced attribution, brief — uses your service templates as the spine, and slots in library blocks for terms, references, and deliverables. Outputs an editable BlockComposer so you stay in control of the final cut.',
    keywords: ['ai proposals', 'proposal generation', 'service templates', 'sales automation', 'document automation'],
    benefits: [
      'Drafts a full proposal from a lead\'s context in one step',
      'Uses your service templates as the structural spine',
      'Pulls library blocks for standard terms, deliverables, and references',
      'Outputs an editable composer — never a black-box send',
    ],
  },
  {
    name: 'Reusable Document Blocks',
    slug: 'document-blocks',
    icon: 'i-lucide-layout-template',
    desc: 'A per-org library of reusable blocks — bio, references, deliverables, terms, NDA, case studies — that compose into proposals and contracts via a drag-and-drop composer. Edit a block once and every document that references it stays in sync, or override inline for one-off changes.',
    keywords: ['document blocks', 'content library', 'proposal blocks', 'contract templates', 'reusable content'],
    benefits: [
      'Per-org library of reusable content blocks',
      'Compose proposals and contracts with drag-and-drop blocks',
      'Edit once, propagate everywhere — or override inline per document',
      'Library spans bio, references, terms, NDA, deliverables, and case studies',
    ],
  },
  {
    name: 'Whitelabel',
    slug: 'whitelabel',
    icon: 'i-lucide-eye-off',
    desc: 'A single org-level toggle hides "Powered by Earnest." across every client-facing surface — proposals, contracts, invoices, public sign pages. Available on Studio, Agency, and Enterprise plans. Your brand, end to end.',
    keywords: ['whitelabel', 'white label', 'branding', 'agency branding', 'remove powered by'],
    benefits: [
      'Single toggle hides "Powered by Earnest." everywhere',
      'Covers proposals, contracts, invoices, and public sign pages',
      'Plan-gated to Studio, Agency, and Enterprise',
      'Org-wide setting — no per-document configuration needed',
    ],
  },
  {
    name: 'Team Channels',
    slug: 'team-channels',
    icon: 'i-lucide-message-square',
    desc: "Slack-style messaging built into your workspace. Conversations stay with the work they're about.",
    keywords: ['team chat', 'messaging', 'team communication', 'channels'],
    benefits: [
      'Slack-style channels built into Earnest',
      'Conversations linked to projects and clients',
      'No context switching between tools',
      'Real-time messaging for your whole team',
    ],
  },
  {
    name: 'Phone & Video',
    slug: 'phone-and-video',
    icon: 'i-lucide-video',
    desc: 'Twilio-powered calling and Daily.co video meetings linked to your CRM pipeline. Click-to-call contacts, record calls, host team video, and auto-log meetings as lead activities — all without leaving Earnest.',
    keywords: ['phone system', 'video calls', 'VoIP', 'Twilio', 'video meetings'],
    benefits: [
      'Click-to-call contacts directly from CRM',
      'Video meetings with Daily.co integration',
      'Call recording and auto-logged activities',
      'Linked to your pipeline and lead activities',
    ],
  },
  {
    name: 'Calendar & CRM Hub',
    slug: 'calendar-and-crm-hub',
    icon: 'i-lucide-calendar',
    desc: 'Calendar-first scheduling with meetings, follow-ups, and lead touchpoints on one view. Link meetings to your pipeline, auto-log CRM activities, and schedule directly from lead profiles. Google/Outlook sync, iCal feeds, public booking pages, and Daily.co video built in.',
    keywords: ['calendar', 'scheduling', 'CRM calendar', 'booking', 'Google Calendar'],
    benefits: [
      'Meetings, follow-ups, and leads in one calendar',
      'Google/Outlook sync and iCal feeds',
      'Public booking pages for clients',
      'Auto-logs CRM activities from calendar events',
    ],
  },
  {
    name: 'CardDesk',
    slug: 'carddesk',
    icon: 'i-lucide-credit-card',
    desc: 'Turn every business card and networking event into a CRM relationship. Scan cards with AI vision, track follow-ups, and gamify your networking with XP, levels, and badges.',
    keywords: ['business card scanner', 'networking', 'AI vision', 'contact scanning'],
    benefits: [
      'AI-powered business card scanning',
      'Instantly creates CRM contacts from cards',
      'Follow-up tracking and reminders',
      'Gamified networking with XP and badges',
    ],
  },
  {
    name: 'Contextual AI Sidebar',
    slug: 'contextual-ai-sidebar',
    icon: 'i-lucide-message-square-more',
    desc: 'Every client, project, invoice, and lead gets its own AI assistant. The sidebar sees the entity you\'re working on and pulls in relevant context — past conversations, open tasks, billing history — so you get answers without switching tabs or re-explaining.',
    keywords: ['ai sidebar', 'contextual chat', 'entity ai', 'scoped assistant', 'ai notes'],
    benefits: [
      'Entity-scoped chat sessions persist across visits',
      'Smart prompt suggestions adapt to the entity type',
      'Save AI responses as notes directly on the record',
      'Feedback loop (thumbs up/down) improves suggestions over time',
    ],
  },
  {
    name: 'AI Actions',
    slug: 'ai-actions',
    icon: 'i-lucide-wand-sparkles',
    desc: 'Tell Earnest what to change — it does the work. Reschedule a project and watch every event and task shift automatically. Update a status, add a task, or change a deadline — all from a single sentence in the AI sidebar. No hunting through menus. Just say it.',
    keywords: ['ai actions', 'ai mutations', 'ai reschedule', 'natural language updates', 'ai task management'],
    benefits: [
      'Reschedule a project — every linked event and task shifts automatically',
      'Update any field (status, priority, due date) with a sentence',
      'Add tasks directly from the chat — linked to the current project or ticket',
      'Live confirmation shows exactly what changed and how many records were updated',
    ],
  },
  {
    name: 'Earnest Score',
    slug: 'earnest-score',
    icon: 'i-lucide-trophy',
    desc: 'The Earnest Score tracks six dimensions of team performance — follow-through, consistency, responsiveness, proactivity, depth, and CRM activity — and distills them into a single daily score. Levels, streaks, and 14 unlockable badges turn good habits into visible momentum.',
    keywords: ['gamification', 'team score', 'badges', 'streaks', 'leaderboard', 'productivity'],
    benefits: [
      'Six-dimension scoring: Follow-Through, Consistency, Responsiveness, Proactivity, Depth, CRM',
      '9 levels from Spark to Cornerstone with EP-based progression',
      '14 badges celebrating milestones like 100-day streaks and first deal closed',
      'Team leaderboard and daily history charts for trend visibility',
    ],
  },
  {
    name: 'Earnest Companion (E\u00B2)',
    slug: 'earnest-companion',
    icon: 'i-lucide-smartphone',
    desc: 'Your business in your pocket. Tasks, messages, contacts, and AI on the go — a mobile-first companion that keeps you connected to everything in Earnest.',
    keywords: ['mobile app', 'companion app', 'mobile CRM', 'business on the go'],
    benefits: [
      'Full access to tasks, messages, and contacts on mobile',
      'AI features available on the go',
      'Mobile-first design for quick actions',
      'Stay connected to your entire business anywhere',
    ],
  },
  {
    name: 'Proposals & Contracts',
    slug: 'proposals-and-contracts',
    icon: 'i-lucide-file-signature',
    desc: 'Build proposals and contracts from a reusable block library — bios, terms, pricing, deliverables, NDAs — and ship them as official, branded documents. Convert a winning proposal to a contract in one click, then collect a signature through a public link with a token.',
    keywords: ['proposals', 'contracts', 'document blocks', 'e-signature', 'sales documents', 'pdf export'],
    benefits: [
      'Block library shared across proposals and contracts so you never rewrite terms or pricing',
      'Branded document chrome — your logo, address, and phone — render on every page',
      'One-click convert proposal → contract, with a public e-signature flow',
      'PDF export and a cover-page layout for first impressions that match your brand',
    ],
  },
  {
    name: 'Document Themes',
    slug: 'document-themes',
    icon: 'i-lucide-palette',
    desc: 'Pick one theme on the org settings page and every invoice, proposal, and contract you send picks it up — including the PDF export and the public payment + signing pages. Three themes ship out of the box: Classic (clean white sans-serif), Editorial (warm cream with a serif body), and Mono (minimal black-on-white with your brand accent color).',
    keywords: ['document themes', 'branded documents', 'invoice templates', 'proposal templates', 'pdf themes', 'brand consistency'],
    benefits: [
      'One brand look applied across every invoice, proposal, and contract',
      'Three themes: Classic, Editorial (serif/cream), and Mono (with accent color)',
      'Theme carries through to PDF export and public payment + signing pages',
      'Org-level setting — change once, every future document follows',
    ],
  },
  {
    name: 'Client Portal',
    slug: 'client-portal',
    icon: 'i-lucide-users-round',
    desc: 'Give every client their own login to see exactly what you choose — projects, tickets, invoices, proposals, contracts, social content, and marketing activity — all under their own brand-matched experience. Multi-root accounts handle parent/subsidiary structures with inherited access, and clients can comment, approve, and react inline so the back-and-forth stays in one place.',
    keywords: ['client portal', 'client login', 'project visibility', 'client collaboration', 'invoice approval', 'multi-tenant access', 'inherited permissions'],
    benefits: [
      'Per-client login surfaces projects, tickets, invoices, proposals, contracts, and content',
      'Multi-root accounts with inherited access for parent/subsidiary client structures',
      'Inline comments, reactions, and content approval keep client feedback in-app',
      'Brand-matched chrome and a Submit-a-Ticket CTA make the portal feel like yours',
    ],
  },
  {
    name: 'Meeting Recording & AI Recap',
    slug: 'meeting-ai-recap',
    icon: 'i-lucide-mic',
    desc: 'Every Earnest meeting room auto-records and transcribes the moment the host joins. After the meeting, AI generates a recap with key decisions, action items, and a follow-up draft — promoted directly into tasks, lead activities, or a meeting note attached to the project. Live design review tools include a Figma frame drawer and an annotation overlay shared by every attendee in real time.',
    keywords: ['meeting recording', 'meeting transcription', 'ai recap', 'meeting notes', 'design review', 'live annotation', 'figma embed'],
    benefits: [
      'Auto-record + auto-transcribe — host joining is all it takes',
      'AI recap with decisions, action items, and follow-up draft — promoted to tasks in one click',
      'Live Figma drawer + shared annotation overlay for real-time design review',
      'Recap and transcript land on the linked project, lead, or client automatically',
    ],
  },
  {
    name: 'Branded Email',
    slug: 'branded-email',
    icon: 'i-lucide-mail',
    desc: 'Send transactional and marketing email from your own brand shell. Org-level reply-to, mailing address, and footer flow into every send — invoices, proposal notifications, marketing campaigns, newsletters — with CAN-SPAM compliance on marketing email handled automatically. Live preview iframe on the settings page shows exactly what recipients will see.',
    keywords: ['branded email', 'transactional email', 'marketing email', 'CAN-SPAM', 'email branding', 'email templates'],
    benefits: [
      'Org-level reply-to + mailing address + footer flow into every send',
      'CAN-SPAM compliance on marketing email handled automatically',
      'Live preview iframe shows exactly what recipients see',
      '10+ ready-to-use templates: invoices, proposals, contracts, marketing, newsletters',
    ],
  },
  {
    name: 'Service Offerings',
    slug: 'service-offerings',
    icon: 'i-lucide-package',
    desc: 'A per-org library of the services you actually sell — name, color, base price, deliverables, scope tree, and timeline. Pick a service on a project and Earnest seeds the events, tasks, deliverables, and pricing from your template. The AI Proposal Drafter uses the same library as the structural spine, so what you sell stays consistent across projects, proposals, and contracts.',
    keywords: ['service templates', 'service offerings', 'productized services', 'scope tree', 'deliverables', 'project templates', 'agency services'],
    benefits: [
      'Define what you sell once — service, color, base price, deliverables, scope tree',
      'Project creation seeds events, tasks, deliverables, and pricing from the template',
      'Scope tree primitive composes into proposals as a real editable card, not free text',
      'AI Proposal Drafter uses the same library — services, proposals, and contracts stay in sync',
    ],
  },
  {
    name: 'Bank Sync',
    slug: 'bank-sync',
    icon: 'i-lucide-landmark',
    desc: 'Connect your business bank and credit-card accounts via Plaid and Earnest pulls in transactions automatically. Match incoming deposits to outstanding invoices, categorize expenses against projects, and reconcile your books without leaving the app. Available as a low-cost add-on on paid plans.',
    keywords: ['bank sync', 'plaid', 'bank integration', 'transaction sync', 'expense tracking', 'reconciliation', 'bookkeeping'],
    benefits: [
      'Connect bank + credit-card accounts via Plaid — transactions pull in automatically',
      'Match deposits to outstanding invoices for one-click payment reconciliation',
      'Categorize expenses against projects and clients for accurate profitability',
      'Low-cost monthly add-on — pay only for the accounts you connect',
    ],
  },
  {
    name: 'Accept Payments',
    slug: 'accept-payments',
    icon: 'i-lucide-credit-card',
    desc: 'Stripe Connect Standard powers payment acceptance — your customers pay you direct, Earnest never touches the funds. One-click KYC onboarding, automatic payout management, and a "Manage on Stripe" link on every invoice keep the loop tight. Public invoice pages work for any anonymous payer; portal users see a Pay button right on their invoice list.',
    keywords: ['accept payments', 'stripe connect', 'payment processing', 'kyc', 'payouts', 'public invoice', 'portal payments'],
    benefits: [
      'Stripe Connect Standard — customers pay you direct, no platform middleman',
      'One-click KYC onboarding and automatic payout management',
      'Public invoice pages let anonymous payers pay without logging in',
      '"Manage on Stripe" link surfaces all the dashboard tools right from each invoice',
    ],
  },
  {
    name: 'Retainer & Content Studio',
    slug: 'retainer-content-studio',
    icon: 'i-lucide-infinity',
    desc: 'Run hourly retainers as first-class projects with a live hour-pool meter on every time entry. Pair it with Social Content Studio: draft, schedule, get client approval through the portal, and auto-publish through your connected accounts. Time logged in the Studio bills against the retainer hour pool automatically — so every minute of content work is tracked, billed, and reported.',
    keywords: ['hourly retainer', 'retainer billing', 'social content', 'content calendar', 'client approval', 'social scheduling', 'content studio'],
    benefits: [
      'Hourly retainers as first-class projects with a live hour-pool meter',
      'Content Studio: draft, schedule, and auto-publish across Facebook, Instagram, LinkedIn, TikTok, Threads',
      'Client approval through the portal — one-click approve from email or login',
      'Time logged in the Studio bills against the retainer hour pool automatically',
    ],
  },
];

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

export function getRelatedFeatures(slug: string, count = 3): Feature[] {
  const current = features.find((f) => f.slug === slug);
  if (!current) return features.slice(0, count);
  const others = features.filter((f) => f.slug !== slug);
  // Simple shuffle and take first N
  return others.sort(() => 0.5 - Math.random()).slice(0, count);
}

/**
 * Slugs captured by scripts/capture-demo-screenshots.ts in the `earnest` app
 * repo. The capture script writes each to
 * public/screenshots/<YYYY-MM>/<shot>.png AND public/screenshots/latest/<shot>.png.
 * The `latest/` mirror is what feature pages read from, so the site always
 * shows the most recent capture regardless of month.
 */
export type DemoShot =
  // Solo (Member role)
  | 'command-center'
  | 'leads-pipeline'
  | 'contact-detail'
  | 'client-detail'
  | 'project-timeline'
  | 'tickets-kanban'
  | 'financials-overview'
  | 'people-dashboard'
  | 'scheduler-day'
  | 'quick-tasks'
  | 'time-tracker'
  | 'proposals-composer'
  | 'proposals-preview'
  | 'contracts-list'
  | 'contracts-signed'
  | 'ai-sidebar'
  | 'ai-actions'
  // Apps Layout — new unified shell (post 2026-05-15)
  | 'apps-rail'
  | 'client-workspace'
  | 'project-workspace'
  | 'project-documents'
  | 'carddesk'
  // Agency (Admin role) — unlocked in demo v2
  | 'marketing-overview'
  | 'marketing-recommendations'
  | 'social-inbox'
  | 'social-analytics'
  | 'organization-overview'
  | 'organization-teams'
  | 'organization-branding'
  | 'team-detail'
  | 'documents-library';

interface DemoMapping {
  /** Path under `https://app.earnest.guru` to deep-link the "Try this live" CTA to. */
  path: string;
  /** Screenshot slug used on the feature page. */
  shot: DemoShot;
  /**
   * Which demo persona to sign the visitor into before redirecting. Default
   * is `solo` (Member role). Admin-only destinations (`/organization/*`,
   * `/teams/*`, full `/marketing`) should set this to `agency` so the
   * redirect doesn't land on a 403.
   */
  persona?: 'solo' | 'agency';
}

const DEFAULT_DEMO: DemoMapping = { path: '/command-center', shot: 'command-center' };

/**
 * Per-feature demo mapping. Features without a dedicated screen fall back to
 * the command-center overview, which is the broadest single-page view the
 * Member-role demo user can see.
 */
const FEATURE_DEMO_MAP: Record<string, DemoMapping> = {
  'productivity-engine': { path: '/command-center', shot: 'command-center' },
  'crm-intelligence': { path: '/leads', shot: 'leads-pipeline' },
  'health-snapshots': { path: '/people', shot: 'people-dashboard' },
  'marketing-ai-analyze': { path: '/marketing', shot: 'marketing-overview', persona: 'agency' },
  'marketing-recommendations': { path: '/marketing', shot: 'marketing-recommendations', persona: 'agency' },
  'ai-strategy-engine': { path: '/command-center', shot: 'command-center' },
  'brand-awareness-ai': { path: '/command-center', shot: 'command-center' },
  'social-ai-generate': { path: '/command-center', shot: 'command-center' },
  'social-inbox': { path: '/social/inbox', shot: 'social-inbox', persona: 'agency' },
  'social-analytics': { path: '/social/analytics', shot: 'social-analytics', persona: 'agency' },
  'email-marketing-ai': { path: '/marketing', shot: 'marketing-overview', persona: 'agency' },
  'goal-suggestions': { path: '/command-center', shot: 'command-center' },
  'project-management': { path: '/apps/work', shot: 'project-workspace' },
  'people-and-companies': { path: '/people', shot: 'people-dashboard' },
  'quick-tasks-and-ai-to-dos': { path: '/tasks', shot: 'quick-tasks' },
  'ai-token-management': { path: '/command-center', shot: 'command-center' },
  'client-access-control': { path: '/organization/teams', shot: 'organization-teams', persona: 'agency' },
  'invoicing-and-billing': { path: '/financials', shot: 'financials-overview' },
  'contracts': { path: '/contracts', shot: 'contracts-list' },
  'ai-proposal-drafter': { path: '/proposals', shot: 'proposals-composer' },
  'document-blocks': { path: '/organization/documents-library', shot: 'documents-library', persona: 'agency' },
  'whitelabel': { path: '/organization', shot: 'organization-branding', persona: 'agency' },
  'team-channels': { path: '/command-center', shot: 'command-center' },
  'phone-and-video': { path: '/command-center', shot: 'command-center' },
  'calendar-and-crm-hub': { path: '/scheduler', shot: 'scheduler-day' },
  'carddesk': { path: '/carddesk', shot: 'carddesk' },
  'contextual-ai-sidebar': { path: '/clients', shot: 'ai-sidebar' },
  'ai-actions': { path: '/projects', shot: 'ai-actions' },
  'earnest-score': { path: '/command-center', shot: 'command-center' },
  'earnest-companion': { path: '/command-center', shot: 'command-center' },
  'proposals-and-contracts': { path: '/proposals', shot: 'proposals-preview' },
  'document-themes': { path: '/organization', shot: 'organization-branding', persona: 'agency' },
  'client-portal': { path: '/portal', shot: 'command-center' },
  'meeting-ai-recap': { path: '/meetings', shot: 'scheduler-day' },
  'branded-email': { path: '/organization', shot: 'organization-branding', persona: 'agency' },
  'service-offerings': { path: '/organization/documents-library?tab=offerings', shot: 'documents-library', persona: 'agency' },
  'bank-sync': { path: '/financials', shot: 'financials-overview' },
  'accept-payments': { path: '/financials', shot: 'financials-overview' },
  'retainer-content-studio': { path: '/apps/work?floor=time', shot: 'time-tracker' },
  // New entries for Apps Layout features:
  'apps-layout': { path: '/apps/work', shot: 'apps-rail' },
  'workspaces': { path: '/apps/clients', shot: 'client-workspace' },
  'project-workspace': { path: '/apps/work', shot: 'project-workspace' },
};

export function getFeatureDemo(slug: string): DemoMapping {
  return FEATURE_DEMO_MAP[slug] ?? DEFAULT_DEMO;
}

/** Screenshot URL under `/public` — feature pages read from `latest/`. */
export function getScreenshotSrc(shot: DemoShot): string {
  return `/screenshots/latest/${shot}.png`;
}
