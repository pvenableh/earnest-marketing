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
			<span class="e-hero-eyebrow opacity-0"><span class="e-spark"></span> The AI operating system for small &amp; mid-size agencies and businesses</span>
			<h1 class="e-hero-wordmark opacity-0">Earnest<span class="e-hero-period">.</span></h1>
			<p class="e-hero-tagline opacity-0">Do good work<span class="e-dot">.</span></p>
			<p class="e-hero-sub opacity-0">
				Seven apps in one calm, intuitive shell — <strong>People, Work, Money, Marketing</strong> and more.
				Every page is a surface you work from, not a report you read. And <span class="e-brand">Earnest</span> knows each client's brand and goals — so everything it drafts sounds like you.
			</p>
			<div class="e-hero-actions opacity-0">
				<button class="e-btn e-btn-primary" @click="openEarlyAccess()">Start for free</button>
				<a href="#apps" class="e-btn e-btn-ghost">See how it works</a>
			</div>
			<div class="e-hero-demos opacity-0">
				<a :href="soloDemoUrl" class="e-hero-demo"><UIcon name="i-lucide-play-circle" /> Try the solo demo</a>
				<a v-if="AGENCY_DEMO_READY" :href="agencyDemoUrl" class="e-hero-demo"><UIcon name="i-lucide-users" /> Try the agency demo</a>
				<span v-else class="e-hero-demo e-hero-demo-soon" :title="AGENCY_DEMO_TOOLTIP"><UIcon name="i-lucide-users" /> Agency demo <span class="e-hero-demo-pill">Soon</span></span>
			</div>

			<!-- Floating dock — the signature Earnest motif, with macOS-style
			     cursor magnification + hover tooltips (names hidden until hover) -->
			<div
				ref="dockRef"
				class="e-dock opacity-0"
				@mousemove="onDockMove"
				@mouseleave="onDockLeave"
			>
				<button
					v-for="c in heroChips"
					:key="c.label"
					type="button"
					class="e-dock-item"
					:aria-label="`Jump to the ${c.label} app`"
					@click="selectSurface(c.key)"
				>
					<span class="e-dock-tip">{{ c.label }}</span>
					<span class="e-chip e-dock-chip" :style="{ '--chip-tint': c.tint }"><UIcon :name="c.icon" /></span>
				</button>
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

		<!-- ─── Quote — conceptual rationale, full-width callout near the top ─── -->
		<div class="e-quote">
			<div class="e-quote-inner">
				<p class="e-quote-text opacity-0">&ldquo;Design is so simple. That&rsquo;s why it is so <em>complicated.</em>&rdquo;</p>
				<p class="e-quote-attr opacity-0">&mdash; Paul Rand</p>
				<p class="e-quote-note opacity-0"><span class="e-brand">Earnest</span> holds your business to the same standard.</p>
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
			<!-- Variant A — interactive app-rail + detail panel -->
			<div v-if="surfacesVariant === 'rail'" class="e-surf opacity-0">
				<div class="e-surf-rail-outer">
					<div ref="surfRailRef" class="e-dock e-surf-dock" @mousemove="onSurfRailMove" @mouseleave="onSurfRailLeave">
						<button
							v-for="p in tourPillars"
							:key="p.key"
							type="button"
							class="e-dock-item"
							:class="{ 'e-dock-item--active': activeSurface === p.key }"
							@click="setActiveSurface(p.key)"
						>
							<span class="e-dock-tip">{{ p.label }}</span>
							<span class="e-chip e-dock-chip" :style="{ '--chip-tint': surfaceTint(p.key) }"><UIcon :name="p.icon" /></span>
						</button>
					</div>
				</div>
				<div class="e-surf-detail">
					<div class="e-surf-detail-grid" :key="activeSurface" :class="'e-surf-in-' + swapDir">
						<div class="e-surf-detail-copy">
							<span class="e-surf-detail-eyebrow">
								<span class="e-chip e-dock-chip e-surf-detail-chip" :style="{ '--chip-tint': surfaceTint(activePillar.key) }"><UIcon :name="activePillar.icon" /></span>
								{{ activePillar.label }}
							</span>
							<h3 class="e-surf-detail-title">{{ activePillar.title }}<span class="e-dot">.</span></h3>
							<p class="e-surf-detail-tag">{{ activePillar.tagline }}</p>
							<div class="e-pillar-tabs">
								<span v-for="t in activePillar.tabs" :key="t" class="e-pillar-tab">{{ t }}</span>
							</div>
						</div>
						<div class="e-surf-detail-media">
							<div class="e-frame">
								<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
								<img :src="`/screenshots/latest/${activePillar.shot}.png`" :alt="`Earnest — ${activePillar.title}`" loading="eager" decoding="async" class="e-frame-img" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Variant B — asymmetric bento mosaic (rows of 2 / 3 / 2) -->
			<div v-else class="e-bento opacity-0">
				<article v-for="(p, i) in tourPillars" :key="p.key" class="e-bento-card" :class="`e-bento-${i}`">
					<div class="e-pillar-top">
						<span class="e-chip e-dock-chip" :style="{ '--chip-tint': surfaceTint(p.key) }"><UIcon :name="p.icon" /></span>
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

		<!-- ─── Context: brand & goal awareness ─── -->
		<!-- Show, don't tell: one client's brand profile producing real, on-brand  -->
		<!-- artifacts. Toggling clients re-renders the SAME surfaces in each        -->
		<!-- brand's voice — the killer demo of context. Sets up the AI section.    -->
		<section class="e-section e-context">
			<div class="e-section-head">
				<p class="e-eyebrow opacity-0">Context-aware by default</p>
				<h2 class="e-h2 opacity-0">One profile<span class="e-dot">.</span> <span class="e-grad-text">Every surface, on brand</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub opacity-0">
					Set each client's brand voice, goals, audience, and positioning once. <span class="e-brand">Earnest</span> carries that context into everything it drafts — so the output always sounds like <em>that</em> client, <strong>not a generic template.</strong>
				</p>
			</div>

			<!-- Toggle between two real demo clients to watch the same surfaces
			     re-render in each brand's voice -->
			<div class="e-bp-toggle opacity-0" role="tablist" aria-label="Choose a demo client">
				<button
					v-for="c in contextClients"
					:key="c.key"
					type="button"
					role="tab"
					class="e-bp-toggle-btn"
					:class="{ 'e-bp-toggle-btn--on': activeClientKey === c.key }"
					:aria-selected="activeClientKey === c.key"
					@click="activeClientKey = c.key"
				>
					<span class="e-bp-toggle-mono" :style="{ '--mono-tint': c.tint }">{{ c.monogram }}</span>
					{{ c.name }}
				</button>
			</div>

			<!-- Keyed remount on client change replays a spring slide-in (NOT
			     <Transition>, which leaves stacked ghost nodes in this codebase) -->
			<div class="e-bp opacity-0">
				<div class="e-bp-grid" :key="activeClientKey">
					<!-- Brand profile card -->
					<aside class="e-bp-profile e-glass">
						<div class="e-bp-profile-head">
							<span class="e-bp-mono" :style="{ '--mono-tint': activeClient.tint }">{{ activeClient.monogram }}</span>
							<div class="e-bp-profile-id">
								<span class="e-bp-profile-label">Brand profile</span>
								<h3 class="e-bp-profile-name">{{ activeClient.name }}</h3>
							</div>
						</div>
						<dl class="e-bp-fields">
							<div class="e-bp-field">
								<dt><UIcon name="i-lucide-megaphone" /> Brand voice</dt>
								<dd>{{ activeClient.voice }}</dd>
							</div>
							<div class="e-bp-field">
								<dt><UIcon name="i-lucide-target" /> Goal</dt>
								<dd>{{ activeClient.goal }}</dd>
							</div>
							<div class="e-bp-field">
								<dt><UIcon name="i-lucide-users" /> Audience</dt>
								<dd>{{ activeClient.audience }}</dd>
							</div>
							<div class="e-bp-field">
								<dt><UIcon name="i-lucide-compass" /> Positioning</dt>
								<dd>{{ activeClient.positioning }}</dd>
							</div>
						</dl>
					</aside>

					<!-- The on-brand artifacts Earnest generates from that profile -->
					<div class="e-bp-artifacts">
						<article class="e-bp-art">
							<header class="e-bp-art-head">
								<span class="e-bp-art-type"><UIcon name="i-lucide-mail" /> Email</span>
								<span class="e-bp-art-gen"><UIcon name="i-lucide-sparkles" /> Generated from this context</span>
							</header>
							<p class="e-bp-art-subject">{{ activeClient.artifacts.email.subject }}</p>
							<p class="e-bp-art-text">{{ activeClient.artifacts.email.body }}</p>
						</article>

						<article class="e-bp-art">
							<header class="e-bp-art-head">
								<span class="e-bp-art-type"><UIcon name="i-lucide-sparkles" /> Social post</span>
								<span class="e-bp-art-gen"><UIcon name="i-lucide-sparkles" /> Generated from this context</span>
							</header>
							<p class="e-bp-art-text">{{ activeClient.artifacts.social.caption }}</p>
							<div class="e-bp-tags">
								<span v-for="t in activeClient.artifacts.social.tags" :key="t">{{ t }}</span>
							</div>
						</article>

						<article class="e-bp-art">
							<header class="e-bp-art-head">
								<span class="e-bp-art-type"><UIcon name="i-lucide-file-signature" /> Proposal intro</span>
								<span class="e-bp-art-gen"><UIcon name="i-lucide-sparkles" /> Generated from this context</span>
							</header>
							<p class="e-bp-art-text">{{ activeClient.artifacts.proposal }}</p>
						</article>
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
						Most tools bolt AI onto one channel. <span class="e-brand">Earnest</span> points a real language model at your whole business — people, projects, revenue, conversations, campaigns — layered with each client's brand, goals, and audience, and acts. Ask in plain language, or open the <strong>Director's Office</strong> when you want the same Earnest to plan and execute across the whole business.
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

		<!-- ─── CardDesk companion (full-bleed dark accent) ─── -->
		<section class="e-carddesk">
			<div class="e-carddesk-card opacity-0">
				<div class="e-carddesk-inner">
					<div class="e-carddesk-copy">
						<p class="e-carddesk-eyebrow">CardDesk · companion app</p>
						<h2 class="e-carddesk-title">Networking, but make it <span class="e-grad-mint">a game</span><span class="e-dot">.</span></h2>
						<p class="e-carddesk-sub">Snap a business card and AI pulls every detail — name, title, company, socials — straight into your CRM, enriched and deduped. Then networking becomes a game: earn XP, keep your streak alive, and watch your whole network orbit you.</p>
						<div class="e-carddesk-actions">
							<a href="https://carddesk.earnest.guru/" target="_blank" rel="noopener" class="e-carddesk-cta"><UIcon name="i-lucide-arrow-up-right" /> Explore CardDesk</a>
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
			</div>
		</section>

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
					<button class="e-btn e-plan-btn" :class="plan.featured ? 'e-btn-primary' : 'e-btn-ghost'" @click="openEarlyAccess()">{{ plan.cta.label }}</button>
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
					<nuxt-link to="/features">Features</nuxt-link>
					<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
					<nuxt-link to="/terms-of-service">Terms</nuxt-link>
				</nav>
			</div>
		</footer>

		<!-- ─── Early Access Dialog (intercepts sign-up) ─── -->
		<Dialog :open="showEarlyAccess" @update:open="(v) => { showEarlyAccess = v; if (!v) resetEarlyAccess(); }">
			<DialogContent class="e-ea-dialog">
				<!-- Steps 1–3 -->
				<template v-if="!eaSuccess">
					<DialogHeader>
						<span class="e-ea-eyebrow"><span class="e-spark"></span> Early access</span>
						<DialogTitle class="e-ea-title">{{ eaStepMeta.title }}<span class="e-dot">.</span></DialogTitle>
						<DialogDescription class="e-ea-desc">{{ eaStepMeta.desc }}</DialogDescription>
					</DialogHeader>

					<!-- progress -->
					<div class="e-ea-progress" aria-hidden="true">
						<span v-for="n in 3" :key="n" class="e-ea-progress-seg" :class="{ on: n <= eaStep }"></span>
					</div>

					<form class="e-ea-form" @submit.prevent="eaStep < 3 ? eaNext() : submitEarlyAccess()">
						<!-- honeypot (hidden from humans) -->
						<input v-model="eaHoneypot" type="text" tabindex="-1" autocomplete="off" class="e-ea-hp" aria-hidden="true" />

						<!-- Step 1 — You -->
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

						<!-- Step 2 — Business -->
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

						<!-- Step 3 — Goals & interest -->
						<div v-else class="e-ea-fields">
							<div class="e-ea-field">
								<span class="e-ea-label">Which features are you most interested in?</span>
								<div class="e-ea-chips">
									<button v-for="f in eaFeatureOptions" :key="f" type="button" class="e-ea-chip" :class="{ on: eaForm.features_interested.includes(f) }" @click="eaToggleFeature(f)">{{ f }}</button>
								</div>
							</div>
							<label class="e-ea-field">
								<span class="e-ea-label">What are you hoping Earnest helps you do?</span>
								<textarea v-model="eaForm.goals" rows="3" placeholder="e.g. Replace 5 tools, get AI follow-ups out the door, finally see cash flow clearly…" class="e-ea-input e-ea-textarea"></textarea>
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

				<!-- Success -->
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

// Seven-surfaces section — two layouts to compare: 'rail' (interactive
// app-rail + detail panel) and 'bento' (asymmetric mosaic). Flip via
// ?surfaces=bento or at runtime for review.
const surfacesVariant = ref('rail');
const activeSurface = ref('home');
const activePillar = computed(
	() => tourPillars.find((p) => p.key === activeSurface.value) || tourPillars[0],
);
// Per-app Sky-Aqua → Yale-Blue ramp tint (matches the hero dock).
const SURFACE_TINTS = {
	home: '#00cfff', people: '#09b0dd', work: '#0da0cc', money: '#1681aa',
	marketing: '#1a7299', org: '#235377', design: '#274366',
};
const surfaceTint = (k) => SURFACE_TINTS[k] || '#1681aa';
if (import.meta.client && new URLSearchParams(location.search).get('surfaces') === 'bento') {
	surfacesVariant.value = 'bento';
}
const featureGroups = pillarOrder
	.map((key) => ({ key, meta: pillarMeta[key], items: getFeaturesByPillar(key) }))
	.filter((g) => g.items.length > 0);
const expandedFeatureSlug = ref('');
// Map a pillar key to its gradient app-chip class (design pillar = the "Me" app).
const chipClass = (k) => 'e-chip-' + (k === 'design' ? 'me' : k);

// ── Hero app chips (the seven rail apps) ──
// App-rail chips rendered as the real Neutral default: frosted-glass discs
// with icons along the Sky-Aqua → Yale-Blue ramp (NEUTRAL_SOURCE in the app's
// useAppAccent.ts). Matches the default toolbar users actually see.
const heroChips = [
	{ key: 'home', label: 'Home', icon: 'i-lucide-layout-dashboard', tint: '#00cfff' },
	{ key: 'people', label: 'People', icon: 'i-lucide-users', tint: '#09b0dd' },
	{ key: 'work', label: 'Work', icon: 'i-lucide-square-kanban', tint: '#0da0cc' },
	{ key: 'money', label: 'Money', icon: 'i-lucide-trending-up', tint: '#1681aa' },
	{ key: 'marketing', label: 'Mktg', icon: 'i-lucide-megaphone', tint: '#1a7299' },
	{ key: 'org', label: 'Org', icon: 'i-lucide-building-2', tint: '#235377' },
	{ key: 'design', label: 'Me', icon: 'i-lucide-circle-user', tint: '#274366' },
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
		body: 'A marketing pulse scores your reach and surfaces AI recommendations from real signals — new leads, lapsed contacts, milestones. Plan campaigns and create on-brand content in the Creator Studio — connecting your social accounts to publish straight from Earnest is coming soon.',
		hand: 'one tap, whole campaign ✨',
	},
];

// Context section — two real demo clients with opposite brand voices. Toggling
// between them re-renders the SAME email/social/proposal surfaces in each
// brand's voice, making "context-aware" tangible. Copy is written to read
// unmistakably as each brand.
const contextClients = [
	{
		key: 'meridian',
		name: 'Meridian Law Group',
		monogram: 'ML',
		tint: '#274366', // deep slate-navy — formal, trustworthy
		voice: 'Formal, precise, reassuring',
		goal: 'Book 12 estate-planning consultations this quarter',
		audience: 'High-net-worth families & business owners',
		positioning: "White-glove counsel that protects what you've built",
		artifacts: {
			email: {
				subject: 'A measured review of your estate plan',
				body: 'Circumstances change, and a plan should change with them. We invite you to a confidential 45-minute consultation to ensure every provision still reflects your wishes precisely.',
			},
			social: {
				caption: 'An estate plan is not a document — it is a promise to the people you love that they will be cared for, exactly as you intend.',
				tags: ['#EstatePlanning', '#WealthPreservation', '#LegacyCounsel'],
			},
			proposal: 'Meridian Law Group respectfully proposes a comprehensive review of your estate, structured to preserve your assets and provide your family with lasting certainty.',
		},
	},
	{
		key: 'driftwood',
		name: 'Driftwood Roasters',
		monogram: 'DR',
		tint: '#c2762a', // warm amber — craft, playful
		voice: 'Warm, playful, craft-obsessed',
		goal: 'Sell 500 bags of the new summer roast',
		audience: 'Weekend brewers & cafe regulars',
		positioning: "Small-batch coffee roasted by people who'd geek out with you",
		artifacts: {
			email: {
				subject: 'Your new favorite cup just landed ☕',
				body: "We roasted something special this week — a bright, berry-forward summer blend that practically high-fives your morning. First 50 bags ship with a free pour-over guide.",
			},
			social: {
				caption: 'Sunshine in a bag ☀️ Our Summer Drift roast is here — juicy, a little wild, and best enjoyed barefoot on the porch.',
				tags: ['#SmallBatchCoffee', '#SummerDrift', '#RoastedWithLove'],
			},
			proposal: "Hey friend — here's our plan to get Driftwood's Summer Drift roast into more happy hands (and more cozy mornings) this season.",
		},
	},
];
const activeClientKey = ref('meridian');
const activeClient = computed(
	() => contextClients.find((c) => c.key === activeClientKey.value) || contextClients[0],
);

const aiCapabilities = [
	{ title: 'Brand & goal awareness', desc: "Set each client's brand voice, goals, audience, and positioning once. Every draft — emails, posts, proposals, plans — is grounded in it, so the output sounds like your business, not a generic template." },
	{ title: 'Earnest, in context', desc: 'Open any client, project, invoice, or lead and the same Earnest already knows the context — past conversations, open tasks, billing. Save any answer as a note.' },
	{ title: 'The Director’s Office', desc: 'The same Earnest, sized up to an operator. It reasons across projects, clients, and revenue, proposes a plan, and executes multi-step changes on your say-so.' },
	{ title: 'AI Actions', desc: 'Tell Earnest what to change and it does the work — reschedule a project, update a status, add a task — from one sentence, with a live confirmation of what changed.' },
	{ title: 'Context Broker', desc: 'A live org snapshot feeds a real language model on every call, kept fresh by a 3-tier cache. Token costs are shown up front, so there are never any surprises.' },
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
	{ slug: 'ai-sidebar', label: 'Context-aware Earnest', icon: 'i-lucide-sparkles' },
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

// ── Floating dock magnification ──
// macOS-style: each chip scales by its distance from the cursor (a cosine bell),
// and the item box widens with it so neighbours fan apart. The name tooltip
// shows only for the chip directly under the cursor. rAF-throttled; pointer-only
// (touch never fires mousemove, so the dock stays at rest on mobile).
const dockRef = ref(null);
const surfRailRef = ref(null);
const DOCK_BASE = 52; // base chip px — matches .e-dock .e-chip width
const DOCK_MAX = 1.75; // peak scale directly under the cursor
const DOCK_RANGE = 200; // px radius of influence either side of the cursor

// Shared dock magnification — runs on any rail of .e-dock-item chips: scale
// each by cursor distance (cosine bell), widen its box so neighbours fan
// apart, and reveal the hovered chip's tooltip. Used by the hero dock AND the
// seven-surfaces rail. rAF-throttled; pointer-only (touch never fires
// mousemove, so rails stay at rest on mobile).
function magnifyRail(el, cursorX) {
	el?.querySelectorAll('.e-dock-item').forEach((item) => {
		const r = item.getBoundingClientRect();
		const dist = Math.abs(cursorX - (r.left + r.width / 2));
		const f = dist < DOCK_RANGE ? (Math.cos((dist / DOCK_RANGE) * Math.PI) + 1) / 2 : 0;
		const scale = 1 + (DOCK_MAX - 1) * f;
		item.style.width = `${DOCK_BASE * scale}px`;
		const chip = item.querySelector('.e-chip');
		const tip = item.querySelector('.e-dock-tip');
		if (chip) chip.style.transform = `scale(${scale})`;
		if (tip) tip.style.opacity = dist < DOCK_BASE / 2 ? '1' : '0';
	});
}
function resetRail(el) {
	el?.querySelectorAll('.e-dock-item').forEach((item) => {
		item.style.width = '';
		const chip = item.querySelector('.e-chip');
		const tip = item.querySelector('.e-dock-tip');
		if (chip) chip.style.transform = '';
		if (tip) tip.style.opacity = '';
	});
}
let dockRaf = 0;
function onDockMove(e) {
	if (!dockRef.value || dockRaf) return;
	const x = e.clientX;
	dockRaf = requestAnimationFrame(() => { dockRaf = 0; magnifyRail(dockRef.value, x); });
}
function onDockLeave() {
	if (dockRaf) { cancelAnimationFrame(dockRaf); dockRaf = 0; }
	resetRail(dockRef.value);
}
let surfRaf = 0;
function onSurfRailMove(e) {
	if (!surfRailRef.value || surfRaf) return;
	const x = e.clientX;
	surfRaf = requestAnimationFrame(() => { surfRaf = 0; magnifyRail(surfRailRef.value, x); });
}
function onSurfRailLeave() {
	if (surfRaf) { cancelAnimationFrame(surfRaf); surfRaf = 0; }
	resetRail(surfRailRef.value);
}

// Activate an app in the seven-surfaces rail. The detail panel slides in from
// the side that matches the app's position relative to the current one — tap an
// app to the right of the active one and the panel enters from the right.
const swapDir = ref('right');
function setActiveSurface(key) {
	const oldIdx = tourPillars.findIndex((p) => p.key === activeSurface.value);
	const newIdx = tourPillars.findIndex((p) => p.key === key);
	swapDir.value = newIdx < oldIdx ? 'left' : 'right';
	activeSurface.value = key;
}

// Hero dock → seven-surfaces: activate the tapped app in the rail section and
// smooth-scroll down to it. Forces the rail variant so the selection is visible.
function selectSurface(key) {
	setActiveSurface(key);
	surfacesVariant.value = 'rail';
	if (import.meta.client) {
		document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

// ── Nav ──
const navScrolled = ref(false);
const navDemoOpen = ref(false);
const navDemoRef = ref(null);
function onNavDocClick(e) { if (navDemoRef.value && !navDemoRef.value.contains(e.target)) navDemoOpen.value = false; }
function onScroll() { navScrolled.value = window.scrollY > 40; }

// ── Early Access ──
// We're intercepting open sign-up while finalizing production: every "Start for
// free" / plan CTA opens this guided early-access capture instead of creating an
// account. Submissions POST to a public Directus webhook flow ("Early Access
// Signup", id below) that validates (honeypot + name + email) and writes a row
// to the `early_access` collection. No public table-write permission needed.
const EARLY_ACCESS_FLOW_ID = '08912f2e-d3a7-4ea6-b21e-9bdb79feee64';
const earlyAccessUrl = `${config.public.directusUrl || 'https://admin.earnest.guru'}/flows/trigger/${EARLY_ACCESS_FLOW_ID}`;

// Feature/app interest chips — mirror the seven apps + companions.
const eaFeatureOptions = [
	'People & CRM',
	'Projects & Tasks',
	'Invoicing & Money',
	'Marketing & Content',
	'Proposals & Contracts',
	'Earnest AI & Director',
	'Scheduling & Meetings',
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
const eaHoneypot = ref(''); // bots fill this; humans never see it
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

function openEarlyAccess() {
	resetEarlyAccess();
	showEarlyAccess.value = true;
	trackPageView('early-access-open');
}
function resetEarlyAccess() {
	Object.assign(eaForm, blankEaForm());
	eaStep.value = 1;
	eaSuccess.value = false;
	eaError.value = '';
	eaSubmitting.value = false;
	eaHoneypot.value = '';
}
function eaToggleFeature(f) {
	const i = eaForm.features_interested.indexOf(f);
	if (i === -1) eaForm.features_interested.push(f);
	else eaForm.features_interested.splice(i, 1);
}
function eaNext() {
	eaError.value = '';
	if (eaStep.value === 1 && !eaStep1Valid.value) {
		eaError.value = 'Please enter your name and a valid email.';
		return;
	}
	if (eaStep.value < EA_STEPS) eaStep.value += 1;
}
function eaBack() { eaError.value = ''; if (eaStep.value > 1) eaStep.value -= 1; }

async function submitEarlyAccess() {
	eaError.value = '';
	if (!eaStep1Valid.value) { eaStep.value = 1; eaError.value = 'Please enter your name and a valid email.'; return; }
	// Honeypot tripped — pretend success, never hit the server.
	if (eaHoneypot.value) { eaSuccess.value = true; return; }
	eaSubmitting.value = true;
	try {
		const referrer = [import.meta.client ? document.referrer : '', import.meta.client ? location.pathname + location.search : '']
			.filter(Boolean).join(' ').trim();
		await $fetch(earlyAccessUrl, {
			method: 'POST',
			body: {
				name: eaForm.name.trim(),
				email: eaForm.email.trim(),
				role: eaForm.role.trim(),
				phone: eaForm.phone.trim(),
				company: eaForm.company.trim(),
				business_type: eaForm.business_type,
				team_size: eaForm.team_size,
				website: eaForm.website.trim(),
				goals: eaForm.goals.trim(),
				features_interested: eaForm.features_interested,
				timeline: eaForm.timeline,
				source: 'early-access-form',
				referrer,
				hp: eaHoneypot.value,
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
			.fromTo('.e-dock .e-dock-item', { opacity: 0, y: 16, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.06 }, '-=0.2')
			.fromTo('.e-dock', { opacity: 0 }, { opacity: 1, duration: 0.01 }, '<')
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
		{ name: 'description', content: 'Earnest is the AI-powered business operating system for small & mid-size agencies and businesses — seven apps in one calm shell: Home, People, Work, Money, Marketing, Org, and Me. CRM, projects, invoicing, bookkeeping, marketing, contracts, and an AI operator that sees everything.' },
	],
});
</script>
