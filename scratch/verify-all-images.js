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
        const list = JSON.parse(data);
        const page = list.find(t => t.type === 'page');
        resolve(page.webSocketDebuggerUrl);
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

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
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
  const profileDir = path.join(__dirname, 'edge-profile-scroll');
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
  const client = new CDPClient(wsUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Network.enable');

  await client.send('Page.navigate', { url: 'http://localhost:3000' });
  await sleep(2000);

  console.log("Scrolling through entire page to trigger lazy loading on all sections...");
  await client.eval(`
    new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // scroll back to top
          resolve();
        }
      }, 100);
    })
  `);

  // Wait 4 seconds for all images to complete downloading and decoding
  await sleep(4000);

  const fullAudit = await client.eval(`
    Array.from(document.querySelectorAll('img')).map((img, idx) => ({
      index: idx,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: Math.round(img.getBoundingClientRect().width),
      renderedHeight: Math.round(img.getBoundingClientRect().height),
      loaded: img.complete && img.naturalWidth > 0,
      sharpness: img.naturalWidth > 0 ? (img.naturalWidth / img.getBoundingClientRect().width).toFixed(2) : 0,
      url: img.currentSrc || img.src
    }))
  `);

  console.log("\n==========================================");
  console.log("FULL-PAGE IMAGE SHARPNESS & LOAD AUDIT");
  console.log("==========================================");
  let allLoaded = true;
  fullAudit.forEach(img => {
    const isSharp = parseFloat(img.sharpness) >= 1.0;
    console.log(`[${img.index}] "${img.alt}"`);
    console.log(`     Natural: ${img.naturalWidth}x${img.naturalHeight} | Rendered: ${img.renderedWidth}x${img.renderedHeight} | Ratio: ${img.sharpness}x (${isSharp ? 'SHARP ✓' : 'Under 1x'})`);
    console.log(`     Loaded: ${img.loaded} | URL: ${img.url}`);
    if (!img.loaded) allLoaded = false;
  });

  console.log("\nAll images loaded successfully:", allLoaded);

  // Take screenshot of each section individually at 100% zoom!
  const sections = ['#introduction', '#gallery', '#configurator', '#specs', '#quote', '#showsite'];
  for (const sel of sections) {
    await client.eval(`document.querySelector('${sel}')?.scrollIntoView({ behavior: 'instant' })`);
    await sleep(600);
    const ss = await client.send('Page.captureScreenshot', { format: 'png' });
    const cleanName = sel.replace('#', '');
    fs.writeFileSync(`scratch/section-${cleanName}.png`, Buffer.from(ss.data, 'base64'));
    console.log(`Captured 100% zoom screenshot for section ${sel} -> scratch/section-${cleanName}.png`);
  }

  edge.kill();
  console.log("\nVerification complete!");
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
