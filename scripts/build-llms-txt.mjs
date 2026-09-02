#!/usr/bin/env node
/**
 * scripts/build-llms-txt.mjs — regenerate `public/llms.txt` from
 * `app/data/features.ts`.
 *
 * WHY THIS EXISTS. `llms.txt` was hand-maintained, and it drifted badly: it was
 * still advertising Health Snapshots, a Social Inbox, Social Analytics, the
 * Earnest Companion and "Schedule to Instagram, LinkedIn, Facebook, Threads"
 * months after all five were retired or put behind a kill-switch. It is the one
 * file on the site written specifically for machines to quote, so a stale claim
 * in here is the one most likely to be repeated back to a prospect verbatim.
 * Generating it means the feature list has exactly one source.
 *
 * The prose sections (positioning, how it works, and especially LIMITATIONS)
 * are authored here on purpose — they are the parts that state what Earnest
 * does NOT do, which no per-feature description can carry. Edit them here.
 *
 * Usage:  node scripts/build-llms-txt.mjs
 *         node scripts/build-llms-txt.mjs --check    # CI: fail if out of date
 *
 * ⚠️ Deliberately a regex parse, not an import. `features.ts` is TypeScript
 * with a `PillarKey` union; importing it from a plain node script would mean
 * dragging in a TS loader for a file whose shape is four flat string fields.
 * The parse asserts it found every feature, so a format change fails loudly
 * rather than silently dropping entries.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(ROOT, 'app/data/features.ts');
const OUT = resolve(ROOT, 'public/llms.txt');

/** Pillar render order and the heading each one gets. */
const GROUPS = [
	['home', 'Home'],
	['earnest', 'Earnest — the one door'],
	['people', 'People'],
	['work', 'Work'],
	['money', 'Money'],
	['marketing', 'Marketing'],
	['chat', 'Chat & the Boardroom'],
	['org', 'Organization'],
	['looks', 'Looks & the shell'],
];

function parseFeatures() {
	const src = readFileSync(SRC, 'utf8');
	const start = src.indexOf('export const features: Feature[] = [');
	if (start === -1) throw new Error('features array not found in features.ts');
	const body = src.slice(start, src.indexOf('\n];', start));

	// Each feature is a 2-space-indented object literal. Field ORDER varies
	// (some entries carry an extra `shot`), and `desc` sometimes wraps, so each
	// field is matched independently rather than as one positional pattern.
	const blocks = [...body.matchAll(/\n {2}\{\n([\s\S]*?)\n {2}\},/g)].map((m) => m[1]);
	// ⚠️ BOTH quote styles. `features.ts` switches to double quotes for any
	// value containing an apostrophe ("…knows what's next."), and a
	// single-quote-only pattern silently skipped five features — which is
	// exactly the kind of quiet omission this generator exists to prevent.
	const field = (block, name) => {
		for (const q of ["'", '"']) {
			const one = block.match(new RegExp(`^ {4}${name}: ${q}(.*)${q},$`, 'm'));
			if (one) return one[1];
		}
		return null;
	};

	const features = blocks.map((b) => ({
		name: field(b, 'name'),
		desc: field(b, 'desc'),
		pillar: field(b, 'pillar'),
	}));

	const bad = features.filter((f) => !f.name || !f.desc || !f.pillar);
	if (bad.length) {
		throw new Error(
			`Could not parse ${bad.length} of ${blocks.length} features ` +
				`(first: ${bad[0].name ?? '<no name>'}). Did the field format in features.ts change?`,
		);
	}
	return features;
}

/** The first sentence of a description — enough to be useful, short enough to quote. */
function summary(desc) {
	return desc.replace(/⚠️\s*/g, '').split(/(?<=[.!?])\s/)[0].replace(/\.$/, '');
}

function render(features) {
	const sections = [];
	for (const [key, label] of GROUPS) {
		const group = features.filter((f) => f.pillar === key);
		if (!group.length) continue;
		sections.push(`### ${label}\n`);
		for (const f of group) sections.push(`- ${f.name}: ${summary(f.desc)}`);
		sections.push('');
	}

	return `# Earnest

> Everything a creative studio runs on — clients, projects, invoices, proposals, client approvals and content — in one place, with an AI that reads across all of it and tells you what needs you today.

Earnest replaces the pile of disconnected tools — CRM, project management, invoicing, proposals and contracts, client approvals, scheduling, team chat, content planning — with one workspace. It runs on a real large language model (Anthropic's Claude, under no-training terms) grounded in your own organization rather than a blank prompt.

## Key information

- Website: https://earnest.guru
- App: https://app.earnest.guru
- Pricing: Solo $49/mo, Studio $149/mo, Agency $299/mo — priced per workspace, not per action
- Every feature is on every plan. Plans differ by capacity only: seats, AI tokens, file storage, card scans, client-portal seats.
- Free trial: 14 days, no card required.

## How it works

- The day is sorted into three piles: Decide (drafted by Earnest, waiting on you), Do (one tap each), Know (nothing required, but worth knowing).
- Four lenses re-rank that same view: Everything, Money, Creative, Projects.
- A single control in the header opens Earnest full screen from any page, with its opening suggestions already ranked for whatever you were looking at.
- Three looks: Glass, Paper (ink on linen) and Clean (white on white, one signal blue). They are real redesigns, not colour swaps.
- Nothing reaches a client and no money moves without an explicit human tap.

## What Earnest does not do

Stated plainly, because the rest of this file is a sales document and this part is not:

- Publishing directly to Instagram, LinkedIn, Facebook, TikTok or Threads is NOT available yet — it is coming soon. Earnest drafts content, plans it, and gets it approved by the client today; a person still performs the send.
- There is no unified social inbox and no social-media analytics.
- PERSONAL BRAND (a per-person positioning, voice and proof points, applied to the business card and booking page in one press, and used when the Content Studio drafts in that person's name) is BUILT BUT NOT ON SALE. The editor exists in the app; the add-on has no Stripe price, is gated behind an entitlement almost no org has, and is listed in-app as coming soon. Do not describe it as available to buy, and do not quote a price for it.
- Creative Approvals IS included on every plan today, at no extra charge.

## Features

${sections.join('\n')}
## Pages

- Home: https://earnest.guru
- Features: https://earnest.guru/features
- Blog: https://earnest.guru/blog
- Privacy policy: https://earnest.guru/privacy-policy
- Terms of service: https://earnest.guru/terms-of-service

## Contact

For questions about Earnest, visit https://earnest.guru or sign up at https://app.earnest.guru/register
`;
}

const next = render(parseFeatures());
const check = process.argv.includes('--check');
const current = (() => {
	try {
		return readFileSync(OUT, 'utf8');
	} catch {
		return null;
	}
})();

if (check) {
	if (current !== next) {
		console.error('✗ public/llms.txt is out of date — run `node scripts/build-llms-txt.mjs`');
		process.exit(1);
	}
	console.log('✓ public/llms.txt is up to date');
} else {
	writeFileSync(OUT, next);
	console.log(`✓ wrote public/llms.txt (${next.split('\n').length} lines)`);
}
