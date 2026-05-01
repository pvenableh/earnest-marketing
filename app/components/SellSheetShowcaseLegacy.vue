<!--
	SellSheetShowcaseLegacy
	─────────────────────────────────────────────────────────────────────────────
	Pre-Session-20 "See it in action" mock-widget grid. Preserved verbatim
	per user request ("keep that somewhere for future use"). The component is
	intentionally not registered in any layout. To use, import it into a page
	or include in SellSheetModern.vue. The Session 20 in-place restyle keeps
	this layout but swaps brand names + chart palette to match real Earnest.
-->
<template>
		<section ref="showcaseRef" class="sm-showcase" aria-label="Product showcase">
			<div class="sm-showcase-inner">
				<p class="sm-kicker opacity-0">Your entire business, one screen</p>
				<h2 class="sm-showcase-title opacity-0">See it in action<span class="sm-accent-dot">.</span></h2>
				<div class="sm-showcase-grid">
					<!-- Large Left: Revenue + Stats -->
					<div class="sm-showcase-cell sm-showcase-large opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Revenue Trend</span>
								<span class="sm-mock-pill">Last 6 months</span>
							</div>
							<svg class="sm-mock-chart" viewBox="0 0 320 100" fill="none" preserveAspectRatio="none">
								<defs>
									<linearGradient id="billFill" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stop-color="#3b82f6" stop-opacity="0.12"/>
										<stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
									</linearGradient>
									<linearGradient id="paidFill" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stop-color="#10b981" stop-opacity="0.1"/>
										<stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
									</linearGradient>
								</defs>
								<!-- Grid lines -->
								<line x1="0" y1="25" x2="320" y2="25" stroke="rgba(0,0,0,0.04)" stroke-width="0.5"/>
								<line x1="0" y1="50" x2="320" y2="50" stroke="rgba(0,0,0,0.04)" stroke-width="0.5"/>
								<line x1="0" y1="75" x2="320" y2="75" stroke="rgba(0,0,0,0.04)" stroke-width="0.5"/>
								<!-- Billed line -->
								<path d="M0,70 C30,65 50,55 80,50 C110,45 130,48 160,38 C190,28 220,32 250,22 C280,15 300,18 320,10" stroke="#3b82f6" stroke-width="2" fill="none" stroke-linecap="round"/>
								<path d="M0,70 C30,65 50,55 80,50 C110,45 130,48 160,38 C190,28 220,32 250,22 C280,15 300,18 320,10 L320,100 L0,100Z" fill="url(#billFill)"/>
								<!-- Paid line -->
								<path d="M0,78 C30,75 50,68 80,62 C110,58 130,55 160,48 C190,40 220,42 250,32 C280,26 300,28 320,20" stroke="#10b981" stroke-width="2" fill="none" stroke-linecap="round"/>
								<path d="M0,78 C30,75 50,68 80,62 C110,58 130,55 160,48 C190,40 220,42 250,32 C280,26 300,28 320,20 L320,100 L0,100Z" fill="url(#paidFill)"/>
							</svg>
							<div class="sm-mock-legend">
								<span class="sm-mock-legend-item"><span class="sm-mock-dot" style="background:#3b82f6"></span>Billed</span>
								<span class="sm-mock-legend-item"><span class="sm-mock-dot" style="background:#10b981"></span>Paid</span>
							</div>
						</div>
						<!-- Stats Row -->
						<div class="sm-mock-stats">
							<div class="sm-mock-stat">
								<span class="sm-mock-stat-label">Revenue</span>
								<span class="sm-mock-stat-value">$24.8k</span>
								<span class="sm-mock-stat-trend sm-float-trend-up">+12%</span>
							</div>
							<div class="sm-mock-stat">
								<span class="sm-mock-stat-label">Clients</span>
								<span class="sm-mock-stat-value">142</span>
								<span class="sm-mock-stat-trend sm-float-trend-up">+8</span>
							</div>
							<div class="sm-mock-stat">
								<span class="sm-mock-stat-label">Tasks Done</span>
								<span class="sm-mock-stat-value">89%</span>
								<span class="sm-mock-stat-trend sm-float-trend-up">+5%</span>
							</div>
							<div class="sm-mock-stat">
								<span class="sm-mock-stat-label">AI Queries</span>
								<span class="sm-mock-stat-value">1.2k</span>
								<span class="sm-mock-stat-trend" style="color:var(--sm-muted)">this mo.</span>
							</div>
						</div>
					</div>
					<!-- Large Right: Kanban Board -->
					<div class="sm-showcase-cell sm-showcase-large opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Project Board</span>
								<span class="sm-mock-pill">Acme Corp</span>
							</div>
							<div class="sm-mock-kanban">
								<div class="sm-mock-kan-col">
									<div class="sm-mock-kan-head" style="border-color:#06b6d4">Pending <span class="sm-mock-kan-count">3</span></div>
									<div class="sm-mock-kan-card">
										<div class="sm-mock-kan-title">Brand identity refresh</div>
										<div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#e0f2fe;color:#0369a1">Design</span></div>
									</div>
									<div class="sm-mock-kan-card">
										<div class="sm-mock-kan-title">Q2 social calendar</div>
										<div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#fef3c7;color:#92400e">Marketing</span></div>
									</div>
									<div class="sm-mock-kan-card">
										<div class="sm-mock-kan-title">Analytics dashboard</div>
										<div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#ede9fe;color:#5b21b6">Dev</span></div>
									</div>
								</div>
								<div class="sm-mock-kan-col">
									<div class="sm-mock-kan-head" style="border-color:#22c55e">In Progress <span class="sm-mock-kan-count">2</span></div>
									<div class="sm-mock-kan-card sm-mock-kan-active">
										<div class="sm-mock-kan-title">Email campaign launch</div>
										<div class="sm-mock-kan-meta">
											<span class="sm-mock-kan-tag" style="background:#fef3c7;color:#92400e">Marketing</span>
											<div class="sm-mock-kan-avatars"><span class="sm-mock-avatar"></span><span class="sm-mock-avatar" style="background:#a78bfa"></span></div>
										</div>
									</div>
									<div class="sm-mock-kan-card">
										<div class="sm-mock-kan-title">Client onboarding flow</div>
										<div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#e0f2fe;color:#0369a1">Design</span></div>
									</div>
								</div>
								<div class="sm-mock-kan-col">
									<div class="sm-mock-kan-head" style="border-color:#10b981">Done <span class="sm-mock-kan-count">4</span></div>
									<div class="sm-mock-kan-card sm-mock-kan-done">
										<div class="sm-mock-kan-title">Website redesign</div>
										<div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#d1fae5;color:#065f46">Complete</span></div>
									</div>
									<div class="sm-mock-kan-card sm-mock-kan-done">
										<div class="sm-mock-kan-title">Logo package delivery</div>
										<div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#d1fae5;color:#065f46">Complete</span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Bottom Left: Productivity Meter -->
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Productivity</span>
							</div>
							<div class="sm-mock-meter">
								<div class="sm-mock-score">87</div>
								<div class="sm-mock-score-bar">
									<div class="sm-mock-score-fill" style="width:87%"></div>
								</div>
								<span class="sm-mock-score-label">Excellent</span>
							</div>
							<div class="sm-mock-meter-stats">
								<div class="sm-mock-meter-stat"><span class="sm-mock-meter-num" style="color:#10b981">12</span><span class="sm-mock-meter-lbl">Done</span></div>
								<div class="sm-mock-meter-stat"><span class="sm-mock-meter-num" style="color:#f59e0b">2</span><span class="sm-mock-meter-lbl">Overdue</span></div>
								<div class="sm-mock-meter-stat"><span class="sm-mock-meter-num" style="color:var(--sm-muted)">5</span><span class="sm-mock-meter-lbl">Pending</span></div>
							</div>
						</div>
					</div>
					<!-- Bottom Center-Left: Social Widget -->
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Social Queue</span>
							</div>
							<div class="sm-mock-social">
								<div class="sm-mock-social-post">
									<div class="sm-mock-social-icon" style="background:#E4405F">IG</div>
									<div class="sm-mock-social-body">
										<div class="sm-mock-social-text">New collection launch...</div>
										<div class="sm-mock-social-time">Today, 2:00 PM</div>
									</div>
									<span class="sm-mock-social-status sm-mock-status-ready">Ready</span>
								</div>
								<div class="sm-mock-social-post">
									<div class="sm-mock-social-icon" style="background:#0A66C2">in</div>
									<div class="sm-mock-social-body">
										<div class="sm-mock-social-text">Team growth update...</div>
										<div class="sm-mock-social-time">Tomorrow, 9:00 AM</div>
									</div>
									<span class="sm-mock-social-status sm-mock-status-scheduled">Scheduled</span>
								</div>
								<div class="sm-mock-social-post">
									<div class="sm-mock-social-icon" style="background:#1DA1F2">X</div>
									<div class="sm-mock-social-body">
										<div class="sm-mock-social-text">Product feature deep dive...</div>
										<div class="sm-mock-social-time">Wed, 11:30 AM</div>
									</div>
									<span class="sm-mock-social-status sm-mock-status-draft">Draft</span>
								</div>
							</div>
						</div>
					</div>
					<!-- Bottom Center-Right: CRM Pipeline -->
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Pipeline</span>
								<span class="sm-mock-pill">$84k total</span>
							</div>
							<div class="sm-mock-pipeline">
								<div class="sm-mock-pipe-stage">
									<div class="sm-mock-pipe-bar" style="width:100%;background:rgba(0,0,0,0.06)"></div>
									<span class="sm-mock-pipe-name">Lead</span>
									<span class="sm-mock-pipe-count">24</span>
								</div>
								<div class="sm-mock-pipe-stage">
									<div class="sm-mock-pipe-bar" style="width:65%;background:rgba(0,0,0,0.1)"></div>
									<span class="sm-mock-pipe-name">Qualified</span>
									<span class="sm-mock-pipe-count">16</span>
								</div>
								<div class="sm-mock-pipe-stage">
									<div class="sm-mock-pipe-bar" style="width:40%;background:rgba(0,0,0,0.15)"></div>
									<span class="sm-mock-pipe-name">Proposal</span>
									<span class="sm-mock-pipe-count">9</span>
								</div>
								<div class="sm-mock-pipe-stage">
									<div class="sm-mock-pipe-bar" style="width:20%;background:#10b981"></div>
									<span class="sm-mock-pipe-name">Won</span>
									<span class="sm-mock-pipe-count">5</span>
								</div>
							</div>
						</div>
					</div>
					<!-- Bottom Right: AI Insight -->
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget sm-mock-widget-dark">
							<div class="sm-mock-header">
								<span class="sm-mock-title" style="color:white">AI Insight</span>
								<UIcon name="i-lucide-sparkles" style="width:14px;height:14px;color:#10b981" />
							</div>
							<div class="sm-mock-ai-insight">
								<div class="sm-mock-ai-score">
									<span class="sm-mock-ai-num">92</span>
									<span class="sm-mock-ai-of">/100</span>
								</div>
								<div class="sm-mock-ai-label">CRM Health</div>
								<div class="sm-mock-ai-rec">3 contacts need follow-up. Revenue trending +18% vs last quarter.</div>
							</div>
						</div>
					</div>
					<!-- Full-width: Team Channels / Messages -->
					<div class="sm-showcase-cell sm-showcase-wide opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Team Channels</span>
								<span class="sm-mock-pill"># design-team</span>
							</div>
							<div class="sm-mock-chat">
								<div class="sm-mock-msg">
									<span class="sm-mock-avatar" style="background:#6366f1"></span>
									<div class="sm-mock-msg-body">
										<div class="sm-mock-msg-head">
											<span class="sm-mock-msg-name">Sarah K.</span>
											<span class="sm-mock-msg-time">10:32 AM</span>
										</div>
										<div class="sm-mock-msg-text">Uploaded the final brand assets for Acme. Ready for review!</div>
										<div class="sm-mock-reactions">
											<span class="sm-mock-reaction">&#128077; 3</span>
											<span class="sm-mock-reaction">&#128293; 1</span>
										</div>
									</div>
								</div>
								<div class="sm-mock-msg">
									<span class="sm-mock-avatar" style="background:#f59e0b"></span>
									<div class="sm-mock-msg-body">
										<div class="sm-mock-msg-head">
											<span class="sm-mock-msg-name">Mike R.</span>
											<span class="sm-mock-msg-time">10:34 AM</span>
										</div>
										<div class="sm-mock-msg-text">Looks great. Left a comment on the logo variant &mdash; can we try a darker version?</div>
										<div class="sm-mock-comment-thread">
											<div class="sm-mock-comment">
												<span class="sm-mock-comment-avatar" style="background:#6366f1"></span>
												<span class="sm-mock-comment-text"><strong>Sarah K.</strong> On it! Will push an update by EOD.</span>
											</div>
										</div>
									</div>
								</div>
								<div class="sm-mock-msg">
									<span class="sm-mock-avatar" style="background:#10b981"></span>
									<div class="sm-mock-msg-body">
										<div class="sm-mock-msg-head">
											<span class="sm-mock-msg-name">AI Assistant</span>
											<span class="sm-mock-msg-ai-badge">AI</span>
											<span class="sm-mock-msg-time">10:35 AM</span>
										</div>
										<div class="sm-mock-msg-text">Brand audit complete. Score: 94/100. All assets meet guidelines.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Full-width: Gantt Chart -->
					<div class="sm-showcase-cell sm-showcase-wide opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Project Timeline</span>
								<span class="sm-mock-pill">Q2 2026</span>
							</div>
							<div class="sm-mock-gantt">
								<div class="sm-mock-gantt-header">
									<span></span>
									<span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
								</div>
								<div class="sm-mock-gantt-row">
									<span class="sm-mock-gantt-label">Brand Refresh</span>
									<div class="sm-mock-gantt-track"><div class="sm-mock-gantt-bar" style="left:0%;width:35%;background:var(--sm-text)"></div></div>
								</div>
								<div class="sm-mock-gantt-row">
									<span class="sm-mock-gantt-label">Website Redesign</span>
									<div class="sm-mock-gantt-track"><div class="sm-mock-gantt-bar" style="left:15%;width:50%;background:#52525b"></div></div>
								</div>
								<div class="sm-mock-gantt-row">
									<span class="sm-mock-gantt-label">Social Campaign</span>
									<div class="sm-mock-gantt-track"><div class="sm-mock-gantt-bar" style="left:30%;width:30%;background:#a1a1aa"></div></div>
								</div>
								<div class="sm-mock-gantt-row">
									<span class="sm-mock-gantt-label">Email Sequences</span>
									<div class="sm-mock-gantt-track"><div class="sm-mock-gantt-bar" style="left:45%;width:40%;background:#10b981"></div></div>
								</div>
								<div class="sm-mock-gantt-row">
									<span class="sm-mock-gantt-label">Launch Event</span>
									<div class="sm-mock-gantt-track"><div class="sm-mock-gantt-bar" style="left:75%;width:15%;background:var(--sm-text)"></div></div>
								</div>
							</div>
						</div>
					</div>
				<!-- Goals + Calendar row -->
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Goals</span>
							</div>
							<div class="sm-hw-goals">
								<div class="sm-hw-goal"><span class="sm-hw-goal-label">Revenue Target</span><div class="sm-hw-goal-bar"><div class="sm-hw-goal-fill" style="width:72%"></div></div><span class="sm-hw-goal-pct">72%</span></div>
								<div class="sm-hw-goal"><span class="sm-hw-goal-label">New Clients</span><div class="sm-hw-goal-bar"><div class="sm-hw-goal-fill sm-hw-goal-done" style="width:100%"></div></div><span class="sm-hw-goal-pct">100%</span></div>
								<div class="sm-hw-goal"><span class="sm-hw-goal-label">Retention</span><div class="sm-hw-goal-bar"><div class="sm-hw-goal-fill" style="width:89%"></div></div><span class="sm-hw-goal-pct">89%</span></div>
							</div>
						</div>
					</div>
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header">
								<span class="sm-mock-title">Invoicing</span>
								<span class="sm-mock-pill">3 pending</span>
							</div>
							<div class="sm-hw-invoices">
								<div class="sm-hw-inv-row"><span class="sm-hw-inv-name"></span><span class="sm-hw-inv-amt">$4,200</span><span class="sm-hw-inv-status sm-hw-inv-paid">Paid</span></div>
								<div class="sm-hw-inv-row"><span class="sm-hw-inv-name"></span><span class="sm-hw-inv-amt">$2,800</span><span class="sm-hw-inv-status sm-hw-inv-pending">Due</span></div>
								<div class="sm-hw-inv-row"><span class="sm-hw-inv-name"></span><span class="sm-hw-inv-amt">$1,600</span><span class="sm-hw-inv-status sm-hw-inv-paid">Paid</span></div>
							</div>
						</div>
					</div>
			<!-- Marketing Plan -->
					<div class="sm-showcase-cell sm-showcase-wide opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header"><span class="sm-mock-title">Marketing Plan</span><span class="sm-mock-pill">AI Generated</span></div>
							<div class="sm-mock-mktg">
								<div class="sm-mock-mktg-channels">
									<div class="sm-mock-mktg-ch"><span class="sm-mock-mktg-icon" style="background:#E4405F">IG</span><div class="sm-mock-mktg-info"><span class="sm-mock-mktg-name">Instagram</span><span class="sm-mock-mktg-cadence">3x/week</span></div></div>
									<div class="sm-mock-mktg-ch"><span class="sm-mock-mktg-icon" style="background:#0A66C2">in</span><div class="sm-mock-mktg-info"><span class="sm-mock-mktg-name">LinkedIn</span><span class="sm-mock-mktg-cadence">2x/week</span></div></div>
									<div class="sm-mock-mktg-ch"><span class="sm-mock-mktg-icon" style="background:var(--sm-text)">@</span><div class="sm-mock-mktg-info"><span class="sm-mock-mktg-name">Email</span><span class="sm-mock-mktg-cadence">Weekly newsletter</span></div></div>
								</div>
								<div class="sm-mock-mktg-timeline">
									<div class="sm-mock-mktg-week"><span class="sm-mock-mktg-wk-label">Wk 1</span><div class="sm-mock-mktg-wk-bar" style="width:100%"></div></div>
									<div class="sm-mock-mktg-week"><span class="sm-mock-mktg-wk-label">Wk 2</span><div class="sm-mock-mktg-wk-bar" style="width:85%"></div></div>
									<div class="sm-mock-mktg-week"><span class="sm-mock-mktg-wk-label">Wk 3</span><div class="sm-mock-mktg-wk-bar" style="width:70%"></div></div>
									<div class="sm-mock-mktg-week"><span class="sm-mock-mktg-wk-label">Wk 4</span><div class="sm-mock-mktg-wk-bar" style="width:60%"></div></div>
								</div>
							</div>
						</div>
					</div>
					<!-- CRM + Team row -->
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header"><span class="sm-mock-title">CRM Intelligence</span></div>
							<div class="sm-hw-crm">
								<div class="sm-hw-crm-contact"><span class="sm-hw-contact-dot" style="background:#6366f1;margin:0"></span><div class="sm-hw-crm-info"><span class="sm-hw-crm-name">Acme Corp</span><span class="sm-hw-crm-stage">Proposal &middot; Score 92</span></div><span class="sm-hw-crm-val">$12k</span></div>
								<div class="sm-hw-crm-contact"><span class="sm-hw-contact-dot" style="background:#f59e0b;margin:0"></span><div class="sm-hw-crm-info"><span class="sm-hw-crm-name">Nova Labs</span><span class="sm-hw-crm-stage">Follow-up &middot; Score 67</span></div><span class="sm-hw-crm-val">$8k</span></div>
								<div class="sm-hw-crm-contact"><span class="sm-hw-contact-dot" style="background:#10b981;margin:0"></span><div class="sm-hw-crm-info"><span class="sm-hw-crm-name">Bright Studio</span><span class="sm-hw-crm-stage">Active &middot; Score 88</span></div><span class="sm-hw-crm-val">$6k</span></div>
								<div class="sm-hw-crm-health"><span class="sm-hw-crm-health-label">Pipeline Health</span><div class="sm-hw-goal-bar"><div class="sm-hw-goal-fill" style="width:82%"></div></div></div>
							</div>
						</div>
					</div>
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header"><span class="sm-mock-title">Team</span><span class="sm-mock-pill">6 members</span></div>
							<div class="sm-hw-team">
								<div class="sm-hw-team-member"><span class="sm-hw-contact-dot" style="background:#6366f1;margin:0"></span><span class="sm-hw-team-name">Sarah Kim</span><span class="sm-hw-team-status" style="background:#10b981"></span></div>
								<div class="sm-hw-team-member"><span class="sm-hw-contact-dot" style="background:#f59e0b;margin:0"></span><span class="sm-hw-team-name">Mike Rodriguez</span><span class="sm-hw-team-status" style="background:#10b981"></span></div>
								<div class="sm-hw-team-member"><span class="sm-hw-contact-dot" style="background:#ec4899;margin:0"></span><span class="sm-hw-team-name">Jess Turner</span><span class="sm-hw-team-status" style="background:#a1a1aa"></span></div>
								<div class="sm-hw-team-member"><span class="sm-hw-contact-dot" style="background:#10b981;margin:0"></span><span class="sm-hw-team-name">Alex Chen</span><span class="sm-hw-team-status" style="background:#10b981"></span></div>
							</div>
						</div>
					</div>
					<!-- Earnest Score -->
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header"><span class="sm-mock-title">Earnest Score</span><span class="sm-mock-pill">Today</span></div>
							<div class="sm-mock-earnest-score">
								<div class="sm-mock-score-ring">
									<svg viewBox="0 0 80 80" class="sm-mock-radar">
										<polygon points="40,8 66,24 66,56 40,72 14,56 14,24" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="0.5"/>
										<polygon points="40,18 58,28 58,52 40,62 22,52 22,28" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="0.5"/>
										<polygon points="40,12 62,22 62,58 40,68 18,58 18,22" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="1.5" stroke-linejoin="round"/>
									</svg>
									<div class="sm-mock-score-center">
										<span class="sm-mock-score-big">87</span>
										<span class="sm-mock-score-level">Resolute</span>
									</div>
								</div>
								<div class="sm-mock-score-meta">
									<span class="sm-mock-score-streak">12-day streak</span>
									<span class="sm-mock-score-badges">6 badges</span>
								</div>
							</div>
						</div>
					</div>
					<!-- AI Sidebar -->
					<div class="sm-showcase-cell sm-showcase-small opacity-0" aria-hidden="true">
						<div class="sm-mock-widget sm-mock-widget-dark">
							<div class="sm-mock-header">
								<span class="sm-mock-title" style="color:white">AI Sidebar</span>
								<span class="sm-mock-pill" style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7)">Acme Corp</span>
							</div>
							<div class="sm-mock-ai-sidebar">
								<div class="sm-mock-sidebar-msg sm-mock-sidebar-user">What's the status of this client?</div>
								<div class="sm-mock-sidebar-msg sm-mock-sidebar-ai">
									<UIcon name="i-lucide-sparkles" style="width:12px;height:12px;color:#10b981;flex-shrink:0" />
									<span>3 open projects, $12k billed this quarter, last follow-up 2 days ago. Pipeline health: strong.</span>
								</div>
								<div class="sm-mock-sidebar-prompts">
									<span class="sm-mock-sidebar-prompt">Growth plan</span>
									<span class="sm-mock-sidebar-prompt">Contact strategy</span>
								</div>
							</div>
						</div>
					</div>
					<!-- CRM Pipeline Kanban -->
					<div class="sm-showcase-cell sm-showcase-wide opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header"><span class="sm-mock-title">CRM Pipeline</span><span class="sm-mock-pill">$84k total</span></div>
							<div class="sm-mock-kanban sm-mock-kanban-crm">
								<div class="sm-mock-kan-col">
									<div class="sm-mock-kan-head" style="border-color:#94a3b8">New <span class="sm-mock-kan-count">8</span></div>
									<div class="sm-mock-kan-card"><div class="sm-mock-kan-title">Vertex Inc</div><div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#e0f2fe;color:#0369a1">$6k</span></div></div>
								</div>
								<div class="sm-mock-kan-col">
									<div class="sm-mock-kan-head" style="border-color:#f59e0b">Qualified <span class="sm-mock-kan-count">5</span></div>
									<div class="sm-mock-kan-card"><div class="sm-mock-kan-title">Acme Corp</div><div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#fef3c7;color:#92400e">$12k</span></div></div>
								</div>
								<div class="sm-mock-kan-col">
									<div class="sm-mock-kan-head" style="border-color:#6366f1">Proposal <span class="sm-mock-kan-count">3</span></div>
									<div class="sm-mock-kan-card"><div class="sm-mock-kan-title">Nova Labs</div><div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#ede9fe;color:#5b21b6">$8k</span></div></div>
								</div>
								<div class="sm-mock-kan-col">
									<div class="sm-mock-kan-head" style="border-color:#10b981">Won <span class="sm-mock-kan-count">5</span></div>
									<div class="sm-mock-kan-card sm-mock-kan-done"><div class="sm-mock-kan-title">Bright Studio</div><div class="sm-mock-kan-meta"><span class="sm-mock-kan-tag" style="background:#d1fae5;color:#065f46">$18k</span></div></div>
								</div>
							</div>
						</div>
					</div>
					<!-- Scheduler -->
					<div class="sm-showcase-cell sm-showcase-wide opacity-0" aria-hidden="true">
						<div class="sm-mock-widget">
							<div class="sm-mock-header"><span class="sm-mock-title">Scheduler</span><span class="sm-mock-pill">This week</span></div>
							<div class="sm-mock-scheduler">
								<div class="sm-mock-sched-day"><span class="sm-mock-sched-label">Mon</span><div class="sm-mock-sched-slots"><div class="sm-mock-sched-event sm-mock-sched-meeting">Team standup<span>9 AM</span></div><div class="sm-mock-sched-event sm-mock-sched-task">Client review<span>2 PM</span></div></div></div>
								<div class="sm-mock-sched-day"><span class="sm-mock-sched-label">Tue</span><div class="sm-mock-sched-slots"><div class="sm-mock-sched-event sm-mock-sched-call">Sales call — Acme<span>10:30 AM</span></div></div></div>
								<div class="sm-mock-sched-day sm-mock-sched-today"><span class="sm-mock-sched-label">Wed</span><div class="sm-mock-sched-slots"><div class="sm-mock-sched-event sm-mock-sched-meeting">Design review<span>11 AM</span></div><div class="sm-mock-sched-event sm-mock-sched-task">Send proposal<span>3 PM</span></div></div></div>
								<div class="sm-mock-sched-day"><span class="sm-mock-sched-label">Thu</span><div class="sm-mock-sched-slots"><div class="sm-mock-sched-event sm-mock-sched-call">Onboarding — Nova<span>9 AM</span></div></div></div>
								<div class="sm-mock-sched-day"><span class="sm-mock-sched-label">Fri</span><div class="sm-mock-sched-slots"><div class="sm-mock-sched-event sm-mock-sched-meeting">Sprint retro<span>4 PM</span></div></div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
</template>

<script setup lang="ts">
// Intentionally empty — preserved as a layout reference, not for runtime use.
</script>

<style scoped>
/* ─── SHOWCASE ─── */
.sm-showcase {
	background: var(--sm-bg-alt);
	padding: 140px 32px;
	position: relative;
	z-index: 2;
}
@media (max-width: 700px) { .sm-showcase { padding: 80px 16px; } }
.sm-showcase-inner {
	max-width: 1200px;
	margin: 0 auto;
}
.sm-showcase-title {
	font-size: clamp(32px, 4vw, 48px);
	font-weight: 600;
	letter-spacing: -0.02em;
	margin-bottom: 56px;
	text-align: center;
}
.sm-showcase-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
}
@media (max-width: 900px) { .sm-showcase-grid { grid-template-columns: 1fr; } }
.sm-showcase-cell {
	min-height: 0;
	overflow: visible;
}
.sm-showcase-large {
	grid-column: span 1;
}
.sm-showcase-small {
	grid-column: span 1;
}

/* Widget base */
.sm-mock-widget {
	background: white;
	border: 1px solid var(--sm-border);
	border-radius: 20px;
	padding: 24px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}
.sm-mock-widget-dark {
	background: var(--sm-dark);
	border-color: rgba(255, 255, 255, 0.08);
}
.sm-mock-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
}
.sm-mock-title {
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--sm-text);
}
.sm-mock-pill {
	font-size: 9px;
	font-weight: 500;
	color: var(--sm-muted);
	background: var(--sm-bg-alt);
	padding: 3px 10px;
	border-radius: 100px;
	border: 1px solid var(--sm-border);
}

/* Revenue Chart Mock */
.sm-mock-chart {
	width: 100%;
	height: 110px;
	display: block;
	margin-bottom: 8px;
}
.sm-mock-legend {
	display: flex;
	gap: 16px;
	justify-content: center;
}
.sm-mock-legend-item {
	font-size: 10px;
	color: var(--sm-muted);
	display: flex;
	align-items: center;
	gap: 5px;
}
.sm-mock-dot {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	flex-shrink: 0;
}

/* Stats Row Mock */
.sm-mock-stats {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 12px;
	margin-top: 16px;
}
@media (max-width: 500px) { .sm-mock-stats { grid-template-columns: repeat(2, 1fr); } }
.sm-mock-stat {
	background: white;
	border: 1px solid var(--sm-border);
	border-radius: 14px;
	padding: 14px;
	text-align: center;
}
.sm-mock-stat-label {
	display: block;
	font-size: 9px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--sm-muted);
	margin-bottom: 4px;
}
.sm-mock-stat-value {
	display: block;
	font-size: 20px;
	font-weight: 700;
	color: var(--sm-text);
	line-height: 1.1;
}
.sm-mock-stat-trend {
	display: block;
	font-size: 10px;
	font-weight: 600;
	margin-top: 2px;
}

/* Kanban Mock */
.sm-mock-kanban {
	display: flex;
	gap: 10px;
}
.sm-mock-kan-col {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.sm-mock-kan-head {
	font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--sm-muted);
	padding-bottom: 8px;
	border-bottom: 2px solid;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.sm-mock-kan-count {
	font-size: 9px;
	font-weight: 500;
	background: var(--sm-bg-alt);
	padding: 1px 6px;
	border-radius: 100px;
}
.sm-mock-kan-card {
	background: var(--sm-bg-alt);
	border: 1px solid var(--sm-border);
	border-radius: 10px;
	padding: 10px 12px;
}
.sm-mock-kan-active {
	border-left: 2px solid var(--sm-accent);
}
.sm-mock-kan-done {
	opacity: 0.5;
}
.sm-mock-kan-title {
	font-size: 11px;
	font-weight: 500;
	color: var(--sm-text);
	margin-bottom: 6px;
	line-height: 1.3;
}
.sm-mock-kan-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.sm-mock-kan-tag {
	font-size: 8px;
	font-weight: 600;
	padding: 2px 7px;
	border-radius: 100px;
	text-transform: uppercase;
	letter-spacing: 0.04em;
}
.sm-mock-kan-avatars {
	display: flex;
	margin-left: auto;
}
.sm-mock-avatar {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: var(--sm-accent);
	border: 1.5px solid white;
	margin-left: -4px;
}
.sm-mock-avatar:first-child { margin-left: 0; }

/* Productivity Meter Mock */
.sm-mock-meter {
	text-align: center;
	margin-bottom: 16px;
}
.sm-mock-score {
	font-size: 40px;
	font-weight: 700;
	color: #10b981;
	line-height: 1;
}
.sm-mock-score-bar {
	height: 6px;
	background: var(--sm-bg-alt);
	border-radius: 3px;
	margin: 10px 0 6px;
	overflow: hidden;
}
.sm-mock-score-fill {
	height: 100%;
	background: linear-gradient(to right, #10b981, #34d399);
	border-radius: 3px;
}
.sm-mock-score-label {
	font-size: 10px;
	font-weight: 600;
	color: #10b981;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}
.sm-mock-meter-stats {
	display: flex;
	justify-content: center;
	gap: 20px;
}
.sm-mock-meter-stat {
	text-align: center;
}
.sm-mock-meter-num {
	display: block;
	font-size: 16px;
	font-weight: 700;
	line-height: 1;
}
.sm-mock-meter-lbl {
	display: block;
	font-size: 9px;
	color: var(--sm-muted);
	margin-top: 2px;
	text-transform: uppercase;
	letter-spacing: 0.04em;
}

/* Social Queue Mock */
.sm-mock-social {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.sm-mock-social-post {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px 10px;
	background: var(--sm-bg-alt);
	border-radius: 10px;
	border: 1px solid var(--sm-border);
}
.sm-mock-social-icon {
	width: 24px;
	height: 24px;
	border-radius: 6px;
	color: white;
	font-size: 9px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.sm-mock-social-body { flex: 1; min-width: 0; }
.sm-mock-social-text {
	font-size: 11px;
	font-weight: 500;
	color: var(--sm-text);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.sm-mock-social-time {
	font-size: 9px;
	color: var(--sm-muted);
	margin-top: 1px;
}
.sm-mock-social-status {
	font-size: 8px;
	font-weight: 600;
	padding: 2px 8px;
	border-radius: 100px;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	flex-shrink: 0;
}
.sm-mock-status-ready { background: #d1fae5; color: #065f46; }
.sm-mock-status-scheduled { background: #e0f2fe; color: #0369a1; }
.sm-mock-status-draft { background: #f5f5f5; color: #737373; }

/* CRM Pipeline Mock */
.sm-mock-pipeline {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.sm-mock-pipe-stage {
	position: relative;
	padding: 8px 12px;
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
}
.sm-mock-pipe-bar {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	border-radius: 8px;
}
.sm-mock-pipe-name {
	font-size: 11px;
	font-weight: 500;
	color: var(--sm-text);
	position: relative;
	z-index: 1;
}
.sm-mock-pipe-count {
	font-size: 12px;
	font-weight: 700;
	color: var(--sm-text);
	position: relative;
	z-index: 1;
}

/* AI Insight Mock */
.sm-mock-ai-insight {
	text-align: center;
}
.sm-mock-ai-score {
	margin-bottom: 4px;
}
.sm-mock-ai-num {
	font-size: 36px;
	font-weight: 700;
	color: #10b981;
	line-height: 1;
}
.sm-mock-ai-of {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.3);
}
.sm-mock-ai-label {
	font-size: 10px;
	font-weight: 600;
	color: var(--sm-pop);
	text-transform: uppercase;
	letter-spacing: 0.08em;
	margin-bottom: 10px;
}
.sm-mock-ai-rec {
	font-size: 11px;
	line-height: 1.5;
	color: rgba(255, 255, 255, 0.45);
}

/* Wide showcase cell (full grid width) */
.sm-showcase-wide {
	grid-column: 1 / -1;
}
@media (max-width: 900px) {
	.sm-showcase-wide { grid-column: 1; }
	.sm-mock-widget { padding: 18px; }
	.sm-mock-kanban { flex-direction: column; }
	.sm-mock-chart { height: 80px; }
	.sm-mock-stats { grid-template-columns: repeat(2, 1fr); }
}

/* Marketing Plan Mock */
.sm-mock-mktg {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	margin-top: 8px;
}
@media (max-width: 600px) { .sm-mock-mktg { grid-template-columns: 1fr; gap: 12px; } }
.sm-mock-mktg-channels {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.sm-mock-mktg-ch {
	display: flex;
	align-items: center;
	gap: 10px;
}
.sm-mock-mktg-icon {
	width: 24px;
	height: 24px;
	border-radius: 6px;
	color: white;
	font-size: 9px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.sm-mock-mktg-info { display: flex; flex-direction: column; }
.sm-mock-mktg-name {
	font-size: 11px;
	font-weight: 600;
	color: var(--sm-text);
}
.sm-mock-mktg-cadence {
	font-size: 9px;
	color: var(--sm-muted);
}
.sm-mock-mktg-timeline {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.sm-mock-mktg-week {
	display: flex;
	align-items: center;
	gap: 8px;
}
.sm-mock-mktg-wk-label {
	font-size: 9px;
	font-weight: 600;
	color: var(--sm-muted);
	width: 28px;
	flex-shrink: 0;
}
.sm-mock-mktg-wk-bar {
	height: 8px;
	background: rgba(0, 0, 0, 0.06);
	border-radius: 4px;
}

/* Scheduler Mock */
.sm-mock-scheduler {
	display: flex;
	gap: 8px;
	margin-top: 8px;
}
@media (max-width: 600px) { .sm-mock-scheduler { flex-direction: column; } }
.sm-mock-sched-day {
	flex: 1;
	min-width: 0;
}
.sm-mock-sched-today {
	background: rgba(0, 0, 0, 0.02);
	border-radius: 8px;
	padding: 4px;
}
.sm-mock-sched-label {
	display: block;
	font-size: 9px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--sm-muted);
	margin-bottom: 6px;
}
.sm-mock-sched-today .sm-mock-sched-label {
	color: var(--sm-text);
}
.sm-mock-sched-slots {
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.sm-mock-sched-event {
	font-size: 9px;
	color: var(--sm-text-2);
	padding: 5px 8px;
	border-radius: 6px;
	border-left: 2px solid;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 4px;
	white-space: nowrap;
	overflow: hidden;
}
.sm-mock-sched-event span {
	font-size: 8px;
	color: var(--sm-muted);
	flex-shrink: 0;
}
.sm-mock-sched-meeting {
	border-color: #6366f1;
	background: rgba(99, 102, 241, 0.04);
}
.sm-mock-sched-task {
	border-color: #10b981;
	background: rgba(16, 185, 129, 0.04);
}
.sm-mock-sched-call {
	border-color: #f59e0b;
	background: rgba(245, 158, 11, 0.04);
}

/* Chat / Channels Mock */
.sm-mock-chat {
	display: flex;
	flex-direction: column;
	gap: 14px;
}
.sm-mock-msg {
	display: flex;
	gap: 10px;
	align-items: flex-start;
}
.sm-mock-msg .sm-mock-avatar {
	margin-left: 0;
	width: 28px;
	height: 28px;
	border-radius: 8px;
	flex-shrink: 0;
	border: none;
}
.sm-mock-msg-body {
	flex: 1;
	min-width: 0;
}
.sm-mock-msg-head {
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 3px;
}
.sm-mock-msg-name {
	font-size: 11px;
	font-weight: 600;
	color: var(--sm-text);
}
.sm-mock-msg-time {
	font-size: 9px;
	color: var(--sm-muted);
}
.sm-mock-msg-ai-badge {
	font-size: 8px;
	font-weight: 700;
	background: var(--sm-text);
	color: white;
	padding: 1px 5px;
	border-radius: 4px;
	text-transform: uppercase;
	letter-spacing: 0.04em;
}
.sm-mock-msg-text {
	font-size: 12px;
	line-height: 1.5;
	color: var(--sm-text-2);
}
.sm-mock-reactions {
	display: flex;
	gap: 6px;
	margin-top: 6px;
}
.sm-mock-reaction {
	font-size: 11px;
	background: var(--sm-bg-alt);
	border: 1px solid var(--sm-border);
	border-radius: 100px;
	padding: 2px 8px;
	cursor: default;
}
.sm-mock-comment-thread {
	margin-top: 8px;
	padding-left: 12px;
	border-left: 2px solid var(--sm-border);
}
.sm-mock-comment {
	display: flex;
	align-items: flex-start;
	gap: 6px;
}
.sm-mock-comment-avatar {
	width: 16px;
	height: 16px;
	border-radius: 4px;
	flex-shrink: 0;
}
.sm-mock-comment-text {
	font-size: 11px;
	color: var(--sm-text-2);
	line-height: 1.4;
}
.sm-mock-comment-text strong {
	color: var(--sm-text);
	font-weight: 600;
}

/* Gantt Chart Mock */
.sm-mock-gantt {
	display: flex;
	flex-direction: column;
	gap: 0;
}
.sm-mock-gantt-header {
	display: grid;
	grid-template-columns: 120px repeat(4, 1fr);
	gap: 0;
	padding-bottom: 8px;
	border-bottom: 1px solid var(--sm-border);
	margin-bottom: 4px;
}
@media (max-width: 600px) { .sm-mock-gantt-header { grid-template-columns: 80px repeat(4, 1fr); } }
.sm-mock-gantt-header span {
	font-size: 9px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--sm-muted);
	text-align: center;
}
.sm-mock-gantt-header span:first-child { text-align: left; }
.sm-mock-gantt-row {
	display: grid;
	grid-template-columns: 120px 1fr;
	gap: 0;
	align-items: center;
	padding: 6px 0;
	border-bottom: 1px solid rgba(0,0,0,0.03);
}
@media (max-width: 600px) { .sm-mock-gantt-row { grid-template-columns: 80px 1fr; } }
.sm-mock-gantt-label {
	font-size: 11px;
	font-weight: 500;
	color: var(--sm-text);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.sm-mock-gantt-track {
	position: relative;
	height: 12px;
	background: rgba(0,0,0,0.02);
	border-radius: 6px;
}
.sm-mock-gantt-bar {
	position: absolute;
	top: 0;
	height: 100%;
	border-radius: 6px;
}
.sm-mock-earnest-score {
	text-align: center;
}
.sm-mock-score-ring {
	position: relative;
	display: inline-block;
	width: 80px;
	height: 80px;
	margin-bottom: 8px;
}
.sm-mock-radar {
	width: 100%;
	height: 100%;
}
.sm-mock-score-center {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.sm-mock-score-big {
	font-size: 24px;
	font-weight: 700;
	color: #10b981;
	line-height: 1;
}
.sm-mock-score-level {
	font-size: 9px;
	font-weight: 600;
	color: var(--sm-muted);
	text-transform: uppercase;
	letter-spacing: 0.08em;
}
.sm-mock-score-meta {
	display: flex;
	justify-content: center;
	gap: 12px;
	font-size: 10px;
	color: var(--sm-muted);
}
.sm-mock-score-streak,
.sm-mock-score-badges {
	background: rgba(0, 0, 0, 0.04);
	padding: 2px 8px;
	border-radius: 8px;
}

/* ─── AI Sidebar Widget ─── */
.sm-mock-ai-sidebar {
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: 4px;
}
.sm-mock-sidebar-msg {
	font-size: 11px;
	line-height: 1.5;
	padding: 6px 10px;
	border-radius: 8px;
	max-width: 90%;
}
.sm-mock-sidebar-user {
	background: rgba(255, 255, 255, 0.08);
	color: rgba(255, 255, 255, 0.7);
	align-self: flex-end;
}
.sm-mock-sidebar-ai {
	background: rgba(16, 185, 129, 0.1);
	color: rgba(255, 255, 255, 0.6);
	align-self: flex-start;
	display: flex;
	gap: 6px;
	align-items: flex-start;
}
.sm-mock-sidebar-prompts {
	display: flex;
	gap: 6px;
	margin-top: 2px;
}
.sm-mock-sidebar-prompt {
	font-size: 9px;
	padding: 3px 8px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.06);
	color: rgba(255, 255, 255, 0.4);
	cursor: default;
}

/* ─── CRM Pipeline Kanban ─── */
.sm-mock-kanban-crm .sm-mock-kan-col {
	min-width: 0;
}
.sm-mock-kanban-crm .sm-mock-kan-card {
	padding: 8px 10px;
}
</style>
