// @vitest-environment node

import fs from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { main } from '@/scripts/generate-staticFiles';
import type { ContentMetadata } from '@/configurations/types';

vi.mock('node:fs', () => ({
  default: {
    writeFileSync: vi.fn().mockImplementation(() => undefined),
  },
}));

vi.mock(import('@/configurations/utils'), async (importOriginal) => {
  const actual = await importOriginal();
  const mockIdioms: ContentMetadata<'idioms'>[] = [
    {
      id: 'aaaaaaaaaaaa',
      term: '賣魚佬沖涼',
      termJyutping: 'maai6 jyu4 lou2 cung1 loeng4',
      answer: '冇晒聲氣',
      answerJyutping: 'mou5 saai3 seng1 hei3',
      contentType: 'idioms',
      fileName: '賣魚佬沖涼',
      contributors: ['Test Author'],
      createdAt: '2026-04-01T00:00:00.000Z',
      updatedAt: '2026-04-15T00:00:00.000Z',
      searchText: '賣魚佬沖涼冇晒聲氣',
      searchJyutping: 'maai6 jyu4 lou2 cung1 loeng4 mou5 saai3 seng1 hei3',
    },
    {
      id: 'bbbbbbbbbbbb',
      term: '菠蘿雞',
      termJyutping: 'bo1 lo4 gai1',
      answer: '靠黐',
      answerJyutping: 'kaau3 ci1',
      contentType: 'idioms',
      fileName: '菠蘿雞',
      contributors: ['Test Author'],
      createdAt: '2026-04-02T00:00:00.000Z',
      updatedAt: '2026-04-10T00:00:00.000Z',
      searchText: '菠蘿雞靠黐',
      searchJyutping: 'bo1 lo4 gai1 kaau3 ci1',
    },
  ];
  return {
    ...actual,
    getAllMetadata: vi.fn().mockReturnValue(mockIdioms),
  };
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
    expect(console.log).toHaveBeenCalledWith(
      '✅ Generated Cloudflare _headers file to public/_headers (6 entries)',
    );
    expect(exitCode).toBe(0);
  });

  it('should write the sitemap to the correct output path', () => {
    main();

    expect(writeFileSyncMock).toHaveBeenNthCalledWith(
      1,
      '/mock-cwd/public/sitemap.xml',
      expect.any(String),
      'utf8',
    );
    expect(writeFileSyncMock).toHaveBeenNthCalledWith(
      2,
      '/mock-cwd/public/_headers',
      expect.any(String),
      'utf8',
    );
  });

  it('should include the XML declaration and urlset wrapper', () => {
    main();

    const xml = writeFileSyncMock.mock.calls![0]![1] as string;

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
    <loc>https://cantonese.md/idioms/${encodeURIComponent('賣魚佬沖涼')}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>2026-04-15T00:00:00.000Z</lastmod>
  </url>
  <url>
    <loc>https://cantonese.md/idioms/${encodeURIComponent('菠蘿雞')}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>2026-04-10T00:00:00.000Z</lastmod>
  </url>
  <url>
    <loc>https://cantonese.md/idioms/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>2026-04-15T00:00:00.000Z</lastmod>
  </url>
</urlset>`);
  });

  it('should generate the Cloudflare _headers content', () => {
    main();

    const headers = writeFileSyncMock.mock.calls![1]![1] as string;

    expect(headers).toBe(`/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=86400, s-maxage=86400
  Cloudflare-CDN-Cache-Control: max-age=2592000
  
/
  Cache-Control: public, max-age=0, must-revalidate, s-maxage=0
  Cloudflare-CDN-Cache-Control: max-age=604800

/about-us
  Cache-Control: public, max-age=0, must-revalidate, s-maxage=0
  Cloudflare-CDN-Cache-Control: max-age=604800

/contribute
  Cache-Control: public, max-age=0, must-revalidate, s-maxage=0
  Cloudflare-CDN-Cache-Control: max-age=604800

/idioms
  Cache-Control: public, max-age=0, must-revalidate, s-maxage=0
  Cloudflare-CDN-Cache-Control: max-age=604800

/idioms/*
  Cache-Control: public, max-age=0, must-revalidate, s-maxage=0
  Cloudflare-CDN-Cache-Control: max-age=604800

/api/*
  Cache-Control: public, max-age=0, must-revalidate, s-maxage=0
  Cloudflare-CDN-Cache-Control: max-age=604800
`);
  });
});
