<!--
  LandingVerbs — everything Earnest can do, by app.

  Each verb is a tool with a name in the app (`server/utils/llm/tools.ts`).
  Each one proposes a card; the person taps. The ones marked "held" reach a
  client or move money, so they wait for a tap no matter how Earnest is set
  up. The Never column sells the design decisions as what they are.

  Data: `verbGroups` in `~/data/landing-floors`.
-->
<script setup lang="ts">
import { verbGroups } from '~/data/landing-floors';
</script>

<template>
	<div class="l-verbs">
		<div v-for="g in verbGroups" :key="g.key" class="l-verbs-g g-glass" :class="{ 'l-verbs-g--never': g.key === 'never' }">
			<h3 class="l-verbs-h">
				<span><UIcon :name="g.icon" /> {{ g.label }}</span>
				<small>{{ g.note }}</small>
			</h3>
			<ul class="l-verbs-list">
				<li v-for="v in g.verbs" :key="v.t" :class="{ 'l-verbs-held': v.held }">
					<span>{{ v.t }}</span>
					<em v-if="v.held">held</em>
				</li>
			</ul>
		</div>
	</div>
	<p class="l-verbs-legend">
		<em>held</em> = reaches a client or touches money. It waits for your tap, always.
	</p>
</template>

<style scoped>
.l-verbs {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 14px;
}
@media (max-width: 900px) {
	.l-verbs {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}
@media (max-width: 600px) {
	.l-verbs {
		grid-template-columns: 1fr;
	}
}
.l-verbs-g {
	border-radius: 18px;
	padding: 16px 18px;
	display: grid;
	gap: 8px;
	align-content: start;
	min-width: 0;
	text-align: left;
}
.l-verbs-h {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 8px;
	margin: 0;
	font-size: 16px;
	font-weight: 600;
	color: var(--g-ink);
}
.l-verbs-h > span {
	display: inline-flex;
	align-items: center;
	gap: 7px;
}
.l-verbs-h :deep(svg),
.l-verbs-h [class*='iconify'] {
	width: 15px;
	height: 15px;
	color: var(--g-accent-ink);
}
.l-verbs-h small {
	font-size: 11.5px;
	font-weight: 500;
	color: var(--g-ink-3);
	text-align: right;
}
.l-verbs-list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	gap: 2px;
	font-size: 14.5px;
	color: var(--g-ink-2);
}
.l-verbs-list li {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 10px;
	padding: 5px 0;
	border-top: 1px solid var(--g-line);
}
.l-verbs-held {
	color: var(--g-ink);
}
.l-verbs-held em,
.l-verbs-legend em {
	font-style: normal;
	font-size: 10.5px;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--g-xp);
}
.l-verbs-g--never .l-verbs-list li {
	color: var(--g-ink-3);
}
.l-verbs-g--never .l-verbs-h :deep(svg),
.l-verbs-g--never .l-verbs-h [class*='iconify'] {
	color: var(--g-streak);
}
.l-verbs-legend {
	margin: 14px 0 0;
	font-size: 13px;
	color: var(--g-ink-3);
	text-align: left;
}
</style>
