<!--
  LandingWalk — a walk through the app, in the hero.

  The page's first claim is that Earnest knows the screen under you. A
  screenshot can show the chip; this shows it change. A rail, a floor strip,
  the floor's records, and the Earnest bar underneath: the chip, the sentence
  Earnest is told, and the three rows (Do · Decide · Know). Pick an app, a
  floor, a record, and the bar re-reads. It tours on its own until touched.

  ⚠️ Every sentence and row is the app's own string, from `~/data/landing-floors`
  — see the note there. The bar is coded rather than captured because the
  September screenshots predate the floor chip.

  The tour and the typing respect `prefers-reduced-motion`.
-->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { apps, tour, type Row } from '~/data/landing-floors';

const LANE: Record<Row['lane'], string> = { do: 'Do', decide: 'Decide', know: 'Know' };

const appKey = ref('money');
const floorKey = ref('invoices');
const recIdx = ref<number | null>(null);

const app = computed(() => apps.find((a) => a.key === appKey.value) ?? apps[0]!);
const floor = computed(() => app.value.floors.find((f) => f.key === floorKey.value) ?? app.value.floors[0]!);
const rec = computed(() => (recIdx.value == null ? null : floor.value.recs[recIdx.value] ?? null));
const open = computed(() => (rec.value?.rows ? rec.value : null));

const chip = computed(() =>
	open.value ? { noun: open.value.noun, label: open.value.label, fixed: false } : { noun: app.value.label, label: floor.value.label, fixed: true },
);
const focus = computed(() => (open.value ? `the ${open.value.noun} “${open.value.label}”` : floor.value.focus));
const rows = computed(() => open.value?.rows ?? floor.value.rows);
const where = computed(() => `${app.value.label} → ${floor.value.label}${open.value ? ' → ' + open.value.label : ''}`);

// Once the visitor touches the frame, the tour stops for good.
let touched = false;
let timer: ReturnType<typeof setTimeout> | null = null;
let step = 0;

function pickApp(k: string) {
	touched = true;
	appKey.value = k;
	floorKey.value = app.value.floors[0]!.key;
	recIdx.value = null;
}
function pickFloor(k: string) {
	touched = true;
	floorKey.value = k;
	recIdx.value = null;
}
function pickRec(i: number) {
	touched = true;
	const r = floor.value.recs[i];
	recIdx.value = recIdx.value === i || !r?.rows ? null : i;
}

function tick() {
	if (touched) return;
	const s = tour[step % tour.length]!;
	step++;
	if (s.app) appKey.value = s.app;
	if (s.floor) floorKey.value = s.floor;
	recIdx.value = s.rec;
	timer = setTimeout(tick, 3200);
}

onMounted(() => {
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
	if (!reduce) timer = setTimeout(tick, 3200);
});
onUnmounted(() => {
	if (timer) clearTimeout(timer);
});
</script>

<template>
	<div class="l-walk g-glass" aria-label="A walk through the app; the Earnest bar re-reads each floor and record">
		<div class="l-walk-top">
			<span class="l-walk-tag">The app</span>
			<span class="l-walk-where">{{ where }}</span>
		</div>

		<div class="l-walk-rail" role="tablist" aria-label="Apps">
			<button
				v-for="a in apps"
				:key="a.key"
				type="button"
				role="tab"
				class="l-walk-app g-press"
				:class="{ 'l-walk-app--on': a.key === app.key }"
				:aria-selected="a.key === app.key"
				@click="pickApp(a.key)"
			>
				<UIcon :name="a.icon" />
				<span>{{ a.label }}</span>
			</button>
		</div>

		<div class="l-walk-floors" role="tablist" aria-label="Floors">
			<button
				v-for="f in app.floors"
				:key="f.key"
				type="button"
				role="tab"
				class="l-walk-floor"
				:class="{ 'l-walk-floor--on': f.key === floor.key }"
				:aria-selected="f.key === floor.key"
				@click="pickFloor(f.key)"
			>
				{{ f.label }}
			</button>
		</div>

		<div class="l-walk-body">
			<div class="l-walk-head">
				<b>{{ app.label }}: {{ floor.label }}</b>
				<span>{{ floor.recs.length ? 'open a record' : 'nothing open' }}</span>
			</div>
			<template v-if="floor.recs.length">
				<button
					v-for="(x, i) in floor.recs"
					:key="x.label"
					type="button"
					class="l-walk-rec"
					:class="{ 'l-walk-rec--on': recIdx === i, 'l-walk-rec--still': !x.rows }"
					:aria-pressed="recIdx === i"
					@click="pickRec(i)"
				>
					<span>{{ x.label }}<small>{{ x.sub }}</small></span>
					<span class="l-walk-v" :class="{ 'l-walk-v--bad': x.bad }">{{ x.v }}</span>
				</button>
			</template>
			<p v-else class="l-walk-empty">{{ floor.focus.replace(/^the \w+ app, [^—]+— /, '') }}</p>
		</div>

		<div class="l-walk-bar">
			<div class="l-walk-chiprow">
				<span class="l-walk-chip">
					<span class="l-walk-chip-noun">{{ chip.noun }}</span>
					<span>{{ chip.label }}</span>
					<span v-if="!chip.fixed" class="l-walk-chip-x" aria-hidden="true">✕</span>
				</span>
				<span class="l-walk-told">Earnest is told: <i>{{ focus }}</i></span>
			</div>
			<div class="l-walk-lanes">
				<span v-for="x in rows" :key="x.t" class="l-walk-lane" :data-lane="x.lane">
					<span class="l-walk-lane-k">{{ LANE[x.lane] }}</span>
					<span>{{ x.t }}</span>
				</span>
				<span class="l-walk-lane l-walk-lane--more">More</span>
			</div>
			<div class="l-walk-input" aria-hidden="true">
				<span>Ask Earnest…</span>
				<span class="l-walk-send"><UIcon name="i-lucide-arrow-up" /></span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.l-walk {
	--l-surface: color-mix(in srgb, var(--g-ink) 5%, transparent);
	border-radius: 22px;
	overflow: hidden;
	min-width: 0;
	text-align: left;
	display: grid;
	grid-template-rows: auto auto auto 1fr auto;
}
.l-walk-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	padding: 12px 16px;
	border-bottom: 1px solid var(--g-line);
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--g-ink-3);
}
.l-walk-where {
	padding: 4px 10px;
	border: 1px solid var(--g-line);
	border-radius: 999px;
	font-weight: 500;
	letter-spacing: 0;
	text-transform: none;
	font-size: 12px;
	color: var(--g-ink-2);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	min-width: 0;
}
.l-walk-rail,
.l-walk-floors {
	display: flex;
	gap: 4px;
	padding: 10px 12px;
	border-bottom: 1px solid var(--g-line);
	overflow-x: auto;
	scrollbar-width: none;
}
.l-walk-rail::-webkit-scrollbar,
.l-walk-floors::-webkit-scrollbar {
	display: none;
}
.l-walk-app {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	font: inherit;
	font-size: 13px;
	font-weight: 500;
	padding: 7px 12px;
	border-radius: 999px;
	border: 1px solid transparent;
	background: transparent;
	color: var(--g-ink-2);
	cursor: pointer;
	white-space: nowrap;
	transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.l-walk-app :deep(svg),
.l-walk-app [class*='iconify'] {
	width: 14px;
	height: 14px;
}
.l-walk-app--on {
	background: var(--g-accent-soft);
	border-color: var(--g-accent-line);
	color: var(--g-ink);
}
.l-walk-floors {
	padding: 8px 12px;
}
.l-walk-floor {
	font: inherit;
	font-size: 12.5px;
	font-weight: 500;
	padding: 5px 10px;
	border: 0;
	background: transparent;
	color: var(--g-ink-3);
	cursor: pointer;
	white-space: nowrap;
	border-radius: 0;
}
.l-walk-floor--on {
	color: var(--g-accent-ink);
	box-shadow: inset 0 -2px 0 var(--g-accent);
}
.l-walk-body {
	padding: 12px;
	display: grid;
	gap: 6px;
	align-content: start;
	min-height: 168px;
}
.l-walk-head {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 10px;
	padding: 2px 4px 6px;
	font-size: 12px;
	color: var(--g-ink-3);
}
.l-walk-head b {
	font-weight: 600;
	font-size: 13px;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: var(--g-ink);
}
.l-walk-rec {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 10px;
	align-items: center;
	width: 100%;
	padding: 9px 12px;
	border: 1px solid var(--g-line);
	border-radius: 14px;
	background: transparent;
	font: inherit;
	font-size: 14px;
	color: var(--g-ink);
	text-align: left;
	cursor: pointer;
	transition: border-color 0.2s, background 0.2s;
}
.l-walk-rec:hover {
	border-color: var(--g-accent-line);
}
.l-walk-rec--still {
	cursor: default;
}
.l-walk-rec--on {
	border-color: var(--g-accent);
	background: var(--g-accent-soft);
}
.l-walk-rec small {
	display: block;
	font-size: 12px;
	color: var(--g-ink-3);
}
.l-walk-rec > span:first-child {
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.l-walk-v {
	font-size: 13px;
	color: var(--g-ink-2);
	font-variant-numeric: tabular-nums;
	white-space: nowrap;
}
.l-walk-v--bad {
	color: var(--g-streak);
}
.l-walk-empty {
	margin: 0;
	padding: 6px 4px;
	font-size: 13.5px;
	color: var(--g-ink-3);
}

/* The bar: chip row, lanes, composer. */
.l-walk-bar {
	display: grid;
	gap: 10px;
	padding: 12px;
	border-top: 1px solid var(--g-line);
	background: var(--g-accent-soft);
}
.l-walk-chiprow {
	display: flex;
	align-items: center;
	gap: 8px;
	flex-wrap: wrap;
	min-width: 0;
}
.l-walk-chip {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	padding: 4px 10px 4px 9px;
	border: 1px solid var(--g-line);
	border-radius: 999px;
	background: var(--l-surface);
	font-size: 12.5px;
	color: var(--g-ink);
	white-space: nowrap;
	max-width: 100%;
}
.l-walk-chip-noun {
	font-size: 10.5px;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: var(--g-accent-ink);
}
.l-walk-chip-x {
	font-size: 11px;
	color: var(--g-ink-3);
}
.l-walk-told {
	font-size: 12.5px;
	color: var(--g-ink-3);
	min-width: 0;
	flex: 1 1 160px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.l-walk-told i {
	font-style: normal;
	color: var(--g-ink-2);
}
.l-walk-lanes {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
.l-walk-lane {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 7px 12px 7px 9px;
	border: 1px solid var(--g-line);
	border-radius: 999px;
	background: var(--l-surface);
	font-size: 13px;
	font-weight: 500;
	color: var(--g-ink);
}
.l-walk-lane-k {
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: var(--g-accent-ink);
}
.l-walk-lane[data-lane='decide'] .l-walk-lane-k {
	color: var(--g-xp);
}
.l-walk-lane[data-lane='know'] .l-walk-lane-k {
	color: var(--g-ink-3);
}
.l-walk-lane--more {
	color: var(--g-ink-3);
	padding-inline: 10px;
}
.l-walk-input {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px 8px 8px 16px;
	border: 1px solid var(--g-line);
	border-radius: 999px;
	background: var(--l-surface);
	font-size: 14px;
	color: var(--g-ink-3);
}
.l-walk-send {
	margin-left: auto;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	display: grid;
	place-items: center;
	background: var(--g-accent);
	color: #fff;
	flex: none;
}
.l-walk-send :deep(svg),
.l-walk-send [class*='iconify'] {
	width: 14px;
	height: 14px;
}
</style>
