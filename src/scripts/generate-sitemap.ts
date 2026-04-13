import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeUrl } from '@/lib/utils';
import { dataProviders } from '@/configurations/dataProviders';
import { contentRegistry } from '@/configurations/registry';

type SitemapEntry = {
  loc: string;
  changefreq: string;
  priority: string;
  // TODO: add lastmod
};

const STATIC_PATHS = ['', 'about-us', 'contribute'];

const indent = (str: string, level: number) => '  '.repeat(level) + str;

export const main = () => {
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const urls: SitemapEntry[] = [];

  STATIC_PATHS.forEach((path) => {
    urls.push({
      loc: normalizeUrl(path),
      changefreq: 'monthly',
      priority: path === '' ? '1.0' : '0.7',
    });
  });

  // Content list + detail pages
  Object.values(contentRegistry).forEach(({ contentType }) => {
    // List page
    urls.push({
      loc: normalizeUrl(contentType),
      changefreq: 'weekly',
      priority: '0.8',
    });

    // Detail pages
    const metadataList = dataProviders[contentType].getAllMetadata();

    metadataList.forEach(({ fileName }) => {
      urls.push({
        loc: normalizeUrl(`${contentType}/${encodeURIComponent(fileName)}`),
        changefreq: 'monthly',
        priority: '0.6',
      });
    });
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.flatMap((url) => [
      indent(`<url>`, 1),
      indent(`<loc>${url.loc}</loc>`, 2),
      indent(`<changefreq>${url.changefreq}</changefreq>`, 2),
      indent(`<priority>${url.priority}</priority>`, 2),
      indent(`</url>`, 1),
    ]),
    '</urlset>',
  ].join('\n');

  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(
    `✅ Generated sitemap at public/sitemap.xml (${urls.length} URLs)`,
  );

  return 0;
};

const entryPointPath = process.argv[1];

if (entryPointPath && import.meta.url === pathToFileURL(entryPointPath).href) {
  process.exitCode = main();
}
