<template>
	<div class="e-page g-page" :data-look="look" :data-palette="effectivePalette" :data-style="effectiveType">
		<!-- ─── Nav ─── -->
		<nav class="e-nav" :class="{ 'e-nav-scrolled': navScrolled }">
			<nuxt-link to="/" class="e-nav-brand">
				<LogoEarnest size="md" />
			</nuxt-link>
			<div class="e-nav-links">
				<a href="#apps" class="e-nav-link">Apps</a>
				<a href="#brand" class="e-nav-link">Brand</a>
				<a href="#does" class="e-nav-link">Actions</a>
				<a href="#looks" class="e-nav-link">Looks</a>
				<a href="#pricing" class="e-nav-link">Pricing</a>
				<a href="#faq" class="e-nav-link">FAQ</a>
			</div>
			<div class="e-nav-right">
				<!-- The appearance control, reachable from anywhere on the page —
				     the only full panel on the page (the Looks section is a teaser
				     whose button opens this one), sharing its
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

		<!-- ─── Hero — the claim, Focus answering it, and the home underneath ─── -->
		<header class="e-hero l-hero">
			<ClientOnly>
				<LandingWaveField :tint="heroTint" />
			</ClientOnly>

			<div class="l-hero2">
				<div class="l-hero2-copy">
					<span class="g-eyebrow opacity-0"><span class="g-eyebrow-dot"></span> Clients · Work · Money · Marketing · Schedule</span>
					<h1 class="e-hero-wordmark l-hero-head opacity-0">
						Ask anything<span class="e-hero-period">.</span><br />It already knows <span class="g-accent-text">your business</span><span class="e-hero-period">.</span>
					</h1>
					<p class="e-hero-tagline opacity-0">Do good work<span class="e-dot">.</span></p>
					<p class="e-hero-sub opacity-0">
						A real language model, grounded in <strong>your clients, projects, invoices and brand</strong>, that
						drafts the work and waits for your tap.
					</p>
					<div class="e-hero-actions opacity-0">
						<a :href="registerUrl" class="e-btn e-btn-primary g-press">Start free</a>
						<a :href="soloDemoUrl" class="e-btn e-btn-ghost g-press">Try the live demo</a>
					</div>
					<div class="e-hero-demos opacity-0">
						<span class="l-hero-note">14-day trial, no card · Solo $49/mo · every feature on every plan · your data is never used to train the model</span>
					</div>
				</div>

				<!-- Focus, working. `.e-hero-shot` keeps useGlassMotion's intro reveal. -->
				<div class="opacity-0 e-hero-shot l-hero2-focus">
					<LandingFocusDemo />
				</div>
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

		<!-- ─── 1. Six apps, one memory ─── -->
		<section id="apps" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Six apps, one memory</span>
				<h2 class="e-h2" data-anim="rise">It knows because <span class="g-accent-text">you run the studio here</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">
					Clients, work, money, marketing and schedules are the apps on the rail, not integrations. Every screen
					feeds the same memory, and Earnest is one control away in each. Home is built, not photographed —
					pick a lens and watch it re-rank.
				</p>
			</div>
			<div data-anim="scale">
				<LandingAppSwitcher @tint="onTint" />
			</div>
			<div class="l-replace" data-anim="rise">
				<span class="l-replace-k">What it replaces:</span>
				<span v-for="r in replaces" :key="r" class="l-replace-item">{{ r }}</span>
				<span class="l-replace-item l-replace-item--keep">Earnest.</span>
			</div>
		</section>

		<!-- ─── 2. Brand ─── -->
		<section id="brand" class="e-section l-arg-section">
			<div class="l-arg" data-anim="scale">
				<div class="l-arg-copy">
					<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> Brand awareness</span>
					<h2 class="e-h2">Set the brand once<span class="e-dot">.</span> <span class="g-accent-text">Every sentence inherits it</span><span class="e-dot">.</span></h2>
					<p class="l-arg-sub">
						Direction, audience and voice live on your organization and on each client. Every draft Earnest
						writes, and every document you send, reads from them.
					</p>
				</div>
				<div class="l-arg-side l-brand">
					<div class="l-brand-card g-glass">
						<p class="l-brand-card-h">Organization · Brand &amp; Strategy</p>
						<dl class="l-brand-kv">
							<template v-for="row in brandProfile" :key="row.k">
								<dt>{{ row.k }}</dt>
								<dd>{{ row.v }}</dd>
							</template>
						</dl>
					</div>
					<div class="l-brand-outs">
						<div v-for="o in brandOutputs" :key="o.kind" class="l-brand-out g-glass-thin">
							<span class="l-brand-out-k">{{ o.kind }}</span>
							<q>{{ o.text }}</q>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── 3. AI Actions ─── -->
		<section id="does" class="e-section l-arg-section">
			<div class="l-arg l-arg--flip" data-anim="scale">
				<div class="l-arg-copy">
					<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> AI Actions</span>
					<h2 class="e-h2">Then it does <span class="g-accent-text">the work</span><span class="e-dot">.</span></h2>
					<p class="l-arg-sub">
						Say what should change. Earnest lists every task, event, invoice and message it touches, and waits.
					</p>
					<p class="l-guard">
						<strong>Nothing reaches a client or moves money without your tap.</strong> Everything else is a draft
						until you say so.
					</p>
				</div>
				<div class="l-arg-side l-diff g-glass" aria-label="A proposed change, waiting for approval">
					<div class="l-diff-said">{{ actionSaid }}</div>
					<ol class="l-diff-rows">
						<li v-for="r in actionRows" :key="r.what" class="l-diff-row" :class="{ 'l-diff-row--held': r.held }">
							<span class="l-diff-app">{{ r.app }}</span>
							<span>{{ r.what }}</span>
							<span class="l-diff-delta">{{ r.delta }}</span>
						</li>
					</ol>
					<div class="l-diff-foot">
						<small>5 changes · 1 held for you · nothing sent</small>
						<span class="e-hero-actions" style="gap: 8px">
							<a :href="soloDemoUrl" class="e-btn e-btn-ghost g-press">Adjust</a>
							<a :href="soloDemoUrl" class="e-btn e-btn-primary g-press">Approve all</a>
						</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── Looks ─── -->
		<section id="looks" class="e-section l-looks-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Appearance</span>
				<h2 class="e-h2" data-anim="rise">Three looks<span class="e-dot">.</span> <span class="g-accent-text">One Earnest</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">
					Not a colour swap. Each look changes the type, the surfaces and the weight of every rule — your work
					stays the same underneath all three.
				</p>
			</div>
			<div data-anim="scale">
				<LandingLooks @open-panel="apOpen = true" />
			</div>
		</section>

		<!-- ─── Pricing ─── -->
		<section id="pricing" class="e-section">
			<div class="g-sec-head">
				<h2 class="e-h2" data-anim="rise">Every feature<span class="e-dot">.</span> <span class="g-accent-text">Every plan</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">
					One price, your whole team, every feature on every plan — monthly, or two months free on annual. What
					you choose is scale.
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

		<!-- ─── Footer — Hue's own pattern ─── -->
		<footer class="l-foot">
			<div class="l-foot-inner">
				<nav class="l-foot-links" aria-label="Footer">
					<nuxt-link to="/features">Features</nuxt-link>
					<nuxt-link to="/blog">Blog</nuxt-link>
					<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
					<nuxt-link to="/terms-of-service">Terms</nuxt-link>
					<nuxt-link to="/terms-of-service#refunds">Refunds</nuxt-link>
					<a :href="soloDemoUrl">Live demo</a>
					<a :href="loginUrl">Sign in</a>
				</nav>
				<p class="l-foot-maker">
					<a href="https://huestudios.com" target="_blank" rel="noopener">created by <LogoHue /></a>
				</p>
				<p class="l-foot-billing">
					Earnest is made and sold by Hue. Your subscription is billed by Hue and appears as
					<strong>HUE STUDIOS</strong> on your card statement.
				</p>
				<p class="l-foot-copy">&copy; {{ new Date().getFullYear() }} Hue</p>
			</div>
		</footer>
	</div>
</template>

<script setup>
/**
 * SellSheetHome — the landing page, round 2 (2026-09).
 *
 * It leads with the model: the hero is the claim on the left and Focus
 * answering it on the right (`Landing/FocusDemo.vue`), with the coded home and
 * its lenses still floating on the wave field underneath. Breadth comes next
 * as the six-app switcher (`Landing/AppSwitcher.vue`), then brand, then AI
 * Actions, then the appearance panel, pricing, FAQ, CTA and Hue's footer.
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
 * owns the choice so the nav popover and the Looks section's cards are one
 * control.
 *
 * THE HOME IN THE HERO IS MARKUP, not a capture (`Landing/HomeMock.vue`): a
 * PNG is frozen in the look, palette, type and mode it was taken in, so the
 * moment a visitor chose Paper the page was arguing its own central claim with
 * a Glass app sitting in the middle of it. The real captures stay on the
 * page, in the Looks section and the app switcher, as the receipt.
 */
import { ref, onMounted, onUnmounted } from 'vue';
import '~/assets/css/sellsheet-modern.css';
import '~/assets/css/sellsheet-glass.css';
import '~/assets/css/sellsheet-glass-sections.css';
import '~/assets/css/sellsheet-home.css';
import { useGlassMotion } from '~/composables/useGlassMotion';
import { useLandingAppearance } from '~/composables/useLandingAppearance';
import {
	faqs,
	plans,
	compareRows,
	marqueeItems,
	replaces,
	brandProfile,
	brandOutputs,
	actionSaid,
	actionRows,
} from '~/data/landing';

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const registerUrl = `${appUrl}/register`;
// ⚠️ `/auth/signin`, not `/login` — the app has no `/login` route.
const loginUrl = `${appUrl}/auth/signin`;
const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;

// The hero's wave field takes its hue from whichever lens is selected on the
// coded home (the rail's Home entry) — the same re-tint the app does, for the same reason: a lens is a way of
// looking at the whole home, ground included.
const heroTint = ref(null);
function onTint(hue) {
	heroTint.value = hue;
}

// What the whole page is wearing. `data-look`, `data-palette` and `data-style`
// on the root drive the skins in sellsheet-home.css — the same three
// attributes the app writes on <html>, carrying the same four axes. The
// composable owns the state (and the rule that a look pins some of it), so the
// nav popover and the Looks section's cards are one control.
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
