import type { ContentType } from './registry';
import type { ContentData } from './types';

type SeoProviders = {
  [K in ContentType]: {
    listPage: {
      description: string;
    };
    detailPage: {
      title: (contentData: ContentData<K>) => string;
      description: (contentData: ContentData<K>) => string;
    };
  };
};

export const seoProviders: SeoProviders = {
  idioms: {
    listPage: {
      description: '探索所有粵語歇後語，暸解背後嘅文化同民間智慧。',
    },
    detailPage: {
      title: (contentData) => contentData.term,
      description: (contentData) =>
        `${contentData.term} ── ${contentData.answer}。粵拼：${contentData.termJyutping} ── ${contentData.answerJyutping}。`,
    },
  },
};
