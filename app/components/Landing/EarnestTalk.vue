<!--
  LandingEarnestTalk — one conversation with Earnest, drawn rather than
  photographed, and played rather than frozen.

  ⚠️ WHY A DRAWING. The page's central claim is that you can TALK to Earnest
  and that a reply is receipts → answer → one card, with the floor holding.
  A screenshot of a chat shows the end state of that and none of the order,
  and it is stuck in the look it was captured in — the moment a visitor puts
  the page in Paper, a Glass column is arguing against it. This is the
  column in markup, reading the page's tokens, playing the script in
  `talkScript` beat by beat: the ear pulses, the words land, the receipt line
  appears above the reply, the card lands under it, and Earnest says the one
  line it says when a card is on the floor.

  ⚠️ AND IT IS NOT A LIE. Every string is in `~/data/earnest` with the
  app-repo shape it copies and the demo-seed numbers it uses. Nothing here is
  allowed to say something the app would not; the script file is the place to
  change it, not this template.

  Reduced motion, and no JS, show the finished conversation at once.
-->
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { talkScript, type TalkBeat } from '~/data/earnest';

/** How many beats are on screen. Starts complete (SSR / reduced motion) and replays on mount. */
const shown = ref(talkScript.length);
const playing = ref(false);
const beats = computed(() => talkScript.slice(0, shown.value));
/** The listener's state — the ear pulses while a `listen` beat is the newest thing. */
const listening = computed(() => {
	const last = beats.value[beats.value.length - 1];
	return playing.value && last?.kind === 'listen';
});
/** The "typing" state — the reply is still being written. */
const thinking = computed(() => {
	const last = beats.value[beats.value.length - 1];
	return playing.value && (last?.kind === 'receipt' || (last?.kind === 'user' && !last.spoken));
});

const DELAY: Record<TalkBeat['kind'], number> = {
	listen: 900,
	user: 1400,
	receipt: 700,
	reply: 2600,
	card: 1700,
	spoken: 2800,
};

let timer: ReturnType<typeof setTimeout> | null = null;
let stopped = false;

function step() {
	if (stopped) return;
	if (shown.value >= talkScript.length) {
		playing.value = false;
		// Hold the finished frame, then run it again — a visitor arriving mid-way sees the whole thing once.
		timer = setTimeout(() => {
			if (stopped) return;
			shown.value = 0;
			playing.value = true;
			step();
		}, 6000);
		return;
	}
	const next = talkScript[shown.value]!;
	timer = setTimeout(() => {
		shown.value += 1;
		step();
	}, DELAY[next.kind]);
}

onMounted(() => {
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
	if (reduce) return;
	shown.value = 0;
	playing.value = true;
	step();
});
onBeforeUnmount(() => {
	stopped = true;
	if (timer) clearTimeout(timer);
});

/** The filtered list the visible beats render — `listen` shows only as the mic state. */
const rows = computed(() => beats.value.filter((b) => b.kind !== 'listen'));
</script>

<template>
	<div class="et" :class="{ 'et--live': playing }" aria-label="A conversation with Earnest, spoken">
		<!-- The column's header, as the app draws it: the mark, the scope chip, the gear. -->
		<div class="et-head">
			<span class="et-mark" aria-hidden="true">E.</span>
			<span class="et-scope"><UIcon name="i-lucide-banknote" /> Money</span>
			<span class="et-waiting">Waiting for you · 5</span>
			<UIcon name="i-lucide-settings-2" class="et-gear" aria-hidden="true" />
		</div>

		<!-- The thread. `aria-live` because the beats arrive in time, and a
		     visitor on a screen reader should hear the conversation, not silence. -->
		<div class="et-thread" aria-live="polite">
			<TransitionGroup name="et-beat">
				<template v-for="(b, i) in rows" :key="i">
					<div v-if="b.kind === 'user'" class="et-user">
						<span v-if="b.spoken" class="et-user-mic" aria-label="Spoken"><UIcon name="i-lucide-mic" /></span>
						<p>{{ b.text }}</p>
					</div>

					<p v-else-if="b.kind === 'receipt'" class="et-receipt">
						<UIcon name="i-lucide-check" class="et-receipt-ic" />{{ b.text }}
					</p>

					<div v-else-if="b.kind === 'reply'" class="et-reply">
						<p>{{ b.text }}</p>
						<span class="et-reply-tools" aria-hidden="true">
							<UIcon name="i-lucide-volume-2" /><UIcon name="i-lucide-bookmark" /><UIcon name="i-lucide-copy" />
						</span>
					</div>

					<div v-else-if="b.kind === 'card'" class="et-card g-glass-thin">
						<div class="et-card-head">
							<UIcon name="i-lucide-mail" class="et-card-ic" />
							<span class="et-card-title">{{ b.title }}</span>
							<span class="et-card-state">Waiting</span>
						</div>
						<p class="et-card-preview">{{ b.preview }}</p>
						<div class="et-card-actions">
							<span class="et-btn et-btn--primary">Approve</span>
							<span class="et-btn">Edit</span>
							<span class="et-btn et-btn--quiet">Skip</span>
							<span v-if="b.floor" class="et-floor"><UIcon name="i-lucide-hand" /> Your tap, always</span>
						</div>
					</div>

					<p v-else-if="b.kind === 'spoken'" class="et-spoken">
						<UIcon name="i-lucide-volume-2" class="et-spoken-ic" />
						<span>{{ b.text }}</span>
					</p>
				</template>
			</TransitionGroup>
			<p v-if="thinking" class="et-thinking" aria-hidden="true"><span></span><span></span><span></span></p>
		</div>

		<!-- The composer: apps, the box, the mic. The ear is Hands-free's own
		     indicator — it pulses while it is listening, and one click turns it off. -->
		<div class="et-composer">
			<span class="et-composer-apps" aria-hidden="true"><UIcon name="i-lucide-layout-grid" /></span>
			<span class="et-composer-input">{{ listening ? 'Listening…' : 'Ask Earnest, or say what to do…' }}</span>
			<span class="et-composer-attach" aria-hidden="true"><UIcon name="i-lucide-paperclip" /></span>
			<span class="et-composer-mic" :class="{ 'et-composer-mic--on': listening }" aria-hidden="true">
				<UIcon name="i-lucide-ear" />
			</span>
		</div>
	</div>
</template>

<style>
/* Global on purpose (the classes are all `et-` prefixed): the feature pages
   render this drawing too, and they do not load `sellsheet-home.css`. Tokens
   are the sell sheet's `--g-*`; a host without them supplies fallbacks. */
.et {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 640px;
	min-height: 560px;
	margin: 0 auto;
	text-align: left;
}
.et-head {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 0 6px 14px;
}
.et-mark {
	font-size: 15px;
	font-weight: 800;
	letter-spacing: -0.02em;
	color: var(--g-ink);
}
.et-scope {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 4px 10px 4px 8px;
	border-radius: 999px;
	background: var(--g-accent-soft);
	border: 1px solid var(--g-accent-line);
	color: var(--g-accent-ink);
	font-size: 12px;
	font-weight: 600;
}
.et-scope svg,
.et-scope [class*='iconify'] {
	width: 13px;
	height: 13px;
}
.et-waiting {
	margin-left: auto;
	font-size: 12px;
	font-weight: 600;
	color: var(--g-ink-3);
}
.et-gear {
	width: 16px;
	height: 16px;
	color: var(--g-ink-3);
}

.et-thread {
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	gap: 12px;
	padding: 4px 6px 16px;
}

/* The person's turn — right-aligned, with the mic glyph when it was spoken. */
.et-user {
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	gap: 8px;
	margin-left: 18%;
}
.et-user p {
	margin: 0;
	padding: 11px 15px;
	border-radius: 18px 18px 4px 18px;
	background: var(--g-accent);
	color: var(--g-on-accent);
	font-size: 15px;
	line-height: 1.45;
}
.et-user-mic {
	display: grid;
	place-items: center;
	width: 22px;
	height: 22px;
	flex: none;
	border-radius: 50%;
	background: var(--g-accent-soft);
	color: var(--g-accent-ink);
	order: -1;
}
.et-user-mic svg,
.et-user-mic [class*='iconify'] {
	width: 12px;
	height: 12px;
}

/* The receipts line: what it did before it said anything. */
.et-receipt {
	display: flex;
	align-items: center;
	gap: 6px;
	margin: 0;
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.01em;
	color: var(--g-ink-3);
}
.et-receipt-ic {
	width: 13px;
	height: 13px;
	color: var(--g-accent);
}

/* Earnest's turn — no bubble, the way the app draws it: the message is the frame. */
.et-reply {
	position: relative;
	margin-right: 8%;
	padding: 2px 0 0;
}
.et-reply p {
	margin: 0;
	font-size: 15.5px;
	line-height: 1.55;
	color: var(--g-ink);
}
.et-reply-tools {
	display: flex;
	gap: 12px;
	margin-top: 8px;
	color: var(--g-ink-3);
}
.et-reply-tools svg,
.et-reply-tools [class*='iconify'] {
	width: 14px;
	height: 14px;
}

/* The action card, pending: title, preview, Approve · Edit · Skip. */
.et-card {
	padding: 14px 16px;
	border-radius: 16px;
	margin-right: 8%;
}
.et-card-head {
	display: flex;
	align-items: center;
	gap: 9px;
}
.et-card-ic {
	width: 15px;
	height: 15px;
	color: var(--g-accent);
	flex: none;
}
.et-card-title {
	flex: 1 1 auto;
	min-width: 0;
	font-size: 14px;
	font-weight: 700;
	color: var(--g-ink);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.et-card-state {
	flex: none;
	padding: 3px 9px;
	border-radius: 999px;
	background: var(--g-accent-soft);
	border: 1px solid var(--g-accent-line);
	color: var(--g-accent-ink);
	font-size: 11px;
	font-weight: 700;
}
.et-card-preview {
	margin: 8px 0 0;
	font-size: 13px;
	line-height: 1.5;
	color: var(--g-ink-2);
}
.et-card-actions {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
	margin-top: 12px;
}
.et-btn {
	padding: 7px 14px;
	border-radius: 999px;
	border: 1px solid var(--g-line);
	font-size: 13px;
	font-weight: 600;
	color: var(--g-ink-2);
	white-space: nowrap;
}
.et-btn--primary {
	background: var(--g-accent);
	border-color: var(--g-accent);
	color: var(--g-on-accent);
}
.et-btn--quiet {
	border-color: transparent;
	color: var(--g-ink-3);
}
.et-floor {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	margin-left: auto;
	font-size: 12px;
	font-weight: 600;
	color: var(--g-ink-3);
}
.et-floor svg,
.et-floor [class*='iconify'] {
	width: 13px;
	height: 13px;
}

/* What Earnest says out loud when a card is on the floor. */
.et-spoken {
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 0;
	font-size: 14px;
	font-style: italic;
	color: var(--g-ink-2);
}
.et-spoken-ic {
	width: 15px;
	height: 15px;
	color: var(--g-accent);
	flex: none;
}

/* The three dots while a reply is being written. */
.et-thinking {
	display: flex;
	gap: 5px;
	margin: 0;
	padding: 4px 2px;
}
.et-thinking span {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: var(--g-ink-3);
	animation: et-dot 1.1s ease-in-out infinite;
}
.et-thinking span:nth-child(2) {
	animation-delay: 0.18s;
}
.et-thinking span:nth-child(3) {
	animation-delay: 0.36s;
}
@keyframes et-dot {
	0%,
	80%,
	100% {
		opacity: 0.3;
		transform: translateY(0);
	}
	40% {
		opacity: 1;
		transform: translateY(-3px);
	}
}

/* The composer: the one pill, apps at its head and the mic at its tail. */
.et-composer {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px 10px 8px 12px;
	border-radius: 999px;
	background: var(--g-accent-soft);
	border: 1px solid var(--g-line);
}
.et-composer-apps,
.et-composer-attach,
.et-composer-mic {
	display: grid;
	place-items: center;
	width: 32px;
	height: 32px;
	flex: none;
	border-radius: 50%;
	color: var(--g-ink-3);
}
.et-composer-apps svg,
.et-composer-apps [class*='iconify'],
.et-composer-attach svg,
.et-composer-attach [class*='iconify'],
.et-composer-mic svg,
.et-composer-mic [class*='iconify'] {
	width: 16px;
	height: 16px;
}
.et-composer-input {
	flex: 1 1 auto;
	min-width: 0;
	font-size: 14px;
	color: var(--g-ink-3);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.et-composer-mic--on {
	color: var(--g-on-accent);
	background: var(--g-accent);
	animation: et-pulse 1.4s ease-out infinite;
}
@keyframes et-pulse {
	0% {
		box-shadow: 0 0 0 0 var(--g-accent-line);
	}
	100% {
		box-shadow: 0 0 0 12px transparent;
	}
}

.et-beat-enter-active {
	transition: opacity 0.35s ease, transform 0.45s var(--spring);
}
.et-beat-enter-from {
	opacity: 0;
	transform: translateY(10px);
}
.et-beat-leave-active {
	transition: opacity 0.2s ease;
	position: absolute;
}
.et-beat-leave-to {
	opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
	.et-beat-enter-active,
	.et-beat-leave-active {
		transition: none;
	}
	.et-beat-enter-from {
		transform: none;
	}
	.et-thinking span,
	.et-composer-mic--on {
		animation: none;
	}
}
@media (max-width: 560px) {
	.et {
		min-height: 520px;
	}
	.et-user {
		margin-left: 8%;
	}
	.et-reply,
	.et-card {
		margin-right: 0;
	}
	.et-waiting {
		display: none;
	}
}
</style>
