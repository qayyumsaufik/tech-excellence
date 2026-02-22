/* ============================================
   ABOUT PAGE — JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---------- Back to Top ---------- */
  var btn = document.getElementById('backToTop');
  if (btn) {
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > window.innerHeight);
    });
  }

  /* ---------- Cursor Glow Text ---------- */
  var heroSection = document.getElementById('aboutHero');
  var glowText = document.getElementById('glowText');

  if (heroSection && glowText) {
    heroSection.addEventListener('mousemove', function (e) {
      var rect = glowText.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      glowText.style.setProperty('--mouse-x', x + '%');
      glowText.style.setProperty('--mouse-y', y + '%');
    });
  }

  /* ---------- Counter Animation ---------- */
  function animateCounters() {
    var counters = document.querySelectorAll('.about-core__stat-number');
    counters.forEach(function (counter) {
      var target = parseFloat(counter.getAttribute('data-target'));
      var suffix = counter.getAttribute('data-suffix') || '';
      var decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = start + (target - start) * eased;
        counter.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Intersection Observer for Counters ---------- */
  var statsGrid = document.getElementById('statsGrid');
  if (statsGrid) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsGrid);
  }

  /* ---------- GSAP Stacking Timeline ---------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    var panels = document.querySelectorAll('.stack-timeline__panel');
    if (panels.length > 0) {
      panels.forEach(function (panel, i) {
        if (i < panels.length - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            endTrigger: panels[panels.length - 1],
            end: 'top top'
          });
        }
      });
    }

    /* ---------- Fade-in animations for sections ---------- */
    var fadeElements = document.querySelectorAll(
      '.about-purpose__block, .about-core__stat, .about-core__bottom, ' +
      '.about-started__heading, .about-started__text, .about-journey, ' +
      '.where-we-work__heading, .location-card, .cta__main'
    );

    fadeElements.forEach(function (el) {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

})();
