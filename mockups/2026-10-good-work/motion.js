/* Motion for the "Do good work" concepts: the ambient video under a hero or
   in a band, the app sequence that scrubs with scroll (Apple's iPhone-page
   move: a sticky stage, a frame per scroll step, captions that follow), and a
   small reveal for copy coming into view. Everything respects
   prefers-reduced-motion: videos stay on their poster, the sequence shows
   its last frame with every caption, nothing slides. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Ambient video: fades in once it is actually playing; the still under it is the fallback. */
  [].slice.call(document.querySelectorAll('video[data-ambient]')).forEach(function (v) {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    v.muted = true; v.loop = true; v.playsInline = true;
    var on = function () { v.classList.add('on'); };
    v.addEventListener('playing', on);
    var tryPlay = function () { if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } };
    tryPlay();
    // A browser that refused autoplay, or paused a hidden tab, gets another go on the first gesture and on becoming visible.
    ['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach(function (ev) { addEventListener(ev, tryPlay, { passive: true, once: true }); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) tryPlay(); });
  });

  /* ── Reveal: position-based, so copy that is already above the viewport (a deep link, a jump) is in, not stuck hidden. */
  var rv = [].slice.call(document.querySelectorAll('[data-reveal]'));
  if (reduce) rv.forEach(function (el) { el.classList.add('in'); });
  else {
    var pending = rv.slice(), rraf = null;
    function check() { rraf = null; var lim = innerHeight * 0.92; pending = pending.filter(function (el) { var t = el.getBoundingClientRect().top; if (t < lim) { el.classList.add('in'); return false; } return true; }); }
    function onRv() { if (rraf) return; rraf = requestAnimationFrame(check); }
    addEventListener('scroll', onRv, { passive: true }); addEventListener('resize', onRv); check();
  }

  /* ── The creed: "Good work" holds while the lines arrive, one per scroll step. */
  [].slice.call(document.querySelectorAll('.creed')).forEach(function (sec) {
    var lis = [].slice.call(sec.querySelectorAll('.creed__lines li')), n = lis.length;
    if (!n) return;
    if (reduce) { lis.forEach(function (l) { l.classList.add('on'); }); return; }
    function progress() { var r = sec.getBoundingClientRect(), total = r.height - innerHeight; if (total <= 0) return 1; return Math.min(1, Math.max(0, -r.top / total)); }
    function tick() {
      var p = progress(), k = Math.min(n - 1, Math.floor(p * (n + 0.6)));
      lis.forEach(function (l, i) { l.classList.toggle('seen', i < k); l.classList.toggle('on', i === k); });
      sec.classList.toggle('turn-on', lis[k].classList.contains('turn'));
      sec.classList.toggle('done', p > 0.9);
    }
    var raf = null; function onScroll() { if (raf) return; raf = requestAnimationFrame(function () { raf = null; tick(); }); }
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); tick();
  });

  /* ── The sequence. <section class="scrub" data-scrub="path/f-{n}.jpg" data-count="100" data-pad="3"> */
  [].slice.call(document.querySelectorAll('.scrub')).forEach(function (sec) {
    var tpl = sec.getAttribute('data-scrub'), n = parseInt(sec.getAttribute('data-count'), 10) || 1, pad = parseInt(sec.getAttribute('data-pad'), 10) || 3;
    var cv = sec.querySelector('canvas'), ctx = cv.getContext('2d'), stage = cv.parentElement;
    var caps = [].slice.call(sec.querySelectorAll('.scrub__cap')).map(function (c) { return { el: c, at: parseFloat(c.getAttribute('data-at')) || 0 }; });
    var frames = new Array(n), loaded = 0, cur = -1, want = 0;
    function src(i) { var s = String(i + 1); while (s.length < pad) s = '0' + s; return tpl.replace('{n}', s); }
    function size() { var r = stage.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); cur = -1; draw(want); }
    function draw(i) {
      var im = frames[i]; if (!im || !im.complete || !im.naturalWidth) { /* nearest loaded */ for (var k = 1; k < n; k++) { var a = frames[i - k], b = frames[i + k]; if (a && a.complete && a.naturalWidth) { im = a; break; } if (b && b.complete && b.naturalWidth) { im = b; break; } } }
      if (!im) return; if (i === cur) return; cur = i;
      var W = cv.width, H = cv.height, s = Math.max(W / im.naturalWidth, H / im.naturalHeight), w = im.naturalWidth * s, h = im.naturalHeight * s;
      ctx.clearRect(0, 0, W, H); ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
    }
    function setCaps(p) { var on = 0; caps.forEach(function (c, i) { if (p >= c.at) on = i; }); caps.forEach(function (c, i) { c.el.classList.toggle('on', reduce ? true : i === on); }); }
    function progress() { var r = sec.getBoundingClientRect(), vh = innerHeight, total = r.height - vh; if (total <= 0) return 1; return Math.min(1, Math.max(0, -r.top / total)); }
    function tick() { var p = progress(); want = Math.round(p * (n - 1)); draw(want); setCaps(p); sec.classList.toggle('done', p > 0.9); }
    // Load the first frame now, the rest in order; redraw as they land.
    for (var i = 0; i < n; i++) (function (i) { var im = new Image(); im.decoding = 'async'; im.onload = function () { loaded++; if (i === want || cur < 0) { cur = -1; draw(want); } }; frames[i] = im; })(i);
    frames[0].src = src(0);
    var q = 1; (function more() { if (q >= n) return; var im = frames[q++]; im.src = src(q - 1); im.onload = (function (f) { return function () { loaded++; f && f(); more(); }; })(im.onload); im.onerror = more; })();
    for (var j = 1; j < 4 && j < n; j++) { if (!frames[j].src) frames[j].src = src(j); }
    size(); addEventListener('resize', size);
    if (reduce) { want = n - 1; frames[n - 1].src = src(n - 1); frames[n - 1].onload = function () { cur = -1; draw(n - 1); }; setCaps(1); return; }
    var raf = null; function onScroll() { if (raf) return; raf = requestAnimationFrame(function () { raf = null; tick(); }); }
    addEventListener('scroll', onScroll, { passive: true }); tick();
  });
})();
