import './card-effects.js';
import { categories, listArticles, loadNews, searchArticles } from './news.js';
import {
  dateElement, node, renderCards, renderCategorySections, renderHotNews, renderWeeklyCuriosity,
} from './components.js';

const siteRoot = new URL('../', import.meta.url);
const articleSection = document.querySelector('#content');
const searchPanel = document.querySelector('#search-panel');
const searchButton = document.querySelector('#search-toggle');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const searchStatus = document.querySelector('#search-status');
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const dataStatus = document.querySelector('#data-status');
let articles = [];
let dataState = 'loading';

function toggleMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
}

function renderSearch() {
  const query = searchInput.value.trim();
  const results = query && dataState === 'ready' ? searchArticles(articles, query) : [];
  articleSection.hidden = Boolean(query);
  searchResults.hidden = !query;

  if (!query) {
    searchStatus.textContent = '';
    return;
  }

  const heading = document.querySelector('#search-results-title');
  heading.textContent = `Resultados para “${query}”`;
  const grid = searchResults.querySelector('.news-grid');
  if (dataState !== 'ready' || !results.length) {
    searchStatus.textContent = {
      loading: 'Carregando notícias…',
      error: 'A busca está indisponível. Recarregue a página e tente novamente.',
      ready: 'Nenhuma notícia encontrada. Experimente outro termo.',
    }[dataState];
    grid.replaceChildren();
    return;
  }

  searchStatus.textContent = results.length === 1 ? '1 notícia encontrada.' : `${results.length} notícias encontradas.`;
  renderCards(grid, results, siteRoot);
}

function toggleSearch(open) {
  searchPanel.hidden = !open;
  searchButton.setAttribute('aria-expanded', String(open));
  if (open) {
    toggleMenu(false);
    searchInput.focus();
  } else {
    searchInput.value = '';
    renderSearch();
    searchButton.focus();
  }
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'false';
  if (open && !searchPanel.hidden) toggleSearch(false);
  toggleMenu(open);
  if (open) menuButton.focus();
});
searchButton.addEventListener('click', () => toggleSearch(searchPanel.hidden));
searchPanel.addEventListener('submit', (event) => {
  event.preventDefault();
  renderSearch();
});
searchInput.addEventListener('input', renderSearch);
searchPanel.querySelector('.search-close').addEventListener('click', () => toggleSearch(false));
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (!searchPanel.hidden) toggleSearch(false);
  else if (navigation.classList.contains('is-open')) {
    toggleMenu(false);
    menuButton.focus();
  }
});

async function renderEdition() {
  try {
    const edition = await loadNews(siteRoot);
    articles = listArticles(edition);
    const date = dateElement(edition.updatedAt, 'long');
    if (date) document.querySelector('#edition-date').replaceChildren(date);
    if (edition.demo) document.querySelector('#edition-kind').hidden = false;

    const category = document.body.dataset.category;
    if (category) {
      const matches = articles.filter((article) => article.category === category);
      renderCards(document.querySelector('#category-grid'), matches, siteRoot);
    } else {
      renderHotNews(document.querySelector('#hero-content'), edition.hotNews, siteRoot);
      renderWeeklyCuriosity(document.querySelector('#curiosity-content'), edition.weeklyCuriosity, siteRoot);
      const latest = articles.filter((article) => article.id !== edition.hotNews?.id).slice(0, 6);
      renderCards(document.querySelector('#latest-grid'), latest, siteRoot);
      renderCategorySections(document.querySelector('#category-sections'), edition.categories, siteRoot, categories);
    }
    dataState = 'ready';
    dataStatus.hidden = true;
  } catch (error) {
    console.error('Falha ao carregar a edição.', error);
    dataState = 'error';
    document.querySelector('[data-edition-content]').hidden = true;
    const retry = node('button', 'retry-button', 'Recarregar');
    retry.type = 'button';
    retry.addEventListener('click', () => window.location.reload());
    dataStatus.replaceChildren(node('p', '', 'Não foi possível carregar esta edição.'), retry);
  } finally {
    renderSearch();
  }
}

renderEdition();
