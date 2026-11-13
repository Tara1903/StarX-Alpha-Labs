const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync('.env.local', 'utf8').split('\n');
const env = {};
for (const line of lines) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) {
    let v = (m[2] || '').trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    env[m[1]] = v;
  }
}
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const KEEP_SLUGS = [
  'food-delivery-management',
  'qsr-management',
  'ecommerce-storefront',
  'multi-vendor-marketplace',
  'online-fashion-boutique',
  'restaurant-management-pilot'
];

async function run() {
  console.log('1. Fetching all current forge_demos from Supabase...');
  const { data: allDemos, error } = await supabase.from('forge_demos').select('*');
  if (error) {
    console.error('Fetch error:', error);
    process.exit(1);
  }

  const backupDir = path.join('scratch', 'backups', 'reset-' + new Date().toISOString().replace(/[:.]/g, '-'));
  fs.mkdirSync(backupDir, { recursive: true });
  fs.writeFileSync(path.join(backupDir, 'forge_demos_pre_reset.json'), JSON.stringify(allDemos, null, 2));
  console.log('Saved backup of', allDemos.length, 'records to', backupDir);

  // Identify the 23 scrapped demos
  const scrappedDemos = allDemos.filter(d => {
    if (!d.catalog_id) return false; // Pilot has null catalog_id
    if (d.catalog_id > 28) return false; // Batches 3+ are untouched planned
    return !KEEP_SLUGS.includes(d.slug);
  });

  console.log(`Found ${scrappedDemos.length} demos to scrap:`);
  console.log(scrappedDemos.map(d => `#${d.catalog_id} ${d.slug}`));

  // 2. Update the 5 KEEP demos to published
  for (const slug of KEEP_SLUGS) {
    const { error: updErr } = await supabase
      .from('forge_demos')
      .update({
        publishing_status: 'published',
        generation_status: 'published',
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug);
    if (updErr) console.error(`Error updating keep demo ${slug}:`, updErr);
    else console.log(`✓ KEEP: Published ${slug}`);
  }

  // 3. Update the 23 SCRAP demos to archived
  for (const d of scrappedDemos) {
    const { error: scrapErr } = await supabase
      .from('forge_demos')
      .update({
        publishing_status: 'archived',
        generation_status: 'archived',
        updated_at: new Date().toISOString()
      })
      .eq('id', d.id);
    if (scrapErr) console.error(`Error archiving demo ${d.slug}:`, scrapErr);
    else console.log(`✗ SCRAP: Archived #${d.catalog_id} ${d.slug}`);
  }

  // 4. Verify post-state
  const { data: postDemos } = await supabase.from('forge_demos').select('catalog_id, slug, publishing_status, generation_status');
  const published = postDemos.filter(d => d.publishing_status === 'published');
  const archived = postDemos.filter(d => d.publishing_status === 'archived');
  console.log('\n--- VERIFICATION ---');
  console.log('Total published:', published.length, published.map(p => `#${p.catalog_id || 'pilot'} ${p.slug}`));
  console.log('Total archived:', archived.length, archived.map(a => `#${a.catalog_id} ${a.slug}`));
}

run();
