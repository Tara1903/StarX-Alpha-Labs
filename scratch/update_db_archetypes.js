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

async function syncArchetypes() {
  console.log('Updating archetypes in Supabase...');
  
  await supabase.from('forge_demos').update({ archetype: 'booking-calendar' }).eq('catalog_id', 164);
  await supabase.from('forge_demos').update({ archetype: 'kanban-workflow' }).eq('catalog_id', 213);
  await supabase.from('forge_demos').update({ archetype: 'booking-calendar' }).eq('catalog_id', 90);
  await supabase.from('forge_demos').update({ archetype: 'booking-calendar' }).eq('catalog_id', 94);

  console.log('Updated catalog_ids 164, 213, 90, 94 in Supabase.');
}
syncArchetypes();
