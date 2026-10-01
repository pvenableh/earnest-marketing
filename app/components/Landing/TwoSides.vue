<!--
  LandingTwoSides — one invoice, two sides of the glass.

  The studio's Earnest and the client's, on the same invoice, each answering
  from only what its side can see. The "Sees" line under each is the point:
  the client's strikes through what it cannot reach.

  Data: `sides` in `~/data/landing-floors`. The reply is in the app's own
  shape: a bold line, facts with the number first, the ask.
-->
<script setup lang="ts">
import { sides } from '~/data/landing-floors';
</script>

<template>
	<div class="l-sides g-glass">
		<div v-for="s in sides" :key="s.who" class="l-side">
			<div class="l-side-who">
				<span>{{ s.who }}</span>
				<b>{{ s.org }}</b>
			</div>
			<span class="l-side-chip">
				<span class="l-side-chip-noun">{{ s.chip.noun }}</span>
				<span>{{ s.chip.label }}</span>
			</span>
			<div class="l-side-rec">
				<span>{{ s.rec.label }}<small>{{ s.rec.sub }}</small></span>
				<span class="l-side-v">{{ s.rec.v }}</span>
			</div>
			<span class="l-side-you">{{ s.you }}</span>
			<p class="l-side-lede">{{ s.lede }}</p>
			<ul class="l-side-facts">
				<li v-for="f in s.facts" :key="f.t" :class="{ 'l-side-bad': f.bad }">
					<b>{{ f.n }}</b><span>{{ f.t }}</span>
				</li>
			</ul>
			<p class="l-side-ask">{{ s.ask }}</p>
			<div class="l-side-acts">
				<span class="e-btn e-btn-primary l-side-btn">{{ s.acts[0] }}</span>
				<span class="e-btn e-btn-ghost l-side-btn">{{ s.acts[1] }}</span>
			</div>
			<p class="l-side-sees">
				<b>Sees:</b> {{ s.sees }}
				<template v-if="s.not.length">
					<span v-for="n in s.not" :key="n" class="l-side-not">{{ n }}</span>
				</template>
			</p>
		</div>
	</div>
</template>

<style scoped>
.l-sides {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	border-radius: 22px;
	overflow: hidden;
	text-align: left;
}
@media (max-width: 860px) {
	.l-sides {
		grid-template-columns: 1fr;
	}
}
.l-side {
	padding: 20px;
	display: grid;
	gap: 11px;
	align-content: start;
	min-width: 0;
}
.l-side + .l-side {
	border-left: 1px solid var(--g-line);
}
@media (max-width: 860px) {
	.l-side + .l-side {
		border-left: 0;
		border-top: 1px solid var(--g-line);
	}
}
.l-side-who {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 10px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--g-ink-3);
}
.l-side-who b {
	font-weight: 600;
	color: var(--g-ink);
	text-align: right;
}
.l-side-chip {
	display: inline-flex;
	justify-self: start;
	align-items: center;
	gap: 7px;
	padding: 4px 10px 4px 9px;
	border: 1px solid var(--g-line);
	border-radius: 999px;
	font-size: 12.5px;
	color: var(--g-ink);
	max-width: 100%;
}
.l-side-chip-noun {
	font-size: 10.5px;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: var(--g-accent-ink);
}
.l-side-rec {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 10px;
	align-items: center;
	padding: 9px 12px;
	border: 1px solid var(--g-line);
	border-radius: 14px;
	background: var(--g-accent-soft);
	font-size: 14px;
	color: var(--g-ink);
}
.l-side-rec small {
	display: block;
	font-size: 12px;
	color: var(--g-ink-3);
}
.l-side-v {
	font-size: 13px;
	color: var(--g-streak);
	white-space: nowrap;
	font-variant-numeric: tabular-nums;
}
.l-side-you {
	display: inline-block;
	justify-self: start;
	padding: 5px 11px;
	border-radius: 14px;
	background: var(--g-accent-soft);
	font-size: 13px;
	color: var(--g-ink-2);
}
.l-side-lede {
	margin: 0;
	font-size: 17px;
	font-weight: 600;
	color: var(--g-ink);
}
.l-side-facts {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	gap: 4px;
	font-size: 14.5px;
	color: var(--g-ink-2);
}
.l-side-facts li {
	display: grid;
	grid-template-columns: auto minmax(0, 1fr);
	gap: 10px;
	align-items: baseline;
}
.l-side-facts b {
	font-weight: 600;
	color: var(--g-ink);
	font-variant-numeric: tabular-nums;
}
.l-side-bad b {
	color: var(--g-streak);
}
.l-side-ask {
	margin: 0;
	font-size: 14.5px;
	color: var(--g-ink-2);
}
.l-side-acts {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
.l-side-btn {
	padding: 8px 14px;
	font-size: 13.5px;
	cursor: default;
}
.l-side-sees {
	margin: 4px 0 0;
	padding-top: 10px;
	border-top: 1px dashed var(--g-line);
	font-size: 12.5px;
	color: var(--g-ink-3);
}
.l-side-sees b {
	font-weight: 600;
	color: var(--g-ink-2);
}
.l-side-not {
	text-decoration: line-through;
	text-decoration-color: var(--g-accent);
	margin-left: 6px;
}
</style>
