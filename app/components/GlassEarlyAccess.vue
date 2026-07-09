<template>
	<Dialog :open="show" @update:open="(v) => { show = v; if (!v) reset(); }">
		<DialogContent class="e-ea-dialog">
			<template v-if="!success">
				<DialogHeader>
					<span class="e-ea-eyebrow"><span class="e-spark"></span> Early access</span>
					<DialogTitle class="e-ea-title">{{ stepMeta.title }}<span class="e-dot">.</span></DialogTitle>
					<DialogDescription class="e-ea-desc">{{ stepMeta.desc }}</DialogDescription>
				</DialogHeader>

				<div class="e-ea-progress" aria-hidden="true">
					<span v-for="n in 3" :key="n" class="e-ea-progress-seg" :class="{ on: n <= step }"></span>
				</div>

				<form class="e-ea-form" @submit.prevent="step < 3 ? next() : submit()">
					<input v-model="honeypot" type="text" tabindex="-1" autocomplete="off" class="e-ea-hp" aria-hidden="true" />

					<div v-if="step === 1" class="e-ea-fields">
						<label class="e-ea-field"><span class="e-ea-label">Your name<span class="e-ea-req">*</span></span><input v-model="form.name" type="text" placeholder="Jane Rivera" class="e-ea-input" autocomplete="name" /></label>
						<label class="e-ea-field"><span class="e-ea-label">Work email<span class="e-ea-req">*</span></span><input v-model="form.email" type="email" placeholder="jane@studio.com" class="e-ea-input" autocomplete="email" /></label>
						<div class="e-ea-row">
							<label class="e-ea-field"><span class="e-ea-label">Your role</span><input v-model="form.role" type="text" placeholder="Founder, Ops lead…" class="e-ea-input" autocomplete="organization-title" /></label>
							<label class="e-ea-field"><span class="e-ea-label">Phone <span class="e-ea-opt">(optional)</span></span><input v-model="form.phone" type="tel" placeholder="(555) 123-4567" class="e-ea-input" autocomplete="tel" /></label>
						</div>
					</div>

					<div v-else-if="step === 2" class="e-ea-fields">
						<div class="e-ea-row">
							<label class="e-ea-field"><span class="e-ea-label">Company</span><input v-model="form.company" type="text" placeholder="Studio name" class="e-ea-input" autocomplete="organization" /></label>
							<label class="e-ea-field"><span class="e-ea-label">Website <span class="e-ea-opt">(optional)</span></span><input v-model="form.website" type="text" placeholder="studio.com" class="e-ea-input" autocomplete="url" /></label>
						</div>
						<div class="e-ea-field"><span class="e-ea-label">What kind of business?</span>
							<div class="e-ea-chips"><button v-for="b in businessTypes" :key="b.value" type="button" class="e-ea-chip" :class="{ on: form.business_type === b.value }" @click="form.business_type = b.value">{{ b.label }}</button></div>
						</div>
						<div class="e-ea-field"><span class="e-ea-label">Team size</span>
							<div class="e-ea-chips"><button v-for="t in teamSizes" :key="t.value" type="button" class="e-ea-chip" :class="{ on: form.team_size === t.value }" @click="form.team_size = t.value">{{ t.label }}</button></div>
						</div>
					</div>

					<div v-else class="e-ea-fields">
						<div class="e-ea-field"><span class="e-ea-label">Which features are you most interested in?</span>
							<div class="e-ea-chips"><button v-for="f in featureOptions" :key="f" type="button" class="e-ea-chip" :class="{ on: form.features_interested.includes(f) }" @click="toggleFeature(f)">{{ f }}</button></div>
						</div>
						<label class="e-ea-field"><span class="e-ea-label">What are you hoping Earnest helps you do?</span><textarea v-model="form.goals" rows="3" placeholder="e.g. See what needs a decision each morning, automate follow-ups accurately…" class="e-ea-input e-ea-textarea"></textarea></label>
						<div class="e-ea-field"><span class="e-ea-label">Timeline</span>
							<div class="e-ea-chips"><button v-for="t in timelines" :key="t.value" type="button" class="e-ea-chip" :class="{ on: form.timeline === t.value }" @click="form.timeline = t.value">{{ t.label }}</button></div>
						</div>
					</div>

					<p v-if="error" class="e-ea-error">{{ error }}</p>

					<div class="e-ea-actions">
						<button v-if="step > 1" type="button" class="e-btn e-btn-ghost e-ea-back" @click="back"><UIcon name="i-lucide-arrow-left" /> Back</button>
						<span class="e-ea-step-count">Step {{ step }} of 3</span>
						<button v-if="step < 3" type="submit" class="e-btn e-btn-primary e-ea-next">Continue <UIcon name="i-lucide-arrow-right" /></button>
						<button v-else type="submit" class="e-btn e-btn-primary e-ea-next" :disabled="submitting">{{ submitting ? 'Sending…' : 'Request early access' }}</button>
					</div>
				</form>
			</template>

			<template v-else>
				<div class="e-ea-success">
					<span class="e-ea-success-icon"><UIcon name="i-lucide-check" /></span>
					<DialogTitle class="e-ea-title">You're on the list<span class="e-dot">.</span></DialogTitle>
					<DialogDescription class="e-ea-desc">Thanks{{ form.name ? ', ' + form.name.split(' ')[0] : '' }} — we're onboarding early users as we finalize production. We'll reach out at <strong>{{ form.email }}</strong> with your access.</DialogDescription>
					<div class="e-ea-success-demos">
						<p class="e-ea-success-hint">Want a look right now?</p>
						<a :href="soloDemoUrl" class="e-btn e-btn-ghost"><UIcon name="i-lucide-play-circle" /> Explore the live demo</a>
					</div>
					<button class="e-ea-close-link" @click="show = false; reset()">Close</button>
				</div>
			</template>
		</DialogContent>
	</Dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import Dialog from '~/components/ui/dialog/Dialog.vue';
import DialogContent from '~/components/ui/dialog/DialogContent.vue';
import DialogHeader from '~/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '~/components/ui/dialog/DialogTitle.vue';
import DialogDescription from '~/components/ui/dialog/DialogDescription.vue';

const props = defineProps({
	soloDemoUrl: { type: String, default: '' },
	source: { type: String, default: 'early-access-form-glass' },
});

const config = useRuntimeConfig();
const EARLY_ACCESS_FLOW_ID = '08912f2e-d3a7-4ea6-b21e-9bdb79feee64';
const earlyAccessUrl = `${config.public.directusUrl || 'https://admin.earnest.guru'}/flows/trigger/${EARLY_ACCESS_FLOW_ID}`;

const featureOptions = ['The Director’s Office', 'Context-aware automation', 'People & CRM', 'Projects & Tasks', 'Invoicing & Money', 'Marketing & Content', 'Proposals & Contracts', 'Earnest AI & Director', 'Client Portal'];
const businessTypes = [ { label: 'Agency', value: 'agency' }, { label: 'Freelancer / Solo', value: 'solo' }, { label: 'Small business', value: 'small_business' }, { label: 'Startup', value: 'startup' }, { label: 'Other', value: 'other' } ];
const teamSizes = [ { label: 'Just me', value: '1' }, { label: '2–5', value: '2-5' }, { label: '6–15', value: '6-15' }, { label: '16–50', value: '16-50' }, { label: '50+', value: '50+' } ];
const timelines = [ { label: 'Just exploring', value: 'exploring' }, { label: 'Within a month', value: 'month' }, { label: 'Switching now', value: 'now' } ];

const show = ref(false);
const step = ref(1);
const submitting = ref(false);
const success = ref(false);
const error = ref('');
const honeypot = ref('');
function blank() { return { name: '', email: '', role: '', phone: '', company: '', business_type: '', team_size: '', website: '', goals: '', features_interested: [], timeline: '' }; }
const form = reactive(blank());

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()));
const step1Valid = computed(() => form.name.trim().length > 1 && emailValid.value);
const stepMeta = computed(() => ([
	{ title: 'Let’s get you in', desc: 'We’re inviting early users while we finalize production. Start with the basics.' },
	{ title: 'Tell us about your business', desc: 'This tailors your workspace and the demo data we set up for you.' },
	{ title: 'What matters most to you', desc: 'Help us prioritize — and we’ll point you at the right places first.' },
][step.value - 1] || { title: '', desc: '' }));

function open() { reset(); show.value = true; }
function reset() { Object.assign(form, blank()); step.value = 1; success.value = false; error.value = ''; submitting.value = false; honeypot.value = ''; }
function toggleFeature(f) { const i = form.features_interested.indexOf(f); if (i === -1) form.features_interested.push(f); else form.features_interested.splice(i, 1); }
function next() { error.value = ''; if (step.value === 1 && !step1Valid.value) { error.value = 'Please enter your name and a valid email.'; return; } if (step.value < 3) step.value += 1; }
function back() { error.value = ''; if (step.value > 1) step.value -= 1; }
async function submit() {
	error.value = '';
	if (!step1Valid.value) { step.value = 1; error.value = 'Please enter your name and a valid email.'; return; }
	if (honeypot.value) { success.value = true; return; }
	submitting.value = true;
	try {
		const referrer = [import.meta.client ? document.referrer : '', import.meta.client ? location.pathname + location.search : ''].filter(Boolean).join(' ').trim();
		await $fetch(earlyAccessUrl, {
			method: 'POST',
			body: { name: form.name.trim(), email: form.email.trim(), role: form.role.trim(), phone: form.phone.trim(), company: form.company.trim(), business_type: form.business_type, team_size: form.team_size, website: form.website.trim(), goals: form.goals.trim(), features_interested: form.features_interested, timeline: form.timeline, source: props.source, referrer, hp: honeypot.value },
		});
		success.value = true;
	} catch (e) {
		error.value = 'Something went wrong. Please try again, or email hello@earnest.guru.';
	} finally { submitting.value = false; }
}

defineExpose({ open });
</script>
