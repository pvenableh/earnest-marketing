<script setup lang="ts">
/**
 * /meeting-follow-up — where guests land after a video call hosted in Earnest.
 *
 * The app sends them here itself (app/pages/meeting/[roomName].vue in the app
 * repo), after its "How was the call?" step; `?rated=1` means they rated it.
 * Signed-in people stay in the app and go to the recap instead.
 *
 * ⚠️ VOICE — same rules as app/data/landing.ts: no claim the app can't make
 * good on today. In particular, after a call Earnest DRAFTS: the recap needs
 * the call transcribed, action items become tasks or tickets on a tap, and a
 * follow-up email is a draft the host sends. Nothing reaches a client without
 * the host's tap. Never write that the pipeline moved, or that anything was
 * sent, on its own.
 */

const description =
  'You just left a call hosted in Earnest. Here is what happens to the hour you just spent — and why the host never has to type it up.';

useHead({
  title: 'After the call — Earnest',
  link: [{ rel: 'canonical', href: 'https://earnest.guru/meeting-follow-up' }],
});

useSeoMeta({
  title: 'After the call — Earnest',
  ogTitle: 'After the call — Earnest',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru/meeting-follow-up',
  ogSiteName: 'Earnest',
  twitterCard: 'summary_large_image',
  twitterTitle: 'After the call — Earnest',
  twitterDescription: description,
});

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const registerUrl = `${appUrl}/register`;
const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;

// The page is prerendered, so the query is read once it's in the browser.
const route = useRoute();
const rated = ref(false);
onMounted(() => {
  rated.value = route.query.rated === '1';
});

const afterTheCall = [
  {
    icon: 'i-lucide-file-text',
    title: 'A recap, from what was said.',
    desc: 'When the call is transcribed, Earnest writes the recap from the transcript, the notes taken during the call and the chat. The host reads it first.',
  },
  {
    icon: 'i-lucide-list-checks',
    title: 'Action items, one tap from real work.',
    desc: 'Each action item Earnest pulls out becomes a task or a ticket on the right project with a tap. Nobody copies them out of a doc.',
  },
  {
    icon: 'i-lucide-history',
    title: 'Logged on the relationship.',
    desc: 'The call lands on the client, project or lead it was about, next to the emails, calls and texts — so the next conversation starts where this one left off.',
  },
  {
    icon: 'i-lucide-hand',
    title: 'Nothing goes out on its own.',
    desc: 'Earnest can draft the follow-up email. It doesn’t send it. Nothing reaches a client and no money moves without the host’s tap.',
  },
];

const sellPoints = [
  {
    icon: 'i-lucide-map-pin',
    name: 'It knows where you’re standing.',
    desc: 'Earnest reads the screen you’re on — the client, the project, the invoice — drafts the next step, and waits for your tap.',
  },
  {
    icon: 'i-lucide-layers',
    name: 'Say it. Tap it. Done.',
    desc: 'Ask from any screen. Each thing Earnest does is a card you approve. Anything that reaches a client waits for you.',
  },
  {
    icon: 'i-lucide-blocks',
    name: 'Six apps, one memory.',
    desc: 'Clients, work, money, marketing and schedules are apps on one rail, not integrations. Calls live there too, so a recap sits next to the client’s invoices and the project’s tickets.',
  },
  {
    icon: 'i-lucide-users',
    name: 'Your clients, too.',
    desc: 'Switch it on and your clients get Earnest in their portal. It answers as your studio and sees only their side. Off by default.',
  },
  {
    icon: 'i-lucide-shield-check',
    name: 'Your data stays yours.',
    desc: 'Earnest runs on Anthropic’s Claude and starts from your organization, not a blank prompt. Your data is never used to train the model.',
  },
  {
    icon: 'i-lucide-badge-check',
    name: 'Every feature. Every plan.',
    desc: 'Solo $49/mo, Studio $149/mo, Agency $299/mo — per workspace, not per action. What you choose is scale.',
  },
];
</script>

<template>
  <div class="mfu">
    <SiteNav />

    <article class="mfu-article">
      <!-- Hero -->
      <header class="mfu-hero">
        <p v-if="rated" class="mfu-thanks">
          <UIcon name="i-lucide-star" class="mfu-thanks-ico" />
          Thanks for rating the call — it went to the team that hosted it.
        </p>
        <p class="mfu-kicker">After the call<span class="mfu-dot">.</span></p>
        <h1 class="mfu-title">
          One call<span class="mfu-dot">.</span>
          <br />
          Nothing to retype<span class="mfu-dot">.</span>
        </h1>
        <p class="mfu-desc">
          You just left a call hosted in <strong>Earnest</strong> — where your host runs their studio:
          clients, work, money and schedules in one place. Here’s what happens to the hour you just spent.
        </p>
      </header>

      <!-- What happens next, on the host's side -->
      <section class="mfu-auto">
        <h2 class="mfu-label">What happens next, on their side</h2>
        <div class="mfu-auto-grid">
          <div v-for="(item, i) in afterTheCall" :key="i" class="mfu-auto-card">
            <div class="mfu-auto-icon">
              <UIcon :name="item.icon" />
            </div>
            <div class="mfu-auto-text">
              <h3 class="mfu-auto-title">{{ item.title }}</h3>
              <p class="mfu-auto-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
        <p class="mfu-auto-foot">
          Nobody typed it up.
          <span class="mfu-foot-em">Earnest drafted it. A person said yes.</span>
        </p>
      </section>

      <!-- The line -->
      <section class="mfu-pull">
        <p class="mfu-pull-text">
          It drafts the next step<span class="mfu-dot">.</span>
          <br />
          <span class="mfu-pull-em">It waits for your tap<span class="mfu-dot">.</span></span>
        </p>
      </section>

      <!-- Sell points -->
      <section class="mfu-sell">
        <h2 class="mfu-label">It knows because they run the studio here</h2>
        <p class="mfu-sell-intro">
          A call is never just a call. It belongs to a client, a project, an invoice that goes out three weeks
          later. When all of that lives in one place, Earnest can draft the next step — because it already knows
          where you’re standing.
        </p>
        <div class="mfu-sell-grid">
          <div v-for="(point, i) in sellPoints" :key="i" class="mfu-sell-card">
            <div class="mfu-sell-icon">
              <UIcon :name="point.icon" />
            </div>
            <h3 class="mfu-sell-name">{{ point.name }}</h3>
            <p class="mfu-sell-desc">{{ point.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Try live CTA -->
      <section class="mfu-try-live">
        <div class="mfu-try-live-text">
          <h2 class="mfu-try-live-title">See it from the host’s seat.</h2>
          <p class="mfu-try-live-sub">The live demo runs on sample data. No sign-up.</p>
        </div>
        <a :href="soloDemoUrl" class="mfu-try-live-btn">
          <UIcon name="i-lucide-play-circle" class="mfu-try-live-ico" />
          <span>Try the live demo</span>
        </a>
      </section>

      <!-- Final CTA -->
      <section class="mfu-cta-block">
        <h2 class="mfu-cta-title">
          Start with the pile
          <br />
          that’s bothering you<span class="mfu-cta-dot">.</span>
        </h2>
        <p class="mfu-cta-hand">Do good work.</p>
        <p class="mfu-cta-sub">
          Set up takes a few minutes. Bring in one client, one project or one unpaid invoice, and Earnest starts
          drafting with you on day one.
        </p>
        <div class="mfu-cta-actions">
          <a :href="registerUrl" class="mfu-cta-btn-primary">Start free</a>
          <a :href="soloDemoUrl" class="mfu-cta-btn-ghost">Try the live demo</a>
        </div>
        <p class="mfu-cta-note">
          14-day trial, no card · Solo $49/mo · every feature on every plan · your data is never used to train the
          model
        </p>
      </section>
    </article>

    <SiteFooter />
  </div>
</template>

<style scoped>
.mfu {
  background: #fcfcfc;
  color: #0a0a0a;
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.mfu-article {
  max-width: 880px;
  margin: 0 auto;
  padding: 0 32px 60px;
}

/* ─── Hero ─────────────────────────────────────────────── */
.mfu-hero {
  padding: 120px 0 56px;
  text-align: center;
}
.mfu-kicker {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #00bfff;
  margin-bottom: 20px;
}
.mfu-title {
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  font-size: clamp(36px, 5.5vw, 60px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.02em;
}
.mfu-dot { color: #00bfff; }
.mfu-thanks {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 28px;
  background: rgba(0, 191, 255, 0.08);
  border: 1px solid rgba(0, 191, 255, 0.18);
  border-radius: 100px;
  font-size: 13px;
  color: #0a0a0a;
}
.mfu-thanks-ico { width: 14px; height: 14px; color: #00bfff; }
.mfu-desc {
  font-size: 18px;
  line-height: 1.65;
  color: #6b7280;
  margin: 28px auto 0;
  max-width: 640px;
}
.mfu-desc strong { color: #0a0a0a; font-weight: 600; }

/* ─── Section labels ───────────────────────────────────── */
.mfu-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #a1a1aa;
  margin-bottom: 18px;
  text-align: center;
}

/* ─── Auto-action cards ────────────────────────────────── */
.mfu-auto {
  padding: 48px 0 32px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.mfu-auto-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.mfu-auto-card {
  display: flex;
  gap: 14px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.mfu-auto-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 191, 255, 0.1);
  color: #00bfff;
  border-radius: 10px;
  font-size: 18px;
}
.mfu-auto-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0a0a0a;
}
.mfu-auto-desc {
  font-size: 13.5px;
  line-height: 1.55;
  color: #6b7280;
}
.mfu-auto-foot {
  text-align: center;
  margin-top: 28px;
  font-size: 14px;
  color: #6b7280;
}
.mfu-foot-em {
  color: #0a0a0a;
  font-weight: 600;
}

/* ─── Pull quote ───────────────────────────────────────── */
.mfu-pull {
  padding: 56px 24px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin: 32px 0;
}
.mfu-pull-text {
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #6b7280;
}
.mfu-pull-em { color: #0a0a0a; }

/* ─── Sell grid ────────────────────────────────────────── */
.mfu-sell {
  padding: 32px 0 40px;
}
.mfu-sell-intro {
  font-size: 16px;
  line-height: 1.65;
  color: #6b7280;
  text-align: center;
  max-width: 640px;
  margin: 0 auto 36px;
}
.mfu-sell-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}
.mfu-sell-card {
  padding: 22px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.mfu-sell-card:hover {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}
.mfu-sell-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  margin-bottom: 14px;
  font-size: 17px;
  color: #0a0a0a;
}
.mfu-sell-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #0a0a0a;
}
.mfu-sell-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #6b7280;
}

/* ─── Try live row ─────────────────────────────────────── */
.mfu-try-live {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 24px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 191, 255, 0.18);
  border-radius: 14px;
  margin: 24px 0 36px;
}
.mfu-try-live-title { font-size: 16px; font-weight: 600; color: #0a0a0a; }
.mfu-try-live-sub { font-size: 13px; color: #6b7280; margin-top: 4px; }
.mfu-try-live-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  background: #00bfff;
  color: white;
  font-size: 13px;
  font-weight: 600;
  border-radius: 100px;
  text-decoration: none;
  flex-shrink: 0;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.mfu-try-live-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 191, 255, 0.3);
}
.mfu-try-live-ico { width: 16px; height: 16px; }

/* ─── Final CTA ────────────────────────────────────────── */
.mfu-cta-block {
  text-align: center;
  padding: 56px 32px;
  background: #0a0a0a;
  color: white;
  border-radius: 20px;
  margin: 24px 0 56px;
}
.mfu-cta-title {
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  font-size: clamp(32px, 4.5vw, 48px);
  font-weight: 400;
  letter-spacing: -0.02em;
}
.mfu-cta-dot { color: #00bfff; }
.mfu-cta-hand {
  font-size: 15px;
  font-weight: 600;
  color: #00bfff;
  margin-top: 14px;
}
.mfu-cta-note {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.4);
  max-width: 520px;
  margin: 20px auto 0;
}
.mfu-cta-sub {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 10px;
}
.mfu-cta-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.mfu-cta-btn-primary {
  display: inline-block;
  padding: 13px 32px;
  background: white;
  color: #0a0a0a;
  font-weight: 600;
  font-size: 14px;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.mfu-cta-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
}
.mfu-cta-btn-ghost {
  display: inline-block;
  padding: 13px 28px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
  font-weight: 500;
  font-size: 14px;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.mfu-cta-btn-ghost:hover {
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.05);
}

/* ─── Responsive ───────────────────────────────────────── */
@media (max-width: 700px) {
  .mfu-article { padding: 0 20px 40px; }
  .mfu-hero { padding: 100px 0 40px; }
  .mfu-auto-grid { grid-template-columns: 1fr; }
  .mfu-pull { padding: 40px 16px; margin: 24px 0; }
  .mfu-try-live { flex-direction: column; align-items: stretch; text-align: center; }
  .mfu-try-live-btn { justify-content: center; }
  .mfu-cta-block { padding: 40px 24px; border-radius: 16px; }
  .mfu-cta-actions { flex-direction: column; }
  .mfu-cta-btn-primary,
  .mfu-cta-btn-ghost { width: 100%; }
}
</style>
