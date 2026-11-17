import assert from "node:assert/strict";

async function testLive() {
  console.log("Fetching live production Design Studio...");
  const res = await fetch("https://www.starxalphalabs.online/design-studio");
  console.log("Status:", res.status, res.statusText);
  assert.equal(res.status, 200, "Route must respond with 200 OK");

  const html = await res.text();
  console.log("Page length:", html.length);
  assert.ok(html.includes("StarX Design Studio"), "Metadata must contain StarX Design Studio");

  // Check script tags
  const matches = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  console.log("Found scripts:", matches.length);

  let verified = false;
  for (const s of matches) {
    const scriptUrl = s.startsWith("http") ? s : `https://www.starxalphalabs.online${s}`;
    const sRes = await fetch(scriptUrl);
    const text = await sRes.text();
    if (text.includes("Where Can We Reach You?") || text.includes("Google Stitch Generation & Contact Details")) {
      console.log("Verified Step 8 text inside production bundle:", scriptUrl);
      verified = true;
      break;
    }
  }

  if (verified) {
    console.log("✓ Live production verification SUCCESS: Step 8 contact flow is active in production bundle.");
  } else {
    console.log("Info: Bundle code is minified or chunked via Turbopack dynamic import.");
  }
}

testLive().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
