import { ref } from 'vue';

/**
 * Shared motion engine for the liquid-glass marketing variants
 * (/director, /automation). Handles:
 *  · the hero intro timeline
 *  · scroll reveals ([data-anim] variants + [data-stagger] groups)
 *  · count-up numbers ([data-count])
 *  · progress fills — XP bars & meters ([data-fill])
 *  · the Earnest-Score ring ([data-ring])
 *  · parallax ([data-parallax])
 *  · macOS-style dock magnification (pointer only)
 * All GSAP work lives in a gsap.context so revertMotion() cleans up.
 */
export function useGlassMotion() {
  const dockRef = ref<HTMLElement | null>(null);
  let gsapCtx: any = null;
  let dockRaf = 0;

  // ── Dock magnification ──
  const DOCK_BASE = 52;
  const DOCK_MAX = 1.7;
  const DOCK_RANGE = 190;
  function magnify(el: HTMLElement | null, cursorX: number) {
    el?.querySelectorAll<HTMLElement>('.e-dock-item').forEach((item) => {
      const r = item.getBoundingClientRect();
      const dist = Math.abs(cursorX - (r.left + r.width / 2));
      const f = dist < DOCK_RANGE ? (Math.cos((dist / DOCK_RANGE) * Math.PI) + 1) / 2 : 0;
      const scale = 1 + (DOCK_MAX - 1) * f;
      item.style.width = `${DOCK_BASE * scale}px`;
      const chip = item.querySelector<HTMLElement>('.e-chip');
      const tip = item.querySelector<HTMLElement>('.e-dock-tip');
      if (chip) chip.style.transform = `scale(${scale})`;
      if (tip) tip.style.opacity = dist < DOCK_BASE / 2 ? '1' : '0';
    });
  }
  function resetDock(el: HTMLElement | null) {
    el?.querySelectorAll<HTMLElement>('.e-dock-item').forEach((item) => {
      item.style.width = '';
      const chip = item.querySelector<HTMLElement>('.e-chip');
      const tip = item.querySelector<HTMLElement>('.e-dock-tip');
      if (chip) chip.style.transform = '';
      if (tip) tip.style.opacity = '';
    });
  }
  function onDockMove(e: MouseEvent) {
    if (!dockRef.value || dockRaf) return;
    const x = e.clientX;
    dockRaf = requestAnimationFrame(() => { dockRaf = 0; magnify(dockRef.value, x); });
  }
  function onDockLeave() {
    if (dockRaf) { cancelAnimationFrame(dockRaf); dockRaf = 0; }
    resetDock(dockRef.value);
  }

  async function initMotion() {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const gsapMod = await import('gsap');
    const stMod = await import('gsap/ScrollTrigger');
    const gsap = gsapMod.gsap;
    const ScrollTrigger = stMod.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const fmtNum = (v: number, comma: boolean, dec: number) => {
      const n = dec ? v.toFixed(dec) : Math.round(v).toString();
      return comma ? Number(n).toLocaleString('en-US') : n;
    };

    gsapCtx = gsap.context(() => {
      // Hero intro
      const heroEls = gsap.utils.toArray<HTMLElement>('.e-hero .opacity-0');
      if (reduce) {
        gsap.set(heroEls, { opacity: 1 });
      } else {
        gsap.timeline({ delay: 0.12 })
          .fromTo('.e-hero .g-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .fromTo('.e-hero-wordmark', { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
          .fromTo('.e-hero-tagline', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.45')
          .fromTo('.e-hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35')
          .fromTo('.e-hero-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
          .fromTo('.e-hero-demos', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
          .fromTo('.e-hero .e-dock-item', { opacity: 0, y: 16, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.05 }, '-=0.2')
          .fromTo('.e-dock', { opacity: 0 }, { opacity: 1, duration: 0.01 }, '<')
          .fromTo('.e-hero-shot', { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.35');
      }

      // Scroll reveals — [data-anim] variants
      gsap.utils.toArray<HTMLElement>('[data-anim]').forEach((el) => {
        const t = el.dataset.anim;
        const from: any = { opacity: 0 };
        if (t === 'scale') { from.scale = 0.92; from.y = 22; }
        else if (t === 'left') { from.x = -44; }
        else if (t === 'right') { from.x = 44; }
        else { from.y = 32; }
        if (reduce) { gsap.set(el, { opacity: 1 }); return; }
        gsap.fromTo(el, from, {
          opacity: 1, x: 0, y: 0, scale: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // Staggered groups — [data-stagger] > *
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        const kids = Array.from(group.children);
        if (reduce) { gsap.set(kids, { opacity: 1 }); return; }
        gsap.fromTo(kids, { opacity: 0, y: 26, scale: 0.98 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        });
      });

      // Count-up numbers
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count || '0');
        const dec = parseInt(el.dataset.dec || '0', 10);
        const comma = el.dataset.comma === '1';
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const dur = parseFloat(el.dataset.dur || '1.4');
        if (reduce) { el.textContent = prefix + fmtNum(end, comma, dec) + suffix; return; }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: dur, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => { el.textContent = prefix + fmtNum(obj.v, comma, dec) + suffix; },
        });
      });

      // Progress fills — XP bars / meters (CSS transition animates width)
      gsap.utils.toArray<HTMLElement>('[data-fill]').forEach((el) => {
        const w = `${el.dataset.fill}%`;
        if (reduce) { el.style.width = w; return; }
        ScrollTrigger.create({ trigger: el, start: 'top 94%', once: true, onEnter: () => { el.style.width = w; } });
      });

      // Earnest-Score ring — animate stroke-dashoffset
      gsap.utils.toArray<HTMLElement>('[data-ring]').forEach((el) => {
        const pct = parseFloat(el.getAttribute('data-ring') || '0') / 100;
        const dash = parseFloat(el.getAttribute('stroke-dasharray') || '263.9');
        const target = dash * (1 - pct);
        if (reduce) { (el as any).style.strokeDashoffset = String(target); return; }
        gsap.fromTo(el, { strokeDashoffset: dash }, {
          strokeDashoffset: target, duration: 1.3, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 94%', once: true },
        });
      });

      // Small hero-pill ring (fixed 78%)
      gsap.utils.toArray<HTMLElement>('.g-float-ring-fill').forEach((el) => {
        const r = 16; const C = 2 * Math.PI * r;
        el.style.strokeDasharray = String(C);
        const target = C * (1 - 0.78);
        if (reduce) { el.style.strokeDashoffset = String(target); return; }
        gsap.fromTo(el, { strokeDashoffset: C }, { strokeDashoffset: target, duration: 1.5, delay: 0.6, ease: 'power2.out' });
      });

      // Parallax
      if (!reduce) {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || '0.15');
          gsap.to(el, {
            y: () => -(window.innerHeight * speed),
            ease: 'none',
            scrollTrigger: { trigger: el.closest('section, header') || el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          });
        });
      }
    });
  }

  function revertMotion() {
    if (dockRaf) cancelAnimationFrame(dockRaf);
    if (gsapCtx) gsapCtx.revert();
  }

  return { dockRef, onDockMove, onDockLeave, initMotion, revertMotion };
}
