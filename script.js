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

// Configure a same-origin server endpoint that keeps provider credentials private.
const endpoint = document.querySelector('meta[name="news-endpoint"]')?.content;
if (endpoint) {
  fetch(endpoint).then(response => response.json()).then(data => renderArticles(data.articles)).catch(() => {
    newsAccordion.textContent = 'News could not be loaded.';
  });
} else {
  newsAccordion.textContent = 'Live news is not configured yet.';
}
