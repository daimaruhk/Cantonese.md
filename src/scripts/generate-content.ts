import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { getContentFilePath } from '@/configurations/utils';
import { contentRegistry } from '@/configurations/registry';
import { ContentTypeSchema } from '@/configurations/schemas/contentTypeSchema';
import { templateProviders } from '@/configurations/templateProviders';

const toRelativePath = (absolutePath: string) =>
  path.relative(process.cwd(), absolutePath);

export const main = (
  contentType: string | undefined,
  fileName: string | undefined,
) => {
  if (!contentType || !fileName) {
    console.error(
      'Error: You must provide a content type and a file name as arguments.',
    );
    console.error(
      `Example: pnpm run gen:content idioms 賣魚佬沖涼, which will generate a new file at ${toRelativePath(getContentFilePath('idioms', '賣魚佬沖涼'))}.`,
    );
    return 1;
  }

  const validationResult = ContentTypeSchema.safeParse(contentType);

  if (!validationResult.success) {
    console.error('Error: Invalid content type.');
    console.error(
      `Available content types: ${Object.values(contentRegistry)
        .map((content) => content.contentType)
        .join(', ')}`,
    );
    return 1;
  }

  const safeContentType = validationResult.data;
  const destinationPath = getContentFilePath(safeContentType, fileName);

  if (fs.existsSync(destinationPath)) {
    console.error(
      `Error: File "${fileName}.md" already exists at ${toRelativePath(destinationPath)}.`,
    );
    return 1;
  }

  const { generateTemplate } = templateProviders[safeContentType];
  const template = generateTemplate();

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.writeFileSync(destinationPath, template, 'utf8');

  console.log(
    `New ${contentType} generated at ${toRelativePath(destinationPath)}.`,
  );
  return 0;
};

const [, entryPointPath, contentType, fileName] = process.argv;

if (entryPointPath && import.meta.url === pathToFileURL(entryPointPath).href) {
  // Only run the script when it is executed directly
  process.exitCode = main(contentType, fileName);
}
