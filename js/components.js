import { categoryLabel } from './news.js';

const shortDate = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit', month: 'short', timeZone: 'America/Sao_Paulo',
});
const longDate = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long', timeZone: 'America/Sao_Paulo',
});
const fallbackImage = 'assets/images/placeholder.svg';

export function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

export function dateElement(value, type = 'short') {
  const date = new Date(value);
  if (!value || !Number.isFinite(date.getTime())) return null;
  const formatter = type === 'short' ? shortDate : longDate;
  const display = formatter.format(date).replaceAll('.', '');
  const time = node('time', '', display);
  time.dateTime = date.toISOString();
  return time;
}

function sourceLink(article, className, label = 'Leia mais') {
  let url;
  try {
    url = new URL(article.sourceUrl);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

  const link = node('a', className, label);
  link.href = url.href;
  if (label === 'Leia mais') link.setAttribute('aria-label', `Leia mais: ${article.title}`);
  const arrow = node('span', 'arrow');
  arrow.setAttribute('aria-hidden', 'true');
  link.append(arrow);
  return link;
}

function imageElement(item, siteRoot, { priority = false, className = '' } = {}) {
  const image = node('img', className);
  const fallback = new URL(fallbackImage, siteRoot).href;
  const relativePath = typeof item.image === 'string' &&
    /^assets\/images\/[\w./-]+$/u.test(item.image) &&
    !item.image.split('/').includes('..') ? item.image : fallbackImage;
  image.src = new URL(relativePath, siteRoot).href;
  image.alt = relativePath === fallbackImage ? '' : (item.imageAlt ?? '');
  image.decoding = 'async';
  if (priority) image.fetchPriority = 'high';
  else image.loading = 'lazy';
  image.addEventListener('error', () => {
    image.alt = '';
    image.src = fallback;
  }, { once: true });
  return image;
}

function byline(article) {
  const line = node('p', 'byline');
  if (article.source) line.append(node('span', 'source-name', article.source));
  const date = dateElement(article.publishedAt);
  if (date) line.append(date);
  return line;
}

export function createNewsCard(article, siteRoot) {
  const card = node('article', 'news-card');
  const media = node('div', 'card-media');
  media.append(imageElement(article, siteRoot));
  const label = node('span', 'category-chip', categoryLabel(article.category));
  label.dataset.category = article.category ?? '';
  media.append(label);

  const body = node('div', 'card-body');
  body.append(node('h3', 'card-title', article.title), node('p', 'card-summary', article.summary));
  const footer = node('div', 'card-footer');
  footer.append(byline(article));
  const link = sourceLink(article, 'read-link');
  if (link) footer.append(link);
  body.append(footer);
  card.append(media, body);
  return card;
}

export function renderCards(target, articles, siteRoot) {
  if (!articles.length) {
    target.replaceChildren(node('p', 'inline-empty', 'Nenhuma notícia disponível.'));
    return;
  }
  target.replaceChildren(...articles.map((article) => createNewsCard(article, siteRoot)));
}

export function renderHotNews(target, article, siteRoot) {
  if (!article?.title) {
    target.replaceChildren(node('p', 'stage-message', 'Nenhum destaque disponível.'));
    return;
  }

  const hero = node('article', 'hero');
  hero.append(imageElement(article, siteRoot, { priority: true, className: 'hero-image' }));
  const body = node('div', 'hero-body');
  const category = node('span', 'hero-category', categoryLabel(article.category));
  const tag = node('p', 'hot-label');
  const icon = node('span', '', '✷');
  icon.setAttribute('aria-hidden', 'true');
  tag.append(icon, ' HOT NEWS');
  body.append(tag, category, node('h1', 'hero-title', article.title),
    node('p', 'hero-summary', article.summary), byline(article));
  const link = sourceLink(article, 'hero-link');
  if (link) body.append(link);
  hero.append(body);
  target.replaceChildren(hero);
}

export function renderWeeklyCuriosity(target, curiosity, siteRoot) {
  const panel = node('section', 'curiosity');
  const overline = node('h2', 'curiosity-label');
  const glyph = node('span', '', '✳');
  glyph.setAttribute('aria-hidden', 'true');
  overline.append(glyph, ' Curiosidade da semana');
  panel.append(overline);
  if (!curiosity?.title) {
    panel.append(node('p', 'curiosity-copy', 'Nenhuma curiosidade disponível nesta edição.'));
    target.replaceChildren(panel);
    return;
  }
  panel.append(imageElement(curiosity, siteRoot, { className: 'curiosity-image' }));
  const content = node('div', 'curiosity-body');
  content.append(node('h3', 'curiosity-title', curiosity.title),
    node('p', 'curiosity-copy', curiosity.content));
  const source = sourceLink(curiosity, 'curiosity-link', curiosity.source || 'Fonte');
  if (source) content.append(source);
  panel.append(content);
  target.replaceChildren(panel);
}

export function renderCategorySections(target, byCategory, siteRoot, categories) {
  const blocks = Object.entries(categories).flatMap(([slug, name]) => {
    if (!byCategory[slug]?.length) return [];
    const section = node('section', 'news-section category-section');
    const head = node('div', 'section-head');
    const title = node('h2', 'section-title', name);
    const link = node('a', 'section-link', 'Ver categoria');
    link.setAttribute('aria-label', `Ver categoria: ${name}`);
    link.href = new URL(`${slug}/`, siteRoot);
    head.append(title, link);
    const grid = node('div', 'news-grid');
    renderCards(grid, byCategory[slug].slice(0, 3), siteRoot);
    section.append(head, grid);
    return [section];
  });
  target.replaceChildren(...blocks);
}
