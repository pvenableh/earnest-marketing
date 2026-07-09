<template>
	<div class="e-page g-page">
		<!-- ─── Nav ─── -->
		<nav class="e-nav" :class="{ 'e-nav-scrolled': navScrolled }">
			<nuxt-link to="/automation" class="e-nav-brand">
				<LogoEarnest size="md" />
				<span class="e-nav-badge">Automation</span>
			</nuxt-link>
			<div class="e-nav-links">
				<a href="#context" class="e-nav-link">Context</a>
				<a href="#honest" class="e-nav-link">Honesty</a>
				<a href="#autos" class="e-nav-link">Automations</a>
				<a href="#pricing" class="e-nav-link">Pricing</a>
				<nuxt-link to="/" class="e-nav-link">Classic</nuxt-link>
			</div>
			<button type="button" class="e-nav-link e-nav-cta g-press" @click="openEarlyAccess()">Start for free</button>
		</nav>

		<!-- ─── Hero ─── -->
		<header class="e-hero">
			<span class="g-eyebrow opacity-0"><span class="g-eyebrow-dot"></span> Context-aware automation</span>
			<h1 class="e-hero-wordmark opacity-0">Earnest<span class="e-hero-period">.</span></h1>
			<p class="e-hero-tagline opacity-0">Context in<span class="e-dot">.</span> Accuracy out<span class="e-dot">.</span></p>
			<p class="e-hero-sub opacity-0">
				Earnest doesn’t oversell. It reads your <strong>goals, brand, audience and live data</strong>, then acts only when it’s genuinely right — drafting work that sounds like you, and holding back when it isn’t sure. Automation you can actually trust.
			</p>
			<div class="e-hero-actions opacity-0">
				<button class="e-btn e-btn-primary g-press" @click="openEarlyAccess()">Start for free</button>
				<a href="#context" class="e-btn e-btn-ghost g-press">See how it reasons</a>
			</div>
			<div class="e-hero-demos opacity-0">
				<a :href="soloDemoUrl" class="e-hero-demo"><UIcon name="i-lucide-play-circle" /> Try the live demo</a>
				<nuxt-link to="/director" class="e-hero-demo"><UIcon name="i-lucide-gavel" /> See the Director version</nuxt-link>
			</div>

			<div ref="dockRef" class="e-dock opacity-0" @mousemove="onDockMove" @mouseleave="onDockLeave">
				<div v-for="c in heroChips" :key="c.label" class="e-dock-item">
					<span class="e-dock-tip">{{ c.label }}</span>
					<span class="e-chip e-dock-chip" :style="{ '--chip-tint': c.tint }"><UIcon :name="c.icon" /></span>
				</div>
			</div>

			<figure class="e-hero-shot opacity-0">
				<div class="e-frame g-hero-frame">
					<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
					<img :src="heroScreenshotSrc" alt="Earnest — context-aware AI" loading="eager" decoding="async" class="e-frame-img" />
				</div>
				<div class="g-float g-float-score g-glass" data-parallax="0.16" aria-hidden="true">
					<UIcon name="i-lucide-target" style="color:var(--g-accent)" />
					<span class="g-float-body"><b>94<span style="font-size:.7em">%</span></b><small>confidence</small></span>
				</div>
				<div class="g-float g-float-streak g-glass" data-parallax="0.24" aria-hidden="true"><UIcon name="i-lucide-layers" style="color:var(--g-accent-2)" /> Grounded in 5 signals</div>
				<div class="g-float g-float-dec g-glass" data-parallax="0.3" aria-hidden="true"><UIcon name="i-lucide-shield-check" style="color:#0e9f6e" /> 0 generic templates</div>
				<figcaption class="e-hero-shot-caption">The live app — Earnest reads your context before it acts.</figcaption>
			</figure>
		</header>

		<!-- ─── Marquee ─── -->
		<div class="e-marquee" aria-hidden="true">
			<div class="e-marquee-track">
				<span v-for="(item, i) in [...marqueeItems, ...marqueeItems]" :key="i" class="e-marquee-item"><UIcon :name="item.icon" /> {{ item.label }}</span>
			</div>
		</div>

		<!-- ─── Grounded in your context (client brand demo) ─── -->
		<section id="context" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Grounded, not generic</span>
				<h2 class="e-h2" data-anim="rise">It analyzes <span class="g-accent-text">your</span> business<span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Set each client’s goals, brand voice, audience and positioning once. Earnest carries that context into everything it drafts — so the output sounds like <em>that</em> client, never a template. Switch clients and watch the same work re-reason.</p>
			</div>

			<div class="g-brand-toggle" data-anim="rise" role="tablist" aria-label="Choose a client">
				<button v-for="c in clients" :key="c.key" type="button" role="tab" class="g-brand-btn" :class="{ 'g-brand-btn--on': activeClientKey === c.key }" :aria-selected="activeClientKey === c.key" @click="activeClientKey = c.key">
					<span class="g-brand-mono" :style="{ '--mono-tint': c.tint }">{{ c.monogram }}</span>{{ c.name }}
				</button>
			</div>

			<div class="g-ctx-stack" data-anim="scale">
				<div class="g-inputs" :key="`in-${activeClientKey}`">
					<div v-for="(inp, i) in activeClient.inputs" :key="i" class="g-input g-glass g-slide-anim">
						<span class="g-input-ic" :style="{ background: activeClient.tint }"><UIcon :name="inp.icon" /></span>
						<span><span class="g-input-t">{{ inp.k }}</span><span class="g-input-s">{{ inp.v }}</span></span>
					</div>
				</div>
				<div class="g-arrow-col" aria-hidden="true"><UIcon name="i-lucide-arrow-right" style="color:var(--g-accent);width:26px;height:26px" /></div>
				<div class="g-output g-glass-ultra" :key="`out-${activeClientKey}`">
					<div class="g-output-head">
						<span class="g-chip g-chip-ai round"><UIcon name="i-lucide-sparkles" /></span>
						<span class="g-output-title">Drafted for {{ activeClient.name }}</span>
						<span class="g-output-sub"><UIcon name="i-lucide-target" style="width:13px;height:13px;vertical-align:-2px" /> {{ activeClient.confidence }}% on-brand</span>
					</div>
					<div class="g-output-artifact g-slide-anim">
						<span class="lbl"><UIcon name="i-lucide-mail" style="width:12px;height:12px;vertical-align:-1px" /> Email</span>
						<p class="subj">{{ activeClient.artifacts.email.subject }}</p>
						<p class="body">{{ activeClient.artifacts.email.body }}</p>
					</div>
					<div class="g-output-artifact g-slide-anim">
						<span class="lbl"><UIcon name="i-lucide-hash" style="width:12px;height:12px;vertical-align:-1px" /> Social post</span>
						<p class="body">{{ activeClient.artifacts.social.caption }}</p>
						<div class="g-output-tags"><span v-for="t in activeClient.artifacts.social.tags" :key="t">{{ t }}</span></div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── It doesn't oversell ─── -->
		<section id="honest" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Accurate over eager</span>
				<h2 class="e-h2" data-anim="rise">It doesn’t <span class="g-accent-text">oversell</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Most AI tools act confident about everything. Earnest is calibrated: it acts when it’s sure, proposes when it matters, and holds back when it doesn’t have enough to be right.</p>
			</div>
			<div class="g-lights" data-stagger>
				<div class="g-light g-glass g-lift go">
					<div class="g-light-badge"><span class="dot"></span> Acts · high confidence</div>
					<h4>When it’s sure, it just does it</h4>
					<p>Grounded, reversible, low-stakes work runs on its own — with a full audit trail and one-tap undo.</p>
					<ul><li>Reconcile a payment to its invoice</li><li>Summarize a meeting into notes</li><li>Enrich a scanned contact</li></ul>
				</div>
				<div class="g-light g-glass g-lift wait">
					<div class="g-light-badge"><span class="dot"></span> Proposes · your call</div>
					<h4>When it matters, it waits for you</h4>
					<p>Client-facing or money-moving work is drafted accurately, then held for your yes. Never sent behind your back.</p>
					<ul><li>Draft an invoice reminder</li><li>Write an on-brand campaign</li><li>Prepare a proposal from a lead</li></ul>
				</div>
				<div class="g-light g-glass g-lift stop">
					<div class="g-light-badge"><span class="dot"></span> Holds · needs context</div>
					<h4>When it’s unsure, it asks</h4>
					<p>Thin on brand, goals or audience? Earnest asks for what it’s missing instead of guessing — no generic filler.</p>
					<ul><li>New client with no brand set</li><li>A tone it hasn’t seen before</li><li>Ambiguous or conflicting goals</li></ul>
				</div>
			</div>
		</section>

		<!-- ─── Automations that run on context ─── -->
		<section id="autos" class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> Automations, calibrated</span>
				<h2 class="e-h2" data-anim="rise">Every automation carries <span class="g-accent-text">a confidence</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">Earnest watches your business for signals and reacts — but each action shows how sure it is, and low-confidence work waits for you rather than pretending.</p>
			</div>
			<div class="g-autos" data-stagger>
				<div v-for="(a, i) in automations" :key="i" class="g-auto g-glass g-lift">
					<div class="g-auto-top">
						<span class="g-auto-ic" :class="`g-chip-${a.chip}`"><UIcon :name="a.icon" /></span>
						<span class="g-auto-trig">When<b>{{ a.trigger }}</b></span>
					</div>
					<p class="g-auto-does" v-html="a.does"></p>
					<div class="g-meter">
						<div class="g-meter-head"><span>{{ a.verdict }}</span><b>{{ a.conf }}%</b></div>
						<div class="g-meter-track"><div class="g-meter-fill" :class="a.cls" :data-fill="a.conf"></div></div>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── Context completeness (gamified) ─── -->
		<section class="e-section">
			<div class="g-sec-head">
				<span class="g-kicker-pill" data-anim="scale"><span class="g-eyebrow-dot"></span> The more it knows</span>
				<h2 class="e-h2" data-anim="rise">Context is a <span class="g-accent-text">level you unlock</span><span class="e-dot">.</span></h2>
				<p class="e-section-sub" data-anim="rise">The more Earnest knows about a client, the more it can safely automate. Fill in their context and watch new capabilities come online — a progress bar for trust.</p>
			</div>
			<div class="g-complete" data-anim="scale">
				<div class="g-complete-card g-glass">
					<div class="g-complete-head">
						<span class="g-brand-mono" style="--mono-tint:#1681aa;width:40px;height:40px;font-size:14px">HC</span>
						<div>
							<span class="g-mo-label">Context completeness</span>
							<span class="g-complete-name">Helios Corp · <span class="g-accent-text">Level 4 · Trusted</span></span>
						</div>
						<span class="g-complete-pct"><b data-count="82" data-suffix="%">0%</b></span>
					</div>
					<div class="g-xp-track" style="height:11px"><div class="g-xp-fill" data-fill="82"></div></div>
					<div class="g-complete-grid" data-stagger>
						<span v-for="c in completeness" :key="c.k" class="g-complete-item" :class="{ done: c.on }">
							<UIcon :name="c.on ? 'i-lucide-check-circle-2' : 'i-lucide-circle-dashed'" />
							{{ c.k }}
						</span>
					</div>
					<p class="g-complete-hint"><UIcon name="i-lucide-lock-open" /> Add <b>tone examples</b> and <b>competitor set</b> to unlock <b>auto-drafting</b> for this client.</p>
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
				<p class="e-section-sub" data-anim="rise">One price. Your whole team. Context-aware automation on every plan.</p>
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

		<!-- ─── Final CTA ─── -->
		<section class="e-cta">
			<div class="e-cta-card g-glass-ultra" data-anim="scale">
				<p class="e-cta-word"><span class="e-brand">Earnest</span><span class="e-dot">.</span></p>
				<p class="e-cta-hand">Do good work.</p>
				<p class="e-cta-sub">Automation that reads your context, acts when it’s right, and tells you the truth when it isn’t. Give it your goals — watch what it can safely do.</p>
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
					<nuxt-link to="/">Classic</nuxt-link>
					<nuxt-link to="/director">Director</nuxt-link>
					<nuxt-link to="/features">Features</nuxt-link>
					<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
				</nav>
			</div>
		</footer>

		<GlassEarlyAccess ref="eaRef" :solo-demo-url="soloDemoUrl" source="early-access-form-automation" />
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
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
const heroScreenshotSrc = '/screenshots/latest/ai-sidebar.png';

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
	{ label: 'Goals-aware', icon: 'i-lucide-target' },
	{ label: 'Brand voice', icon: 'i-lucide-megaphone' },
	{ label: 'Target audience', icon: 'i-lucide-users' },
	{ label: 'Live business data', icon: 'i-lucide-database' },
	{ label: 'Confidence-scored', icon: 'i-lucide-gauge' },
	{ label: 'Holds when unsure', icon: 'i-lucide-hand' },
	{ label: 'Full audit + undo', icon: 'i-lucide-history' },
	{ label: 'Never generic', icon: 'i-lucide-shield-check' },
	{ label: 'Context Broker', icon: 'i-lucide-brain' },
];

// Two real demo clients — same work, re-reasoned in each brand's context.
const clients = [
	{
		key: 'meridian', name: 'Meridian Law', monogram: 'ML', tint: '#274366', confidence: 96,
		inputs: [
			{ icon: 'i-lucide-target', k: 'Goal', v: 'Book 12 estate-planning consults this quarter' },
			{ icon: 'i-lucide-megaphone', k: 'Brand voice', v: 'Formal, precise, reassuring' },
			{ icon: 'i-lucide-users', k: 'Audience', v: 'High-net-worth families & owners' },
			{ icon: 'i-lucide-compass', k: 'Positioning', v: 'White-glove counsel that protects what you built' },
		],
		artifacts: {
			email: { subject: 'A measured review of your estate plan', body: 'Circumstances change, and a plan should change with them. We invite you to a confidential 45-minute consultation to ensure every provision still reflects your wishes precisely.' },
			social: { caption: 'An estate plan is not a document — it is a promise to the people you love that they will be cared for, exactly as you intend.', tags: ['#EstatePlanning', '#WealthPreservation', '#LegacyCounsel'] },
		},
	},
	{
		key: 'driftwood', name: 'Driftwood Roasters', monogram: 'DR', tint: '#c2762a', confidence: 93,
		inputs: [
			{ icon: 'i-lucide-target', k: 'Goal', v: 'Sell 500 bags of the new summer roast' },
			{ icon: 'i-lucide-megaphone', k: 'Brand voice', v: 'Warm, playful, craft-obsessed' },
			{ icon: 'i-lucide-users', k: 'Audience', v: 'Weekend brewers & cafe regulars' },
			{ icon: 'i-lucide-compass', k: 'Positioning', v: 'Small-batch coffee roasted by people who’d geek out with you' },
		],
		artifacts: {
			email: { subject: 'Your new favorite cup just landed ☕', body: 'We roasted something special this week — a bright, berry-forward summer blend that practically high-fives your morning. First 50 bags ship with a free pour-over guide.' },
			social: { caption: 'Sunshine in a bag ☀️ Our Summer Drift roast is here — juicy, a little wild, and best enjoyed barefoot on the porch.', tags: ['#SmallBatchCoffee', '#SummerDrift', '#RoastedWithLove'] },
		},
	},
];
const activeClientKey = ref('meridian');
const activeClient = computed(() => clients.find((c) => c.key === activeClientKey.value) || clients[0]);

const automations = [
	{ chip: 'money', icon: 'i-lucide-receipt', trigger: 'an invoice is 12 days overdue', does: 'Drafts a firm-but-warm reminder <b>in your client’s voice</b> and holds it for approval.', verdict: 'Ready to send', conf: 94, cls: 'hi' },
	{ chip: 'people', icon: 'i-lucide-user-round-search', trigger: 'a lead goes quiet for 10 days', does: 'Writes a re-engagement note grounded in <b>their brief and history</b>.', verdict: 'Ready to send', conf: 88, cls: 'hi' },
	{ chip: 'work', icon: 'i-lucide-check-check', trigger: 'a project is marked complete', does: 'Seeds a draft invoice from the <b>contract and time logged</b> — nothing sent yet.', verdict: 'Ready to review', conf: 96, cls: 'hi' },
	{ chip: 'marketing', icon: 'i-lucide-megaphone', trigger: 'reach drops 31% in two weeks', does: 'Proposes three on-brand posts — but <b>waits</b>, because tone matters here.', verdict: 'Proposed for review', conf: 74, cls: 'mid' },
	{ chip: 'org', icon: 'i-lucide-help-circle', trigger: 'a new client has no brand set', does: 'Asks for goals, voice and audience <b>before drafting anything</b>.', verdict: 'Holds — needs context', conf: 38, cls: 'lo' },
	{ chip: 'money', icon: 'i-lucide-wallet', trigger: 'a payment lands', does: 'Reconciles the invoice and updates cash flow <b>instantly</b> — fully reversible.', verdict: 'Done automatically', conf: 99, cls: 'hi' },
];

const completeness = [
	{ k: 'Business goals', on: true }, { k: 'Brand voice', on: true }, { k: 'Target audience', on: true },
	{ k: 'Positioning', on: true }, { k: 'Tone examples', on: false }, { k: 'Competitor set', on: false },
];

const proofShots = [
	{ slug: 'ai-sidebar', label: 'Context-aware Earnest', icon: 'i-lucide-sparkles' },
	{ slug: 'ai-actions', label: 'AI Actions', icon: 'i-lucide-wand-sparkles' },
	{ slug: 'marketing-recommendations', label: 'Marketing Recs', icon: 'i-lucide-megaphone' },
	{ slug: 'organization-branding', label: 'Brand Context', icon: 'i-lucide-palette' },
	{ slug: 'leads-pipeline', label: 'CRM Pipeline', icon: 'i-lucide-scan-search' },
	{ slug: 'financials-overview', label: 'Money · Cash Flow', icon: 'i-lucide-trending-up' },
	{ slug: 'command-center', label: 'Command Center', icon: 'i-lucide-zap' },
	{ slug: 'proposals-composer', label: 'Proposal Drafter', icon: 'i-lucide-wand-2' },
];
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const activeShot = computed(() => proofShots[lightboxIndex.value] || null);
function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true; }
function closeLightbox(open) { if (!open) lightboxOpen.value = false; }
function lightboxPrev() { lightboxIndex.value = (lightboxIndex.value - 1 + proofShots.length) % proofShots.length; }
function lightboxNext() { lightboxIndex.value = (lightboxIndex.value + 1) % proofShots.length; }

const plans = [
	{ name: 'Solo', price: '49', desc: 'For the one-person shop doing serious work.', featured: false, features: ['1 team seat', 'Context-aware automation', 'All seven apps included', 'People CRM, projects & invoicing', 'Brand & goal grounding', 'Earnest Score & CardDesk', '5 client portal seats', '100K AI tokens/month'], cta: { label: 'Get started' } },
	{ name: 'Studio', price: '149', desc: 'For the team that means business.', featured: true, features: ['8 team seats', 'Everything in Solo', 'Team channels & video', 'Director mode & token management', 'Whitelabel & branded email', '15 client portal seats', '400K AI tokens/month', '$408/yr if billed annually'], cta: { label: 'Start free trial' } },
	{ name: 'Agency', price: '299', desc: 'For the business that has grown into something real.', featured: false, features: ['15 team seats', 'Everything in Studio', 'Unlimited client portal seats', 'Bank sync & expenses', 'Priority support + onboarding', '1M AI tokens/month', '$2,491/yr if billed annually'], cta: { label: 'Talk to us' } },
];

const navScrolled = ref(false);
function onScroll() { navScrolled.value = window.scrollY > 40; }

const eaRef = ref(null);
function openEarlyAccess() { eaRef.value?.open(); }

const { initMotion, revertMotion, dockRef, onDockMove, onDockLeave } = useGlassMotion();

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
	initMotion();
});
onUnmounted(() => { window.removeEventListener('scroll', onScroll); revertMotion(); });

useHead({
	title: 'Earnest — Context in. Accuracy out. | Automation',
	meta: [ { name: 'description', content: 'Earnest doesn’t oversell. It reads your goals, brand, audience and live data, then automates only when it’s genuinely right — drafting work that sounds like you and holding back when it isn’t sure. Confidence-scored, context-aware automation.' } ],
});
</script>
