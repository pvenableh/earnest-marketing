#!/usr/bin/env node
/**
 * scripts/check-earnest-claims.mjs — do the guardrails the site quotes still
 * match the app?
 *
 * WHY THIS EXISTS. `app/data/earnest.ts` copies four things out of the app
 * repo verbatim — the safety floor, the small-reversible set, the autonomy
 * switch's own words, and the Hands-free platform note — because they are the
 * claims a prospect is most likely to hold us to ("it will never send an email
 * on its own"). Copies drift. This script reads the app's `shared/ai-autonomy.ts`
 * and `shared/speech-wake.ts` from a sibling checkout and fails if any of the
 * four differs, so a change in the app becomes a red check here instead of a
 * stale promise on the site.
 *
 * Usage:  pnpm check:earnest                 # sibling at ../earnest
 *         EARNEST_APP_DIR=/path pnpm check:earnest
 *
 * When the app is not checked out beside this repo the script says so and
 * exits 0 — it is a local guard, not a build gate, because the site's CI does
 * not have the app.
 *
 * ⚠️ Deliberately a regex parse, not an import, for the same reason
 * `build-llms-txt.mjs` is: two TypeScript files, four flat values, no loader.
 * Each extractor asserts it found its value, so a format change fails loudly.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const APP = process.env.EARNEST_APP_DIR ? resolve(process.env.EARNEST_APP_DIR) : resolve(ROOT, '../earnest');
const SITE_FILE = resolve(ROOT, 'app/data/earnest.ts');
const APP_AUTONOMY = resolve(APP, 'shared/ai-autonomy.ts');
const APP_SPEECH = resolve(APP, 'shared/speech-wake.ts');

if (!existsSync(APP_AUTONOMY) || !existsSync(APP_SPEECH)) {
	console.log(`check:earnest — app repo not found at ${APP} (set EARNEST_APP_DIR). Skipping.`);
	process.exit(0);
}

const site = readFileSync(SITE_FILE, 'utf8');
const autonomy = readFileSync(APP_AUTONOMY, 'utf8');
const speech = readFileSync(APP_SPEECH, 'utf8');

/** The quoted strings inside `<name> … = new Set([ … ])` or `<name> = [ … ]`, in order. */
function stringList(src, name, file) {
	// Anchor on the declaration — the name is also mentioned in comments.
	const start = src.indexOf(`export const ${name}`);
	if (start === -1) throw new Error(`${file}: ${name} not found`);
	const open = src.indexOf('[', start);
	const close = src.indexOf(']', open);
	const body = src.slice(open + 1, close);
	const items = [...body.matchAll(/'([^']+)'/g)].map((m) => m[1]);
	if (!items.length) throw new Error(`${file}: ${name} has no entries`);
	return items;
}

/** The string value of `<key>: '…'` or `<key>:\n\t'…'` inside a block, single quotes. */
function field(src, key, file) {
	const m = src.match(new RegExp(`${key}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`));
	if (!m) throw new Error(`${file}: ${key} not found`);
	return m[1];
}

/** `export const NAME =\n\t'…';` — one single-quoted string, possibly on the next line. */
function constant(src, name, file) {
	const m = src.match(new RegExp(`export const ${name} =\\s*'((?:[^'\\\\]|\\\\.)*)'`));
	if (!m) throw new Error(`${file}: ${name} not found`);
	return m[1];
}

const checks = [
	{
		what: 'safety floor',
		app: stringList(autonomy, 'AUTONOMY_SAFETY_FLOOR', 'ai-autonomy.ts'),
		site: stringList(site, 'SAFETY_FLOOR', 'earnest.ts'),
	},
	{
		what: 'small reversible set',
		app: stringList(autonomy, 'AUTONOMY_SMALL_REVERSIBLE', 'ai-autonomy.ts'),
		site: stringList(site, 'SMALL_REVERSIBLE', 'earnest.ts'),
	},
	{
		what: 'autonomy switch label',
		app: field(autonomy, 'label', 'ai-autonomy.ts'),
		site: field(site, 'label', 'earnest.ts'),
	},
	{
		what: 'autonomy switch blurb',
		app: field(autonomy, 'blurb', 'ai-autonomy.ts'),
		site: field(site, 'blurb', 'earnest.ts'),
	},
	{
		what: 'Hands-free note',
		app: constant(speech, 'HANDS_FREE_NOTE', 'speech-wake.ts'),
		site: constant(site, 'HANDS_FREE_NOTE', 'earnest.ts'),
	},
];

let failed = 0;
for (const c of checks) {
	const a = JSON.stringify(c.app);
	const s = JSON.stringify(c.site);
	if (a === s) {
		console.log(`  ok    ${c.what}`);
	} else {
		failed += 1;
		console.log(`  DRIFT ${c.what}\n        app:  ${a}\n        site: ${s}`);
	}
}

// Every tool id the site lists needs a human label, or the page prints the id.
const labelled = [...site.matchAll(/^\t(\w+): '/gm)].map((m) => m[1]);
for (const id of [...checks[0].site, ...checks[1].site]) {
	if (!labelled.includes(id)) {
		failed += 1;
		console.log(`  MISSING TOOL_LABEL for ${id}`);
	}
}

if (failed) {
	console.error(`\ncheck:earnest — ${failed} claim${failed === 1 ? '' : 's'} out of date. Update app/data/earnest.ts.`);
	process.exit(1);
}
console.log('check:earnest — every quoted guardrail matches the app.');
