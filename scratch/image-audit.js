const https = require('https');
const http = require('http');

const imageUrls = [
  { section: 'Hero', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/323e335795520e8c9bd44142bb34d736962b34d96e0343b61da084cbbe3fc790.jpg' },
  { section: 'ProductIntroduction', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/86c8ec62c4e123b14b9cbe71ce03baca64a40da903495a8c33f3264ce41d1b77.jpg' },
  { section: 'ArchitectureInContext', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/f4a38b650b1c3e5f725c7157790b52a40be360d9706c094868234e87dbd2ff8a.jpg' },
  { section: 'ArchitecturalShowcase (1)', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/474a0e3017989ab258a710200d4d628f2686893dda97d2354b8427e302463a31.jpg' },
  { section: 'ArchitecturalShowcase (2)', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/16a361b636b1b8b6824e9ac0e384c422cada7c71a1f7dddce72c901a9c1e4b4f.jpg' },
  { section: 'LifestyleGallery (Office)', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/6ffb4de5fe8859b8b7e02d1038884f8c55cfeb68896c76b7019df1c014c52aaa.jpg' },
  { section: 'LifestyleGallery (Retreat)', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/f8b974f70c063e24fbd0d474dc8096fb6a365ec885211d6e0fddf299ff018ab1.jpg' },
  { section: 'LifestyleGallery (Lounge)', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/cab5d4d8b6e5d151446f8eb9520e174792184380b6c7d20333e9e1b441dcd319.jpg' },
  { section: 'Craftsmanship', url: 'https://www.crownpavilions.com/Images/pages/about/craftsmanship.webp' },
  { section: 'Configurator', url: 'https://www.crownpavilions.com/img/storage/v1/render/image/public/media/50a6c47dde51f8c3e01423ce2804d0348ff626b6b0a1f104b756bab82527f52b.webp' },
  { section: 'RelatedProducts (Heritage)', url: 'https://www.crownpavilions.com/Images/cards/heritage.webp' },
  { section: 'RelatedProducts (Sandringham)', url: 'https://www.crownpavilions.com/Images/cards/sandringham.webp' },
  { section: 'RelatedProducts (Buckingham)', url: 'https://www.crownpavilions.com/Images/cards/buckingham.webp' },
  { section: 'ShowsiteVisit', url: 'https://www.crownpavilions.com/Images/pages/about/showsite.webp' },
  { section: 'Trust (Lord Sugar)', url: 'https://www.crownpavilions.com/Images/pages/celebrity/lord-alan-sugar.webp' },
  { section: 'FinalConversion', url: 'https://www.crownpavilions.com/img/storage/v1/object/public/media/d116d86497182642842d1912562819c324fee6cddccd7bbfe094fa608d223c8d.jpg' },
];

function fetchImageMetadata(item) {
  return new Promise((resolve) => {
    https.get(item.url, (res) => {
      let chunks = [];
      let totalBytes = 0;
      res.on('data', (chunk) => {
        chunks.push(chunk);
        totalBytes += chunk.length;
      });
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        // Extract basic dimensions for JPEG / WebP / PNG
        let dimensions = null;
        if (item.url.endsWith('.jpg') || item.url.endsWith('.jpeg')) {
          dimensions = getJpegDimensions(buffer);
        } else if (item.url.endsWith('.webp')) {
          dimensions = getWebpDimensions(buffer);
        }
        resolve({
          section: item.section,
          url: item.url,
          status: res.statusCode,
          sizeBytes: totalBytes,
          sizeKB: Math.round(totalBytes / 1024),
          dimensions,
        });
      });
    }).on('error', (err) => {
      resolve({ section: item.section, url: item.url, error: err.message });
    });
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
  // VP8X format
  if (buffer.toString('ascii', 12, 16) === 'VP8X') {
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height };
  }
  // VP8 format
  if (buffer.toString('ascii', 12, 15) === 'VP8') {
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height };
  }
  // VP8L (lossless)
  if (buffer.toString('ascii', 12, 16) === 'VP8L') {
    const b1 = buffer[21];
    const b2 = buffer[22];
    const b3 = buffer[23];
    const b4 = buffer[24];
    const width = 1 + (((b2 & 0x3f) << 8) | b1);
    const height = 1 + (((b4 & 0xf) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
    return { width, height };
  }
  return null;
}

async function run() {
  console.log("Analyzing project image assets...");
  for (const item of imageUrls) {
    const meta = await fetchImageMetadata(item);
    console.log(JSON.stringify(meta));
  }
}

run();
