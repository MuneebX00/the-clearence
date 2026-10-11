const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getWsUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const page = list.find(t => t.type === 'page');
          if (page && page.webSocketDebuggerUrl) {
            resolve(page.webSocketDebuggerUrl);
          } else {
            reject(new Error("No page target found with webSocketDebuggerUrl"));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.pending = new Map();
    this.events = [];
    this.failedRequests = [];
    this.networkRequests = [];

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
      if (msg.method === 'Network.responseReceived') {
        const resp = msg.params.response;
        this.networkRequests.push({ url: resp.url, status: resp.status, mimeType: resp.mimeType });
      }
      if (msg.method === 'Network.loadingFailed') {
        this.failedRequests.push(msg.params);
      }
    };
  }

  async connect() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
    });
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  }
}

async function run() {
  console.log("Starting Edge browser for comprehensive inspection...");
  const profileDir = path.join(__dirname, 'edge-profile');
  if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${profileDir}`,
    '--window-size=1440,900',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:3000'
  ]);

  await sleep(2500);

  const wsUrl = await getWsUrl();
  console.log("Connecting CDP WebSocket:", wsUrl);
  const client = new CDPClient(wsUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Network.enable');
  await client.send('DOM.enable');

  // Navigate to localhost:3000 and wait for load
  await client.send('Page.navigate', { url: 'http://localhost:3000' });
  await sleep(3000);

  console.log("\n==========================================");
  console.log("1. DESKTOP VIEWPORT (1440 x 900) INSPECTION");
  console.log("==========================================");

  // Check horizontal overflow
  const desktopOverflow = await client.eval(`({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  })`);
  console.log("Desktop Overflow Check:", desktopOverflow);

  // Check all images
  const imageAudit = await client.eval(`
    Array.from(document.querySelectorAll('img')).map((img, idx) => ({
      index: idx,
      src: img.currentSrc || img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: Math.round(img.getBoundingClientRect().width),
      renderedHeight: Math.round(img.getBoundingClientRect().height),
      complete: img.complete,
      sharpnessRatio: img.naturalWidth > 0 ? (img.naturalWidth / img.getBoundingClientRect().width).toFixed(2) : 0
    }))
  `);

  console.log("\nImage Elements Audit (Total:", imageAudit.length, "):");
  imageAudit.forEach(img => {
    console.log(`[${img.index}] Alt: "${img.alt}" | Natural: ${img.naturalWidth}x${img.naturalHeight} | Rendered: ${img.renderedWidth}x${img.renderedHeight} | Sharpness: ${img.sharpnessRatio}x | Loaded: ${img.complete}`);
    console.log(`    URL: ${img.src}`);
  });

  // Take screenshot of desktop
  const screenshot1440 = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/desktop-1440x900.png', Buffer.from(screenshot1440.data, 'base64'));
  console.log("\nSaved desktop screenshot to scratch/desktop-1440x900.png");

  console.log("\n==========================================");
  console.log("2. INTERACTION & COMPONENT LOGIC TESTS");
  console.log("==========================================");

  // Test Configurator
  const initialConfig = await client.eval(`({
    price: document.querySelector('#configurator .text-5xl')?.textContent?.trim(),
    selectedDepth: document.querySelector('#configurator button[class*="bg-forest"]')?.textContent?.trim()
  })`);
  console.log("Initial Configurator state:", initialConfig);

  // Click 5m width and 5m depth
  await client.eval(`
    const buttons = Array.from(document.querySelectorAll('#configurator button'));
    const btn5m = buttons.find(b => b.textContent.trim() === '5m');
    if (btn5m) btn5m.click();
  `);
  await sleep(500);

  const updatedConfig = await client.eval(`({
    price: document.querySelector('#configurator .text-5xl')?.textContent?.trim()
  })`);
  console.log("Configurator state after clicking 5m:", updatedConfig);

  // Test Reset button
  await client.eval(`
    const resetBtn = Array.from(document.querySelectorAll('#configurator button')).find(b => b.textContent.includes('Reset'));
    if (resetBtn) resetBtn.click();
  `);
  await sleep(500);
  const resetConfig = await client.eval(`({
    price: document.querySelector('#configurator .text-5xl')?.textContent?.trim(),
    saveStatus: document.querySelector('#configurator .animate-fade-in')?.textContent?.trim()
  })`);
  console.log("Configurator state after Reset:", resetConfig);

  // Test FAQ accordion
  const faqBefore = await client.eval(`document.querySelectorAll('#faqs button, section:has(h2:contains("Frequently")) button')[0]?.textContent`);
  await client.eval(`
    const faqButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('planning permission'));
    if (faqButtons[0]) faqButtons[0].click();
  `);
  await sleep(500);
  const faqExpanded = await client.eval(`
    const faqAns = document.querySelector('button span + span svg')?.closest('button')?.nextElementSibling?.textContent?.trim();
    faqAns ? faqAns.substring(0, 80) + '...' : 'none'
  `);
  console.log("FAQ Toggle Test - Answer expanded:", faqExpanded);

  // Check Quote section prefilled specs
  const quoteSpecs = await client.eval(`({
    footprint: document.querySelector('#quote .font-serif.text-forest')?.textContent?.trim(),
    price: document.querySelector('#quote .font-bold')?.textContent?.trim()
  })`);
  console.log("Quote Section Prefilled Spec:", quoteSpecs);

  // Test Showsite Visit form validation
  await client.eval(`
    const form = document.querySelector('#showsite form');
    if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  `);
  await sleep(500);
  const formValidationErrors = await client.eval(`
    Array.from(document.querySelectorAll('#showsite .text-red-800\\\\/60, #showsite p.text-red-800\\\\/60')).map(e => e.textContent)
  `);
  console.log("Showsite Form Validation Triggered Errors:", formValidationErrors);

  console.log("\n==========================================");
  console.log("3. MOBILE VIEWPORT (390 x 844) INSPECTION");
  console.log("==========================================");

  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(1000);

  const mobileOverflow = await client.eval(`({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  })`);
  console.log("Mobile Viewport Overflow Check:", mobileOverflow);

  // Test Mobile Navigation Hamburger
  const hamburgerExists = await client.eval(`Boolean(document.querySelector('header button[aria-label="Toggle menu"]'))`);
  console.log("Mobile Hamburger button exists:", hamburgerExists);

  if (hamburgerExists) {
    await client.eval(`document.querySelector('header button[aria-label="Toggle menu"]').click()`);
    await sleep(500);
    const menuOpen = await client.eval(`Boolean(document.querySelector('.fixed.inset-0.bg-forest\\\\/95'))`);
    console.log("Mobile Drawer opened upon tap:", menuOpen);
  }

  const screenshotMobile = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/mobile-390x844.png', Buffer.from(screenshotMobile.data, 'base64'));
  console.log("Saved mobile screenshot to scratch/mobile-390x844.png");

  console.log("\n==========================================");
  console.log("4. NETWORK REQUESTS & 404 AUDIT");
  console.log("==========================================");
  console.log("Total Network Requests captured:", client.networkRequests.length);
  const failed404s = client.networkRequests.filter(r => r.status >= 400);
  console.log("HTTP Errors (4xx/5xx):", failed404s.length === 0 ? "None - All 200 OK!" : failed404s);
  console.log("Failed Network Connections:", client.failedRequests.length === 0 ? "None" : client.failedRequests);

  edge.kill();
  console.log("\nBrowser inspection successfully completed.");
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
