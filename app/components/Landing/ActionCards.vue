<!--
  LandingActionCards — the action card in its four states, drawn.

  The one component the app approves anything with (`AI/ActionCard.vue`) has
  four states, decided in `app/utils/ai-action-card.ts`:
    pending  — title, the payload preview, Approve · Edit · Skip
    done     — the record, and Undo when the ledger says it can be reversed
    undone   — the record, marked
    skipped  — the record, marked (an auto-expired skip reads "Expired")
  The July capture this replaced showed the retired Focus takeover, which is
  exactly the kind of stale receipt the page is not allowed to carry. Rows
  reuse the Home mock's card styles (`.hm-card*` in sellsheet-home.css);
  strings are the demo seed's (`~/data/earnest`).
-->
<script setup lang="ts">
const cards = [
	{
		state: 'pending',
		label: 'Waiting',
		title: 'Reschedule Helios West Hotel Launch by 5 days',
		meta: 'Reschedule · 4 events and 6 tasks move with it · proposed by Earnest',
		actions: ['Approve', 'Edit', 'Skip'],
	},
	{
		state: 'done',
		label: 'Done',
		title: 'Filed INV-SOL-HEL-2026-0054 to Helios — Website Build',
		meta: 'Done · ran on its own · 2h ago',
		actions: ['Undo'],
	},
	{
		state: 'undone',
		label: 'Undone',
		title: 'Set “Responsive build” to In Progress',
		meta: 'Undone · the previous value put back · 1d ago',
		actions: [],
	},
	{
		state: 'skipped',
		label: 'Skipped',
		title: 'Payment reminder · INV-SOL-HEL-2026-0052',
		meta: 'Skipped · never sent · 3d ago',
		actions: [],
	},
];
</script>

<template>
	<div class="ac">
		<div v-for="c in cards" :key="c.state" class="hm-card g-glass-thin" :class="`ac-card--${c.state}`">
			<span class="hm-card-dot" :class="{ 'hm-card-dot--done': c.state !== 'pending' }" aria-hidden="true">
				<UIcon v-if="c.state === 'done'" name="i-lucide-check" />
				<UIcon v-else-if="c.state === 'undone'" name="i-lucide-undo-2" />
				<UIcon v-else-if="c.state === 'skipped'" name="i-lucide-minus" />
			</span>
			<div class="hm-card-body">
				<p class="hm-card-title">{{ c.title }}</p>
				<p class="hm-card-meta">{{ c.meta }}</p>
			</div>
			<span v-if="!c.actions.length" class="ac-state">{{ c.label }}</span>
			<span
				v-for="a in c.actions"
				:key="a"
				class="hm-card-btn"
				:class="{ 'hm-card-btn--primary': a === 'Approve', 'hm-card-btn--quiet': a === 'Skip' || a === 'Undo' }"
			>
				<UIcon v-if="a === 'Undo'" name="i-lucide-undo-2" />{{ a }}
			</span>
		</div>
		<p class="ac-foot">One component, four states. Approving here and approving in Waiting for you are the same call.</p>
	</div>
</template>

<style scoped>
.ac {
	display: grid;
	gap: 10px;
	width: 100%;
	max-width: 560px;
	margin: 0 auto;
	text-align: left;
}
.ac-card--undone,
.ac-card--skipped {
	opacity: 0.72;
}
.ac-state {
	flex: none;
	padding: 4px 10px;
	border-radius: 999px;
	border: 1px solid var(--g-line);
	font-size: 11.5px;
	font-weight: 700;
	color: var(--g-ink-3);
}
.ac-foot {
	margin: 6px 0 0 4px;
	font-size: 12.5px;
	line-height: 1.5;
	color: var(--g-ink-3);
}
</style>
