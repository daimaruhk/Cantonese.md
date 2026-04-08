import { beforeEach, expect, it } from 'vitest';

import { createContentRegistry, type ContentRegistry } from '@/lib/registry';
import { IdiomFrontmatterSchema, type IdiomFrontmatter } from '@/schema/idioms';

let registry: ContentRegistry<IdiomFrontmatter>;

beforeEach(() => {
  registry = createContentRegistry({
    type: 'idioms',
    schema: IdiomFrontmatterSchema,
    getSlug: (entry) => entry.term,
  });
});

it('loads idiom entries with markdown body and git metadata', () => {
  const [firstEntry] = registry.getAllEntries();

  expect(firstEntry).toBeDefined();
  expect(firstEntry!.content.trim().length).toBeGreaterThan(0);
  expect(firstEntry!.contributors.length).toBeGreaterThan(0);
  expect(firstEntry!.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(firstEntry!.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

it('creates handlers that derive paths', async () => {
  const allEntries = registry.getAllEntries();
  const staticPaths = await registry.getStaticPaths({
    locales: [],
    defaultLocale: 'en',
  });

  expect(staticPaths.fallback).toBe(false);
  expect(staticPaths.paths).toEqual(
    allEntries.map((entry) => ({
      params: { slug: entry.term },
    })),
  );
});

it('creates handlers that derive props', async () => {
  const allEntries = registry.getAllEntries();
  const [firstEntry] = allEntries;
  const restEntries = allEntries.slice(1);
  const staticProps = registry.getStaticProps({
    params: { slug: firstEntry!.term },
  });

  if (!('props' in staticProps)) {
    throw new Error('Static props not found');
  }

  expect(staticProps.props.entry.term).toBe(firstEntry!.term);
  expect(staticProps.props.restEntries).toEqual(restEntries);
});
