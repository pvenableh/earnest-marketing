/**
 * The plans and the capacity ladder, in one place.
 *
 * Everything else this file used to hold — the long FAQ, the lenses, the
 * coded home, the app switcher, the brand and Focus demos — belonged to the
 * landings archived in October 2026 (tag `archive/landings-2026-10`, see
 * ARCHIVE.md). The homepage's own copy lives in `good-work.ts`; it reads only
 * these two lists, for the pricing ladder.
 *
 * ⚠️ Capacity numbers mirror `EARNEST_PLANS` in the app's `server/utils/
 * stripe.ts`, and names mirror `PLAN_NAMES` in its `shared/plan-pricing.ts`.
 * If they move there, they move here. The keys (`solo`, `studio`, `agency`)
 * are the app's plan keys and never change; only the names do.
 */

export interface Faq {
	q: string;
	/** Rendered answer — may contain links and <strong>. */
	a: string;
	/** The same answer, flattened, for the FAQPage rich result. */
	aText: string;
}

export interface Plan {
	key: 'solo' | 'studio' | 'agency';
	name: string;
	price: string;
	featured: boolean;
}

export const plans: Plan[] = [
	{ key: 'solo', name: 'Solo', price: '49', featured: false },
	{ key: 'studio', name: 'Team', price: '149', featured: true },
	{ key: 'agency', name: 'Business', price: '299', featured: false },
];

/**
 * The capacity ladder. Every feature ships on every plan except white-label
 * branding, an add-on on Business — so this table lists what scales, plus
 * that one row.
 */
export const compareRows = [
	{ label: 'Team seats', solo: '1', studio: '8', agency: '15' },
	{ label: 'AI tokens / month', solo: '100K', studio: '400K', agency: '1M' },
	{ label: 'File storage', solo: '25 GB', studio: '100 GB', agency: '500 GB' },
	{ label: 'Card scans / month', solo: '25', studio: '150', agency: '500' },
	{ label: 'Client-portal seats', solo: '5', studio: '15', agency: 'Unlimited' },
	{ label: 'White-label branding', solo: '—', studio: '—', agency: '$19/mo add-on' },
];
