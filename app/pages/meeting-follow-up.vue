<script setup lang="ts">
/**
 * Daily.co "redirect on exit" landing page.
 * Where guests land after leaving a video meeting hosted inside Earnest.
 * /meeting-follow-up
 */

const description = 'You just left a video meeting hosted inside Earnest — the AI-powered operating system that runs the business on the other side of that camera. Here\'s what was happening while you were talking.';

useHead({
  title: 'After the meeting — Earnest',
  link: [{ rel: 'canonical', href: 'https://earnest.guru/meeting-follow-up' }],
});

useSeoMeta({
  title: 'After the meeting — Earnest',
  ogTitle: 'After the meeting — Earnest',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru/meeting-follow-up',
  ogSiteName: 'Earnest',
  twitterCard: 'summary_large_image',
  twitterTitle: 'After the meeting — Earnest',
  twitterDescription: description,
});

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;

const autoActions = [
  {
    icon: 'i-lucide-file-text',
    title: 'The call was logged.',
    desc: 'Linked to the right contact and deal in the host\'s CRM — duration, attendees, recording, transcript, all attached.',
  },
  {
    icon: 'i-lucide-list-checks',
    title: 'Action items were drafted.',
    desc: 'Earnest read the transcript and drafted follow-up tasks, assigned to the right people, with sensible deadlines.',
  },
  {
    icon: 'i-lucide-trending-up',
    title: 'The pipeline moved.',
    desc: 'If this was a sales call, the deal advanced a stage automatically. The next touchpoint is already on the calendar.',
  },
  {
    icon: 'i-lucide-mail',
    title: 'A follow-up was prepared.',
    desc: 'A draft email is sitting in the host\'s inbox — written in their voice, referencing what you actually discussed.',
  },
];

const sellPoints = [
  {
    icon: 'i-lucide-sparkles',
    name: 'Contextual AI, everywhere.',
    desc: 'Every client, project, invoice, and lead has its own AI assistant. It already knows what you\'re looking at — no copy-paste, no re-explaining, no "let me give you the background."',
  },
  {
    icon: 'i-lucide-brain-circuit',
    name: 'A live map of the business.',
    desc: 'The Context Broker assembles a real-time snapshot of every project, client, deal, and brand decision — then feeds it to every AI call. The AI doesn\'t guess. It works there.',
  },
  {
    icon: 'i-lucide-blocks',
    name: 'One platform. Zero tab-juggling.',
    desc: 'Daily.co for video. Twilio for phone. Stripe for billing. Calendar, email, social, contracts, channels — all wired together. The host didn\'t open seven tabs to take this call.',
  },
  {
    icon: 'i-lucide-zap',
    name: 'Algorithmic, not just AI.',
    desc: 'A productivity engine scans tickets, projects, invoices, social, and goals — then surfaces what matters next. No tokens. No spinners. Just the right thing on top, every morning.',
  },
  {
    icon: 'i-lucide-link-2',
    name: 'Everything links to everything.',
    desc: 'A meeting touches a contact, which lives in a deal, which sits in a pipeline, which feeds a goal, which trains the AI. Your data isn\'t in silos. It\'s in conversation.',
  },
  {
    icon: 'i-lucide-shield-check',
    name: 'Your business, in one brain.',
    desc: 'Stop paying for nine tools that don\'t talk to each other. Earnest replaces the CRM, the project tool, the invoicing app, the marketing dashboard, and the AI assistant — and the integration is the point.',
  },
];
</script>

<template>
  <div class="mfu">
    <SiteNav />

    <article class="mfu-article">
      <!-- Hero -->
      <header class="mfu-hero">
        <p class="mfu-kicker">After the call<span class="mfu-dot">.</span></p>
        <h1 class="mfu-title">
          The meeting ended<span class="mfu-dot">.</span>
          <br />
          The work started itself<span class="mfu-dot">.</span>
        </h1>
        <p class="mfu-desc">
          You just left a video room hosted inside <strong>Earnest</strong> — the AI-powered
          operating system the person on the other side of that camera runs their business on.
          While you were talking, Earnest was working.
        </p>
      </header>

      <!-- What just happened, automatically -->
      <section class="mfu-auto">
        <h2 class="mfu-label">What's already happened</h2>
        <div class="mfu-auto-grid">
          <div v-for="(item, i) in autoActions" :key="i" class="mfu-auto-card">
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
          Nobody on the other side of that camera typed any of that.
          <span class="mfu-foot-em">Earnest did.</span>
        </p>
      </section>

      <!-- The quote / brand statement -->
      <section class="mfu-pull">
        <p class="mfu-pull-text">
          Most software watches you work<span class="mfu-dot">.</span>
          <br />
          <span class="mfu-pull-em">Earnest works alongside you<span class="mfu-dot">.</span></span>
        </p>
      </section>

      <!-- Sell points -->
      <section class="mfu-sell">
        <h2 class="mfu-label">Why the integration is the point</h2>
        <p class="mfu-sell-intro">
          A video call isn't really about video. It's about everything that happens around it —
          the relationship, the pipeline, the follow-up, the invoice that goes out three weeks later.
          When all of that lives in one system, AI stops being a chatbot and starts being a teammate.
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
          <h2 class="mfu-try-live-title">See it from the host's seat.</h2>
          <p class="mfu-try-live-sub">
            Open the public demo — real data, no signup, ~2&nbsp;minutes.
          </p>
        </div>
        <a :href="soloDemoUrl" class="mfu-try-live-btn">
          <UIcon name="i-lucide-play-circle" class="mfu-try-live-ico" />
          <span>Open the demo</span>
        </a>
      </section>

      <!-- Final CTA -->
      <section class="mfu-cta-block">
        <p class="mfu-cta-kicker">Run your business in one place.</p>
        <h2 class="mfu-cta-title">Do good work<span class="mfu-cta-dot">.</span></h2>
        <p class="mfu-cta-sub">
          Every feature included. No per-seat AI tax. No integration spaghetti.
        </p>
        <div class="mfu-cta-actions">
          <a :href="appUrl + '/register'" class="mfu-cta-btn-primary">Start free trial</a>
          <nuxt-link to="/features" class="mfu-cta-btn-ghost">Browse features</nuxt-link>
        </div>
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
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
  font-size: clamp(36px, 5.5vw, 60px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.02em;
}
.mfu-dot { color: #00bfff; }
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
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
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
.mfu-cta-kicker {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 14px;
}
.mfu-cta-title {
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
  font-size: clamp(32px, 4.5vw, 48px);
  font-weight: 400;
  letter-spacing: -0.02em;
}
.mfu-cta-dot { color: #00bfff; }
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
