<template>
	<div ref="root" class="gw">
		<!-- ─── Nav ─── -->
		<nav class="gw-nav" aria-label="Site">
			<div class="gw-wrap">
				<nuxt-link to="/" class="gw-mark" aria-label="Earnest, home">Earnest<b>.</b></nuxt-link>
				<ul>
					<li><a href="#creed">The idea</a></li>
					<li><a href="#how">How</a></li>
					<li><a href="#pricing">Pricing</a></li>
					<li><a href="#faq">Questions</a></li>
				</ul>
				<div class="gw-nav__cta">
					<button type="button" class="gw-mode" aria-label="Switch between light and dark" @click="toggleMode">
						<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
						<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></svg>
					</button>
					<a class="gw-btn gw-btn--demo" :href="links.demo">Live demo</a>
					<a class="gw-btn gw-btn--primary" :href="links.register">Start free</a>
				</div>
			</div>
		</nav>

		<main>
			<!-- ─── Hero ─── -->
			<header class="gw-hero">
				<GoodWorkSlot name="hero" :photo="photos.hero" eager />
				<div class="gw-wrap">
					<h1>Do good work<span class="dot">.</span></h1>
					<p class="gw-hero__lede">Not more work. Not faster work.<br />Business software for people who <strong>mean it</strong>.</p>
					<div class="gw-actions">
						<a class="gw-btn gw-btn--primary" :href="links.register">Start free</a>
						<a class="gw-btn" :href="links.demo">Try the live demo</a>
					</div>
					<div class="gw-receipt"><small>This morning</small><b>5 waiting on a yes. 13 one tap each.</b></div>
					<!-- The plain "what is this" — Google's OAuth brand review reads the
					     homepage for it, and so does anyone who arrives cold. Keep it literal. -->
					<p class="gw-hero__what">
						Earnest is business software for agencies, firms, practices and shops: clients, projects, invoices,
						scheduling and marketing in one app, with an assistant that drafts the next step and waits for your tap.
					</p>
					<p class="gw-hero__fine">14-day trial, no card · Solo $49/mo · every feature on every plan · your data never trains the model</p>
				</div>
			</header>

			<!-- ─── The creed ─── -->
			<section id="creed" class="gw-creed" aria-label="The idea">
				<div class="gw-creed__sticky">
					<div class="gw-creed__stage">
						<p class="gw-creed__subject" aria-hidden="true">Good work</p>
						<ol class="gw-creed__lines">
							<li v-for="(l, i) in creed" :key="i"><span class="s">Good work</span> {{ l.rest }}<em v-if="l.em">{{ l.em }}</em>{{ l.after }}</li>
							<li class="turn">{{ creedTurn }}</li>
						</ol>
					</div>
				</div>
				<p class="gw-creed__k" aria-hidden="true">Keep scrolling</p>
			</section>

			<GoodWorkScrub v-if="appSequence" :frames="appSequence.frames" :count="appSequence.count" :pad="appSequence.pad" :captions="scrubCaptions" />

			<!-- ─── Know where you stand · Say the next move ─── -->
			<section
				v-for="(b, i) in beatsOpen"
				:id="b.id"
				:key="b.title[1]"
				class="gw-beat"
				:class="i % 2 ? 'gw-beat--flip' : 'gw-beat--tone'"
			>
				<div class="gw-beat__grid">
					<div class="gw-copy" data-reveal>
						<span class="gw-copy__n">{{ b.eyebrow }}</span>
						<h2>{{ b.title[0] }}<span class="pop">{{ b.title[1] }}</span>{{ b.title[2] }}</h2>
						<p class="gw-copy__sub">{{ b.sub }}</p>
						<p class="gw-copy__move"><b>{{ b.move.k }}</b>{{ b.move.text }}</p>
						<nuxt-link class="gw-copy__more" :to="b.more.to">{{ b.more.label }}</nuxt-link>
					</div>
					<GoodWorkColumn :column="b.column" data-reveal />
				</div>
			</section>

			<!-- ─── The client, across the table: two beats over one photograph ─── -->
			<section class="gw-over" aria-label="Hear the truth, sound like yourself">
				<div class="gw-over__bg"><GoodWorkSlot name="client" :photo="photos.client" /></div>
				<div class="gw-over__content">
					<div class="gw-over__lead" data-reveal>
						<p>The client, across the table.</p>
						<small>What they hear is what you’d say</small>
					</div>
					<div v-for="(b, i) in beatsOverPhoto" :key="b.title[1]" class="gw-beat" :class="{ 'gw-beat--flip': i % 2 }">
						<div class="gw-beat__grid">
							<div class="gw-copy" data-reveal>
								<span class="gw-copy__n">{{ b.eyebrow }}</span>
								<h2>{{ b.title[0] }}<span class="pop">{{ b.title[1] }}</span>{{ b.title[2] }}</h2>
								<p class="gw-copy__sub">{{ b.sub }}</p>
								<p class="gw-copy__move"><b>{{ b.move.k }}</b>{{ b.move.text }}</p>
								<nuxt-link class="gw-copy__more" :to="b.more.to">{{ b.more.label }}</nuxt-link>
							</div>
							<GoodWorkColumn :column="b.column" data-reveal />
						</div>
					</div>
				</div>
			</section>

			<!-- ─── Steady. ─── -->
			<section class="gw-wind" aria-label="Steady">
				<GoodWorkSlot name="field" :photo="photos.field" />
				<div data-reveal>
					<h2>Steady.</h2>
					<p>Not busy. Not loud. The whole business in hand, every day, and the calm that comes from knowing where it stands.</p>
					<small>That is what good work feels like</small>
				</div>
			</section>

			<!-- ─── Keep your word ─── -->
			<section class="gw-over gw-over--short" aria-label="Keep your word">
				<div class="gw-over__bg"><GoodWorkSlot name="keep" :photo="photos.keep" /></div>
				<div class="gw-over__content">
					<div class="gw-beat">
						<div class="gw-beat__grid">
							<div class="gw-copy" data-reveal>
								<span class="gw-copy__n">{{ kept.eyebrow }}</span>
								<h2>{{ kept.title[0] }}<span class="pop">{{ kept.title[1] }}</span>{{ kept.title[2] }}</h2>
								<p class="gw-copy__sub">{{ kept.sub }}</p>
								<p class="gw-copy__move"><b>{{ kept.move.k }}</b>{{ kept.move.text }}</p>
								<nuxt-link class="gw-copy__more" :to="kept.more.to">{{ kept.more.label }}</nuxt-link>
							</div>
							<ol class="gw-kept" aria-label="A signed contract becomes a project becomes an invoice">
								<li v-for="s in kept.steps" :key="s.k" class="gw-kept__step" data-reveal>
									<span class="k">{{ s.k }}</span><span class="t">{{ s.t }}</span><small>{{ s.s }}</small>
								</li>
							</ol>
						</div>
					</div>
				</div>
			</section>

			<!-- ─── What it never does · the machine ─── -->
			<div class="gw-wrap">
				<ul class="gw-never" aria-label="What it never does">
					<li v-for="n in never" :key="n">{{ n }}</li>
				</ul>
			</div>
			<section class="gw-machine gw-wrap" aria-label="What it runs on">
				<p>Runs on <strong>Anthropic’s Claude</strong>, on no-training terms.</p>
				<p>Reads your records to answer you, and <strong>stops and asks</strong> when they aren’t enough.</p>
				<p>Says so at <strong>80%</strong> of your AI budget. Checks every action landed.</p>
			</section>

			<!-- ─── Pricing ─── -->
			<section id="pricing" class="gw-sec">
				<div class="gw-wrap">
					<h2>Every feature. <span class="pop">Every plan.</span></h2>
					<div class="gw-ladder">
						<div class="gw-ladder__scroll">
							<table>
								<thead>
									<tr>
										<th scope="col"><span class="gw-sr">Plan</span></th>
										<th v-for="p in ladder" :key="p.key" scope="col" :class="{ feat: p.featured }">
											{{ p.name }}<span class="p">${{ p.price }}<small>/mo</small></span>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="row in compareRows" :key="row.label">
										<th scope="row">{{ row.label }}</th>
										<td v-for="p in ladder" :key="p.key" :class="{ feat: p.featured }">{{ row[p.key] }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<p class="gw-every">
						One price, your whole team, every feature on every plan. What you choose is <strong>scale</strong>. 14-day
						trial, no card. Annual saves two months.
					</p>
				</div>
			</section>

			<!-- ─── Questions ─── (the same list feeds the FAQPage JSON-LD in index.vue) -->
			<section id="faq" class="gw-sec gw-band">
				<div class="gw-wrap">
					<h2>Good questions, <span class="pop">straight answers</span>.</h2>
					<div class="gw-faq">
						<details v-for="(f, i) in homeFaqs" :key="f.q" :open="i === 0">
							<summary>{{ f.q }}</summary>
							<p v-html="f.a"></p>
							<nuxt-link v-if="f.more" class="gw-btn gw-btn--sm" :to="f.more.to">{{ f.more.label }}</nuxt-link>
						</details>
					</div>
				</div>
			</section>

			<!-- ─── The closing ─── -->
			<section class="gw-cta">
				<GoodWorkSlot name="close" :photo="photos.close" />
				<div class="gw-wrap">
					<p class="gw-cta__cmd">Mean it<span class="dot">.</span></p>
					<p class="gw-cta__tag">Do good work.</p>
					<p class="gw-mark">Earnest<b>.</b></p>
					<p class="gw-cta__sub">
						Start with the pile that’s bothering you. Bring in one client, one project or one unpaid invoice, and
						Earnest starts drafting with you on day one.
					</p>
					<div class="gw-actions">
						<a class="gw-btn gw-btn--primary" :href="links.register">Start free</a>
						<a class="gw-btn" :href="links.demo">Try the live demo</a>
					</div>
					<p class="gw-cta__fine">Questions first? <a href="mailto:hello@earnest.guru">hello@earnest.guru</a></p>
				</div>
			</section>
		</main>

		<!-- ─── Footer — Hue's own pattern ─── -->
		<footer class="gw-foot">
			<div class="gw-wrap">
				<nav aria-label="Footer">
					<nuxt-link to="/features">Features</nuxt-link>
					<nuxt-link to="/blog">Blog</nuxt-link>
					<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
					<nuxt-link to="/terms-of-service">Terms</nuxt-link>
					<nuxt-link to="/terms-of-service#refunds">Refunds</nuxt-link>
					<a :href="links.demo">Live demo</a>
					<a :href="links.signin">Sign in</a>
				</nav>
				<p class="gw-foot__maker">
					<a href="https://huestudios.com" target="_blank" rel="noopener">created by <LogoHue /></a>
				</p>
				<p class="gw-foot__billing">
					Earnest is made and sold by Hue. Your subscription is billed by Hue and appears as
					<strong>HUE STUDIOS</strong> on your card statement.
				</p>
				<p class="gw-foot__copy">&copy; {{ year }} Hue</p>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
/**
 * GoodWork/Home — the homepage, "Do good work." (October 2026).
 *
 * Ported from `mockups/2026-10-good-work/good-work.html`; the copy lives in
 * `data/good-work.ts` (its header has the claim map), the styles in
 * `assets/css/good-work.css`, the motion in `useGoodWorkMotion`. The page
 * replaced `SellSheetHome` (the September sell sheet, kept on branch
 * `sellsheet-2026-10-everywhere`) and sells the idea before the features:
 * a creed, five beats with one Earnest column each as the proof, pricing,
 * questions, the closing.
 *
 * One design that follows the system's light or dark — no Glass, Paper or
 * Clean. `data-gw-mode` on <html> is set before paint by index.vue's head
 * script; the button here overrides it and remembers the choice.
 */
import '~/assets/css/good-work.css';
import { plans, compareRows } from '~/data/landing';
import {
	appSequence,
	beatsOpen,
	beatsOverPhoto,
	creed,
	creedTurn,
	homeFaqs,
	kept,
	links,
	never,
	photos,
} from '~/data/good-work';
import { useGoodWorkMotion } from '~/composables/useGoodWorkMotion';

const year = new Date().getFullYear();

/** The capacity ladder: the plan names and prices from `plans`, the rows from `compareRows`. Keys never change; names do. */
const planKeys = ['solo', 'studio', 'agency'] as const;
const ladder = planKeys.map((key, i) => ({ key, name: plans[i]!.name, price: plans[i]!.price, featured: plans[i]!.featured }));

const scrubCaptions = [
	{ at: 0, title: 'Open it.', text: 'What’s waiting on you, and the number that’s wrong, come first.', where: 'Home' },
	{ at: 0.35, title: 'Go where the money is.', text: '$12,000 out, all of it past 90 days.', where: 'Money · Invoices' },
	{ at: 0.7, title: 'Ask.', text: 'In plain words, from the screen you’re on. It knows which invoice you mean.', where: 'The column' },
	{ at: 0.93, title: 'It answers from your records. You tap.', text: 'Nothing reaches a client or moves money without you.', where: 'The reply' },
];

/* Light or dark. The head script has already chosen; this only flips it,
   remembers the flip, and follows the system for anyone who never flipped. */
const MODE_KEY = 'earnest-mode';
function setMode(m: 'light' | 'dark') {
	document.documentElement.setAttribute('data-gw-mode', m);
}
function toggleMode() {
	const m = document.documentElement.getAttribute('data-gw-mode') === 'dark' ? 'light' : 'dark';
	setMode(m);
	try {
		localStorage.setItem(MODE_KEY, m);
	} catch {}
}
let mq: MediaQueryList | null = null;
function onSystem(e: MediaQueryListEvent) {
	let chosen: string | null = null;
	try {
		chosen = localStorage.getItem(MODE_KEY);
	} catch {}
	if (chosen !== 'light' && chosen !== 'dark') setMode(e.matches ? 'dark' : 'light');
}

/** A `#dark` / `#light` link followed from this page (no reload, so the head script does not run again). */
function onHash() {
	const h = location.hash.slice(1);
	if (h === 'dark' || h === 'light') setMode(h);
}

const root = ref<HTMLElement | null>(null);
const motion = useGoodWorkMotion(root);

onMounted(() => {
	mq = matchMedia('(prefers-color-scheme: dark)');
	mq.addEventListener('change', onSystem);
	addEventListener('hashchange', onHash);
	motion.start();
});
onBeforeUnmount(() => {
	mq?.removeEventListener('change', onSystem);
	removeEventListener('hashchange', onHash);
	motion.stop();
});
</script>
