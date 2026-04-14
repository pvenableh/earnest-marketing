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
    desc: 'Stripe-powered invoices, proposals, payment tracking, and PDF generation. Get paid on time.',
    keywords: ['invoicing', 'billing', 'payments', 'Stripe', 'proposals'],
    benefits: [
      'Stripe-powered payment processing',
      'Professional invoice and proposal generation',
      'Payment tracking and reminders',
      'PDF export for every document',
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
