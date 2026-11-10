/**
 * STARX ALPHA LABS — Initial Owner Bootstrap Script
 * Usage:
 *   node scripts/bootstrap-owner.js <email> <password> [fullName]
 *
 * Example:
 *   node scripts/bootstrap-owner.js admin@starxalphalabs.com MySecurePass123 "Executive Director"
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 1. Read STARX_BOOTSTRAP_SECRET from .env.local or process.env
let bootstrapSecret = process.env.STARX_BOOTSTRAP_SECRET;
const envLocalPath = path.resolve(__dirname, '..', '.env.local');

if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('STARX_BOOTSTRAP_SECRET=')) {
      bootstrapSecret = trimmed.substring('STARX_BOOTSTRAP_SECRET='.length).trim();
      break;
    }
  }
}

async function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n========================================================');
  console.log('   STARX ALPHA LABS — ROOT OWNER BOOTSTRAP PROVISIONER  ');
  console.log('========================================================\n');

  if (!bootstrapSecret || bootstrapSecret.length < 16) {
    console.error('❌ Error: STARX_BOOTSTRAP_SECRET is missing or under 16 characters in .env.local.');
    console.error('   Please add STARX_BOOTSTRAP_SECRET=<your-secret> into .env.local and try again.');
    process.exit(1);
  }

  let email = process.argv[2];
  let password = process.argv[3];
  let fullName = process.argv[4];

  if (!email) {
    email = await prompt('Enter Owner Corporate Email (e.g. director@starxalphalabs.com): ');
  }
  if (!password) {
    password = await prompt('Enter Owner Password (minimum 8 characters): ');
  }
  if (!fullName) {
    fullName = await prompt('Enter Full Name (e.g. Executive Director): ') || 'Initial System Owner';
  }

  if (!email || !email.includes('@')) {
    console.error('❌ Error: A valid corporate email is required.');
    process.exit(1);
  }

  if (!password || password.length < 8) {
    console.error('❌ Error: Password must be at least 8 characters.');
    process.exit(1);
  }

  const payload = JSON.stringify({ email, password, fullName });
  console.log(`\nDispatching secure bootstrap request to http://localhost:3000/api/admin/bootstrap...`);

  try {
    const res = await fetch('http://localhost:3000/api/admin/bootstrap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-bootstrap-secret': bootstrapSecret,
      },
      body: payload,
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      console.log('\n✅ SUCCESS! Root Owner account provisioned successfully.');
      console.log(`   User ID:   ${data.userId || data.member?.user_id || 'Registered'}`);
      console.log(`   Email:     ${email}`);
      console.log(`   Role:      owner`);
      console.log('\nYou can now sign in at:');
      console.log('   👉 http://localhost:3000/admin/login\n');
    } else {
      console.error(`\n❌ Bootstrap Failed (HTTP ${res.status}):`);
      console.error(`   Message: ${data.error || data.message || 'Unknown server response'}`);
      if (res.status === 403 || res.status === 409) {
        console.error('   Note: An Owner account has already been claimed for this system.');
      }
    }
  } catch (err) {
    console.error(`\n❌ Network Error: Could not connect to http://localhost:3000.`);
    console.error(`   Make sure the server is running with: npm run dev (or start-server.bat)`);
    console.error(`   Details: ${err.message}`);
  }
}

main();
