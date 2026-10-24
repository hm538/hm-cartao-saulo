// Abertura do cartão do Saulo: a casa é desenhada, a chave entra girando, destranca a porta,
// a porta abre, a chave vai para o lado da casa (como na logo) e aparecem o "SR" e o CRECI.
//
// Uso: HMIntro.play()  -> toca a abertura (retorna uma Promise)
//      HMIntro.auto()  -> toca só na primeira visita da sessão
(function () {
  const KEYHOLE = { x: 214, y: 246 };   // fechadura da porta
  const SHAFT = 78;                     // da argola até a ponta da chave

  // Chave desenhada com a argola em (0,0) e a ponta para a direita
  const KEY = `
    <circle cx="0" cy="0" r="16" fill="none" stroke="url(#sk-gold)" stroke-width="7"/>
    <circle cx="0" cy="0" r="4.5" fill="url(#sk-gold)"/>
    <rect x="14" y="-3.5" width="${SHAFT - 14}" height="7" rx="2" fill="url(#sk-gold)"/>
    <rect x="58" y="0" width="7" height="13" rx="1.5" fill="url(#sk-gold)"/>
    <rect x="69" y="0" width="6" height="9" rx="1.5" fill="url(#sk-gold)"/>`;

  function markup(creci) {
    return `
  <button class="intro-skip" type="button">Pular abertura</button>
  <svg class="intro-stage sk-stage" viewBox="0 0 400 380" overflow="visible" aria-hidden="true">
    <defs>
      <linearGradient id="sk-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f6e7c1"/><stop offset=".45" stop-color="#d4af64"/>
        <stop offset=".7" stop-color="#a8823e"/><stop offset="1" stop-color="#e9cf91"/>
      </linearGradient>
      <radialGradient id="sk-glow">
        <stop offset="0" stop-color="#ffe9b0" stop-opacity=".95"/>
        <stop offset=".5" stop-color="#e2b65a" stop-opacity=".35"/>
        <stop offset="1" stop-color="#e2b65a" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="sk-inside"><rect x="112" y="142" width="176" height="136"/></clipPath>
    </defs>

    <!-- luz de dentro da casa -->
    <g clip-path="url(#sk-inside)"><ellipse id="sk-light" cx="200" cy="240" rx="150" ry="120" fill="url(#sk-glow)" opacity="0"/></g>

    <!-- casa -->
    <g fill="none" stroke="url(#sk-gold)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path class="sk-draw" d="M86 154 L200 60 L314 154"/>
      <path class="sk-draw" d="M112 140 V280 H288 V140"/>
      <path class="sk-draw" d="M262 108 V78 H284 V126"/>
    </g>

    <!-- porta (abre girando pela dobradiça da esquerda) -->
    <g id="sk-door">
      <rect x="172" y="198" width="56" height="82" rx="3" fill="#13221e" stroke="url(#sk-gold)" stroke-width="5"/>
      <circle cx="${KEYHOLE.x}" cy="${KEYHOLE.y - 4}" r="3.5" fill="url(#sk-gold)"/>
      <rect x="${KEYHOLE.x - 1.5}" y="${KEYHOLE.y - 2}" width="3" height="8" rx="1" fill="url(#sk-gold)"/>
    </g>

    <!-- SR dentro da casa -->
    <text id="sk-sr" x="200" y="252" text-anchor="middle" opacity="0"
      style="font: 600 78px 'Fraunces', Georgia, serif; letter-spacing: -2px" fill="url(#sk-gold)">SR</text>

    <!-- chave -->
    <g id="sk-key">${KEY}</g>

    <!-- nome e CRECI -->
    <g id="sk-sign" opacity="0">
      <text x="200" y="326" text-anchor="middle" style="font: 500 22px 'Fraunces', Georgia, serif; letter-spacing: 6px" fill="#f3eee4">SAULO ROCHA</text>
      <text x="200" y="354" text-anchor="middle" style="font: 500 13px 'IBM Plex Mono', monospace; letter-spacing: 4px" fill="#d9b878">${creci ? `CRECI ${creci}` : "CORRETOR DE IMÓVEIS"}</text>
    </g>
  </svg>`;
  }

  function play() {
    if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
    const creci = (window.HM_PROFILE && window.HM_PROFILE.creci) || "";
    const root = document.createElement("div");
    root.className = "intro sk-intro";
    root.innerHTML = markup(creci);
    document.body.appendChild(root);
    const $ = s => root.querySelector(s);
    const key = $("#sk-key"), door = $("#sk-door"), sr = $("#sk-sr"), light = $("#sk-light"), sign = $("#sk-sign");
    const draws = [...root.querySelectorAll(".sk-draw")];

    // Estado animado; render() aplica no SVG
    const s = { draw: 0, kx: -120, ky: 120, rot: -720, flip: 1, door: 1, light: 0, sr: 0, srScale: .8, sign: 0 };
    const lens = draws.map(p => p.getTotalLength());
    draws.forEach((p, i) => { p.style.strokeDasharray = lens[i]; });
    function render() {
      draws.forEach((p, i) => { p.style.strokeDashoffset = lens[i] * (1 - s.draw) });
      key.setAttribute("transform", `translate(${s.kx} ${s.ky}) rotate(${s.rot}) scale(1 ${s.flip})`);
      door.setAttribute("transform", `translate(172 0) scale(${Math.max(.02, s.door)} 1) translate(-172 0)`);
      door.style.opacity = s.door < .05 ? 0 : 1;
      light.setAttribute("opacity", s.light);
      sr.setAttribute("opacity", s.sr);
      sr.setAttribute("transform", `translate(200 230) scale(${s.srScale}) translate(-200 -230)`);
      sign.setAttribute("opacity", s.sign);
    }

    // Posição da argola para a ponta da chave ficar na fechadura
    const lockX = KEYHOLE.x - SHAFT, lockY = KEYHOLE.y;
    const tl = gsap.timeline({ onUpdate: render, paused: true });
    tl.to(s, { draw: 1, duration: 1, ease: "power2.inOut" })
      // a chave entra girando
      .to(s, { kx: lockX - 18, ky: lockY, rot: 0, duration: 1.1, ease: "power3.out" }, "-=.35")
      // encaixa e gira na fechadura
      .to(s, { kx: lockX, duration: .2, ease: "power1.in" })
      .to(s, { flip: -1, duration: .35, ease: "power2.inOut" })
      .to(s, { flip: 1, duration: .01 })
      // a porta abre e a luz acende
      .to(s, { kx: lockX - 22, duration: .25, ease: "power1.out" }, "+=.05")
      .to(s, { door: 0, duration: .55, ease: "power2.in" }, "<")
      .to(s, { light: 1, duration: .6 }, "<.2")
      // a chave vai para o lado da casa, inclinada como na logo
      .to(s, { kx: 336, ky: 168, rot: 62, duration: .8, ease: "power2.inOut" }, "-=.2")
      // aparece o SR e o nome com o CRECI
      .to(s, { sr: 1, srScale: 1, duration: .55, ease: "back.out(1.6)" }, "-=.35")
      .to(s, { sign: 1, duration: .5 }, "-=.2")
      .to(s, { light: .55, duration: .6 }, "<")
      .to({}, { duration: 1.4 });

    return new Promise(resolve => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        root.classList.add("intro-out");
        document.documentElement.classList.remove("intro-lock");
        setTimeout(() => { tl.kill(); root.remove(); resolve() }, 650);
      };
      tl.call(finish);
      $(".intro-skip").addEventListener("click", finish);
      document.documentElement.classList.add("intro-lock");
      render();
      tl.play();
    });
  }

  function auto() {
    let seen = false;
    try { seen = sessionStorage.getItem("sr-intro") === "1"; sessionStorage.setItem("sr-intro", "1") } catch {}
    return seen ? Promise.resolve() : play();
  }

  // Logo estática (casa + chave + SR) usada no topo e no rodapé
  window.SRMark = (cls = "mark") => `
    <svg class="${cls}" viewBox="60 50 320 250" aria-label="Saulo Rocha">
      <g fill="none" stroke="url(#sk-gold-m)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M86 154 L200 60 L314 154"/><path d="M112 140 V280 H288 V140"/><path d="M262 108 V78 H284 V126"/>
      </g>
      <text x="200" y="252" text-anchor="middle" style="font: 600 78px 'Fraunces', Georgia, serif; letter-spacing: -2px" fill="url(#sk-gold-m)">SR</text>
      <g transform="translate(336 168) rotate(62)" fill="url(#sk-gold-m)">${KEY.replace(/url\(#sk-gold\)/g, "url(#sk-gold-m)")}</g>
    </svg>`;

  window.HMIntro = { play, auto };
})();
