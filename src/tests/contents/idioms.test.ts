import path from 'node:path';
import { beforeEach, expect, it } from 'vitest';

import { type IdiomFrontmatter, IdiomFrontmatterSchema } from '@/schema/idioms';
import { getMarkdownFilePaths, readContentFile } from '@/lib/content';

type MarkdownFile = {
  frontmatter: IdiomFrontmatter;
  content: string;
  fileName: string;
};

let markdownFiles: MarkdownFile[];

beforeEach(() => {
  const filePaths = getMarkdownFilePaths('idioms');

  markdownFiles = filePaths.map((filePath) => {
    const { frontmatter, content } = readContentFile(filePath);
    const fileName = path.basename(filePath, '.md');
    return { frontmatter, content, fileName } as MarkdownFile;
  });
});

it('should ensure all idiom markdown files fulfill the schema', () => {
  for (const { frontmatter, content, fileName } of markdownFiles) {
    const result = IdiomFrontmatterSchema.safeParse(frontmatter);

    expect(result.success, `File ${fileName} failed validation`).toBe(true);
    expect(
      content.trim().length,
      `File ${fileName} has empty markdown body`,
    ).toBeGreaterThan(0);
  }
});

it('should ensure all terms and ids are unique', () => {
  const ids = new Set<string>();
  const terms = new Set<string>();

  for (const { frontmatter, fileName } of markdownFiles) {
    expect(
      ids.has(frontmatter.id),
      `Duplicate id found in ${fileName}: ${frontmatter.id}`,
    ).toBe(false);

    ids.add(frontmatter.id);

    expect(
      terms.has(frontmatter.term),
      `Duplicate term found in ${fileName}: ${frontmatter.term}`,
    ).toBe(false);

    terms.add(frontmatter.term);
  }
});

it('should ensure all file names match the term', () => {
  for (const { frontmatter, fileName } of markdownFiles) {
    expect(fileName).toBe(frontmatter.term);
  }
});
