// Turns design/tokens.json (W3C DTCG format) into design/tokens.css.
// Usage: npm run tokens
import { readFileSync, writeFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('../design/tokens.json', import.meta.url)));
const lines = [];
const ref = v => (typeof v === 'string' && v.startsWith('{')) ? `var(--io-${v.slice(1, -1).replaceAll('.', '-')})` : v;
const kebab = s => s.replace(/[A-Z]/g, m => '-' + m.toLowerCase());

function walk(node, path) {
  if (node && typeof node === 'object' && '$value' in node) {
    const name = `--io-${path.join('-')}`;
    const v = node.$value;
    switch (node.$type) {
      case 'typography':
        for (const [k, x] of Object.entries(v)) lines.push(`  ${name}-${kebab(k)}: ${ref(x)};`);
        break;
      case 'fontFamily':
        lines.push(`  ${name}: ${v.map(f => f.includes(' ') ? `"${f}"` : f).join(', ')};`);
        break;
      case 'cubicBezier':
        lines.push(`  ${name}: cubic-bezier(${v.join(', ')});`);
        break;
      default:
        lines.push(`  ${name}: ${ref(v)};`);
    }
    return;
  }
  if (node && typeof node === 'object') {
    for (const [k, x] of Object.entries(node)) if (!k.startsWith('$')) walk(x, [...path, k]);
  }
}

walk(tokens, []);
writeFileSync(new URL('../design/tokens.css', import.meta.url),
  `/* Generated from design/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */\n:root {\n${lines.join('\n')}\n}\n`);
console.log(`Wrote ${lines.length} CSS variables to design/tokens.css`);
