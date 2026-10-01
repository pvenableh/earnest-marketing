/* Shared by the three October concepts: the theme control, the wave field,
   Hue's footer, a typing helper, and the one data table every concept draws
   from — the apps, their floors, each floor's focus sentence and its three
   rows, and one record per floor with its own rows.

   ⚠️ The sentences and rows are the app's own strings, copied from
   `app/composables/useEarnestAwareness.ts` (FLOOR_FOCUS, ENTITY_PROMPTS) and
   `app/composables/useEarnestPrompts.ts` (FLOOR_ROWS) in the earnest repo at
   main on 2026-10-01. The records are the seeded demo workspace's. If a row
   changes there, it changes here. */
(function () {
  var E = (window.E = window.E || {});
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  E.reduce = reduce;
  E.APP = 'https://app.earnest.guru';
  E.REGISTER = E.APP + '/register';
  E.DEMO = E.APP + '/try-demo?persona=solo';
  E.DEMO_AGENCY = E.APP + '/try-demo?persona=agency';

  /* ── Data ──────────────────────────────────────────────────────────── */
  // lanes: do · decide · know. `go` rows open a floor and sit in Do.
  function r(lane, t) { return { lane: lane, t: t }; }
  E.APPS = [
    { key: 'clients', label: 'People', floors: [
      { key: 'clients', label: 'Clients', focus: 'the People app, Clients floor — every client, who is active and who has gone quiet',
        rows: [r('do', 'Schedule a check-in with a quiet client'), r('decide', 'Which clients have gone quiet?'), r('know', 'What does each client owe right now?')],
        recs: [
          { noun: 'client', label: 'Meridian Law', sub: '159 days since a real touch', v: '$9,400 overdue', bad: true, rows: [r('know', 'Summarize recent activity for this client'), r('do', 'Draft a follow-up email'), r('know', "What's outstanding for this client?")] },
          { noun: 'client', label: 'Helios Studio', sub: 'Website build · brand system · hotel launch', v: '3 projects' },
          { noun: 'client', label: 'Pinecrest Clinic', sub: '174 days since a real touch', v: 'quiet' },
        ] },
      { key: 'contacts', label: 'Contacts', focus: 'the People app, Contacts floor — the people at each client and how to reach them',
        rows: [r('do', 'Draft an email to a contact'), r('do', 'Log a conversation I just had'), r('do', 'Add a contact')],
        recs: [
          { noun: 'contact', label: 'Amara Okafor', sub: 'Meridian Law · last touch 159 d', v: 'holds the overdue', rows: [r('do', 'Draft an email to Amara'), r('do', 'Log a conversation with Amara'), r('know', 'When did we last talk?')] },
          { noun: 'contact', label: 'David Park', sub: 'Helios Studio · last touch 242 d', v: 'quiet' },
          { noun: 'contact', label: 'Priya Shah', sub: 'Pinecrest Clinic · last touch 174 d', v: 'quiet' },
        ] },
      { key: 'pursuits', label: 'Pursuits', focus: 'the People app, Pursuits floor — leads and the next step on each',
        rows: [r('do', 'Create a lead'), r('do', 'Draft a proposal for a pursuit'), r('decide', 'Which pursuits have stalled?')],
        recs: [
          { noun: 'lead', label: 'Atlas Fintech', sub: 'Qualified · no movement in 3 weeks', v: 'stalled', bad: true, rows: [r('know', 'Summarize this lead and where it stands'), r('decide', "What's the next best action?"), r('do', 'Move this to Proposal Sent')] },
          { noun: 'lead', label: 'Driftwood Roasters', sub: 'Proposal sent', v: 'waiting' },
          { noun: 'lead', label: 'Helios — brand refresh', sub: 'Contacted', v: 'new' },
        ] },
      { key: 'carddesk', label: 'Card Desk', focus: 'the People app, Card Desk floor — networking contacts and who to follow up with',
        rows: [r('do', 'Draft a message to reconnect'), r('know', 'How should I follow up after an event?'), r('do', 'Open Pursuits')], recs: [] },
      { key: 'intelligence', label: 'Intelligence', focus: 'the People app, Intelligence floor — findings across clients, contacts and leads',
        rows: [r('decide', 'Who should I reconnect with first?'), r('know', 'Where is the relationship risk?'), r('do', 'Draft a check-in to a client')], recs: [] },
    ] },
    { key: 'work', label: 'Work', floors: [
      { key: 'projects', label: 'Projects', focus: 'the Work app, Projects floor — every project, its timeline and what is at risk',
        rows: [r('do', 'Start a new project'), r('know', 'Which milestones are coming up?'), r('do', "Push a project's dates back")],
        recs: [
          { noun: 'project', label: 'Helios West Hotel Launch', sub: 'Helios Studio · hero image still in Round 2', v: '30 d past deadline', bad: true, rows: [r('know', "What's blocking progress on this project?"), r('know', 'Summarize the task status'), r('do', 'Push the start date back 2 weeks')] },
          { noun: 'project', label: 'Helios — Website Build', sub: 'Booking flow QA + launch', v: 'on track' },
          { noun: 'project', label: 'Driftwood Roasters — Brand', sub: 'Kickoff next week', v: 'not started' },
        ] },
      { key: 'tasks', label: 'Tasks', focus: 'the Work app, Tasks floor — what is open, due and overdue',
        rows: [r('know', "Plan today's priorities"), r('do', 'Add a task'), r('decide', 'Which overdue tasks should I let go?')],
        recs: [
          { noun: 'task', label: 'Reply to Julia Holt re: intro', sub: 'Personal · due today', v: 'today', rows: [r('know', 'What is this task waiting on?'), r('do', 'Push the due date back a week'), r('do', 'Mark this task done')] },
          { noun: 'task', label: 'Pull Q1 utilization report', sub: 'Personal', v: 'this week' },
          { noun: 'task', label: 'Block 60 min for Driftwood', sub: 'Personal', v: 'this week' },
        ] },
      { key: 'tickets', label: 'Tickets', focus: 'the Work app, Tickets floor — open requests, their priority and who they wait on',
        rows: [r('know', 'Which tickets are waiting on me?'), r('do', 'Open a ticket'), r('do', 'Turn a request into a ticket and a task')],
        recs: [
          { noun: 'ticket', label: 'Footer broken on mobile', sub: 'Pinecrest Clinic · high', v: 'waiting on you', bad: true, rows: [r('know', 'Summarize what this ticket is about'), r('know', "What's blocking progress here?"), r('do', 'Change priority to urgent')] },
          { noun: 'ticket', label: 'Add parking info to the site', sub: 'Helios Studio · normal', v: 'open' },
        ] },
      { key: 'approvals', label: 'Approvals', focus: 'the Work app, Approvals floor — creative work sent to clients for sign-off',
        rows: [r('do', 'Send work for approval'), r('decide', 'Which approvals have been sitting with the client too long?'), r('do', 'Draft a nudge for a waiting approval')],
        recs: [
          { noun: 'approval', label: 'Helios — hero image, Round 2', sub: '5 pieces · with the client 9 days', v: 'no reply', bad: true, rows: [r('know', "Who hasn't responded?"), r('know', 'Summarize the feedback so far'), r('do', 'Draft a nudge to the client')] },
          { noun: 'approval', label: 'Pinecrest — October posts', sub: '4 pieces', v: '3 of 4 approved' },
        ] },
      { key: 'calendar', label: 'Calendar', focus: 'the Work app, Calendar floor — the week ahead and what to book',
        rows: [r('know', "What's on today?"), r('do', 'Find a time to meet'), r('do', 'Book a meeting')],
        recs: [
          { noun: 'appointment', label: 'Meridian Law — catch-up', sub: 'Thu 2:00 · 30 min · video', v: 'Thu', rows: [r('do', 'Draft an agenda for this'), r('do', 'Draft a reminder to the attendees'), r('do', 'Reschedule this')] },
          { noun: 'appointment', label: 'Helios — launch review', sub: 'Fri 10:00 · 60 min', v: 'Fri' },
        ] },
      { key: 'time', label: 'Time', focus: 'the Work app, Time floor — tracked hours, by project and client, and what is unbilled',
        rows: [r('do', 'Start the timer'), r('know', 'Where did my time go this week?'), r('do', 'Invoice my unbilled time')], recs: [] },
      { key: 'insights', label: 'Intelligence', focus: 'the Work app, Intelligence floor — workload, throughput and where work is slipping',
        rows: [r('decide', 'Who is carrying too much?'), r('know', 'Where is work slipping?'), r('decide', 'What should I hand off this week?')], recs: [] },
    ] },
    { key: 'money', label: 'Money', floors: [
      { key: 'cashflow', label: 'Cash flow', focus: 'the Money app, Cash flow floor — money in, money out and what is at risk',
        rows: [r('decide', 'What money is at risk this month?'), r('know', 'What is due to come in?'), r('do', 'Draft reminders for everything overdue')], recs: [] },
      { key: 'documents', label: 'Documents', focus: 'the Money app, Documents floor — proposals and contracts, drafted, sent and signed',
        rows: [r('do', 'Draft a proposal'), r('do', 'Draft a contract from a proposal'), r('know', 'Which documents are waiting on a signature?')],
        recs: [
          { noun: 'proposal', label: 'Helios — booking site, three phases', sub: '$18,500 · draft', v: 'not sent', rows: [r('know', 'Summarize this proposal'), r('do', 'Turn this into a contract'), r('do', 'Change the phases')] },
          { noun: 'contract', label: 'Driftwood Roasters — brand', sub: 'Sent · awaiting signature', v: '6 days' },
        ] },
      { key: 'pipeline', label: 'Forecast', focus: 'the Money app, Forecast floor — expected revenue from open pursuits and proposals',
        rows: [r('know', 'What is likely to close this quarter?'), r('decide', 'Where is the forecast thin?'), r('do', 'Draft a proposal for my best pursuit')], recs: [] },
      { key: 'invoices', label: 'Invoices', focus: 'the Money app, Invoices floor — what is owed, overdue and paid',
        rows: [r('do', 'Draft a reminder for my oldest overdue invoice'), r('do', 'Create an invoice'), r('know', 'Who owes me, and for how long?')],
        recs: [
          { noun: 'invoice', label: 'INV-SOL-MER-2026-0042', sub: 'Meridian Law · $6,400', v: '92 d overdue', bad: true, rows: [r('know', 'Why is this invoice overdue?'), r('do', 'Draft a payment reminder email'), r('know', 'Summarize payment history')] },
          { noun: 'invoice', label: 'INV-SOL-MER-2026-0038', sub: 'Meridian Law · $3,000', v: '104 d overdue', bad: true },
          { noun: 'invoice', label: 'INV-SOL-HEL-2026-0055', sub: 'Helios Studio · $2,600', v: 'due in 14 d' },
        ] },
      { key: 'payments', label: 'Payments', focus: 'the Money app, Payments floor — payments received and the invoices they settled',
        rows: [r('do', 'Mark an invoice paid'), r('know', 'Which invoices are part-paid?'), r('do', 'Send a client their payment link')],
        recs: [
          { noun: 'payment', label: '$350 · check', sub: 'Pinecrest Clinic · settles INV-…-0031', v: 'today', rows: [r('know', 'What is still owed on this invoice?'), r('know', 'When was this received, and how?'), r('know', 'Has this client paid on time before?')] },
        ] },
      { key: 'deposits', label: 'Deposits', focus: 'the Money app, Deposits floor — payouts on their way to the bank',
        rows: [r('know', 'What is still to be collected?'), r('do', 'Open Payments'), r('do', 'Open payment settings')], recs: [] },
      { key: 'expenses', label: 'Expenses', focus: 'the Money app, Expenses floor — what was spent, on what, and what is billable',
        rows: [r('do', 'Record an expense'), r('know', 'What am I spending most on?'), r('decide', 'Which expenses should I bill to a client?')],
        recs: [
          { noun: 'expense', label: 'Figma', sub: 'Software & SaaS · monthly', v: 'billable?', rows: [r('decide', 'Is this expense billable to a client?'), r('know', 'What else did we spend with this vendor?'), r('know', 'Is a receipt attached?')] },
        ] },
      { key: 'insights', label: 'Insights', focus: 'the Money app, Insights floor — revenue trends, the best clients and margins',
        rows: [r('know', 'Which clients are worth the most?'), r('know', 'How is revenue trending?'), r('decide', 'Who pays late?')], recs: [] },
    ] },
    { key: 'marketing', label: 'Marketing', floors: [
      { key: 'pulse', label: 'Pulse', focus: 'the Marketing app, Pulse floor — how campaigns, email and social are performing',
        rows: [r('know', 'What worked last month?'), r('do', 'Plan next month from what worked'), r('do', 'Open Campaigns')], recs: [] },
      { key: 'campaigns', label: 'Campaigns', focus: 'the Marketing app, Campaigns floor — campaigns to plan, target and launch',
        rows: [r('do', 'Draft a campaign for this month'), r('do', 'Plan a 3-touch campaign for a client'), r('do', 'Launch the draft campaign')],
        recs: [
          { noun: 'campaign', label: 'Pinecrest — autumn check-ups', sub: '3 touches · draft', v: 'not launched', rows: [r('know', 'How is this campaign doing?'), r('do', 'Regenerate the second touch'), r('do', 'Launch this campaign')] },
        ] },
      { key: 'email', label: 'Email', focus: 'the Marketing app, Email floor — newsletters, templates and how sends performed',
        rows: [r('know', 'How is email engagement trending?'), r('do', 'Write a newsletter for this month'), r('do', 'Suggest five subject lines')], recs: [] },
      { key: 'accounts', label: 'Accounts', focus: 'the Marketing app, Accounts floor — the social accounts connected for publishing',
        rows: [r('decide', 'Which platforms are worth my time?'), r('do', 'Draft a first post for a new account'), r('do', 'Open Studio')], recs: [] },
      { key: 'studio', label: 'Studio', focus: 'the Marketing app, Studio floor — social posts to draft, design and schedule',
        rows: [r('do', 'Draft a few social posts'), r('do', 'Plan a month of content'), r('know', 'What should I post about this week?')],
        recs: [
          { noun: 'post', label: 'Three things we changed on the Pinecrest site', sub: 'LinkedIn · Thu 9:00', v: 'scheduled', rows: [r('do', 'Rewrite this in a warmer voice'), r('do', 'Draft two more like it'), r('know', 'Why this slot?')] },
        ] },
      { key: 'audience', label: 'Audience', focus: 'the Marketing app, Audience floor — mailing lists and the subscribers on them',
        rows: [r('do', 'Target a campaign at a list'), r('know', 'How should I segment my audience?'), r('do', 'Draft a welcome email for new subscribers')], recs: [] },
    ] },
    { key: 'organization', label: 'Organization', floors: [
      { key: 'overview', label: 'Overview', focus: 'the Organization app, Overview floor — the workspace at a glance',
        rows: [r('decide', 'What should leadership look at this week?'), r('do', 'Draft a status update for the team'), r('do', 'Open goals')], recs: [] },
      { key: 'members', label: 'Members', focus: 'the Organization app, Members floor — who is in the workspace and their roles',
        rows: [r('know', 'Who is in the workspace?'), r('know', 'Who is working on what?'), r('do', 'Draft a welcome note for a new member')], recs: [] },
      { key: 'teams', label: 'Teams', focus: 'the Organization app, Teams floor — teams, their members and workload',
        rows: [r('know', 'How is workload spread across teams?'), r('do', 'Draft a standup update'), r('do', 'Open Members')], recs: [] },
      { key: 'files', label: 'Files', focus: 'the Organization app, Files floor — everything shared across the workspace',
        rows: [r('know', 'How should I organize shared files?'), r('do', 'Draft a file-naming convention'), r('do', 'Open Templates')], recs: [] },
      { key: 'templates', label: 'Templates', focus: 'the Organization app, Templates floor — reusable content blocks and service offerings',
        rows: [r('do', 'Write a reusable scope block'), r('do', 'Describe a service offering'), r('do', 'Draft a proposal from my templates')], recs: [] },
      { key: 'billing', label: 'Billing', focus: 'the Organization app, Billing floor — the plan, add-ons and payment method',
        rows: [r('decide', 'Which plan fits how we work?'), r('know', 'How much AI have we used?'), r('do', 'Open AI & Tokens')], recs: [] },
      { key: 'ai', label: 'AI & Tokens', focus: 'the Organization app, AI & Tokens floor — token usage and what Earnest may do',
        rows: [r('know', 'What can you do for me?'), r('know', 'What do you ask before acting?'), r('do', 'Open my Earnest settings')], recs: [] },
      { key: 'communications', label: 'Email', focus: 'the Organization app, Email floor — sending domains and outbound email settings',
        rows: [r('do', 'Write an email signature'), r('know', 'Why would my email land in spam?'), r('do', 'Open Marketing email')], recs: [] },
      { key: 'integrations', label: 'Integrations', focus: 'the Organization app, Integrations floor — connected services and their status',
        rows: [r('decide', 'Which integrations are worth connecting?'), r('know', 'What does connecting my calendar do?'), r('do', 'Open Calendar')], recs: [] },
      { key: 'settings', label: 'Settings', focus: 'the Organization app, Settings floor — the workspace name, brand and defaults',
        rows: [r('do', 'Write a one-line description of the studio'), r('know', 'What should I set up first?'), r('do', 'Open Billing')], recs: [] },
    ] },
  ];
  E.floorCount = E.APPS.reduce(function (n, a) { return n + a.floors.length; }, 0);

  // The client's rows, from `shared/portal-earnest.ts` (PORTAL_FLOOR_ROWS).
  E.PORTAL = [
    { key: 'home', label: 'Home', rows: [r('know', 'What do you need from me?'), r('know', "What's the status of my projects?"), r('know', 'When is my next invoice due?')] },
    { key: 'work', label: 'Work', rows: [r('know', "What's the status of my project?"), r('know', "What's the next milestone?"), r('do', 'Leave a note for the team on this project')] },
    { key: 'requests', label: 'Requests', rows: [r('do', 'Log a request'), r('know', 'Which of my requests are still open?'), r('do', 'Add a comment to this request')] },
    { key: 'approvals', label: 'Approvals', rows: [r('know', "What's waiting for my approval?"), r('know', "What's on this board?"), r('do', 'Open the board that needs me')] },
    { key: 'schedule', label: 'Schedule', rows: [r('know', "What's on my schedule this week?"), r('do', 'Book time with my account team'), r('know', 'Who on the team can I book?')] },
    { key: 'money', label: 'Money', rows: [r('know', 'What do I owe right now?'), r('do', 'Open my latest invoice'), r('know', 'Which contracts still need my signature?')] },
  ];

  /* ── Rendering helpers ─────────────────────────────────────────────── */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  E.esc = esc;
  E.chip = function (noun, label, opts) {
    opts = opts || {};
    return '<span class="chip"><span class="noun">' + esc(noun) + '</span>' + (label ? '<span>' + esc(label) + '</span>' : '') + (opts.fixed ? '' : '<span class="x" aria-hidden="true">✕</span>') + '</span>';
  };
  E.lanes = function (rows, opts) {
    opts = opts || {};
    var LANE = { do: 'Do', decide: 'Decide', know: 'Know' };
    return '<div class="lanes">' + rows.map(function (x) {
      return '<button class="lane" type="button" data-lane="' + x.lane + '"><span class="k">' + LANE[x.lane] + '</span><span>' + esc(x.t) + '</span></button>';
    }).join('') + (opts.more === false ? '' : '<button class="lane more" type="button">More</button>') + '</div>';
  };
  E.composer = function (opts) {
    opts = opts || {};
    return '<div class="composer">' +
      (opts.grid ? '<span class="ic grid" aria-hidden="true">⊞</span>' : '') +
      (opts.waiting ? '<span class="wait">Waiting <b>' + opts.waiting + '</b></span>' : '') +
      '<span class="ph' + (opts.typed ? ' typed' : '') + '">' + esc(opts.text || 'Ask Earnest…') + '</span>' +
      '<span class="ic send" aria-hidden="true">↑</span></div>';
  };

  /* Typing: cosmetic, off under reduced motion. */
  E.type = function (el, text, done) {
    if (el._t) clearTimeout(el._t);
    if (reduce) { el.textContent = text; if (done) done(); return; }
    var n = 0;
    (function tick() {
      n += 3; el.textContent = text.slice(0, n);
      if (n < text.length) el._t = setTimeout(tick, 14); else if (done) done();
    })();
  };

  /* ── Theme ── Look × Mode; #glass / #paper-dark deep-link; remembered. */
  var LOOKS = ['glass', 'paper', 'clean'], MODES = ['light', 'dark'], DEFAULT_MODE = { glass: 'dark', paper: 'light', clean: 'light' };
  var themeHost = document.querySelector('[data-theme-control]');
  if (themeHost) {
    themeHost.innerHTML = '<button class="theme-btn" id="themeBtn" aria-expanded="false" aria-controls="themePop"><span class="sw" aria-hidden="true"></span><span class="lbl" id="themeLbl">Glass · Dark</span></button>' +
      '<div class="theme-pop" id="themePop" hidden><div class="row"><b>Look</b><div class="seg" role="group" aria-label="Look"><button data-look="glass" aria-pressed="true">Glass</button><button data-look="paper" aria-pressed="false">Paper</button><button data-look="clean" aria-pressed="false">Clean</button></div></div>' +
      '<div class="row"><b>Mode</b><div class="seg" role="group" aria-label="Mode"><button data-mode="light" aria-pressed="false">Light</button><button data-mode="dark" aria-pressed="true">Dark</button></div></div>' +
      '<small>The same three looks and two modes you get inside Earnest. Remembered on this browser.</small></div>';
  }
  var pop = document.getElementById('themePop'), tbtn = document.getElementById('themeBtn'), tlbl = document.getElementById('themeLbl');
  var lookBtns = pop ? [].slice.call(pop.querySelectorAll('[data-look]')) : [], modeBtns = pop ? [].slice.call(pop.querySelectorAll('[data-mode]')) : [];
  function cap(x) { return x.charAt(0).toUpperCase() + x.slice(1); }
  function setTheme(l, m, store) {
    if (LOOKS.indexOf(l) < 0) l = root.getAttribute('data-look') || 'glass';
    if (MODES.indexOf(m) < 0) m = DEFAULT_MODE[l];
    root.setAttribute('data-look', l); root.setAttribute('data-mode', m);
    lookBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.look === l)); });
    modeBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === m)); });
    if (tlbl) tlbl.textContent = cap(l) + ' · ' + cap(m);
    [].slice.call(document.querySelectorAll('img[data-glass]')).forEach(function (im) {
      var src = im.getAttribute('data-' + l) || im.getAttribute('data-glass');
      if (im.getAttribute('src') !== src) im.setAttribute('src', src);
    });
    if (store) { try { localStorage.setItem('earnest-look', l); localStorage.setItem('earnest-mode', m); } catch (e) {} }
    E.waves.forEach(function (w) { w.read(); });
  }
  E.setTheme = setTheme;
  function cur() { return { l: root.getAttribute('data-look'), m: root.getAttribute('data-mode') }; }
  lookBtns.forEach(function (b) { b.addEventListener('click', function () { setTheme(b.dataset.look, cur().m, true); }); });
  modeBtns.forEach(function (b) { b.addEventListener('click', function () { setTheme(cur().l, b.dataset.mode, true); }); });
  if (tbtn) {
    tbtn.addEventListener('click', function () { var open = pop.hidden; pop.hidden = !open; tbtn.setAttribute('aria-expanded', String(open)); });
    document.addEventListener('click', function (e) { if (!pop.hidden && !pop.contains(e.target) && e.target !== tbtn && !tbtn.contains(e.target)) { pop.hidden = true; tbtn.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { pop.hidden = true; tbtn.setAttribute('aria-expanded', 'false'); } });
  }
  function fromHash() { var h = (location.hash || '').slice(1).split('-'); return LOOKS.indexOf(h[0]) >= 0 ? { l: h[0], m: h[1] || DEFAULT_MODE[h[0]] } : null; }
  addEventListener('hashchange', function () { var h = fromHash(); if (h) setTheme(h.l, h.m, false); });

  /* ── Wave field ── colour and strength from the look's tokens. */
  E.waves = [];
  E.wave = function (cv) {
    if (!cv) return;
    var ctx = cv.getContext('2d'), t = 0, wave = '0,150,230', wa = .09;
    var w = { read: function () { var cs = getComputedStyle(root); wave = cs.getPropertyValue('--wave').trim() || wave; wa = parseFloat(cs.getPropertyValue('--wave-a')) || wa; if (reduce) draw(); } };
    function size() { cv.width = cv.clientWidth * devicePixelRatio; cv.height = cv.clientHeight * devicePixelRatio; }
    size(); addEventListener('resize', size);
    function draw() {
      var W = cv.width, H = cv.height; ctx.clearRect(0, 0, W, H);
      for (var b = 0; b < 5; b++) {
        ctx.beginPath(); var amp = H * (0.05 + b * 0.02), base = H * (0.42 + b * 0.11), k = 0.0018 / devicePixelRatio * (1 + b * 0.15);
        for (var x = 0; x <= W; x += 8) { var y = base + Math.sin(x * k + t * (0.6 + b * 0.12) + b) * amp + Math.sin(x * k * 0.37 - t * 0.4) * amp * 0.5; ctx.lineTo(x, y); }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fillStyle = 'rgba(' + wave + ',' + (wa * (0.6 + b * 0.3)) + ')'; ctx.fill();
      }
      if (!reduce) { t += 0.006; requestAnimationFrame(draw); }
    }
    E.waves.push(w); w.read(); draw();
  };

  /* ── Footer — Hue's own pattern. */
  var foot = document.querySelector('[data-footer]');
  if (foot) {
    foot.innerHTML = '<div class="wrap"><nav class="flinks" aria-label="Footer"><a href="#">Features</a><a href="#">Blog</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Refunds</a><a href="' + E.DEMO + '">Live demo</a><a href="' + E.APP + '/auth/signin">Sign in</a></nav>' +
      '<p class="maker"><a href="https://huestudios.com" target="_blank" rel="noopener">created by <svg class="hue-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.44 48.62" role="img" aria-label="Hue"><path d="M347.41,282.12h6.28v19.35c2-3.5,6.14-5.48,10.77-5.48,3.5,0,8.52,1.25,10.44,5.28.66,1.32,1.12,2.91,1.12,7.73v20.74h-3.56c-5.61,0-2.78-19.62-2.78-19.62,0-3,0-9.38-7.13-9.38a8.57,8.57,0,0,0-7.79,4.43c-1.06,1.85-1.06,5-1.06,7v17.57h-6.28Z" transform="translate(-347.41 -282.12)"/><path d="M388.17,296.59v21.34c0,3.24.73,7.33,7.07,7.33,3.1,0,6-1.06,7.79-3.7,1.39-2,1.39-4.56,1.39-6.21,0,0-1.87-18.76,2.07-18.76h4.33v27c0,.66.13,4.36.2,6.21h-6.47l-.13-5.68c-1.19,2.31-3.44,6-10.57,6-8.19,0-12-4.69-12-11.23V296.59Z" transform="translate(-347.41 -282.12)"/><path d="M422,314.29c-.13,6.87,2.71,12,9.51,12,5.93,0,6.3-6.87,9.67-6.87h4.33a11.26,11.26,0,0,1-2.84,6.94c-1.45,1.65-4.76,4.43-11.43,4.43-10.44,0-15.39-6.47-15.39-17,0-6.54,1.32-12,6.54-15.59,3.17-2.25,7.13-2.44,9.05-2.44,14.86,0,14.53,13.15,14.4,18.56Zm17.51-4.36c.07-3.17-.53-9.78-8.19-9.78-4,0-8.92,2.44-9,9.78Z" transform="translate(-347.41 -282.12)"/></svg></a></p>' +
      '<p class="billing">Earnest is made and sold by Hue. Your subscription is billed by Hue and appears as <strong>HUE STUDIOS</strong> on your card statement.</p><p class="copyright">&#169; 2026 Hue</p></div>';
  }

  /* Initial theme: the hash wins, then the browser's memory, then the page's own default (its <html data-look>). */
  var init = fromHash(), pageDefault = root.getAttribute('data-look') || 'glass';
  var l = pageDefault, m = root.getAttribute('data-mode') || DEFAULT_MODE[pageDefault];
  if (init) { l = init.l; m = init.m; }
  else if (!root.hasAttribute('data-keep-look')) { try { l = localStorage.getItem('earnest-look') || l; m = localStorage.getItem('earnest-mode') || DEFAULT_MODE[l]; } catch (e) {} }
  setTheme(l, m, false);
})();
