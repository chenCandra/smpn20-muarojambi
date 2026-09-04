// Vanilla JS murni, tanpa library -- 2 perilaku:
// 1) `.reveal` -- fade-up begitu elemen masuk viewport (dipasangkan sama
//    class .reveal/.is-visible di global.css).
// 2) `[data-countup]` -- angka statistik menghitung naik dari 0 ke nilai
//    target begitu section masuk viewport.
// Keduanya lewat SATU IntersectionObserver per jenis (bukan satu observer
// per elemen) -- lebih ringan. Kedua-duanya menghormati
// prefers-reduced-motion (skip animasi, langsung tampil hasil akhir).

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupReveal(): void {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!els.length) return;

  if (prefersReducedMotion) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => io.observe(el));
}

function setupCountUp(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-countup]');
  if (!els.length) return;

  const animateOne = (el: HTMLElement) => {
    const target = Number(el.dataset.countup ?? '0');
    const suffix = el.dataset.suffix ?? '';

    if (prefersReducedMotion || !Number.isFinite(target)) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = `${Math.round(eased * target)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (prefersReducedMotion) {
    els.forEach(animateOne);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateOne(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  els.forEach((el) => io.observe(el));
}

function setupNavbarScroll(): void {
  const navbar = document.querySelector<HTMLElement>('[data-navbar]');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('overflow-hidden', isOpen);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

setupReveal();
setupCountUp();
setupNavbarScroll();
setupMobileMenu();
