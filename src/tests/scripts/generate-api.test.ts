import fs from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { main } from '@/scripts/generate-api';
import { contentTypes } from '@/configurations/registry';
import type { Frontmatter } from '@/configurations/types';

vi.mock('node:fs', () => ({
  default: {
    mkdirSync: vi.fn().mockImplementation(() => undefined),
    writeFileSync: vi.fn().mockImplementation(() => undefined),
  },
}));

vi.mock('node:child_process', () => ({
  execFileSync: vi.fn().mockImplementation(() => {
    return `COMMIT_START|Alice|2026-04-15

src/contents/idioms/賣魚佬沖涼.md
COMMIT_START|Bob|2026-04-01

src/contents/idioms/賣魚佬沖涼.md
`;
  }),
}));

vi.mock(import('@/configurations/utils'), async (importOriginal) => {
  const actual = await importOriginal();
  const mockFrontmatter: Frontmatter<'idioms'> = {
    id: 'aaaaaaaaaaaa',
    term: '賣魚佬沖涼',
    termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
    answer: '冇晒聲氣',
    answerJyutping: 'mou5 saai3 seng1 hei3',
  };
  const mockGetContentFileNames: typeof actual.getContentFileNames = () => [
    '賣魚佬沖涼',
  ];
  const mockReadContentFile: typeof actual.readContentFile = () => ({
    frontmatter: mockFrontmatter,
    content: '# Test content',
  });

  return {
    ...actual,
    getContentFileNames: vi.fn().mockImplementation(mockGetContentFileNames),
    readContentFile: vi.fn().mockImplementation(mockReadContentFile),
  };
});

const writeFileSyncMock = vi.mocked(fs.writeFileSync);

describe('main', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(process, 'cwd').mockReturnValue('/mock-cwd');
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should write an API file with git metadata for each content type', () => {
    main();

    contentTypes.forEach((contentType) => {
      expect(writeFileSyncMock).toHaveBeenCalledWith(
        `/mock-cwd/public/api/${contentType}.json`,
        JSON.stringify([
          {
            id: 'aaaaaaaaaaaa',
            term: '賣魚佬沖涼',
            termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
            answer: '冇晒聲氣',
            answerJyutping: 'mou5 saai3 seng1 hei3',
            contentType,
            fileName: '賣魚佬沖涼',
            contributors: ['Alice', 'Bob'],
            createdAt: '2026-04-01',
            updatedAt: '2026-04-15',
          },
        ]),
        'utf8',
      );
      expect(console.log).toHaveBeenCalledWith(
        `✅ Generated ${contentType} API at public/api/${contentType}.json`,
      );
    });
  });
});
