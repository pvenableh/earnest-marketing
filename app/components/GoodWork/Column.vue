<!--
  GoodWork/Column — Earnest as it ships since the rethink (the app's
  `Earnest/Column.vue`, October 2026): a 360px column, the thread above,
  Do · Decide · Know chips, and the composer at its foot with the scope chip
  inside it. Every callout on the homepage is one of these, never the old bar.

  It is a picture of the column, not a working one: nothing here is a
  button, so nothing pretends to be. Styles live in good-work.css (.gw-col).
-->
<template>
	<div class="gw-col" role="figure" :aria-label="column.label">
		<div class="gw-col__head" aria-hidden="true">
			<span class="gw-col__brand">Earnest<b>.</b></span>
			<span class="gw-col__tools">
				<span class="gw-col__wait">Waiting <b>{{ waiting }}</b></span>
				<span class="gw-col__ic">⟲</span>
				<span class="gw-col__ic">›</span>
			</span>
		</div>
		<div class="gw-col__thread">
			<div v-if="column.you" class="gw-col__you">{{ column.you }}</div>
			<div class="gw-col__reply">
				<p class="gw-col__lede">{{ column.lede }}</p>
				<ul v-if="column.facts?.length">
					<li v-for="f in column.facts" :key="f.t" :class="{ bad: f.bad }"><b>{{ f.v }}</b> — {{ f.t }}</li>
				</ul>
				<p v-if="column.prose" class="gw-col__prose" v-html="column.prose"></p>
				<p v-if="column.hedge" class="gw-col__hedge">{{ column.hedge }}</p>
				<p v-if="column.ask" class="gw-col__ask">{{ column.ask }}</p>
				<div v-if="column.card" class="gw-col__card">
					<div class="gw-col__kind">
						<b>{{ column.card.kind }}</b>
						<i v-if="column.card.held">held · your tap</i>
						<span v-else-if="column.card.meta">{{ column.card.meta }}</span>
					</div>
					<p class="gw-col__t">{{ column.card.title }}</p>
					<dl v-if="column.card.rows?.length">
						<template v-for="[k, v] in column.card.rows" :key="k">
							<dt>{{ k }}</dt>
							<dd>{{ v }}</dd>
						</template>
					</dl>
					<div class="gw-col__acts">
						<span v-for="(a, i) in column.card.acts" :key="a" :class="{ go: i === 0 }">{{ a }}</span>
						<small v-if="column.card.note">{{ column.card.note }}</small>
					</div>
				</div>
				<div v-if="column.say" class="gw-col__say"><span class="sp">Say</span>{{ column.say }}</div>
			</div>
		</div>
		<div class="gw-col__chips">
			<span v-for="c in column.chips" :key="c.text" class="gw-col__chip" :data-lane="c.lane"><span class="k">{{ c.lane }}</span>{{ c.text }}</span>
		</div>
		<div class="gw-col__composer">
			<span v-if="column.scope" class="gw-col__scope">
				<span class="cross" aria-hidden="true">⌖</span><span class="noun">{{ column.scope.noun }}</span>{{ column.scope.name }}<span class="x" aria-hidden="true">×</span>
			</span>
			<div class="gw-col__row">
				<span class="ph">Ask Earnest</span>
				<span class="ic" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
				</span>
				<span class="ic send" aria-hidden="true">↑</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { columnWaiting, type Column } from '~/data/good-work';

withDefaults(defineProps<{ column: Column; waiting?: number }>(), { waiting: columnWaiting });
</script>
