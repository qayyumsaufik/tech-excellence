// ───── Identity — Stacking Scroll Sections ─────
// Requires: GSAP + ScrollTrigger (loaded via CDN)

function initIdentityScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray(".identity__card");
  if (!cards.length) return;

  cards.forEach((card, i) => {
    // For every card except the last, fade it out when the next card scrolls over it
    if (i < cards.length - 1) {
      const nextCard = cards[i + 1];

      gsap.to(card.querySelector(".container-large"), {
        opacity: 0.3,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    }
  });
}

// Auto-init when DOM is ready and GSAP is available
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  document.addEventListener("DOMContentLoaded", initIdentityScroll);
} else {
  // Fallback: wait for window load in case scripts load async
  window.addEventListener("load", function () {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      initIdentityScroll();
    }
  });
}
