<template>
	<div class="e-page g-page" :data-look="look" :data-palette="effectivePalette" :data-style="effectiveType">
		<!-- ─── Nav ─── -->
		<nav class="e-nav" :class="{ 'e-nav-scrolled': navScrolled }">
			<nuxt-link to="/" class="e-nav-brand">
				<LogoEarnest size="md" />
			</nuxt-link>
			<div class="e-nav-links">
				<a href="#home" class="e-nav-link">Your day</a>
				<a href="#focus" class="e-nav-link">Earnest</a>
				<a href="#looks" class="e-nav-link">Looks</a>
				<a href="#pricing" class="e-nav-link">Pricing</a>
				<a href="#faq" class="e-nav-link">FAQ</a>
			</div>
			<div class="e-nav-right">
				<!-- The appearance control, reachable from anywhere on the page —
				     the same one the Looks section opens out in full, sharing its
				     state through `useLandingAppearance`. A visitor who wants to
				     see Paper should not have to scroll to a section to find it. -->
				<div ref="apRef" class="e-ap-wrap">
					<button
						type="button"
						class="e-theme-toggle g-press"
						:class="{ 'e-theme-toggle--on': apOpen }"
						aria-label="Appearance"
						:aria-expanded="apOpen"
						@click="apOpen = !apOpen"
					>
						<UIcon name="i-lucide-swatch-book" />
					</button>
					<Transition name="e-ap-pop">
						<div v-if="apOpen" class="e-ap-pop g-glass">
							<p class="e-ap-pop-head">Appearance</p>
							<LandingAppearance variant="compact" />
							<p class="e-ap-pop-foot">The whole page wears it — same axes the app gives you.</p>
						</div>
					</Transition>
				</div>
				<button
					type="button"
					class="e-theme-toggle g-press"
					:aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
					@click="toggleTheme"
				>
					<ClientOnly>
						<UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" />
						<template #fallback><UIcon name="i-lucide-moon" /></template>
					</ClientOnly>
				</button>
				<a :href="registerUrl" class="e-nav-link e-nav-cta g-press">Start free</a>
			</div>
		</nav>

		<!-- ─── Hero — the home, and the wave field it actually sits in ─── -->
		<header class="e-hero l-hero">
			<ClientOnly>
				<LandingWaveField :tint="heroTint" />
			</ClientOnly>
			<span class="g-eyebrow opacity-0"><span class="g-eyebrow-dot"></span> Clients · Projects · Invoices · Approvals · Content</span>
			<h1 class="e-hero-wordmark l-hero-head opacity-0">
				Your whole studio<span class="e-hero-period">.</span><br />And <span class="g-accent-text">what it needs from you today</span><span class="e-hero-period">.</span>
			</h1>
			<p class="e-hero-tagline opacity-0">Do good work<span class="e-dot">.</span></p>
			<p class="e-hero-sub opacity-0">
				Every client, project, invoice, proposal, approval and post in one place — and Earnest reading across all
				of it to tell you what needs a decision, what’s one tap, and what’s just worth knowing.
				<strong>Nothing reaches a client or moves money without your tap.</strong>
			</p>
			<div class="e-hero-actions opacity-0">
				<a :href="registerUrl" class="e-btn e-btn-primary g-press">Start free</a>
				<a :href="soloDemoUrl" class="e-btn e-btn-ghost g-press">Try the live demo</a>
			</div>
			<div class="e-hero-demos opacity-0">
				<span class="l-hero-note">14-day trial, no card · Solo $49/mo · every feature on every plan</span>
			</div>

			<!-- The lenses, working, over a home that is BUILT rather than
			     photographed: the pills re-rank the coded home, re-tint the field
			     behind it, and let Earnest write its own line under its own
			     greeting. `.e-dock` keeps useGlassMotion's intro stagger. -->
			<div class="opacity-0 e-hero-shot" style="width: 100%">
				<LandingLensDemo @tint="onTint" />
			</div>
		</header>

		<!-- ─── Marquee ─── -->
		<div class="e-marquee" aria-hidden="true">
			<div class="e-marquee-track">
				<span v-for="(item, i) in [...marqueeItems, ...marqueeItems]" :key="i" class="e-marquee-item">
					<UIcon :name="item.icon" /> {{ item.label }}
				</span>
			</div>
		</div>

		<!-- ─── 1. The day, sorted ─── -->
		<section id="home" class="e-section l-arg-section">
			<div class="l-arg" data-anim="scale">
				<div class="l-arg-copy">
					<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> Your day, sorted</span>
					<h2 class="e-h2">Three piles, <span class="g-accent-text">not a dashboard</span><span class="e-dot">.</span></h2>
					<p class="l-arg-sub">
						A dashboard shows you everything and asks you to work out what it means. Your home sorts the day
						into three piles instead, and tells you the count before you scroll:
						<em>22 things today — 5 need a decision, 13 are one tap each, 4 are just worth knowing.</em>
					</p>
					<ul class="l-arg-points">
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span><strong>Decide</strong> — Earnest drafted these and is waiting on you. Approve or adjust.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span><strong>Do</strong> — one tap each. Nothing here needs a decision, only a moment.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span><strong>Know</strong> — nothing required. It is here so you are not surprised later.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>Hold the home to arrange it — the widgets jiggle, and a gallery holds the rest.</span>
						</li>
					</ul>
				</div>
				<figure class="l-arg-shot">
					<div class="e-frame g-lift">
						<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
						<img
							:src="shot('home-v2-arrange')"
							alt="Earnest — arranging the home, widgets jiggling with the gallery open"
							loading="lazy"
							decoding="async"
							class="e-frame-img"
						/>
					</div>
				</figure>
			</div>
		</section>

		<!-- ─── 2. One door ─── -->
		<section id="focus" class="e-section l-arg-section">
			<div class="l-arg l-arg--flip" data-anim="scale">
				<div class="l-arg-copy">
					<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> Ask Earnest</span>
					<h2 class="e-h2">Ask from anywhere<span class="e-dot">.</span> It already knows <span class="g-accent-text">what you’re looking at</span><span class="e-dot">.</span></h2>
					<p class="l-arg-sub">
						One control in the header — <strong>E.</strong> — opens Earnest full screen from any page, and
						what it offers you first is ranked for whatever you were just looking at. Ask from a project and
						it opens on that project, with that project’s tasks beside the conversation.
					</p>
					<ul class="l-arg-points">
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>Three faces: <strong>Reflect</strong> to think out loud, <strong>Work</strong> for the task rail beside a project, <strong>Mirror</strong> for a read-only look at how you actually work.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>It works from your organization, not a blank prompt — on Anthropic’s Claude, under no-training terms.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>When it is thin on context it says so, rather than filling the gap with something plausible.</span>
						</li>
					</ul>
				</div>
				<figure class="l-arg-shot">
					<div class="e-frame g-lift">
						<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
						<img
							:src="shot('focus-takeover')"
							alt="Earnest — the full-screen Focus takeover, opened from the header"
							loading="lazy"
							decoding="async"
							class="e-frame-img"
						/>
					</div>
				</figure>
			</div>

			<!-- The ring is a gauge, and one frame of a gauge is a circle — so
			     it is drawn here rather than screenshotted. -->
			<div class="l-door-card g-glass" data-anim="scale">
				<LandingDoor />
				<blockquote class="l-door-quote">
					“I’m here. No rush. What’s the honest version of how things are right now?”
					<cite>— what Earnest opens with, every time</cite>
				</blockquote>
			</div>
		</section>

		<!-- ─── 3. Money ─── -->
		<section class="e-section l-arg-section">
			<div class="l-arg" data-anim="scale">
				<div class="l-arg-copy">
					<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> Financial clarity</span>
					<h2 class="e-h2">Your money, <span class="g-accent-text">sorted by certainty</span><span class="e-dot">.</span></h2>
					<p class="l-arg-sub">
						Not one “revenue” number that hides the truth. Every dollar is laid out by how sure it is —
						banked, owed, in play, gone cold — so the honest cash never blurs into the hopeful pipeline. Turn
						the Money lens on and the home says it in a line: <em>$12k is out, $12k of it past 90 days.</em>
					</p>
				</div>
				<figure class="l-arg-shot">
					<div class="e-frame g-lift">
						<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
						<img
							:src="shot('revenue-certainty')"
							alt="Earnest — revenue sorted by certainty"
							loading="lazy"
							decoding="async"
							class="e-frame-img"
						/>
					</div>
				</figure>
			</div>
		</section>

		<!-- ─── 4. Creative Approvals ─── -->
		<section class="e-section l-arg-section">
			<div class="l-arg l-arg--flip" data-anim="scale">
				<div class="l-arg-copy">
					<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> Creative Approvals</span>
					<h2 class="e-h2">Send work for approval <span class="g-accent-text">in one press</span><span class="e-dot">.</span></h2>
					<p class="l-arg-sub">
						Pick the files, press send. Your client opens a link — no login, no account — and marks each piece
						approved or asks for a change, with the note pinned to the artwork it is about.
					</p>
					<ul class="l-arg-points">
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>Rounds stack up and nothing is erased. Six weeks later you can still see who said what, and when.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>@-mention someone into a thread without giving them a seat.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>The Approvals floor is a triage list, grouped by who owes the next move — including when that is you.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span><strong>Included on every plan today.</strong></span>
						</li>
					</ul>
				</div>
				<div class="l-arg-pair">
					<figure class="l-arg-shot l-arg-shot--back">
						<div class="e-frame g-lift">
							<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
							<img
								:src="shot('approvals-board')"
								alt="Earnest — the client's approval board at its own link"
								loading="lazy"
								decoding="async"
								class="e-frame-img"
							/>
						</div>
					</figure>
					<figure class="l-arg-shot l-arg-shot--front">
						<div class="e-frame g-lift">
							<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
							<img
								:src="shot('approvals-floor')"
								alt="Earnest — the Approvals floor, grouped by who owes the next move"
								loading="lazy"
								decoding="async"
								class="e-frame-img"
							/>
						</div>
					</figure>
				</div>
			</div>
		</section>

		<!-- ─── 5. Content Studio ─── -->
		<section class="e-section l-arg-section">
			<div class="l-arg" data-anim="scale">
				<div class="l-arg-copy">
					<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> Content Studio</span>
					<h2 class="e-h2">A studio for the content, <span class="g-accent-text">not a scheduler</span><span class="e-dot">.</span></h2>
					<p class="l-arg-sub">
						Social posts and campaign emails share one place — what is drafted, what is out for review, and
						what is planned next, in the order it happens. Start from an example rather than an empty box, and
						test-send an email to yourself before anyone else sees it.
					</p>
					<ul class="l-arg-points">
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>Three lenses over the same content: <strong>River</strong> (the timeline), <strong>Approval</strong> (by who owes the next move), <strong>Upcoming</strong> (what is dated ahead).</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>A whole batch becomes one approval board, instead of an email thread per post.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>Earnest drafts in your brand voice — as a short form, or as a conversation.</span>
						</li>
					</ul>
					<p class="l-arg-foot">
						<UIcon name="i-lucide-info" class="l-arg-foot-ic" />
						<span>Publishing straight to Instagram, LinkedIn and the rest is <strong>coming soon</strong>. Today Earnest takes it as far as approved and queued — the send is still yours.</span>
					</p>
				</div>
				<figure class="l-arg-shot">
					<div class="e-frame g-lift">
						<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
						<img
							:src="shot('studio-river')"
							alt="Earnest — the Content Studio on the River lens"
							loading="lazy"
							decoding="async"
							class="e-frame-img"
						/>
					</div>
				</figure>
			</div>
		</section>

		<!-- ─── 6. What the client sees ─── -->
		<section class="e-section l-arg-section">
			<div class="l-arg l-arg--flip" data-anim="scale">
				<div class="l-arg-copy">
					<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> What the client sees</span>
					<h2 class="e-h2">Yours all the way <span class="g-accent-text">to the client</span><span class="e-dot">.</span></h2>
					<p class="l-arg-sub">
						Invoices, proposals, files and messages in one branded space — your logo, your colours, your
						domain. And a public booking page that carries your own card, so someone can read who you are and
						take a slot in the same breath.
					</p>
					<ul class="l-arg-points">
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>Clients see your studio. Earnest signs its own name small, at the bottom.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>Approval boards open at their own link — no portal seat required for a yes.</span>
						</li>
						<li>
							<UIcon name="i-lucide-check" class="l-arg-check" />
							<span>Your booking page shows real availability beside your card, so a stranger can read who you are and take a slot in one visit.</span>
						</li>
					</ul>
				</div>
				<!-- Two shots, because this section makes two claims: the portal a
				     client logs into, and the page a stranger lands on. -->
				<div class="l-arg-pair">
					<figure class="l-arg-shot l-arg-shot--back">
						<div class="e-frame g-lift">
							<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
							<img
								:src="shot('client-portal')"
								alt="Earnest — the branded, white-label client portal"
								loading="lazy"
								decoding="async"
								class="e-frame-img"
							/>
						</div>
					</figure>
					<figure class="l-arg-shot l-arg-shot--front">
						<div class="e-frame g-lift">
							<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
							<img
								:src="shot('booking-page')"
								alt="Earnest — a public booking page carrying the host's own card"
								loading="lazy"
								decoding="async"
								class="e-frame-img"
							/>
						</div>
					</figure>
				</div>
			</div>
		</section>

		<!-- ─── Looks ─── -->
		<section id="looks" class="e-section l-looks-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Appearance</span>
				<h2 class="e-h2" data-anim="rise">Three looks<span class="e-dot">.</span> <span class="g-accent-text">One Earnest</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">
					Not a colour swap. Each look changes the type, the surfaces and the weight of every rule in the app —
					and your work looks the same underneath all three. Here is the panel itself: move any axis and this
					page moves with it, hero and all.
				</p>
			</div>
			<div data-anim="scale">
				<LandingLooks />
			</div>
		</section>

		<!-- ─── Everything else ─── -->
		<section id="more" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> All included</span>
				<h2 class="e-h2" data-anim="rise">And everything else <span class="g-accent-text">it does</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">
					Six sections cannot hold it all. Everything below is on every plan — no add-ons for the features, no
					meter on the actions — except the one card marked <em>coming soon</em>, which is built but not on
					sale yet, and is not charged for.
				</p>
			</div>

			<div class="l-carousel-wrap" data-anim="scale">
				<button type="button" class="l-carousel-btn l-carousel-btn--prev g-press" aria-label="Scroll left" @click="scrollCarousel(-1)">
					<UIcon name="i-lucide-chevron-left" />
				</button>
				<div ref="carouselRef" class="l-carousel" role="list">
					<div
						v-for="m in moreCards"
						:key="m.title"
						class="l-more-card g-glass g-lift"
						:class="{ 'l-more-card--soon': m.soon }"
						role="listitem"
					>
						<span class="l-more-ic"><UIcon :name="m.icon" /></span>
						<h3 class="l-more-title">
							{{ m.title }}
							<span v-if="m.soon" class="l-soon">Coming soon</span>
						</h3>
						<p class="l-more-desc">{{ m.desc }}</p>
					</div>
				</div>
				<button type="button" class="l-carousel-btn l-carousel-btn--next g-press" aria-label="Scroll right" @click="scrollCarousel(1)">
					<UIcon name="i-lucide-chevron-right" />
				</button>
			</div>
		</section>

		<!-- ─── Pricing ─── -->
		<section id="pricing" class="e-section">
			<div class="g-sec-head">
				<h2 class="e-h2" data-anim="rise"><em>Simple</em> pricing<span class="e-dot">.</span> No surprises<span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">
					One price, your whole team, every feature on every plan — monthly, or two months free on annual.
				</p>
			</div>
			<div class="e-plans" data-stagger>
				<div v-for="(plan, index) in plans" :key="index" class="e-plan g-glass g-lift" :class="{ 'e-plan-featured': plan.featured }">
					<div v-if="plan.featured" class="e-plan-badge">Most popular</div>
					<div class="e-plan-name">{{ plan.name }}</div>
					<div class="e-plan-price"><sup>$</sup>{{ plan.price }}<span>/mo</span></div>
					<div class="e-plan-desc">{{ plan.desc }}</div>
					<ul class="e-plan-feats">
						<li v-for="(feat, fi) in plan.features" :key="fi"><UIcon name="i-lucide-check" class="e-plan-check" /> {{ feat }}</li>
					</ul>
					<a :href="plan.href" class="e-btn e-plan-btn g-press" :class="plan.featured ? 'e-btn-primary' : 'e-btn-ghost'">{{ plan.cta }}</a>
				</div>
			</div>

			<div class="l-compare" data-anim="scale">
				<p class="l-compare-lead">
					<UIcon name="i-lucide-check-check" class="l-compare-lead-ic" />
					Every feature — all six apps, the Boardroom, Creative Approvals and context-aware Earnest — is
					included on <strong>every</strong> plan. What changes is scale.
				</p>
				<div class="l-compare-scroll">
					<table class="l-compare-table">
						<thead>
							<tr>
								<th class="l-compare-rowhead" scope="col"><span class="l-compare-sr">Feature</span></th>
								<th scope="col">Solo</th>
								<th scope="col" class="l-compare-col--feat">Studio</th>
								<th scope="col">Agency</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="row in compareRows" :key="row.label">
								<th class="l-compare-rowhead" scope="row">{{ row.label }}</th>
								<td>{{ row.solo }}</td>
								<td class="l-compare-col--feat">{{ row.studio }}</td>
								<td>{{ row.agency }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="l-addons">
					<strong>Creative Approvals</strong> is included on every plan today ·
					<strong>Extra storage</strong> $10/mo per 100 GB ·
					<strong>White-label</strong> $19/mo on Agency ·
					more AI tokens available if you run out
					<br />
					<span class="l-addons-soon">
						<UIcon name="i-lucide-clock" /> Not on sale yet: <strong>Personal Brand</strong> (your own
						positioning and voice, on your card and in your posts — built, but not yet purchasable) and
						<strong>publishing straight to the social networks</strong>.
					</span>
				</p>
			</div>
		</section>

		<!-- ─── FAQ ─── -->
		<section id="faq" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Questions</span>
				<h2 class="e-h2" data-anim="rise">Good questions, <span class="g-accent-text">straight answers</span><span class="e-dot">.</span></h2>
			</div>
			<div class="g-faq" data-anim="scale">
				<div v-for="(f, i) in faqs" :key="i" class="g-faq-item g-glass" :class="{ 'g-faq-item--on': openFaq === i }">
					<h3 class="g-faq-q">
						<button
							type="button"
							class="g-faq-trigger g-press"
							:aria-expanded="openFaq === i"
							:aria-controls="`hfaq-panel-${i}`"
							@click="toggleFaq(i)"
						>
							<span>{{ f.q }}</span>
							<span class="g-faq-icon" aria-hidden="true"><UIcon :name="openFaq === i ? 'i-lucide-minus' : 'i-lucide-plus'" /></span>
						</button>
					</h3>
					<div v-show="openFaq === i" :id="`hfaq-panel-${i}`" class="g-faq-a" role="region">
						<p v-html="f.a"></p>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── One closing CTA ─── -->
		<section class="e-cta">
			<div class="e-cta-card" data-anim="scale">
				<p class="e-cta-word">Start with the pile<br />that’s bothering you<span class="e-dot">.</span></p>
				<p class="e-cta-hand">Do good work.</p>
				<p class="e-cta-sub">
					A workspace takes a few minutes to set up. Bring in one client, one project or one unpaid invoice —
					Earnest picks up your brand voice on day one and starts drafting the day with you.
				</p>
				<div class="e-hero-actions" style="justify-content: center">
					<a :href="registerUrl" class="e-btn e-btn-primary g-press">Start free</a>
					<a :href="soloDemoUrl" class="e-btn e-btn-ghost g-press">Try the live demo</a>
				</div>
				<p class="l-cta-fine">Questions first? <a href="mailto:hello@earnest.guru">hello@earnest.guru</a></p>
			</div>
		</section>

		<footer class="e-footer">
			<div class="e-footer-inner">
				<span class="e-footer-copy">&copy; {{ new Date().getFullYear() }} <span class="e-brand">Earnest</span> — Do good work.</span>
				<nav class="e-footer-links">
					<nuxt-link to="/features">Features</nuxt-link>
					<nuxt-link to="/blog">Blog</nuxt-link>
					<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
					<nuxt-link to="/terms-of-service">Terms</nuxt-link>
					<a :href="loginUrl">Sign in</a>
				</nav>
			</div>
		</footer>
	</div>
</template>

<script setup>
/**
 * SellSheetHome — the landing page, reframed around the app as it ships.
 *
 * It replaced a page that led with the Command Center, an eight-chip app rail,
 * a docked AI sidebar and social publishing. All four are gone from the
 * product: the home is Home v2, the rail is six chips plus the Boardroom, the
 * sidebar became a full-screen door, and publishing to the networks sits
 * behind a kill-switch that is off in production.
 *
 * ⚠️ The copy here is bound by the app's own Voice Charter — "earn trust by
 * being right, not by being loud". Every number on the page comes from either
 * `EARNEST_PLANS` (via `landing.ts`) or the seeded demo workspace the
 * screenshots were taken from, on the same day. If a claim cannot point at one
 * of those two, it does not belong on the page.
 *
 * THE APPEARANCE PANEL IS REAL, AND IT DRIVES THIS PAGE. The app's looks are
 * redesigns rather than colour swaps, and a screenshot carousel is the one
 * medium that cannot show that — so the page hands over the app's own control
 * instead. `data-look`, `data-palette` and `data-style` on this root are the
 * whole mechanism (the same three attributes the app writes on <html>), the
 * skins are token overrides in sellsheet-home.css, and `useLandingAppearance`
 * owns the choice so the nav popover and the panel in the Looks section are
 * one control. It also owns the rule that keeps this from exploding: a LOOK is
 * not an axis — Paper and Clean bring their own palette, and Paper brings its
 * own display face.
 *
 * THE HOME IN THE HERO IS MARKUP, not a capture (`Landing/HomeMock.vue`), for
 * the reason above: a PNG is frozen in the look, palette, type and mode it was
 * taken in, so the moment a visitor chose Paper the page was arguing its own
 * central claim with a Glass app sitting in the middle of it. It also carries
 * no browser chrome and floats straight on the wave field — the field is the
 * app's own ambient ground, and a window frame between the two turns a product
 * into a picture of one. The real captures stay on the page, in the Looks
 * section, as the receipt.
 *
 * Structure and chrome are deliberately the archived SellSheetLive's — the
 * `.e-*` base, the glass tiers, `useGlassMotion`'s hero timeline and scroll
 * reveals. What is new is the full-bleed wave field behind the hero (a port of
 * the app's own ambient background), the coded home and the lens demo standing
 * in for the retired app dock, the drawn autonomy ring, and the appearance
 * panel.
 */
import { ref, onMounted, onUnmounted } from 'vue';
import '~/assets/css/sellsheet-modern.css';
import '~/assets/css/sellsheet-glass.css';
import '~/assets/css/sellsheet-glass-sections.css';
import '~/assets/css/sellsheet-home.css';
import { useGlassMotion } from '~/composables/useGlassMotion';
import { useLandingAppearance } from '~/composables/useLandingAppearance';
import { faqs, plans, compareRows, marqueeItems, moreCards } from '~/data/landing';
import { getScreenshotSrc } from '~/data/features';

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const registerUrl = `${appUrl}/register`;
// ⚠️ `/auth/signin`, not `/login` — the app has no `/login` route.
const loginUrl = `${appUrl}/auth/signin`;
const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;

const shot = (slug) => getScreenshotSrc(slug);

// The hero's wave field takes its hue from whichever lens is selected below
// it — the same re-tint the app does, for the same reason: a lens is a way of
// looking at the whole home, ground included.
const heroTint = ref(null);
function onTint(hue) {
	heroTint.value = hue;
}

// What the whole page is wearing. `data-look`, `data-palette` and `data-style`
// on the root drive the skins in sellsheet-home.css — the same three
// attributes the app writes on <html>, carrying the same four axes. The
// composable owns the state (and the rule that a look pins some of it), so the
// nav popover and the panel in the Looks section are one control.
const { look, effectivePalette, effectiveType, isDark, toggleTheme } = useLandingAppearance();

// The nav popover. Closed on an outside click and on Escape — it is a menu
// over a page the visitor is reading, not a mode they have to leave.
const apOpen = ref(false);
const apRef = ref(null);
function onDocPointer(e) {
	if (!apOpen.value || !apRef.value || apRef.value.contains(e.target)) return;
	apOpen.value = false;
}
function onKey(e) {
	if (e.key === 'Escape') apOpen.value = false;
}

const carouselRef = ref(null);
function scrollCarousel(dir) {
	const el = carouselRef.value;
	if (!el) return;
	el.scrollBy({ left: dir * Math.min(680, el.clientWidth * 0.8), behavior: 'smooth' });
}

const openFaq = ref(0);
function toggleFaq(i) {
	openFaq.value = openFaq.value === i ? -1 : i;
}

const navScrolled = ref(false);
function onScroll() {
	navScrolled.value = window.scrollY > 40;
}

// Motion engine — hero intro, scroll reveals, counters, parallax.
const { initMotion, revertMotion } = useGlassMotion();

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true });
	document.addEventListener('pointerdown', onDocPointer);
	window.addEventListener('keydown', onKey);
	onScroll();
	initMotion();
});
onUnmounted(() => {
	window.removeEventListener('scroll', onScroll);
	document.removeEventListener('pointerdown', onDocPointer);
	window.removeEventListener('keydown', onKey);
	revertMotion();
});
// Head/SEO is set by the host page.
</script>

<style scoped>
.e-nav-right {
	display: flex;
	align-items: center;
	gap: 14px;
}
.e-theme-toggle {
	width: 34px;
	height: 34px;
	border-radius: 50%;
	border: 0;
	flex: none;
	display: grid;
	place-items: center;
	cursor: pointer;
	color: var(--g-ink-2);
	background: var(--g-accent-soft);
	transition: background 0.2s, color 0.2s, transform 0.15s var(--spring);
}
.e-theme-toggle:hover {
	color: var(--g-accent-ink);
	background: var(--g-accent-line);
}
.e-theme-toggle:active {
	transform: scale(0.92);
}
.e-theme-toggle :deep(svg),
.e-theme-toggle :deep([class*='iconify']) {
	width: 17px;
	height: 17px;
}
.e-theme-toggle--on {
	color: #fff;
	background: var(--g-accent);
}
.e-theme-toggle--on:hover {
	color: #fff;
	background: var(--g-accent);
}

/* ── The nav's appearance popover ──
   Anchored to its own button rather than the nav, so it stays put when the
   nav's right-hand group changes width (it does: the CTA label is longer in
   Clean's uppercase). */
.e-ap-wrap {
	position: relative;
	display: flex;
}
.e-ap-pop {
	position: absolute;
	top: calc(100% + 12px);
	right: 0;
	z-index: 40;
	width: min(340px, calc(100vw - 32px));
	padding: 16px 18px 14px;
	border-radius: 18px;
	text-align: left;
}
.e-ap-pop-head {
	margin: 0 0 12px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--g-ink-3);
}
.e-ap-pop-foot {
	margin: 14px 0 0;
	padding-top: 12px;
	border-top: 1px solid var(--g-line);
	font-size: 12px;
	line-height: 1.5;
	color: var(--g-ink-3);
}
.e-ap-pop-enter-active,
.e-ap-pop-leave-active {
	transition: opacity 0.2s ease, transform 0.24s var(--spring);
}
.e-ap-pop-enter-from,
.e-ap-pop-leave-to {
	opacity: 0;
	transform: translateY(-8px) scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
	.e-ap-pop-enter-active,
	.e-ap-pop-leave-active {
		transition: none;
	}
	.e-ap-pop-enter-from,
	.e-ap-pop-leave-to {
		transform: none;
	}
}
</style>
