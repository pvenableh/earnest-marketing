<template>
	<div class="e-page">
		<!-- ─── Nav ─── -->
		<nav class="e-nav" :class="{ 'e-nav-scrolled': navScrolled }">
			<nuxt-link to="/" class="e-nav-brand">
				<LogoEarnest size="md" />
				<span class="e-nav-tagline">Do good work.</span>
			</nuxt-link>
			<div class="e-nav-links">
				<a href="#apps" class="e-nav-link">Apps</a>
				<nuxt-link to="/features" class="e-nav-link">Features</nuxt-link>
				<nuxt-link to="/blog" class="e-nav-link">Blog</nuxt-link>
				<div ref="navDemoRef" class="e-nav-demo">
					<button type="button" class="e-nav-link e-nav-demo-trigger" :aria-expanded="navDemoOpen" aria-haspopup="menu" @click.stop="navDemoOpen = !navDemoOpen">
						See it live
						<svg class="e-nav-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3 L5 7 L9 3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>
					</button>
					<div v-if="navDemoOpen" class="e-nav-menu" role="menu">
						<a :href="soloDemoUrl" class="e-nav-menu-item" role="menuitem" @click="navDemoOpen = false">
							<span class="e-nav-menu-title">Solo demo</span>
							<span class="e-nav-menu-desc">One creator, live data, ~2&nbsp;min walkthrough.</span>
						</a>
						<a v-if="AGENCY_DEMO_READY" :href="agencyDemoUrl" class="e-nav-menu-item" role="menuitem" @click="navDemoOpen = false">
							<span class="e-nav-menu-title">Agency demo</span>
							<span class="e-nav-menu-desc">Team pipeline, marketing, billing (admin view).</span>
						</a>
						<span v-else class="e-nav-menu-item e-nav-menu-item-disabled" role="menuitem" aria-disabled="true" :title="AGENCY_DEMO_TOOLTIP">
							<span class="e-nav-menu-title">Agency demo <span class="e-nav-menu-pill">Soon</span></span>
							<span class="e-nav-menu-desc">Team pipeline, marketing, billing (admin view).</span>
						</span>
					</div>
				</div>
				<a href="#pricing" class="e-nav-link">Pricing</a>
			</div>
			<a :href="appUrl + '/auth/signin'" class="e-nav-link e-nav-cta">Sign In</a>
		</nav>

		<!-- ─── Hero ─── -->
		<header class="e-hero">
			<span class="e-hero-eyebrow opacity-0"><span class="e-spark"></span> The AI operating system for creative agencies</span>
			<h1 class="e-hero-wordmark opacity-0">Earnest<span class="e-hero-period">.</span></h1>
			<p class="e-hero-tagline opacity-0">Do good work<span class="e-dot">.</span></p>
			<p class="e-hero-sub opacity-0">
				Seven apps in one calm, intuitive shell — <strong>People, Work, Money, Marketing</strong> and more.
				Every page is a surface you work from, not a report you read. And <span class="e-brand">Earnest</span> sees all of it.
			</p>
			<div class="e-hero-actions opacity-0">
				<button class="e-btn e-btn-primary" @click="showComingSoon = true">Start for free</button>
				<a href="#apps" class="e-btn e-btn-ghost">See how it works</a>
			</div>
			<div class="e-hero-demos opacity-0">
				<a :href="soloDemoUrl" class="e-hero-demo"><UIcon name="i-lucide-play-circle" /> Try the solo demo</a>
				<a v-if="AGENCY_DEMO_READY" :href="agencyDemoUrl" class="e-hero-demo"><UIcon name="i-lucide-users" /> Try the agency demo</a>
				<span v-else class="e-hero-demo e-hero-demo-soon" :title="AGENCY_DEMO_TOOLTIP"><UIcon name="i-lucide-users" /> Agency demo <span class="e-hero-demo-pill">Soon</span></span>
			</div>

			<!-- Floating app-chip rail — the signature Earnest motif -->
			<div class="e-hero-rail opacity-0" aria-hidden="true">
				<div v-for="c in heroChips" :key="c.label" class="e-hero-rail-item">
					<span class="e-chip" :class="c.cls"><UIcon :name="c.icon" /></span>
					<span class="e-hero-rail-label">{{ c.label }}</span>
				</div>
			</div>

			<!-- Real product shot in a clean light frame + floating glass pills -->
			<figure class="e-hero-shot opacity-0">
				<div class="e-frame">
					<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
					<img :src="heroScreenshotSrc" alt="Earnest — the unified seven-app shell" loading="eager" decoding="async" class="e-frame-img" />
				</div>
				<div class="e-pill-float e-pill-1" aria-hidden="true"><UIcon name="i-lucide-trophy" style="color:#f59e0b" /> Earnest Score · 87</div>
				<div class="e-pill-float e-pill-2" aria-hidden="true"><span class="e-pill-dot" style="background:#10b981"></span> Collected · $24.8k</div>
				<div class="e-pill-float e-pill-3" aria-hidden="true"><UIcon name="i-lucide-sparkles" style="color:#3b82f6" /> Earnest drafted 3 follow-ups</div>
				<figcaption class="e-hero-shot-caption">The live app — no mockup, this is the public demo.</figcaption>
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

		<!-- ─── App Pillar Tour ─── -->
		<section id="apps" class="e-section">
			<div class="e-section-head">
				<p class="e-eyebrow opacity-0">One app, seven surfaces</p>
				<h2 class="e-h2 opacity-0">Everything in its place<span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">
					A floating rail moves you between seven apps without ever losing context — and each one opens on what matters, with its goals already in view.
				</p>
			</div>
			<div class="e-pillars-grid">
				<article v-for="p in tourPillars" :key="p.key" class="e-pillar opacity-0">
					<div class="e-pillar-top">
						<span class="e-chip" :class="chipClass(p.key)"><UIcon :name="p.icon" /></span>
						<span class="e-pillar-eyebrow">{{ p.label }}</span>
					</div>
					<h3 class="e-pillar-name">{{ p.title }}</h3>
					<p class="e-pillar-tag">{{ p.tagline }}</p>
					<div class="e-pillar-tabs">
						<span v-for="t in p.tabs" :key="t" class="e-pillar-tab">{{ t }}</span>
					</div>
				</article>
			</div>
		</section>

		<!-- ─── Showcase rows ─── -->
		<section class="e-section">
			<div class="e-showcase">
				<div v-for="(row, i) in showcase" :key="row.key" class="e-row" :class="{ 'e-row-rev': i % 2 === 1 }">
					<div class="e-row-copy">
						<div class="e-row-eyebrow opacity-0">
							<span class="e-chip" :class="row.cls"><UIcon :name="row.icon" /></span>
							<span>{{ row.eyebrow }}</span>
						</div>
						<h3 class="e-row-title opacity-0">{{ row.title }}<span class="e-grad-text">{{ row.titleAccent }}</span><span class="e-dot">.</span></h3>
						<p class="e-row-body opacity-0">{{ row.body }}</p>
						<p class="e-row-hand opacity-0">{{ row.hand }}</p>
					</div>
					<div class="e-row-media opacity-0">
						<div class="e-frame">
							<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
							<img :src="`/screenshots/latest/${row.shot}.png`" :alt="`Earnest — ${row.eyebrow}`" loading="lazy" decoding="async" class="e-frame-img" />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── AI ─── -->
		<section class="e-section e-ai">
			<div class="e-ai-grid">
				<div class="e-ai-copy">
					<p class="e-eyebrow opacity-0">Earnest AI</p>
					<h2 class="e-h2 opacity-0">It already knows your <span class="e-grad-text">next move</span><span class="e-dot">.</span></h2>
					<p class="e-section-sub opacity-0" style="text-align:left">
						Most tools bolt AI onto one channel. <span class="e-brand">Earnest</span> reads your whole business — people, projects, revenue, conversations, campaigns — and acts. Ask in plain language, or switch to <strong>Director</strong> when you want it to plan and execute.
					</p>
					<div class="e-ai-cards" style="margin-top:28px">
						<div v-for="(cap, i) in aiCapabilities" :key="i" class="e-ai-card opacity-0">
							<span class="e-ai-num">{{ String(i + 1).padStart(2, '0') }}</span>
							<div>
								<h3 class="e-ai-card-title">{{ cap.title }}</h3>
								<p class="e-ai-card-desc">{{ cap.desc }}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="e-ai-mock e-glass opacity-0" aria-hidden="true">
					<div class="e-ai-mock-head">
						<span class="e-chip e-chip-ai"><UIcon name="i-lucide-sparkles" /></span>
						<span class="e-ai-mock-title">Earnest</span>
						<span class="e-ai-mock-seg"><span class="on">Earnest</span><span>Director</span></span>
					</div>
					<div class="e-ai-mock-body">
						<div class="e-ai-bubble e-ai-bubble-them">Reschedule the Helios launch to start two weeks later.</div>
						<div class="e-ai-bubble e-ai-bubble-me">Done — moved 1 project, 6 tasks and 2 meetings. Phase 1 invoice now due Jun 30.</div>
						<div class="e-ai-bubble e-ai-bubble-them">Draft a check-in for the lapsed Atlas contact.</div>
						<div class="e-ai-chips">
							<span class="e-ai-chip-sug">Review pipeline health</span>
							<span class="e-ai-chip-sug">Summarize this client</span>
							<span class="e-ai-chip-sug">What should I focus on?</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── Gallery ─── -->
		<section ref="galleryRef" id="gallery" class="e-section e-gallery">
			<div class="e-section-head">
				<p class="e-eyebrow opacity-0">Every screen, no mockups</p>
				<h2 class="e-h2 opacity-0">See it in action<span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">Captured live from the public demo. <a :href="soloDemoUrl" style="color:var(--blue);font-weight:600;text-decoration:none">Try it yourself &rarr;</a></p>
			</div>
			<div class="e-gallery-stage opacity-0">
				<button type="button" class="e-gallery-arrow" aria-label="Previous screenshot" @click="galleryMainApi?.scrollPrev()"><UIcon name="i-lucide-chevron-left" /></button>
				<div class="e-gallery-main" ref="galleryMainRef">
					<div class="e-gallery-main-track">
						<button v-for="(shot, i) in galleryShots" :key="shot.slug" type="button" class="e-gallery-slide" @click="openLightbox(i)" aria-label="Open full-size screenshot">
							<div class="e-frame">
								<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
								<img :src="`/screenshots/latest/${shot.slug}.png`" :alt="`Earnest — ${shot.label}`" :loading="i < 3 ? 'eager' : 'lazy'" decoding="async" class="e-frame-img" />
							</div>
							<span class="e-gallery-cap"><UIcon :name="shot.icon" /> {{ shot.label }}</span>
						</button>
					</div>
				</div>
				<button type="button" class="e-gallery-arrow" aria-label="Next screenshot" @click="galleryMainApi?.scrollNext()"><UIcon name="i-lucide-chevron-right" /></button>
			</div>
			<div class="e-gallery-thumbs opacity-0" ref="galleryThumbsRef">
				<div class="e-gallery-thumbs-track">
					<button v-for="(shot, i) in galleryShots" :key="`t-${shot.slug}`" type="button" class="e-gallery-thumb" :class="{ 'e-gallery-thumb-active': i === gallerySelected }" :aria-label="`Show ${shot.label}`" @click="galleryMainApi?.scrollTo(i)">
						<img :src="`/screenshots/latest/${shot.slug}.png`" alt="" loading="lazy" decoding="async" />
						<span class="e-gallery-thumb-label">{{ shot.label }}</span>
					</button>
				</div>
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
					<div class="e-lightbox-meta"><UIcon :name="activeShot.icon" /> {{ activeShot.label }} <span class="e-lightbox-count">{{ lightboxIndex + 1 }} / {{ galleryShots.length }}</span></div>
					<button type="button" class="e-lightbox-nav" aria-label="Next" @click="lightboxNext"><UIcon name="i-lucide-chevron-right" /></button>
				</div>
			</DialogContent>
		</Dialog>

		<!-- ─── Features grouped by app ─── -->
		<section id="features" class="e-section">
			<div class="e-features-layout">
				<div class="e-features-head">
					<p class="e-eyebrow opacity-0">The full platform</p>
					<p class="e-features-big opacity-0">Everything<span class="e-dot">.</span></p>
					<h2 class="e-h2 opacity-0">your business needs.<br />Nothing it doesn't<span class="e-dot">.</span></h2>
					<span class="e-features-count opacity-0">{{ features.length }} features, by app</span>
				</div>
				<div class="e-features-list">
					<template v-for="group in featureGroups" :key="group.key">
						<div class="e-fgroup-head opacity-0">
							<span class="e-chip" :class="chipClass(group.key)"><UIcon :name="group.meta.icon" /></span>
							<span class="e-fgroup-name">{{ group.meta.label }}</span>
							<span class="e-fgroup-count">{{ group.items.length }}</span>
						</div>
						<div v-for="f in group.items" :key="f.slug" class="e-feature opacity-0" :class="{ open: expandedFeatureSlug === f.slug }" @click="expandedFeatureSlug = expandedFeatureSlug === f.slug ? '' : f.slug">
							<div class="e-feat-row">
								<UIcon :name="f.icon" class="e-feat-icon" />
								<span class="e-feat-name">{{ f.name }}</span>
								<UIcon :name="expandedFeatureSlug === f.slug ? 'i-lucide-minus' : 'i-lucide-plus'" class="e-feat-toggle" />
							</div>
							<div class="e-feat-body">
								<div class="e-feat-body-inner">
									<p class="e-feat-desc">{{ f.desc }}</p>
									<nuxt-link :to="`/features/${f.slug}`" class="e-feat-link" @click.stop>Learn more &rarr;</nuxt-link>
								</div>
							</div>
						</div>
					</template>
				</div>
			</div>
		</section>

		<!-- ─── CardDesk companion ─── -->
		<section class="e-carddesk">
			<div class="e-carddesk-card opacity-0">
				<div class="e-carddesk-copy">
					<p class="e-carddesk-eyebrow">CardDesk · companion app</p>
					<h2 class="e-carddesk-title">Networking, but make it <span class="e-grad-mint">a game</span><span class="e-dot">.</span></h2>
					<p class="e-carddesk-sub">Snap a business card — AI extracts every field and lands a contact in your CRM. Earn XP, build streaks, and watch your whole network orbit you. Installs to your home screen as a real app.</p>
					<div class="e-carddesk-actions">
						<a href="https://carddesk.earnest.guru/" target="_blank" rel="noopener" class="e-carddesk-cta"><UIcon name="i-lucide-download" /> Install CardDesk</a>
						<nuxt-link to="/features/carddesk" class="e-carddesk-learn">Learn more &rarr;</nuxt-link>
					</div>
					<p class="e-carddesk-hand">your first 25 tokens are on us ✨</p>
				</div>
				<div class="e-cd-mock" aria-hidden="true">
					<div class="e-cd-mock-top">
						<span class="e-cd-avatar">SJ</span>
						<div><div class="e-cd-name">Sarah Johnson</div><div class="e-cd-role">Founder · Northwind</div></div>
						<span class="e-cd-lv">LV 7</span>
					</div>
					<div class="e-cd-xp-label"><span>XP</span><span>820 / 1000</span></div>
					<div class="e-cd-xp-track"><div class="e-cd-xp-fill"></div></div>
					<div class="e-cd-pills"><span class="e-cd-pill">🔥 7-day streak</span><span class="e-cd-pill">+50 XP</span><span class="e-cd-pill">+1 to Orbit</span></div>
				</div>
			</div>
		</section>

		<!-- ─── Quote ─── -->
		<div class="e-quote">
			<p class="e-quote-text opacity-0">&ldquo;Design is so simple. That&rsquo;s why it is so <em>complicated.</em>&rdquo;</p>
			<p class="e-quote-attr opacity-0">&mdash; Paul Rand</p>
			<p class="e-quote-note opacity-0"><span class="e-brand">Earnest</span> holds your business to the same standard.</p>
		</div>

		<!-- ─── Calculator ─── -->
		<section class="e-calc">
			<div class="e-section-head" style="margin-bottom:0">
				<h2 class="e-h2 opacity-0">What are you <em>spending</em> today<span class="e-dot">?</span></h2>
				<p class="e-section-sub opacity-0">Drag to compare your tool stack to one <span class="e-brand">Earnest</span> subscription.</p>
			</div>
			<div class="e-calc-widget opacity-0">
				<div class="e-calc-row">
					<label class="e-calc-label"><span>Number of tools</span><span class="e-calc-value">{{ toolCount }}</span></label>
					<input type="range" :min="3" :max="15" v-model.number="toolCount" class="e-range" />
				</div>
				<div class="e-calc-row">
					<label class="e-calc-label"><span>Avg. cost per tool</span><span class="e-calc-value">${{ avgToolCost }}/mo</span></label>
					<input type="range" :min="10" :max="100" :step="5" v-model.number="avgToolCost" class="e-range" />
				</div>
				<div class="e-calc-result">
					<div class="e-calc-cell"><span class="e-calc-rlabel">Current stack</span><span class="e-calc-amt">${{ currentStackCost }}<small>/mo</small></span></div>
					<div class="e-calc-arrow">&rarr;</div>
					<div class="e-calc-cell"><span class="e-calc-rlabel"><span class="e-brand">Earnest</span> Studio</span><span class="e-calc-amt e-calc-amt-accent">$149<small>/mo</small></span></div>
				</div>
				<p class="e-calc-save" v-if="savings > 0">You save <strong>${{ savings }}/mo</strong> — that's <strong>${{ savings * 12 }}/yr</strong> back in your pocket.</p>
				<p class="e-calc-save" v-else>And you get connected <span class="e-brand">Earnest</span> intelligence that {{ toolCount }} separate tools never could.</p>
			</div>
		</section>

		<!-- ─── Pricing ─── -->
		<section id="pricing" class="e-section">
			<div class="e-section-head">
				<h2 class="e-h2 opacity-0"><em>Honest</em> pricing<span class="e-dot">.</span> No surprises<span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">One price. Your whole team. Cancel any time — we'd rather earn your business than trap it.</p>
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
					<button class="e-btn e-plan-btn" :class="plan.featured ? 'e-btn-primary' : 'e-btn-ghost'" @click="showComingSoon = true">{{ plan.cta.label }}</button>
				</div>
			</div>
		</section>

		<!-- ─── Final CTA ─── -->
		<section class="e-cta">
			<div class="e-cta-card opacity-0">
				<p class="e-cta-word"><span class="e-brand">Earnest</span><span class="e-dot">.</span></p>
				<p class="e-cta-hand">Do good work.</p>
				<p class="e-cta-sub">Everything your business needs, in one place. Start free — every feature included.</p>
				<div class="e-hero-actions" style="justify-content:center">
					<button class="e-btn e-btn-primary" @click="showComingSoon = true">Start for free</button>
					<a :href="soloDemoUrl" class="e-btn e-btn-ghost">See the demo</a>
				</div>
			</div>
		</section>

		<!-- ─── Footer ─── -->
		<footer class="e-footer">
			<div class="e-footer-inner">
				<span class="e-footer-copy">&copy; {{ new Date().getFullYear() }} <span class="e-brand">Earnest</span> — Do good work.</span>
				<nav class="e-footer-links">
					<nuxt-link to="/features">Features</nuxt-link>
					<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
					<nuxt-link to="/terms-of-service">Terms</nuxt-link>
				</nav>
			</div>
		</footer>

		<!-- ─── Coming Soon Dialog ─── -->
		<Dialog :open="showComingSoon" @update:open="(v) => { showComingSoon = v; if (!v) resetComingSoon(); }">
			<DialogContent class="e-cs-dialog">
				<template v-if="!comingSoonSuccess">
					<DialogHeader>
						<DialogTitle class="e-cs-title">Coming soon<span class="e-dot">.</span></DialogTitle>
						<DialogDescription class="e-cs-desc">We're preparing to launch. Join the list to stay updated. <UIcon name="i-lucide-rocket" class="e-cs-rocket" /></DialogDescription>
					</DialogHeader>
					<form class="e-cs-form" @submit.prevent="submitComingSoon">
						<input v-model="comingSoonName" type="text" placeholder="Your name" class="e-cs-input" autocomplete="name" />
						<input v-model="comingSoonEmail" type="email" placeholder="Email address" class="e-cs-input" autocomplete="email" />
						<p v-if="comingSoonError" class="e-cs-error">{{ comingSoonError }}</p>
						<button type="submit" class="e-btn e-btn-primary" :disabled="comingSoonSubmitting">{{ comingSoonSubmitting ? 'Joining...' : 'Stay updated' }}</button>
					</form>
				</template>
				<template v-else>
					<div class="e-cs-success">
						<UIcon name="i-lucide-check-circle" class="e-cs-success-icon" />
						<h3 class="e-cs-title">You're on the list<span class="e-dot">.</span></h3>
						<p class="e-cs-desc">We'll let you know when <span class="e-brand">Earnest</span> is ready.</p>
						<button class="e-btn e-btn-ghost e-cs-close" @click="showComingSoon = false; resetComingSoon()">Close</button>
					</div>
				</template>
			</DialogContent>
		</Dialog>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import '~/assets/css/sellsheet-modern.css';
import { features, pillars, pillarOrder, pillarMeta, getFeaturesByPillar } from '~/data/features';
// ui/dialog components auto-register with a path prefix (UiDialog*), so the bare
// <Dialog> tags don't resolve — import them explicitly.
import Dialog from '~/components/ui/dialog/Dialog.vue';
import DialogContent from '~/components/ui/dialog/DialogContent.vue';
import DialogHeader from '~/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '~/components/ui/dialog/DialogTitle.vue';
import DialogDescription from '~/components/ui/dialog/DialogDescription.vue';

let gsap;
let ScrollTrigger;

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';

const AGENCY_DEMO_READY = true;
const AGENCY_DEMO_TOOLTIP = 'Admin-role agency walkthrough — shipping soon.';
const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;
const agencyDemoUrl = `${appUrl}/try-demo?persona=agency`;

// Lead with the seven-app shell — the clearest "this is the new Earnest" proof.
const heroScreenshotSrc = '/screenshots/latest/apps-rail.png';

// ── Pillars / features ──
const tourPillars = pillars.filter((p) => p.nav);
const featureGroups = pillarOrder
	.map((key) => ({ key, meta: pillarMeta[key], items: getFeaturesByPillar(key) }))
	.filter((g) => g.items.length > 0);
const expandedFeatureSlug = ref('');
// Map a pillar key to its gradient app-chip class (design pillar = the "Me" app).
const chipClass = (k) => 'e-chip-' + (k === 'design' ? 'me' : k);

// ── Hero app chips (the seven rail apps) ──
const heroChips = [
	{ label: 'Home', icon: 'i-lucide-layout-dashboard', cls: 'e-chip-home' },
	{ label: 'People', icon: 'i-lucide-users', cls: 'e-chip-people' },
	{ label: 'Work', icon: 'i-lucide-square-kanban', cls: 'e-chip-work' },
	{ label: 'Money', icon: 'i-lucide-trending-up', cls: 'e-chip-money' },
	{ label: 'Mktg', icon: 'i-lucide-megaphone', cls: 'e-chip-marketing' },
	{ label: 'Org', icon: 'i-lucide-building-2', cls: 'e-chip-org' },
	{ label: 'Me', icon: 'i-lucide-circle-user', cls: 'e-chip-me' },
];

// ── Showcase rows (alternating) ──
const showcase = [
	{
		key: 'people', eyebrow: 'People · CRM', icon: 'i-lucide-users', cls: 'e-chip-people', shot: 'people-dashboard',
		title: 'Everyone you work with, in ', titleAccent: 'one graph',
		body: 'Clients, contacts, leads, and the cards you scan — one relationship graph with a drag-and-drop pipeline and AI health scores on top. Filter, board, drill in, and never lose your place.',
		hand: 'scan a card → CRM in a tap ✨',
	},
	{
		key: 'money', eyebrow: 'Money', icon: 'i-lucide-trending-up', cls: 'e-chip-money', shot: 'financials-overview',
		title: 'Real books, not a billing ', titleAccent: 'add-on',
		body: 'Cash flow, AR aging buckets, invoices, payments, and an expenses ledger with bank sync. Branded invoices and contracts go out; Stripe brings the money back — all reconciled in one place.',
		hand: 'cash in, chaos out 💸',
	},
	{
		key: 'marketing', eyebrow: 'Marketing', icon: 'i-lucide-megaphone', cls: 'e-chip-marketing', shot: 'marketing-overview',
		title: 'Marketing that ', titleAccent: 'runs itself',
		body: 'A marketing pulse scores your reach and surfaces AI recommendations from real signals — new leads, lapsed contacts, milestones. Plan campaigns, draft and schedule content, and publish across every channel from one studio.',
		hand: 'one tap, whole campaign ✨',
	},
];

const aiCapabilities = [
	{ title: 'Earnest, in context', desc: 'Open any client, project, invoice, or lead and the assistant already knows the context — past conversations, open tasks, billing. Save any answer as a note.' },
	{ title: 'Director mode', desc: 'Switch from assistant to operator. Director reasons across projects, clients, and revenue, proposes a plan, and executes multi-step changes on your say-so.' },
	{ title: 'AI Actions', desc: 'Tell Earnest what to change and it does the work — reschedule a project, update a status, add a task — from one sentence, with a live confirmation of what changed.' },
	{ title: 'Context Broker', desc: 'A live org snapshot feeds every AI call, kept fresh by a 3-tier cache. Token costs are shown up front, so there are never any surprises.' },
];

const marqueeItems = [
	{ label: 'Command Center', icon: 'i-lucide-zap' },
	{ label: 'People & CRM', icon: 'i-lucide-users' },
	{ label: 'Projects & Tasks', icon: 'i-lucide-square-kanban' },
	{ label: 'Cash Flow & AR Aging', icon: 'i-lucide-trending-up' },
	{ label: 'Invoicing & Payments', icon: 'i-lucide-receipt' },
	{ label: 'Expenses & Bank Sync', icon: 'i-lucide-landmark' },
	{ label: 'Marketing Pulse', icon: 'i-lucide-radar' },
	{ label: 'Content Studio', icon: 'i-lucide-sparkles' },
	{ label: 'Email Marketing', icon: 'i-lucide-mail' },
	{ label: 'Proposals & Contracts', icon: 'i-lucide-file-signature' },
	{ label: 'Meetings & AI Recap', icon: 'i-lucide-mic' },
	{ label: 'Team Channels', icon: 'i-lucide-message-square' },
	{ label: 'CardDesk', icon: 'i-lucide-credit-card' },
	{ label: 'Earnest Score', icon: 'i-lucide-trophy' },
	{ label: 'Earnest AI + Director', icon: 'i-lucide-sparkles' },
	{ label: 'Liquid Glass UI', icon: 'i-lucide-square-stack' },
	{ label: 'Companion Apps', icon: 'i-lucide-smartphone' },
];

// ── Gallery ──
const galleryShots = [
	{ slug: 'apps-rail', label: 'The Seven-App Shell', icon: 'i-lucide-layout-grid' },
	{ slug: 'command-center', label: 'Command Center', icon: 'i-lucide-zap' },
	{ slug: 'people-dashboard', label: 'People', icon: 'i-lucide-users' },
	{ slug: 'leads-pipeline', label: 'CRM Pipeline', icon: 'i-lucide-scan-search' },
	{ slug: 'client-workspace', label: 'Client Workspace', icon: 'i-lucide-app-window' },
	{ slug: 'project-workspace', label: 'Project Workspace', icon: 'i-lucide-folder-kanban' },
	{ slug: 'project-timeline', label: 'Project Timeline', icon: 'i-lucide-gantt-chart' },
	{ slug: 'tickets-kanban', label: 'Tickets & Tasks', icon: 'i-lucide-check-square' },
	{ slug: 'time-tracker', label: 'Time & Retainers', icon: 'i-lucide-timer' },
	{ slug: 'financials-overview', label: 'Money · Cash Flow', icon: 'i-lucide-trending-up' },
	{ slug: 'proposals-composer', label: 'Proposal Composer', icon: 'i-lucide-wand-2' },
	{ slug: 'contracts-list', label: 'Contracts', icon: 'i-lucide-file-signature' },
	{ slug: 'carddesk', label: 'CardDesk', icon: 'i-lucide-credit-card' },
	{ slug: 'ai-sidebar', label: 'Earnest AI', icon: 'i-lucide-sparkles' },
	{ slug: 'ai-actions', label: 'AI Actions', icon: 'i-lucide-wand-sparkles' },
	{ slug: 'marketing-overview', label: 'Marketing Pulse', icon: 'i-lucide-radar' },
	{ slug: 'social-inbox', label: 'Social Inbox', icon: 'i-lucide-inbox' },
	{ slug: 'organization-overview', label: 'Organization', icon: 'i-lucide-building-2' },
	{ slug: 'organization-branding', label: 'Brand & Whitelabel', icon: 'i-lucide-palette' },
	{ slug: 'documents-library', label: 'Documents Library', icon: 'i-lucide-library' },
];

const [galleryMainRef, galleryMainApi] = emblaCarouselVue({ loop: true, align: 'center' });
const [galleryThumbsRef, galleryThumbsApi] = emblaCarouselVue({ containScroll: 'keepSnaps', dragFree: true, align: 'start' });
const gallerySelected = ref(0);
function syncGallerySelection() {
	const main = galleryMainApi.value;
	const thumbs = galleryThumbsApi.value;
	if (!main || !thumbs) return;
	gallerySelected.value = main.selectedScrollSnap();
	thumbs.scrollTo(main.selectedScrollSnap());
}

// ── Lightbox ──
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const activeShot = computed(() => galleryShots[lightboxIndex.value] || null);
function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true; }
function closeLightbox(open) { if (!open) lightboxOpen.value = false; }
function lightboxPrev() { lightboxIndex.value = (lightboxIndex.value - 1 + galleryShots.length) % galleryShots.length; }
function lightboxNext() { lightboxIndex.value = (lightboxIndex.value + 1) % galleryShots.length; }

// ── Nav ──
const navScrolled = ref(false);
const navDemoOpen = ref(false);
const navDemoRef = ref(null);
function onNavDocClick(e) { if (navDemoRef.value && !navDemoRef.value.contains(e.target)) navDemoOpen.value = false; }
function onScroll() { navScrolled.value = window.scrollY > 40; }

// ── Coming Soon ──
const showComingSoon = ref(false);
const comingSoonName = ref('');
const comingSoonEmail = ref('');
const comingSoonSubmitting = ref(false);
const comingSoonSuccess = ref(false);
const comingSoonError = ref('');
async function submitComingSoon() {
	comingSoonError.value = '';
	if (!comingSoonName.value.trim() || !comingSoonEmail.value.trim()) { comingSoonError.value = 'Please fill in both fields.'; return; }
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(comingSoonEmail.value)) { comingSoonError.value = 'Please enter a valid email address.'; return; }
	comingSoonSubmitting.value = true;
	try {
		const contacts = useDirectusItems('contacts');
		const contact = await contacts.create({ first_name: comingSoonName.value.trim(), email: comingSoonEmail.value.trim(), source: 'sellsheet-coming-soon', email_subscribed: true, status: 'published' });
		if (contact?.id) {
			const listContacts = useDirectusItems('mailing_list_contacts');
			await listContacts.create({ list_id: 1, contact_id: contact.id, subscribed: true });
		}
		comingSoonSuccess.value = true;
	} catch (e) {
		comingSoonError.value = 'Something went wrong. Please try again.';
	} finally {
		comingSoonSubmitting.value = false;
	}
}
function resetComingSoon() { comingSoonName.value = ''; comingSoonEmail.value = ''; comingSoonSuccess.value = false; comingSoonError.value = ''; }

// ── A/B + calculator ──
const { trackPageView } = useABTest();
const toolCount = ref(8);
const avgToolCost = ref(40);
const currentStackCost = computed(() => toolCount.value * avgToolCost.value);
const savings = computed(() => currentStackCost.value - 149);

const plans = [
	{ name: 'Solo', price: '49', desc: 'For the one-person shop doing serious work.', featured: false,
		features: ['1 team seat', 'All seven apps included', 'Projects, tickets & invoicing', 'People CRM, marketing & email', 'Earnest AI & Command Center', 'CardDesk & companion apps', '5 client portal seats', '100K AI tokens/month'],
		cta: { label: 'Get started' } },
	{ name: 'Studio', price: '149', desc: 'For the team that means business.', featured: true,
		features: ['8 team seats', 'Everything in Solo', 'Team channels & video', 'Director mode & token management', 'Whitelabel & branded email', '15 client portal seats', '400K AI tokens/month', '$408/yr if billed annually'],
		cta: { label: 'Start free trial' } },
	{ name: 'Agency', price: '299', desc: 'For the business that has grown into something real.', featured: false,
		features: ['15 team seats', 'Everything in Studio', 'Unlimited client portal seats', 'Bank sync & expenses', 'Priority support + onboarding', '1M AI tokens/month', '$2,491/yr if billed annually'],
		cta: { label: 'Talk to us' } },
];

// ── GSAP ──
let ctx;
onMounted(async () => {
	const gsapModule = await import('gsap');
	const scrollModule = await import('gsap/ScrollTrigger');
	gsap = gsapModule.gsap;
	ScrollTrigger = scrollModule.ScrollTrigger;
	gsap.registerPlugin(ScrollTrigger);

	window.addEventListener('scroll', onScroll, { passive: true });
	document.addEventListener('click', onNavDocClick);
	onScroll();

	ctx = gsap.context(() => {
		// Hero intro — staggered, fires immediately
		gsap.timeline({ delay: 0.15 })
			.fromTo('.e-hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
			.fromTo('.e-hero-wordmark', { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
			.fromTo('.e-hero-tagline', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45')
			.fromTo('.e-hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
			.fromTo('.e-hero-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
			.fromTo('.e-hero-demos', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
			.fromTo('.e-hero-rail .e-hero-rail-item', { opacity: 0, y: 16, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.06 }, '-=0.2')
			.fromTo('.e-hero-rail', { opacity: 0 }, { opacity: 1, duration: 0.01 }, '<')
			.fromTo('.e-hero-shot', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3');

		// Generic scroll reveal for everything else
		gsap.utils.toArray('.opacity-0').forEach((el) => {
			if (el.closest('.e-hero')) return; // hero handled above
			gsap.fromTo(el, { opacity: 0, y: 26 }, {
				opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 90%', once: true },
			});
		});

		trackPageView('sellsheet-modern');
	});

	if (galleryMainApi.value) {
		galleryMainApi.value.on('select', syncGallerySelection);
		galleryMainApi.value.on('reInit', syncGallerySelection);
		syncGallerySelection();
	}
});

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll);
	document.removeEventListener('click', onNavDocClick);
	if (ctx) ctx.revert();
	if (galleryMainApi.value) {
		galleryMainApi.value.off('select', syncGallerySelection);
		galleryMainApi.value.off('reInit', syncGallerySelection);
	}
});

useHead({
	title: 'Earnest. Do good work. | The Business Operating System',
	meta: [
		{ name: 'description', content: 'Earnest is the AI-powered business operating system for agencies — seven apps in one calm shell: Home, People, Work, Money, Marketing, Org, and Me. CRM, projects, invoicing, bookkeeping, marketing, contracts, and an AI operator that sees everything.' },
	],
});
</script>
