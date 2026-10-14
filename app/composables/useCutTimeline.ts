/**
 * The cut timeline — one column played as a cut, the campaign's rhythm
 * (mockups/2026-10-move-fast/move-fast.html, "Rules for anything that
 * moves"). Shared by everything on the homepage that plays a cut: the
 * montage (GoodWork/Montage.vue, scroll sets the clock), the beat columns
 * (GoodWork/Cut.vue) and the hero loop (GoodWork/HeroLoop.vue), which run
 * on a real clock.
 *
 * A cut is a plan of local times (ms) built from a Column: the ask types or
 * is heard, the reply arrives part by part, the card, the spoken line, the
 * tap, the ✓. The frame is a pure function of the local time `lt` — except
 * the tap. Once `lt` reaches it, the tap plays 400ms on a real clock, however
 * `lt` is moving. Earnest's half is sped up; yours never is.
 */
import type { Column, ColumnFrame } from '~/data/good-work';

/** 120 bpm. */
export const BEAT = 500;
/** The tap, at real speed. */
export const HOLD = 400;

export interface CutPlan {
	/** Keys the tap: a new id is a new cut. */
	id: string;
	column: Column;
	dur: number;
	listen?: [number, number];
	ask: [number, number];
	lede: number;
	facts: number[];
	card: number;
	say: [number, number];
	tap: number | null;
	stamp: number;
}

export type TapState = 'idle' | 'press' | 'done';

/** A cut is four beats, a voice cut six: the spoken line needs time to be heard. */
export function planCut(id: string, col: Column): CutPlan {
	const voice = !!col.heard;
	const lede = voice ? 1200 : 620;
	const facts = (col.facts ?? []).map((_, i) => lede + 140 + i * 100);
	const card = col.card ? (facts.length ? facts[facts.length - 1]! + 120 : lede + 120) : Infinity;
	const tap = col.card ? (voice ? 2250 : 1050) : null;
	return {
		id,
		column: col,
		dur: voice ? 3000 : 2000,
		listen: voice ? [100, 1000] : undefined,
		ask: voice ? [1050, 1050] : [120, 520],
		lede,
		facts,
		card,
		say: col.say ? (voice ? [1500, 2150] : [card + 160, card + 160]) : [Infinity, Infinity],
		tap,
		stamp: tap == null ? 1350 : tap + HOLD + 100,
	};
}

const clamp = (v: number) => Math.max(0, Math.min(1, v));

/** The column at local time `l`. */
export function frameAt(p: CutPlan, l: number, tap: TapState): ColumnFrame {
	const span = (r: [number, number]) => (l < r[0] ? 0 : r[1] <= r[0] ? 1 : clamp((l - r[0]) / (r[1] - r[0])));
	return {
		ask: span(p.ask),
		listening: p.listen && l >= p.listen[0] && l < p.listen[1] ? clamp((l - 250) / (900 - 250)) : null,
		lede: l >= p.lede,
		facts: p.facts.filter((f) => l >= f).length,
		card: l >= p.card,
		say: span(p.say),
		tap,
	};
}

/**
 * A plan and its local time in; the frame, the tap and the ✓ out. Whoever
 * holds `lt` decides how time moves (scroll, a clock); the tap does not ask.
 */
export function useCutTimeline(plan: Ref<CutPlan | null>, lt: Ref<number>) {
	const tapState = ref<TapState>('idle');
	const tapping = computed(() => tapState.value === 'press');
	let tapFor: string | null = null;
	let tapTimer: ReturnType<typeof setTimeout> | undefined;

	/* The tap: started by `lt`, played by the clock. */
	watch([plan, lt], ([p, l]) => {
		const at = p?.tap;
		if (!p || at == null || l < at) {
			clearTimeout(tapTimer);
			tapFor = null;
			tapState.value = 'idle';
			return;
		}
		if (tapFor === p.id) return;
		tapFor = p.id;
		tapState.value = 'press';
		tapTimer = setTimeout(() => (tapState.value = 'done'), HOLD);
	});

	const frame = computed<ColumnFrame | undefined>(() => (plan.value ? frameAt(plan.value, lt.value, tapState.value) : undefined));
	const stampIn = computed(() => {
		const p = plan.value;
		return !!p && lt.value >= p.stamp && (p.tap == null || tapState.value === 'done');
	});

	/** Land the tap now (a hidden tab, where the clock can't be trusted to finish it). */
	function landTap() {
		const p = plan.value;
		if (!p || p.tap == null) return;
		clearTimeout(tapTimer);
		tapFor = p.id;
		tapState.value = 'done';
	}

	onBeforeUnmount(() => clearTimeout(tapTimer));

	return { tapState, tapping, frame, stampIn, landTap };
}

/**
 * A real clock for a cut: `lt` advances with the frame while it plays. It
 * holds where it is when paused.
 */
export function useCutClock() {
	const lt = ref(0);
	const playing = ref(false);
	let raf = 0;
	let last = 0;
	function step(now: number) {
		lt.value += Math.max(0, now - last);
		last = now;
		raf = requestAnimationFrame(step);
	}
	function play() {
		if (playing.value) return;
		playing.value = true;
		last = performance.now();
		raf = requestAnimationFrame(step);
	}
	function pause() {
		playing.value = false;
		cancelAnimationFrame(raf);
	}
	onBeforeUnmount(pause);
	return { lt, playing, play, pause };
}
