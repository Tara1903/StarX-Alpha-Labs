const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Load environment variables
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

function loadTsModule(filePath) {
  const fullPath = path.resolve(filePath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  });
  const m = { exports: {} };
  const customRequire = (reqPath) => {
    if (reqPath.startsWith('.')) {
      let resolved = path.resolve(path.dirname(fullPath), reqPath);
      if (!resolved.endsWith('.ts') && !resolved.endsWith('.js')) {
        if (fs.existsSync(resolved + '.ts')) resolved += '.ts';
        else if (fs.existsSync(path.join(resolved, 'index.ts'))) resolved = path.join(resolved, 'index.ts');
      }
      return loadTsModule(resolved);
    }
    return require(reqPath);
  };
  const fn = new Function('require', 'module', 'exports', '__dirname', '__filename', res.outputText);
  fn(customRequire, m, m.exports, path.dirname(fullPath), fullPath);
  return m.exports;
}

async function run() {
  console.log('--- STARX FORGE: EXPANSION SUPABASE SYNC ---');
  
  // 1. Load Registry
  const registry = loadTsModule('./src/modules/demo-center/registry/index.ts');
  const allDemos = registry.ALL_MASTER_DEMOS || registry.ALL_160_DEMOS;
  console.log(`Loaded ${allDemos.length} demos from central registry.`);

  // 2. Fetch current forge_demos from Supabase
  const { data: existingDemos, error: fetchErr } = await supabase
    .from('forge_demos')
    .select('id, catalog_id, slug, publishing_status');

  if (fetchErr) {
    console.error('Error fetching existing forge_demos:', fetchErr);
    process.exit(1);
  }

  console.log(`Current forge_demos in Supabase: ${existingDemos.length}`);

  // Create pre-expansion backup
  const backupDir = path.resolve('./scratch/backups/pre-expansion-' + new Date().toISOString().replace(/[:.]/g, '-'));
  fs.mkdirSync(backupDir, { recursive: true });
  fs.writeFileSync(path.join(backupDir, 'forge_demos_backup.json'), JSON.stringify(existingDemos, null, 2));
  console.log(`Pre-expansion backup saved to: ${backupDir}`);

  const existingCatalogIds = new Set(existingDemos.map(d => d.catalog_id).filter(Boolean));
  const existingSlugs = new Set(existingDemos.map(d => d.slug));

  // 3. Filter for demos that need to be inserted
  const newDemos = allDemos.filter(d => !existingCatalogIds.has(d.id) && !existingSlugs.has(d.slug));
  console.log(`Found ${newDemos.length} new demos to insert into Supabase (IDs 161 - 240).`);

  if (newDemos.length === 0) {
    console.log('All demos already exist in Supabase. Nothing to insert.');
    return;
  }

  // 4. Prepare insert records
  const recordsToInsert = newDemos.map(d => ({
    catalog_id: d.id,
    slug: d.slug,
    business_name: d.name,
    industry: d.categoryName,
    category_slug: d.categorySlug,
    description: d.fullDescription || d.shortDescription,
    target_audience: d.suitableFor,
    design_direction: d.productType,
    feature_requirements: d.features,
    workflows: d.workflows,
    archetype: d.archetype,
    brand_config: d.brand,
    seed_data: {},
    generation_status: 'draft',
    qa_status: 'not_run',
    publishing_status: 'unpublished',
    preview_url: `/admin/forge/preview/${d.slug}`,
    created_by: 'forge_expansion',
    updated_by: 'forge_expansion',
  }));

  // Insert in batches of 20
  const BATCH_SIZE = 20;
  for (let i = 0; i < recordsToInsert.length; i += BATCH_SIZE) {
    const chunk = recordsToInsert.slice(i, i + BATCH_SIZE);
    const { error: insertErr } = await supabase.from('forge_demos').insert(chunk);
    if (insertErr) {
      console.error(`Error inserting batch ${i / BATCH_SIZE + 1}:`, insertErr);
      process.exit(1);
    }
    console.log(`Inserted batch ${i / BATCH_SIZE + 1} (${chunk.length} demos: IDs ${chunk[0].catalog_id} - ${chunk[chunk.length - 1].catalog_id})`);
  }

  // 5. Verify post-insert state
  const { data: finalDemos, error: verifyErr } = await supabase
    .from('forge_demos')
    .select('catalog_id, slug, publishing_status');

  if (verifyErr) {
    console.error('Error verifying final count:', verifyErr);
    process.exit(1);
  }

  const published = finalDemos.filter(d => d.publishing_status === 'published');
  console.log('--- SYNC COMPLETE ---');
  console.log(`Total forge_demos now in Supabase: ${finalDemos.length}`);
  console.log(`Published demos (strictly preserved): ${published.length}`);
  console.log(`New demos registered with status: draft, qa_status: not_run, publishing_status: unpublished.`);
}

run();
