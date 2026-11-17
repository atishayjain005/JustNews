const { test, expect } = require('@playwright/test');
async function feed(page, articles) {
  await page.route('**/api/news', route => route.fulfill({json: {articles}}));
  await page.route('**/index.html', async route => {
    const response = await route.fetch();
    await route.fulfill({response, body: (await response.text()).replace('<head>', '<head><meta name="news-endpoint" content="/api/news">')});
  });
  await page.goto('/index.html');
}
test('unconfigured installation is honest', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('#newsAccordion')).toContainText('not configured');
});
test('renders untrusted text without executable markup or unsafe links', async ({page}) => {
  await feed(page, [{title:'<img src=x onerror=alert(1)>',content:'<script>alert(1)</script>',url:'javascript:alert(1)'}, {title:'Valid',url:'https://example.org'}]);
  await expect(page.locator('details')).toHaveCount(2);
  await expect(page.locator('#newsAccordion img')).toHaveCount(0);
  await expect(page.locator('#newsAccordion a')).toHaveCount(1);
  await page.locator('summary').first().click();
  await expect(page.locator('details p').first()).toHaveText('<script>alert(1)</script>');
});
test('limits usable articles and tolerates missing content', async ({page}) => {
  await feed(page, [null, {}, ...Array.from({length:25}, (_,i)=>({title:`Headline ${i}`}))]);
  await expect(page.locator('details')).toHaveCount(20);
  await page.locator('summary').first().click();
  await expect(page.locator('details p').first()).toHaveText('No summary available.');
});
