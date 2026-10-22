const caseStudies = [
  {
    slug: 'nexoratech',
    title: 'NexoraTech',
    category: 'WEB APP / CONCEITO',
    description: 'Sistema web para criação e gerenciamento de orçamentos.',
    problem: 'Explorar como apoiar a criação e o gerenciamento de orçamentos em uma experiência web.',
    objective: '[Definir o objetivo do projeto a partir do escopo.]',
    role: '[Descrever responsabilidades e atividades realizadas.]',
    learning: '[Registrar aprendizados após o desenvolvimento do estudo. Não há resultados ou conclusões documentados até o momento.]',
    cover: '../assets/images/home-project-nexoratech-placeholder.svg',
    coverAlt: 'Ilustração conceitual do sistema de orçamentos, ainda sem telas finais',
    tools: ['[Ferramenta de design]', '[Tecnologia, se aplicável]'],
  },
  {
    slug: 'aetheria',
    title: 'Aetheria',
    category: 'APLICATIVO MOBILE / CONCEITO',
    description: 'Conceito de aplicativo voltado à concentração e produtividade.',
    problem: 'Explorar uma experiência mobile relacionada à concentração e produtividade.',
    objective: '[Definir o objetivo do conceito a partir do escopo.]',
    role: '[Descrever responsabilidades e atividades realizadas.]',
    learning: '[Registrar aprendizados após o desenvolvimento do estudo.]',
    cover: '../assets/images/home-project-aetheria-placeholder.svg',
    coverAlt: 'Ilustração conceitual do aplicativo Aetheria, ainda sem telas finais',
    tools: ['[Ferramenta de design]', '[Tecnologia, se aplicável]'],
  },
  {
    slug: 'redesign',
    title: 'Redesign UX/UI',
    category: 'REDESIGN UX/UI / PROPOSTA',
    description: 'Análise e proposta de melhoria para uma experiência digital existente.',
    problem: '[Identificar a experiência e o problema a partir do escopo definido.]',
    objective: '[Definir o objetivo da proposta de redesign.]',
    role: '[Descrever responsabilidades e atividades realizadas.]',
    learning: '[Registrar aprendizados após o desenvolvimento do estudo.]',
    cover: '../assets/images/home-workspace-placeholder.svg',
    coverAlt: 'Ilustração neutra temporária; substituir pela imagem do projeto',
    tools: ['[Ferramenta de design]', '[Método aplicado]'],
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('[data-case-project]');
  if (!page) return;

  const requestedSlug = new URLSearchParams(window.location.search).get('projeto') || 'nexoratech';
  const matchedIndex = caseStudies.findIndex((project) => project.slug === requestedSlug);
  const projectIndex = matchedIndex < 0 ? 0 : matchedIndex;
  const project = caseStudies[projectIndex];
  const previous = caseStudies[projectIndex - 1];
  const next = caseStudies[projectIndex + 1];

  document.title = `${project.title} — Estudo de caso`;
  document.querySelector('[data-case-title]').textContent = project.title;
  document.querySelector('[data-case-category]').textContent = project.category;
  document.querySelector('[data-case-short-description]').textContent = project.description;
  document.querySelector('[data-case-problem]').textContent = project.problem;
  document.querySelector('[data-case-objective]').textContent = project.objective;
  document.querySelector('[data-case-role]').textContent = project.role;
  document.querySelector('[data-case-learning]').textContent = project.learning;

  const cover = document.querySelector('[data-case-cover]');
  cover.src = project.cover;
  cover.alt = project.coverAlt;
  const solutionImage = document.querySelector('[data-case-solution]');
  solutionImage.src = project.cover;
  solutionImage.alt = project.coverAlt;
  document.querySelector('[data-case-image-link]').href = project.cover;

  const toolsList = document.querySelector('[data-case-tools]');
  toolsList.replaceChildren(...project.tools.map((tool) => {
    const item = document.createElement('li');
    item.textContent = tool;
    return item;
  }));

  setProjectNeighbor('[data-case-previous]', '[data-case-previous-name]', '[data-case-previous-label]', previous, 'anterior');
  setProjectNeighbor('[data-case-next]', '[data-case-next-name]', '[data-case-next-label]', next, 'próximo');

  function setProjectNeighbor(linkSelector, nameSelector, labelSelector, neighbor, direction) {
    const link = document.querySelector(linkSelector);
    if (neighbor) {
      link.href = `modelo-estudo-de-caso.html?projeto=${neighbor.slug}`;
      document.querySelector(nameSelector).textContent = neighbor.title;
      return;
    }

    link.href = 'index.html';
    document.querySelector(nameSelector).textContent = 'Todos os projetos';
    document.querySelector(labelSelector).textContent = 'VER TODOS OS PROJETOS';
  }
});
