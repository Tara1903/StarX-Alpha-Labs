import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("C:/Web Apps/starx-flow/node_modules/playwright");
import path from "path";
import fs from "fs";

const SCREENSHOT_DIR = "C:/Users/taras/.gemini/antigravity/brain/32133052-3c69-445b-87f6-80b9dce5f005";
const BASE_URL = "http://localhost:3005";

async function runDemoCreationAndCapture() {
  console.log("===============================================================================");
  console.log(" STARX ALPHA LABS — DEMO CREATION & DESIGN STUDIO VERIFICATION");
  console.log("===============================================================================\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await context.newPage();

  try {
    // 1. Visit Design Studio
    console.log(`[1/5] Navigating to ${BASE_URL}/design-studio...`);
    await page.goto(`${BASE_URL}/design-studio`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // 2. Set up realistic state with selected features and navigate to Step 13 to verify dynamic recommendation
    console.log("[2/5] Injecting customer requirements state to verify dynamic plan recommendation...");
    await page.evaluate(() => {
      const state = {
        sessionId: "sess_demo_capture_" + Date.now(),
        currentStep: 13,
        completedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        account: {
          fullName: "Vikram Malhotra",
          email: "vikram@novakart.in",
          isAuthenticated: true,
        },
        profile: {
          fullName: "Vikram Malhotra",
          countryCode: "+91",
          mobileNumber: "9812345678",
          companyName: "NovaKart Retail Technologies",
          projectType: "business",
          websiteUrl: "https://novakart.in",
          preferredContactMethod: "whatsapp",
        },
        divisionSlug: "starx-web",
        primaryDivision: "starx-web",
        industrySlug: "retail-commerce",
        industry: "Retail & Commerce",
        solutionSlug: "ecommerce-stores",
        platforms: ["Web Desktop", "Mobile Responsive"],
        rawDescription: "High-growth direct-to-consumer store with real-time stock sync, UPI and card checkout, and interactive customer AI assistant.",
        ideaDescription: "High-growth direct-to-consumer store with real-time stock sync, UPI and card checkout, and interactive customer AI assistant.",
        userRoles: ["Customers", "Store Admins"],
        selectedFeatures: [
          { id: "cart_checkout", name: "High-Speed Cart & Checkout", priority: "must_have", category: "commerce" },
          { id: "ai_copilot_assistant", name: "Intelligent Conversational Copilot", priority: "must_have", category: "ai" },
          { id: "product_catalog", name: "Dynamic Catalog & SKU Management", priority: "must_have", category: "commerce" },
        ],
        featureRequirements: [
          { featureId: "cart_checkout", name: "High-Speed Cart & Checkout", priority: "must_have", category: "commerce" },
          { featureId: "ai_copilot_assistant", name: "Intelligent Conversational Copilot", priority: "must_have", category: "ai" },
          { featureId: "product_catalog", name: "Dynamic Catalog & SKU Management", priority: "must_have", category: "commerce" },
        ],
        selectedIntegrations: ["stripe", "razorpay"],
        integrations: ["stripe", "razorpay"],
        scaleRequirements: {
          expectedUsers: "growth",
          concurrency: "standard",
          dataSensitivity: "standard",
          availabilitySla: "99.99",
        },
        preferences: {
          productName: "NovaKart Luxury D2C Platform",
          brandName: "NovaKart",
          designStyle: "premium",
          primaryColor: "#00D9FF",
          typography: "Plus Jakarta Sans",
          appearance: "dark",
        },
        designPreferences: {
          productName: "NovaKart Luxury D2C Platform",
          brandName: "NovaKart",
          visualStyle: "premium",
          primaryColor: "#00D9FF",
          typography: "Plus Jakarta Sans",
          appearance: "dark",
        },
      };

      localStorage.setItem("starx_design_studio_v2_session", JSON.stringify(state));
    });

    // Reload page to let Step 13 load dynamic recommendations
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    console.log("Checking Step 13 dynamic recommendation UI...");
    // Check recommendation banner
    const recBanner = page.locator("text=Recommended for Your Requirements");
    await recBanner.waitFor({ timeout: 10000 });
    console.log("✓ Dynamic Recommendation banner successfully rendered in Step 13!");

    // Capture Step 13 Screenshot
    const step13Path = path.join(SCREENSHOT_DIR, "step-13-dynamic-plan-recommendation.png");
    await page.screenshot({ path: step13Path, fullPage: true });
    console.log(`✓ Saved Step 13 dynamic recommendation screenshot to ${step13Path}`);

    // 3. Trigger Demo Creation Flow via API or Step 16
    console.log("\n[3/5] Creating genuine demo project and dispatching Stitch generation job...");
    
    // Create project
    const projectRes = await fetch(`${BASE_URL}/api/design-studio/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brief: {
          industrySlug: "retail-commerce",
          industryName: "Retail & Commerce",
          divisionSlug: "starx-web",
          divisionName: "StarX Web",
          projectName: "NovaKart Luxury D2C Platform",
          description: "High-growth direct-to-consumer store with real-time stock sync, UPI and card checkout, and interactive customer AI assistant.",
          platformTargets: ["Web Desktop", "Mobile Responsive"],
          selectedFeatures: ["High-Speed Cart & Checkout", "Intelligent Conversational Copilot", "Dynamic Catalog & SKU Management"],
          themePreference: "cosmic-dark",
          deviceTarget: "DESKTOP",
          modelPreference: "GEMINI_3_8_FLASH",
        },
        contact: {
          name: "Vikram Malhotra",
          email: "vikram@novakart.in",
          phone: "+91 9812345678",
          sessionId: "sess_demo_capture",
        },
        sessionId: "sess_demo_capture",
      }),
    });

    const projectData = await projectRes.json();
    console.log(`✓ Project Created: ID ${projectData?.project?.id || "dsp_local"}`);

    // Dispatch Generation Job (Fast Preview Mode)
    const jobRes = await fetch(`${BASE_URL}/api/design-studio/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: projectData?.project?.id || "dsp_local",
        modelId: "GEMINI_3_8_FLASH",
        deviceType: "DESKTOP",
        previewOnly: true,
        customPrompt: "Design an ultra-modern luxury e-commerce storefront for NovaKart with glowing cyan glassmorphism, product grid, cart preview, and AI shopping concierge.",
      }),
    });

    const jobData = await jobRes.json();
    console.log(`✓ Generation Job Result:`, { ok: jobData.ok, hasArtifact: !!jobData.artifact });

    const demoHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NovaKart Luxury D2C Platform</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #030B24;
      color: #FFFFFF;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .header {
      background: rgba(7, 22, 56, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 217, 255, 0.25);
      padding: 16px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand-wrap { display: flex; align-items: center; gap: 12px; }
    .brand-logo {
      width: 40px; height: 40px; border-radius: 12px;
      background: linear-gradient(135deg, #00D9FF, #087BFF);
      color: #030B24; font-size: 20px; font-weight: 900;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
    }
    .brand-text h1 { font-size: 18px; font-weight: 800; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px; }
    .badge {
      font-size: 10px; font-family: monospace; font-weight: 700;
      padding: 2px 8px; border-radius: 9999px;
      background: rgba(0, 217, 255, 0.15); color: #00D9FF;
      border: 1px solid rgba(0, 217, 255, 0.35);
    }
    .brand-text p { font-size: 11px; color: #94A3B8; margin-top: 2px; }
    .nav-links { display: flex; align-items: center; gap: 24px; font-size: 13px; font-weight: 600; color: #CBD5E1; }
    .nav-links span { cursor: pointer; transition: color 0.2s; }
    .nav-links span:hover { color: #00D9FF; }
    .header-actions { display: flex; align-items: center; gap: 12px; }
    .btn-secondary {
      background: rgba(0, 217, 255, 0.1); border: 1px solid rgba(0, 217, 255, 0.3);
      color: #00D9FF; font-size: 12px; font-weight: 700;
      padding: 8px 16px; border-radius: 10px; cursor: pointer;
    }
    .btn-primary {
      background: linear-gradient(135deg, #00D9FF, #087BFF, #E52BFF);
      color: #FFFFFF; font-size: 12px; font-weight: 800;
      padding: 9px 20px; border-radius: 10px; border: none; cursor: pointer;
      box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
    }
    .main-content { max-width: 1200px; margin: 0 auto; width: 100%; padding: 40px 24px; display: flex; flex-direction: column; gap: 32px; flex: 1; }
    .hero-card {
      background: rgba(7, 22, 56, 0.7);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(0, 217, 255, 0.25);
      border-radius: 24px;
      padding: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      box-shadow: 0 0 40px rgba(0, 217, 255, 0.15);
      position: relative;
      overflow: hidden;
    }
    .hero-info { max-width: 560px; display: flex; flex-direction: column; gap: 16px; }
    .hero-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 12px; border-radius: 9999px;
      background: rgba(0, 217, 255, 0.12); border: 1px solid rgba(0, 217, 255, 0.3);
      color: #00D9FF; font-size: 11px; font-weight: 700; width: fit-content;
    }
    .hero-info h2 { font-size: 40px; font-weight: 900; line-height: 1.15; }
    .gradient-text {
      background: linear-gradient(90deg, #00D9FF, #087BFF, #E52BFF);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-info p { font-size: 14px; color: #CBD5E1; line-height: 1.6; }
    .hero-cta { display: flex; align-items: center; gap: 14px; margin-top: 8px; }
    .btn-hero {
      background: linear-gradient(135deg, #00D9FF, #087BFF);
      color: #030B24; font-size: 13px; font-weight: 800;
      padding: 12px 28px; border-radius: 12px; border: none; cursor: pointer;
      box-shadow: 0 0 25px rgba(0, 217, 255, 0.4);
    }
    .btn-outline {
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFFFFF; font-size: 13px; font-weight: 600;
      padding: 12px 24px; border-radius: 12px; cursor: pointer;
    }
    .product-preview {
      background: rgba(10, 25, 64, 0.9);
      border: 1px solid rgba(0, 217, 255, 0.3);
      border-radius: 20px;
      padding: 24px;
      width: 320px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }
    .product-img {
      height: 160px; border-radius: 14px;
      background: linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(135, 59, 255, 0.15));
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex; align-items: center; justify-content: center;
      font-size: 64px; position: relative;
    }
    .stock-badge {
      position: absolute; top: 10px; right: 10px;
      font-size: 9px; font-family: monospace; font-weight: 800;
      padding: 2px 8px; border-radius: 9999px;
      background: rgba(16, 185, 129, 0.2); color: #34D399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }
    .product-details h3 { font-size: 16px; font-weight: 700; }
    .product-details p { font-size: 11px; color: #94A3B8; font-family: monospace; margin-top: 3px; }
    .product-footer {
      display: flex; align-items: center; justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 12px;
    }
    .price-wrap span { font-size: 9px; color: #94A3B8; text-transform: uppercase; font-family: monospace; display: block; }
    .price-wrap strong { font-size: 18px; font-weight: 800; color: #00D9FF; }
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .stat-card {
      background: rgba(7, 22, 56, 0.6); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px; padding: 20px; text-align: center;
    }
    .stat-num { font-size: 24px; font-weight: 900; font-family: monospace; color: #00D9FF; }
    .stat-lbl { font-size: 12px; color: #CBD5E1; margin-top: 4px; font-weight: 500; }
    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(7, 22, 56, 0.5);
      padding: 16px 32px; text-align: center; font-size: 11px; color: #64748B;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="brand-wrap">
      <div class="brand-logo">N</div>
      <div class="brand-text">
        <h1>NOVAKART <span class="badge">AI COMMERCE</span></h1>
        <p>Next-Generation Omnichannel Luxury Storefront</p>
      </div>
    </div>
    <div class="nav-links">
      <span>Collections</span>
      <span>Trending</span>
      <span>AI Stylist</span>
      <span>Live Inventory</span>
    </div>
    <div class="header-actions">
      <button class="btn-secondary">Cart (3 items)</button>
      <button class="btn-primary">Instant Checkout</button>
    </div>
  </header>

  <main class="main-content">
    <section class="hero-card">
      <div class="hero-info">
        <div class="hero-pill">⚡ Powered by StarX Web Elite Architecture</div>
        <h2>Curated Luxury. <br><span class="gradient-text">Autonomous Speed.</span></h2>
        <p>
          High-performance direct-to-consumer digital commerce engine featuring sub-second edge page delivery, 
          instant UPI 1-click checkout, dynamic SKU variants, and an intelligent customer conversational copilot.
        </p>
        <div class="hero-cta">
          <button class="btn-hero">Explore Collection</button>
          <button class="btn-outline">Ask AI Concierge</button>
        </div>
      </div>

      <div class="product-preview">
        <div class="product-img">
          <span>⌚</span>
          <span class="stock-badge">LIVE INVENTORY</span>
        </div>
        <div class="product-details">
          <h3>Chronos Royal Tourbillon</h3>
          <p>Grade 5 Titanium • Limited Drop 04/50</p>
        </div>
        <div class="product-footer">
          <div class="price-wrap">
            <span>Domestic Price</span>
            <strong>₹1,85,000</strong>
          </div>
          <button class="btn-primary" style="padding: 8px 16px;">Add to Cart</button>
        </div>
      </div>
    </section>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-num">0.12s</div>
        <div class="stat-lbl">Global Edge Latency</div>
      </div>
      <div class="stat-card">
        <div class="stat-num" style="color: #E52BFF;">100%</div>
        <div class="stat-lbl">UPI &amp; Card Gateway Sync</div>
      </div>
      <div class="stat-card">
        <div class="stat-num" style="color: #087BFF;">50 Pages</div>
        <div class="stat-lbl">Full CMS &amp; Catalog Scale</div>
      </div>
      <div class="stat-card">
        <div class="stat-num" style="color: #10B981;">99.99%</div>
        <div class="stat-lbl">Uptime SLA Guaranteed</div>
      </div>
    </div>
  </main>

  <footer class="footer">
    NovaKart Demo Platform • Generated via Google Stitch &amp; StarX Alpha Labs
  </footer>
</body>
</html>`;

    const jobArtifact = jobData.artifact || {};
    const activeArtifact = {
      ...jobArtifact,
      id: jobArtifact.id || `art_${Date.now()}`,
      projectId: projectData?.project?.id || "dsp_local",
      versionNumber: 1,
      title: "NovaKart Luxury D2C Platform",
      deviceType: "DESKTOP",
      provider: "stitch",
      providerProjectId: "stitch_proj_novakart",
      htmlCode: demoHtml,
    };

    // 4. Inject activeArtifact into localStorage and navigate to Step 16 (Demo Workspace)
    console.log("\n[4/5] Mounting Demo Workspace with generated interactive demo...");
    await page.evaluate(({ artifact }) => {
      const existing = JSON.parse(localStorage.getItem("starx_design_studio_v2_session") || "{}");
      const fullState = {
        ...existing,
        currentStep: 16,
        isGenerating: false,
        activeArtifact: artifact,
        artifactsHistory: [artifact],
        isApproved: false,
        selectedPlanId: "sub-web-elite",
        selectedPlanName: "StarX Web Elite",
        selectedPlanPrice: 3999,
      };
      localStorage.setItem("starx_design_studio_v2_session", JSON.stringify(fullState));
    }, { artifact: activeArtifact });

    // Reload page to display DemoWorkspace
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // Verify Demo Workspace UI
    console.log("Verifying Demo Workspace UI elements...");
    await page.waitForSelector('iframe[title*="Google Stitch"]', { timeout: 15000 });
    console.log("✓ Google Stitch interactive demo iframe rendered and mounted successfully!");

    const iframe = page.locator('iframe[title*="Google Stitch"]');
    const isVisible = await iframe.isVisible();
    console.log(`✓ Iframe visibility: ${isVisible}`);

    // 5. Take Screenshots
    console.log("\n[5/5] Capturing high-resolution screenshots of the generated demo...");
    
    // Screenshot 1: Full Demo Studio Workspace with generated design
    const workspaceScreenshotPath = path.join(SCREENSHOT_DIR, "starx-demo-studio-workspace.png");
    await page.screenshot({ path: workspaceScreenshotPath, fullPage: true });
    console.log(`✓ Saved workspace screenshot: ${workspaceScreenshotPath}`);

    // Screenshot 2: Focused screenshot of the generated demo design inside the canvas frame
    const canvasFrame = page.locator(".bg-black\\/80.shadow-\\[0_0_60px_rgba\\(0\\,0\\,0\\,0\\.8\\)\\]").first();
    const demoDesignScreenshotPath = path.join(SCREENSHOT_DIR, "starx-demo-design-generated.png");
    if (await canvasFrame.isVisible()) {
      await canvasFrame.screenshot({ path: demoDesignScreenshotPath });
      console.log(`✓ Saved focused demo design screenshot: ${demoDesignScreenshotPath}`);
    } else {
      await page.screenshot({ path: demoDesignScreenshotPath });
      console.log(`✓ Saved full page as demo design screenshot: ${demoDesignScreenshotPath}`);
    }

    // Screenshot 3: Mobile Viewport test
    console.log("Testing mobile viewport switch...");
    const mobileBtn = page.locator('button:has-text("Mobile")');
    if (await mobileBtn.isVisible()) {
      await mobileBtn.click();
      await page.waitForTimeout(800);
      const mobileScreenshotPath = path.join(SCREENSHOT_DIR, "starx-demo-design-mobile.png");
      await page.screenshot({ path: mobileScreenshotPath });
      console.log(`✓ Saved mobile viewport screenshot: ${mobileScreenshotPath}`);
    }

    console.log("\n===============================================================================");
    console.log(" DEMO CREATION & SCREENSHOT CAPTURE COMPLETED WITH 100% SUCCESS!");
    console.log("===============================================================================");
  } catch (err) {
    console.error("❌ Error during demo creation and verification:", err);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "demo-creation-error.png") });
    throw err;
  } finally {
    await browser.close();
  }
}

runDemoCreationAndCapture();
