// Abertura do cartão do Saulo, montando a logo "Chave-casa":
// a casa é desenhada, uma chave entra girando e destranca a porta, a porta abre com luz,
// a chave sai e se encaixa na lateral da casa (a casa vira a cabeça da chave, como na logo),
// e aparecem o "SR", o nome e o CRECI.
//
// Uso: HMIntro.play()  -> toca a abertura (retorna uma Promise)
//      HMIntro.auto()  -> toca só na primeira visita da sessão
(function () {
  // Cores da marca
  const C = { dark: "#0F3D2E", green: "#1F6B4F", sage: "#8DAA91", cream: "#F5F3EC" };

  // Geometria da logo (mesma da arte do Saulo)
  const HOUSE = "M60 100 L141 30 L222 100 V197 H60 Z";       // casa = cabeça da chave
  const WALL_X = 222, SHAFT_Y = 147;                           // onde a haste sai da casa
  const SHAFT = 243;                                           // comprimento da haste
  const TEETH = [[144, 22, 35], [186, 20, 35]];                // [início, largura, altura] a partir da parede
  const DOOR = { x: 121, y: 140, w: 40, h: 57 };
  const KEYHOLE = { x: 153, y: 170 };

  // Haste com os dentes, desenhada a partir de x=0 (que encosta na casa)
  const shaft = (color) => `
    <rect x="0" y="-7" width="${SHAFT}" height="14" rx="7" fill="${color}"/>
    ${TEETH.map(([x, w, h]) => `<rect x="${x}" y="0" width="${w}" height="${h}" fill="${color}"/>`).join("")}`;
  // "SR" com o S em sálvia e o R em creme, como na logo sobre o verde
  const sr = (s, r, size = 64) => `<text x="141" y="180" text-anchor="middle" style="font: 600 ${size}px 'Cormorant Garamond', Georgia, serif; letter-spacing: -4px"><tspan fill="${s}">S</tspan><tspan fill="${r}">R</tspan></text>`;

  function markup(creci) {
    return `
  <button class="intro-skip" type="button">Pular abertura</button>
  <svg class="intro-stage sk-stage" viewBox="20 0 480 330" overflow="visible" aria-hidden="true">
    <defs>
      <radialGradient id="sk-glow">
        <stop offset="0" stop-color="#ffffff" stop-opacity=".9"/>
        <stop offset=".45" stop-color="${C.sage}" stop-opacity=".45"/>
        <stop offset="1" stop-color="${C.sage}" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="sk-inside"><path d="${HOUSE}"/></clipPath>
    </defs>

    <g clip-path="url(#sk-inside)"><ellipse id="sk-light" cx="141" cy="168" rx="110" ry="90" fill="url(#sk-glow)" opacity="0"/></g>

    <path id="sk-house" d="${HOUSE}" fill="none" stroke="${C.cream}" stroke-width="11" stroke-linejoin="round"/>

    <g id="sk-door">
      <rect x="${DOOR.x}" y="${DOOR.y}" width="${DOOR.w}" height="${DOOR.h}" rx="2" fill="${C.green}" stroke="${C.cream}" stroke-width="4"/>
      <circle cx="${KEYHOLE.x}" cy="${KEYHOLE.y - 3}" r="3" fill="${C.cream}"/>
      <rect x="${KEYHOLE.x - 1.5}" y="${KEYHOLE.y - 2}" width="3" height="7" rx="1" fill="${C.cream}"/>
    </g>

    <g id="sk-sr" opacity="0">${sr(C.sage, C.cream)}</g>

    <!-- chave que se move: argola + haste; a argola some quando a casa vira a cabeça -->
    <g id="sk-key">
      <circle id="sk-ring" cx="-16" cy="0" r="17" fill="none" stroke="${C.cream}" stroke-width="9"/>
      ${shaft(C.cream)}
    </g>

    <g id="sk-sign" opacity="0">
      <text x="262" y="262" text-anchor="middle" style="font: 500 38px 'Cormorant Garamond', Georgia, serif; letter-spacing: 11px" fill="${C.cream}">SAULO ROCHA</text>
      <text x="262" y="298" text-anchor="middle" style="font: 600 12.5px 'Montserrat', 'Manrope', sans-serif; letter-spacing: 5px" fill="${C.sage}">CORRETOR DE IMÓVEIS${creci ? ` · CRECI ${creci}` : ""}</text>
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
    const key = $("#sk-key"), ring = $("#sk-ring"), door = $("#sk-door"), house = $("#sk-house");
    const srEl = $("#sk-sr"), light = $("#sk-light"), sign = $("#sk-sign");

    const len = house.getTotalLength();
    house.style.strokeDasharray = len;
    // kx/ky = ponto da haste que encosta na casa (x=0 local); rot em graus
    const s = { draw: 0, kx: 620, ky: 40, rot: 900, flip: 1, ring: 1, door: 1, light: 0, sr: 0, srScale: .85, sign: 0 };
    function render() {
      house.style.strokeDashoffset = len * (1 - s.draw);
      key.setAttribute("transform", `translate(${s.kx} ${s.ky}) rotate(${s.rot}) scale(1 ${s.flip})`);
      ring.setAttribute("opacity", s.ring);
      door.setAttribute("transform", `translate(${DOOR.x} 0) scale(${Math.max(.02, s.door)} 1) translate(${-DOOR.x} 0)`);
      door.style.opacity = s.door < .05 ? 0 : 1;
      light.setAttribute("opacity", s.light);
      srEl.setAttribute("opacity", s.sr);
      srEl.setAttribute("transform", `translate(141 160) scale(${s.srScale}) translate(-141 -160)`);
      sign.setAttribute("opacity", s.sign);
    }

    // Na fechadura a chave fica virada (180°): a ponta entra no buraco e a argola fica à direita
    const lockX = KEYHOLE.x + SHAFT, lockY = KEYHOLE.y;
    const tl = gsap.timeline({ onUpdate: render, paused: true });
    tl.to(s, { draw: 1, duration: .9, ease: "power2.inOut" })
      // entra girando pela direita
      .to(s, { kx: lockX + 26, ky: lockY, rot: 180, duration: 1.1, ease: "power3.out" }, "-=.3")
      // encaixa e gira na fechadura
      .to(s, { kx: lockX, duration: .18, ease: "power1.in" })
      .to(s, { flip: -1, duration: .32, ease: "power2.inOut" })
      .to(s, { flip: 1, duration: .01 })
      // a porta abre e a casa acende
      .to(s, { kx: lockX + 40, duration: .3, ease: "power1.out" }, "+=.05")
      .to(s, { door: 0, duration: .5, ease: "power2.in" }, "<")
      .to(s, { light: 1, duration: .5 }, "<.15")
      // a chave dá meia-volta e encaixa na parede da casa: a casa vira a cabeça da chave
      .to(s, { rot: 360, kx: WALL_X + 70, ky: SHAFT_Y, duration: .55, ease: "power2.inOut" })
      .to(s, { kx: WALL_X, ring: 0, duration: .35, ease: "power3.in" })
      // SR, nome e CRECI
      .to(s, { sr: 1, srScale: 1, duration: .5, ease: "back.out(1.6)" }, "-=.05")
      .to(s, { light: .35, duration: .5 }, "<")
      .to(s, { sign: 1, duration: .5 }, "-=.15")
      .to({}, { duration: 1.5 });

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

  // Logo estática "Chave-casa". theme: "dark" (traço creme, para fundo verde) ou "light" (traço verde, para fundo creme)
  window.SRMark = (cls = "mark", theme = "dark") => {
    const line = theme === "dark" ? C.cream : C.dark;
    const s1 = theme === "dark" ? C.sage : C.green;
    return `
    <svg class="${cls}" viewBox="52 22 422 184" aria-label="Saulo Rocha">
      <path d="${HOUSE}" fill="none" stroke="${line}" stroke-width="11" stroke-linejoin="round"/>
      <g transform="translate(${WALL_X} ${SHAFT_Y})">${shaft(line)}</g>
      ${sr(s1, line)}
    </svg>`;
  };

  window.HMIntro = { play, auto };
})();
