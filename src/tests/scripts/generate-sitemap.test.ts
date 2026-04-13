import fs from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { main } from '@/scripts/generate-sitemap';
import { type DataProviders } from '@/configurations/dataProviders';
import type { ContentMetadata } from '@/configurations/types';

vi.mock('node:fs', () => ({
  default: {
    writeFileSync: vi.fn().mockImplementation(() => undefined),
  },
}));

vi.mock('@/configurations/dataProviders', () => {
  const mockIdioms: ContentMetadata<'idioms'>[] = [
    {
      id: 'aaaaaaaaaaaa',
      term: '賣魚佬沖涼',
      termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
      answer: '冇晒聲氣',
      answerJyutping: 'mou5 saai3 seng1 hei3',
      contentType: 'idioms',
      fileName: '賣魚佬沖涼',
    },
    {
      id: 'bbbbbbbbbbbb',
      term: '菠蘿雞',
      termJyutping: 'bo1 lo4 gai1',
      answer: '靠黐',
      answerJyutping: 'kaau3 ci1',
      contentType: 'idioms',
      fileName: '菠蘿雞',
    },
  ];
  const mockDataProviders: DataProviders = {
    idioms: {
      getAllMetadata: vi.fn().mockImplementation(() => mockIdioms),
      getContentData: vi.fn(),
    },
  };
  return { dataProviders: mockDataProviders };
});

const writeFileSyncMock = vi.mocked(fs.writeFileSync);

describe('generate-sitemap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(process, 'cwd').mockReturnValue('/mock-cwd');
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 0 on success', () => {
    const exitCode = main();

    expect(console.log).toHaveBeenCalledWith(
      '✅ Generated sitemap at public/sitemap.xml (6 URLs)',
    );
    expect(exitCode).toBe(0);
  });

  it('should write the sitemap to the correct output path', () => {
    main();

    expect(writeFileSyncMock).toHaveBeenCalledWith(
      '/mock-cwd/public/sitemap.xml',
      expect.any(String),
      'utf8',
    );
  });

  it('should include the XML declaration and urlset wrapper', () => {
    main();

    const xml = writeFileSyncMock.mock.calls![0]![1] as string;

    expect(writeFileSyncMock).toHaveBeenCalledOnce();
    expect(xml).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cantonese.md/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://cantonese.md/about-us/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://cantonese.md/contribute/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://cantonese.md/idioms/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cantonese.md/idioms/${encodeURIComponent('賣魚佬沖涼')}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://cantonese.md/idioms/${encodeURIComponent('菠蘿雞')}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`);
  });
});
