<template>
	<div class="e-page g-page">
		<!-- ─── Nav ─── -->
		<nav class="e-nav" :class="{ 'e-nav-scrolled': navScrolled }">
			<nuxt-link to="/" class="e-nav-brand">
				<LogoEarnest size="md" />
				<span class="e-nav-badge-wrap">
					<Transition name="e-badge" mode="out-in">
						<span :key="navBadgeIdx" class="e-nav-badge">{{ navBadges[navBadgeIdx] }}</span>
					</Transition>
				</span>
			</nuxt-link>
			<div class="e-nav-links">
				<a href="#focus" class="e-nav-link">Focus</a>
				<a href="#learns" class="e-nav-link">Learns you</a>
				<a href="#office" class="e-nav-link">The Office</a>
				<a href="#pricing" class="e-nav-link">Pricing</a>
				<a href="#faq" class="e-nav-link">FAQ</a>
			</div>
			<div class="e-nav-right">
				<button type="button" class="e-theme-toggle g-press" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" @click="toggleTheme">
					<ClientOnly><UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" /><template #fallback><UIcon name="i-lucide-moon" /></template></ClientOnly>
				</button>
				<button type="button" class="e-nav-link e-nav-cta g-press" @click="openEarlyAccess()">Start for free</button>
			</div>
		</nav>

		<!-- ─── Hero ─── -->
		<header class="e-hero">
			<span class="g-eyebrow opacity-0"><span class="g-eyebrow-dot"></span> The AI that knows your business, your clients, and you</span>
			<h1 class="e-hero-wordmark opacity-0">Earnest<span class="e-hero-period">.</span></h1>
			<p class="e-hero-tagline opacity-0">Do good work<span class="e-dot">.</span></p>
			<p class="e-hero-sub opacity-0">
				Earnest pairs a real language model with everything it knows about your business, your clients, and how you work — directing the day <strong>in your voice</strong> and learning as it goes. Real context, not generic prompts, clearing the busywork so you can do the work that matters.
			</p>
			<div class="e-hero-actions opacity-0">
				<button class="e-btn e-btn-primary g-press" @click="openEarlyAccess()">Start for free</button>
				<a href="#office" class="e-btn e-btn-ghost g-press">See the Office</a>
			</div>
			<div class="e-hero-demos opacity-0">
				<a :href="soloDemoUrl" class="e-hero-demo"><UIcon name="i-lucide-play-circle" /> Try the live demo</a>
			</div>

			<!-- App dock — neutral ramp chips, macOS magnification -->
			<div ref="dockRef" class="e-dock opacity-0" @mousemove="onDockMove" @mouseleave="onDockLeave">
				<div v-for="c in heroChips" :key="c.label" class="e-dock-item">
					<span class="e-dock-tip">{{ c.label }}</span>
					<span class="e-chip e-dock-chip" :style="{ '--chip-tint': c.tint }"><UIcon :name="c.icon" /></span>
				</div>
			</div>

			<!-- Hero shot in glass, with gamified floating pills -->
			<figure class="e-hero-shot opacity-0">
				<div class="e-frame g-hero-frame">
					<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
					<img :src="heroScreenshotSrc" alt="Earnest — the Director's Office" loading="eager" decoding="async" class="e-frame-img" />
				</div>
				<div class="g-float g-float-score g-glass" data-parallax="0.14" aria-hidden="true">
					<span class="g-float-ring">
						<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="rgba(15,34,51,.1)" stroke-width="4" /><circle class="g-float-ring-fill" cx="20" cy="20" r="16" fill="none" stroke="#0da0cc" stroke-width="4" stroke-linecap="round" transform="rotate(-90 20 20)" /></svg>
					</span>
					<span class="g-float-body"><b data-count="87" data-dur="1.6">0</b><small>Earnest Score</small></span>
				</div>
				<div class="g-float g-float-streak g-glass" data-parallax="0.22" aria-hidden="true"><span class="g-streak">🔥 12-day streak</span></div>
				<div class="g-float g-float-dec g-glass" data-parallax="0.3" aria-hidden="true"><UIcon name="i-lucide-gavel" style="color:var(--g-accent)" /> 3 decisions ready</div>
				<figcaption class="e-hero-shot-caption">The live app — a real organizational overview, not a mockup.</figcaption>
			</figure>
		</header>

		<!-- ─── Marquee ─── -->
		<div class="e-marquee" aria-hidden="true">
			<div class="e-marquee-track">
				<span v-for="(item, i) in [...marqueeItems, ...marqueeItems]" :key="i" class="e-marquee-item">
					<UIcon :name="item.icon" /> {{ item.label }}
				</span>
			</div>
		</div>

		<!-- ─── Focus — the calm, full-screen space ─── -->
		<section id="focus" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Focus</span>
				<h2 class="e-h2" data-anim="rise">When it’s a lot, <span class="g-accent-text">there’s Focus</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Some days carry more than a dashboard should. Step into Focus and Earnest sits with you — a calm, full-screen space to take it one thing at a time. No noise, no rush.</p>
			</div>

			<div class="g-focus" data-anim="scale">
				<div class="g-focus-aura" aria-hidden="true"><span></span><span></span></div>
				<div class="g-focus-inner">
					<span class="g-focus-mark">E<span class="g-focus-dot">.</span></span>
					<p class="g-focus-greet">I’m here. No rush.<br>What’s the honest version of how things are&nbsp;right&nbsp;now?</p>
					<div class="g-focus-chips">
						<span v-for="c in focusChips" :key="c" class="g-focus-chip g-press">{{ c }}</span>
					</div>
					<div class="g-focus-composer">
						<span class="g-focus-ph">Tell Earnest what’s on your mind…</span>
						<span class="g-focus-send"><UIcon name="i-lucide-arrow-up" /></span>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── It learns how you work — earned trust ─── -->
		<section id="learns" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> It learns how you work</span>
				<h2 class="e-h2" data-anim="rise">The more it’s right, <span class="g-accent-text">the more it carries</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Earnest pays attention. It learns your voice, your rhythm, the calls you always make and the ones you never would — and as it proves itself, you can hand it more. Trust you can dial, earned by being right.</p>
			</div>

			<div class="g-learn" data-anim="scale">
				<!-- What it's learned -->
				<div class="g-learn-card g-glass g-lift">
					<span class="g-learn-label"><UIcon name="i-lucide-sparkles" class="g-learn-ic" /> What Earnest has learned about you</span>
					<ul class="g-learn-list" data-stagger>
						<li v-for="(p, i) in learned" :key="i"><UIcon name="i-lucide-check" class="g-learn-ic" /> <span v-html="p"></span></li>
					</ul>
				</div>

				<!-- Earned trust dial -->
				<div class="g-learn-card g-glass g-lift">
					<span class="g-learn-label"><UIcon name="i-lucide-shield-check" class="g-learn-ic" /> Earned trust</span>
					<div class="g-trust-tiers" data-stagger>
						<div v-for="(t, i) in trustTiers" :key="t.name" class="g-trust-tier" :class="{ 'g-trust-tier--on': i <= trustLevel }">
							<span class="g-trust-dot"></span>
							<div class="g-trust-body"><b>{{ t.name }}</b><span>{{ t.desc }}</span></div>
						</div>
					</div>
					<p class="g-trust-floor"><UIcon name="i-lucide-lock" class="g-learn-ic" /> <span>A hard floor it will never cross — money and client-facing sends always wait for your tap.</span></p>
				</div>
			</div>
		</section>

		<!-- ─── Financial clarity — the certainty ladder ─── -->
		<section id="clarity" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Financial clarity</span>
				<h2 class="e-h2" data-anim="rise">Every dollar, <span class="g-accent-text">sorted by how sure it is</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Not one “revenue” number that hides the truth. Earnest lays your money out along a ladder of certainty — banked, owed, in play, gone cold — so the honest cash never blurs into the hoped-for pipeline. Hover a tier to see it.</p>
			</div>

			<div class="g-clarity g-glass-tint" data-anim="scale">
				<div class="g-cert-top">
					<span class="g-cert-caption"><UIcon name="i-lucide-move-right" class="g-cert-caplic" /> Most certain → most speculative</span>
					<span class="g-cert-inview"><span class="g-cert-inview-lbl">In view</span> <b>$236k</b></span>
				</div>

				<!-- Certainty bar — hovering a legend row lights its segment -->
				<div class="g-cert-bar">
					<div
						v-for="t in certaintyTiers" :key="t.key"
						class="g-cert-seg" :class="[t.cls, { 'g-cert-seg--dim': hoverTier && hoverTier !== t.key, 'g-cert-seg--lit': hoverTier === t.key }]"
						:style="{ flexBasis: t.pct + '%' }"
						:title="`${t.label}: ${t.amount}`"
					/>
				</div>

				<div class="g-cert-legend" role="list">
					<div
						v-for="t in certaintyTiers" :key="`lg-${t.key}`" role="listitem"
						class="g-cert-row g-press" :class="{ 'g-cert-row--on': hoverTier === t.key }"
						@mouseenter="hoverTier = t.key" @mouseleave="hoverTier = ''"
						@focusin="hoverTier = t.key" @focusout="hoverTier = ''" tabindex="0"
					>
						<span class="g-cert-dot" :class="t.cls"></span>
						<span class="g-cert-row-body">
							<span class="g-cert-row-top"><b>{{ t.label }}</b><span class="g-cert-row-amt">{{ t.amount }}</span></span>
							<span class="g-cert-row-hint">{{ t.hint }}</span>
						</span>
					</div>
				</div>

				<div class="g-cert-rollup">
					<div v-for="r in certaintyRollup" :key="r.k" class="g-cert-roll" :class="`g-cert-roll--${r.tone}`">
						<span class="g-cert-roll-v">{{ r.v }}</span>
						<span class="g-cert-roll-k">{{ r.k }}</span>
						<span class="g-cert-roll-sub">{{ r.sub }}</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── The Hunt — pursuit tracking + Earnest re-approach ─── -->
		<section id="hunt" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> The Hunt</span>
				<h2 class="e-h2" data-anim="rise">The money you <span class="g-accent-text">haven’t caught yet</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Every proposal has a whole life — even the ones that went cold or got a no. Earnest keeps the record, then reads the history and drafts the way back in. Pick a stalled deal:</p>
			</div>

			<div class="g-hunt" data-anim="scale">
				<div class="g-hunt-aura" aria-hidden="true"><span></span><span></span></div>

				<!-- Pipeline stages cascade in -->
				<div class="g-hunt-stages" data-stagger>
					<div v-for="s in huntStages" :key="s.key" class="g-hunt-stage" :class="{ 'g-hunt-stage--cold': s.key === 'cold', 'g-hunt-stage--won': s.key === 'won' }">
						<span class="g-hunt-stage-ic"><UIcon :name="s.icon" /></span>
						<span class="g-hunt-stage-n">{{ s.count }}</span>
						<span class="g-hunt-stage-l">{{ s.label }}</span>
					</div>
				</div>

				<div class="g-hunt-grid">
					<!-- Cold deals — pick one -->
					<div class="g-hunt-deals" role="tablist" aria-label="Cold deals worth reviving">
						<button
							v-for="(d, i) in coldDeals" :key="d.name" type="button" role="tab"
							class="g-hunt-deal g-press" :class="{ 'g-hunt-deal--on': activeCold === i }"
							:aria-selected="activeCold === i" @click="activeCold = i" @mouseenter="activeCold = i"
						>
							<span class="g-hunt-deal-top">
								<span class="g-hunt-deal-name">{{ d.name }}</span>
								<span class="g-hunt-deal-val">{{ d.value }}</span>
							</span>
							<span class="g-hunt-deal-sub"><span v-html="d.co"></span> · <span class="g-hunt-deal-quiet"><UIcon name="i-lucide-snowflake" /> {{ d.quiet }}</span></span>
						</button>
					</div>

					<!-- Earnest re-approach -->
					<div class="g-hunt-draft g-glass-ultra">
						<div class="g-hunt-draft-head">
							<span class="g-chip g-chip-ai round"><UIcon name="i-lucide-sparkles" /></span>
							<span class="g-hunt-draft-title">Earnest · re-approach</span>
							<span class="g-hunt-draft-scope">{{ coldDeals[activeCold].name }}</span>
						</div>
						<div class="g-hunt-draft-body" :key="activeCold">
							<p class="g-hunt-draft-read"><UIcon name="i-lucide-history" /> <span>{{ coldDeals[activeCold].read }}</span></p>
							<p class="g-hunt-draft-move"><UIcon name="i-lucide-compass" /> <span>{{ coldDeals[activeCold].move }}</span></p>
							<div class="g-hunt-draft-note">
								<span class="g-hunt-draft-note-lbl">Drafted in your voice</span>
								<p>{{ coldDeals[activeCold].draft }}</p>
							</div>
							<div class="g-hunt-draft-actions">
								<button type="button" class="e-btn e-btn-primary g-press" @click="openEarlyAccess()"><UIcon name="i-lucide-send" /> Send the re-approach</button>
								<button type="button" class="g-hunt-draft-touch g-press" @click="openEarlyAccess()"><UIcon name="i-lucide-plus" /> Log as touchpoint</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── The Director's Office — glass briefing deck ─── -->
		<section id="office" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> The Director’s Office</span>
				<h2 class="e-h2" data-anim="rise">Your whole organization, <span class="g-accent-text">presented to you</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">A live briefing across every app, grounded in your goals, brand and data — a read on the situation and the next move, drafted in your voice and ready to automate, one tap away.</p>
			</div>

			<div class="g-deck" data-anim="scale">
				<div class="g-agenda" role="tablist" aria-label="Today's briefing">
					<div class="g-agenda-head">Monday briefing</div>
					<button
						v-for="(s, i) in officeSlides" :key="s.key" type="button" role="tab"
						class="g-agenda-item g-press" :class="{ 'g-agenda-item--on': activeSlide === i }"
						:aria-selected="activeSlide === i" @click="activeSlide = i"
					>
						<span class="g-agenda-idx">{{ String(i + 1).padStart(2, '0') }}</span>
						<span class="g-chip" :class="`g-chip-${s.chip}`"><UIcon :name="s.icon" /></span>
						<span class="g-agenda-label"><span class="g-agenda-name">{{ s.tab }}</span><span class="g-agenda-meta">{{ s.meta }}</span></span>
					</button>
				</div>

				<div class="g-stage g-glass-ultra">
					<div class="g-stage-top">
						<span class="g-stage-present"><span class="g-chip g-chip-ai round"><UIcon name="i-lucide-sparkles" /></span> Presented by Earnest Director</span>
						<span class="g-stage-progress" aria-hidden="true"><span v-for="(s, i) in officeSlides" :key="s.key" class="g-stage-seg" :class="{ 'g-stage-seg--on': i <= activeSlide }"></span></span>
					</div>
					<div class="g-stage-body" :key="activeSlide">
						<div class="g-stage-copy g-slide-anim">
							<span class="g-stage-kicker">{{ current.kicker }}</span>
							<p class="g-stage-stat">{{ current.stat }}<span v-if="current.unit" class="g-stage-unit">{{ current.unit }}</span></p>
							<p class="g-stage-read" v-html="current.read"></p>
							<div class="g-slide-ground"><UIcon name="i-lucide-target" /> <b>{{ currentGround.conf }}% confident</b> · {{ currentGround.ground }}</div>
							<div class="g-stage-actions">
								<span class="g-stage-actions-label">Do it now</span>
								<button v-for="(a, ai) in current.actions" :key="ai" type="button" class="g-prompt g-press g-lift" :class="{ 'g-prompt--soft': ai > 0 }" @click="openEarlyAccess()">
									<span class="g-prompt-ic"><UIcon :name="a.icon" /></span>
									<span class="g-prompt-body"><span class="g-prompt-title">{{ a.title }}</span><span class="g-prompt-sub">{{ a.sub }}</span></span>
									<UIcon name="i-lucide-arrow-right" class="g-prompt-go" />
								</button>
							</div>
						</div>
						<div class="g-stage-media g-slide-anim">
							<div class="e-frame"><div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div><img :src="`/screenshots/latest/${current.shot}.png`" :alt="`Earnest — ${current.tab}`" loading="lazy" decoding="async" class="e-frame-img" /></div>
						</div>
					</div>
					<div class="g-stage-foot">
						<span class="g-stage-hint">Slide <strong>{{ activeSlide + 1 }}</strong> of {{ officeSlides.length }} · every slide ends in a decision</span>
						<div class="g-stage-nav">
							<button type="button" class="g-round-btn g-press" aria-label="Previous slide" @click="prevSlide"><UIcon name="i-lucide-chevron-left" /></button>
							<button type="button" class="g-round-btn g-press" aria-label="Next slide" @click="nextSlide"><UIcon name="i-lucide-chevron-right" /></button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── Momentum — gamification band ─── -->
		<section id="momentum" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Momentum</span>
				<h2 class="e-h2" data-anim="rise">Good decisions, <span class="g-accent-text">made visible</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Every decision you approve — and every automation that lands cleanly — earns points. Earnest turns running the business into a streak worth keeping, the same engine behind the Earnest Score and CardDesk.</p>
			</div>

			<div class="g-momentum" data-anim="scale">
				<!-- Score card -->
				<div class="g-mo-card g-glass g-lift g-mo-score">
					<div class="g-ring">
						<svg viewBox="0 0 100 100">
							<defs><linearGradient id="gRingGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00cfff" /><stop offset="1" stop-color="#235377" /></linearGradient></defs>
							<circle class="g-ring-track" cx="50" cy="50" r="42" fill="none" stroke-width="9" />
							<circle class="g-ring-fill" cx="50" cy="50" r="42" fill="none" stroke-width="9" data-ring="87" stroke-dasharray="263.9" stroke-dashoffset="263.9" />
						</svg>
						<span class="g-ring-num" data-count="87">0</span>
					</div>
					<div class="g-mo-score-meta">
						<span class="g-mo-label">Earnest Score</span>
						<span class="g-mo-level">Level 7 · Operator</span>
						<span class="g-streak">🔥 12-day streak</span>
					</div>
				</div>

				<!-- Dimensions / XP -->
				<div class="g-mo-card g-glass g-mo-dims">
					<span class="g-mo-label">This week</span>
					<div class="g-mo-xps" data-stagger>
						<div v-for="d in scoreDims" :key="d.k" class="g-xp-wrap">
							<div class="g-xp-head"><span>{{ d.k }}</span><b>{{ d.v }}%</b></div>
							<div class="g-xp-track"><div class="g-xp-fill" :data-fill="d.v"></div></div>
						</div>
					</div>
				</div>

				<!-- Badges + counters -->
				<div class="g-mo-card g-glass g-mo-badges">
					<span class="g-mo-label">Unlocked</span>
					<div class="g-badges" data-stagger>
						<span v-for="b in badges" :key="b" class="g-badge g-press">{{ b }}</span>
					</div>
					<div class="g-mo-counts" data-stagger>
						<div class="g-mo-count"><b data-count="128">0</b><small>decisions this month</small></div>
						<div class="g-mo-count"><b data-count="9600" data-prefix="$" data-comma="1">0</b><small>collected on time</small></div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── How a decision flows + guardrails ─── -->
		<section id="decide" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> How a decision flows</span>
				<h2 class="e-h2" data-anim="rise">Earnest does the work<span class="e-dot">.</span> <span class="g-accent-text">You say yes</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">One rhythm everywhere. Nothing reaches a client or moves money without your tap.</p>
			</div>
			<div class="g-decflow" data-anim="scale" :style="{ '--flow-n': flowSteps.length, '--flow-i': activeFlow }">
				<!-- Connected rail: the fill line grows to the active node -->
				<div class="g-decflow-rail" role="tablist" aria-label="How a decision flows">
					<span class="g-decflow-track" aria-hidden="true"><span class="g-decflow-fill"></span></span>
					<button
						v-for="(step, i) in flowSteps" :key="i" type="button" role="tab"
						class="g-decflow-node g-press"
						:class="{ 'g-decflow-node--on': activeFlow === i, 'g-decflow-node--done': i < activeFlow }"
						:aria-selected="activeFlow === i"
						@click="selectFlow(i)" @mouseenter="selectFlow(i)" @focusin="selectFlow(i)"
					>
						<span class="g-decflow-dot"><UIcon :name="activeFlow === i ? step.icon : (i < activeFlow ? 'i-lucide-check' : step.icon)" /></span>
						<span class="g-decflow-tag">{{ step.tag }}</span>
					</button>
				</div>
				<!-- Active step detail — swaps with a soft rise -->
				<div class="g-decflow-panel g-glass" :key="activeFlow">
					<span class="g-decflow-step">Step {{ activeFlow + 1 }} <span>of {{ flowSteps.length }}</span></span>
					<h4>{{ flowSteps[activeFlow].title }}</h4>
					<p v-html="flowSteps[activeFlow].body"></p>
				</div>
			</div>

			<div class="g-sec-head" style="margin-top:56px">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Grounded in your context</span>
				<h2 class="e-h2" data-anim="rise">It <span class="g-accent-text">understands</span> before it acts<span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Most AI sounds confident about everything. Earnest works from what it actually knows — your business, your clients, your brand — so it acts when it truly understands, proposes when it matters, and asks when it’s missing something instead of guessing.</p>
			</div>
			<div class="g-lights" data-stagger>
				<div v-for="l in lights" :key="l.k" class="g-light g-glass g-lift" :class="l.k">
					<div class="g-light-badge"><span class="dot"></span> {{ l.badge }}</div>
					<h4>{{ l.title }}</h4>
					<p>{{ l.desc }}</p>
					<ul><li v-for="(it, j) in l.items" :key="j">{{ it }}</li></ul>
				</div>
			</div>
		</section>

		<!-- ─── Contextual AI switcher ─── -->
		<section id="context" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Context-aware by default</span>
				<h2 class="e-h2" data-anim="rise">It knows <span class="g-accent-text">where you are</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Open Earnest anywhere and it already sees the thing in front of you — the invoice, the project, the whole org. Its suggestions, and what it’s willing to automate, change to match. Pick a spot:</p>
			</div>

			<div class="g-ctx" data-anim="scale">
				<div class="g-seg" :style="{ '--seg-n': ctxSurfaces.length, '--seg-i': activeCtx }" role="tablist" aria-label="Choose a surface">
					<span class="g-seg-ind" aria-hidden="true"></span>
					<button v-for="(c, i) in ctxSurfaces" :key="c.key" type="button" role="tab" class="g-seg-btn" :class="{ 'g-seg-btn--on': activeCtx === i }" :aria-selected="activeCtx === i" @click="activeCtx = i"><UIcon :name="c.icon" /> {{ c.tab }}</button>
				</div>

				<div class="g-ctx-stage">
					<aside class="g-ctx-where g-glass" :key="`w-${activeCtx}`">
						<div class="g-ctx-where-top">
							<span class="g-chip" :class="`g-chip-${ctx.chip}`"><UIcon :name="ctx.icon" /></span>
							<span><span class="g-ctx-where-label">You’re on</span><span class="g-ctx-where-name">{{ ctx.name }}</span></span>
						</div>
						<div class="g-ctx-facts">
							<div v-for="(f, fi) in ctx.facts" :key="fi" class="g-ctx-fact"><span>{{ f.k }}</span><b>{{ f.v }}</b></div>
						</div>
						<div class="g-ctx-knows"><UIcon name="i-lucide-eye" /> <span>{{ ctx.knows }}</span></div>
					</aside>

					<div class="g-ctx-panel g-glass-ultra">
						<div class="g-ctx-panel-head"><span class="g-chip g-chip-ai round" style="width:26px;height:26px"><UIcon name="i-lucide-sparkles" /></span><span class="g-ctx-panel-title">Earnest</span><span class="g-ctx-panel-scope">{{ ctx.scope }}</span></div>
						<div class="g-ctx-panel-body" :key="`b-${activeCtx}`">
							<div class="g-ctx-bubble them">{{ ctx.ask }}</div>
							<div class="g-ctx-bubble me" v-html="ctx.reply"></div>
							<span class="g-ctx-suglabel">Suggested here</span>
							<div class="g-ctx-sugs"><span v-for="(s, si) in ctx.sugs" :key="si" class="g-ctx-sug g-press">{{ s }}</span></div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── Tap-count wins ─── -->
		<section class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Fewer taps, more decisions</span>
				<h2 class="e-h2" data-anim="rise">The same rhythm, <span class="g-accent-text">everywhere</span><span class="e-dot">.</span></h2>
			</div>
			<div class="g-wins" data-stagger>
				<div v-for="(w, i) in wins" :key="i" class="g-win g-glass g-lift">
					<span class="g-win-taps"><s>{{ w.from }}</s> → <b>{{ w.to }}</b></span>
					<span class="g-win-txt"><b>{{ w.title }}</b><span>{{ w.desc }}</span></span>
				</div>
			</div>
		</section>

		<!-- ─── Proof ─── -->
		<section class="e-section e-gallery">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> No mockups</span>
				<h2 class="e-h2" data-anim="rise">Every screen is the real app<span class="e-dot">.</span></h2>
			</div>
			<div class="g-proof" data-stagger>
				<button v-for="(shot, i) in proofShots" :key="shot.slug" type="button" class="g-proof-item g-press" @click="openLightbox(i)" aria-label="Open full-size screenshot">
					<div class="e-frame g-lift"><div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div><img :src="`/screenshots/latest/${shot.slug}.png`" :alt="`Earnest — ${shot.label}`" loading="lazy" decoding="async" class="e-frame-img" /></div>
					<span class="e-gallery-cap"><UIcon :name="shot.icon" /> {{ shot.label }}</span>
				</button>
			</div>
		</section>

		<!-- ─── Lightbox ─── -->
		<Dialog :open="lightboxOpen" @update:open="closeLightbox">
			<DialogContent class="e-lightbox" :show-close-button="false" @keydown.left="lightboxPrev" @keydown.right="lightboxNext">
				<DialogTitle class="sr-only">{{ activeShot?.label || 'Earnest screenshot' }}</DialogTitle>
				<DialogDescription class="sr-only">Press arrow keys to navigate.</DialogDescription>
				<img v-if="activeShot" :src="`/screenshots/latest/${activeShot.slug}.png`" :alt="`Earnest — ${activeShot.label}`" class="e-lightbox-img" />
				<div v-if="activeShot" class="e-lightbox-bar">
					<button type="button" class="e-lightbox-nav" aria-label="Previous" @click="lightboxPrev"><UIcon name="i-lucide-chevron-left" /></button>
					<div class="e-lightbox-meta"><UIcon :name="activeShot.icon" /> {{ activeShot.label }} <span class="e-lightbox-count">{{ lightboxIndex + 1 }} / {{ proofShots.length }}</span></div>
					<button type="button" class="e-lightbox-nav" aria-label="Next" @click="lightboxNext"><UIcon name="i-lucide-chevron-right" /></button>
				</div>
			</DialogContent>
		</Dialog>

		<!-- ─── Pricing ─── -->
		<section id="pricing" class="e-section">
			<div class="g-sec-head">
				<h2 class="e-h2" data-anim="rise"><em>Simple</em> pricing<span class="e-dot">.</span> No surprises<span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">One price. Your whole team. The Director’s Office is included on every plan.</p>
			</div>
			<div class="e-plans" data-stagger>
				<div v-for="(plan, index) in plans" :key="index" class="e-plan g-glass g-lift" :class="{ 'e-plan-featured': plan.featured }">
					<div v-if="plan.featured" class="e-plan-badge">Most popular</div>
					<div class="e-plan-name">{{ plan.name }}</div>
					<div class="e-plan-price"><sup>$</sup>{{ plan.price }}<span>/mo</span></div>
					<div class="e-plan-desc">{{ plan.desc }}</div>
					<ul class="e-plan-feats"><li v-for="(feat, fi) in plan.features" :key="fi"><UIcon name="i-lucide-check" class="e-plan-check" /> {{ feat }}</li></ul>
					<button class="e-btn e-plan-btn g-press" :class="plan.featured ? 'e-btn-primary' : 'e-btn-ghost'" @click="openEarlyAccess()">{{ plan.cta.label }}</button>
				</div>
			</div>
		</section>

		<!-- ─── FAQ + ask a question ─── -->
		<section id="faq" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Questions</span>
				<h2 class="e-h2" data-anim="rise">Good questions, <span class="g-accent-text">straight answers</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">The things people ask before they start. Don’t see yours? Ask below — a real person reads every one.</p>
			</div>

			<div class="g-faq" data-anim="scale">
				<div v-for="(f, i) in faqs" :key="i" class="g-faq-item g-glass" :class="{ 'g-faq-item--on': openFaq === i }">
					<h3 class="g-faq-q">
						<button type="button" class="g-faq-trigger g-press" :aria-expanded="openFaq === i" :aria-controls="`faq-panel-${i}`" @click="toggleFaq(i)">
							<span>{{ f.q }}</span>
							<span class="g-faq-icon" aria-hidden="true"><UIcon :name="openFaq === i ? 'i-lucide-minus' : 'i-lucide-plus'" /></span>
						</button>
					</h3>
					<div v-show="openFaq === i" :id="`faq-panel-${i}`" class="g-faq-a" role="region">
						<p v-html="f.a"></p>
					</div>
				</div>
			</div>

			<!-- Still have a question? — stores in Directus + emails us -->
			<div class="g-ask g-glass-ultra" data-anim="scale">
				<template v-if="!askSuccess">
					<div class="g-ask-copy">
						<span class="g-eyebrow"><span class="g-eyebrow-dot"></span> Still have a question?</span>
						<h3 class="g-ask-title">Ask us anything<span class="e-dot">.</span></h3>
						<p class="g-ask-sub">Drop your question and email — a real person replies, usually the same day.</p>
					</div>
					<form class="g-ask-form" @submit.prevent="submitQuestion">
						<input v-model="askHp" type="text" tabindex="-1" autocomplete="off" class="g-ask-hp" aria-hidden="true" />
						<div class="g-ask-fields">
							<input v-model="askForm.email" type="email" placeholder="you@studio.com" class="g-ask-input" autocomplete="email" aria-label="Your email" />
							<textarea v-model="askForm.question" rows="3" placeholder="What would you like to know?" class="g-ask-input g-ask-textarea" aria-label="Your question"></textarea>
						</div>
						<p v-if="askError" class="g-ask-error">{{ askError }}</p>
						<button type="submit" class="e-btn e-btn-primary g-press" :disabled="askSubmitting">{{ askSubmitting ? 'Sending…' : 'Send question' }}</button>
					</form>
				</template>
				<div v-else class="g-ask-done">
					<span class="g-ask-done-ic"><UIcon name="i-lucide-check" /></span>
					<h3 class="g-ask-title">Got it — thank you<span class="e-dot">.</span></h3>
					<p class="g-ask-sub">We’ll reply to <strong>{{ sentEmail }}</strong> shortly.</p>
				</div>
			</div>
		</section>

		<!-- ─── CardDesk companion ─── -->
		<section class="e-section">
			<div class="g-carddesk g-glass-ultra" data-anim="scale">
				<div class="g-cd-copy">
					<span class="g-eyebrow"><span class="g-eyebrow-dot"></span> CardDesk · companion app</span>
					<h2 class="e-h2">Networking, but make it <span class="g-accent-text">a game</span><span class="e-dot">.</span></h2>
					<p class="g-cd-sub">Snap a business card and Earnest pulls every detail — name, title, company, socials — <strong>straight into your CRM</strong>, enriched and deduped. Then networking becomes a game: earn XP, keep your streak alive, and watch your whole network orbit you.</p>
					<div class="g-cd-actions">
						<a href="https://carddesk.earnest.guru/" target="_blank" rel="noopener" class="e-btn e-btn-primary g-press"><UIcon name="i-lucide-scan-line" /> Explore CardDesk</a>
						<span class="g-cd-hand">first 25 scans on us ✨</span>
					</div>
				</div>
				<div class="g-cd-mock g-glass">
					<div class="g-cd-top">
						<span class="g-cd-avatar">SJ</span>
						<div class="g-cd-id"><span class="g-cd-name">Sarah Johnson</span><span class="g-cd-role">Founder · Northwind</span></div>
						<span class="g-cd-lv">LV 7</span>
					</div>
					<span class="g-cd-scan"><UIcon name="i-lucide-scan-line" /> Scanned in 1.2s · added to People</span>
					<div class="g-xp-wrap">
						<div class="g-xp-head"><span>XP to Level 8</span><b>820 / 1000</b></div>
						<div class="g-xp-track"><div class="g-xp-fill" data-fill="82"></div></div>
					</div>
					<div class="g-cd-badges">
						<span class="g-streak">🔥 7-day streak</span>
						<span class="g-badge">+50 XP</span>
						<span class="g-badge">+1 to Orbit</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── Final CTA ─── -->
		<section class="e-cta">
			<div class="e-cta-card" data-anim="scale">
				<p class="e-cta-word"><span class="e-brand">Earnest</span><span class="e-dot">.</span></p>
				<p class="e-cta-hand">Do good work.</p>
				<p class="e-cta-sub">Stop running the software. Sit at the desk, keep your streak, and let Earnest bring you the decisions — and automate the ones it’s sure of.</p>
				<div class="e-hero-actions" style="justify-content:center">
					<button class="e-btn e-btn-primary g-press" @click="openEarlyAccess()">Start for free</button>
					<a :href="soloDemoUrl" class="e-btn e-btn-ghost g-press">See the demo</a>
				</div>
			</div>
		</section>

		<footer class="e-footer">
			<div class="e-footer-inner">
				<span class="e-footer-copy">&copy; {{ new Date().getFullYear() }} <span class="e-brand">Earnest</span> — Do good work.</span>
				<nav class="e-footer-links">
					<nuxt-link to="/classic">Classic</nuxt-link>
					<nuxt-link to="/automation">Automation</nuxt-link>
					<nuxt-link to="/features">Features</nuxt-link>
					<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
				</nav>
			</div>
		</footer>

		<GlassEarlyAccess ref="eaRef" :solo-demo-url="soloDemoUrl" />
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import '~/assets/css/sellsheet-modern.css';
import '~/assets/css/sellsheet-glass.css';
import '~/assets/css/sellsheet-glass-sections.css';
import Dialog from '~/components/ui/dialog/Dialog.vue';
import DialogContent from '~/components/ui/dialog/DialogContent.vue';
import DialogTitle from '~/components/ui/dialog/DialogTitle.vue';
import DialogDescription from '~/components/ui/dialog/DialogDescription.vue';
import { useGlassMotion } from '~/composables/useGlassMotion';

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;
const heroScreenshotSrc = '/screenshots/latest/organization-overview.png';

const heroChips = [
	{ label: 'Home', icon: 'i-lucide-layout-dashboard', tint: '#00cfff' },
	{ label: 'People', icon: 'i-lucide-users', tint: '#09b0dd' },
	{ label: 'Work', icon: 'i-lucide-square-kanban', tint: '#0da0cc' },
	{ label: 'Chat', icon: 'i-lucide-messages-square', tint: '#1191bb' },
	{ label: 'Money', icon: 'i-lucide-trending-up', tint: '#1681aa' },
	{ label: 'Mktg', icon: 'i-lucide-megaphone', tint: '#1a7299' },
	{ label: 'Org', icon: 'i-lucide-building-2', tint: '#235377' },
	{ label: 'Me', icon: 'i-lucide-circle-user', tint: '#274366' },
];

// Focus — the four opener chips mirror the real in-app Focus screen.
const focusChips = [
	'I’m stretched thin — where do I start?',
	'Help me plan my next hour',
	'What can wait?',
	'What did I do well today?',
];

// Learns / earned trust — what Earnest picks up, and the autonomy you can dial.
const learned = [
	'You send invoice reminders <b>firm but warm</b> — so it drafts them that way.',
	'You review marketing before it ships — so it <b>proposes, never posts</b>.',
	'You clear the Helios account first thing — so it’s <b>waiting at the top</b> each morning.',
	'You reconcile payments the same way every time — so it just <b>does that one</b>.',
];
const trustTiers = [
	{ name: 'Suggests', desc: 'Earnest drafts; you decide everything.' },
	{ name: 'Assists', desc: 'It handles the small, reversible chores on its own.' },
	{ name: 'Runs ahead', desc: 'It takes the routine work end-to-end, with a full trail.' },
];
// Two tiers lit — "you're comfortable letting it assist, not yet run ahead".
const trustLevel = 1;

const marqueeItems = [
	{ label: 'Organizational overview', icon: 'i-lucide-building-2' },
	{ label: 'The morning briefing', icon: 'i-lucide-presentation' },
	{ label: 'Grounded, not generic', icon: 'i-lucide-shield-check' },
	{ label: 'Knows your context', icon: 'i-lucide-eye' },
	{ label: 'Earnest Score & streaks', icon: 'i-lucide-trophy' },
	{ label: 'Learns how you work', icon: 'i-lucide-sparkles' },
	{ label: 'Acts when sure, holds when unsure', icon: 'i-lucide-hand' },
	{ label: 'Cash flow & AR aging', icon: 'i-lucide-trending-up' },
	{ label: 'Focus — one thing at a time', icon: 'i-lucide-target' },
	{ label: 'One approval, whole change', icon: 'i-lucide-check-check' },
];

const officeSlides = [
	{ key: 'overview', tab: 'Overview', meta: '3 decisions', chip: 'org', icon: 'i-lucide-building-2', shot: 'director-presentation', kicker: 'The whole org, today', stat: '3', unit: 'decisions need you', read: 'Across every app, Earnest found <strong>three things worth your attention</strong> — nothing else needs you right now. Here they are, ranked, each already drafted.', actions: [ { icon: 'i-lucide-presentation', title: 'Walk me through today', sub: 'A 90-second guided briefing' }, { icon: 'i-lucide-share-2', title: 'Present to the team', sub: 'Share the brief as a deck' } ] },
	{ key: 'money', tab: 'Money', meta: '$12.4k overdue', chip: 'money', icon: 'i-lucide-trending-up', shot: 'financials-overview', kicker: 'Cash flow', stat: '$12.4k', unit: 'overdue across 4 invoices', read: 'Four invoices are past due, the oldest by <strong>21 days</strong>. Two finished projects are billable but not yet invoiced. Earnest drafted a tailored reminder for each.', actions: [ { icon: 'i-lucide-send', title: 'Chase all 4 overdue', sub: 'Review the batch, then approve' }, { icon: 'i-lucide-receipt', title: 'Bill 2 finished projects', sub: 'Seeded from the contracts' } ] },
	{ key: 'people', tab: 'People', meta: '4 leads cooling', chip: 'people', icon: 'i-lucide-users', shot: 'people-dashboard', kicker: 'Pipeline', stat: '4', unit: 'leads going cold', read: 'Four qualified leads haven’t been touched in <strong>10+ days</strong> — together worth ~$48k. Each note is drafted in that client’s brand voice.', actions: [ { icon: 'i-lucide-mail', title: 'Draft 4 re-engagement notes', sub: 'On-brand, one per lead' }, { icon: 'i-lucide-user-plus', title: 'Reassign coverage', sub: 'Balance across the team' } ] },
	{ key: 'work', tab: 'Work', meta: '2 projects slipping', chip: 'work', icon: 'i-lucide-square-kanban', shot: 'project-workspace', kicker: 'Delivery', stat: '2', unit: 'projects at risk', read: 'The <strong>Helios launch</strong> is ~4 days behind on a design sign-off blocker. Earnest can reflow the timeline — cascading every linked task and meeting — on your say-so.', actions: [ { icon: 'i-lucide-calendar-clock', title: 'Rebalance the timeline', sub: 'Preview the cascade first' }, { icon: 'i-lucide-flag', title: 'Flag owners', sub: 'Notify the two project leads' } ] },
	{ key: 'marketing', tab: 'Marketing', meta: 'Reach down 31%', chip: 'marketing', icon: 'i-lucide-megaphone', shot: 'marketing-overview', kicker: 'Marketing pulse', stat: '−31%', unit: 'reach, last 14 days', read: 'Posting cadence dropped and reach followed. Earnest drafted <strong>three on-brand posts</strong> and a summer campaign plan from your calendar’s open slots.', actions: [ { icon: 'i-lucide-sparkles', title: 'Approve 3 posts', sub: 'Scheduled to the best slots' }, { icon: 'i-lucide-rocket', title: 'Plan a summer campaign', sub: 'Multi-channel, editable' } ] },
];
const activeSlide = ref(0);
const current = computed(() => officeSlides[activeSlide.value]);
// Each briefing carries a confidence + what it's grounded in — the contextual-
// automation cue woven into the deck. The low-confidence marketing slide holds
// for review rather than overselling.
const slideGround = {
	overview: { conf: 96, ground: 'grounded across every app' },
	money: { conf: 94, ground: 'read from your ledger' },
	people: { conf: 88, ground: 'in each client’s voice' },
	work: { conf: 92, ground: 'from the live timeline' },
	marketing: { conf: 74, ground: 'tone-checked — held for your review' },
};
const currentGround = computed(() => slideGround[current.value.key]);
function nextSlide() { activeSlide.value = (activeSlide.value + 1) % officeSlides.length; }
function prevSlide() { activeSlide.value = (activeSlide.value - 1 + officeSlides.length) % officeSlides.length; }

const scoreDims = [
	{ k: 'Follow-through', v: 92 }, { k: 'Responsiveness', v: 78 }, { k: 'Proactivity', v: 84 }, { k: 'Consistency', v: 88 },
];
const badges = ['🏆 First $10k month', '⚡ 12-day streak', '🎯 Zero overdue', '🚀 Fast responder', '📈 Pipeline pro'];

const flowSteps = [
	{ tag: 'Reads', icon: 'i-lucide-scan-eye', title: 'It reads your context', body: 'Across People, Work, Money and Marketing, Earnest assembles a live picture — your <b>goals, brand, audience and real data</b>, not a dashboard to go dig through.' },
	{ tag: 'Drafts', icon: 'i-lucide-pen-line', title: 'It drafts in your voice', body: 'It ranks what needs a decision today and <b>drafts each one in your voice</b> — shaped by your brand, your clients, and how you work, ready to run or refine.' },
	{ tag: 'You say yes', icon: 'i-lucide-check-check', title: 'It acts only when it’s sure', body: 'You approve in place and Earnest runs the multi-step change across every app — holding back when it isn’t sure, and <b>never sending or moving money without your tap.</b>' },
];
// The decision-flow stepper auto-advances so the section reads as motion (a
// decision *flowing*), and stops the moment the visitor takes over.
const activeFlow = ref(0);
let flowTimer = null;
function stopFlowCycle() { if (flowTimer) { clearInterval(flowTimer); flowTimer = null; } }
function selectFlow(i) { activeFlow.value = i; stopFlowCycle(); }
// The guardrail widget, re-cast in the automation language: Earnest doesn't
// oversell — it acts when sure, proposes when it matters, holds when unsure.
const lights = [
	{ k: 'go', badge: 'Acts · high confidence', title: 'When it’s sure, it just does it', desc: 'Grounded, reversible, low-stakes work runs on its own — with a full audit trail and one-tap undo.', items: ['Reconcile a payment to its invoice', 'Summarize a meeting into notes', 'Enrich a scanned contact'] },
	{ k: 'wait', badge: 'Proposes · your call', title: 'When it matters, it waits for you', desc: 'Client-facing or money-moving work is drafted accurately in your voice, then held for your yes.', items: ['Draft an invoice reminder', 'Write an on-brand campaign', 'Prepare a proposal from a lead'] },
	{ k: 'stop', badge: 'Holds · needs context', title: 'When it’s unsure, it asks', desc: 'Thin on brand, goals or audience? Earnest asks for what it’s missing instead of guessing — no generic filler.', items: ['A new client with no brand set', 'A tone it hasn’t seen before', 'Ambiguous or conflicting goals'] },
];

const ctxSurfaces = [
	{ key: 'invoice', tab: 'An invoice', chip: 'money', icon: 'i-lucide-receipt', name: 'Invoice #INV-2043', scope: 'This invoice', facts: [ { k: 'Client', v: 'Helios Corp' }, { k: 'Amount', v: '$8,400' }, { k: 'Status', v: 'Overdue · 12 days' }, { k: 'Contact', v: 'Dana Wu' } ], knows: 'Reads this invoice, its client, and the full payment history.', ask: 'What’s the right nudge here?', reply: 'Drafted a firm-but-warm reminder to <b>Dana</b> — $8,400, 12 days overdue, with a one-tap pay link. Ready when you are.', sugs: ['Draft an overdue reminder', 'Offer a payment plan', 'Record a payment'] },
	{ key: 'project', tab: 'A project', chip: 'work', icon: 'i-lucide-square-kanban', name: 'Helios Launch', scope: 'This project', facts: [ { k: 'Phase', v: '2 of 4' }, { k: 'Due', v: 'In 9 days' }, { k: 'Blocked', v: '3 tasks' }, { k: 'Team', v: '4 members' } ], knows: 'Sees this project’s phases, tasks, team, and timeline.', ask: 'Are we going to make the date?', reply: 'Two blockers on design sign-off put you <b>~4 days behind</b>. I can reflow the timeline and cascade every linked task and meeting.', sugs: ['Reflow the timeline', 'Summarize for the client', 'Assign the blockers'] },
	{ key: 'lead', tab: 'A lead', chip: 'people', icon: 'i-lucide-user-round-search', name: 'Atlas Design', scope: 'This lead', facts: [ { k: 'Source', v: 'Referral' }, { k: 'Stage', v: 'Proposal' }, { k: 'Value', v: '$18k' }, { k: 'Last touch', v: '8 days ago' } ], knows: 'Knows the lead’s brand, brief, and every prior activity.', ask: 'Help me move this forward.', reply: 'They’re warm but cooling. I drafted a check-in in <b>Atlas’s voice</b> and a proposal from your service template — both editable.', sugs: ['Draft a proposal', 'Write a check-in', 'Log a call'] },
	{ key: 'office', tab: 'The Office', chip: 'org', icon: 'i-lucide-building-2', name: 'The whole organization', scope: 'Whole org', facts: [ { k: 'Scope', v: 'Every app' }, { k: 'Decisions', v: '3 open' }, { k: 'Cash', v: 'Healthy' }, { k: 'At risk', v: '2 projects' } ], knows: 'Reasons across every app in the business at once.', ask: 'What needs me today?', reply: 'Three things: chase <b>$12.4k</b> overdue, approve 3 on-brand posts, and rebalance the Helios timeline. Want the walkthrough?', sugs: ['Walk me through today', 'Prep the Monday brief', 'What’s at risk?'] },
];
const activeCtx = ref(0);
const ctx = computed(() => ctxSurfaces[activeCtx.value]);

const wins = [
	{ from: 20, to: 7, title: 'Win a client', desc: 'Lead → proposal → contract → invoice as one guided rail, not re-typed at every step.' },
	{ from: 15, to: 3, title: 'Get paid', desc: '“Chase all overdue” in one tap; “Bill this” on any finished work, already filled in.' },
	{ from: 10, to: 3, title: 'Run a project', desc: 'Say one line; Earnest lays out phases and tasks; you approve the plan in place.' },
	{ from: 14, to: 3, title: 'Do marketing', desc: '“Do it with Earnest” on a client or plan — drafts, schedules, waits for your yes.' },
	{ from: 12, to: 2, title: 'Meetings → tasks', desc: 'The recap writes itself; one tap turns action items into assigned tasks.' },
	{ from: 4, to: 1, title: 'Client signs / pays', desc: 'Their details pre-filled; the action lives on the page they’re reading.' },
];

// ─── Financial clarity — the certainty ladder. Every dollar sorted by how sure
// it is: banked → owed → in play → cold. Hovering a tier lights its segment,
// so the honest money never blurs into the hoped-for pipeline. Percentages sum
// to 100; the ordering runs most-certain → most-speculative left to right.
const certaintyTiers = [
	{ key: 'banked', label: 'Banked', amount: '$84k', pct: 36, hint: 'Paid — already in the account.', cls: 'g-cs-banked' },
	{ key: 'overdue', label: 'Overdue', amount: '$12k', pct: 5, hint: 'Invoiced and past due — chase these first.', cls: 'g-cs-overdue' },
	{ key: 'outstanding', label: 'Outstanding', amount: '$38k', pct: 16, hint: 'Invoiced, not yet due.', cls: 'g-cs-outstanding' },
	{ key: 'inplay', label: 'In play', amount: '$54k', pct: 23, hint: 'Live proposals still open.', cls: 'g-cs-inplay' },
	{ key: 'cold', label: 'Cold', amount: '$48k', pct: 20, hint: 'Went quiet — worth reviving.', cls: 'g-cs-cold' },
];
const hoverTier = ref('');
const certaintyRollup = [
	{ k: 'Banked', v: '$84k', sub: 'money in', tone: 'good' },
	{ k: 'To collect', v: '$50k', sub: 'owed to you', tone: 'warn' },
	{ k: 'In pursuit', v: '$102k', sub: 'still out there', tone: 'accent' },
];

// ─── The Hunt — pursuit tracking. Every proposal has a life, even the cold and
// rejected ones. Click a stalled deal and Earnest reads the history and drafts
// the re-approach. Names mirror the real seeded demo leads.
const huntStages = [
	{ key: 'draft', label: 'Draft', count: 2, icon: 'i-lucide-file-pen' },
	{ key: 'sent', label: 'Sent', count: 5, icon: 'i-lucide-send' },
	{ key: 'viewed', label: 'Viewed', count: 3, icon: 'i-lucide-eye' },
	{ key: 'cold', label: 'Cold', count: 4, icon: 'i-lucide-snowflake' },
	{ key: 'won', label: 'Won', count: 6, icon: 'i-lucide-trophy' },
];
const coldDeals = [
	{ name: 'Maya Chen', co: 'Northwind Studio', value: '$48k', quiet: '18 days quiet',
		read: 'Loved the brand direction, went quiet right after seeing pricing.',
		move: 'Reopen with the case study she asked for — hold the number, offer a phased start.',
		draft: 'Hi Maya — circling back with that Northwind case study you wanted. No pressure on the numbers; happy to start with a smaller first phase if that’s easier to green-light.' },
	{ name: 'Daniel Ortiz', co: 'Cedar &amp; Co', value: '$22k', quiet: '26 days quiet',
		read: 'Budget froze at quarter-end — and that quarter is now over.',
		move: 'A warm, no-agenda check-in that references their Q3 launch fits the moment.',
		draft: 'Hey Daniel — saw the Q3 launch go live, congrats. Now that the new quarter’s open I’d love to pick our conversation back up whenever the timing’s right for you.' },
	{ name: 'Priya Nair', co: 'Lumen Health', value: '$15k', quiet: '12 days quiet',
		read: 'Your champion changed roles; the thread went cold with her.',
		move: 'Re-introduce to the new lead with the one-pager, framed around patient onboarding time.',
		draft: 'Hi Priya — congrats on the new role. Passing along the one-pager on cutting patient onboarding time; happy to walk your team through it whenever’s useful.' },
];
const activeCold = ref(0);

const proofShots = [
	{ slug: 'director-presentation', label: 'The Director’s Office', icon: 'i-lucide-building-2' },
	{ slug: 'command-center', label: 'Command Center', icon: 'i-lucide-zap' },
	{ slug: 'ai-sidebar', label: 'Context-aware Earnest', icon: 'i-lucide-sparkles' },
	{ slug: 'financials-overview', label: 'Money · Cash Flow', icon: 'i-lucide-trending-up' },
	{ slug: 'people-dashboard', label: 'People & CRM', icon: 'i-lucide-users' },
	{ slug: 'marketing-overview', label: 'Marketing Pulse', icon: 'i-lucide-radar' },
];
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const activeShot = computed(() => proofShots[lightboxIndex.value] || null);
function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true; }
function closeLightbox(open) { if (!open) lightboxOpen.value = false; }
function lightboxPrev() { lightboxIndex.value = (lightboxIndex.value - 1 + proofShots.length) % proofShots.length; }
function lightboxNext() { lightboxIndex.value = (lightboxIndex.value + 1) % proofShots.length; }

const plans = [
	{ name: 'Solo', price: '49', desc: 'For the one-person shop doing serious work.', featured: false, features: ['1 team seat', 'The Director’s Office included', 'All seven apps included', 'People CRM, projects & invoicing', 'Context-aware Earnest AI', 'Earnest Score & CardDesk', '5 client portal seats', '100K AI tokens/month'], cta: { label: 'Get started' } },
	{ name: 'Studio', price: '149', desc: 'For the team that means business.', featured: true, features: ['8 team seats', 'Everything in Solo', 'Team channels & video', 'Director mode & token management', 'Whitelabel & branded email', '15 client portal seats', '400K AI tokens/month', '$408/yr if billed annually'], cta: { label: 'Start free trial' } },
	{ name: 'Agency', price: '299', desc: 'For the business that has grown into something real.', featured: false, features: ['15 team seats', 'Everything in Studio', 'Unlimited client portal seats', 'Bank sync & expenses', 'Priority support + onboarding', '1M AI tokens/month', '$2,491/yr if billed annually'], cta: { label: 'Talk to us' } },
];

// FAQ — grounded in the site's own copy (guardrails, pricing, context-awareness).
const faqs = [
	{ q: 'How is Earnest different from ChatGPT or generic AI assistants?', a: 'Earnest runs on a <strong>real large language model</strong> — Anthropic’s Claude, on no-training terms, the same class of AI as ChatGPT — but instead of starting from a blank prompt, it works from your <strong>actual organization</strong>: your goals, brand, clients and live data across every app, and drafts the day’s decisions in your voice. Because it works from real context, it acts on what it understands, proposes when it matters, and asks when it’s missing something instead of guessing.' },
	{ q: 'What is Focus mode?', a: 'Focus is a calm, full-screen space where Earnest sits with you — one honest read on where things stand, and room to take the day <strong>one thing at a time</strong> instead of scanning a dashboard. Step in when it’s a lot; it’s the same Earnest, just quieter and one-on-one.' },
	{ q: 'Does Earnest really learn how I work?', a: 'Yes. It learns your voice, your rhythm, the calls you always make and the ones you never would — so its drafts sound like you and its priorities match yours. As it proves itself accurate you can <strong>dial up how much it handles</strong> on its own, from suggesting to assisting to running routine work end to end. There’s a hard floor it never crosses: money and client-facing sends always wait for your tap.' },
	{ q: 'Will Earnest send emails or move money on its own?', a: 'No. Low-stakes, reversible work — reconciling a payment, summarizing a meeting, enriching a contact — can run automatically with a full audit trail. But <strong>nothing reaches a client or moves money without your tap</strong>. Client-facing and financial actions are always drafted for your approval first.' },
	{ q: 'What does it cost?', a: 'Three plans: <strong>Solo $49/mo</strong>, <strong>Studio $149/mo</strong>, and <strong>Agency $299/mo</strong> — priced per workspace, not per action. The Director’s Office and all seven apps are included on every plan, so there are no usage surprises.' },
	{ q: 'Is Earnest for solo operators or bigger agencies?', a: 'Both. Solo is built for the one-person shop doing serious work; Studio and Agency add seats, team channels and director tooling as you grow. The same daily rhythm scales from one person to a full team.' },
	{ q: 'What happens when Earnest doesn’t have enough context?', a: 'It stops and asks. If it’s thin on your brand, your goals, or a client’s voice, Earnest tells you what it’s missing instead of guessing or filling in generic text. It only acts on what it actually understands — real context over generic confidence.' },
	{ q: 'Do I have to replace all my tools at once?', a: 'No. Earnest brings People, Work, Money and Marketing into one place, but you can start where it hurts most — chasing invoices, running a project, re-engaging leads — and let it earn the rest. Everything’s included, so there’s nothing extra to buy as you expand.' },
	{ q: 'Can I track proposals that go cold or get rejected?', a: 'Yes — that’s the point. Earnest keeps the <strong>whole life of every proposal</strong>, including the ones that went quiet or got a no, attached to the lead or client and its contact. Cold and lost deals stay on the record so you can see your real win rate, learn why work slips, and pick a deal back up later instead of losing the history.' },
	{ q: 'What’s the difference between money I’m owed and money that’s still out there?', a: 'Earnest sorts every dollar by <strong>how certain it is</strong>: <em>banked</em> (paid), <em>owed</em> (invoiced — overdue or not yet due), <em>in play</em> (live proposals still open), and <em>cold</em> (deals that went quiet). Owed money is billed and collectible; money still out there is pipeline you haven’t won yet. Keeping them on separate rungs means the honest cash never blurs into the hopeful pipeline.' },
	{ q: 'What happens to a deal that goes quiet?', a: 'It doesn’t just disappear. Earnest flags it as <strong>cold</strong>, keeps it in view as money worth reviving, and — because it remembers the full history — reads what happened and <strong>drafts the re-approach in your voice</strong>, ready for your tap. You decide whether to send it or log it as a touchpoint; nothing goes out on its own.' },
	{ q: 'Can I try it before committing?', a: 'Yes. Explore the <strong>live demo</strong> right now with real sample data, or request early access to get your own workspace set up while we finalize production.' },
	{ q: 'Who can see my data?', a: 'Your workspace is private to your organization — only members you invite can see it, and we never sell your data or share one customer’s data with another. Earnest’s AI reads your data only to generate your own results: context goes to Anthropic’s Claude under no-training terms that bar it from training on it, and we don’t train our own models on it either. Full detail is in our <a href="/privacy-policy">privacy policy</a>.' },
];
const openFaq = ref(0);
function toggleFaq(i) { openFaq.value = openFaq.value === i ? -1 : i; }

// Ask a question — stores in Directus (visitor_questions) + emails us, via the
// same flow-trigger pattern as early access. CORS allows the prod domain only.
const QUESTIONS_FLOW_ID = '817664b8-0984-4ab8-8db5-e3edc440cb2b';
const questionsUrl = `${config.public.directusUrl || 'https://admin.earnest.guru'}/flows/trigger/${QUESTIONS_FLOW_ID}`;
const askForm = reactive({ email: '', question: '' });
const askHp = ref('');
const askSubmitting = ref(false);
const askSuccess = ref(false);
const askError = ref('');
const sentEmail = ref('');
const askEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(askForm.email.trim()));
async function submitQuestion() {
	askError.value = '';
	if (!askEmailValid.value) { askError.value = 'Please enter a valid email so we can reply.'; return; }
	if (askForm.question.trim().length < 5) { askError.value = 'Add a little more detail to your question.'; return; }
	askSubmitting.value = true;
	try {
		await $fetch(questionsUrl, {
			method: 'POST',
			body: {
				email: askForm.email.trim(),
				question: askForm.question.trim(),
				source: 'faq-question-form',
				referrer: typeof window !== 'undefined' ? window.location.href : '',
				hp: askHp.value,
			},
		});
		sentEmail.value = askForm.email.trim();
		askSuccess.value = true;
	} catch {
		askError.value = 'Something went wrong sending that — please try again in a moment.';
	} finally { askSubmitting.value = false; }
}

// Nav
const navScrolled = ref(false);
function onScroll() { navScrolled.value = window.scrollY > 40; }

// Nav badge — a subtle loop between Earnest's two flagship experiences, pausing
// on each. Respects prefers-reduced-motion (holds on the first, "Director").
const navBadges = ['Director', 'Automation'];
const navBadgeIdx = ref(0);
let navBadgeTimer = null;

// Theme — DARK by default (matches the app's dark-default identity + the aura),
// with a toggle into light. Persists to localStorage; writes `.dark` on <html>.
const colorMode = useColorMode({ initialValue: 'dark', storageKey: 'earnest-mkt-theme' });
const isDark = computed(() => colorMode.value === 'dark');
function toggleTheme() { colorMode.value = isDark.value ? 'light' : 'dark'; }

// Early access (delegated to shared child component)
const eaRef = ref(null);
function openEarlyAccess() { eaRef.value?.open(); }

// Motion engine (dock magnification + reveals + counters + rings)
const { initMotion, revertMotion, dockRef, onDockMove, onDockLeave } = useGlassMotion();

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
	initMotion();
	// Loop the nav badge (Director ⇄ Automation) with a pause on each, unless
	// the visitor prefers reduced motion.
	const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
	if (!reduceMotion) {
		navBadgeTimer = window.setInterval(() => {
			navBadgeIdx.value = (navBadgeIdx.value + 1) % navBadges.length;
		}, 3200);
		// Cycle the decision-flow stepper until the visitor interacts with it.
		flowTimer = window.setInterval(() => {
			activeFlow.value = (activeFlow.value + 1) % flowSteps.length;
		}, 3600);
	}
});
onUnmounted(() => {
	window.removeEventListener('scroll', onScroll);
	revertMotion();
	if (navBadgeTimer) clearInterval(navBadgeTimer);
	stopFlowCycle();
});
// Head/SEO is set by the host page (index.vue at `/`, director.vue at `/director`)
// so the same component can be both the indexable landing and the noindex alias.
</script>

<style scoped>
/* Gaegu's curly apostrophe carries heavy side-bearing, so "that’s" rendered as
   "that’ s". Pull the following letter back to close the gap. */
.e-tagline-tight { margin-right: -0.14em; }

/* Theme toggle in the nav */
.e-nav-right { display: flex; align-items: center; gap: 14px; }
.e-theme-toggle {
	width: 34px; height: 34px; border-radius: 50%; border: 0; flex: none;
	display: grid; place-items: center; cursor: pointer;
	color: var(--g-ink-2); background: var(--g-accent-soft);
	transition: background 0.2s, color 0.2s, transform 0.15s var(--spring);
}
.e-theme-toggle:hover { color: var(--g-accent-ink); background: var(--g-accent-line); }
.e-theme-toggle:active { transform: scale(0.92); }
.e-theme-toggle :deep(svg), .e-theme-toggle :deep([class*='iconify']) { width: 17px; height: 17px; }

/* Fixed-size slot so the Director ⇄ Automation swap never reflows the nav —
   min-width holds the WIDER word's footprint, the pill centers inside it, and
   the reserved height survives the out-in gap when no badge is mounted. */
.e-nav-badge-wrap {
	display: inline-flex; align-items: center; justify-content: center;
	min-width: 104px; height: 19px; margin-left: 10px; line-height: 1;
}
/* Nav badge crossfade — a soft vertical slip as it loops Director ⇄ Automation. */
.e-badge-enter-active,
.e-badge-leave-active { transition: opacity 0.4s ease, transform 0.4s var(--spring); }
.e-badge-enter-from { opacity: 0; transform: translateY(-5px); }
.e-badge-leave-to { opacity: 0; transform: translateY(5px); }

/* ─── Focus — a dark, calm stage embedded in the light page. Mirrors the real
   in-app Focus surface (near-black ground + soft aura) so it reads as the
   product, and its darkness gives the scroll a moment of quiet. ─── */
.g-focus {
	position: relative;
	max-width: 860px;
	margin: 0 auto;
	border-radius: 28px;
	overflow: hidden;
	padding: clamp(38px, 6vw, 76px) clamp(20px, 5vw, 56px);
	background: radial-gradient(130% 120% at 50% 0%, #14203a 0%, #0a1120 55%, #060a13 100%);
	box-shadow: 0 34px 90px -34px rgba(10, 20, 45, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06);
	text-align: center;
}
.g-focus-aura { position: absolute; inset: 0; pointer-events: none; }
.g-focus-aura span {
	position: absolute; width: 48%; aspect-ratio: 1; border-radius: 50%;
	filter: blur(64px); opacity: 0.5;
}
.g-focus-aura span:nth-child(1) { left: -8%; top: 4%; background: radial-gradient(circle, rgba(86, 91, 168, 0.7), transparent 66%); }
.g-focus-aura span:nth-child(2) { right: -8%; top: 34%; background: radial-gradient(circle, rgba(47, 138, 132, 0.6), transparent 66%); }
.g-focus-inner { position: relative; display: flex; flex-direction: column; align-items: center; gap: 22px; }
.g-focus-mark { font-family: Georgia, 'Times New Roman', serif; font-size: 30px; color: #eef2f8; }
.g-focus-dot { color: var(--g-accent); }
.g-focus-greet {
	font-family: Georgia, 'Times New Roman', serif;
	font-size: clamp(20px, 3.1vw, 30px); line-height: 1.42;
	color: rgba(238, 242, 248, 0.94); max-width: 24ch; margin: 0; text-wrap: balance;
}
.g-focus-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 9px; max-width: 560px; }
.g-focus-chip {
	font-size: 13px; color: rgba(238, 242, 248, 0.82);
	background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12);
	border-radius: 999px; padding: 9px 15px; cursor: default;
	transition: background 0.2s, transform 0.18s var(--spring);
}
.g-focus-chip:hover { background: rgba(255, 255, 255, 0.12); }
.g-focus-chip:active { transform: scale(0.96); }
.g-focus-composer {
	display: flex; align-items: center; justify-content: space-between; gap: 12px;
	width: min(560px, 100%); margin-top: 4px;
	background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.14);
	border-radius: 999px; padding: 11px 11px 11px 20px;
}
.g-focus-ph { color: rgba(238, 242, 248, 0.45); font-size: 14.5px; }
.g-focus-send {
	width: 34px; height: 34px; border-radius: 50%; flex: none; display: grid; place-items: center;
	background: linear-gradient(150deg, var(--g-accent), var(--g-accent-2)); color: #fff;
}

/* ─── Financial clarity — a light certainty ladder. Distinct from the dark/glass
   sections around it: a warm tinted plinth with a single segmented certainty bar
   whose tiers light up on hover, linking the legend to the bar. ─── */
.g-clarity { max-width: 940px; margin: 0 auto; padding: clamp(22px, 4vw, 38px); border-radius: 26px; }
.g-cert-top { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.g-cert-caption { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: var(--g-ink-3); text-transform: uppercase; letter-spacing: 0.05em; }
.g-cert-caplic { color: var(--g-accent); }
.g-cert-inview { font-size: 13px; color: var(--g-ink-3); }
.g-cert-inview b { font-size: clamp(20px, 3vw, 26px); font-weight: 800; color: var(--g-ink); margin-left: 4px; }
.g-cert-inview-lbl { text-transform: uppercase; letter-spacing: 0.06em; font-size: 10px; }

.g-cert-bar { display: flex; gap: 3px; height: 22px; border-radius: 999px; overflow: hidden; background: var(--g-accent-soft); padding: 0; }
.g-cert-seg { height: 100%; flex-grow: 0; flex-shrink: 1; border-radius: 4px; transition: filter 0.3s var(--spring), transform 0.3s var(--spring), box-shadow 0.3s; transform-origin: center; }
.g-cert-seg:first-child { border-radius: 999px 4px 4px 999px; }
.g-cert-seg:last-child { border-radius: 4px 999px 999px 4px; }
.g-cert-seg--dim { filter: saturate(0.35) opacity(0.4); }
.g-cert-seg--lit { transform: scaleY(1.28); box-shadow: 0 6px 18px -6px rgba(20, 55, 85, 0.5); z-index: 1; }
.g-cs-banked { background: linear-gradient(135deg, #34c77b, #1f9d5a); }
.g-cs-overdue { background: linear-gradient(135deg, #f0575c, #d43a40); }
.g-cs-outstanding { background: linear-gradient(135deg, #f5b638, #e39510); }
.g-cs-inplay { background: linear-gradient(135deg, var(--g-accent), var(--g-accent-2, #235377)); }
.g-cs-cold { background: #8aa0b4; background-image: repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.42) 0 4px, transparent 4px 9px); }
span.g-cert-dot { width: 12px; height: 12px; border-radius: 4px; flex: none; }

.g-cert-legend { display: grid; grid-template-columns: repeat(auto-fit, minmax(168px, 1fr)); gap: 6px; margin-top: 18px; }
.g-cert-row { display: flex; align-items: flex-start; gap: 10px; padding: 11px 13px; border-radius: 15px; cursor: default; outline: none; transition: background 0.2s, transform 0.2s var(--spring), box-shadow 0.2s; }
.g-cert-row:hover, .g-cert-row--on { background: var(--g-accent-soft); transform: translateY(-2px); box-shadow: 0 10px 24px -14px rgba(20, 55, 85, 0.4); }
.g-cert-row .g-cert-dot { margin-top: 3px; }
.g-cert-row-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.g-cert-row-top { display: flex; align-items: baseline; gap: 8px; }
.g-cert-row-top b { font-size: 14px; font-weight: 700; color: var(--g-ink); }
.g-cert-row-amt { font-size: 13px; font-weight: 700; color: var(--g-accent-ink); font-variant-numeric: tabular-nums; }
.g-cert-row-hint { font-size: 12px; line-height: 1.4; color: var(--g-ink-3); }

.g-cert-rollup { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 22px; padding-top: 20px; border-top: 1px solid var(--g-line); text-align: center; }
.g-cert-roll { display: flex; flex-direction: column; gap: 1px; }
.g-cert-roll-v { font-size: clamp(20px, 3vw, 26px); font-weight: 800; font-variant-numeric: tabular-nums; line-height: 1.1; }
.g-cert-roll-k { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--g-ink-2); margin-top: 3px; }
.g-cert-roll-sub { font-size: 11.5px; color: var(--g-ink-3); }
.g-cert-roll--good .g-cert-roll-v { color: #1f9d5a; }
.g-cert-roll--warn .g-cert-roll-v { color: #e39510; }
.g-cert-roll--accent .g-cert-roll-v { color: var(--g-accent-ink); }

/* ─── The Hunt — a dark stage (mirrors Focus) so the pursuit story reads as its
   own beat. Pipeline stages cascade in; picking a cold deal swaps Earnest's
   re-approach draft with a soft rise. ─── */
.g-hunt {
	position: relative; max-width: 1000px; margin: 0 auto; border-radius: 28px; overflow: hidden;
	padding: clamp(26px, 4.5vw, 50px) clamp(20px, 4vw, 48px);
	background: radial-gradient(120% 130% at 18% 0%, #14303a 0%, #0b1a24 52%, #060e14 100%);
	box-shadow: 0 34px 90px -34px rgba(8, 24, 34, 0.62), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.g-hunt-aura { position: absolute; inset: 0; pointer-events: none; }
.g-hunt-aura span { position: absolute; width: 46%; aspect-ratio: 1; border-radius: 50%; filter: blur(66px); opacity: 0.5; }
.g-hunt-aura span:nth-child(1) { left: -6%; top: -6%; background: radial-gradient(circle, rgba(47, 138, 132, 0.62), transparent 66%); }
.g-hunt-aura span:nth-child(2) { right: -8%; bottom: -10%; background: radial-gradient(circle, rgba(0, 143, 200, 0.5), transparent 66%); }

.g-hunt-stages { position: relative; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 26px; }
.g-hunt-stage { display: flex; align-items: center; gap: 9px; padding: 9px 15px; border-radius: 999px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: rgba(238, 244, 250, 0.9); }
.g-hunt-stage-ic { display: grid; place-items: center; color: rgba(238, 244, 250, 0.62); }
.g-hunt-stage-n { font-size: 16px; font-weight: 800; font-variant-numeric: tabular-nums; }
.g-hunt-stage-l { font-size: 12px; color: rgba(238, 244, 250, 0.66); text-transform: uppercase; letter-spacing: 0.05em; }
.g-hunt-stage--cold { background: rgba(138, 160, 180, 0.14); border-color: rgba(160, 185, 205, 0.34); }
.g-hunt-stage--cold .g-hunt-stage-ic { color: #a9c3d6; }
.g-hunt-stage--won { background: rgba(52, 199, 123, 0.16); border-color: rgba(52, 199, 123, 0.4); }
.g-hunt-stage--won .g-hunt-stage-ic { color: #46d68b; }

.g-hunt-grid { position: relative; display: grid; grid-template-columns: 0.92fr 1.08fr; gap: 16px; align-items: start; }
.g-hunt-deals { display: grid; gap: 8px; }
.g-hunt-deal {
	display: flex; flex-direction: column; gap: 5px; text-align: left; cursor: pointer;
	padding: 14px 16px; border-radius: 17px; color: #eef4fa;
	background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.09);
	transition: background 0.22s, border-color 0.22s, transform 0.2s var(--spring);
}
.g-hunt-deal:hover { background: rgba(255, 255, 255, 0.07); }
.g-hunt-deal--on { background: rgba(0, 143, 200, 0.16); border-color: rgba(0, 176, 221, 0.5); transform: translateX(3px); }
.g-hunt-deal-top { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.g-hunt-deal-name { font-size: 15px; font-weight: 700; }
.g-hunt-deal-val { font-size: 14px; font-weight: 800; color: #46d68b; font-variant-numeric: tabular-nums; }
.g-hunt-deal-sub { font-size: 12.5px; color: rgba(238, 244, 250, 0.6); }
.g-hunt-deal-quiet { display: inline-flex; align-items: center; gap: 4px; color: #a9c3d6; }

.g-hunt-draft { padding: 20px 22px; border-radius: 22px; }
.g-hunt-draft-head { display: flex; align-items: center; gap: 9px; }
.g-hunt-draft-title { font-size: 13px; font-weight: 700; color: #eef4fa; }
.g-hunt-draft-scope { margin-left: auto; font-size: 11px; font-weight: 600; color: rgba(238, 244, 250, 0.55); text-transform: uppercase; letter-spacing: 0.05em; }
.g-hunt-draft-body { display: grid; gap: 12px; margin-top: 16px; animation: g-hunt-rise 0.42s var(--spring); }
@keyframes g-hunt-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.g-hunt-draft-read, .g-hunt-draft-move { display: flex; gap: 9px; font-size: 13.5px; line-height: 1.5; color: rgba(238, 244, 250, 0.86); margin: 0; }
.g-hunt-draft-read :deep(svg), .g-hunt-draft-move :deep(svg) { flex: none; margin-top: 2px; color: var(--g-accent); }
.g-hunt-draft-note { padding: 13px 15px; border-radius: 15px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.09); }
.g-hunt-draft-note-lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--g-accent); }
.g-hunt-draft-note p { margin: 6px 0 0; font-size: 13.5px; line-height: 1.52; color: rgba(238, 244, 250, 0.9); }
.g-hunt-draft-actions { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 2px; }
.g-hunt-draft-touch { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; cursor: pointer; color: #eef4fa; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.14); transition: background 0.2s; }
.g-hunt-draft-touch:hover { background: rgba(255, 255, 255, 0.12); }

@media (max-width: 720px) {
	.g-hunt-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
	.g-hunt-draft-body { animation: none; }
	.g-cert-seg--lit { transform: none; }
}

/* ─── Learns / earned trust — light glass cards ─── */
.g-learn { display: grid; grid-template-columns: 1.1fr 1fr; gap: 20px; max-width: 980px; margin: 0 auto; align-items: start; }
.g-learn-card { padding: 24px 26px; border-radius: 22px; }
.g-learn-label {
	display: inline-flex; align-items: center; gap: 8px;
	font-size: 12px; font-weight: 700; color: var(--g-accent-ink);
	text-transform: uppercase; letter-spacing: 0.05em;
}
.g-learn-ic { color: var(--g-accent); flex: none; }
.g-learn-list { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 14px; }
.g-learn-list li { display: flex; gap: 10px; font-size: 14.5px; line-height: 1.5; color: var(--g-ink-2); }
.g-learn-list li .g-learn-ic { margin-top: 3px; }
.g-learn-list li :deep(b) { color: var(--g-ink); font-weight: 700; }
.g-trust-tiers { display: grid; gap: 13px; margin-top: 18px; }
.g-trust-tier { display: flex; gap: 12px; align-items: flex-start; opacity: 0.45; transition: opacity 0.35s var(--spring); }
.g-trust-tier--on { opacity: 1; }
.g-trust-dot { width: 12px; height: 12px; border-radius: 50%; margin-top: 4px; flex: none; border: 2px solid var(--g-accent-line); background: transparent; transition: background 0.35s, box-shadow 0.35s; }
.g-trust-tier--on .g-trust-dot { background: var(--g-accent); border-color: var(--g-accent); box-shadow: 0 0 0 4px var(--g-accent-soft); }
.g-trust-body { display: flex; flex-direction: column; gap: 1px; }
.g-trust-body b { font-size: 15px; color: var(--g-ink); font-weight: 700; }
.g-trust-body span { font-size: 13.5px; color: var(--g-ink-3); }
.g-trust-floor {
	display: flex; gap: 8px; align-items: flex-start;
	margin: 20px 0 0; padding-top: 16px; border-top: 1px solid var(--g-line);
	font-size: 13px; line-height: 1.5; color: var(--g-ink-3);
}
.g-trust-floor .g-learn-ic { margin-top: 2px; }

@media (max-width: 760px) {
	.g-learn { grid-template-columns: 1fr; }
}
</style>
