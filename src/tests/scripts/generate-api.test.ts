import fs from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { main } from '@/scripts/generate-api';
import {
  dataProviders,
  type DataProviders,
} from '@/configurations/dataProviders';
import { contentTypes } from '@/configurations/registry';
import type { ContentMetadata } from '@/configurations/types';

vi.mock('node:fs', () => ({
  default: {
    mkdirSync: vi.fn().mockImplementation(() => undefined),
    writeFileSync: vi.fn().mockImplementation(() => undefined),
  },
}));

vi.mock('@/configurations/dataProviders', () => {
  const mockIdiom: ContentMetadata<'idioms'> = {
    id: 'aaaaaaaaaaaa',
    term: '賣魚佬沖涼',
    termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
    answer: '冇晒聲氣',
    answerJyutping: 'mou5 saai3 seng1 hei3',
    contentType: 'idioms',
    fileName: '賣魚佬沖涼',
  };
  const mockDataProviders: DataProviders = {
    idioms: {
      getAllMetadata: vi.fn().mockImplementation(() => {
        return [mockIdiom];
      }),
      getContentData: vi.fn(),
    },
  };
  return {
    dataProviders: mockDataProviders,
  };
});

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

  it('should write a minified API file for each content type', async () => {
    main();

    expect(getAllMetadataMock).toHaveBeenCalledTimes(contentTypes.length); // collect data for each content type
    contentTypes.forEach((contentType) => {
      expect(writeFileSyncMock).toHaveBeenCalledWith(
        `/mock-cwd/public/api/${contentType}.json`,
        JSON.stringify(dataProviders[contentType].getAllMetadata()),
        'utf8',
      );
      expect(console.log).toHaveBeenCalledWith(
        `✅ Generated ${contentType} API at public/api/${contentType}.json`,
      );
    });
  });
});
