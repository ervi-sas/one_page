// ============================================
// ERVI · Landing page interactions
// ============================================

document.getElementById('year').textContent = new Date().getFullYear();

/* Nav: blur/background on scroll */
const nav = document.getElementById('nav');
function handleNavScroll() {
  nav.classList.toggle('is-scrolled', window.scrollY > 24);
}
handleNavScroll();
window.addEventListener('scroll', handleNavScroll, { passive: true });

/* Mobile menu */
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  const open = navMobile.classList.toggle('is-open');
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', open);
});
navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMobile.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', false);
  });
});

/* Active nav link on scroll (scrollspy) */
const sections = ['objetivo', 'resolvemos', 'servicios', 'contacto']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navLinks = document.querySelectorAll('[data-nav]');

function updateActiveLink() {
  let current = null;
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(link => {
    const match = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('is-active', match);
  });
}
updateActiveLink();
window.addEventListener('scroll', updateActiveLink, { passive: true });

/* Reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

/* Signature element: trade-route scroll dot */
const routeDot = document.getElementById('routeDot');
function updateRouteDot() {
  if (!routeDot) return;
  const doc = document.documentElement;
  const scrollTop = window.scrollY;
  const scrollHeight = doc.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
  routeDot.style.top = `${progress * 100}%`;
}
updateRouteDot();
window.addEventListener('scroll', updateRouteDot, { passive: true });
window.addEventListener('resize', updateRouteDot);

/* Contact form (demo — no backend wired yet) */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = '¡Gracias! Hemos recibido su mensaje. Nuestro equipo comercial se pondrá en contacto pronto.';
  form.reset();
});
