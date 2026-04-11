import fs from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { main } from '@/scripts/generate-api';
import type { ContentMetadata } from '@/configurations/types';
import { dataProviders } from '@/configurations/dataProviders';

const mockContentMetadata: ContentMetadata<'idioms'> = {
  id: 'aaaaaaaaaaaa',
  term: '賣魚佬沖涼',
  termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
  answer: '冇晒聲氣',
  answerJyutping: 'mou5 saai3 seng1 hei3',
  contentType: 'idioms',
  fileName: '賣魚佬沖涼',
};

vi.mock('node:fs', () => ({
  default: {
    mkdirSync: vi.fn().mockImplementation(() => undefined),
    writeFileSync: vi.fn().mockImplementation(() => undefined),
  },
}));

vi.mock('@/configurations/dataProviders', () => ({
  dataProviders: {
    idioms: {
      getAllMetadata: vi.fn().mockImplementation(() => {
        return [mockContentMetadata];
      }),
    },
  },
}));

const getAllMetadataMock = vi.mocked(dataProviders.idioms.getAllMetadata);
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

    expect(getAllMetadataMock).toHaveBeenCalledTimes(1);
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      '/mock-cwd/public/api/idioms.json',
      JSON.stringify([mockContentMetadata]),
      'utf8',
    );
    expect(console.log).toHaveBeenCalledWith(
      '✅ Generated idioms API at public/api/idioms.json',
    );
  });
});
