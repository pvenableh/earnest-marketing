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
				<a href="#argument" class="e-nav-link">Product</a>
				<a href="#more" class="e-nav-link">Everything else</a>
				<a href="#pricing" class="e-nav-link">Pricing</a>
				<a href="#faq" class="e-nav-link">FAQ</a>
			</div>
			<div class="e-nav-right">
				<button type="button" class="e-theme-toggle g-press" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" @click="toggleTheme">
					<ClientOnly><UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" /><template #fallback><UIcon name="i-lucide-moon" /></template></ClientOnly>
				</button>
				<a :href="registerUrl" class="e-nav-link e-nav-cta g-press">Start free</a>
			</div>
		</nav>

		<!-- ─── Hero — one sharp promise, one primary CTA ─── -->
		<header class="e-hero">
			<span class="g-eyebrow opacity-0"><span class="g-eyebrow-dot"></span> The AI that knows your business, your clients, and you</span>
			<h1 class="e-hero-wordmark opacity-0">Earnest<span class="e-hero-period">.</span></h1>
			<p class="e-hero-tagline opacity-0">Do good work<span class="e-dot">.</span></p>
			<p class="e-hero-sub opacity-0">
				One place to run your whole studio — people, work, money and marketing — with an AI that reads it all, drafts the day <strong>in your voice</strong>, and moves nothing without your tap. Set up in minutes.
			</p>
			<div class="e-hero-actions opacity-0">
				<a :href="registerUrl" class="e-btn e-btn-primary g-press">Start free</a>
				<a :href="soloDemoUrl" class="e-btn e-btn-ghost g-press">Try the live demo</a>
			</div>
			<div class="e-hero-demos opacity-0">
				<span class="l-hero-note">No credit card to explore · Solo $49/mo · every feature included</span>
			</div>

			<!-- App rail — the whole business, one shell. Doubles as a control: it
			     cycles a spotlight through each app, and you can pick one. -->
			<div ref="dockRef" class="e-dock opacity-0" @mousemove="onDockMove" @mouseleave="onDockLeave" @mouseenter="pauseApps" @focusin="pauseApps" @focusout="resumeApps">
				<button
					v-for="(c, i) in apps" :key="c.label" type="button"
					class="e-dock-item l-dock-item" :class="{ 'l-dock-item--on': activeApp === i }"
					:aria-label="c.name" @click="setApp(i)" @mouseenter="setApp(i)"
				>
					<span class="e-dock-tip">{{ c.label }}</span>
					<span class="e-chip e-dock-chip" :style="{ '--chip-tint': c.tint }"><UIcon :name="c.icon" /></span>
				</button>
			</div>

			<!-- App spotlight — the dock drives this: a designed "slide" per app that
			     glides left↔right as the rail cycles, like the app's floor switcher. -->
			<div class="l-spot" @mouseenter="pauseApps" @mouseleave="resumeApps">
				<Transition :name="appDir >= 0 ? 'l-spot-next' : 'l-spot-prev'" mode="out-in">
					<div :key="activeApp" class="l-spot-card g-glass" :style="{ '--spot-tint': apps[activeApp].tint }">
						<span class="l-spot-ic"><UIcon :name="apps[activeApp].icon" /></span>
						<div class="l-spot-body">
							<span class="l-spot-name">{{ apps[activeApp].name }}</span>
							<span class="l-spot-pitch">{{ apps[activeApp].pitch }}</span>
						</div>
					</div>
				</Transition>
				<div class="l-spot-dots" role="tablist" aria-label="Apps">
					<button
						v-for="(c, i) in apps" :key="`dot-${i}`" type="button" role="tab"
						class="l-spot-dot" :class="{ 'l-spot-dot--on': activeApp === i }"
						:aria-selected="activeApp === i" :aria-label="c.name" @click="setApp(i)"
					/>
				</div>
			</div>

			<!-- Hero shot — the live Command Center -->
			<figure class="e-hero-shot opacity-0">
				<div class="e-frame g-hero-frame">
					<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
					<img :src="heroScreenshotSrc" alt="Earnest — the Command Center, your daily greeting and the one thing that needs you" loading="eager" decoding="async" class="e-frame-img" />
				</div>
				<div class="g-float g-float-score g-glass" data-parallax="0.14" aria-hidden="true">
					<span class="g-float-ring">
						<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="rgba(15,34,51,.1)" stroke-width="4" /><circle class="g-float-ring-fill" cx="20" cy="20" r="16" fill="none" stroke="#0da0cc" stroke-width="4" stroke-linecap="round" transform="rotate(-90 20 20)" /></svg>
					</span>
					<span class="g-float-body"><b data-count="87" data-dur="1.6">0</b><small>Earnest Score</small></span>
				</div>
				<div class="g-float g-float-streak g-glass" data-parallax="0.22" aria-hidden="true"><span class="g-streak">🔥 12-day streak</span></div>
				<div class="g-float g-float-dec g-glass" data-parallax="0.3" aria-hidden="true"><UIcon name="i-lucide-gavel" style="color:var(--g-accent)" /> 3 decisions ready</div>
				<figcaption class="e-hero-shot-caption">The live app — your real Command Center, not a mockup.</figcaption>
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

		<!-- ─── The argument — six points, each earning the next ─── -->
		<div id="argument">
			<section v-for="(a, i) in args" :key="a.key" class="e-section l-arg-section">
				<div class="l-arg" :class="{ 'l-arg--flip': i % 2 === 1 }" data-anim="scale">
					<div class="l-arg-copy">
						<span class="g-kicker-pill"><span class="g-eyebrow-dot"></span> {{ a.kicker }}</span>
						<h2 class="e-h2">{{ a.title }} <span class="g-accent-text">{{ a.accent }}</span><span class="e-dot">.</span></h2>
						<p class="l-arg-sub" v-html="a.sub"></p>
						<ul v-if="a.points" class="l-arg-points">
							<li v-for="(p, pi) in a.points" :key="pi"><UIcon name="i-lucide-check" class="l-arg-check" /> <span v-html="p"></span></li>
						</ul>
					</div>
					<figure class="l-arg-shot">
						<div class="e-frame g-lift">
							<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
							<img :src="`/screenshots/latest/${a.shot}.png`" :alt="a.alt" loading="lazy" decoding="async" class="e-frame-img" />
						</div>
					</figure>
				</div>
			</section>
		</div>

		<!-- ─── Everything else it does — breadth carousel ─── -->
		<section id="more" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> All included</span>
				<h2 class="e-h2" data-anim="rise">And everything else <span class="g-accent-text">it does</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Six headlines can’t hold it all. Every plan includes the whole toolkit — no add-ons, no usage meter.</p>
			</div>

			<div class="l-carousel-wrap" data-anim="scale">
				<button type="button" class="l-carousel-btn l-carousel-btn--prev g-press" aria-label="Scroll left" @click="scrollCarousel(-1)"><UIcon name="i-lucide-chevron-left" /></button>
				<div ref="carouselRef" class="l-carousel" role="list">
					<div v-for="m in more" :key="m.title" class="l-more-card g-glass g-lift" role="listitem">
						<span class="l-more-ic"><UIcon :name="m.icon" /></span>
						<h3 class="l-more-title">{{ m.title }}</h3>
						<p class="l-more-desc">{{ m.desc }}</p>
					</div>
				</div>
				<button type="button" class="l-carousel-btn l-carousel-btn--next g-press" aria-label="Scroll right" @click="scrollCarousel(1)"><UIcon name="i-lucide-chevron-right" /></button>
			</div>
		</section>

		<!-- ─── Pricing ─── -->
		<section id="pricing" class="e-section">
			<div class="g-sec-head">
				<h2 class="e-h2" data-anim="rise"><em>Simple</em> pricing<span class="e-dot">.</span> No surprises<span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">One price. Your whole team. Every feature included on every plan — monthly, or two months free on annual.</p>
			</div>
			<div class="e-plans" data-stagger>
				<div v-for="(plan, index) in plans" :key="index" class="e-plan g-glass g-lift" :class="{ 'e-plan-featured': plan.featured }">
					<div v-if="plan.featured" class="e-plan-badge">Most popular</div>
					<div class="e-plan-name">{{ plan.name }}</div>
					<div class="e-plan-price"><sup>$</sup>{{ plan.price }}<span>/mo</span></div>
					<div class="e-plan-desc">{{ plan.desc }}</div>
					<ul class="e-plan-feats"><li v-for="(feat, fi) in plan.features" :key="fi"><UIcon name="i-lucide-check" class="e-plan-check" /> {{ feat }}</li></ul>
					<a :href="plan.href" class="e-btn e-plan-btn g-press" :class="plan.featured ? 'e-btn-primary' : 'e-btn-ghost'">{{ plan.cta }}</a>
				</div>
			</div>

			<!-- Capacity ladder — every feature is on every plan; the tiers differ
			     only by scale. Scrolls horizontally on narrow screens. -->
			<div class="l-compare" data-anim="scale">
				<p class="l-compare-lead"><UIcon name="i-lucide-check-check" class="l-compare-lead-ic" /> Every feature — all apps, the Boardroom, and context-aware AI — is included on <strong>every</strong> plan. What changes is scale.</p>
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
						<button type="button" class="g-faq-trigger g-press" :aria-expanded="openFaq === i" :aria-controls="`lfaq-panel-${i}`" @click="toggleFaq(i)">
							<span>{{ f.q }}</span>
							<span class="g-faq-icon" aria-hidden="true"><UIcon :name="openFaq === i ? 'i-lucide-minus' : 'i-lucide-plus'" /></span>
						</button>
					</h3>
					<div v-show="openFaq === i" :id="`lfaq-panel-${i}`" class="g-faq-a" role="region">
						<p v-html="f.a"></p>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── One closing CTA ─── -->
		<section class="e-cta">
			<div class="e-cta-card" data-anim="scale">
				<p class="e-cta-word"><span class="e-brand">Earnest</span><span class="e-dot">.</span></p>
				<p class="e-cta-hand">Do good work.</p>
				<p class="e-cta-sub">It’s live. Create your workspace in a few minutes — Earnest learns your brand voice on day one and starts drafting the day with you.</p>
				<div class="e-hero-actions" style="justify-content:center">
					<a :href="registerUrl" class="e-btn e-btn-primary g-press">Start free</a>
					<a :href="soloDemoUrl" class="e-btn e-btn-ghost g-press">Try the live demo</a>
				</div>
				<p class="l-cta-fine">Questions first? <a :href="'mailto:hello@earnest.guru'">hello@earnest.guru</a></p>
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
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import '~/assets/css/sellsheet-modern.css';
import '~/assets/css/sellsheet-glass.css';
import '~/assets/css/sellsheet-glass-sections.css';
import { useGlassMotion } from '~/composables/useGlassMotion';

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const registerUrl = `${appUrl}/register`;
const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;
const heroScreenshotSrc = '/screenshots/latest/command-center.png';

// The app rail — each entry is both a dock chip and a spotlight "slide".
const apps = [
	{ label: 'Home', name: 'Presence Home', icon: 'i-lucide-layout-dashboard', tint: '#00cfff', pitch: 'Your AI-first home — the one thing that needs you, and the day drafted with you.' },
	{ label: 'People', name: 'People & CRM', icon: 'i-lucide-users', tint: '#09b0dd', pitch: 'Every client, lead and contact — enriched, deduped, and remembered in context.' },
	{ label: 'Work', name: 'Work & Projects', icon: 'i-lucide-square-kanban', tint: '#0da0cc', pitch: 'Projects, tasks and tickets on one honest timeline that keeps itself current.' },
	{ label: 'Chat', name: 'Team & Boardroom', icon: 'i-lucide-messages-square', tint: '#1191bb', pitch: 'Channels, calls and the live Boardroom where the team works a decision together.' },
	{ label: 'Money', name: 'Money', icon: 'i-lucide-trending-up', tint: '#1681aa', pitch: 'Invoices, payments and cash flow — sorted by how certain each dollar is.' },
	{ label: 'Mktg', name: 'Marketing', icon: 'i-lucide-megaphone', tint: '#1a7299', pitch: 'On-brand posts and campaigns, drafted and scheduled, held for your yes.' },
	{ label: 'Org', name: 'Organization', icon: 'i-lucide-building-2', tint: '#235377', pitch: 'Teams, roles and white-label branding — your studio, exactly your way.' },
	{ label: 'Me', name: 'You', icon: 'i-lucide-circle-user', tint: '#274366', pitch: 'Your Earnest Score, streaks and the settings that make it sound like you.' },
];

// Spotlight state — the rail auto-cycles through the apps (like the app's floor
// switcher), gliding left→right; hovering/clicking a chip takes over. appDir
// drives the slide direction of the transition.
const activeApp = ref(0);
const appDir = ref(1);
let appTimer = null;
let appPaused = false;
function advanceApps() { appDir.value = 1; activeApp.value = (activeApp.value + 1) % apps.length; }
function startApps() {
	if (appTimer) return;
	appTimer = window.setInterval(() => { if (!appPaused) advanceApps(); }, 5600);
}
function setApp(i) {
	if (i === activeApp.value) return;
	appDir.value = i > activeApp.value ? 1 : -1;
	activeApp.value = i;
}
function pauseApps() { appPaused = true; }
function resumeApps() { appPaused = false; }

const marqueeItems = [
	{ label: 'One place for the whole business', icon: 'i-lucide-building-2' },
	{ label: 'The morning briefing', icon: 'i-lucide-presentation' },
	{ label: 'Acts only when it understands', icon: 'i-lucide-shield-check' },
	{ label: 'Money sorted by certainty', icon: 'i-lucide-trending-up' },
	{ label: 'White-label client portal', icon: 'i-lucide-panel-right' },
	{ label: 'Learns your brand voice', icon: 'i-lucide-sparkles' },
	{ label: 'Nothing moves without your tap', icon: 'i-lucide-hand' },
	{ label: 'Set up in minutes', icon: 'i-lucide-rocket' },
];

// ─── The argument — six benefit-first points, in order. Each: a concrete
// headline, one supporting line, one real screenshot. Alternating sides.
const args = [
	{
		key: 'one-place',
		kicker: 'One place',
		title: 'Your whole business,', accent: 'in one place',
		sub: 'People, work, money and marketing — every app your studio runs on, in one calm shell. No more tab-sprawl, no more re-typing the same client into five different tools.',
		shot: 'organization-overview',
		alt: 'Earnest — your whole organization in one shell',
	},
	{
		key: 'briefing',
		kicker: 'The morning briefing',
		title: 'An AI that', accent: 'runs the day with you',
		sub: 'Every morning Earnest reads across every app and hands you a briefing — what needs a decision today, ranked, each one already drafted. You start from the answer, not a blank dashboard.',
		shot: 'director-presentation',
		alt: 'Earnest — the Director’s Office morning briefing',
	},
	{
		key: 'understands',
		kicker: 'Grounded, not generic',
		title: 'It only acts when', accent: 'it understands',
		sub: 'Earnest works from your real context — your clients, your brand, your data — so it acts when it’s sure, proposes when it matters, and asks when it’s missing something. And nothing reaches a client or moves money without your tap.',
		shot: 'ai-actions',
		alt: 'Earnest — AI actions held for your approval',
	},
	{
		key: 'money',
		kicker: 'Financial clarity',
		title: 'Your money,', accent: 'sorted by certainty',
		sub: 'Not one “revenue” number that hides the truth. Every dollar is laid out by how sure it is — banked, owed, in play, gone cold — so the honest cash never blurs into the hopeful pipeline.',
		shot: 'revenue-certainty',
		alt: 'Earnest — revenue sorted by certainty',
	},
	{
		key: 'portal',
		kicker: 'White-label',
		title: 'A client portal', accent: 'that looks like you',
		sub: 'Invoices, proposals, files and messages in one branded space — your logo, your colours, your domain. Clients see your studio, not ours.',
		shot: 'client-portal',
		alt: 'Earnest — the branded, white-label client portal',
	},
	{
		key: 'setup',
		kicker: 'Day one',
		title: 'Set up in minutes —', accent: 'it learns your voice',
		sub: 'Create your workspace and Earnest’s brand-voice step drafts with you from the start, so its very first suggestions already sound like your studio. No lengthy onboarding, no cold blank slate.',
		shot: 'organization-branding',
		alt: 'Earnest — the brand-voice onboarding step',
	},
];

// ─── Breadth carousel — the rest of the toolkit, all included on every plan. ───
const more = [
	{ icon: 'i-lucide-presentation', title: 'The Boardroom', desc: 'A live, multiplayer strategy room where the team works a decision together, in real time.' },
	{ icon: 'i-lucide-receipt', title: 'Invoicing & payments', desc: 'Send invoices, take deposits and get paid with Stripe — payments reconciled automatically.' },
	{ icon: 'i-lucide-file-signature', title: 'Proposals & contracts', desc: 'Draft, send and e-sign — every proposal tracked from open to won, or flagged when it goes cold.' },
	{ icon: 'i-lucide-calendar-clock', title: 'Scheduler & booking', desc: 'Share your availability; booked meetings land on the calendar and turn into tasks.' },
	{ icon: 'i-lucide-megaphone', title: 'Marketing & social', desc: 'Draft on-brand posts, schedule across channels, and read what actually landed.' },
	{ icon: 'i-lucide-square-kanban', title: 'Tickets, tasks & projects', desc: 'Run delivery end to end, with Earnest keeping the timeline honest as things shift.' },
	{ icon: 'i-lucide-scan-line', title: 'CardDesk', desc: 'Snap a business card and the contact lands in your CRM — enriched, deduped, gamified.' },
];
const carouselRef = ref(null);
function scrollCarousel(dir) {
	const el = carouselRef.value;
	if (!el) return;
	el.scrollBy({ left: dir * Math.min(680, el.clientWidth * 0.8), behavior: 'smooth' });
}

// ─── Tier comparison — every feature ships on every plan; you're choosing
// scale. Numbers mirror the app's EARNEST_PLANS (seats · tokens · scans ·
// portal seats · white-label). Kept as a capacity ladder, not a feature grid. ──
const compareRows = [
	{ label: 'Team seats', solo: '1', studio: '8', agency: '15' },
	{ label: 'AI tokens / month', solo: '100K', studio: '400K', agency: '1M' },
	{ label: 'Card scans / month', solo: '25', studio: '150', agency: '500' },
	{ label: 'Client-portal seats', solo: '5', studio: '15', agency: 'Unlimited' },
	{ label: 'White-label branding', solo: '—', studio: '—', agency: 'Add-on' },
];

// ─── Pricing — the live wizard's plans; CTAs go straight to /register. ───
const plans = [
	{ name: 'Solo', price: '49', desc: 'For the one-person shop doing serious work.', featured: false, features: ['1 team seat', 'Every feature included', 'People, work, money & marketing', 'Context-aware Earnest AI', '5 client portal seats', 'Monthly or annual (2 months free)'], cta: 'Start free', href: registerUrl },
	{ name: 'Studio', price: '149', desc: 'For the team that means business.', featured: true, features: ['8 team seats', 'Everything in Solo', 'Team channels & the Boardroom', 'Director mode & AI management', '15 client portal seats', '2 months free on annual'], cta: 'Start free', href: registerUrl },
	{ name: 'Agency', price: '299', desc: 'For the studio that’s grown into something real.', featured: false, features: ['15 team seats', 'Everything in Studio', 'White-label add-on available', 'Unlimited client portal seats', 'Bank sync & expenses', 'Priority support + onboarding'], cta: 'Start free', href: registerUrl },
];

// ─── FAQ — tightened to the essentials, all reframed to "it's live now". ───
const faqs = [
	{ q: 'Is Earnest actually live?', a: 'Yes. Earnest is live in production — sign up at <a href="' + registerUrl + '">app.earnest.guru</a>, create your workspace in a few minutes, and start today. You can also explore the <strong>live demo</strong> with real sample data first, no sign-up required.' },
	{ q: 'How is it different from ChatGPT or generic AI assistants?', a: 'Earnest runs on a <strong>real large language model</strong> — Anthropic’s Claude, on no-training terms — but instead of a blank prompt, it works from your <strong>actual organization</strong>: your goals, brand, clients and live data across every app, and drafts the day in your voice. Real context, not generic confidence.' },
	{ q: 'Does Earnest really learn how I work?', a: 'Yes. It learns your voice, your rhythm, the calls you always make and the ones you never would — so its drafts sound like you and its priorities match yours. As it proves itself accurate you can dial up how much it handles on its own, from suggesting to assisting to running routine work end to end. There is a hard floor it never crosses: <strong>money and client-facing sends always wait for your tap</strong>.' },
	{ q: 'What happens when Earnest doesn’t have enough context?', a: 'It stops and asks. If it’s thin on your brand, your goals, or a client’s voice, Earnest tells you what it’s missing instead of guessing or filling in generic text. It only acts on what it actually understands — real context over generic confidence.' },
	{ q: 'Will Earnest send emails or move money on its own?', a: 'No. Low-stakes, reversible work — reconciling a payment, summarizing a meeting, enriching a contact — can run automatically with a full audit trail. But <strong>nothing reaches a client or moves money without your tap</strong>.' },
	{ q: 'What does it cost?', a: 'Three plans: <strong>Solo $49/mo</strong>, <strong>Studio $149/mo</strong>, and <strong>Agency $299/mo</strong> — priced per workspace, not per action, with every feature included. Choose monthly or save two months on annual.' },
	{ q: 'Is Earnest for solo operators or bigger agencies?', a: 'Both. Solo is built for the one-person shop doing serious work; Studio and Agency add seats, team channels and director tooling as you grow. The same daily rhythm scales from one person to a full team.' },
	{ q: 'Do I have to replace all my tools at once?', a: 'No. Earnest brings people, work, money and marketing into one place, but you can start where it hurts most — chasing invoices, running a project, re-engaging leads — and let it earn the rest.' },
	{ q: 'Who can see my data?', a: 'Your workspace is private to your organization — only members you invite can see it, and we never sell your data or share one customer’s with another. Earnest’s AI reads your data only to generate your own results, under no-training terms. Full detail is in our <a href="/privacy-policy">privacy policy</a>.' },
];
const openFaq = ref(0);
function toggleFaq(i) { openFaq.value = openFaq.value === i ? -1 : i; }

// Nav
const navScrolled = ref(false);
function onScroll() { navScrolled.value = window.scrollY > 40; }

// Nav badge — a subtle loop between Earnest's two flagship experiences, pausing
// on each. Respects prefers-reduced-motion (holds on the first, "Director").
const navBadges = ['Director', 'Automation'];
const navBadgeIdx = ref(0);
let navBadgeTimer = null;

// Theme — DARK by default (matches the app + the aura), with a toggle into light.
const colorMode = useColorMode({ initialValue: 'dark', storageKey: 'earnest-mkt-theme' });
const isDark = computed(() => colorMode.value === 'dark');
function toggleTheme() { colorMode.value = isDark.value ? 'light' : 'dark'; }

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
		startApps();
	}
});
onUnmounted(() => {
	window.removeEventListener('scroll', onScroll);
	revertMotion();
	if (navBadgeTimer) clearInterval(navBadgeTimer);
	if (appTimer) clearInterval(appTimer);
});
// Head/SEO is set by the host page.
</script>

<style scoped>
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

/* Fixed-size slot so the Director ⇄ Automation swap never reflows the nav. */
.e-nav-badge-wrap {
	display: inline-flex; align-items: center; justify-content: center;
	min-width: 104px; height: 19px; margin-left: 10px; line-height: 1;
}
.e-badge-enter-active,
.e-badge-leave-active { transition: opacity 0.4s ease, transform 0.4s var(--spring); }
.e-badge-enter-from { opacity: 0; transform: translateY(-5px); }
.e-badge-leave-to { opacity: 0; transform: translateY(5px); }

.l-hero-note { font-size: 13px; color: var(--g-ink-3); }

/* App rail — the dock chips are buttons now; reset button chrome + mark the
   active one, and slim the browser-chrome bar on every screenshot frame. */
.l-dock-item { background: none; border: 0; padding: 0; margin: 0; font: inherit; cursor: pointer; }
.l-dock-item--on .e-dock-chip { box-shadow: 0 0 0 2px var(--g-accent-line), 0 8px 20px -9px rgba(0, 0, 0, 0.5); }

/* Spotlight the rail drives — one designed "slide" per app. */
.l-spot { max-width: 540px; margin: 20px auto 0; }
.l-spot-card {
	display: flex; align-items: center; gap: 15px; text-align: left;
	padding: 15px 19px; border-radius: 18px;
	/* Safe area: reserve the tallest card's height (name + 2-line pitch) so the
	   swap between shorter and longer pitches never reflows the page below. */
	min-height: 104px;
	border-left: 3px solid var(--spot-tint);
}
.l-spot-ic {
	width: 46px; height: 46px; flex: none; border-radius: 50%; display: grid; place-items: center;
	color: #fff; background: var(--spot-tint); box-shadow: 0 8px 20px -8px var(--spot-tint);
}
.l-spot-ic :deep(svg) { width: 23px; height: 23px; }
.l-spot-body { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.l-spot-name { font-size: 15px; font-weight: 700; color: var(--g-ink); }
.l-spot-pitch { font-size: 13.5px; line-height: 1.5; color: var(--g-ink-2); }

/* Narrow cards wrap the longest pitches to a third line — reserve for that here
   so the swap stays reflow-free on phones too (matches the 104px desktop area). */
@media (max-width: 540px) {
	.l-spot-card { min-height: 126px; }
}

.l-spot-dots { display: flex; justify-content: center; gap: 7px; margin-top: 13px; }
.l-spot-dot {
	width: 7px; height: 7px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
	background: var(--g-accent-line); transition: transform 0.2s var(--spring), background 0.2s;
}
.l-spot-dot--on { background: var(--g-accent); transform: scale(1.4); }

/* Direction-aware slide (matches the app's left↔right floor switch). */
.l-spot-next-enter-active, .l-spot-next-leave-active,
.l-spot-prev-enter-active, .l-spot-prev-leave-active { transition: opacity 0.34s ease, transform 0.34s var(--spring); }
.l-spot-next-enter-from { opacity: 0; transform: translateX(30px); }
.l-spot-next-leave-to { opacity: 0; transform: translateX(-30px); }
.l-spot-prev-enter-from { opacity: 0; transform: translateX(-30px); }
.l-spot-prev-leave-to { opacity: 0; transform: translateX(30px); }
@media (prefers-reduced-motion: reduce) {
	.l-spot-next-enter-from, .l-spot-next-leave-to,
	.l-spot-prev-enter-from, .l-spot-prev-leave-to { transform: none; }
}

/* Slimmer browser-chrome on the screenshot frames — the frame is a quiet
   container, not a focal point, so shrink the title bar + traffic-light dots. */
.e-frame { border-radius: 14px; }
.e-frame-chrome { padding: 6px 11px; gap: 5px; }
.e-frame-chrome span { width: 7px; height: 7px; }

/* ─── Argument rows — text + one screenshot, alternating sides. The whole page
   is one long-form pitch: six of these, each earning the next. ─── */
.l-arg-section { padding-top: clamp(48px, 7vw, 96px); padding-bottom: clamp(48px, 7vw, 96px); }
.l-arg {
	display: grid; grid-template-columns: 1fr 1.12fr; gap: clamp(28px, 5vw, 72px);
	align-items: center; max-width: 1120px; margin: 0 auto;
}
.l-arg--flip .l-arg-copy { order: 2; }
.l-arg--flip .l-arg-shot { order: 1; }
.l-arg-copy { max-width: 30rem; }
.l-arg-copy .e-h2 { margin: 14px 0 0; }
.l-arg-sub { margin: 16px 0 0; font-size: clamp(15px, 1.7vw, 17px); line-height: 1.6; color: var(--g-ink-2); }
.l-arg-points { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 10px; }
.l-arg-points li { display: flex; gap: 9px; font-size: 14.5px; line-height: 1.5; color: var(--g-ink-2); }
.l-arg-check { color: var(--g-accent); flex: none; margin-top: 3px; }
.l-arg-shot { margin: 0; }
.l-arg-shot .e-frame { box-shadow: 0 40px 90px -40px rgba(12, 30, 52, 0.55); }
/* Normalize every argument shot to one landscape frame so a taller capture (e.g.
   the Day One / branding screen) doesn't stand taller than the rest of the rows.
   Crops from the top so the meaningful header of each screen is always kept. */
.l-arg-shot .e-frame-img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: center top; }

@media (max-width: 860px) {
	.l-arg { grid-template-columns: 1fr; gap: 26px; }
	.l-arg--flip .l-arg-copy { order: 1; }
	.l-arg--flip .l-arg-shot { order: 2; }
	.l-arg-copy { max-width: none; }
}

/* ─── Breadth carousel — a full-bleed track so cards never hard-crop against a
   container edge. The horizontal mask softly fades partially-scrolled cards at
   both edges; the round nav lives in the page gutter and is styled for light +
   dark. Left padding aligns the first card with the ~1180px content column. ─── */
.l-carousel-wrap { position: relative; width: 100vw; margin-left: calc(50% - 50vw); }
.l-carousel {
	display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory;
	padding: 8px max(22px, calc(50vw - 590px)) 26px;
	scrollbar-width: none; -ms-overflow-style: none;
	-webkit-mask-image: linear-gradient(90deg, transparent 0, #000 4.5%, #000 95.5%, transparent 100%);
	mask-image: linear-gradient(90deg, transparent 0, #000 4.5%, #000 95.5%, transparent 100%);
}
.l-carousel::-webkit-scrollbar { display: none; }
.l-more-card {
	flex: 0 0 clamp(240px, 74vw, 300px); scroll-snap-align: start;
	display: flex; flex-direction: column; gap: 12px;
	padding: 24px 24px 26px; border-radius: 22px;
}
.l-more-ic {
	width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center;
	color: var(--g-accent-ink); background: var(--g-accent-soft); border: 1px solid var(--g-accent-line);
}
.l-more-ic :deep(svg) { width: 22px; height: 22px; }
.l-more-title { margin: 0; font-size: 17px; font-weight: 700; color: var(--g-ink); }
.l-more-desc { margin: 0; font-size: 14px; line-height: 1.55; color: var(--g-ink-3); }

.l-carousel-btn {
	position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
	width: 46px; height: 46px; border-radius: 50%; cursor: pointer;
	display: grid; place-items: center;
	color: var(--g-accent-ink);
	background: rgba(255, 255, 255, 0.92); border: 1px solid var(--g-line);
	backdrop-filter: blur(10px);
	box-shadow: 0 12px 30px -12px rgba(12, 30, 52, 0.45);
	transition: transform 0.15s var(--spring), color 0.2s, background 0.2s, border-color 0.2s;
}
.l-carousel-btn:hover { background: #fff; }
.l-carousel-btn:active { transform: translateY(-50%) scale(0.9); }
.l-carousel-btn--prev { left: max(14px, calc(50vw - 614px)); }
.l-carousel-btn--next { right: max(14px, calc(50vw - 614px)); }
.l-carousel-btn :deep(svg) { width: 21px; height: 21px; }
/* Dark-mode arrow + dock-tooltip overrides live in sellsheet-glass.css (.dark
   block) so they aren't subject to scoped-`:global()` quirks. */

@media (max-width: 720px) {
	.l-carousel-btn { display: none; }
}

.l-cta-fine { margin: 22px 0 0; font-size: 13.5px; color: var(--g-ink-3); }
.l-cta-fine a { color: var(--g-accent-ink); font-weight: 600; text-decoration: none; }
.l-cta-fine a:hover { text-decoration: underline; }

/* ─── Capacity ladder — the "every feature, pay for scale" comparison under the
   plan cards. Every plan ships every feature; the table shows only what scales. */
.l-compare { max-width: 900px; margin: clamp(28px, 4vw, 44px) auto 0; }
.l-compare-lead {
	display: flex; align-items: flex-start; gap: 9px; justify-content: center;
	max-width: 640px; margin: 0 auto 20px; text-align: center;
	font-size: 14.5px; line-height: 1.55; color: var(--g-ink-2);
}
.l-compare-lead strong { color: var(--g-ink); font-weight: 700; }
.l-compare-lead-ic { color: var(--g-accent); flex: none; margin-top: 2px; }
.l-compare-lead-ic :deep(svg) { width: 18px; height: 18px; }

.l-compare-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.l-compare-table {
	width: 100%; min-width: 480px; border-collapse: collapse; text-align: center;
}
.l-compare-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.l-compare-table thead th {
	padding: 12px 16px; font-size: 15px; font-weight: 700; color: var(--g-ink);
	border-bottom: 1px solid var(--g-line);
}
.l-compare-table tbody th,
.l-compare-table tbody td {
	padding: 13px 16px; font-size: 14px; border-bottom: 1px solid var(--g-line);
}
.l-compare-table tbody tr:last-child th,
.l-compare-table tbody tr:last-child td { border-bottom: 0; }
.l-compare-rowhead { text-align: left; color: var(--g-ink-2); font-weight: 600; white-space: nowrap; }
.l-compare-table tbody td { color: var(--g-ink); font-weight: 600; font-variant-numeric: tabular-nums; }
/* Highlight the featured (Studio) column so it ties back to the plan card. */
.l-compare-col--feat { background: var(--g-accent-soft); }
.l-compare-table thead th.l-compare-col--feat { color: var(--g-accent-ink); border-bottom-color: var(--g-accent-line); }
.l-compare-table tbody tr:first-child .l-compare-col--feat { border-top-left-radius: 12px; border-top-right-radius: 12px; }
.l-compare-table tbody tr:last-child .l-compare-col--feat { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
</style>
