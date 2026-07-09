<template>
	<div class="e-page d-page">
		<!-- ─── Nav ─── -->
		<nav class="e-nav" :class="{ 'e-nav-scrolled': navScrolled }">
			<nuxt-link to="/next" class="e-nav-brand">
				<LogoEarnest size="md" />
				<span class="e-nav-badge">Director</span>
			</nuxt-link>
			<div class="e-nav-links">
				<a href="#office" class="e-nav-link">The Office</a>
				<a href="#decide" class="e-nav-link">How it decides</a>
				<a href="#context" class="e-nav-link">Context</a>
				<a href="#pricing" class="e-nav-link">Pricing</a>
				<nuxt-link to="/" class="e-nav-link">Classic site</nuxt-link>
			</div>
			<button type="button" class="e-nav-link e-nav-cta" @click="openEarlyAccess()">Start for free</button>
		</nav>

		<!-- ─── Hero ─── -->
		<header class="e-hero">
			<span class="d-eyebrow opacity-0"><span class="d-eyebrow-dot"></span> Introducing the Director’s Office <span class="d-new-pill">New</span></span>
			<h1 class="e-hero-wordmark opacity-0">Earnest<span class="e-hero-period">.</span></h1>
			<p class="e-hero-tagline opacity-0">Your decision machine<span class="e-dot">.</span></p>
			<p class="e-hero-sub opacity-0">
				Earnest reads your <strong>entire organization</strong>, walks you through it like a morning briefing, and hands you the day’s decisions already drafted — across People, Work, Money and Marketing. You just say&nbsp;yes.
			</p>
			<div class="e-hero-actions opacity-0">
				<button class="e-btn e-btn-primary" @click="openEarlyAccess()">Start for free</button>
				<a href="#office" class="e-btn e-btn-ghost">See the Director’s Office</a>
			</div>
			<div class="e-hero-demos opacity-0">
				<a :href="soloDemoUrl" class="e-hero-demo"><UIcon name="i-lucide-play-circle" /> Try the live demo</a>
				<nuxt-link to="/" class="e-hero-demo"><UIcon name="i-lucide-arrow-left" /> Back to the classic site</nuxt-link>
			</div>

			<!-- Real product shot + floating "decision" glass pills -->
			<figure class="e-hero-shot opacity-0">
				<div class="e-frame">
					<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
					<img :src="heroScreenshotSrc" alt="Earnest — the Director's Office, a live organizational overview" loading="eager" decoding="async" class="e-frame-img" />
				</div>
				<div class="e-pill-float e-pill-1" aria-hidden="true"><UIcon name="i-lucide-gavel" style="color:#4b47c4" /> 3 decisions need you</div>
				<div class="e-pill-float e-pill-2" aria-hidden="true"><span class="e-pill-dot" style="background:#dc2626"></span> $12.4k overdue · 4 invoices</div>
				<div class="e-pill-float e-pill-3" aria-hidden="true"><UIcon name="i-lucide-presentation" style="color:#3e3aad" /> Monday brief is ready</div>
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

		<!-- ─── The pivot / thesis ─── -->
		<section class="d-thesis">
			<div class="d-thesis-inner">
				<p class="d-eyebrow opacity-0" style="justify-content:center"><span class="d-eyebrow-dot"></span> The shift</p>
				<p class="d-thesis-lead opacity-0">You didn’t start the business to <em>click through software.</em></p>
				<p class="d-thesis-body opacity-0">
					Most tools hand you dashboards and make you go dig for what matters. <span class="e-brand">Earnest</span> does the digging, forms an opinion, and brings you the handful of things that actually need <strong>a decision</strong> today — each one already drafted and ready to run.
				</p>
			</div>
			<div class="d-shift">
				<div class="d-shift-card d-shift-from opacity-0">
					<div class="d-shift-label">Every other tool</div>
					<div class="d-shift-text"><s>Open ten tabs, read the reports, figure out what’s wrong, then start the work.</s></div>
				</div>
				<div class="d-shift-arrow opacity-0" aria-hidden="true"><UIcon name="i-lucide-arrow-right" /></div>
				<div class="d-shift-card d-shift-to opacity-0">
					<div class="d-shift-label">Earnest, the Director</div>
					<div class="d-shift-text">&ldquo;Here are today’s three decisions. I’ve drafted each one. Approve?&rdquo;</div>
				</div>
			</div>
		</section>

		<!-- ─── The Director's Office — briefing deck ─── -->
		<section id="office" class="e-section d-office">
			<div class="e-section-head">
				<p class="d-eyebrow opacity-0" style="justify-content:center"><span class="d-eyebrow-dot"></span> The Director’s Office</p>
				<h2 class="e-h2 opacity-0">Your whole organization, <span class="d-accent-text">presented to you</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">
					Earnest assembles a live briefing across every app and walks you through it slide by slide — a read on the situation, and the actions to resolve it, one tap away. Click through today’s.
				</p>
			</div>

			<div class="d-office-deck opacity-0">
				<!-- Agenda / slide list -->
				<div class="d-agenda" role="tablist" aria-label="Today's briefing">
					<div class="d-agenda-head">Monday briefing</div>
					<button
						v-for="(s, i) in officeSlides"
						:key="s.key"
						type="button"
						role="tab"
						class="d-agenda-item"
						:class="{ 'd-agenda-item--on': activeSlide === i }"
						:aria-selected="activeSlide === i"
						@click="activeSlide = i"
					>
						<span class="d-agenda-idx">{{ String(i + 1).padStart(2, '0') }}</span>
						<span class="d-agenda-chip" :class="`e-chip-${s.chip}`"><UIcon :name="s.icon" /></span>
						<span class="d-agenda-label">
							<span class="d-agenda-name">{{ s.tab }}</span>
							<span class="d-agenda-meta">{{ s.meta }}</span>
						</span>
					</button>
				</div>

				<!-- Slide stage -->
				<div class="d-slide-stage">
					<div class="d-slide-top">
						<span class="d-slide-present">
							<span class="e-chip e-chip-ai"><UIcon name="i-lucide-sparkles" /></span>
							Presented by Earnest Director
						</span>
						<span class="d-slide-progress" aria-hidden="true">
							<span v-for="(s, i) in officeSlides" :key="s.key" class="d-slide-seg" :class="{ 'd-slide-seg--on': i <= activeSlide }"></span>
						</span>
					</div>

					<div class="d-slide-body" :key="activeSlide">
						<div class="d-slide-copy d-slide-anim">
							<span class="d-slide-kicker">{{ current.kicker }}</span>
							<p class="d-slide-stat">{{ current.stat }}<span v-if="current.unit" class="d-slide-unit">{{ current.unit }}</span></p>
							<p class="d-slide-read" v-html="current.read"></p>
							<div class="d-slide-actions">
								<span class="d-slide-actions-label">Do it now</span>
								<button
									v-for="(a, ai) in current.actions"
									:key="ai"
									type="button"
									class="d-prompt"
									:class="{ 'd-prompt--soft': ai > 0 }"
									@click="openEarlyAccess()"
								>
									<span class="d-prompt-ic"><UIcon :name="a.icon" /></span>
									<span class="d-prompt-body">
										<span class="d-prompt-title">{{ a.title }}</span>
										<span class="d-prompt-sub">{{ a.sub }}</span>
									</span>
									<UIcon name="i-lucide-arrow-right" class="d-prompt-go" />
								</button>
							</div>
						</div>
						<div class="d-slide-media d-slide-anim">
							<div class="e-frame">
								<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
								<img :src="`/screenshots/latest/${current.shot}.png`" :alt="`Earnest — ${current.tab}`" loading="lazy" decoding="async" class="e-frame-img" />
							</div>
						</div>
					</div>

					<div class="d-deck-foot">
						<span class="d-deck-hint">Slide <strong>{{ activeSlide + 1 }}</strong> of {{ officeSlides.length }} · every slide ends in a decision</span>
						<div class="d-deck-nav">
							<button type="button" class="d-deck-btn" aria-label="Previous slide" @click="prevSlide"><UIcon name="i-lucide-chevron-left" /></button>
							<button type="button" class="d-deck-btn" aria-label="Next slide" @click="nextSlide"><UIcon name="i-lucide-chevron-right" /></button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── How a decision flows + guardrails ─── -->
		<section id="decide" class="e-section">
			<div class="e-section-head">
				<p class="d-eyebrow opacity-0" style="justify-content:center"><span class="d-eyebrow-dot"></span> How a decision flows</p>
				<h2 class="e-h2 opacity-0">Earnest does the work<span class="e-dot">.</span> <span class="d-accent-text">You say yes</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">
					One rhythm runs through everything. Nothing reaches a client or moves money without your tap.
				</p>
			</div>

			<div class="d-flow-steps">
				<div v-for="(step, i) in flowSteps" :key="i" class="d-flow-step opacity-0">
					<div class="d-flow-step-n" aria-hidden="true"></div>
					<h4>{{ step.title }}</h4>
					<p v-html="step.body"></p>
				</div>
			</div>

			<div class="e-section-head" style="margin-top:56px">
				<p class="d-eyebrow opacity-0" style="justify-content:center"><span class="d-eyebrow-dot"></span> Powerful, never surprising</p>
				<h2 class="e-h2 opacity-0">What Earnest may do on its own<span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">A green light, a yellow light, and a red line decide what happens without asking.</p>
			</div>
			<div class="d-lights">
				<div class="d-light go opacity-0">
					<div class="d-light-badge"><span class="dot"></span> Green · just do it</div>
					<h4>Help &amp; safe copies</h4>
					<p>Nothing real changes, or it’s instantly undoable.</p>
					<ul>
						<li>Summarize, explain, answer questions</li>
						<li>Pre-fill a draft for you to react to</li>
						<li>Copy a signed contract into a draft invoice</li>
					</ul>
				</div>
				<div class="d-light wait opacity-0">
					<div class="d-light-badge"><span class="dot"></span> Yellow · propose, you approve</div>
					<h4>Anything that creates real work</h4>
					<p>Earnest drafts it and puts it in front of you. Nothing happens until you say yes.</p>
					<ul>
						<li>Create a project, tasks, or a set of posts</li>
						<li>Draft a proposal, contract, or invoice</li>
						<li>Write an email — held as a draft</li>
					</ul>
				</div>
				<div class="d-light stop opacity-0">
					<div class="d-light-badge"><span class="dot"></span> Red · never automatic</div>
					<h4>A person always decides</h4>
					<p>These reach a client or move money, so a human makes the final tap.</p>
					<ul>
						<li>Send anything to a client</li>
						<li>Charge a card or mark money paid</li>
						<li>Change roles, billing, or org settings</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- ─── Contextual AI surface switcher ─── -->
		<section id="context" class="e-section e-context">
			<div class="e-section-head">
				<p class="d-eyebrow opacity-0" style="justify-content:center"><span class="d-eyebrow-dot"></span> Context-aware by default</p>
				<h2 class="e-h2 opacity-0">It knows <span class="d-accent-text">where you are</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">
					Open Earnest anywhere and it already sees the thing in front of you — the invoice, the project, the lead, the whole org. Its suggestions change to match. Pick a spot:
				</p>
			</div>

			<div class="d-ctx opacity-0">
				<div class="d-ctx-tabs" role="tablist" aria-label="Choose a surface">
					<button
						v-for="(c, i) in ctxSurfaces"
						:key="c.key"
						type="button"
						role="tab"
						class="d-ctx-tab"
						:class="{ 'd-ctx-tab--on': activeCtx === i }"
						:aria-selected="activeCtx === i"
						@click="activeCtx = i"
					>
						<UIcon :name="c.icon" /> {{ c.tab }}
					</button>
				</div>

				<div class="d-ctx-stage">
					<!-- where you are -->
					<aside class="d-ctx-where" :key="`w-${activeCtx}`">
						<div class="d-ctx-where-top">
							<span class="d-ctx-where-ic" :class="`e-chip-${ctx.chip}`"><UIcon :name="ctx.icon" /></span>
							<span>
								<span class="d-ctx-where-label">You’re on</span>
								<span class="d-ctx-where-name">{{ ctx.name }}</span>
							</span>
						</div>
						<div class="d-ctx-facts">
							<div v-for="(f, fi) in ctx.facts" :key="fi" class="d-ctx-fact">
								<span class="d-ctx-fact-k">{{ f.k }}</span>
								<span class="d-ctx-fact-v">{{ f.v }}</span>
							</div>
						</div>
						<div class="d-ctx-knows">
							<UIcon name="i-lucide-eye" /> <span>{{ ctx.knows }}</span>
						</div>
					</aside>

					<!-- the assistant panel -->
					<div class="d-ctx-panel">
						<div class="d-ctx-panel-head">
							<span class="e-chip e-chip-ai" style="width:26px;height:26px"><UIcon name="i-lucide-sparkles" /></span>
							<span class="d-ctx-panel-title">Earnest</span>
							<span class="d-ctx-panel-scope">{{ ctx.scope }}</span>
						</div>
						<div class="d-ctx-panel-body" :key="`b-${activeCtx}`">
							<div class="d-ctx-bubble d-ctx-bubble-them">{{ ctx.ask }}</div>
							<div class="d-ctx-bubble d-ctx-bubble-me" v-html="ctx.reply"></div>
							<span class="d-ctx-suglabel">Suggested here</span>
							<div class="d-ctx-sugs">
								<span v-for="(s, si) in ctx.sugs" :key="si" class="d-ctx-sug">{{ s }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── Tap-count wins ─── -->
		<section class="e-section">
			<div class="e-section-head">
				<p class="d-eyebrow opacity-0" style="justify-content:center"><span class="d-eyebrow-dot"></span> Fewer taps, more decisions</p>
				<h2 class="e-h2 opacity-0">The same rhythm, <span class="d-accent-text">everywhere</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">One button, Earnest drafts it, you approve — applied to every job. The numbers are real taps today versus the goal.</p>
			</div>
			<div class="d-wins">
				<div v-for="(w, i) in wins" :key="i" class="d-win opacity-0">
					<span class="d-win-taps"><s>{{ w.from }}</s> → <b>{{ w.to }}</b></span>
					<span class="d-win-txt"><b>{{ w.title }}</b><span>{{ w.desc }}</span></span>
				</div>
			</div>
		</section>

		<!-- ─── Proof ─── -->
		<section class="e-section e-gallery">
			<div class="e-section-head">
				<p class="d-eyebrow opacity-0" style="justify-content:center"><span class="d-eyebrow-dot"></span> No mockups</p>
				<h2 class="e-h2 opacity-0">Every screen is the real app<span class="e-dot">.</span></h2>
			</div>
			<div class="d-proof-grid opacity-0">
				<button v-for="(shot, i) in proofShots" :key="shot.slug" type="button" class="d-proof-item" @click="openLightbox(i)" aria-label="Open full-size screenshot">
					<div class="e-frame">
						<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
						<img :src="`/screenshots/latest/${shot.slug}.png`" :alt="`Earnest — ${shot.label}`" loading="lazy" decoding="async" class="e-frame-img" />
					</div>
					<span class="e-gallery-cap"><UIcon :name="shot.icon" /> {{ shot.label }}</span>
				</button>
			</div>
			<p class="d-proof-note opacity-0">Captured live from the public demo. <a :href="soloDemoUrl">Try it yourself &rarr;</a></p>
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
			<div class="e-section-head">
				<h2 class="e-h2 opacity-0"><em>Honest</em> pricing<span class="e-dot">.</span> No surprises<span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">One price. Your whole team. The Director’s Office is included on every plan.</p>
			</div>
			<div class="e-plans">
				<div v-for="(plan, index) in plans" :key="index" class="e-plan opacity-0" :class="{ 'e-plan-featured': plan.featured }">
					<div v-if="plan.featured" class="e-plan-badge">Most popular</div>
					<div class="e-plan-name">{{ plan.name }}</div>
					<div class="e-plan-price"><sup>$</sup>{{ plan.price }}<span>/mo</span></div>
					<div class="e-plan-desc">{{ plan.desc }}</div>
					<ul class="e-plan-feats">
						<li v-for="(feat, fi) in plan.features" :key="fi"><UIcon name="i-lucide-check" class="e-plan-check" /> {{ feat }}</li>
					</ul>
					<button class="e-btn e-plan-btn" :class="plan.featured ? 'e-btn-primary' : 'e-btn-ghost'" @click="openEarlyAccess()">{{ plan.cta.label }}</button>
				</div>
			</div>
		</section>

		<!-- ─── Final CTA ─── -->
		<section class="e-cta">
			<div class="e-cta-card opacity-0">
				<p class="e-cta-word"><span class="e-brand">Earnest</span><span class="e-dot">.</span></p>
				<p class="e-cta-hand">Do good work.</p>
				<p class="e-cta-sub">Stop running the software. Start running the business. Sit at the desk and let Earnest bring you the decisions.</p>
				<div class="e-hero-actions" style="justify-content:center">
					<button class="e-btn e-btn-primary" @click="openEarlyAccess()">Start for free</button>
					<a :href="soloDemoUrl" class="e-btn e-btn-ghost">See the demo</a>
				</div>
			</div>
		</section>

		<!-- ─── Footer ─── -->
		<footer class="e-footer">
			<div class="e-footer-inner">
				<span class="e-footer-copy">&copy; {{ new Date().getFullYear() }} <span class="e-brand">Earnest</span> — Do good work.</span>
				<nav class="e-footer-links">
					<nuxt-link to="/">Classic site</nuxt-link>
					<nuxt-link to="/features">Features</nuxt-link>
					<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
					<nuxt-link to="/terms-of-service">Terms</nuxt-link>
				</nav>
			</div>
		</footer>

		<!-- ─── Early Access Dialog (intercepts sign-up) ─── -->
		<Dialog :open="showEarlyAccess" @update:open="(v) => { showEarlyAccess = v; if (!v) resetEarlyAccess(); }">
			<DialogContent class="e-ea-dialog">
				<template v-if="!eaSuccess">
					<DialogHeader>
						<span class="e-ea-eyebrow"><span class="e-spark"></span> Early access</span>
						<DialogTitle class="e-ea-title">{{ eaStepMeta.title }}<span class="e-dot">.</span></DialogTitle>
						<DialogDescription class="e-ea-desc">{{ eaStepMeta.desc }}</DialogDescription>
					</DialogHeader>

					<div class="e-ea-progress" aria-hidden="true">
						<span v-for="n in 3" :key="n" class="e-ea-progress-seg" :class="{ on: n <= eaStep }"></span>
					</div>

					<form class="e-ea-form" @submit.prevent="eaStep < 3 ? eaNext() : submitEarlyAccess()">
						<input v-model="eaHoneypot" type="text" tabindex="-1" autocomplete="off" class="e-ea-hp" aria-hidden="true" />

						<div v-if="eaStep === 1" class="e-ea-fields">
							<label class="e-ea-field">
								<span class="e-ea-label">Your name<span class="e-ea-req">*</span></span>
								<input v-model="eaForm.name" type="text" placeholder="Jane Rivera" class="e-ea-input" autocomplete="name" />
							</label>
							<label class="e-ea-field">
								<span class="e-ea-label">Work email<span class="e-ea-req">*</span></span>
								<input v-model="eaForm.email" type="email" placeholder="jane@studio.com" class="e-ea-input" autocomplete="email" />
							</label>
							<div class="e-ea-row">
								<label class="e-ea-field">
									<span class="e-ea-label">Your role</span>
									<input v-model="eaForm.role" type="text" placeholder="Founder, Ops lead…" class="e-ea-input" autocomplete="organization-title" />
								</label>
								<label class="e-ea-field">
									<span class="e-ea-label">Phone <span class="e-ea-opt">(optional)</span></span>
									<input v-model="eaForm.phone" type="tel" placeholder="(555) 123-4567" class="e-ea-input" autocomplete="tel" />
								</label>
							</div>
						</div>

						<div v-else-if="eaStep === 2" class="e-ea-fields">
							<div class="e-ea-row">
								<label class="e-ea-field">
									<span class="e-ea-label">Company</span>
									<input v-model="eaForm.company" type="text" placeholder="Studio name" class="e-ea-input" autocomplete="organization" />
								</label>
								<label class="e-ea-field">
									<span class="e-ea-label">Website <span class="e-ea-opt">(optional)</span></span>
									<input v-model="eaForm.website" type="text" placeholder="studio.com" class="e-ea-input" autocomplete="url" />
								</label>
							</div>
							<div class="e-ea-field">
								<span class="e-ea-label">What kind of business?</span>
								<div class="e-ea-chips">
									<button v-for="b in eaBusinessTypes" :key="b.value" type="button" class="e-ea-chip" :class="{ on: eaForm.business_type === b.value }" @click="eaForm.business_type = b.value">{{ b.label }}</button>
								</div>
							</div>
							<div class="e-ea-field">
								<span class="e-ea-label">Team size</span>
								<div class="e-ea-chips">
									<button v-for="t in eaTeamSizes" :key="t.value" type="button" class="e-ea-chip" :class="{ on: eaForm.team_size === t.value }" @click="eaForm.team_size = t.value">{{ t.label }}</button>
								</div>
							</div>
						</div>

						<div v-else class="e-ea-fields">
							<div class="e-ea-field">
								<span class="e-ea-label">Which features are you most interested in?</span>
								<div class="e-ea-chips">
									<button v-for="f in eaFeatureOptions" :key="f" type="button" class="e-ea-chip" :class="{ on: eaForm.features_interested.includes(f) }" @click="eaToggleFeature(f)">{{ f }}</button>
								</div>
							</div>
							<label class="e-ea-field">
								<span class="e-ea-label">What are you hoping Earnest helps you do?</span>
								<textarea v-model="eaForm.goals" rows="3" placeholder="e.g. See what needs a decision each morning, get AI follow-ups out the door…" class="e-ea-input e-ea-textarea"></textarea>
							</label>
							<div class="e-ea-field">
								<span class="e-ea-label">Timeline</span>
								<div class="e-ea-chips">
									<button v-for="t in eaTimelines" :key="t.value" type="button" class="e-ea-chip" :class="{ on: eaForm.timeline === t.value }" @click="eaForm.timeline = t.value">{{ t.label }}</button>
								</div>
							</div>
						</div>

						<p v-if="eaError" class="e-ea-error">{{ eaError }}</p>

						<div class="e-ea-actions">
							<button v-if="eaStep > 1" type="button" class="e-btn e-btn-ghost e-ea-back" @click="eaBack"><UIcon name="i-lucide-arrow-left" /> Back</button>
							<span class="e-ea-step-count">Step {{ eaStep }} of 3</span>
							<button v-if="eaStep < 3" type="submit" class="e-btn e-btn-primary e-ea-next">Continue <UIcon name="i-lucide-arrow-right" /></button>
							<button v-else type="submit" class="e-btn e-btn-primary e-ea-next" :disabled="eaSubmitting">{{ eaSubmitting ? 'Sending…' : 'Request early access' }}</button>
						</div>
					</form>
				</template>

				<template v-else>
					<div class="e-ea-success">
						<span class="e-ea-success-icon"><UIcon name="i-lucide-check" /></span>
						<DialogTitle class="e-ea-title">You're on the list<span class="e-dot">.</span></DialogTitle>
						<DialogDescription class="e-ea-desc">Thanks{{ eaForm.name ? ', ' + eaForm.name.split(' ')[0] : '' }} — we're onboarding early users as we finalize production. We'll reach out at <strong>{{ eaForm.email }}</strong> with your access.</DialogDescription>
						<div class="e-ea-success-demos">
							<p class="e-ea-success-hint">Want a look right now?</p>
							<a :href="soloDemoUrl" class="e-btn e-btn-ghost"><UIcon name="i-lucide-play-circle" /> Explore the live demo</a>
						</div>
						<button class="e-ea-close-link" @click="showEarlyAccess = false; resetEarlyAccess()">Close</button>
					</div>
				</template>
			</DialogContent>
		</Dialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import '~/assets/css/sellsheet-modern.css';
import '~/assets/css/sellsheet-director.css';
import Dialog from '~/components/ui/dialog/Dialog.vue';
import DialogContent from '~/components/ui/dialog/DialogContent.vue';
import DialogHeader from '~/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '~/components/ui/dialog/DialogTitle.vue';
import DialogDescription from '~/components/ui/dialog/DialogDescription.vue';

let gsap;
let ScrollTrigger;

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;

// Lead the hero with the org overview — the clearest "this is the Director's Office" proof.
const heroScreenshotSrc = '/screenshots/latest/organization-overview.png';

const marqueeItems = [
	{ label: 'Organizational overview', icon: 'i-lucide-building-2' },
	{ label: 'The morning briefing', icon: 'i-lucide-presentation' },
	{ label: 'Actionable prompts', icon: 'i-lucide-gavel' },
	{ label: 'People & CRM', icon: 'i-lucide-users' },
	{ label: 'Projects & Tasks', icon: 'i-lucide-square-kanban' },
	{ label: 'Cash flow & AR aging', icon: 'i-lucide-trending-up' },
	{ label: 'Marketing pulse', icon: 'i-lucide-radar' },
	{ label: 'Context-aware AI', icon: 'i-lucide-sparkles' },
	{ label: 'One approval, whole change', icon: 'i-lucide-check-check' },
];

// ── The Director's Office — briefing slides ──
const officeSlides = [
	{
		key: 'overview', tab: 'Overview', meta: '3 decisions', chip: 'org', icon: 'i-lucide-building-2', shot: 'organization-overview',
		kicker: 'The whole org, today', stat: '3', unit: 'decisions need you',
		read: 'Across every app, Earnest found <strong>three things worth your attention</strong> — nothing else needs you right now. Here they are, ranked, each already drafted.',
		actions: [
			{ icon: 'i-lucide-presentation', title: 'Walk me through today', sub: 'A 90-second guided briefing' },
			{ icon: 'i-lucide-share-2', title: 'Present to the team', sub: 'Share the brief as a deck' },
		],
	},
	{
		key: 'money', tab: 'Money', meta: '$12.4k overdue', chip: 'money', icon: 'i-lucide-trending-up', shot: 'financials-overview',
		kicker: 'Cash flow', stat: '$12.4k', unit: 'overdue across 4 invoices',
		read: 'Four invoices are past due, the oldest by <strong>21 days</strong>. Two finished projects are billable but not yet invoiced. Earnest has drafted a tailored reminder for each.',
		actions: [
			{ icon: 'i-lucide-send', title: 'Chase all 4 overdue', sub: 'Review the batch, then approve' },
			{ icon: 'i-lucide-receipt', title: 'Bill 2 finished projects', sub: 'Seeded from the contracts' },
		],
	},
	{
		key: 'people', tab: 'People', meta: '4 leads cooling', chip: 'people', icon: 'i-lucide-users', shot: 'people-dashboard',
		kicker: 'Pipeline', stat: '4', unit: 'leads going cold',
		read: 'Four qualified leads haven’t been touched in <strong>10+ days</strong> — together worth ~$48k. Each note is drafted in that client’s brand voice, ready to send.',
		actions: [
			{ icon: 'i-lucide-mail', title: 'Draft 4 re-engagement notes', sub: 'On-brand, one per lead' },
			{ icon: 'i-lucide-user-plus', title: 'Reassign coverage', sub: 'Balance across the team' },
		],
	},
	{
		key: 'work', tab: 'Work', meta: '2 projects slipping', chip: 'work', icon: 'i-lucide-square-kanban', shot: 'project-workspace',
		kicker: 'Delivery', stat: '2', unit: 'projects at risk',
		read: 'The <strong>Helios launch</strong> is ~4 days behind on a design sign-off blocker. Earnest can reflow the timeline — cascading every linked task and meeting — on your say-so.',
		actions: [
			{ icon: 'i-lucide-calendar-clock', title: 'Rebalance the timeline', sub: 'Preview the cascade first' },
			{ icon: 'i-lucide-flag', title: 'Flag owners', sub: 'Notify the two project leads' },
		],
	},
	{
		key: 'marketing', tab: 'Marketing', meta: 'Reach down 31%', chip: 'marketing', icon: 'i-lucide-megaphone', shot: 'marketing-overview',
		kicker: 'Marketing pulse', stat: '−31%', unit: 'reach, last 14 days',
		read: 'Posting cadence dropped and reach followed. Earnest drafted <strong>three on-brand posts</strong> and a summer campaign plan from your calendar’s open slots.',
		actions: [
			{ icon: 'i-lucide-sparkles', title: 'Approve 3 posts', sub: 'Scheduled to the best slots' },
			{ icon: 'i-lucide-rocket', title: 'Plan a summer campaign', sub: 'Multi-channel, editable' },
		],
	},
];
const activeSlide = ref(0);
const current = computed(() => officeSlides[activeSlide.value]);
function nextSlide() { activeSlide.value = (activeSlide.value + 1) % officeSlides.length; }
function prevSlide() { activeSlide.value = (activeSlide.value - 1 + officeSlides.length) % officeSlides.length; }

// ── How a decision flows ──
const flowSteps = [
	{ title: 'Earnest reads everything', body: 'Across People, Work, Money and Marketing, it assembles a live picture of the whole organization — <b>no dashboards to go dig through.</b>' },
	{ title: 'It forms an opinion', body: 'It ranks what actually needs a decision today and <b>drafts the work to resolve each one</b>, filled in from your real records.' },
	{ title: 'You just say yes', body: 'Review in place and approve. Earnest executes the multi-step change across every app — and <b>never sends or moves money without your tap.</b>' },
];

// ── Contextual AI surfaces ──
const ctxSurfaces = [
	{
		key: 'invoice', tab: 'An invoice', chip: 'money', icon: 'i-lucide-receipt',
		name: 'Invoice #INV-2043', scope: 'This invoice',
		facts: [ { k: 'Client', v: 'Helios Corp' }, { k: 'Amount', v: '$8,400' }, { k: 'Status', v: 'Overdue · 12 days' }, { k: 'Contact', v: 'Dana Wu' } ],
		knows: 'Reads this invoice, its client, and the full payment history.',
		ask: 'What’s the right nudge here?',
		reply: 'Drafted a firm-but-warm reminder to <b>Dana</b> — $8,400, 12 days overdue, with a one-tap pay link. Ready when you are.',
		sugs: ['Draft an overdue reminder', 'Offer a payment plan', 'Record a payment'],
	},
	{
		key: 'project', tab: 'A project', chip: 'work', icon: 'i-lucide-square-kanban',
		name: 'Helios Launch', scope: 'This project',
		facts: [ { k: 'Phase', v: '2 of 4' }, { k: 'Due', v: 'In 9 days' }, { k: 'Blocked tasks', v: '3' }, { k: 'Team', v: '4 members' } ],
		knows: 'Sees this project’s phases, tasks, team, and timeline.',
		ask: 'Are we going to make the date?',
		reply: 'Two blockers on design sign-off put you <b>~4 days behind</b>. I can reflow the timeline and cascade every linked task and meeting.',
		sugs: ['Reflow the timeline', 'Summarize status for the client', 'Assign the blockers'],
	},
	{
		key: 'lead', tab: 'A lead', chip: 'people', icon: 'i-lucide-user-round-search',
		name: 'Atlas Design', scope: 'This lead',
		facts: [ { k: 'Source', v: 'Referral' }, { k: 'Stage', v: 'Proposal' }, { k: 'Value', v: '$18k' }, { k: 'Last touch', v: '8 days ago' } ],
		knows: 'Knows the lead’s brand, brief, and every prior activity.',
		ask: 'Help me move this forward.',
		reply: 'They’re warm but cooling. I drafted a check-in in <b>Atlas’s voice</b> and a proposal from your service template — both editable.',
		sugs: ['Draft a proposal', 'Write a check-in', 'Log a call'],
	},
	{
		key: 'office', tab: 'The Director’s Office', chip: 'org', icon: 'i-lucide-building-2',
		name: 'The whole organization', scope: 'Whole org',
		facts: [ { k: 'Scope', v: 'Every app' }, { k: 'Open decisions', v: '3' }, { k: 'Cash position', v: 'Healthy' }, { k: 'At risk', v: '2 projects' } ],
		knows: 'Reasons across every app in the business at once.',
		ask: 'What needs me today?',
		reply: 'Three things: chase <b>$12.4k</b> overdue, approve 3 on-brand posts, and rebalance the Helios timeline. Want the walkthrough?',
		sugs: ['Walk me through today', 'Prep the Monday brief', 'What’s at risk?'],
	},
];
const activeCtx = ref(0);
const ctx = computed(() => ctxSurfaces[activeCtx.value]);

// ── Tap-count wins ──
const wins = [
	{ from: 20, to: 7, title: 'Win a client', desc: 'Lead → proposal → contract → invoice as one guided rail, not re-typed at every step.' },
	{ from: 15, to: 3, title: 'Get paid', desc: '“Chase all overdue” in one tap; “Bill this” on any finished work, already filled in.' },
	{ from: 10, to: 3, title: 'Run a project', desc: 'Say one line; Earnest lays out phases and tasks; you approve the plan in place.' },
	{ from: 14, to: 3, title: 'Do marketing', desc: '“Do it with Earnest” on a client or plan — drafts, schedules, waits for your yes.' },
	{ from: 12, to: 2, title: 'Meetings → tasks', desc: 'The recap writes itself; one tap turns action items into assigned tasks.' },
	{ from: 4, to: 1, title: 'Client signs / pays', desc: 'Their details pre-filled; the action lives on the page they’re reading.' },
];

// ── Proof gallery + lightbox ──
const proofShots = [
	{ slug: 'organization-overview', label: 'The Director’s Office', icon: 'i-lucide-building-2' },
	{ slug: 'command-center', label: 'Command Center', icon: 'i-lucide-zap' },
	{ slug: 'ai-sidebar', label: 'Context-aware Earnest', icon: 'i-lucide-sparkles' },
	{ slug: 'financials-overview', label: 'Money · Cash Flow', icon: 'i-lucide-trending-up' },
	{ slug: 'people-dashboard', label: 'People & CRM', icon: 'i-lucide-users' },
	{ slug: 'project-workspace', label: 'Project Workspace', icon: 'i-lucide-folder-kanban' },
	{ slug: 'marketing-overview', label: 'Marketing Pulse', icon: 'i-lucide-radar' },
	{ slug: 'ai-actions', label: 'AI Actions', icon: 'i-lucide-wand-sparkles' },
];
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const activeShot = computed(() => proofShots[lightboxIndex.value] || null);
function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true; }
function closeLightbox(open) { if (!open) lightboxOpen.value = false; }
function lightboxPrev() { lightboxIndex.value = (lightboxIndex.value - 1 + proofShots.length) % proofShots.length; }
function lightboxNext() { lightboxIndex.value = (lightboxIndex.value + 1) % proofShots.length; }

// ── Nav ──
const navScrolled = ref(false);
function onScroll() { navScrolled.value = window.scrollY > 40; }

// ── Early Access (same flow as the classic site) ──
const EARLY_ACCESS_FLOW_ID = '08912f2e-d3a7-4ea6-b21e-9bdb79feee64';
const earlyAccessUrl = `${config.public.directusUrl || 'https://admin.earnest.guru'}/flows/trigger/${EARLY_ACCESS_FLOW_ID}`;

const eaFeatureOptions = [
	'The Director’s Office',
	'People & CRM',
	'Projects & Tasks',
	'Invoicing & Money',
	'Marketing & Content',
	'Proposals & Contracts',
	'Earnest AI & Director',
	'Client Portal',
	'CardDesk',
];
const eaBusinessTypes = [
	{ label: 'Agency', value: 'agency' },
	{ label: 'Freelancer / Solo', value: 'solo' },
	{ label: 'Small business', value: 'small_business' },
	{ label: 'Startup', value: 'startup' },
	{ label: 'Other', value: 'other' },
];
const eaTeamSizes = [
	{ label: 'Just me', value: '1' },
	{ label: '2–5', value: '2-5' },
	{ label: '6–15', value: '6-15' },
	{ label: '16–50', value: '16-50' },
	{ label: '50+', value: '50+' },
];
const eaTimelines = [
	{ label: 'Just exploring', value: 'exploring' },
	{ label: 'Within a month', value: 'month' },
	{ label: 'Switching now', value: 'now' },
];

const showEarlyAccess = ref(false);
const eaStep = ref(1);
const EA_STEPS = 3;
const eaSubmitting = ref(false);
const eaSuccess = ref(false);
const eaError = ref('');
const eaHoneypot = ref('');
function blankEaForm() {
	return {
		name: '', email: '', role: '', phone: '',
		company: '', business_type: '', team_size: '', website: '',
		goals: '', features_interested: [], timeline: '',
	};
}
const eaForm = reactive(blankEaForm());
const eaEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eaForm.email.trim()));
const eaStep1Valid = computed(() => eaForm.name.trim().length > 1 && eaEmailValid.value);
const eaStepMeta = computed(() => ([
	{ title: 'Let’s get you in', desc: 'We’re inviting early users while we finalize production. Start with the basics.' },
	{ title: 'Tell us about your business', desc: 'This tailors your workspace and the demo data we set up for you.' },
	{ title: 'What matters most to you', desc: 'Help us prioritize — and we’ll point you at the right places first.' },
][eaStep.value - 1] || { title: '', desc: '' }));

function openEarlyAccess() { resetEarlyAccess(); showEarlyAccess.value = true; trackPageView('early-access-open'); }
function resetEarlyAccess() {
	Object.assign(eaForm, blankEaForm());
	eaStep.value = 1; eaSuccess.value = false; eaError.value = ''; eaSubmitting.value = false; eaHoneypot.value = '';
}
function eaToggleFeature(f) {
	const i = eaForm.features_interested.indexOf(f);
	if (i === -1) eaForm.features_interested.push(f);
	else eaForm.features_interested.splice(i, 1);
}
function eaNext() {
	eaError.value = '';
	if (eaStep.value === 1 && !eaStep1Valid.value) { eaError.value = 'Please enter your name and a valid email.'; return; }
	if (eaStep.value < EA_STEPS) eaStep.value += 1;
}
function eaBack() { eaError.value = ''; if (eaStep.value > 1) eaStep.value -= 1; }
async function submitEarlyAccess() {
	eaError.value = '';
	if (!eaStep1Valid.value) { eaStep.value = 1; eaError.value = 'Please enter your name and a valid email.'; return; }
	if (eaHoneypot.value) { eaSuccess.value = true; return; }
	eaSubmitting.value = true;
	try {
		const referrer = [import.meta.client ? document.referrer : '', import.meta.client ? location.pathname + location.search : '']
			.filter(Boolean).join(' ').trim();
		await $fetch(earlyAccessUrl, {
			method: 'POST',
			body: {
				name: eaForm.name.trim(), email: eaForm.email.trim(), role: eaForm.role.trim(), phone: eaForm.phone.trim(),
				company: eaForm.company.trim(), business_type: eaForm.business_type, team_size: eaForm.team_size,
				website: eaForm.website.trim(), goals: eaForm.goals.trim(), features_interested: eaForm.features_interested,
				timeline: eaForm.timeline, source: 'early-access-form-director', referrer, hp: eaHoneypot.value,
			},
		});
		eaSuccess.value = true;
		trackPageView('early-access-submit');
	} catch (e) {
		eaError.value = 'Something went wrong. Please try again, or email hello@earnest.guru.';
	} finally {
		eaSubmitting.value = false;
	}
}

const { trackPageView } = useABTest();

const plans = [
	{ name: 'Solo', price: '49', desc: 'For the one-person shop doing serious work.', featured: false,
		features: ['1 team seat', 'The Director’s Office included', 'All seven apps included', 'People CRM, projects & invoicing', 'Context-aware Earnest AI', 'CardDesk & companion apps', '5 client portal seats', '100K AI tokens/month'],
		cta: { label: 'Get started' } },
	{ name: 'Studio', price: '149', desc: 'For the team that means business.', featured: true,
		features: ['8 team seats', 'Everything in Solo', 'Team channels & video', 'Director mode & token management', 'Whitelabel & branded email', '15 client portal seats', '400K AI tokens/month', '$408/yr if billed annually'],
		cta: { label: 'Start free trial' } },
	{ name: 'Agency', price: '299', desc: 'For the business that has grown into something real.', featured: false,
		features: ['15 team seats', 'Everything in Studio', 'Unlimited client portal seats', 'Bank sync & expenses', 'Priority support + onboarding', '1M AI tokens/month', '$2,491/yr if billed annually'],
		cta: { label: 'Talk to us' } },
];

// ── GSAP scroll reveals ──
let ctxAnim;
onMounted(async () => {
	const gsapModule = await import('gsap');
	const scrollModule = await import('gsap/ScrollTrigger');
	gsap = gsapModule.gsap;
	ScrollTrigger = scrollModule.ScrollTrigger;
	gsap.registerPlugin(ScrollTrigger);

	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	ctxAnim = gsap.context(() => {
		gsap.timeline({ delay: 0.15 })
			.fromTo('.d-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
			.fromTo('.e-hero-wordmark', { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
			.fromTo('.e-hero-tagline', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45')
			.fromTo('.e-hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
			.fromTo('.e-hero-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
			.fromTo('.e-hero-demos', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
			.fromTo('.e-hero-shot', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3');

		gsap.utils.toArray('.opacity-0').forEach((el) => {
			if (el.closest('.e-hero')) return;
			gsap.fromTo(el, { opacity: 0, y: 26 }, {
				opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 90%', once: true },
			});
		});

		trackPageView('sellsheet-director');
	});
});

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll);
	if (ctxAnim) ctxAnim.revert();
});

useHead({
	title: 'Earnest — Your decision machine | The Director’s Office',
	meta: [
		{ name: 'description', content: 'Earnest reads your entire organization, presents it as a morning briefing, and hands you the day’s decisions already drafted — across People, Work, Money and Marketing. A context-aware AI that does the work so you just say yes.' },
	],
});
</script>
