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
    return `COMMIT_START|Bob|2026-04-20T12:34:56+00:00

src/contents/idioms/啞仔食黃蓮.md
COMMIT_START|Alice|2026-04-15T12:34:56+00:00

src/contents/idioms/賣魚佬沖涼.md
COMMIT_START|Bob|2026-04-01T12:34:56+00:00

src/contents/idioms/啞仔食黃蓮.md
src/contents/idioms/賣魚佬沖涼.md
`;
  }),
}));

vi.mock(import('@/configurations/utils'), async (importOriginal) => {
  const actual = await importOriginal();
  const mockFrontmatter1: Frontmatter<'idioms'> = {
    id: 'aaaaaaaaaaaa',
    term: '賣魚佬沖涼',
    termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
    answer: '冇晒聲氣',
    answerJyutping: 'mou5 saai3 seng1 hei3',
  };
  const mockFrontmatter2: Frontmatter<'idioms'> = {
    id: 'bbbbbbbbbbbb',
    term: '啞仔食黃蓮',
    termJyutping: 'aa3 zai2 sik6 wong4 lin4',
    answer: '有苦自己知',
    answerJyutping: 'jau5 fu2 zi6 gei2 zi1',
  };
  const mockGetContentFileNames: typeof actual.getContentFileNames = () => [
    '賣魚佬沖涼',
    '啞仔食黃蓮',
  ];
  const mockReadContentFile: typeof actual.readContentFile = (_, fileName) => {
    if (fileName === '賣魚佬沖涼') {
      return { frontmatter: mockFrontmatter1, content: '# Test Content' };
    } else {
      return { frontmatter: mockFrontmatter2, content: '# Test Content' };
    }
  };

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
            id: 'bbbbbbbbbbbb',
            term: '啞仔食黃蓮',
            termJyutping: 'aa3 zai2 sik6 wong4 lin4',
            answer: '有苦自己知',
            answerJyutping: 'jau5 fu2 zi6 gei2 zi1',
            contributors: ['Bob'],
            createdAt: '2026-04-01T12:34:56+00:00',
            updatedAt: '2026-04-20T12:34:56+00:00',
            searchText: '啞仔食黃蓮有苦自己知',
            searchJyutping: 'aa3 zai2 sik6 wong4 lin4 jau5 fu2 zi6 gei2 zi1',
            fileName: '啞仔食黃蓮',
            contentType,
          },
          {
            id: 'aaaaaaaaaaaa',
            term: '賣魚佬沖涼',
            termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
            answer: '冇晒聲氣',
            answerJyutping: 'mou5 saai3 seng1 hei3',
            contributors: ['Alice', 'Bob'],
            createdAt: '2026-04-01T12:34:56+00:00',
            updatedAt: '2026-04-15T12:34:56+00:00',
            searchText: '賣魚佬沖涼冇晒聲氣',
            searchJyutping:
              'maai6 jyu4 lou2 cung1 loeng4 mou5 saai3 seng1 hei3',
            fileName: '賣魚佬沖涼',
            contentType,
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
