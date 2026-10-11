const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function runVerification() {
  console.log("Launching Edge headless with remote debugging...");
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1440,900',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:3000'
  ]);

  // Wait 2 seconds for Edge to start
  await new Promise(r => setTimeout(r, 2000));

  // Get active CDP target
  const versionInfo = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = versionInfo.find(t => t.type === 'page');
  console.log("Connected to page target:", pageTarget.url);

  // Connect to WebSocket using native Node or basic HTTP endpoints
  // Edge CDP has /json endpoints, but also supports --screenshot directly!
  edge.kill();
  console.log("Edge CDP endpoint verified successfully.");
}

runVerification().catch(err => console.error("Error:", err.message));
