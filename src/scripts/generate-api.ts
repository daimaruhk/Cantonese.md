import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { dataProviders } from '@/configurations/dataProviders';
import { contentRegistry } from '@/configurations/registry';

export const main = () => {
  const directory = path.join(process.cwd(), 'public', 'api');
  fs.mkdirSync(directory, { recursive: true });

  Object.values(contentRegistry).forEach((config) => {
    const filePath = path.join(directory, `${config.contentType}.json`);
    const metadataList = dataProviders[config.contentType].getAllMetadata();
    fs.writeFileSync(filePath, JSON.stringify(metadataList), 'utf8');
    console.log(
      `✅ Generated ${config.contentType} API at public/api/${config.contentType}.json`,
    );
  });

  return 0;
};

const entryPointPath = process.argv[1];

if (entryPointPath && import.meta.url === pathToFileURL(entryPointPath).href) {
  process.exitCode = main();
}
