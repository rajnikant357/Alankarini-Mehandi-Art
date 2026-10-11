import fs from 'fs';
import path from 'path';

function testHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`✗ File does not exist: ${filePath}`);
    return false;
  }
  
  const html = fs.readFileSync(filePath, 'utf8');
  const regex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let count = 0;
  let passed = 0;
  let failed = 0;
  
  console.log(`Checking [${filePath}]...`);
  while ((match = regex.exec(html)) !== null) {
    count++;
    const jsonStr = match[1].trim();
    try {
      const parsed = JSON.parse(jsonStr);
      const type = Array.isArray(parsed) 
        ? `Array of [${parsed.map(p => p['@type'] || 'Unknown').join(', ')}]`
        : (parsed['@type'] || (parsed['@graph'] ? 'Graph of [' + parsed['@graph'].map(g => g['@type']).join(', ') + ']' : 'Unknown'));
      console.log(`  ✓ Block #${count}: VALID JSON (${type})`);
      passed++;
    } catch (err) {
      console.error(`  ✗ Block #${count}: INVALID JSON!`);
      console.error(`    Error: ${err.message}`);
      console.error(`    Snippet: ${jsonStr.slice(0, 150)}...`);
      failed++;
    }
  }
  
  if (failed > 0) {
    console.error(`  -> FAILED: ${failed} errors found in ${filePath}`);
    return false;
  } else {
    console.log(`  -> PASSED: All ${count} JSON-LD blocks are valid syntax.\n`);
    return true;
  }
}

let allOk = true;

// 1. Source index.html
allOk = testHtmlFile('index.html') && allOk;

// 2. Dist files
const files = [
  'dist/index.html',
  'dist/classes/index.html',
  'dist/services/index.html',
  'dist/gallery/index.html',
  'dist/about/index.html',
  'dist/contact/index.html',
  'dist/guide/index.html',
  'dist/blog/index.html',
  'dist/blog/bridal-mehndi-artist-varanasi/index.html',
  'dist/blog/latest-bridal-mehndi-designs/index.html',
  'dist/blog/mehndi-classes-varanasi-guide/index.html',
  'dist/blog/arabic-mehndi-designs-guide/index.html',
  'dist/blog/bridal-mehndi-appointment-preparation/index.html',
  'dist/blog/rajnikant-gaurav/index.html',
];

for (const f of files) {
  allOk = testHtmlFile(f) && allOk;
}

if (!allOk) {
  console.error('\n❌ Structured data validation failed with syntax errors!');
  process.exit(1);
} else {
  console.log('✅ All structured data blocks across all static HTML routes validated successfully!');
}
