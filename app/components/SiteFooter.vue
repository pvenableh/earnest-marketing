<script setup lang="ts">
// The app's own public pages sign themselves with both wordmarks; the footer
// here is the pattern they follow, so it carries the two links a visitor who
// has scrolled this far is actually looking for — try it, or get back in.
//
// The maker line is Hue's own footer pattern, shared by every Hue site:
// "created by" with the Hue mark, then the copyright in tracked caps. Hue is
// the legal name; HUE STUDIOS is the Stripe statement descriptor, which is
// why the billing line spells it that way — it is the string a customer
// matches against their card statement.
const config = useRuntimeConfig();
const appUrl = (config.public.appUrl as string) || 'https://app.earnest.guru';
const demoUrl = `${appUrl}/try-demo?persona=solo`;
// ⚠️ `/auth/signin`, not `/login` — the app has no `/login` route.
const signInUrl = `${appUrl}/auth/signin`;
</script>

<template>
	<footer class="site-footer">
		<div class="site-footer-inner">
			<div class="site-footer-brand">
				<span class="site-footer-name">Earnest<span class="site-footer-dot">.</span></span>
				<span class="site-footer-tagline">Do good work.</span>
			</div>
			<div class="site-footer-links">
				<nuxt-link to="/features">Features</nuxt-link>
				<nuxt-link to="/blog">Blog</nuxt-link>
				<nuxt-link to="/privacy-policy">Privacy</nuxt-link>
				<nuxt-link to="/terms-of-service">Terms</nuxt-link>
				<nuxt-link to="/terms-of-service#refunds">Refunds</nuxt-link>
				<a :href="demoUrl">Live demo</a>
				<a :href="signInUrl">Sign in</a>
			</div>
			<p class="site-footer-maker">
				<a href="https://huestudios.com" target="_blank" rel="noopener">created by <LogoHue /></a>
			</p>
			<p class="site-footer-billing">
				Earnest is made and sold by Hue. Your subscription is billed by Hue and appears as
				<strong>HUE STUDIOS</strong> on your card statement.
			</p>
			<p class="site-footer-copy">&copy; {{ new Date().getFullYear() }} Hue</p>
		</div>
	</footer>
</template>

<style scoped>
.site-footer {
	border-top: 1px solid rgba(0, 0, 0, 0.06);
	padding: 48px 32px 56px;
}

.site-footer-inner {
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 16px;
}

.site-footer-brand {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
}

.site-footer-name {
	font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
	font-size: 18px;
	color: #0a0a0a;
	line-height: 1;
}

.site-footer-dot { color: #00bfff; }

.site-footer-tagline {
	font-family: 'Gaegu', cursive;
	font-size: 10px;
	color: #a1a1aa;
}

.site-footer-links {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 24px;
}

.site-footer-links a {
	font-size: 13px;
	color: #6b7280;
	text-decoration: none;
	transition: color 0.2s;
}

.site-footer-links a:hover {
	color: #0a0a0a;
}

.site-footer-maker {
	margin: 14px 0 0;
	letter-spacing: 0.2em;
}
.site-footer-maker a {
	display: inline-flex;
	align-items: baseline;
	gap: 6px;
	font-size: 10px;
	color: #6b7280;
	text-decoration: none;
}
.site-footer-maker a:hover :deep(.hue-logo path) {
	fill: rgb(255, 0, 92);
}

.site-footer-billing {
	margin: 0;
	max-width: 52ch;
	font-size: 11px;
	line-height: 1.5;
	letter-spacing: 0.06em;
	color: #6b7280;
}
.site-footer-billing strong {
	font-weight: 400;
	letter-spacing: 0.12em;
	color: #4b5563;
}

.site-footer-copy {
	margin: 0;
	font-size: 9px;
	letter-spacing: 0.3em;
	text-transform: uppercase;
	color: #a1a1aa;
}
</style>
