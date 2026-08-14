const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--use-gl=angle', '--enable-unsafe-swiftshader', '--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const logs = [];
  page.on('console', (m) => logs.push(`[console:${m.type()}] ${m.text().slice(0, 300)}`));
  page.on('pageerror', (e) => logs.push(`[pageerror] ${String(e).slice(0, 500)}`));
  page.on('requestfailed', (r) => logs.push(`[reqfail] ${r.url()} :: ${r.failure()?.errorText}`));
  page.on('response', (r) => { if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url()}`); });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 15000));

  const state = await page.evaluate(() => ({
    hasStage: !!document.getElementById('Stage'),
    stageChildren: document.getElementById('Stage')?.children.length ?? null,
    canvases: document.querySelectorAll('canvas').length,
    config: typeof window._CONFIG_ !== 'undefined',
    es5: window._ES5_ === true,
    scriptTags: Array.from(document.querySelectorAll('script[src*="assets/js"]')).map((s) => s.src),
    bodyChildren: Array.from(document.body.children).map((c) => c.id || c.tagName).slice(0, 12),
    splashGone: !document.getElementById('hebrew-splash'),
  }));
  console.log('STATE:', JSON.stringify(state, null, 2));
  console.log('LOGS (first 40):');
  logs.slice(0, 40).forEach((l) => console.log(l));
  await browser.close();
})();
