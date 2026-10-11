const https = require('https');

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
        if (total > 65536) res.destroy();
      });
      res.on('close', () => {
        const buffer = Buffer.concat(chunks);
        let dim = null;
        if (url.includes('.jpg') || url.includes('.jpeg')) dim = getJpegDimensions(buffer);
        else if (url.includes('.webp')) dim = getWebpDimensions(buffer);
        resolve({ url, dim, status: res.statusCode });
      });
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        let dim = null;
        if (url.includes('.jpg') || url.includes('.jpeg')) dim = getJpegDimensions(buffer);
        else if (url.includes('.webp')) dim = getWebpDimensions(buffer);
        resolve({ url, dim, status: res.statusCode });
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const html = await fetchHtml('https://www.crownpavilions.com/garden-rooms/crown-clarence-garden-room/');
  const matches = html.matchAll(/(?:src|href|srcset)=["']([^"']+\.(?:jpg|jpeg|webp|png))(?:\?[^"']*)?["']/gi);
  const urls = new Set();
  for (const m of matches) {
    let u = m[1];
    if (u.startsWith('//')) u = 'https:' + u;
    else if (u.startsWith('/')) u = 'https://www.crownpavilions.com' + u;
    if (u.startsWith('https://www.crownpavilions.com')) urls.add(u);
  }

  console.log(`Checking ${urls.size} images from Clarence page...`);
  for (const u of Array.from(urls)) {
    const res = await probeImage(u);
    if (res && res.dim) {
      console.log(`${res.dim.width}x${res.dim.height} | ${res.url}`);
    }
  }
}

main();
