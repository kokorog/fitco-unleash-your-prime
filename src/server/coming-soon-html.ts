// Static HTML for the public-facing Coming Soon response. Self-contained
// (no JS, no external assets except a Google font) so we can ship it from
// the request middleware without invoking the React route tree.

const HTML = `<!doctype html>
<html lang="bg">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#05070a" />
<title>FITCO — Coming Soon</title>
<meta property="og:title" content="FITCO — Coming Soon" />
<meta property="og:description" content="Something powerful is being crafted." />
<meta property="og:type" content="website" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    background: #05070a;
    color: #fff;
    font-family: "Inter", system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    position: relative;
  }
  .ambient {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.62 0.16 152 / 0.28), transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 110%, oklch(0.46 0.13 158 / 0.22), transparent 60%),
      radial-gradient(ellipse 50% 40% at 10% 90%, oklch(0.55 0.14 155 / 0.16), transparent 60%);
  }
  .grid {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.18;
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 56px 56px;
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%);
            mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%);
  }
  .orb {
    position: fixed; left: 50%; top: 50%;
    width: 520px; height: 520px;
    transform: translate(-50%, -50%);
    border-radius: 9999px;
    filter: blur(64px);
    background: conic-gradient(from 90deg, oklch(0.62 0.16 152 / 0.5), oklch(0.46 0.13 158 / 0), oklch(0.62 0.16 152 / 0.5));
    animation: orb 9s ease-in-out infinite;
    z-index: 0; pointer-events: none;
  }
  @keyframes orb {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
    50%      { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
  }
  .wrap { position: relative; z-index: 10; max-width: 72rem; margin: 0 auto; padding: 0 1.5rem; }
  header {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 1.5rem; padding-bottom: 1.5rem;
  }
  .brand { display: flex; align-items: center; gap: 0.625rem; }
  .dot {
    width: 2.25rem; height: 2.25rem; display: grid; place-items: center;
    border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(12px);
  }
  .dot span {
    width: 0.625rem; height: 0.625rem; border-radius: 9999px;
    background: oklch(0.72 0.18 152);
    box-shadow: 0 0 18px oklch(0.72 0.18 152 / 0.85);
  }
  .brand b {
    font-family: "Space Grotesk", "Inter", sans-serif;
    font-size: 1.125rem; font-weight: 600; letter-spacing: 0.2em;
  }
  .meta {
    display: none; align-items: center; gap: 0.75rem;
    font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.25em;
    color: rgba(255,255,255,0.5);
  }
  @media (min-width: 640px) { .meta { display: inline-flex; } }
  .live {
    display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .live i {
    width: 0.375rem; height: 0.375rem; border-radius: 9999px; background: #34d399;
    animation: pulse 1.6s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
  main {
    position: relative; z-index: 10;
    max-width: 72rem; margin: 0 auto; padding: 0 1.5rem;
    min-height: calc(100vh - 180px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
  }
  .pill {
    display: inline-flex; align-items: center; gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 0.375rem 1rem; border-radius: 9999px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    font-size: 0.6875rem; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.25em;
    color: rgba(255,255,255,0.7);
  }
  .pill i { width: 0.375rem; height: 0.375rem; border-radius: 9999px; background: #34d399; }
  h1 {
    font-family: "Space Grotesk", "Inter", sans-serif;
    font-weight: 600; line-height: 0.95; letter-spacing: -0.02em;
    font-size: clamp(3rem, 12vw, 8rem);
    margin: 0;
  }
  h1 .l1 {
    display: block;
    background: linear-gradient(180deg, #fff, rgba(255,255,255,0.4));
    -webkit-background-clip: text; background-clip: text;
    color: transparent;
  }
  h1 .l2 {
    display: block;
    background: linear-gradient(120deg, oklch(0.85 0.16 152), oklch(0.62 0.16 152) 50%, oklch(0.45 0.13 158));
    -webkit-background-clip: text; background-clip: text;
    color: transparent;
  }
  p.lead {
    margin-top: 2rem; max-width: 36rem;
    font-size: 1rem; color: rgba(255,255,255,0.6);
    text-wrap: balance;
  }
  @media (min-width: 640px) { p.lead { font-size: 1.125rem; } }
  .offer {
    margin-top: 2.5rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.875rem;
  }
  .offer-label {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.6875rem; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.3em;
    color: rgba(255,255,255,0.55);
  }
  .offer-label i {
    width: 0.375rem; height: 0.375rem; border-radius: 9999px; background: #f87171;
    box-shadow: 0 0 12px rgba(248,113,113,0.8);
    animation: pulse 1.4s ease-in-out infinite;
  }
  .timer {
    display: inline-flex; align-items: stretch; gap: 0.5rem;
    padding: 0.875rem 1.25rem;
    border-radius: 1rem;
    border: 1px solid rgba(255,255,255,0.12);
    background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    backdrop-filter: blur(14px);
    box-shadow: 0 20px 60px -20px oklch(0.62 0.16 152 / 0.35), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .timer .unit {
    display: flex; flex-direction: column; align-items: center;
    min-width: 3.75rem;
  }
  .timer .num {
    font-family: "Space Grotesk", "Inter", sans-serif;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    line-height: 1;
    background: linear-gradient(180deg, #fff, rgba(255,255,255,0.55));
    -webkit-background-clip: text; background-clip: text;
    color: transparent;
    letter-spacing: -0.02em;
  }
  .timer .lbl {
    margin-top: 0.5rem;
    font-size: 0.5625rem; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.25em;
    color: rgba(255,255,255,0.45);
  }
  .timer .sep {
    font-family: "Space Grotesk", "Inter", sans-serif;
    font-weight: 600;
    font-size: clamp(1.5rem, 4.5vw, 2.25rem);
    line-height: 1;
    color: rgba(255,255,255,0.25);
    align-self: flex-start;
    padding-top: 0.15em;
  }
  .divider {
    margin-top: 3rem;
    display: flex; align-items: center; gap: 0.75rem;
    width: 100%; max-width: 28rem;
  }
  .divider .line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
  .divider span {
    font-family: ui-monospace, "JetBrains Mono", monospace;
    font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.3em;
    color: rgba(255,255,255,0.4);
  }
  .rings { position: relative; margin-top: 3.5rem; height: 8rem; width: 100%; max-width: 24rem; }
  .rings .r { position: absolute; border-radius: 9999px; border: 1px solid; }
  .rings .r1 { inset: 0;   border-color: rgba(255,255,255,0.10); }
  .rings .r2 { inset: 1rem;  border-color: rgba(255,255,255,0.05); }
  .rings .r3 { inset: 2rem;  border-color: rgba(255,255,255,0.05); }
  .rings .core {
    position: absolute; left: 50%; top: 50%;
    width: 0.5rem; height: 0.5rem; transform: translate(-50%, -50%);
    border-radius: 9999px;
    background: #6ee7b7;
    box-shadow: 0 0 24px oklch(0.72 0.18 152 / 0.9);
  }
  footer {
    position: relative; z-index: 10;
    max-width: 72rem; margin: 0 auto; padding: 1.5rem 1.5rem 2rem;
  }
  footer .row {
    display: flex; flex-direction: column; align-items: center; justify-content: space-between;
    gap: 0.75rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);
    font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(255,255,255,0.4);
  }
  @media (min-width: 640px) { footer .row { flex-direction: row; } }
  a.access-link {
    color: rgba(255,255,255,0.4); text-decoration: none;
    border-bottom: 1px dotted rgba(255,255,255,0.2);
  }
  a.access-link:hover { color: rgba(255,255,255,0.7); }
</style>
</head>
<body>
  <div class="ambient" aria-hidden="true"></div>
  <div class="grid" aria-hidden="true"></div>
  <div class="orb" aria-hidden="true"></div>

  <div class="wrap">
    <header>
      <div class="brand">
        <div class="dot"><span></span></div>
        <b>FITCO</b>
      </div>
      <div class="meta">
        <span class="live"><i></i>Stealth Mode</span>
      </div>
    </header>
  </div>

  <main>
    <span class="pill"><i></i>В подготовка · 2026</span>
    <h1>
      <span class="l1">Coming</span>
      <span class="l2">Soon.</span>
    </h1>
    <p class="lead">Something powerful is being crafted. A new standard for movement, performance and discipline — designed in silence.</p>

    <div class="offer" role="timer" aria-live="polite">
      <span class="offer-label"><i></i>Специалната оферта изтича след</span>
      <div class="timer">
        <div class="unit"><span class="num" id="t-h">10</span><span class="lbl">часа</span></div>
        <span class="sep">:</span>
        <div class="unit"><span class="num" id="t-m">15</span><span class="lbl">минути</span></div>
        <span class="sep">:</span>
        <div class="unit"><span class="num" id="t-s">00</span><span class="lbl">секунди</span></div>
      </div>
    </div>

    <div class="divider">
      <div class="line"></div>
      <span>FITCO ⁄ STEALTH</span>
      <div class="line"></div>
    </div>

    <div class="rings" aria-hidden="true">
      <div class="r r1"></div>
      <div class="r r2"></div>
      <div class="r r3"></div>
      <div class="core"></div>
    </div>
  </main>

  <footer>
    <div class="row">
      <span>© <span id="y"></span> FITCO. All rights reserved.</span>
      <span>contact: support@fitcoapp.com · <a class="access-link" href="/access">private access</a></span>
    </div>
  </footer>

  <script>document.getElementById('y').textContent = new Date().getFullYear();</script>
  <script>
    (function(){
      var total = 10*3600 + 15*60; // 10:15:00 — resets every page load
      var h = document.getElementById('t-h');
      var m = document.getElementById('t-m');
      var s = document.getElementById('t-s');
      var pad = function(n){ return n < 10 ? '0' + n : '' + n; };
      function tick(){
        if (total < 0) total = 0;
        var hh = Math.floor(total / 3600);
        var mm = Math.floor((total % 3600) / 60);
        var ss = total % 60;
        h.textContent = pad(hh);
        m.textContent = pad(mm);
        s.textContent = pad(ss);
        if (total > 0) total -= 1;
      }
      tick();
      setInterval(tick, 1000);
    })();
  </script>
</body>
</html>`;

export function getComingSoonHtml(): string {
  return HTML;
}