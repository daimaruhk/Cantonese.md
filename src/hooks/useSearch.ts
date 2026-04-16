import { useDeferredValue, useState } from 'react';
import type { ContentType } from '@/configurations/registry';
import type { ContentMetadata } from '@/configurations/types';
import { normalize } from '@/lib/utils';
import { useContentMetadataQueries } from './useQuery';

export type SearchScope = ContentType | 'all';

type UseSearchOptions = {
  enabled: boolean;
};

export const useSearch = ({ enabled }: UseSearchOptions) => {
  const queryResults = useContentMetadataQueries({ enabled });
  const [scope, setScope] = useState<SearchScope>('all');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const isLoading = queryResults.some((result) => result.isLoading);
  const isError = queryResults.some((result) => result.isError);
  const metadataList =
    isLoading || isError
      ? []
      : queryResults.flatMap((result) => result.data ?? []);
  const results = filterMetadataList(metadataList, deferredQuery, scope);

  const reset = () => {
    setQuery('');
    setScope('all');
  };

  return {
    query,
    setQuery,
    scope,
    setScope,
    results,
    reset,
    isLoading,
    isError,
  };
};

const filterMetadataList = <T extends ContentType>(
  metadataList: ContentMetadata<T>[],
  query: string,
  scope: SearchScope,
  limit = 10,
) => {
  const normalizedQuery = normalize(query);

  if (normalizedQuery.length === 0) {
    return [];
  }

  return metadataList
    .filter((metadata) => {
      if (scope !== 'all' && metadata.contentType !== scope) {
        return false;
      }

      if (normalize(metadata.searchText).includes(normalizedQuery)) {
        return true;
      }

      // Support prefix matching for individual Jyutping syllables/words.
      // By prepending a space to both strings, we ensure we only match the start of a syllable.
      // Example: Target "nei5 hou2" -> " nei5 hou2" (note the leading space)
      // Query "hou" -> " hou" (Matches!)
      // Query "ou" -> " ou" (Does NOT match, preventing an unwanted infix match on 'h(ou)2')
      const formattedSearchJyutping = ` ${normalize(metadata.searchJyutping)}`;
      const formattedQueryForJyutping = ` ${normalizedQuery.replace(/\s+/g, ' ')}`;
      if (formattedSearchJyutping.includes(formattedQueryForJyutping)) {
        return true;
      }

      return false;
    })
    .slice(0, limit);
};
