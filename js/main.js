/**
 * PORTFÓLIO DE UI/UX DESIGN - SCRIPT PRINCIPAL (Vanilla JS)
 * Interações limpas, leves, performáticas e acessíveis.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initIntersectionObserver();
  initEmailCopy();
  initCurrentYear();
  initProjectFilters();
  
  // Inicializa o estado das habilidades (Tech ativado por padrão)
  if (document.getElementById('btn-tech')) {
    switchSkills('tech');
  }
});

/**
 * 1. Navbar Efeito ao Rolar
 * Adiciona sombra e opacidade de fundo quando a página é rolada
 */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Menu Mobile Responsivo & Acessível
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggleBtn || !navLinks) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !toggleBtn.classList.contains('is-open');
    toggleBtn.classList.toggle('is-open', isOpen);
    navLinks.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    toggleBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    
    // Evita rolagem da página quando o menu está aberto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Fecha o menu ao clicar em qualquer link interno
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (toggleBtn.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });
  });

  // Fecha com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
}

/**
 * 3. Animações Sutis de Entrada (Intersection Observer)
 * Respeita a preferência do usuário por redução de movimento
 */
function initIntersectionObserver() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * 4. ScrollSpy e Links Internos
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link[href^="#"]');
  const caseNavLinks = document.querySelectorAll('.case-nav-link[href^="#"], .case-index a[href^="#"]');

  if (!sections.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        const matchingNavLink = [...navLinks].some((link) => link.getAttribute('href') === `#${id}`);
        if (matchingNavLink) {
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        }

        caseNavLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * 5. Cópia Rápida de E-mail
 */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('[data-copy-email]');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-copy-email');
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span style="color: var(--color-mint); font-weight: 600;">✓ E-mail copiado!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2500);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  });
}

/**
 * 6. Ano Atual Automático no Rodapé
 */
function initCurrentYear() {
  const currentYear = new Date().getFullYear().toString();
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = currentYear;
  });
}

/**
 * 7. Filtros de Projetos
 */
function initProjectFilters() {
  const filters = document.querySelectorAll('[data-project-filter]');
  const projects = document.querySelectorAll('[data-project-grid] [data-category]');
  if (!filters.length || !projects.length) return;

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const category = filter.getAttribute('data-project-filter');
      filters.forEach((item) => {
        const isActive = item === filter;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', isActive.toString());
      });
      projects.forEach((project) => {
        project.hidden = category !== 'all' && project.getAttribute('data-category') !== category;
      });
    });
  });
}

/**
 * 8. Alternador de Habilidades (Tech / Behavior)
 */
function switchSkills(type) {
  const btnTech = document.getElementById('btn-tech');
  const btnBehavior = document.getElementById('btn-behavior');
  const techCards = document.querySelectorAll('.skill-card.tech');
  const behaviorCards = document.querySelectorAll('.skill-card.behavior');

  if (!btnTech || !btnBehavior) return;

  if (type === 'tech') {
    btnTech.classList.add('active');
    btnTech.setAttribute('aria-selected', 'true');
    btnBehavior.classList.remove('active');
    btnBehavior.setAttribute('aria-selected', 'false');

    techCards.forEach(card => card.classList.remove('dimmed'));
    behaviorCards.forEach(card => card.classList.add('dimmed'));
  } else if (type === 'behavior') {
    btnBehavior.classList.add('active');
    btnBehavior.setAttribute('aria-selected', 'true');
    btnTech.classList.remove('active');
    btnTech.setAttribute('aria-selected', 'false');

    behaviorCards.forEach(card => card.classList.remove('dimmed'));
    techCards.forEach(card => card.classList.add('dimmed'));
  }
}