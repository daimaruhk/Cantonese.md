import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  getContentFileNames,
  getContentTypeDirectory,
  readContentFile,
} from '@/configurations/utils';
import { contentRegistry } from '@/configurations/registry';

describe('Content types', () => {
  it('should ensure all content types have their own directory', () => {
    Object.values(contentRegistry).forEach((config) => {
      expect(fs.existsSync(getContentTypeDirectory(config.contentType))).toBe(
        true,
      );
    });
  });

  it('should ensure all content types have at least one markdown file', () => {
    Object.values(contentRegistry).forEach((config) => {
      expect(getContentFileNames(config.contentType).length).toBeGreaterThan(0);
    });
  });

  it('should ensure all markdown files satisfy the schema', () => {
    Object.values(contentRegistry).forEach((config) => {
      getContentFileNames(config.contentType).forEach((fileName) => {
        const { frontmatter, content } = readContentFile(
          config.contentType,
          fileName,
        );
        const result = config.schema.safeParse(frontmatter);
        expect(
          result.success,
          `File "${fileName}.md" does not satisfy the schema`,
        ).toBe(true);
        expect(
          content.trim().length,
          `File "${fileName}.md" has empty markdown body`,
        ).toBeGreaterThan(0);
      });
    });
  });

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
