<!--
  GoodWork/Column — Earnest as it ships since the rethink (the app's
  `Earnest/Column.vue`, October 2026): a 360px column, the thread above,
  Do · Decide · Know chips, and the composer at its foot with the scope chip
  inside it. Every callout on the homepage is one of these, never the old bar.

  It is a picture of the column, not a working one: nothing here is a
  button, so nothing pretends to be. Styles live in good-work.css (.gw-col).

  With a `frame` (GoodWork/Montage.vue) it is drawn mid-motion: the ask
  typing or being heard, the reply arriving part by part, the tap. Without
  one it is drawn whole.
-->
<template>
	<div class="gw-col" :class="{ 'gw-col--frame': frame }" role="figure" :aria-label="column.label">
		<div class="gw-col__head" aria-hidden="true">
			<span class="gw-col__brand">Earnest<b>.</b></span>
			<span class="gw-col__tools">
				<span class="gw-col__wait">Waiting <b>{{ waiting }}</b></span>
				<span class="gw-col__ic">⟲</span>
				<span class="gw-col__ic">›</span>
			</span>
		</div>
		<div class="gw-col__thread">
			<div v-if="column.you" class="gw-col__you" :class="[at(!frame || frame.ask > 0), { caret: frame && frame.ask > 0 && frame.ask < 1, voice: column.heard }]">
				<svg v-if="column.heard" class="mic" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>{{ part(column.you, frame?.ask) }}
			</div>
			<div class="gw-col__reply">
				<p class="gw-col__lede" :class="at(frame?.lede)">{{ column.lede }}</p>
				<ul v-if="column.facts?.length">
					<li v-for="(f, i) in column.facts" :key="f.t" :class="[at((frame?.facts ?? 0) > i), { bad: f.bad }]"><b>{{ f.v }}</b> — {{ f.t }}</li>
				</ul>
				<p v-if="column.prose" class="gw-col__prose" :class="at(frame?.lede)" v-html="column.prose"></p>
				<p v-if="column.hedge" class="gw-col__hedge" :class="at(frame?.lede)">{{ column.hedge }}</p>
				<p v-if="column.ask" class="gw-col__ask" :class="at(frame?.lede)">{{ column.ask }}</p>
				<div v-if="column.card" class="gw-col__card" :class="at(frame?.card)">
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
						<span
							v-for="(a, i) in column.card.acts"
							:key="a"
							:class="{ go: i === 0, press: i === 0 && frame?.tap === 'press', done: i === 0 && frame?.tap === 'done' }"
						>{{ i === 0 && frame?.tap === 'done' ? (column.card.done ?? '✓ Approved') : a }}</span>
						<small v-if="column.card.note">{{ column.card.note }}</small>
					</div>
				</div>
				<div v-if="column.say" class="gw-col__say" :class="at(!frame || frame.say > 0)"><span class="sp">Say</span>{{ part(column.say, frame?.say) }}</div>
			</div>
		</div>
		<div class="gw-col__chips">
			<span v-for="c in column.chips" :key="c.text" class="gw-col__chip" :data-lane="c.lane"><span class="k">{{ c.lane }}</span>{{ c.text }}</span>
		</div>
		<div class="gw-col__composer">
			<span v-if="column.scope" class="gw-col__scope">
				<span class="cross" aria-hidden="true">⌖</span><span class="noun">{{ column.scope.noun }}</span>{{ column.scope.name }}<span class="x" aria-hidden="true">×</span>
			</span>
			<div class="gw-col__row" :class="{ live: listening }">
				<span v-if="listening" class="heard"><span class="rec" aria-hidden="true"></span>{{ part(column.heard ?? '', frame?.listening ?? 0) }}</span>
				<span v-else class="ph">Ask Earnest</span>
				<span class="ic" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
				</span>
				<span class="ic send" aria-hidden="true">↑</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { columnWaiting, type Column, type ColumnFrame } from '~/data/good-work';

const props = withDefaults(defineProps<{ column: Column; waiting?: number; frame?: ColumnFrame }>(), {
	waiting: columnWaiting,
	frame: undefined,
});

const listening = computed(() => props.frame?.listening != null);

/** In a frame, a part is hidden until it arrives; drawn whole, it is just there. */
function at(shown: boolean | undefined) {
	return props.frame ? ['gw-at', { in: !!shown }] : undefined;
}
/** The first `p` (0–1) of a line, for typing and for speech; all of it when drawn whole. */
function part(text: string, p: number | undefined) {
	return p == null ? text : text.slice(0, Math.round(text.length * p));
}
</script>
