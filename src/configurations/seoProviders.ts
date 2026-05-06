import { getGithubProfileUrl, normalizeUrl } from '@/lib/utils';
import { type ContentType } from './registry';
import type { ContentData, ContentMetadata } from './types';

export const siteName = 'Cantonese.md';
export const imageUrl = normalizeUrl('assets/brand_banner.png');
export const toTitle = (title: string) =>
  title.endsWith(`| ${siteName}`) ? title : `${title} | ${siteName}`;
const toJsonLdId = (id: string) => normalizeUrl(`#${id}`);

export type SeoMeta = {
  title: string;
  description: string;
  canonicalUrl: string;
  jsonLd?: {
    '@context': 'https://schema.org';
    '@graph': any[];
  };
} & (
  | {
      ogType: 'website';
    }
  | {
      ogType: 'article';
      publishedTime: string;
      modifiedTime: string;
      authors: string[];
    }
);

type SeoProviders = {
  [K in ContentType]: {
    listPage: (contentDataList: ContentMetadata<K>[]) => SeoMeta;
    detailPage: (contentData: ContentData<K>) => SeoMeta;
  };
};

const language = 'yue-Hant';

export const seoProviders: SeoProviders = {
  idioms: (() => {
    const idiomsListPageCanonicalUrl = normalizeUrl('idioms');
    const breadcrumbList = [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首頁',
        item: normalizeUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '歇後語',
        item: idiomsListPageCanonicalUrl,
      },
    ];
    return {
      listPage: () => {
        const title = toTitle('廣東話歇後語大全：解構粵語民間智慧、意思與由來');
        const description =
          '收錄超過 200 個粵語歇後語，提供精準意思解釋、典故由來及生活化例句。暸解粵語文化必備手冊，助你探索和掌握最道地嘅粵語民間智慧。';
        const definedTermSetId = toJsonLdId('idioms:defined_term_set');
        const breadcrumbId = toJsonLdId('idioms:breadcrumb');
        return {
          title,
          description,
          canonicalUrl: idiomsListPageCanonicalUrl,
          ogType: 'website',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                '@id': idiomsListPageCanonicalUrl,
                url: idiomsListPageCanonicalUrl,
                name: title,
                description,
                inLanguage: language,
                breadcrumb: {
                  '@id': breadcrumbId,
                },
                mainEntity: {
                  '@id': definedTermSetId,
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': breadcrumbId,
                itemListElement: breadcrumbList,
              },
              {
                '@type': 'DefinedTermSet',
                '@id': definedTermSetId,
                name: title,
                description,
                url: idiomsListPageCanonicalUrl,
                inLanguage: language,
              },
            ],
          },
        };
      },
      detailPage: (contentData) => {
        const title = toTitle(
          `${contentData.term}：歇後語解釋、典故由來及生活化例句`,
        );
        const explanationWithoutPeriod = contentData.explanation.endsWith('。')
          ? contentData.explanation.slice(0, -1)
          : contentData.explanation;
        const description = `粵語歇後語「${contentData.term}──${contentData.answer}」，${explanationWithoutPeriod}。立即查看更多有關依個歇後語嘅詳細解釋、典故由來及生活化例句。`;
        const canonicalUrl = normalizeUrl(
          `${contentData.contentType}/${contentData.fileName}`,
        );
        const defineTermId = toJsonLdId(
          `${contentData.contentType}:${contentData.fileName}:defined_term`,
        );
        const breadcrumbId = toJsonLdId(
          `${contentData.contentType}:${contentData.fileName}:breadcrumb`,
        );
        return {
          title,
          description,
          canonicalUrl,
          ogType: 'article',
          publishedTime: contentData.createdAt,
          modifiedTime: contentData.updatedAt,
          authors: contentData.contributors.map(getGithubProfileUrl),
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                '@id': canonicalUrl,
                url: canonicalUrl,
                name: title,
                description,
                inLanguage: language,
                breadcrumb: {
                  '@id': breadcrumbId,
                },
                mainEntity: {
                  '@id': defineTermId,
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': breadcrumbId,
                itemListElement: [
                  ...breadcrumbList,
                  {
                    '@type': 'ListItem',
                    position: breadcrumbList.length + 1,
                    name: contentData.term,
                    item: canonicalUrl,
                  },
                ],
              },
              {
                '@type': 'DefinedTerm',
                '@id': defineTermId,
                name: contentData.term,
                description,
                inDefinedTermSet: idiomsListPageCanonicalUrl,
                url: canonicalUrl,
              },
              {
                '@type': 'FAQPage',
                '@id': toJsonLdId(
                  `${contentData.contentType}:${contentData.fileName}:faq`,
                ),
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: `「${contentData.term}」呢句歇後語係咩意思？`,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: `${contentData.answer}：${contentData.explanation}`,
                    },
                  },
                ],
              },
            ],
          },
        };
      },
    };
  })(),
};
