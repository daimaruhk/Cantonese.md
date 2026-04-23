import { getGithubProfileUrl, normalizeUrl } from '@/lib/utils';
import { contentRegistry, type ContentType } from './registry';
import type { ContentData } from './types';

export const siteName = 'Cantonese.md';
export const siteUrl = normalizeUrl('/');
export const imageUrl = normalizeUrl('assets/brand_banner.png');
export const toTitle = (title: string) =>
  title.endsWith(`| ${siteName}`) ? title : `${title} | ${siteName}`;
const toJsonLdId = (id: string) => normalizeUrl(id);

export type SeoMeta = {
  title: string;
  description: string;
  canonicalUrl: string;
  jsonLd?: Record<string, unknown>;
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
    listPage: () => SeoMeta;
    detailPage: (contentData: ContentData<K>) => SeoMeta;
  };
};

const language = 'yue-Hant';
const idiomsListPageTitle = toTitle(contentRegistry.idioms.label);
const idiomsListPageDescription =
  '探索所有粵語歇後語，暸解背後嘅文化同民間智慧。';
const idiomsListPageCanonicalUrl = normalizeUrl('idioms');
const idiomsDefinedTermSetJsonLd = {
  '@type': 'DefinedTermSet',
  '@id': toJsonLdId('idioms:defined_term_set'),
  name: idiomsListPageTitle,
};

export const seoProviders: SeoProviders = {
  idioms: {
    listPage: () => ({
      title: idiomsListPageTitle,
      description: idiomsListPageDescription,
      canonicalUrl: idiomsListPageCanonicalUrl,
      ogType: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        inLanguage: language,
        description: idiomsListPageDescription,
        url: idiomsListPageCanonicalUrl,
        ...idiomsDefinedTermSetJsonLd,
      },
    }),
    detailPage: (contentData) => ({
      title: toTitle(contentData.term),
      description: `${contentData.term}──${contentData.answer}`,
      canonicalUrl: normalizeUrl(
        `${contentData.contentType}/${contentData.fileName}`,
      ),
      ogType: 'article',
      publishedTime: contentData.createdAt,
      modifiedTime: contentData.updatedAt,
      authors: contentData.contributors.map(getGithubProfileUrl),
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        '@id': toJsonLdId(
          `${contentData.contentType}:${contentData.fileName}:defined_term`,
        ),
        name: toTitle(contentData.term),
        description: `${contentData.term}──${contentData.answer}`,
        inLanguage: language,
        inDefinedTermSet: idiomsDefinedTermSetJsonLd,
        pronunciation: [
          {
            '@type': 'PronounceableText',
            textValue: contentData.term,
            phoneticText: contentData.termJyutping,
            inLanguage: language,
          },
          {
            '@type': 'PronounceableText',
            textValue: contentData.answer,
            phoneticText: contentData.answerJyutping,
            inLanguage: language,
          },
        ],
      },
    }),
  },
};
