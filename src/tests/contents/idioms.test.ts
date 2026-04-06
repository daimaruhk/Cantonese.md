import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { beforeEach, expect, it } from 'vitest';

import { idiomsDirectory } from '../../lib/idioms';
import { type Idiom, IdiomSchema } from '../../schema/idioms';

let markdownFiles: {
  frontmatter: Idiom;
  content: string;
  fileName: string;
}[];

beforeEach(() => {
  const fileNames = fs
    .readdirSync(idiomsDirectory)
    .filter((name) => name.endsWith('.md'));

  markdownFiles = fileNames.map((fileName) => {
    const filePath = path.join(idiomsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data as Idiom, content, fileName };
  });
});

it('should ensure all idiom markdown files fulfill the schema', () => {
  for (const { frontmatter, content, fileName } of markdownFiles) {
    const result = IdiomSchema.safeParse(frontmatter);

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
    expect(fileName).toBe(`${frontmatter.term}.md`);
  }
});
