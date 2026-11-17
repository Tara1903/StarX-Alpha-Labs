import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = {};
if (fs.existsSync(".env.local")) {
  const content = fs.readFileSync(".env.local", "utf8");
  content.split("\n").forEach((line) => {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)?$/);
    if (m) env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
  });
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const client = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  console.log("Checking Supabase connection to:", supabaseUrl);
  
  const tables = [
    "design_studio_projects",
    "design_generation_jobs",
    "design_artifacts",
    "design_revisions",
    "quote_requests",
    "client_organizations"
  ];

  for (const table of tables) {
    const { data, error } = await client.from(table).select("*").limit(1);
    if (error) {
      console.log(`Table "${table}": ERROR -> ${error.message} (${error.code})`);
    } else {
      const keys = data && data[0] ? Object.keys(data[0]) : "Empty (0 rows)";
      console.log(`Table "${table}": EXISTS -> Columns:`, keys);
    }
  }

  const { data: buckets, error: bErr } = await client.storage.listBuckets();
  if (bErr) {
    console.log("Storage listBuckets ERROR:", bErr.message);
  } else {
    console.log("Storage Buckets:", buckets.map((b) => ({ id: b.id, name: b.name, public: b.public })));
  }
}

main().catch(console.error);
