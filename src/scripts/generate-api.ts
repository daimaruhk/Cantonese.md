import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { idiomRegistry } from '@/lib/registry';

export const main = () => {
  const directory = path.join(process.cwd(), 'public', 'api');
  const filePath = path.join(directory, 'idioms.json');
  const frontmatterList = idiomRegistry.getAllFrontmatter();

  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(frontmatterList), 'utf8');

  console.log('✅ Generated idiom API at public/api/idioms.json');
  return 0;
};

const entryPointPath = process.argv[1];

if (entryPointPath && import.meta.url === pathToFileURL(entryPointPath).href) {
  process.exitCode = main();
}
