// @vitest-environment node

import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getContentFileNames,
  getContentTypeDirectory,
  readContentFile,
} from '@/configurations/utils';
import { contentRegistry, contentTypes } from '@/configurations/registry';
import { ContentTypeSchema } from '@/configurations/schemas/contentTypeSchema';
import { renderers } from '@/configurations/renderers';
import { searchProviders } from '@/configurations/searchProviders';
import { seoProviders } from '@/configurations/seoProviders';

describe('Content types', () => {
  it.each(contentTypes)(
    'should ensure content type "%s" has its own directory',
    (contentType) => {
      expect(fs.existsSync(getContentTypeDirectory(contentType))).toBe(true);
    },
  );

  it.each(contentTypes)(
    'should ensure content type "%s" has at least one markdown file',
    (contentType) => {
      expect(getContentFileNames(contentType).length).toBeGreaterThan(0);
    },
  );

  it.each(contentTypes)(
    'should ensure all markdown files in content type "%s" satisfy the schema',
    (contentType) => {
      getContentFileNames(contentType).forEach((fileName) => {
        const { frontmatter, content } = readContentFile(contentType, fileName);
        const result =
          contentRegistry[contentType].schema.safeParse(frontmatter);
        expect(
          result.success,
          `File "${fileName}.md" does not satisfy the schema`,
        ).toBe(true);
        expect(
          content.trim().length,
          `File "${fileName}.md" has empty markdown body`,
        ).toBeGreaterThan(0);
      });
    },
  );

  it('should ensure all markdown files have unique ids', () => {
    const ids = new Set<string>();
    Object.values(contentRegistry).forEach((config) => {
      getContentFileNames(config.contentType).forEach((fileName) => {
        const { frontmatter } = readContentFile(config.contentType, fileName);
        const id = frontmatter['id'] as string;
        expect(
          ids.has(id),
          `File "${fileName}.md" has duplicate id: ${id}`,
        ).toBe(false);
        ids.add(id);
      });
    });
  });
});

describe('Idioms', () => {
  it('should ensure all terms are unique', () => {
    const terms = new Set<string>();
    getContentFileNames('idioms').forEach((fileName) => {
      const { frontmatter } = readContentFile('idioms', fileName);
      const term = frontmatter['term'] as string;
      expect(
        terms.has(term),
        `File "${fileName}.md" has duplicate term: ${term}`,
      ).toBe(false);
      terms.add(term);
    });
  });

  it('should ensure all markdown file names match the term', () => {
    getContentFileNames('idioms').forEach((fileName) => {
      const { frontmatter } = readContentFile('idioms', fileName);
      const term = frontmatter['term'] as string;
      expect(fileName).toBe(term);
    });
  });
});

describe('Content type registration completeness', () => {
  const contentDirectory = path.join(process.cwd(), 'src', 'contents');
  const contentTypeDirectories = fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  it.each(contentTypeDirectories)(
    'should ensure directory "%s" has a corresponding entry in ContentTypeSchema',
    (directory) => {
      expect(
        ContentTypeSchema.safeParse(directory).success,
        `Content type "${directory}" has a directory but is missing from ContentTypeSchema`,
      ).toBe(true);
    },
  );

  it.each(contentTypeDirectories)(
    'should ensure content type "%s" is registered in contentRegistry',
    (directory) => {
      expect(
        directory in contentRegistry,
        `Content type "${directory}" is missing from contentRegistry`,
      ).toBe(true);
    },
  );

  it.each(contentTypeDirectories)(
    'should ensure content type "%s" is registered in renderers',
    (contentType) => {
      expect(
        contentType in renderers,
        `Content type "${contentType}" is missing from renderers`,
      ).toBe(true);
    },
  );

  it.each(contentTypeDirectories)(
    'should ensure content type "%s" is registered in searchProviders',
    (contentType) => {
      expect(
        contentType in searchProviders,
        `Content type "${contentType}" is missing from searchProviders`,
      ).toBe(true);
    },
  );

  it.each(contentTypeDirectories)(
    'should ensure content type "%s" is registered in seoProviders',
    (contentType) => {
      expect(
        contentType in seoProviders,
        `Content type "${contentType}" is missing from seoProviders`,
      ).toBe(true);
    },
  );
});
