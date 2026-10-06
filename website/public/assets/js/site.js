/* =========================================================
   BuildTogether — site script
   Edit SITE below to change contact details everywhere.
   ========================================================= */
const SITE = {
  email: "hello@buildtogether.co.in",          // TODO: confirm inbox
  whatsapp: "910000000000",                    // TODO: country code + number, digits only
  phoneDisplay: "+91 00000 00000",             // TODO
  location: "India · Serving clients in the US, India & worldwide",
  linkedin: "https://www.linkedin.com/company/buildtogether",  // TODO
  // Optional: a Formspree (or similar) endpoint, e.g. "https://formspree.io/f/abcdwxyz".
  // When empty, the form falls back to opening the visitor's email app.
  formEndpoint: "",
};

document.documentElement.classList.remove("no-js");

const ICON = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.81 11.81 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.41"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
};

const LOGO = `<a class="logo" href="/" aria-label="BuildTogether home">
  <svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
    <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f5bff"/><stop offset=".55" stop-color="#7a4dff"/><stop offset="1" stop-color="#19c3e6"/></linearGradient></defs>
    <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#lg)"/>
    <path d="M12 12h9a5 5 0 0 1 0 10h-9zM12 22h10a5 5 0 0 1 0 10H12z" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/>
    <circle cx="29" cy="12" r="2.4" fill="#fff"/>
  </svg>
  <span>Build<em>Together</em></span></a>`;

const NAV = [
  ["/services", "ERPNext Services"],
  ["/ai-automation", "AI & Automation"],
  ["/industries", "Industries"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

const waLink = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg || "Hi BuildTogether, I'd like to discuss a project.")}`;

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const path = location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  const links = NAV.map(([href, label]) => `<a href="${href}"${path === href ? ' class="active"' : ""}>${label}</a>`).join("");
  el.innerHTML = `<div class="container nav">
    ${LOGO}
    <nav class="nav-links" id="nav-links" aria-label="Main">
      ${links}
      <div class="nav-cta"><a class="btn btn-primary" href="/contact">Book a consultation</a></div>
    </nav>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">${ICON.menu}</button>
  </div>`;
  const toggle = el.querySelector(".nav-toggle");
  const menu = el.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.innerHTML = open ? ICON.close : ICON.menu;
    el.classList.toggle("solid", open);
  });
  const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `<div class="container">
    <div class="foot-grid">
      <div>
        ${LOGO}
        <p style="max-width:340px">AI-first ERPNext partner. We implement, customise and automate Frappe/ERPNext, and build AI into the way your business runs.</p>
        <div class="socials">
          <a href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICON.li}</a>
          <a href="mailto:${SITE.email}" aria-label="Email">${ICON.mail}</a>
          <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a>
        </div>
      </div>
      <div><h4>ERPNext</h4><ul>
        <li><a href="/services#implementation">Implementation</a></li>
        <li><a href="/services#customization">Customisation</a></li>
        <li><a href="/services#integrations">Integrations</a></li>
        <li><a href="/services#migration">Migration</a></li>
        <li><a href="/services#support">Support &amp; AMC</a></li>
      </ul></div>
      <div><h4>AI</h4><ul>
        <li><a href="/ai-automation#agents">AI agents for ERP</a></li>
        <li><a href="/ai-automation#documents">Document AI</a></li>
        <li><a href="/ai-automation#workflows">Workflow automation</a></li>
        <li><a href="/ai-automation#insights">Analytics &amp; forecasting</a></li>
      </ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="/about">About us</a></li>
        <li><a href="/industries">Industries</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
      </ul></div>
    </div>
    <div class="foot-bottom">
      <span>© ${year} BuildTogether. All rights reserved.</span>
      <span>${SITE.location}</span>
    </div>
  </div>`;

  const fab = document.createElement("a");
  fab.className = "wa-float";
  fab.href = waLink();
  fab.target = "_blank";
  fab.rel = "noopener";
  fab.setAttribute("aria-label", "Chat on WhatsApp");
  fab.innerHTML = ICON.wa;
  document.body.appendChild(fab);
}

/* Fill [data-site] placeholders (email, phone, etc.) */
function fillSiteData() {
  document.querySelectorAll("[data-site]").forEach((n) => {
    const k = n.dataset.site;
    if (k === "email") { n.textContent = SITE.email; if (n.tagName === "A") n.href = `mailto:${SITE.email}`; }
    if (k === "phone") n.textContent = SITE.phoneDisplay;
    if (k === "location") n.textContent = SITE.location;
  });
  document.querySelectorAll("[data-wa]").forEach((a) => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll("[data-mail]").forEach((a) => { a.href = `mailto:${SITE.email}`; });
}

/* Scroll reveal */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((i) => io.observe(i));
}

/* Count-up numbers: <b data-count="40" data-suffix="%"> */
function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run = (el) => {
    const end = parseFloat(el.dataset.count), suf = el.dataset.suffix || "", pre = el.dataset.prefix || "";
    if (reduce) { el.textContent = pre + end + suf; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = pre + v + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .5 });
  els.forEach((e) => io.observe(e));
}

/* Hero console: reveals lines one by one, then loops */
function initConsole() {
  const body = document.querySelector("[data-console]");
  if (!body) return;
  const lines = [...body.querySelectorAll(".console-line")];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { lines.forEach((l) => l.classList.add("show")); return; }
  let i = 0;
  const step = () => {
    if (i < lines.length) { lines[i++].classList.add("show"); setTimeout(step, 650); }
    else setTimeout(() => { lines.forEach((l) => l.classList.remove("show")); i = 0; setTimeout(step, 600); }, 4200);
  };
  setTimeout(step, 500);
}

/* Subtle neural-network canvas in dark heroes */
function initNeural() {
  const c = document.getElementById("neural");
  if (!c || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = c.getContext("2d");
  let w, h, pts, raf;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(70, Math.floor((w * h) / 18000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let a = 0; a < pts.length; a++) {
      for (let b = a + 1; b < pts.length; b++) {
        const dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y, d = dx * dx + dy * dy;
        if (d < 15000) {
          ctx.strokeStyle = `rgba(120,160,255,${.16 * (1 - d / 15000)})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(160,190,255,.55)";
      ctx.beginPath(); ctx.arc(pts[a].x, pts[a].y, 1.4, 0, Math.PI * 2); ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };
  resize(); draw();
  window.addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); draw(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else draw(); });
}

/* Contact form: email (endpoint or mailto) + WhatsApp */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  const data = () => {
    const f = new FormData(form);
    return {
      name: (f.get("name") || "").trim(), email: (f.get("email") || "").trim(), company: (f.get("company") || "").trim(),
      country: (f.get("country") || "").trim(), interest: f.getAll("interest").join(", "), message: (f.get("message") || "").trim(),
    };
  };
  const summary = (d) =>
    `Hi BuildTogether,\n\nName: ${d.name}\nEmail: ${d.email}${d.company ? `\nCompany: ${d.company}` : ""}${d.country ? `\nCountry: ${d.country}` : ""}${d.interest ? `\nInterested in: ${d.interest}` : ""}\n\n${d.message}`;
  const show = (cls, msg) => { status.className = `form-status ${cls}`; status.textContent = msg; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = data();
    if (SITE.formEndpoint) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const res = await fetch(SITE.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ ...d, _subject: `Website enquiry from ${d.name}` }) });
        if (!res.ok) throw new Error();
        form.reset();
        show("ok", "Thanks! Your message is in. We reply within one business day.");
      } catch {
        show("err", `Something went wrong. Please email us at ${SITE.email} or message us on WhatsApp.`);
      } finally { btn.disabled = false; }
    } else {
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Website enquiry from ${d.name}`)}&body=${encodeURIComponent(summary(d))}`;
      show("ok", "Opening your email app with your message pre-filled…");
    }
  });

  document.getElementById("wa-submit")?.addEventListener("click", () => {
    const d = data();
    if (!d.name || !d.message) { form.reportValidity(); return; }
    window.open(waLink(summary(d)), "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  fillSiteData();
  initReveal();
  initCounters();
  initConsole();
  initNeural();
  initContactForm();
});
