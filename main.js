/* Daily Autocare — main.js */
(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);

  function updateToggleIcon() {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', 'Skift til ' + (currentTheme === 'dark' ? 'lyst' : 'mørkt') + ' tema');
    themeToggle.innerHTML =
      currentTheme === 'dark'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  updateToggleIcon();
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon();
    });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var navLinks = document.querySelector('[data-nav-links]');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }

  /* ---------- Sticky header hide-on-scroll ---------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var lastScroll = window.scrollY;
    window.addEventListener(
      'scroll',
      function () {
        var current = window.scrollY;
        header.classList.toggle('header--scrolled', current > 8);
        if (current > lastScroll && current > 160) {
          header.classList.add('header--hidden');
        } else {
          header.classList.remove('header--hidden');
        }
        lastScroll = current;
      },
      { passive: true }
    );
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Pricing tabs ---------- */
  var pricingTabs = document.querySelectorAll('[data-pricing-tab]');
  var pricingPanels = document.querySelectorAll('[data-pricing-panel]');
  pricingTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-pricing-tab');
      pricingTabs.forEach(function (t) {
        t.setAttribute('aria-selected', String(t === tab));
      });
      pricingPanels.forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-pricing-panel') !== target;
      });
    });
  });

  /* ---------- Gallery filters ---------- */
  var galleryFilters = document.querySelectorAll('[data-gallery-filter]');
  var galleryItems = document.querySelectorAll('[data-gallery-item]');
  galleryFilters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      var category = filter.getAttribute('data-gallery-filter');
      galleryFilters.forEach(function (f) {
        f.setAttribute('aria-pressed', String(f === filter));
      });
      galleryItems.forEach(function (item) {
        var itemCat = item.getAttribute('data-gallery-item');
        var show = category === 'alle' || itemCat === category;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var lightboxItems = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-item] img'));
    var currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      var img = lightboxItems[currentIndex];
      lightboxImg.src = img.getAttribute('src');
      lightboxImg.alt = img.getAttribute('alt') || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function showNext(delta) {
      currentIndex = (currentIndex + delta + lightboxItems.length) % lightboxItems.length;
      var img = lightboxItems[currentIndex];
      lightboxImg.src = img.getAttribute('src');
      lightboxImg.alt = img.getAttribute('alt') || '';
    }

    lightboxItems.forEach(function (img, index) {
      img.closest('[data-gallery-item]').addEventListener('click', function () {
        openLightbox(index);
      });
    });
    var closeBtn = lightbox.querySelector('[data-lightbox-close]');
    var prevBtn = lightbox.querySelector('[data-lightbox-prev]');
    var nextBtn = lightbox.querySelector('[data-lightbox-next]');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', function () { showNext(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { showNext(1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    });
  }

  /* ---------- Contact form ---------- */
  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = contactForm.querySelector('#navn');
      var email = contactForm.querySelector('#email');
      var phone = contactForm.querySelector('#telefon');
      var carSize = contactForm.querySelector('#bilstoerrelse');
      var packageSel = contactForm.querySelector('#pakke');
      var message = contactForm.querySelector('#besked');

      var bodyLines = [
        'Navn: ' + (name ? name.value : ''),
        'Telefon: ' + (phone ? phone.value : ''),
        'E-mail: ' + (email ? email.value : ''),
        'Bilstørrelse: ' + (carSize ? carSize.value : ''),
        'Ønsket pakke: ' + (packageSel ? packageSel.value : ''),
        '',
        (message ? message.value : '')
      ];
      var subject = encodeURIComponent('Forespørgsel fra hjemmesiden — ' + (name ? name.value : ''));
      var body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = 'mailto:kontakt@dailyautocare.dk?subject=' + subject + '&body=' + body;

      var success = document.querySelector('[data-form-success]');
      if (success) success.classList.add('is-visible');
    });
  }

  /* ---------- Map ---------- */
  var mapEl = document.getElementById('map');
  if (mapEl && window.maplibregl) {
    var map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [10.771, 56.348],
      zoom: 13.5,
      attributionControl: true
    });
    map.scrollZoom.disable();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('load', function () {
      var markerEl = document.createElement('div');
      markerEl.className = 'map-marker';
      markerEl.innerHTML =
        '<svg viewBox="0 0 40 40" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M20 3C20 3 32.5 17.8 32.5 26.2C32.5 33.6 27 39 20 39C13 39 7.5 33.6 7.5 26.2C7.5 17.8 20 3 20 3Z" fill="#0369a1" stroke="#ffffff" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<circle cx="20" cy="22" r="5" fill="#ffffff"/>' +
        '</svg>';
      new maplibregl.Marker({ element: markerEl }).setLngLat([10.771, 56.348]).addTo(map);
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Lucide icons ---------- */
  if (window.lucide) window.lucide.createIcons();
})();
