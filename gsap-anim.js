(function () {
  "use strict";
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  var isDesktop = window.innerWidth >= 992;
  var isTabletUp = window.innerWidth >= 768;

  /* ==========================================================
     1. HERO PILLAR2 — Expand + Demo Reveal
     ========================================================== */
  if (isDesktop) {
    var pillar2 = document.querySelector(".home-hero_pillar2");
    if (pillar2) {
      var demoBlock = pillar2.querySelector(".home-hero_demo-block");
      var ctaBtn = pillar2.querySelector(".cta-wrapper.is-home-hero-demo");
      var iconEl = pillar2.querySelector(".home-hero_pillar_icon");
      var textEl = pillar2.querySelector(".text-size-medium");
      var heroSection = document.querySelector(".section_home-hero");
      var heroTop = document.querySelector(".home-hero_top");
      var pillar1 = document.querySelector(".home-hero_pillar1");
      var pillar3 = document.querySelector(".home-hero_pillar3");
      var pillar4 = document.querySelector(".home-hero_pillar4");

      if (demoBlock && heroSection) {
        gsap.set(demoBlock, { opacity: 0 });
        if (ctaBtn) gsap.set(ctaBtn, { opacity: 0, y: 20 });

        var heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "+=1200",
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        // Phase 1: Hero heading + other pillars slide up and fade out
        if (heroTop) {
          heroTl.to(heroTop, { y: -300, opacity: 0, duration: 0.3, ease: "power1.in" }, 0);
        }
        if (pillar1) heroTl.to(pillar1, { y: -200, opacity: 0, duration: 0.25, ease: "power1.in" }, 0.05);
        if (pillar3) heroTl.to(pillar3, { y: -200, opacity: 0, duration: 0.25, ease: "power1.in" }, 0.05);
        if (pillar4) heroTl.to(pillar4, { y: -200, opacity: 0, duration: 0.25, ease: "power1.in" }, 0.05);

        // Phase 2: Card slides down 60px
        heroTl.to(pillar2, { y: 60, duration: 0.2, ease: "none" }, 0.3);

        // Phase 3: Card scales up, demo image fades in
        heroTl.to(pillar2, {
          scale: 2.5, duration: 0.4, ease: "power1.inOut", transformOrigin: "center center",
        }, "expand");

        heroTl.to(demoBlock, { opacity: 1, duration: 0.3, ease: "power1.in" }, "expand+=0.05");

        if (iconEl) heroTl.to(iconEl, { opacity: 0, duration: 0.15, ease: "power1.out" }, "expand");
        if (textEl) heroTl.to(textEl, { opacity: 0, duration: 0.15, ease: "power1.out" }, "expand");
        if (ctaBtn) heroTl.to(ctaBtn, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, "expand+=0.3");

        // Phase 4: Hold at full expansion
        heroTl.to({}, { duration: 0.2 });
      }
    }
  }



  /* ==========================================================
     3. SPREAD CARDS — Oval Spread Animation (pinned)
     ========================================================== */
  var spreadSection = document.getElementById("spreadCards");
  if (spreadSection) {
    var stage = spreadSection.querySelector(".spread-cards__stage");
    var spreadCards = gsap.utils.toArray(".spread-cards__card");
    var centerEl = spreadSection.querySelector(".spread-cards__center");
    var orbEl = spreadSection.querySelector(".spread-cards__orb");
    var ringInner = spreadSection.querySelector(".spread-cards__ring--inner");
    var ringOuter = spreadSection.querySelector(".spread-cards__ring--outer");

    if (stage && spreadCards.length && centerEl) {
      function getLayout() {
        var w = window.innerWidth;
        var rx, ry;

        if (w <= 576) { rx = 150; ry = 120; }
        else if (w <= 991) { rx = 250; ry = 190; }
        else { rx = 320; ry = 240; }

        return [
          { angle: -120, rx: rx, ry: ry },
          { angle: -75,  rx: rx, ry: ry },
          { angle: -25,  rx: rx, ry: ry },
          { angle: 20,   rx: rx, ry: ry },
          { angle: 65,   rx: rx, ry: ry },
          { angle: 110,  rx: rx, ry: ry },
          { angle: 155,  rx: rx, ry: ry },
          { angle: -165, rx: rx, ry: ry },
        ];
      }

      spreadCards.forEach(function (card, i) {
        gsap.set(card, { x: 0, y: 0, rotation: (i - 4) * 5, scale: 0.6, opacity: 0.85 });
      });

      gsap.set(centerEl, { opacity: 0, scale: 0.8 });
      if (orbEl) gsap.set(orbEl, { opacity: 0, scale: 0.4 });
      if (ringInner) gsap.set(ringInner, { opacity: 0, scale: 0.5 });
      if (ringOuter) gsap.set(ringOuter, { opacity: 0, scale: 0.5 });

      var layout = getLayout();

      var spreadTl = gsap.timeline({
        scrollTrigger: {
          trigger: spreadSection,
          start: "top top",
          end: "+=150%",
          pin: stage,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      if (ringInner) spreadTl.to(ringInner, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }, 0);
      if (ringOuter) spreadTl.to(ringOuter, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.05);

      spreadCards.forEach(function (card, i) {
        var pos = layout[i];
        var rad = (pos.angle * Math.PI) / 180;
        spreadTl.to(card, {
          x: pos.rx * Math.cos(rad), y: pos.ry * Math.sin(rad),
          rotation: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out",
        }, 0);
      });

      if (orbEl) spreadTl.to(orbEl, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0.1);
      spreadTl.to(centerEl, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0.15);

      spreadCards.forEach(function (card, i) {
        var pos = layout[i];
        var rad = (pos.angle * Math.PI) / 180;
        spreadTl.to(card, {
          x: (pos.rx + 8) * Math.cos(rad), y: (pos.ry + 8) * Math.sin(rad),
          duration: 0.15, ease: "none",
        }, 0.6);
      });

      spreadTl.to({}, { duration: 0.25 });
    }
  }

  /* ==========================================================
     4. GLOBAL SECTION & HEADING SCROLL ANIMATIONS
     ========================================================== */
  if (isTabletUp) {

    // Fade-up for section headings
    gsap.utils.toArray([
      ".default-header .heading-style-h3",
      ".request-demo-cta .heading-style-h3",
      ".pro-cat-card__title"
    ].join(",")).forEach(function (el) {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });

    // Fade-up for subtext / descriptions
    gsap.utils.toArray([
      ".default-header .text-size-large",
      ".default-header .text-block",
      ".vyro-ranking__tag",
      ".vyro-ranking__cta",
      ".request-demo-cta .text-size-large",
      ".pro-cat-card__desc"
    ].join(",")).forEach(function (el) {
      gsap.from(el, {
        y: 30, opacity: 0, duration: 0.7, delay: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      });
    });

    // Stagger-up for stat cards
   

    // Stagger-up for product category cards
    var proCatCards = gsap.utils.toArray(".pro-cat-card");
    if (proCatCards.length) {
      gsap.from(proCatCards, {
        y: 60, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: ".pro-cat-grid", start: "top 80%", toggleActions: "play none none reverse" },
      });
    }

    // Border-gradient tags
    gsap.utils.toArray(".border-gradient").forEach(function (el) {
      gsap.from(el, {
        y: 20, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
      });
    });

  

    // CTA section
    var ctaBlock = document.querySelector(".request-demo-cta");
    if (ctaBlock) {
      gsap.from(ctaBlock, {
        y: 50, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ctaBlock, start: "top 85%", toggleActions: "play none none reverse" },
      });
    }

    // Footer columns — stagger up
    var footerCols = gsap.utils.toArray(".au-footer__col");
    if (footerCols.length) {
      gsap.from(footerCols, {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".au-footer__top", start: "top 90%", toggleActions: "play none none reverse" },
      });
    }
  }

  /* ==========================================================
     RESIZE — refresh all ScrollTrigger positions
     ========================================================== */
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { ScrollTrigger.refresh(); }, 250);
  });

})();
