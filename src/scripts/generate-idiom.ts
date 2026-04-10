import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { IdiomFrontmatterSchema, type IdiomFrontmatter } from '@/schema/idioms';

const ID_ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const ID_LENGTH = 12;

const createRandomId = () => {
  const id = Array.from({ length: ID_LENGTH }, () =>
    ID_ALPHABET.charAt(crypto.randomInt(0, ID_ALPHABET.length)),
  ).join('');

  return id;
};

const createIdiomFrontmatter = (term: string): IdiomFrontmatter => {
  const frontmatter = {
    id: createRandomId(),
    term,
    termJyutping: '',
    answer: '',
    answerJyutping: '',
    type: '歇後語' as const,
  };

  IdiomFrontmatterSchema.pick({
    id: true,
    term: true,
    type: true,
  }).safeParse(frontmatter);

  return frontmatter;
};

const createIdiomTemplate = (term: string) => {
  const frontmatter = createIdiomFrontmatter(term);

  let template = '---\n';
  Object.entries(frontmatter).forEach(([key, value]) => {
    const computedValue = !!value ? ` ${value}` : '';
    template += `${key}:${computedValue}\n`;
  });
  template += '---\n\n';

  return template;
};

const getIdiomFilePath = (term: string, cwd: string) =>
  path.join(cwd, 'src', 'contents', 'idioms', `${term}.md`);

const generateIdiomFile = (term: string) => {
  const cwd = process.cwd();
  const filePath = getIdiomFilePath(term, cwd);

  if (fs.existsSync(filePath)) {
    return { destination: null };
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, createIdiomTemplate(term), 'utf8');

  return {
    destination: path.relative(cwd, filePath),
  };
};

export const main = (term: string | undefined) => {
  if (!term) {
    console.error('❌ Error: You must provide a file name as an argument.');
    console.error('👉 Example: pnpm run gen:idiom "賣魚佬沖涼"');
    return 1;
  }

  const { destination } = generateIdiomFile(term);

  if (!destination) {
    console.error('❌ Error: File already exists.');
    return 1;
  }

  console.log(`✅ Generated newly formatted idiom at: ${destination}`);
  return 0;
};

const entryPointPath = process.argv[1];
const term = process.argv[2];

if (entryPointPath && import.meta.url === pathToFileURL(entryPointPath).href) {
  // Only run the script when it is executed directly
  process.exitCode = main(term);
}
