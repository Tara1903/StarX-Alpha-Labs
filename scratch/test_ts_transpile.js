const fs = require('fs');
const ts = require('typescript');

function loadTs(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  });
  const m = { exports: {} };
  const fn = new Function('require', 'module', 'exports', res.outputText);
  fn(require, m, m.exports);
  return m.exports;
}

try {
  const cat = loadTs('./src/modules/demo-center/registry/categories.ts');
  console.log('Categories count:', cat.MASTER_DEMO_CATEGORIES.length);
} catch (e) {
  console.error('Error:', e);
}
