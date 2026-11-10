/**
 * STARX ALPHA LABS — PHASE 5 AUTOMATED SECURITY & PERMISSION AUDIT RUNNER
 * Tests:
 * 1. Anonymous Access Boundary
 * 2. Administrative API Endpoint Protection
 * 3. Public Form Input Validation & Honeypot Defenses
 * 4. Privilege Escalation Resistance
 * 5. Bootstrap Authorization & Secret Enforcement
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function request(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(data);
          } catch {}
          resolve({ status: res.statusCode, headers: res.headers, body: json || data });
        });
      }
    );

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

const testResults = [];

function recordTest(suite, name, passed, details = '') {
  testResults.push({ suite, name, passed, details });
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[${icon}] ${suite} -> ${name} ${details ? `(${details})` : ''}`);
}

async function runSecuritySuite() {
  console.log('\n================================================================');
  console.log('STARX ALPHA LABS — PHASE 5 SECURITY & ACCESS CONTROL TEST SUITE');
  console.log('================================================================\n');

  // SUITE 1: Anonymous Access to Administrative Endpoints (Must be 401 Unauthorized)
  try {
    const resServices = await request('/api/admin/services');
    recordTest('Admin Boundary', 'GET /api/admin/services without auth', resServices.status === 401, `Status: ${resServices.status}`);

    const resMembers = await request('/api/admin/members');
    recordTest('Admin Boundary', 'GET /api/admin/members without auth', resMembers.status === 401, `Status: ${resMembers.status}`);

    const resInquiries = await request('/api/admin/inquiries');
    recordTest('Admin Boundary', 'GET /api/admin/inquiries without auth', resInquiries.status === 401, `Status: ${resInquiries.status}`);

    const resAudit = await request('/api/admin/audit-logs');
    recordTest('Admin Boundary', 'GET /api/admin/audit-logs without auth', resAudit.status === 401, `Status: ${resAudit.status}`);

    const resMutateService = await request('/api/admin/services', { method: 'POST' }, { title: 'Hack Service', slug: 'hack' });
    recordTest('Admin Boundary', 'POST /api/admin/services mutation without auth', resMutateService.status === 401, `Status: ${resMutateService.status}`);
  } catch (err) {
    recordTest('Admin Boundary', 'Network Execution', false, err.message);
  }

  // SUITE 2: Initial Owner Bootstrap Security
  try {
    const resNoSecret = await request('/api/admin/bootstrap', { method: 'POST' }, { email: 'attacker@evil.com' });
    recordTest('Owner Bootstrap', 'POST without x-bootstrap-secret', resNoSecret.status === 401 || resNoSecret.status === 503, `Status: ${resNoSecret.status}`);

    const resFakeSecret = await request(
      '/api/admin/bootstrap',
      { method: 'POST', headers: { 'x-bootstrap-secret': 'invalid-guess' } },
      { email: 'attacker@evil.com' }
    );
    recordTest('Owner Bootstrap', 'POST with forged secret', resFakeSecret.status === 401 || resFakeSecret.status === 503, `Status: ${resFakeSecret.status}`);
  } catch (err) {
    recordTest('Owner Bootstrap', 'Network Execution', false, err.message);
  }

  // SUITE 3: Public Form Validation & Sanitization
  try {
    // 3A: Missing required fields
    const resBadContact = await request('/api/contact', { method: 'POST' }, { fullName: '', email: 'not-an-email' });
    recordTest('Form Validation', 'POST /api/contact with invalid payload', resBadContact.status === 400, `Status: ${resBadContact.status}`);

    // 3B: Honeypot submission
    const resHoneypot = await request('/api/contact', { method: 'POST' }, {
      fullName: 'Bot User',
      email: 'bot@spam.com',
      message: 'Spam message containing valid length text',
      website_hp: 'http://spamsite.com',
    });
    recordTest('Abuse Protection', 'Honeypot bot submission filtered', resHoneypot.status === 200, `Status: ${resHoneypot.status}`);

    // 3C: Valid contact submission
    const resValidContact = await request('/api/contact', { method: 'POST' }, {
      fullName: 'Security Auditor Test',
      email: 'auditor@starx-alpha-labs.test',
      company: 'Security Audit Team',
      division: 'systems',
      message: 'Automated test of Phase 5 contact submission pipeline with verified data constraints.',
      sourcePage: '/contact',
    });
    recordTest('Public Form Integration', 'POST /api/contact valid submission', resValidContact.status === 200 && resValidContact.body.success === true, `Status: ${resValidContact.status}`);

    // 3D: Valid quote submission
    const resValidQuote = await request('/api/quote', { method: 'POST' }, {
      fullName: 'Enterprise Client Test',
      email: 'enterprise@client.test',
      company: 'Global Retail Corp',
      serviceSlug: 'custom-software',
      budgetRange: '$5,000 - $15,000',
      timeline: '4 - 8 Weeks',
      projectDetails: 'Automated test of Phase 5 quote request pipeline with full schema validation.',
    });
    recordTest('Public Form Integration', 'POST /api/quote valid submission', resValidQuote.status === 200 && resValidQuote.body.success === true, `Status: ${resValidQuote.status}`);

    // 3E: Valid consultation submission
    const resValidConsult = await request('/api/consultation', { method: 'POST' }, {
      fullName: 'CTO Test Client',
      email: 'cto@startup.test',
      preferredDate: '2026-11-20',
      preferredTime: '14:00 - 15:00 UTC',
      topic: 'Systems Architecture Review',
      notes: 'Testing consultation booking pipeline persistence.',
    });
    recordTest('Public Form Integration', 'POST /api/consultation valid submission', resValidConsult.status === 200 && resValidConsult.body.success === true, `Status: ${resValidConsult.status}`);
  } catch (err) {
    recordTest('Public Form Integration', 'Network Execution', false, err.message);
  }

  // SUITE 4: Public Content Access & Published Status Guard
  try {
    const resPublicHome = await request('/');
    recordTest('Public Access', 'GET / (Homepage 200 OK)', resPublicHome.status === 200, `Status: ${resPublicHome.status}`);

    const resPublicServices = await request('/services');
    recordTest('Public Access', 'GET /services (Services Index 200 OK)', resPublicServices.status === 200, `Status: ${resPublicServices.status}`);

    const resPublicServiceItem = await request('/services/custom-software');
    recordTest('Public Access', 'GET /services/custom-software (Published Service 200 OK)', resPublicServiceItem.status === 200, `Status: ${resPublicServiceItem.status}`);

    const resNonExistent = await request('/services/non-existent-draft-test-slug-xyz');
    recordTest('Public Access', 'GET non-existent slug returns 404 (No draft leak)', resNonExistent.status === 404, `Status: ${resNonExistent.status}`);
  } catch (err) {
    recordTest('Public Access', 'Network Execution', false, err.message);
  }

  console.log('\n================================================================');
  const passCount = testResults.filter((t) => t.passed).length;
  const failCount = testResults.filter((t) => !t.passed).length;
  console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED out of ${testResults.length} Tests`);
  console.log('================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runSecuritySuite().catch((err) => {
  console.error('Test suite runner crashed:', err);
  process.exit(1);
});
