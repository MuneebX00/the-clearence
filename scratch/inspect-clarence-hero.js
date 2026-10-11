const https = require('https');

https.get('https://www.crownpavilions.com/garden-rooms/crown-clarence-garden-room/', (res) => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    // Look for background images, hero sections, header images
    const heroMatches = html.match(/(?:hero|banner|header)[^>]*?>[\s\S]*?<\/div>/gi) || [];
    console.log("Hero snippet matches:", heroMatches.length);
    for (const m of heroMatches.slice(0, 5)) {
      console.log(m.substring(0, 300));
      console.log("---");
    }

    // Look for all url(...) in style attributes
    const styleUrls = html.match(/url\(['"]?([^'"\)]+)['"]?\)/gi) || [];
    console.log("Style URLs:", styleUrls);

    // Look for all img src
    const imgMatches = html.match(/<img[^>]+>/gi) || [];
    console.log("First 10 img tags:");
    for (const img of imgMatches.slice(0, 10)) {
      console.log(img);
    }
  });
});
