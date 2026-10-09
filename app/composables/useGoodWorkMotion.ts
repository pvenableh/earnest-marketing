/**
 * Motion for the homepage ("Do good work."), ported from the mockup's
 * `motion.js`: copy rising into view, the creed arriving one line per scroll
 * step, and ambient video that plays only while it is on screen. The
 * scroll-scrubbed app sequence is its own component (`GoodWork/Scrub.vue`).
 *
 * Everything respects prefers-reduced-motion: nothing slides, the creed is a
 * plain list, and videos never start (the still or the gradient under them
 * is the whole picture).
 *
 * No GSAP. `useGlassMotion` drives the archived landings; this page needs
 * three scroll handlers and an IntersectionObserver, and a hidden document
 * (a background tab, the Browser pane) must not freeze any of it at opacity
 * 0 — every state here is a class set from a position, so it is correct on
 * the first frame it is checked.
 */
export function useGoodWorkMotion(root: Ref<HTMLElement | null>) {
	const cleanups: (() => void)[] = [];

	function on<K extends keyof WindowEventMap>(ev: K, fn: (e: WindowEventMap[K]) => void) {
		window.addEventListener(ev, fn as EventListener, { passive: true });
		cleanups.push(() => window.removeEventListener(ev, fn as EventListener));
	}

	/** One rAF-throttled scroll + resize handler. */
	function onScroll(fn: () => void) {
		let raf = 0;
		const run = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				fn();
			});
		};
		on('scroll', run);
		on('resize', run);
		cleanups.push(() => cancelAnimationFrame(raf));
		fn();
	}

	function start() {
		const el = root.value;
		if (!el) return;
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		// The sticky creed and the hidden-until-revealed copy are styled under
		// `.gw--motion` only, so the server render, a visitor without JS and a
		// crawler all get the plain, fully visible page.
		if (reduce) return;
		el.classList.add('gw--motion');

		/* Reveal — position-based, so copy already above the viewport (a deep
		   link, a jump to #faq) is in, not stuck hidden. */
		let pending = [...el.querySelectorAll<HTMLElement>('[data-reveal]')];
		onScroll(() => {
			if (!pending.length) return;
			const lim = innerHeight * 0.92;
			pending = pending.filter((n) => {
				if (n.getBoundingClientRect().top < lim) {
					n.classList.add('in');
					return false;
				}
				return true;
			});
		});

		/* The creed — "Good work" holds while the lines arrive, one per scroll step. */
		el.querySelectorAll<HTMLElement>('.gw-creed').forEach((sec) => {
			const lis = [...sec.querySelectorAll<HTMLElement>('.gw-creed__lines li')];
			const n = lis.length;
			if (!n) return;
			onScroll(() => {
				const r = sec.getBoundingClientRect();
				const total = r.height - innerHeight;
				const p = total <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / total));
				const k = Math.min(n - 1, Math.floor(p * (n + 0.6)));
				lis.forEach((l, i) => {
					l.classList.toggle('seen', i < k);
					l.classList.toggle('on', i === k);
				});
				sec.classList.toggle('turn-on', lis[k]!.classList.contains('turn'));
				sec.classList.toggle('done', p > 0.9);
			});
		});

		/* Ambient video — fetched only near the viewport, played only in it,
		   faded in once it is actually playing. */
		const vids = [...el.querySelectorAll<HTMLVideoElement>('video[data-ambient]')];
		if (vids.length && 'IntersectionObserver' in window) {
			const io = new IntersectionObserver(
				(entries) => {
					for (const e of entries) {
						const v = e.target as HTMLVideoElement;
						if (e.isIntersecting) {
							if (v.preload === 'none') v.preload = 'auto';
							v.play().catch(() => {});
						} else v.pause();
					}
				},
				{ rootMargin: '200px 0px' },
			);
			vids.forEach((v) => {
				v.muted = true;
				v.addEventListener('playing', () => v.classList.add('on'), { once: true });
				io.observe(v);
			});
			cleanups.push(() => io.disconnect());
		}
	}

	function stop() {
		cleanups.splice(0).forEach((f) => f());
	}

	return { start, stop };
}
