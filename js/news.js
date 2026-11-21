export const categories = {
  medicina: 'Medicina',
  direito: 'Direito',
  ads: 'ADS',
  'engenharia-civil': 'Engenharia Civil',
  cinema: 'Cinema',
  'educacao-fisica': 'Educação Física',
};

export function categoryLabel(slug) {
  return Object.hasOwn(categories, slug) ? categories[slug] : 'Universidade';
}

export async function loadNews(siteRoot) {
  const response = await fetch(new URL('data/news.json', siteRoot));
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const edition = await response.json();
  if (!edition || !edition.categories || typeof edition.categories !== 'object' ||
      Array.isArray(edition.categories) || !Object.values(edition.categories).every(Array.isArray)) {
    throw new Error('Estrutura de notícias inválida.');
  }
  return edition;
}

export function listArticles(edition) {
  const byId = new Map();
  for (const article of [edition.hotNews, ...Object.values(edition.categories).flat()]) {
    if (article?.id && typeof article.title === 'string') byId.set(article.id, article);
  }
  return [...byId.values()].sort((first, second) =>
    (Date.parse(second.publishedAt) || 0) - (Date.parse(first.publishedAt) || 0)
  );
}

function normalize(text) {
  return String(text ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR');
}

export function searchArticles(articles, query) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return articles.filter((article) => {
    const termsInArticle = normalize([
      article.title, article.summary, categoryLabel(article.category), article.category,
      ...(Array.isArray(article.tags) ? article.tags : []),
    ].join(' '));
    return terms.every((term) => termsInArticle.includes(term));
  });
}
