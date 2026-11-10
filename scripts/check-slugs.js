const fs = require('fs');
const path = require('path');
const demosSource = fs.readFileSync(path.join(__dirname, '../src/data/demos.ts'), 'utf8');
const startMarker = 'export const ALL_DEMOS: DemoModel[] = ';
const startIdx = demosSource.indexOf(startMarker);
const jsonStart = demosSource.indexOf('[', startIdx + startMarker.length - 2);
const jsonEnd = demosSource.lastIndexOf('];') + 1;
const demos = JSON.parse(demosSource.substring(jsonStart, jsonEnd));

console.log("Demos in Cat 2 (ecommerce-retail):");
demos.filter(d => d.categoryNumber === 2).forEach(d => {
  console.log(`#${d.id}: slug = "${d.slug}", catSlug = "${d.categorySlug}"`);
});
