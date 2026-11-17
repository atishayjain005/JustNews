'use strict';
const newsAccordion = document.getElementById('newsAccordion');

function renderArticles(articles) {
  newsAccordion.replaceChildren();
  const valid = articles.filter(article => article && typeof article.title === 'string' && article.title.trim()).slice(0, 20);
  for (const article of valid) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = article.title;
    const content = document.createElement('p');
    content.textContent = typeof article.content === 'string' && article.content.trim() ? article.content : 'No summary available.';
    details.append(summary, content);
    try {
      const url = new URL(article.url);
      if (['https:', 'http:'].includes(url.protocol)) {
        const link = document.createElement('a');
        link.href = url.href;
        link.textContent = 'Read full article (opens in a new tab)';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        details.append(link);
      }
    } catch { /* Missing or invalid article URLs are not linked. */ }
    newsAccordion.append(details);
  }
  return valid.length;
}

const status = document.getElementById('newsStatus');
const retry = document.getElementById('retry');
const endpoint = document.querySelector('meta[name="news-endpoint"]')?.content;
let loading = false;
async function loadNews() {
  if (loading) return;
  if (!endpoint) {
    status.textContent = 'Live news is not configured yet.';
    return;
  }
  loading = true;
  retry.hidden = false;
  retry.disabled = true;
  status.textContent = 'Loading headlines…';
  newsAccordion.setAttribute('aria-busy', 'true');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const url = new URL(endpoint, location.href);
    if (url.origin !== location.origin) throw new Error('Invalid endpoint');
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('Request failed');
    const data = await response.json();
    if (!data || !Array.isArray(data.articles) || data.status === 'error') throw new Error('Invalid news response');
    const count = renderArticles(data.articles);
    status.textContent = count ? `${count} ${count === 1 ? 'headline' : 'headlines'} loaded.` : 'No headlines available. Please try again later.';
    retry.hidden = count > 0;
  } catch {
    status.textContent = controller.signal.aborted ? 'The request timed out. Please try again.' : 'News could not be loaded. Check your connection and try again.';
  } finally {
    clearTimeout(timeout);
    loading = false;
    retry.disabled = false;
    newsAccordion.setAttribute('aria-busy', 'false');
  }
}
retry.addEventListener('click', loadNews);
loadNews();
