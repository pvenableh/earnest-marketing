/**
 * useLandingAppearance — the app's appearance axes, on the marketing page.
 *
 * The landing used to argue "three looks, one Earnest" with a screenshot
 * carousel, which is the one medium that cannot show it. It now argues it by
 * BEING the thing: the visitor drives the same axes the app gives a signed-in
 * user, and the whole page — hero home included — re-skins under them.
 *
 * ⚠️ THE AXES ARE THE APP'S, INCLUDING WHERE THEY STOP. In the app a LOOK is
 * not an axis: while Paper or Clean is active it brings its own palette (the
 * picker is hidden), and Paper brings its own type voice as well. Mirrored
 * here, `pins` below reports exactly that, and the control renders the pinned
 * rows as pinned rather than hiding them — a buyer should be able to see the
 * shape of the system before they buy it. See `app/composables/useTheme.ts`
 * and `useAppPalette.ts` in the app repo; the values here are their registries.
 *
 * Shared via `useState` rather than a module ref, because two controls read
 * it — the nav popover and the panel in the Looks section — and they must
 * agree.
 *
 * ⚠️ Deliberately NOT persisted. This is a demonstration on a sales page: a
 * visitor who tried Paper once and came back next week to a landing they did
 * not recognise would reasonably think the site was broken. The APP persists
 * the choice, because there it is a preference rather than a demo.
 */
import { computed } from 'vue';

export interface AppearanceOption {
	key: string;
	label: string;
	hint: string;
}

/** `data-theme` in the app; `data-look` here. */
export const LANDING_LOOKS: AppearanceOption[] = [
	{ key: 'glass', label: 'Glass', hint: 'Translucent surfaces, soft light, rounded chrome. The default.' },
	{ key: 'paper', label: 'Paper', hint: 'Ink on linen — an editorial Didone, hairline rules, tracked caps.' },
	{ key: 'clean', label: 'Clean', hint: 'White on white, layered light, condensed caps and one signal blue.' },
];

/**
 * The two palettes a user can actually reach. `APP_PALETTE_IDS` in the app is
 * exactly `['neutral', 'mono']` — Fresh and Aurora are archived and alias back
 * to Default, so they are not offered here either.
 */
export const LANDING_PALETTES: AppearanceOption[] = [
	{ key: 'neutral', label: 'Default', hint: 'Sky Aqua through Yale Blue — the Earnest ramp.' },
	{ key: 'mono', label: 'Mono', hint: 'Ink and glass — colour only where it means something.' },
];

/** `data-style` in the app: the font axis, and it changes the family only. */
export const LANDING_TYPES: AppearanceOption[] = [
	{ key: 'sans', label: 'Sans', hint: 'Proxima Nova — clean, quiet, the Earnest default.' },
	{ key: 'condensed', label: 'Condensed', hint: 'DIN Pro Condensed caps over a sans body.' },
	{ key: 'handwritten', label: 'Handwritten', hint: 'Gaegu headings over a sans body — friendly and personal.' },
];

export function useLandingAppearance() {
	const look = useState<string>('landing-look', () => 'glass');
	const palette = useState<string>('landing-palette', () => 'neutral');
	const type = useState<string>('landing-type', () => 'sans');
	/**
	 * Whether the visitor has picked a face THEMSELVES. Until they have, the
	 * font axis is not really theirs and a look may bring its own voice with
	 * it — which is how Clean arrives in condensed caps without pinning the
	 * axis. The app keeps the same distinction, in `earnest-style-chosen`.
	 */
	const typeChosen = useState<boolean>('landing-type-chosen', () => false);

	// DARK by default — it matches the app and the wave field behind the hero.
	const colorMode = useColorMode({ initialValue: 'dark', storageKey: 'earnest-mkt-theme' });
	const isDark = computed(() => colorMode.value === 'dark');

	/** What the current look takes off the table, and what it says instead. */
	const pins = computed(() => ({
		palette: look.value === 'glass' ? null : `${lookLabel(look.value)} brings its own palette.`,
		type: look.value === 'paper' ? 'Paper brings its own Didone.' : null,
	}));

	/** Paper and Clean each ship a palette of their own; Glass takes the pick. */
	const effectivePalette = computed(() => (look.value === 'glass' ? palette.value : look.value));

	/**
	 * Clean DEFAULTS to condensed — it is the caps that make Clean
	 * recognisable — but it does not pin the axis: pick a face under Clean and
	 * the pick holds. Paper does pin, so it reports its own voice.
	 */
	const effectiveType = computed(() => {
		if (look.value === 'paper') return 'paper';
		if (look.value === 'clean' && !typeChosen.value) return 'condensed';
		return type.value;
	});

	function setLook(key: string) {
		look.value = key;
	}
	function setPalette(key: string) {
		if (look.value !== 'glass') return;
		palette.value = key;
	}
	function setType(key: string) {
		if (look.value === 'paper') return;
		type.value = key;
		typeChosen.value = true;
	}
	function toggleTheme() {
		colorMode.value = isDark.value ? 'light' : 'dark';
	}

	return {
		look,
		palette,
		type,
		isDark,
		colorMode,
		pins,
		effectivePalette,
		effectiveType,
		setLook,
		setPalette,
		setType,
		toggleTheme,
	};
}

function lookLabel(key: string) {
	return LANDING_LOOKS.find((l) => l.key === key)?.label ?? key;
}
