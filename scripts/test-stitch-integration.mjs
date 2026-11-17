/**
 * Live HTTP Integration Test for StarX Design Studio & Google Stitch Ecosystem
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3155";

async function runTests() {
  console.log(`[TEST] Starting Design Studio & Stitch Integration Test against ${BASE_URL}...`);
  let passed = 0;
  let failed = 0;

  // TEST 1: Check /design-studio route returns 200 OK
  try {
    const res = await fetch(`${BASE_URL}/design-studio`);
    if (res.status === 200) {
      console.log(`✓ [PASS] GET /design-studio returned HTTP 200 OK`);
      passed++;
    } else {
      console.error(`✗ [FAIL] GET /design-studio returned HTTP ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`✗ [FAIL] GET /design-studio connection error:`, err.message);
    failed++;
  }

  // TEST 2: POST /api/design-studio/projects
  let projectId = null;
  try {
    const briefPayload = {
      brief: {
        industrySlug: "real-estate-proptech",
        industryName: "Real Estate & PropTech",
        divisionSlug: "starx-business",
        divisionName: "StarX Business",
        projectName: "Serene Heights Resident Living Cockpit",
        description: "Modern gated community operating system with IoT turnstile telemetry and visitor passes.",
        platformTargets: ["Web Responsive (Desktop & Mobile)", "Native Android Mobile App"],
        selectedFeatures: [
          "Role-Based Access Control",
          "Real-Time Data Dashboard",
          "Automated WhatsApp Notifications",
        ],
        themePreference: "cosmic-dark",
        deviceTarget: "DESKTOP",
        modelPreference: "GEMINI_3_8_FLASH",
      },
      contact: {
        name: "Test Client",
        email: "test.client@starxalphalabs.online",
        phone: "+91 98765 43210",
      },
    };

    const res = await fetch(`${BASE_URL}/api/design-studio/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(briefPayload),
    });

    const data = await res.json();
    if (res.status === 201 && data.ok && data.project?.id) {
      projectId = data.project.id;
      console.log(`✓ [PASS] POST /api/design-studio/projects succeeded. Project Code: ${data.project.projectCode}`);
      passed++;
    } else {
      console.error(`✗ [FAIL] POST /api/design-studio/projects failed:`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✗ [FAIL] POST /api/design-studio/projects error:`, err.message);
    failed++;
  }

  // TEST 3: POST /api/design-studio/jobs (Trigger Stitch Generation)
  let artifactId = null;
  try {
    const jobPayload = {
      projectId,
      modelId: "GEMINI_3_8_FLASH",
      deviceType: "DESKTOP",
    };

    const res = await fetch(`${BASE_URL}/api/design-studio/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobPayload),
    });

    const data = await res.json();
    if (res.status === 200 && data.ok && data.job?.status === "completed" && data.artifact) {
      artifactId = data.artifact.id;
      console.log(`✓ [PASS] POST /api/design-studio/jobs succeeded.`);
      console.log(`   - Job Code: ${data.job.jobCode}`);
      console.log(`   - Provider Project: ${data.artifact.providerProjectId}`);
      console.log(`   - Thumbnail URL: ${data.artifact.thumbnailUrl.slice(0, 60)}...`);
      console.log(`   - Palette Tokens: ${data.artifact.palette.join(", ")}`);
      passed++;
    } else {
      console.error(`✗ [FAIL] POST /api/design-studio/jobs failed:`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✗ [FAIL] POST /api/design-studio/jobs error:`, err.message);
    failed++;
  }

  // TEST 4: GET /api/design-studio/artifacts?projectId=...
  try {
    const res = await fetch(`${BASE_URL}/api/design-studio/artifacts?projectId=${encodeURIComponent(projectId)}`);
    const data = await res.json();
    if (res.status === 200 && data.ok && data.artifact?.id === artifactId) {
      console.log(`✓ [PASS] GET /api/design-studio/artifacts retrieved verified active artifact.`);
      passed++;
    } else {
      console.error(`✗ [FAIL] GET /api/design-studio/artifacts failed:`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✗ [FAIL] GET /api/design-studio/artifacts error:`, err.message);
    failed++;
  }

  // TEST 5: POST /api/design-studio/revisions
  try {
    const revPayload = {
      projectId,
      artifactId,
      notes: "Increase contrast on security override modal and add biometric telemetry indicator.",
    };

    const res = await fetch(`${BASE_URL}/api/design-studio/revisions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(revPayload),
    });

    const data = await res.json();
    if (res.status === 201 && data.ok && data.revision?.id) {
      console.log(`✓ [PASS] POST /api/design-studio/revisions logged revision note: ${data.revision.notes}`);
      passed++;
    } else {
      console.error(`✗ [FAIL] POST /api/design-studio/revisions failed:`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✗ [FAIL] POST /api/design-studio/revisions error:`, err.message);
    failed++;
  }

  // TEST 6: PATCH /api/design-studio/revisions (Approve Design Direction)
  try {
    const approvePayload = {
      projectId,
      artifactId,
      contactName: "Vikram Malhotra",
      contactEmail: "vikram@malhotra-realty.com",
      contactPhone: "+91 98765 43210",
      notes: "Direction approved for commercial scoping",
    };

    const res = await fetch(`${BASE_URL}/api/design-studio/revisions`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(approvePayload),
    });

    const data = await res.json();
    if (res.status === 200 && data.ok && data.approved) {
      console.log(`✓ [PASS] PATCH /api/design-studio/revisions approved artifact successfully.`);
      passed++;
    } else {
      console.error(`✗ [FAIL] PATCH /api/design-studio/revisions approval failed:`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✗ [FAIL] PATCH /api/design-studio/revisions error:`, err.message);
    failed++;
  }

  // TEST 7: POST /api/quote (Handoff Flow)
  try {
    const quotePayload = {
      fullName: "Vikram Malhotra",
      email: "vikram@malhotra-realty.com",
      phone: "+91 98765 43210",
      company: "Malhotra Realty Enterprises",
      serviceSlug: "starx-business",
      budgetRange: "₹75,000 - ₹2,50,000",
      timeline: "3–5 Weeks",
      projectDetails: `STARX DESIGN STUDIO VERIFIED STITCH HANDOFF\nProject ID: ${projectId}\nApproved Artifact: ${artifactId}`,
      sourcePage: "/design-studio",
    };

    const res = await fetch(`${BASE_URL}/api/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quotePayload),
    });

    const data = await res.json();
    if (res.status === 200 && data.success) {
      console.log(`✓ [PASS] POST /api/quote successfully received Design Studio quotation handoff.`);
      passed++;
    } else {
      console.error(`✗ [FAIL] POST /api/quote failed:`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✗ [FAIL] POST /api/quote error:`, err.message);
    failed++;
  }

  console.log(`\n==================================================`);
  console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed`);
  console.log(`==================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
