import fs from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { main } from '@/scripts/generate-api';
import type { IdiomFrontmatter } from '@/schema/idioms';
import { idiomRegistry } from '@/lib/registry';

const mockFrontmatter: IdiomFrontmatter = {
  id: 'aaaaaaaaaaaa',
  term: '賣魚佬沖涼',
  termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
  answer: '冇晒聲氣',
  answerJyutping: 'mou5 saai3 seng1 hei3',
  type: '歇後語',
};

vi.mock('node:fs', () => ({
  default: {
    mkdirSync: vi.fn().mockImplementation(() => undefined),
    writeFileSync: vi.fn().mockImplementation(() => undefined),
  },
}));

vi.mock('@/lib/registry', () => ({
  idiomRegistry: {
    getAllFrontmatter: vi.fn().mockImplementation(() => {
      return [mockFrontmatter];
    }),
  },
}));

const getAllFrontmatterMock = vi.mocked(idiomRegistry.getAllFrontmatter);
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

  it('writes a minified idiom API file', async () => {
    main();

    expect(getAllFrontmatterMock).toHaveBeenCalledTimes(1);
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      '/mock-cwd/public/api/idioms.json',
      JSON.stringify([mockFrontmatter]),
      'utf8',
    );
    expect(console.log).toHaveBeenCalledWith(
      '✅ Generated idiom API at public/api/idioms.json',
    );
  });
});
