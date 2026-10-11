const https = require('https');

const pages = [
  'https://www.crownpavilions.com/',
  'https://www.crownpavilions.com/garden-rooms/',
  'https://www.crownpavilions.com/garden-rooms/crown-clarence-garden-room/',
  'https://www.crownpavilions.com/garden-rooms/bespoke-garden-rooms/',
  'https://www.crownpavilions.com/about-us/'
];

function fetchHtml(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function getJpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    const length = buffer.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
  return null;
}

function getWebpDimensions(buffer) {
  if (buffer.length < 30) return null;
  if (buffer.toString('ascii', 12, 16) === 'VP8X') {
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height };
  }
  if (buffer.toString('ascii', 12, 15) === 'VP8') {
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height };
  }
  return null;
}

function probeImage(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) return resolve(null);
      let chunks = [];
      let total = 0;
      res.on('data', (c) => {
        chunks.push(c);
        total += c.length;
        if (total > 65536) { // 64KB is enough for header
          res.destroy();
        }
      });
      res.on('close', () => {
        const buffer = Buffer.concat(chunks);
        let dim = null;
        if (url.includes('.jpg') || url.includes('.jpeg')) dim = getJpegDimensions(buffer);
        else if (url.includes('.webp')) dim = getWebpDimensions(buffer);
        resolve({ url, dim, size: total });
      });
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        let dim = null;
        if (url.includes('.jpg') || url.includes('.jpeg')) dim = getJpegDimensions(buffer);
        else if (url.includes('.webp')) dim = getWebpDimensions(buffer);
        resolve({ url, dim, size: total });
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const allUrls = new Set();
  for (const page of pages) {
    const html = await fetchHtml(page);
    const matches = html.matchAll(/(?:src|href|srcset)=["']([^"']+\.(?:jpg|jpeg|webp|png))(?:\?[^"']*)?["']/gi);
    for (const m of matches) {
      let u = m[1];
      if (u.startsWith('//')) u = 'https:' + u;
      else if (u.startsWith('/')) u = 'https://www.crownpavilions.com' + u;
      if (u.startsWith('https://www.crownpavilions.com')) {
        allUrls.add(u);
      }
    }
  }

  console.log(`Found ${allUrls.size} unique image URLs. Probing dimensions...`);
  const results = [];
  for (const u of Array.from(allUrls)) {
    const res = await probeImage(u);
    if (res && res.dim && res.dim.width >= 1000) {
      results.push(res);
      console.log(`[HD] ${res.dim.width}x${res.dim.height} - ${res.url}`);
    }
  }
}

main();
