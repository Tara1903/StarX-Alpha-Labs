const http = require('http');
const fs = require('fs');
const path = require('path');

const demosSource = fs.readFileSync(path.join(__dirname, '../src/data/demos.ts'), 'utf8');
const startMarker = 'export const ALL_DEMOS: DemoModel[] = ';
const startIdx = demosSource.indexOf(startMarker);
const jsonStart = demosSource.indexOf('[', startIdx + startMarker.length - 2);
const jsonEnd = demosSource.lastIndexOf('];') + 1;
const demos = JSON.parse(demosSource.substring(jsonStart, jsonEnd));

console.log(`Starting automated HTTP 200 check across all 160 demos (320 URLs)...`);

function fetchStatus(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      resolve({ path: urlPath, status: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ path: urlPath, status: 'ERROR: ' + err.message });
    });
    req.setTimeout(5000, () => {
      req.abort();
      resolve({ path: urlPath, status: 'TIMEOUT' });
    });
  });
}

async function run() {
  let passedDetail = 0;
  let failedDetail = 0;
  let passedLive = 0;
  let failedLive = 0;

  // Test in concurrent batches of 10
  const BATCH_SIZE = 16;
  for (let i = 0; i < demos.length; i += BATCH_SIZE) {
    const batch = demos.slice(i, i + BATCH_SIZE);
    
    // Check detail pages
    const detailPromises = batch.map(d => fetchStatus(`/demos/${d.categorySlug}/${d.slug}`));
    const detailResults = await Promise.all(detailPromises);
    detailResults.forEach(r => {
      if (r.status === 200) {
        passedDetail++;
      } else {
        console.error(`FAIL Detail: ${r.path} -> ${r.status}`);
        failedDetail++;
      }
    });

    // Check live sandbox pages
    const livePromises = batch.map(d => fetchStatus(`/demos/${d.categorySlug}/${d.slug}/live`));
    const liveResults = await Promise.all(livePromises);
    liveResults.forEach(r => {
      if (r.status === 200) {
        passedLive++;
      } else {
        console.error(`FAIL Live Sandbox: ${r.path} -> ${r.status}`);
        failedLive++;
      }
    });

    process.stdout.write(`Verified ${Math.min(i + BATCH_SIZE, demos.length)} / ${demos.length} demos...\r`);
  }

  console.log(`\n======================================================`);
  console.log(`160 DEMOS RUNTIME VERIFICATION RESULTS:`);
  console.log(`- 160 Detail Pages (/demos/{cat}/{slug}):       ${passedDetail} PASSED / ${failedDetail} FAILED`);
  console.log(`- 160 Live Sandboxes (/demos/{cat}/{slug}/live): ${passedLive} PASSED / ${failedLive} FAILED`);
  console.log(`- Total Tested URL Endpoints:                   ${passedDetail + passedLive} / 320`);
  console.log(`======================================================`);

  if (failedDetail === 0 && failedLive === 0) {
    console.log(`SUCCESS: 100% OF ALL 160 DEMOS AND SANDBOXES ARE ACTIVE & RETURNING HTTP 200!`);
  } else {
    process.exit(1);
  }
}

run();
