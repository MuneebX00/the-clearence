const https = require('https');

https.get('https://www.crownpavilions.com/garden-rooms/crown-clarence-garden-room/', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const urls = [];
    const regex = /<img[^>]+src=["']([^"']+)["']/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      urls.push(match[1]);
    }
    console.log("Images found on page:");
    console.log(urls.join('\n'));
  });
});
