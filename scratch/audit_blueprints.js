const fs = require('fs');
const path = require('path');
const ts = require('typescript');

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

const registry = loadTsModule('./src/modules/demo-center/registry/index.ts');
const allDemos = registry.ALL_MASTER_DEMOS || registry.ALL_160_DEMOS;

console.log('Total demos:', allDemos.length);

const archetypeAudit = [];
for (const d of allDemos) {
  archetypeAudit.push({
    id: d.id,
    slug: d.slug,
    name: d.name,
    category: d.categorySlug,
    productType: d.productType,
    standardProductType: d.standardProductType,
    archetype: d.archetype
  });
}

// Check for archetype anomalies
const anomalies = [];
for (const item of archetypeAudit) {
  // Check: hotel with clinic-operations
  if (item.slug.includes('hotel') && item.archetype === 'clinic-operations') {
    anomalies.push({ ...item, issue: 'Hotel portal using clinic-operations archetype' });
  }
  // Check: legal with clinic-operations
  if (item.slug.includes('legal') && item.archetype === 'clinic-operations') {
    anomalies.push({ ...item, issue: 'Legal portal using clinic-operations archetype' });
  }
  // Check: non-healthcare with clinic or diagnostic archetype
  if (item.category !== 'healthcare' && (item.archetype === 'clinic-operations' || item.archetype === 'diagnostic-lab')) {
    anomalies.push({ ...item, issue: `Non-healthcare demo using ${item.archetype}` });
  }
  // Check: non-manufacturing using manufacturing-console or quality-inspection
  if (item.category !== 'manufacturing' && (item.archetype === 'manufacturing-console' || item.archetype === 'quality-inspection')) {
    anomalies.push({ ...item, issue: `Non-manufacturing demo using ${item.archetype}` });
  }
  // Check: non-logistics using fleet-dispatch or warehouse-wms (unless retail inventory or food supply)
  if (item.category !== 'logistics-transport' && item.archetype === 'fleet-dispatch') {
    anomalies.push({ ...item, issue: `Non-logistics demo using fleet-dispatch` });
  }
  // Check: missing standardProductType
  if (!item.standardProductType) {
    anomalies.push({ ...item, issue: 'Missing standardProductType' });
  }
}

console.log('\n--- ANOMALIES FOUND ---');
console.log(`Total anomalies: ${anomalies.length}`);
console.log(JSON.stringify(anomalies, null, 2));
