import { useDeferredValue, useMemo, useState } from 'react';
import type { SearchEntry } from '@/configurations/types';
import type { ContentType } from '@/configurations/registry';
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
        metadataList.map((metadata) => ({
          id: metadata.id,
          contentType: metadata.contentType,
          searchText: `${metadata.term}${metadata.answer}`,
          searchJyutping: `${metadata.termJyutping} ${metadata.answerJyutping}`,
          path: `/${metadata.contentType}/${metadata.fileName}`,
          entry: metadata,
        })),
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

const filterSearchEntries = (
  entries: SearchEntry[],
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

      // Support prefix matching for Jyutping fields
      if (
        entry.searchJyutping
          .split('\s+')
          .some((field) => normalize(field).startsWith(normalizedQuery))
      ) {
        return true;
      }

      return false;
    })
    .slice(0, limit);
};

const normalize = (text: string) => text.trim().toLowerCase();
