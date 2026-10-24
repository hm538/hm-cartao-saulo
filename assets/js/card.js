// Monta o cartão do Saulo a partir de assets/js/perfil.js.
(function () {
  const person = window.HM_PROFILE;
  const intents = window.HM_INTENTS || [];
  const projects = window.HM_PROJECTS || [];
  const company = window.HM_COMPANY;

  const icons = {
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    whatsapp: '<path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z"/><path d="M8.5 9.5c.3 2.4 2.3 4.6 5 5.2l1.2-1.2 2 .9"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3"/>'
  };
  const icon = (n, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[n] || icons.arrow}</svg>`;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const wa = msg => `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(msg)}`;
  const ig = handle => `https://instagram.com/${handle}`;
  const mark = (cls = "mark") => window.SRMark ? window.SRMark(cls) : "";

  const defs = "";

  function link(href, ic, title, sub, primary) {
    return `<a class="link${primary ? " primary" : ""}" href="${esc(href)}" target="_blank" rel="noopener">
      <span class="ic">${icon(ic)}</span>
      <span><strong>${esc(title)}</strong><small>${esc(sub)}</small></span>
      ${icon("arrow", "i arrow")}
    </a>`;
  }

  const p = person;
  const first = p.name.split(" ")[0];
  const quick = [
    `<a href="tel:${p.phone.replace(/[^\d+]/g, "")}">${icon("phone")}Ligar</a>`,
    `<a href="${wa(p.whatsappMsg)}" target="_blank" rel="noopener">${icon("whatsapp")}WhatsApp</a>`,
    `<a href="${ig(p.instagram)}" target="_blank" rel="noopener">${icon("instagram")}Instagram</a>`,
    `<button type="button" data-share>${icon("share")}Compartilhar</button>`
  ].join("");

  const projectCard = e => `
    <a class="proj-card" href="${esc(e.link || wa(e.msg || `Olá, ${first}! Quero saber mais sobre o ${e.name}.`))}" target="_blank" rel="noopener">
      ${e.image ? `<img src="${esc(e.image)}" alt="${esc(e.name)}" loading="lazy">` : `<span class="proj-ic">${icon("building")}</span>`}
      <span class="proj-tx"><strong>${esc(e.name)}</strong><small>${esc(e.place || "")}</small></span>
      ${icon("arrow", "i arrow")}
    </a>`;

  const html = `
    <header class="top rise">
      <span class="brand sr-brand">${mark()}<span>Saulo Rocha<small>CRECI ${esc(p.creci)}</small></span></span>
      <button class="icon-btn" type="button" data-share aria-label="Compartilhar cartão">${icon("share")}</button>
    </header>

    <div class="hero">
      <div class="profile rise" style="animation-delay:.08s">
        <div class="avatar"><img src="${esc(p.photo)}" alt="Foto de ${esc(p.name)}"></div>
        <article class="card" id="card">
          <span class="chip status"><span class="dot"></span>${esc(p.status)}</span>
          <h1>${esc(p.name)}<span class="dot-end">.</span></h1>
          <p class="role">${esc(p.role)}${p.creci ? ` · CRECI ${esc(p.creci)}` : ""}</p>
          <div class="bio">${p.bio.map(t => `<p>${esc(t)}</p>`).join("")}</div>
          <p class="signature">${esc(p.signature)}</p>
          <button class="save" type="button" data-vcard>${icon("download")}Salvar na agenda</button>
        </article>
      </div>
      <nav class="quick rise" style="animation-delay:.16s" aria-label="Ações rápidas">${quick}</nav>
      <div class="links rise" style="animation-delay:.24s">
        ${link(wa(p.whatsappMsg), "whatsapp", "Fale comigo no WhatsApp", "Atendo pessoalmente", true)}
        ${link(ig(p.instagram), "instagram", "Me siga no Instagram", `@${p.instagram}`)}
      </div>
    </div>

    <section aria-labelledby="s-help">
      <div class="sec-head">
        <span class="eyebrow">Como posso te ajudar</span>
        <h2 id="s-help">Comprar, vender ou investir, <span>é só escolher.</span></h2>
      </div>
      <div class="links">${intents.map(i => link(wa(i.msg), i.icon, i.title, i.sub)).join("")}</div>
    </section>

    ${projects.length ? `
    <section aria-labelledby="s-proj">
      <div class="sec-head">
        <span class="eyebrow">Empreendimentos</span>
        <h2 id="s-proj">Onde eu atendo <span>agora.</span></h2>
      </div>
      <div class="proj-list">${projects.map(projectCard).join("")}</div>
    </section>` : ""}

    <div class="qr">
      <div class="qr-box" id="qr" role="img" aria-label="QR code deste cartão"></div>
      <div><h3>Aponte a câmera</h3><p>Este QR code abre o cartão do ${esc(first)}. Mostre na tela e a pessoa já sai com o contato salvo.</p></div>
    </div>

    <section class="cta" aria-labelledby="s-cta">
      <span class="eyebrow" style="color:var(--ice)">Vamos conversar</span>
      <h2 id="s-cta">Seu próximo <em>endereço</em> pode estar a uma mensagem.</h2>
      ${link(wa(p.whatsappMsg), "whatsapp", `Chamar o ${first}`, "WhatsApp " + p.phone.replace("+55 ", ""), true)}
    </section>

    <footer>
      ${mark("mark foot-mark")}
      <span class="tagline">${esc(p.signature)}</span>
      <div class="foot-row"><span>© ${new Date().getFullYear()} Saulo Rocha</span><button type="button" data-replay>Rever abertura</button></div>
      <a class="credit" href="${esc(company.site)}" target="_blank" rel="noopener">Cartão feito por <img src="${esc(company.logo)}" alt="" width="1000" height="586"> HM Digital</a>
    </footer>`;

  // ---------- render ----------
  document.body.insertAdjacentHTML("afterbegin", defs);
  const main = document.createElement("main");
  main.className = "wrap";
  main.innerHTML = html;
  document.body.appendChild(main);
  document.body.insertAdjacentHTML("beforeend", '<div class="toast" id="toast" role="status" aria-live="polite"></div>');

  // ---------- comportamento ----------
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("on"), 2400);
  }

  document.querySelectorAll("[data-share]").forEach(b => b.addEventListener("click", async () => {
    const data = { title: `${p.name} · ${p.role}`, url: location.href };
    if (navigator.share) { try { await navigator.share(data); return } catch (e) { if (e.name === "AbortError") return } }
    try { await navigator.clipboard.writeText(location.href); toast("Link copiado") } catch { toast(location.href) }
  }));

  document.querySelectorAll("[data-vcard]").forEach(b => b.addEventListener("click", () => {
    const [given, ...rest] = p.name.split(" ");
    const vcf = [
      "BEGIN:VCARD", "VERSION:3.0",
      `N:${rest.join(" ")};${given};;;`, `FN:${p.name}`,
      `ORG:${p.company}`, `TITLE:${p.role}${p.creci ? " · CRECI " + p.creci : ""}`,
      `TEL;TYPE=CELL:${p.phone.replace(/[^\d+]/g, "")}`,
      p.email ? `EMAIL;TYPE=WORK:${p.email}` : "",
      `URL:${location.href}`,
      `X-SOCIALPROFILE;TYPE=instagram:${ig(p.instagram)}`,
      "END:VCARD"
    ].filter(Boolean).join("\r\n");
    const url = URL.createObjectURL(new Blob([vcf], { type: "text/vcard" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "saulo-rocha.vcf" });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Contato baixado. Abra o arquivo para salvar.");
  }));

  const qr = document.getElementById("qr");
  if (qr && window.qrcode) {
    const code = qrcode(0, "M");
    code.addData(location.href);
    code.make();
    qr.innerHTML = code.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  } else if (qr) qr.closest(".qr").hidden = true;

  const card = document.getElementById("card");
  if (card && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", x * 100 + "%");
      card.style.setProperty("--my", y * 100 + "%");
      card.style.transform = `perspective(900px) rotateX(${(.5 - y) * 4}deg) rotateY(${(x - .5) * 6}deg)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = "" });
  }

  document.querySelectorAll("[data-replay]").forEach(b => b.addEventListener("click", () => {
    scrollTo({ top: 0 });
    window.HMIntro && HMIntro.play();
  }));
  window.HMIntro && HMIntro.auto();
})();
