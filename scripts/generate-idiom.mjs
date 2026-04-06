import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Require the term argument
let fileName = process.argv[2];
if (!fileName) {
  console.error('❌ Error: You must provide a file name as an argument.');
  console.error('👉 Example: pnpm run gen:idiom "賣魚佬沖涼"');
  process.exit(1);
}

const alphabet =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let id = '';
for (let i = 0; i < 12; i++) {
  id += alphabet[crypto.randomInt(0, alphabet.length)];
}

const template = `---
id: ${id}
term: ${fileName}
termJyutping:
answer: 
answerJyutping:
type: 歇後語
---

`;

const dir = path.join(process.cwd(), 'src', 'contents', 'idioms');

fileName = `${fileName}.md`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const filepath = path.join(dir, fileName);
fs.writeFileSync(filepath, template, 'utf8');

console.log(
  `✅ Generated newly formatted idiom at: src/contents/idioms/${fileName}`,
);
console.log(`👉 ID: ${id}`);
