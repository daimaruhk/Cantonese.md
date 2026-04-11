import { useDeferredValue, useMemo, useState } from 'react';
import type { ContentType } from '@/configurations/registry';
import {
  searchProviders,
  type SearchEntry,
} from '@/configurations/searchProviders';
import { normalize } from '@/lib/utils';
import { useContentMetadataQuery } from './useContentMetadataQuery';

export type SearchScope = ContentType | 'all';

type UseSearchOptions = {
  enabled: boolean;
};

export const useSearch = ({ enabled }: UseSearchOptions) => {
  const { status, data: idiomSearchEntries } = useContentMetadataQuery(
    'idioms',
    {
      enabled,
      select: (metadataList) =>
        metadataList.map(searchProviders.idioms.toSearchEntry),
    },
  );
  const [scope, setScope] = useState<SearchScope>('all');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => {
    if (!idiomSearchEntries) {
      return [];
    }
    return filterSearchEntries(idiomSearchEntries, deferredQuery, scope);
  }, [idiomSearchEntries, deferredQuery, scope]);

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
    isLoading: status === 'pending',
    isError: status === 'error',
  };
};

const filterSearchEntries = <T extends ContentType>(
  entries: SearchEntry<T>[],
  query: string,
  scope: SearchScope,
  limit = 10,
) => {
  const normalizedQuery = normalize(query);

  return entries
    .filter((entry) => {
      if (scope !== 'all' && entry.contentType !== scope) {
        return false;
      }

      if (normalizedQuery.length === 0) {
        return true;
      }

      if (normalize(entry.searchText).includes(normalizedQuery)) {
        return true;
      }

      // Support prefix matching for individual Jyutping syllables/words.
      // By prepending a space to both strings, we ensure we only match the start of a syllable.
      // Example: Target "nei5 hou2" -> " nei5 hou2" (note the leading space)
      // Query "hou" -> " hou" (Matches!)
      // Query "ou" -> " ou" (Does NOT match, preventing an unwanted infix match on 'h(ou)2')
      const formattedSearchJyutping = ` ${normalize(entry.searchJyutping)}`;
      const formattedQueryForJyutping = ` ${normalizedQuery.replace(/\s+/g, ' ')}`;
      if (formattedSearchJyutping.includes(formattedQueryForJyutping)) {
        return true;
      }

      return false;
    })
    .slice(0, limit);
};
