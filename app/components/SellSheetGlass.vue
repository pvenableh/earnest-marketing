<template>
	<div class="e-page g-page">
		<!-- ─── Nav ─── -->
		<nav class="e-nav" :class="{ 'e-nav-scrolled': navScrolled }">
			<nuxt-link to="/" class="e-nav-brand">
				<LogoEarnest size="md" />
				<span class="e-nav-badge">Director</span>
			</nuxt-link>
			<div class="e-nav-links">
				<a href="#office" class="e-nav-link">The Office</a>
				<a href="#momentum" class="e-nav-link">Momentum</a>
				<a href="#context" class="e-nav-link">Context</a>
				<a href="#pricing" class="e-nav-link">Pricing</a>
				<a href="#faq" class="e-nav-link">FAQ</a>
			</div>
			<button type="button" class="e-nav-link e-nav-cta g-press" @click="openEarlyAccess()">Start for free</button>
		</nav>

		<!-- ─── Hero ─── -->
		<header class="e-hero">
			<span class="g-eyebrow opacity-0"><span class="g-eyebrow-dot"></span> Context-aware automation · the Director’s Office</span>
			<h1 class="e-hero-wordmark opacity-0">Earnest<span class="e-hero-period">.</span></h1>
			<p class="e-hero-tagline opacity-0">Context in<span class="e-dot">.</span> Accuracy out<span class="e-dot">.</span></p>
			<p class="e-hero-sub opacity-0">
				The decision machine that <strong>automates on context</strong>. Earnest reads your entire organization — your goals, brand, audience and live data — drafts the day’s decisions <strong>in your voice</strong>, and automates only what it’s sure of. You just say&nbsp;yes — and watch your momentum climb.
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
			<div class="g-flow" data-stagger>
				<div v-for="(step, i) in flowSteps" :key="i" class="g-flow-step g-glass g-lift">
					<div class="g-flow-n">{{ i + 1 }}</div>
					<h4>{{ step.title }}</h4>
					<p v-html="step.body"></p>
				</div>
			</div>

			<div class="g-sec-head" style="margin-top:56px">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Accurate over eager</span>
				<h2 class="e-h2" data-anim="rise">It doesn’t <span class="g-accent-text">oversell</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Most AI acts confident about everything. Earnest is calibrated — it acts when it’s sure, proposes when it matters, and holds back when it doesn’t have enough to be right.</p>
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
				<h2 class="e-h2" data-anim="rise"><em>Honest</em> pricing<span class="e-dot">.</span> No surprises<span class="e-dot">.</span></h2>
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
	{ label: 'Money', icon: 'i-lucide-trending-up', tint: '#1681aa' },
	{ label: 'Mktg', icon: 'i-lucide-megaphone', tint: '#1a7299' },
	{ label: 'Org', icon: 'i-lucide-building-2', tint: '#235377' },
	{ label: 'Me', icon: 'i-lucide-circle-user', tint: '#274366' },
];

const marqueeItems = [
	{ label: 'Organizational overview', icon: 'i-lucide-building-2' },
	{ label: 'The morning briefing', icon: 'i-lucide-presentation' },
	{ label: 'Grounded, not generic', icon: 'i-lucide-shield-check' },
	{ label: 'Confidence-scored', icon: 'i-lucide-gauge' },
	{ label: 'Earnest Score & streaks', icon: 'i-lucide-trophy' },
	{ label: 'Context-aware automation', icon: 'i-lucide-sparkles' },
	{ label: 'Acts when sure, holds when unsure', icon: 'i-lucide-hand' },
	{ label: 'Cash flow & AR aging', icon: 'i-lucide-trending-up' },
	{ label: 'Liquid glass UI', icon: 'i-lucide-square-stack' },
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
	{ title: 'It reads your context', body: 'Across People, Work, Money and Marketing, Earnest assembles a live picture — your <b>goals, brand, audience and real data</b>, not a dashboard to go dig through.' },
	{ title: 'It drafts, and scores itself', body: 'It ranks what needs a decision today, <b>drafts the work in your voice</b>, and tells you how confident it is in each one.' },
	{ title: 'It acts only when it’s sure', body: 'You approve in place and Earnest runs the multi-step change across every app — holding back when it isn’t sure, and <b>never sending or moving money without your tap.</b>' },
];
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

const proofShots = [
	{ slug: 'director-presentation', label: 'The Director’s Office', icon: 'i-lucide-building-2' },
	{ slug: 'director-slides', label: 'The presentation deck', icon: 'i-lucide-presentation' },
	{ slug: 'command-center', label: 'Command Center', icon: 'i-lucide-zap' },
	{ slug: 'ai-sidebar', label: 'Context-aware Earnest', icon: 'i-lucide-sparkles' },
	{ slug: 'financials-overview', label: 'Money · Cash Flow', icon: 'i-lucide-trending-up' },
	{ slug: 'people-dashboard', label: 'People & CRM', icon: 'i-lucide-users' },
	{ slug: 'project-workspace', label: 'Project Workspace', icon: 'i-lucide-folder-kanban' },
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
	{ q: 'How is Earnest different from ChatGPT or generic AI assistants?', a: 'Generic AI starts from a blank prompt and sounds confident about everything. Earnest reads your actual organization — your goals, brand, clients and live data across every app — drafts the day’s decisions <strong>in your voice</strong>, and tells you how confident it is. It acts when it’s sure, proposes when it matters, and holds back when it isn’t.' },
	{ q: 'Will Earnest send emails or move money on its own?', a: 'No. Low-stakes, reversible work — reconciling a payment, summarizing a meeting, enriching a contact — can run automatically with a full audit trail. But <strong>nothing reaches a client or moves money without your tap</strong>. Client-facing and financial actions are always drafted for your approval first.' },
	{ q: 'What does it cost?', a: 'Three plans: <strong>Solo $49/mo</strong>, <strong>Studio $149/mo</strong>, and <strong>Agency $299/mo</strong> — priced per workspace, not per action. The Director’s Office and all seven apps are included on every plan, so there are no usage surprises.' },
	{ q: 'Is Earnest for solo operators or bigger agencies?', a: 'Both. Solo is built for the one-person shop doing serious work; Studio and Agency add seats, team channels and director tooling as you grow. The same daily rhythm scales from one person to a full team.' },
	{ q: 'What happens when Earnest isn’t sure?', a: 'It stops and asks. If it’s thin on your brand, your goals, or a client’s voice, Earnest tells you what it’s missing instead of guessing or filling in generic text. You get accuracy over eagerness — by design.' },
	{ q: 'Do I have to replace all my tools at once?', a: 'No. Earnest brings People, Work, Money and Marketing into one place, but you can start where it hurts most — chasing invoices, running a project, re-engaging leads — and let it earn the rest. Everything’s included, so there’s nothing extra to buy as you expand.' },
	{ q: 'Can I try it before committing?', a: 'Yes. Explore the <strong>live demo</strong> right now with real sample data, or request early access to get your own workspace set up while we finalize production.' },
	{ q: 'Who can see my data?', a: 'Your workspace data is yours — it’s what grounds Earnest’s suggestions, and it isn’t shared across organizations. See our <a href="/privacy-policy">privacy policy</a> for how we handle and protect it.' },
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

// Early access (delegated to shared child component)
const eaRef = ref(null);
function openEarlyAccess() { eaRef.value?.open(); }

// Motion engine (dock magnification + reveals + counters + rings)
const { initMotion, revertMotion, dockRef, onDockMove, onDockLeave } = useGlassMotion();

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
	initMotion();
});
onUnmounted(() => { window.removeEventListener('scroll', onScroll); revertMotion(); });
// Head/SEO is set by the host page (index.vue at `/`, director.vue at `/director`)
// so the same component can be both the indexable landing and the noindex alias.
</script>
