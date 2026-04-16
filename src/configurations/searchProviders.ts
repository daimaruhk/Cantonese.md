import type { ContentType } from './registry';
import type { Frontmatter, SearchMetadata } from './types';

export const searchProviders: {
  [K in ContentType]: {
    toSearchEntry: (metadata: Frontmatter<K>) => SearchMetadata;
  };
} = {
  idioms: {
    toSearchEntry: (frontmatter) => ({
      searchText: `${frontmatter.term}${frontmatter.answer}`,
      searchJyutping: `${frontmatter.termJyutping} ${frontmatter.answerJyutping}`,
    }),
  },
};
