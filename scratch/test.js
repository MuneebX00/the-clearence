const https = require('https');

const url = 'https://www.crownpavilions.com/img/storage/v1/object/public/media/50a6c47dde51f8c3e01423ce2804d0348ff626b6b0a1f104b756bab82527f52b.jpg';
https.get(url, (res) => {
  console.log("Status:", res.statusCode);
  console.log("Size:", res.headers['content-length']);
});
