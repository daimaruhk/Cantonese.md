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
    listPage: (contentDataList: ContentMetadata<K>[]) => SeoMeta;
    detailPage: (contentData: ContentData<K>) => SeoMeta;
  };
};

const language = 'yue-Hant';

export const seoProviders: SeoProviders = {
  idioms: (() => {
    const idiomsListPageCanonicalUrl = normalizeUrl('idioms');
    return {
      listPage: () => {
        const idiomsListPageTitle = toTitle(
          '廣東話歇後語大全：解構粵語民間智慧、意思與由來',
        );
        const idiomsListPageDescription =
          '收錄超過 200 個粵語歇後語，提供精準意思解釋、典故由來及生活化例句。暸解粵語文化必備手冊，助你探索和掌握最道地嘅粵語民間智慧。';
        return {
          title: idiomsListPageTitle,
          description: idiomsListPageDescription,
          canonicalUrl: idiomsListPageCanonicalUrl,
          ogType: 'website',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            '@id': toJsonLdId('idioms:defined_term_set'),
            inLanguage: language,
            description: idiomsListPageDescription,
            url: idiomsListPageCanonicalUrl,
            name: idiomsListPageTitle,
          },
        };
      },
      detailPage: (contentData) => {
        const title = toTitle(
          `${contentData.term}：歇後語解釋、典故由來及生活化例句`,
        );
        const descriptionWithoutPeriod = contentData.explanation.endsWith('。')
          ? contentData.explanation.slice(0, -1)
          : contentData.explanation;
        const description = `粵語歇後語「${contentData.term}──${contentData.answer}」，${descriptionWithoutPeriod}。立即查看更多有關依個歇後語嘅詳細解釋、典故由來及生活化例句。`;
        return {
          title,
          description,
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
            name: title,
            description,
            inLanguage: language,
            inDefinedTermSet: idiomsListPageCanonicalUrl,
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
        };
      },
    };
  })(),
};
