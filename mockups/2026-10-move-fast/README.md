# Move fast. Mean it. (October 2026)

The campaign animatic, the spot rendered from it, and the reference for
bringing the line to earnest.guru.

- **Page:** `move-fast.html` — preview with the `mockups` launch config →
  http://localhost:4173/2026-10-move-fast/move-fast.html
- **What's on it:** a :24 animatic (scrubbable, ¼×/½×, 9:16 toggle, click
  track), the storyboard, the motion grammar, the language bank, a
  section-by-section map onto `app/components/GoodWork/Home.vue`, a build
  path and the open decisions.
- **Cut-downs:** `?cut=15` and `?cut=6` play the :15 and the :06 bumper on
  the same stage (`CUTS` in the script). Earnest's work is compressed; every
  tap keeps its real 400ms and every whip its 140ms.
- **Assets** are symlinks (`assets/video`, `assets/photos`, `assets/fonts`)
  into `public/` and `app/assets/css/fonts/` — the same licensed files the
  site serves.
- **The engine** (the `<script>` at the foot): one clock, the stage is a pure
  function of it; `data-at`, `data-type`, `data-tap`, `data-l` are local
  times inside each `.shot`. Ported to the site as
  `app/composables/useCutTimeline.ts`.

## The spot (Phase 4)

`record.mjs` renders it frame by frame. It never screen-records: it opens
`move-fast.html?record`, asks the page to draw film time T exactly (every CSS
transition paused at its true age, the footage placed at the integral of its
playback rate), captures the frame, and pipes the PNGs to ffmpeg.

```sh
PLAYWRIGHT_MODULE=/Users/peterhoffman/Sites/earnest/earnest/node_modules/playwright \
  node mockups/2026-10-move-fast/record.mjs            # all six files, synth sound
```

The spot's bed is **Tech House vibes** (Mixkit 130, Stock Music Free
License; never register it with Content ID), put on after rendering with
`record.mjs --remux --bed out/tracks/tech-house-vibes.mp3 --bpm 122 --from 16.307`.

- Output: `out/move-fast-{24,15,06}-{16x9,9x16}.mp4` — 1080p, 30 fps, H.264
  yuv420p CRF 18, faststart, AAC at −14 LUFS. `out/` is gitignored: video
  doesn't go in the repo.
- `--cut 15 --aspect v` narrows it; `--still 5200,12400` writes PNGs of those
  film times to check a frame.
- `--remux` keeps the picture and redoes only the sound. With
  `--bed track.mp3 --bpm 122 --from 16.27 --tag name` the bed is a licensed
  track retimed to 120 bpm, ducked under each tap and cut at "Mean it.",
  written beside the original as `…-name.mp4`.
- The run prints each file's tap holds and whips in frames: holds must be 12
  (400ms), whips 4.

### The After Effects kit

`elements.mjs` takes the :24 apart for an editor: each frame is drawn once
and captured once per element, the element alone on transparent (the page's
`solo` mode). Same `PLAYWRIGHT_MODULE` as above; ~30 min for both aspects.

- `out/ae-elements/{16x9,9x16}/`: `00-plate.mov` (ProRes 422 HQ: the footage,
  photo, vignette and black, exactly as in the spot) and a ProRes 4444
  clip with alpha for every element: each shot's type and column, the
  receipts, "Mean it." and its line, the end card's three parts, and the
  real-time tag per tap. These are full frame and trimmed in time. `stills/`
  has each element at rest.
- `audio/`: the synth mix plus stems that sum to it exactly, and the
  licensed beds retimed to 120 bpm.
- `timing.json` (shots, taps, whips, beats, the plate's per-frame recipe),
  `copy.txt`, `README.txt`, and `build-comp.jsx`. Run that in After Effects
  (File → Scripts → Run Script File…) to rebuild both comps with every layer
  at its in-point and markers on the shots and taps.

The background footage (`hero.mp4`, Mixkit 914) is 960×540, so it is soft
when filled to 1080p, more so in 9:16; it sits darkened behind the type and
the column, which are rendered sharp.

The one rule everything hangs on: **Earnest's work is sped up; your tap never
is.** Every send, payment or meeting on screen holds the frame for the tap.
