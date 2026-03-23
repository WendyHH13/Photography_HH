/* =============================================
   H & H Photography — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navbar scroll behaviour ---- */
  const navbar = document.querySelector('.navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ---- Mobile menu toggle ---- */
  const toggle = document.querySelector('.navbar__toggle');
  const menu   = document.querySelector('.navbar__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ---- Mobile dropdown toggle ---- */
  const dropdowns = document.querySelectorAll('.navbar__dropdown');
  dropdowns.forEach(function (dd) {
    const link = dd.querySelector('.navbar__link');
    if (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          dd.classList.toggle('open');
        }
      });
    }
  });

  /* ---- Close mobile menu on link click ---- */
  const navLinks = document.querySelectorAll('.navbar__menu .navbar__link:not(.navbar__dropdown > .navbar__link), .dropdown__item a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu) menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  /* ---- Gallery filter ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        if (cat === 'all' || item.getAttribute('data-cat') === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---- Contact form basic validation & submission ---- */
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = bookingForm.querySelector('[type="submit"]');
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      btn.style.background = '#4caf50';
      btn.style.borderColor = '#4caf50';
      setTimeout(function () {
        bookingForm.reset();
        btn.textContent = 'Send My Request';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 4000);
    });
  }

  /* ---- Smooth active nav highlight ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.navbar__link');
  allNavLinks.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = '#C8A96A';
    }
  });

});
