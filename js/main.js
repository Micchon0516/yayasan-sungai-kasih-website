// ============================================================
// Yayasan Sungai Kasih — main.js
// ============================================================
(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  const fabTop = document.getElementById("fabTop");

  /* ---------------- Header scroll state + height var ---------------- */
  const header = document.getElementById("siteHeader");
  function setHeaderHeight() {
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    fabTop.classList.toggle("is-shown", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav ---------------- */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  function closeMobileNav() {
    hamburger.classList.remove("is-open");
    mobileNav.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", () => {
    const willOpen = !mobileNav.classList.contains("is-open");
    hamburger.classList.toggle("is-open", willOpen);
    mobileNav.classList.toggle("is-open", willOpen);
    hamburger.setAttribute("aria-expanded", String(willOpen));
    document.body.style.overflow = willOpen ? "hidden" : "";
  });
  mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobileNav));

  /* ---------------- Active nav link on scroll ---------------- */
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const groupTargets = document.querySelectorAll("[data-reveal-group] > *");
  groupTargets.forEach((el) => el.setAttribute("data-reveal", ""));

  const allReveal = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    allReveal.forEach((el) => revealObserver.observe(el));
    // Safety net: never leave content permanently invisible if the observer
    // is delayed/blocked in some environment.
    window.addEventListener("load", () => {
      setTimeout(() => allReveal.forEach((el) => el.classList.add("is-visible")), 2000);
    });
  } else {
    allReveal.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll("[data-counter]");
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((c) => counterObserver.observe(c));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------------- Copy donation account number ---------------- */
  document.querySelectorAll(".donate-copy-btn").forEach((btn) => {
    const originalHTML = btn.innerHTML;
    btn.addEventListener("click", async () => {
      const value = "6320288400"; // account number without donation code suffix
      try {
        await navigator.clipboard.writeText(value);
      } catch (err) {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e2) { /* no-op */ }
        document.body.removeChild(ta);
      }
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M20 6L9 17l-5-5"/></svg> Nomor rekening disalin!';
      setTimeout(() => { btn.innerHTML = originalHTML; }, 2200);
    });
  });

  /* ---------------- Contact form — redirects to WhatsApp with prefilled message ---------------- */
  const WHATSAPP_NUMBER = "6281286861634"; // Sdri Dewi, Sekretariat Yayasan Sungai Kasih
  const form = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const nama = form.nama.value.trim();
      const email = form.email.value.trim();
      const topik = form.topik.value;
      const pesan = form.pesan.value.trim();

      const text =
        `Halo Yayasan Sungai Kasih, saya ${nama}.\n\n` +
        `Topik: ${topik}\n` +
        `Email: ${email}\n\n` +
        `Pesan:\n${pesan}`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

      formSuccess.classList.add("is-shown");
      formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
      form.reset();

      window.open(waUrl, "_blank", "noopener");
    });
  }

  /* ---------------- Back to top ---------------- */
  fabTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
