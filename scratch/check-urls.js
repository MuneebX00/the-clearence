const fs = require('fs');
const https = require('https');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

const urls = new Set();
files.forEach(f => {
  const content = fs.readFileSync(path.join(componentsDir, f), 'utf8');
  const matches = content.match(/https:\/\/www\.crownpavilions\.com[^"']+/g);
  if (matches) {
    matches.forEach(m => urls.add(m));
  }
});

console.log("Checking " + urls.size + " URLs...");

Array.from(urls).forEach(url => {
  https.get(url, (res) => {
    console.log(res.statusCode, url);
  }).on('error', (e) => console.log('Error', url, e.message));
});
