// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
if (nav) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px' });
  reveals.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
const allStatSections = document.querySelectorAll('.hero-stats, .ab-stats');
if (allStatSections.length) {
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    if (!target) { el.textContent = el.dataset.target || 0; return; }
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  }
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num, .ab-stat-num').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  allStatSections.forEach(sec => statsObserver.observe(sec));
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Processing...';
    btn.disabled = true;
    
    // Open default mail client
    window.location.href = "mailto:inquiry@cocostudio.ph?subject=" + encodeURIComponent("New Inquiry via CocoStudio Hub");
    
    // Show success modal
    setTimeout(() => {
      if (successModal) successModal.classList.add('active');
      btn.textContent = original;
      btn.disabled = false;
      e.target.reset();
    }, 800);
  });
}

if (closeModal && successModal) {
  closeModal.addEventListener('click', () => {
    successModal.classList.remove('active');
  });
  const overlay = document.querySelector('.success-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }
}

// ===== CURSOR GLOW (desktop only) =====
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%);
    pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
if (sections.length && navLinks.length) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        let current = '';
        sections.forEach(s => {
          if (window.scrollY >= s.offsetTop - 200) current = s.id;
        });
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${current}` ? '#f0f0ff' : '';
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ===== SLIDESHOW =====
document.querySelectorAll('.ds-slideshow').forEach(function(ss) {
  var slides = ss.querySelectorAll('.ds-slide');
  var dots = ss.querySelectorAll('.ds-dot');
  var current = 0;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  dots.forEach(function(dot) {
    dot.addEventListener('click', function() { goTo(parseInt(dot.dataset.index)); });
  });

  setInterval(function() { goTo(current + 1); }, 3500);
});
