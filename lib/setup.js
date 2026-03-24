/**
 * setup.js — Post-install configuration generator
 *
 * Creates default formatter config files if they don't exist,
 * detects platform, and applies compatibility patches.
 *
 * Run automatically via `npm postinstall` or manually:
 *   node lib/setup.js [--check-only]
 */

const fs = require('fs');
const path = require('path');
const compat = require('./compat');

const ROOT = path.resolve(__dirname, '..');
const CHECK_ONLY = process.argv.includes('--check-only');

// Default prettier configuration
const PRETTIER_CONFIG = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  endOfLine: 'auto',
};

// Default editorconfig
const EDITORCONFIG = `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
`;

function ensureConfig(filename, content) {
  const filepath = path.join(ROOT, filename);
  if (!fs.existsSync(filepath)) {
    if (CHECK_ONLY) {
      console.log(`  [!] Missing: ${filename}`);
      return false;
    }
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`  [+] Created: ${filename}`);
    return true;
  }
  console.log(`  [✓] Exists:  ${filename}`);
  return true;
}

function main() {
  console.log('Code Formatter — Post-install Setup');
  console.log('====================================\n');

  // Step 1: Generate config files
  console.log('Config files:');
  ensureConfig(
      '.prettierrc.json', JSON.stringify(PRETTIER_CONFIG, null, 2) + '\n');
  ensureConfig('.editorconfig', EDITORCONFIG);

  // Step 2: Apply platform compatibility patches
  console.log('\nPlatform compatibility:');
  compat.apply();

  console.log('\nSetup complete.\n');
}

main();
