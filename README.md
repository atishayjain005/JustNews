# JustNews

A lightweight headline reader using native HTML disclosures and plain JavaScript. It renders up to 20 headlines as text, allows keyboard navigation, and reports loading, empty, timeout and retry states. No runtime framework or third-party assets are required.

## Run locally

Requires Node.js 22+, npm and Python 3:

```sh
npm ci
npm start
```

Open http://127.0.0.1:4180. Without feed configuration, the page explicitly shows that live news is not configured. No sample articles are presented as live news.

## Feed contract and credentials

An optional `<meta name="news-endpoint" content="/api/news">` in the document head selects a **same-origin** endpoint returning JSON with an `articles` array. Articles need a nonempty string `title`; `content` and absolute HTTP(S) `url` are optional. Only the first 20 usable articles are rendered. Responses marked `status: "error"`, malformed data, HTTP failures and requests exceeding 10 seconds are recoverable errors.

The endpoint must be implemented by an existing suitable server, keep provider credentials server-side, enforce provider permissions and quotas, and return only public news data. This repository contains no backend. Python's static development server and GitHub Pages cannot implement that endpoint. Tests intercept it locally without contacting a news provider.

The original repository contained a provider key. It was removed from the current source, **not revoked or removed from Git history**. The credential owner must rotate/revoke it before live integration. Never place a replacement key in HTML, JavaScript, a query string, a public repository or a browser-delivered environment variable. No paid service, account or new infrastructure is provisioned by this change.

## Checks

```sh
npm ci
npx playwright install chromium
npm run check
CI=1 npm test
npm audit
```

On macOS, plain `npm test` uses installed Google Chrome; `CI=1` selects downloaded Chromium. Tests cover desktop and 320px mobile: plain-text injection safety, unsafe URL rejection, missing fields, the article limit, unconfigured/empty states, HTTP and malformed response recovery, timeouts, keyboard disclosure and overflow. GitHub Actions runs Chromium on Ubuntu 24.04. There is no bundler, separate linter or TypeScript compiler; syntax checks and browser regression tests are the applicable gates.

## Release

Existing hosting is GitHub Pages from `main` at https://atishayjain005.github.io/JustNews/. A pushed branch or green PR does not update that site.

1. Review the PR and resolve historical-key rotation and live-feed hosting requirements.
2. Merge an accepted change, then confirm the Pages build completed.
3. Verify the actual served version, desktop/mobile layout, keyboard reading, link behavior, and live/error/retry states. With Pages alone, expect the explicit unconfigured state.
4. Record deployment separately from local tests, push and PR status.

Planning and remaining work: [improvement register](docs/improvement-log.md) and [GitHub Project](https://github.com/users/atishayjain005/projects/15).
