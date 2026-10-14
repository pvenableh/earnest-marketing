#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────
   The spot, taken apart for After Effects.

   Same frame-exact drawing as record.mjs, but each frame is captured once
   per element, the element alone on transparent (the page's solo mode), and
   every element goes to its own clip:

     out/ae-elements/
       16x9/ 9x16/      00-plate.mov (ProRes 422 HQ: footage, photo, shade,
                        black, exactly as in the spot) and one ProRes 4444
                        clip with alpha per element, trimmed to where it's on
                        screen; stills/ holds each element at rest (PNG).
       audio/           the synth as stems (kit, taps, room tone), the mix,
                        and the licensed beds retimed to 120 bpm.
       sources/         the untouched footage and photo.
       timing.json      shots, taps, whips, beats, and per frame the plate's
                        recipe (footage time, photo opacity and push, black).
       copy.txt         every line of type, shot by shot.
       build-comp.jsx   File → Scripts → Run Script File… in After Effects
                        builds both comps with every layer at its in-point
                        and markers on the shots, the taps and the bed's drop-out.

     PLAYWRIGHT_MODULE=/Users/peterhoffman/Sites/earnest/earnest/node_modules/playwright \
       node mockups/2026-10-move-fast/elements.mjs [--aspect h,v] [--until 3]
   ───────────────────────────────────────────────────────────────────────── */
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE); // mockups/
const SITE = path.resolve(ROOT, '..');
const KIT = path.join(HERE, 'out', 'ae-elements');
const FFMPEG = process.env.FFMPEG || '/usr/local/bin/ffmpeg';
const FPS = 30;

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []));
const aspects = (args.aspect || 'h,v').split(',');
const SIZE = { h: { width: 1920, height: 1080, name: '16x9' }, v: { width: 1080, height: 1920, name: '9x16' } };

// Each shot's elements, back to front. A selector is inside that shot.
const PARTS = {
	open: [['type', '.center']],
	know: [['column', '.colwrap'], ['type', '.word']],
	book: [['column', '.colwrap'], ['type', '.word']],
	voice: [['column', '.colwrap'], ['type', '.word']],
	bill: [['column', '.colwrap'], ['type', '.word']],
	saytap: [['column', '.colwrap'], ['type', '.word']],
	fast: [['receipts', '.receipts'], ['type', '.fast-line']],
	mean: [['sub', '.mean-sub'], ['type', '.mean-line']],
	end: [['fine', '.end-fine'], ['tag', '.end-tag'], ['mark', '.end-mark']],
};
// The licensed beds, retimed to 120 bpm from a kick (see NEXT-SESSION.md)
const BEDS = [
	['tech-house-vibes', 122, 16.307],
	['hazy-after-hours', 121, 16.936],
	['deep-urban', 123.98, 16.488],
];

// A static server for mockups/ that answers Range requests (the video seeks).
const TYPES = { '.html': 'text/html', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
	const file = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
	if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
	const size = fs.statSync(file).size, type = TYPES[path.extname(file)] || 'application/octet-stream';
	const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
	if (m) {
		const a = m[1] ? +m[1] : size - +m[2], b = m[1] && m[2] ? +m[2] : size - 1;
		res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${a}-${b}/${size}`, 'Content-Length': b - a + 1, 'Accept-Ranges': 'bytes' });
		fs.createReadStream(file, { start: a, end: b }).pipe(res);
	} else {
		res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
		fs.createReadStream(file).pipe(res);
	}
});
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const BASE = `http://127.0.0.1:${server.address().port}/2026-10-move-fast/move-fast.html?record&cut=24`;

async function ffmpeg(argv, capture = false) {
	const ff = spawn(FFMPEG, ['-y', '-hide_banner', '-loglevel', capture ? 'info' : 'error', ...argv], { stdio: ['ignore', 'inherit', capture ? 'pipe' : 'inherit'] });
	let err = '';
	if (capture) ff.stderr.on('data', (d) => { err += d; });
	const [code] = await once(ff, 'close');
	return capture ? err : code;
}

// One clip per element, fed PNGs as frames arrive. ProRes 4444 keeps the
// alpha (straight, as the browser draws it); the plate is ProRes 422 HQ.
function clip(file, alpha) {
	const ff = spawn(FFMPEG, [
		'-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
		'-vf', 'scale=out_color_matrix=bt709:out_range=tv',
		'-c:v', 'prores_ks', '-profile:v', alpha ? '4444' : '3', '-pix_fmt', alpha ? 'yuva444p10le' : 'yuv422p10le',
		...(alpha ? ['-alpha_bits', '16'] : []), '-vendor', 'apl0',
		'-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', file,
	], { stdio: ['pipe', 'inherit', 'inherit'] });
	return {
		frames: 0,
		async write(png) { this.frames++; if (!ff.stdin.write(png)) await once(ff.stdin, 'drain'); },
		async end() { ff.stdin.end(); await once(ff, 'close'); },
	};
}

fs.mkdirSync(path.join(KIT, 'audio'), { recursive: true });
fs.mkdirSync(path.join(KIT, 'sources'), { recursive: true });
const browser = await chromium.launch({ channel: 'chromium' });
const timing = { fps: FPS, note: 'Times in seconds on the :24. Taps are real time (0.4 s), whips 0.14 s, a beat 0.5 s (120 bpm).', aspects: {} };
const copy = {};

for (const aspect of aspects) {
	const { width, height, name } = SIZE[aspect];
	const dir = path.join(KIT, name);
	fs.mkdirSync(path.join(dir, 'stills'), { recursive: true });
	const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
	const page = await ctx.newPage();
	page.on('pageerror', (e) => console.error('page error:', e.message));
	await page.goto(BASE);
	await page.evaluate(async (a) => { await window.__animatic.ready; window.__animatic.setAspect(a); }, aspect);
	const cdp = await ctx.newCDPSession(page);
	await cdp.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
	const shoot = async () => Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true })).data, 'base64');
	const A = await page.evaluate(() => { const a = window.__animatic; return { DUR: a.DUR, HOLDS: a.HOLDS, SHOTS: a.SHOTS, SCHEDULE: a.SCHEDULE, MEAN_AT: a.MEAN_AT, WHIP: a.WHIP }; });

	if (!timing.shots) {
		timing.duration = A.DUR / 1000;
		timing.shots = A.SHOTS.map((s) => ({ id: s.id, label: s.label, in: s.start / 1000, out: s.end / 1000, rest: s.key / 1000 }));
		timing.taps = A.HOLDS.map(([a, b]) => ({ in: +(a / 1000).toFixed(4), out: +(b / 1000).toFixed(4) }));
		timing.whips = A.SHOTS.filter((s) => PARTS[s.id][0][0] === 'column').map((s) => ({ in: s.start / 1000, out: (s.start + A.WHIP) / 1000 }));
		timing.beats = A.SCHEDULE.filter((e) => e.kind === 'hat').map((e) => e.at / 1000);
		timing.bedOut = A.MEAN_AT / 1000;
	}

	const frames = Math.round(Math.min(A.DUR / 1000, +args.until || Infinity) * FPS); // --until: a quick test
	const layers = [{ name: '00 plate', file: `${name}/00-plate.mov`, in: 0, alpha: false }];
	const plate = clip(path.join(dir, '00-plate.mov'), false);
	const open = new Map(); // element key → { clip, layer }
	const recipe = [];
	const keyFrame = (s) => Math.round(s.key / 1000 * FPS);
	const t0 = Date.now();

	for (let i = 0; i < frames; i++) {
		const T = (i * 1000) / FPS;
		const st = await page.evaluate((x) => window.__animatic.frame(x), T);
		recipe.push({ t: +(T / 1000).toFixed(4), footage: st.footage, photo: st.photo, push: st.push, black: st.black, hold: st.hold });
		const shot = A.SHOTS.find((s) => s.id === st.shot);
		const n = A.SHOTS.indexOf(shot) + 1;
		const atRest = i === keyFrame(shot);

		await page.evaluate(() => window.__animatic.solo('plate'));
		const p = await shoot();
		await plate.write(p);
		if (atRest) fs.writeFileSync(path.join(dir, 'stills', `${String(n).padStart(2, '0')}-${shot.id}-plate.png`), p);

		// this shot's elements; the previous shot's clips end here
		const live = new Set();
		for (const [part, sel] of PARTS[shot.id]) {
			const key = `${String(n).padStart(2, '0')}-${shot.id}-${part}`;
			live.add(key);
			if (!open.has(key)) {
				const layer = { name: key.replace(/-/g, ' '), file: `${name}/${key}.mov`, in: T / 1000, alpha: true };
				layers.push(layer);
				open.set(key, { clip: clip(path.join(dir, `${key}.mov`), true), layer });
			}
			await page.evaluate((s) => window.__animatic.solo(s), `.shot[data-id="${shot.id}"] ${sel}`);
			const png = await shoot();
			await open.get(key).clip.write(png);
			if (atRest) {
				fs.writeFileSync(path.join(dir, 'stills', `${key}.png`), png);
				if (aspect === aspects[0]) (copy[shot.label] ||= []).push(await page.evaluate((s) => document.querySelector(s).innerText.replace(/\n{2,}/g, '\n').trim(), `.shot[data-id="${shot.id}"] ${sel}`));
			}
		}
		// the real-time tag, one clip per tap: from the tap to the end of its fade
		const tap = A.HOLDS.findIndex(([a, b]) => T >= a && T < b + 150);
		if (tap >= 0) {
			const key = `rt-${tap + 1}`;
			live.add(key);
			if (!open.has(key)) {
				const layer = { name: `real time tag ${tap + 1}`, file: `${name}/${key}.mov`, in: T / 1000, alpha: true, top: true };
				layers.push(layer);
				open.set(key, { clip: clip(path.join(dir, `${key}.mov`), true), layer });
			}
			await page.evaluate(() => window.__animatic.solo('rt'));
			await open.get(key).clip.write(await shoot());
		}
		for (const [key, o] of open) if (!live.has(key)) { await o.clip.end(); o.layer.out = T / 1000; open.delete(key); }
		await page.evaluate(() => window.__animatic.solo(null));
		if (i % 30 === 0) process.stdout.write(`\r${name}: ${i}/${frames}`);
	}
	for (const [, o] of open) { await o.clip.end(); o.layer.out = A.DUR / 1000; }
	await plate.end();
	layers[0].out = A.DUR / 1000;
	timing.aspects[name] = { width, height, layers, plate: recipe };
	console.log(`\r${name}: ${frames} frames, ${layers.length} clips in ${((Date.now() - t0) / 1000).toFixed(0)}s`);

	// sound, once: the synth as stems that sum to the mix, at the page's own level
	if (aspect === aspects[0]) {
		const stems = { 'synth-mix': true, 'synth-kit': { kinds: ['hat', 'kick', 'snare'], air: false }, 'synth-taps': { kinds: ['tap'], air: false }, 'room-tone': { kinds: [], air: true } };
		for (const [stem, pick] of Object.entries(stems)) {
			fs.writeFileSync(path.join(KIT, 'audio', `${stem}.wav`), Buffer.from(await page.evaluate((k) => window.__animatic.sound(48000, k), pick), 'base64'));
		}
	}
	await ctx.close();
}
await browser.close();
server.close();

// the licensed beds: retimed to 120 bpm from a kick on 0:00, full length, uncut
// (the spot cuts them at timing.bedOut and ducks them under each tap)
for (const [bed, bpm, from] of BEDS) {
	const src = path.join(HERE, 'out', 'tracks', `${bed}.mp3`);
	if (!fs.existsSync(src)) { console.log(`skipped ${bed}: no out/tracks/${bed}.mp3`); continue; }
	const R = 120 / bpm, raw = path.join(KIT, 'audio', `${bed}.raw.wav`);
	await ffmpeg(['-i', src, '-af', `atrim=start=${from}:duration=${(timing.duration + 1) * R},asetpts=PTS-STARTPTS,atempo=${R.toFixed(6)},atrim=end=${timing.duration},aformat=channel_layouts=stereo`, '-ar', '48000', raw]);
	const log = await ffmpeg(['-i', raw, '-af', 'loudnorm=I=-14:print_format=json', '-f', 'null', '-'], true);
	const m = JSON.parse(log.slice(log.lastIndexOf('{'), log.lastIndexOf('}') + 1));
	await ffmpeg(['-i', raw, '-af', `volume=${(-14 - +m.input_i).toFixed(2)}dB,alimiter=limit=0.84:level=false`, path.join(KIT, 'audio', `bed-${bed}-120bpm.wav`)]);
	fs.rmSync(raw);
}
fs.copyFileSync(path.join(SITE, 'public', 'video', 'hero.mp4'), path.join(KIT, 'sources', 'office-loop-mixkit-914.mp4'));
fs.copyFileSync(path.join(SITE, 'public', 'photos', 'client.jpg'), path.join(KIT, 'sources', 'client-across-the-table.jpg'));

fs.writeFileSync(path.join(KIT, 'timing.json'), JSON.stringify(timing, null, '\t'));
fs.writeFileSync(path.join(KIT, 'copy.txt'), 'Every line of type, shot by shot, as it reads on screen (eyebrows and labels are set in caps by style).\n\n' + Object.entries(copy).map(([shot, lines]) => `── ${shot}\n\n${lines.join('\n\n')}\n`).join('\n'));

/* build-comp.jsx — ExtendScript (ES3, no JSON), so the data goes in as
   literals. One comp per aspect, layers back to front with alpha set to
   straight, markers on shots, taps and beats; the synth mix as audio and
   the other stems and beds imported, muted, ready to swap in. */
const jsxData = {
	fps: FPS, duration: timing.duration,
	shots: timing.shots.map((s) => [s.in, s.label]),
	taps: timing.taps.map((t) => [t.in, +(t.out - t.in).toFixed(4)]),
	bedOut: timing.bedOut,
	comps: Object.entries(timing.aspects).map(([name, a]) => ({ name, width: a.width, height: a.height, layers: [...a.layers.filter((l) => !l.top), ...a.layers.filter((l) => l.top)].map((l) => [l.name, l.file, l.in, l.alpha ? 1 : 0]) })),
	audio: fs.readdirSync(path.join(KIT, 'audio')).filter((f) => f.endsWith('.wav')).sort((a, b) => (a === 'synth-mix.wav' ? -1 : b === 'synth-mix.wav' ? 1 : a.localeCompare(b))),
};
fs.writeFileSync(path.join(KIT, 'build-comp.jsx'), `\ufeff// Move fast. Mean it. — builds the :24 from these elements.
// After Effects: File → Scripts → Run Script File… and pick this file.
// Leave it in its folder: it finds the clips next to it.
(function () {
	var D = ${JSON.stringify(jsxData)};
	var root = new File($.fileName).parent;
	app.beginUndoGroup('Move fast elements');
	var bin = app.project.items.addFolder('Move fast. Mean it.');
	function bring(rel) {
		var f = new File(root.fsName + '/' + rel);
		if (!f.exists) { alert('Missing ' + rel); return null; }
		var it = app.project.importFile(new ImportOptions(f));
		it.parentFolder = bin;
		return it;
	}
	function mark(comp, t, text, dur) {
		var m = new MarkerValue(text);
		if (dur) m.duration = dur;
		try { comp.markerProperty.setValueAtTime(t, m); } catch (e) {}
	}
	var sounds = [];
	for (var a = 0; a < D.audio.length; a++) sounds.push(bring('audio/' + D.audio[a]));
	for (var c = 0; c < D.comps.length; c++) {
		var C = D.comps[c];
		var comp = app.project.items.addComp('Move fast :24 ' + C.name, C.width, C.height, 1, D.duration, D.fps);
		comp.parentFolder = bin;
		for (var i = 0; i < C.layers.length; i++) {
			var L = C.layers[i], it = bring(L[1]);
			if (!it) continue;
			if (L[3]) it.mainSource.alphaMode = AlphaMode.STRAIGHT;
			var ly = comp.layers.add(it);
			ly.name = L[0];
			ly.startTime = L[2];
		}
		for (var s = 0; s < sounds.length; s++) {
			if (!sounds[s]) continue;
			var au = comp.layers.add(sounds[s]);
			au.moveToEnd();
			if (s > 0) au.audioEnabled = false; // the synth mix plays; the rest are there to swap in
		}
		for (var k = 0; k < D.shots.length; k++) mark(comp, D.shots[k][0], D.shots[k][1]);
		for (var t = 0; t < D.taps.length; t++) mark(comp, D.taps[t][0], 'Tap — real time, never sped up', D.taps[t][1]);
		mark(comp, D.bedOut, 'Bed out — room tone only');
		if (c === 0) comp.openInViewer();
	}
	app.endUndoGroup();
})();
`);
fs.writeFileSync(path.join(KIT, 'README.txt'), `MOVE FAST. MEAN IT. — the :24, taken apart for After Effects
Rendered ${new Date().toISOString().slice(0, 10)} from mockups/2026-10-move-fast/move-fast.html by elements.mjs.

START HERE
  After Effects → File → Scripts → Run Script File… → build-comp.jsx (leave it in
  this folder). It builds "Move fast :24 16x9" and "Move fast :24 9x16": every
  clip at its in-point, back to front, alpha set to straight, markers on each
  shot, each tap and the bed's drop-out. The synth mix plays; the stems and the
  licensed beds are in the comp, muted, ready to swap in.

WHAT'S HERE
  16x9/, 9x16/   00-plate.mov — ProRes 422 HQ, 24 s: the office footage (graded,
                 retimed, near-still under each tap), the client photo's dissolve
                 and push, the vignette and the end card's black, exactly as in
                 the spot. Everything else is ProRes 4444 with alpha, full frame
                 (so it sits where it sat), trimmed to when it's on screen:
                   NN-shot-type      the kinetic word, with its 140 ms whip
                   NN-shot-column    the Earnest column: ask, reply, card, tap, ✓
                   07 receipts, 08 sub, 09 mark / tag / fine — "Move fast.",
                   "Mean it." and the end card, split so each can move alone
                   rt-N              the "Real time · your tap" tag, one per tap
                 stills/ — each element (and the plate) at rest, PNG with alpha.
  audio/         synth-mix.wav (the spot's bed) and its stems — synth-kit,
                 synth-taps, room-tone — which sum exactly to it. bed-*.wav: the
                 three licensed tracks retimed to 120 bpm with a kick on 0:00,
                 full length and uncut (the spot cuts them at "Mean it." and
                 dips them 10 dB under each tap).
  sources/       the untouched footage (960×540, 24 fps, 13.75 s loop) and photo.
  timing.json    shots, taps, whips, beats, and per frame the plate's recipe:
                 footage time (for a Time Remap rebuild from sources/), photo
                 opacity and scale, black opacity, and whether a tap is holding.
  copy.txt       every line of type, shot by shot, for retyping.

THE RULES THE CUT KEEPS (move-fast.html → Motion grammar)
  · Earnest's work is sped up; your tap never is. Each held action (email,
    invoice, payment, meeting) holds the frame 0.4 s at real speed, the
    footage drops to near-still, and the real-time tag shows. Never show one
    going out without the tap.
  · Cut on the beat: 120 bpm, a beat is 0.5 s, a cut is four beats ("Say it.
    Tap it." six). Whips are 0.14 s with motion blur — never a dissolve
    inside the montage.
  · Every fast run ends in stillness: the footage ramps 3× → 0.35× over 1.8 s
    into "Mean it.", and the bed drops to room tone.
  · Speed shows in the edit, never in numbers: no clocks, no "in seconds".

LOOK
  Stage #07090c · ink #f2f3f5 · ink-2 #aeb4bf · blue #4fb3ec (the full stops,
  "Mean it.", Approve) · green #5fd39a (✓ stamps) · amber #f0b35a (held, the
  tag's dot) · red #f07b86 · column #12151c at 92% with a 14 px backdrop blur.
  Type: Proxima Nova Light (headlines, −0.04 em tracking), Proxima Nova Regular
  (UI), Bauer Bodoni Roman (the wordmark only). The type here is pre-rendered;
  to set it live, use your desktop licences for those fonts (the site's web-
  font licences don't cover desktop use).
  The column's glass blur is not baked into its clip (there's nothing behind
  it to blur): to match the spot, put a Fast Box Blur (~14 px) on a copy of
  the plate, masked to the column. Alpha is straight.

LICENCES
  Footage: Mixkit 914 "Open office space" (Mixkit Stock Video Free License).
  Photo: Sable Flow on Unsplash (Unsplash License). Beds: Tech House vibes,
  Hazy After Hours, Deep Urban (Mixkit Stock Music Free License: social video,
  online ads and YouTube allowed; no TV/radio, no music-only remixes, never
  register them with Content ID). The synth is ours.
`);
console.log(`kit → ${path.relative(process.cwd(), KIT)}`);
