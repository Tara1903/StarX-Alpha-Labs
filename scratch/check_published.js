const fs = require('fs');
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

async function check() {
  const { data, error } = await supabase
    .from('forge_demos')
    .select('catalog_id, slug, business_name, publishing_status, generation_status');
  if (error) {
    console.error('Error:', error);
    return;
  }
  const published = data.filter(d => d.publishing_status === 'published');
  console.log('Total forge_demos:', data.length);
  console.log('Published demos count:', published.length);
  console.log('Published details:', published.map(d => ({ catalog_id: d.catalog_id, slug: d.slug, business_name: d.business_name })));
}
check();
