import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';
import { contentRegistry } from '@/configurations/registry';
import type {
  ContentMetadata,
  Frontmatter,
  GitMetadata,
} from '@/configurations/types';
import {
  getContentFileNames,
  readContentFile,
  getContentFilePath,
  getContentMetadataDirectory,
  getContentMetadataFilePath,
} from '@/configurations/utils';
import { searchProviders } from '@/configurations/searchProviders';

const fallbackGitMetadata = (): GitMetadata => {
  const today = new Date().toISOString();
  return {
    contributors: ['Development'],
    createdAt: today,
    updatedAt: today,
  };
};

const getBatchedGitMetadata = (): Map<string, GitMetadata> => {
  const result = new Map<string, GitMetadata>();

  try {
    const output = execFileSync(
      'git',
      [
        '-c',
        'core.quotePath=false',
        'log',
        '--format=COMMIT_START|%aN|%aI',
        '--name-only',
        '--',
        'src/contents/',
      ],
      { cwd: process.cwd(), encoding: 'utf8' },
    );

    /**
     * Sample output format:
     *
     * COMMIT_START|Alice|2024-01-02T12:34:56+00:00
     *
     * src/contents/test1.md
     * src/contents/test2.md
     * COMMIT_START|Bob|2024-01-01T12:34:56+00:00
     *
     * src/contents/test1.md
     */

    let currentAuthor = '';
    let currentTimestamp = '';

    // Commits arrive newest-first: first seen date = updatedAt, last = createdAt
    const lines = output.split('\n').map((line) => line.trim());
    for (const line of lines) {
      if (line.startsWith('COMMIT_START|')) {
        const parts = line.split('|');
        currentAuthor = parts[1] ?? '';
        currentTimestamp = parts[2] ?? '';
      } else if (!!line && !!currentAuthor && !!currentTimestamp) {
        const existing = result.get(line);
        if (existing) {
          existing.createdAt = currentTimestamp;
          if (!existing.contributors.includes(currentAuthor)) {
            existing.contributors.push(currentAuthor);
          }
        } else {
          result.set(line, {
            contributors: [currentAuthor],
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          });
        }
      }
    }
  } catch (error) {
    throw new Error('Unable to retrieve batched git metadata', {
      cause: error,
    });
  }

  return result;
};

export const main = () => {
  const directory = getContentMetadataDirectory();
  fs.mkdirSync(directory, { recursive: true });

  const gitMetadataMap = getBatchedGitMetadata();

  Object.values(contentRegistry).forEach((config) => {
    const outputPath = getContentMetadataFilePath(config.contentType);
    const fileNames = getContentFileNames(config.contentType);

    const metadataList = fileNames
      .map((fileName) => {
        const { frontmatter } = readContentFile(config.contentType, fileName);
        const schema = contentRegistry[config.contentType].schema;
        const validationResult = schema.safeParse(frontmatter);

        const absolutePath = getContentFilePath(config.contentType, fileName);
        const relativePath = path.relative(process.cwd(), absolutePath);

        if (!validationResult.success) {
          throw new Error(
            `Invalid frontmatter in "${relativePath}": ${z.prettifyError(validationResult.error)}`,
          );
        }

        const gitMetadata =
          gitMetadataMap.get(relativePath) ?? fallbackGitMetadata();
        const safeFrontmatter = validationResult.data as Frontmatter<
          typeof config.contentType
        >;
        const searchMetadata =
          searchProviders[config.contentType].toSearchEntry(safeFrontmatter);

        const contentMetadata: ContentMetadata<typeof config.contentType> = {
          ...safeFrontmatter,
          ...gitMetadata,
          ...searchMetadata,
          fileName,
          contentType: config.contentType,
        };

        return contentMetadata;
      })
      .toSorted(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(), // Sort by updatedAt descending
      );

    fs.writeFileSync(outputPath, JSON.stringify(metadataList), 'utf8');
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
