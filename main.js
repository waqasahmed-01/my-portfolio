// SET CURRENT YEAR IN FOOTER

document.getElementById("year").textContent = new Date().getFullYear();

// ACTIVE NAV LINK ON SCROLL
// Highlights the nav item matching the visible section.

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => link.classList.remove("active"));

      const activeLink = document.querySelector(
        `.nav-link[href="#${entry.target.id}"]`,
      );
      if (activeLink) activeLink.classList.add("active");
    });
  },
  {
    rootMargin: "-40% 0px -55% 0px",
  },
);

sections.forEach((section) => sectionObserver.observe(section));

// CLOSE MOBILE MENU ON NAV LINK CLICK

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("navMenu");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getInstance(menu)?.hide();
    }
  });
});

// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target); // animate once only
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

//Back To Top.
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener(
  "scroll",
  () => {
    backToTopBtn.classList.toggle("show", window.scrollY > 400);
  },
  { passive: true },
);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ─────────────────────────────────────────────────────
   7. TYPING ANIMATION
───────────────────────────────────────────────────── */
const typingText = document.getElementById("typing-text");
const typingCursor = document.querySelector(".typing-cursor");

const words = [
  "Software Engineer",
  "Backend Developer",
  "Node.js & ASP.NET Developer",
  "REST API Engineer",
  "Problem Solver",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 60;
const pauseAfterWord = 1800;
const pauseBeforeType = 400;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    // Remove a character
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add a character
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  // Finished typing the word
  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, pauseAfterWord);
    return;
  }

  // Finished deleting the word
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, pauseBeforeType);
    return;
  }

  setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
}

// Start after a short delay
setTimeout(type, 600);
