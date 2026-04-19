(function () {
  'use strict';

  // Mark as JS-enabled so CSS fallbacks can toggle off
  document.documentElement.classList.add('js');

  // ==========================================================================
  // 1. Mobile navigation toggle
  // ==========================================================================
  const hamburger = document.getElementById('header-mobile-nav-btn');
  const mobileNav = document.getElementById('header-mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
        mobileNav.setAttribute('hidden', '');
        document.body.style.overflow = '';
      } else {
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'メニューを閉じる');
        mobileNav.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      }
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
        mobileNav.setAttribute('hidden', '');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================================================
  // 2. FAQ accordion
  // ==========================================================================
  const faqItems = document.querySelectorAll('.section-faq__item');
  faqItems.forEach(function (item) {
    const btn = item.querySelector('.section-faq__q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // ==========================================================================
  // 3. Header shadow on scroll
  // ==========================================================================
  const header = document.querySelector('.header');
  const ctaFloat = document.querySelector('.cta-float');
  if (header || ctaFloat) {
    const onScroll = function () {
      const y = window.scrollY;
      if (header) {
        if (y > 12) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
      }
      if (ctaFloat) {
        if (y > 600) ctaFloat.classList.add('is-visible');
        else ctaFloat.classList.remove('is-visible');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ==========================================================================
  // 4. Nav active section highlighting
  // ==========================================================================
  const navLinks = document.querySelectorAll('.header__nav-link');
  const sectionIds = Array.from(navLinks)
    .map(function (link) {
      const href = link.getAttribute('href') || '';
      return href.startsWith('#') ? href.slice(1) : null;
    })
    .filter(Boolean);

  if (sectionIds.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(function (link) {
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('is-current');
              } else {
                link.classList.remove('is-current');
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  // ==========================================================================
  // 5. Scroll reveal animation
  // ==========================================================================
  const revealTargets = document.querySelectorAll(
    '.section-concern__item, .section-reasons__card, .section-services__card, .cases-card, .section-flow__step, .section-price__card, .section-consultant__profile, .section-faq__item, .about-diagram__pill, .section-logos__item'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ==========================================================================
  // 6. Smooth anchor scroll (respects sticky header)
  // ==========================================================================
  const HEADER_OFFSET = 80;
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
