#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────
   Render the "Move fast. Mean it." spot from the animatic, frame by frame.

   Real-time screen recording drops frames and goes soft, so this doesn't
   record: it opens move-fast.html?record, asks the page to draw film time T
   exactly (window.__animatic.frame), screenshots it, and pipes the PNGs to
   ffmpeg. The sound bed is the page's own synth, rendered offline to WAV
   from the same schedule, so it lands on the frame.

     PLAYWRIGHT_MODULE=/Users/peterhoffman/Sites/earnest/earnest/node_modules/playwright \
       node mockups/2026-10-move-fast/record.mjs [--cut 24,15,6] [--aspect h,v]
         [--sound synth|none|path/to/bed.wav] [--still 5200,12400]
         [--remux] [--bed track.mp3 --bpm 122 --from 16.27 --tag name]

   Writes out/move-fast-<cut>-<16x9|9x16>.mp4 (H.264, yuv420p, CRF 18,
   faststart, AAC). --still writes PNGs of those film times instead, for
   checking a frame. --remux keeps the rendered picture and only redoes the
   sound: the synth, or with --bed a licensed track retimed to 120 bpm (see
   makeSound); --tag writes it beside the original as <name>-<tag>.mp4.
   Sound is levelled to about -14 LUFS. Video stays out of git (out/).
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
const OUT = path.join(HERE, 'out');
const FFMPEG = process.env.FFMPEG || '/usr/local/bin/ffmpeg';
const FPS = 30;

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []));
const cuts = (args.cut || '24,15,6').split(',');
const aspects = (args.aspect || 'h,v').split(',');
const soundArg = args.sound || 'synth';
const stills = args.still ? args.still.split(',').map(Number) : null;
const remux = 'remux' in args;
const SIZE = { h: { width: 1920, height: 1080, name: '16x9' }, v: { width: 1080, height: 1920, name: '9x16' } };

// A static server for mockups/ that answers Range requests (the video seeks).
const TYPES = { '.html': 'text/html', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.css': 'text/css', '.js': 'text/javascript' };
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
const BASE = `http://127.0.0.1:${server.address().port}/2026-10-move-fast/move-fast.html`;

fs.mkdirSync(OUT, { recursive: true });
// headless-shell crashes on this site; the full Chromium doesn't
const browser = await chromium.launch({ channel: 'chromium' });

async function open(cut, aspect) {
	const ctx = await browser.newContext({ viewport: { width: SIZE[aspect].width, height: SIZE[aspect].height }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
	const page = await ctx.newPage();
	page.on('pageerror', (e) => console.error('page error:', e.message));
	await page.goto(`${BASE}?record&cut=${cut}`);
	await page.evaluate(async (a) => { await window.__animatic.ready; window.__animatic.setAspect(a); }, aspect);
	// CDP's capture with fast PNG encoding: lossless, and ~5× quicker than page.screenshot
	const cdp = await ctx.newCDPSession(page);
	const shoot = async () => Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true })).data, 'base64');
	return { ctx, page, shoot };
}

async function ffmpeg(argv, capture = false) {
	const ff = spawn(FFMPEG, ['-y', '-hide_banner', '-loglevel', capture ? 'info' : 'error', ...argv], { stdio: ['ignore', 'inherit', capture ? 'pipe' : 'inherit'] });
	let err = '';
	if (capture) ff.stderr.on('data', (d) => { err += d; });
	const [code] = await once(ff, 'close');
	return capture ? err : code;
}

// Loudness to about -14 LUFS (where Reels, Shorts and YouTube play): one
// linear gain, then a fast limiter that only touches the kit's transients,
// so the drop-out at "Mean it." keeps its depth (loudnorm's dynamic mode
// would squash it).
async function loudnorm(src, dest) {
	const log = await ffmpeg(['-i', src, '-af', 'loudnorm=I=-14:TP=-1.5:print_format=json', '-f', 'null', '-'], true);
	const m = JSON.parse(log.slice(log.lastIndexOf('{'), log.lastIndexOf('}') + 1));
	const gain = (-14 - +m.input_i).toFixed(2);
	await ffmpeg(['-i', src, '-af', `volume=${gain}dB,alimiter=limit=0.7:attack=1:release=40:level=false`, '-ar', '48000', dest]);
	fs.rmSync(src);
}

/* The sound for one file. Default: the page's synth (the kit, the taps, room
   tone). --bed track.mp3 --bpm 122 --from 16.27: a licensed track instead,
   retimed to 120 bpm (atempo), started at --from seconds (a bar line in the
   source), ducked under every real-time tap, and cut dead at "Mean it.";
   the synth's taps and room tone ride on top. --sound none | path.wav also work. */
async function makeSound(page, tagged) {
	if (soundArg === 'none') return null;
	if (soundArg !== 'synth') return path.resolve(soundArg);
	const wav = path.join(OUT, `${tagged}.wav`), raw = wav.replace(/\.wav$/, '.raw.wav');
	const { DUR, HOLDS, MEAN_AT, b64 } = await page.evaluate(async (kit) => {
		const a = window.__animatic;
		return { DUR: a.DUR, HOLDS: a.HOLDS, MEAN_AT: a.MEAN_AT, b64: await a.sound(48000, kit) };
	}, !args.bed);
	if (!args.bed) {
		fs.writeFileSync(raw, Buffer.from(b64, 'base64'));
		await loudnorm(raw, wav);
		return wav;
	}
	const taps = wav.replace(/\.wav$/, '.taps.wav');
	fs.writeFileSync(taps, Buffer.from(b64, 'base64'));
	const bpm = +args.bpm, from = +args.from, M = MEAN_AT / 1000, R = 120 / bpm;
	// 1 under the bed, 0.3 under a tap, 20ms ramps either side
	const duck = HOLDS.map(([a, b]) => `clip((t-${a / 1000})/0.02,0,1)*clip((${b / 1000}-t)/0.02,0,1)`).reduce((x, y) => `max(${x},${y})`, '0');
	const bed = [
		`[0:a]atrim=start=${from}:duration=${(M + 0.2) / R}`, 'asetpts=PTS-STARTPTS', `atempo=${R.toFixed(6)}`,
		'aresample=48000', 'aformat=channel_layouts=stereo', 'afade=t=in:d=0.01', 'asetnsamples=n=64',
		`volume='1-0.7*${duck}':eval=frame`, `afade=t=out:st=${(M - 0.06).toFixed(3)}:d=0.06`, `atrim=end=${M}`, `apad=whole_dur=${DUR / 1000}[bed]`,
	].join(',');
	await ffmpeg(['-i', path.resolve(args.bed), '-i', taps, '-filter_complex', `${bed};[bed][1:a]amix=inputs=2:normalize=0:duration=longest[m]`, '-map', '[m]', '-ar', '48000', raw]);
	fs.rmSync(taps);
	await loudnorm(raw, wav);
	return wav;
}

// Runs of consecutive frames, for the checks: every tap holds 12 frames
// (400ms), every whip lasts 140ms (≤ 5 frames, the first fully blurred).
function runs(states, pick) {
	const out = [];
	let n = 0;
	for (const s of [...states, {}]) { if (pick(s)) n++; else if (n) { out.push(n); n = 0; } }
	return out;
}

for (const cut of cuts) {
	for (const aspect of aspects) {
		const name = `move-fast-${cut.padStart(2, '0')}-${SIZE[aspect].name}`;
		const { ctx, page, shoot } = await open(cut, aspect);
		const DUR = await page.evaluate(() => window.__animatic.DUR);

		if (stills) {
			for (const T of stills) {
				await page.evaluate((x) => window.__animatic.frame(x), T);
				fs.writeFileSync(path.join(OUT, `${name}@${T}.png`), await shoot());
			}
			console.log(`${name}: ${stills.length} stills`);
			await ctx.close();
			continue;
		}

		const tagged = args.tag ? `${name}-${args.tag}` : name;
		const mp4 = path.join(OUT, `${name}.mp4`);
		const wav = await makeSound(page, tagged);

		if (remux) {
			// keep the picture, replace the sound (into <name>-<tag>.mp4 with --tag)
			const dest = path.join(OUT, `${tagged}.mp4`), tmp = dest.replace(/\.mp4$/, '.tmp.mp4');
			const code = await ffmpeg(['-i', mp4, ...(wav ? ['-i', wav, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-shortest'] : ['-map', '0:v']),
				'-c:v', 'copy', '-movflags', '+faststart', tmp]);
			if (!code) fs.renameSync(tmp, dest);
			console.log(`${tagged}: sound ${wav ? path.basename(wav) : 'removed'}${code ? ` (ffmpeg exit ${code})` : ''}`);
			await ctx.close();
			continue;
		}

		const ff = spawn(FFMPEG, [
			'-y', '-loglevel', 'error',
			'-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
			...(wav ? ['-i', wav] : []),
			'-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
			'-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
			'-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
			...(wav ? ['-c:a', 'aac', '-b:a', '192k', '-shortest'] : ['-an']),
			'-movflags', '+faststart', mp4,
		], { stdio: ['pipe', 'inherit', 'inherit'] });

		const frames = Math.round(DUR / 1000 * FPS), states = [];
		const t0 = Date.now();
		for (let i = 0; i < frames; i++) {
			states.push(await page.evaluate((x) => window.__animatic.frame(x), (i * 1000) / FPS));
			const png = await shoot();
			if (!ff.stdin.write(png)) await once(ff.stdin, 'drain');
			if (i % 60 === 0) process.stdout.write(`\r${name}: ${i}/${frames}`);
		}
		ff.stdin.end();
		const [code] = await once(ff, 'close');
		await ctx.close();

		const holds = runs(states, (s) => s.hold);
		const whips = runs(states, (s) => s.whip > 0.001);
		console.log(`\r${name}: ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(process.cwd(), mp4)}${code ? ` (ffmpeg exit ${code})` : ''}`);
		console.log(`  tap holds (frames): ${holds.join(', ') || 'none'}   whips (frames): ${whips.join(', ') || 'none'}`);
	}
}

await browser.close();
server.close();
