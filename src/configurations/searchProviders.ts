import type { ContentType } from './registry';
import type { ContentMetadata } from './types';

export type SearchEntry<T extends ContentType> = {
  id: string;
  searchText: string;
  searchJyutping: string;
  path: string;
  contentType: T;
  entry: ContentMetadata<T>;
};

export const searchProviders: {
  [K in ContentType]: {
    toSearchEntry: (metadata: ContentMetadata<K>) => SearchEntry<K>;
  };
} = {
  idioms: {
    toSearchEntry: (metadata) => ({
      id: metadata.id,
      contentType: metadata.contentType,
      searchText: `${metadata.term}${metadata.answer}`,
      searchJyutping: `${metadata.termJyutping} ${metadata.answerJyutping}`,
      path: `/${metadata.contentType}/${metadata.fileName}`,
      entry: metadata,
    }),
  },
};
