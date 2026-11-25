// PORTFOLIO — Waqas Ahmed | main.js
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Footer year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Active nav link on scroll
  const navLinks = $$(".nav-link");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((l) => l.classList.remove("active"));
          $(`.nav-link[href="#${entry.target.id}"]`)?.classList.add("active");
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    $$("section[id]").forEach((s) => sectionObserver.observe(s));
  }

  // Close mobile menu on link click
  const menu = $("#navMenu");
  $$(".nav-link, .btn-nav-cta").forEach((link) =>
    link.addEventListener("click", () => {
      if (menu?.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    }),
  );

  // Scroll reveal (falls back to visible if unsupported)
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Back to top
  const backToTop = $("#back-to-top");
  window.addEventListener(
    "scroll",
    () => backToTop.classList.toggle("show", window.scrollY > 400),
    { passive: true },
  );
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }),
  );

  // Toast + clipboard
  const toast = $("#copy-toast");
  const toastMsg = $("#toast-message");
  let toastTimer;
  const showToast = (msg) => {
    toastMsg.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  };

  const copyText = async (text, label) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      showToast(`${label} copied to clipboard`);
    } catch {
      showToast("Copy failed — please copy manually");
    }
  };

  // Contact cards (click + keyboard)
  $$("[data-copy]").forEach((card) => {
    const copy = () =>
      copyText(card.dataset.copy, card.dataset.label || "Text");
    card.addEventListener("click", copy);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        copy();
      }
    });
  });

  // Code card copy
  $("#copy-code-btn")?.addEventListener("click", () => {
    const body = $(".code-card-body");
    const text = $$("div", body)
      .map(
        (d) =>
          "  ".repeat(/ps-4/.test(d.className) ? 1 : 0) +
          d.textContent.replace(/\s+/g, " ").trim(),
      )
      .join("\n");
    copyText(text, "Snippet");
  });

  // Typing animation
  const typingText = $("#typing-text");
  const words = [
    "Software Engineer",
    "Backend Developer",
    "Enterprise Applications Developer",
    "Node.js & ASP.NET Core Developer",
    "CRM & ERP Enthusiast",
  ];

  if (typingText) {
    if (reduceMotion) {
      typingText.textContent = words[0];
    } else {
      let w = 0,
        c = 0,
        deleting = false;
      const tick = () => {
        const word = words[w];
        c += deleting ? -1 : 1;
        typingText.textContent = word.substring(0, c);

        if (!deleting && c === word.length) {
          deleting = true;
          return setTimeout(tick, 1800);
        }
        if (deleting && c === 0) {
          deleting = false;
          w = (w + 1) % words.length;
          return setTimeout(tick, 400);
        }
        setTimeout(tick, deleting ? 50 : 90);
      };
      setTimeout(tick, 600);
    }
  }
})();
