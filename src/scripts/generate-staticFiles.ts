import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeUrl } from '@/lib/utils';
import { contentRegistry, contentTypes } from '@/configurations/registry';
import { getAllMetadata } from '@/configurations/utils';

type SitemapEntry = {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

const STATIC_PATHS = ['', 'about-us', 'contribute'];

const indent = (str: string, level: number) => '  '.repeat(level) + str;

const generateSitemap = () => {
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const urls: SitemapEntry[] = [];

  STATIC_PATHS.forEach((path) => {
    // There is no accurate way to get the lastmod for static pages
    urls.push({
      loc: normalizeUrl(path, true),
      changefreq: 'monthly',
      priority: path === '' ? '1.0' : '0.7',
    });
  });

  // Content list + detail pages
  Object.values(contentRegistry).forEach(({ contentType }) => {
    // Detail pages
    const metadataList = getAllMetadata(contentType);
    const mostRecentUpdatedAtInMilliseconds = Math.max(
      ...metadataList.map((metadata) => new Date(metadata.updatedAt).getTime()),
    );
    const mostRecentUpdatedAt = new Date(
      mostRecentUpdatedAtInMilliseconds,
    ).toISOString();
    metadataList.forEach(({ fileName, updatedAt }) => {
      urls.push({
        loc: normalizeUrl(
          `${contentType}/${encodeURIComponent(fileName)}`,
          true,
        ),
        changefreq: 'monthly',
        priority: '0.6',
        lastmod: updatedAt,
      });
    });

    // List page
    urls.push({
      loc: normalizeUrl(contentType, true),
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: mostRecentUpdatedAt,
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
      url.lastmod && indent(`<lastmod>${url.lastmod}</lastmod>`, 2),
      indent(`</url>`, 1),
    ]),
    '</urlset>',
  ]
    .filter((line) => !!line)
    .join('\n');

  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(
    `✅ Generated sitemap at public/sitemap.xml (${urls.length} URLs)`,
  );
};

const generateCloudflareHeaders = () => {
  const outputPath = path.join(process.cwd(), 'public', '_headers');
  const entries = [
    ...STATIC_PATHS.map((path) => `/${path}`),
    ...contentTypes.flatMap((contentType) => [
      `/${contentType}`,
      `/${contentType}/*`,
    ]),
    '/api/*',
  ];
  const lines = entries.flatMap((path) => [
    `${path}`,
    '  Cache-Control: public, max-age=0, must-revalidate, s-maxage=0',
    '  Cloudflare-CDN-Cache-Control: max-age=604800',
    '',
  ]);

  const content = `/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=86400, s-maxage=86400
  Cloudflare-CDN-Cache-Control: max-age=2592000
  
${lines.join('\n')}`;

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(
    `✅ Generated Cloudflare _headers file to public/_headers (${entries.length} entries)`,
  );
};

export const main = () => {
  generateSitemap();
  generateCloudflareHeaders();
  return 0;
};

const entryPointPath = process.argv[1];

if (entryPointPath && import.meta.url === pathToFileURL(entryPointPath).href) {
  process.exitCode = main();
}
