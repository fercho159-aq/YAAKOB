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
  page.on('console', (m) => { if (m.type() !== 'info' && m.type() !== 'log') logs.push(`[console:${m.type()}] ${m.text().slice(0, 300)}`); });
  page.on('pageerror', (e) => logs.push(`[pageerror] ${String(e).slice(0, 500)}`));
  page.on('request', (r) => { const u = r.url(); if (u.includes('assets/') || u.includes('/api/')) logs.push(`[req] ${u.slice(0, 140)}`); });
  page.on('requestfailed', (r) => { const u = r.url(); if (!u.includes('google') && !u.includes('doubleclick')) logs.push(`[reqfail] ${u.slice(0, 140)} :: ${r.failure()?.errorText}`); });
  page.on('response', (r) => { const u = r.url(); if ((u.includes('assets/') || u.includes('/api/')) ) logs.push(`[resp ${r.status()}] ${u.slice(0, 140)}`); });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 20000));

  const state = await page.evaluate(() => {
    const s = document.querySelector('script[src*="assets/js/app"]');
    return {
      bundleScriptPresent: !!s,
      bundleFetched: performance.getEntriesByName(s?.src || '').length > 0,
      bundleGlobals: {
        __body: typeof window.__body,
        Stage: typeof window.Stage,
        Device: typeof window.Device,
        Events: typeof window.Events,
      },
      hasStage: !!document.getElementById('Stage'),
      canvases: document.querySelectorAll('canvas').length,
      readyState: document.readyState,
    };
  });
  console.log('STATE:', JSON.stringify(state, null, 2));
  console.log('LOGS:');
  logs.slice(0, 60).forEach((l) => console.log(l));
  await browser.close();
})();
