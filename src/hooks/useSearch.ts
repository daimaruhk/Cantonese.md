import { useDeferredValue, useMemo, useState } from 'react';
import { useIdiomsQuery } from './useIdiomsQuery';
import type { ContentType } from '@/lib/registry';
import type { IdiomFrontmatter } from '@/schema/idioms';

export type SearchEntry = {
  id: string;
  searchText: string;
  searchJyutping: string;
  path: string;
} & {
  contentType: 'idioms';
  entry: IdiomFrontmatter;
};

export type SearchScope = ContentType | 'all';

const idiomToSearchEntry = (idiom: IdiomFrontmatter): SearchEntry => ({
  id: idiom.id,
  contentType: 'idioms',
  searchText: `${idiom.term}${idiom.answer}`,
  searchJyutping: `${idiom.termJyutping} ${idiom.answerJyutping}`,
  path: `/idioms/${encodeURIComponent(idiom.term)}`,
  entry: idiom,
});

type UseSearchOptions = {
  enabled: boolean;
};

export const useSearch = ({ enabled }: UseSearchOptions) => {
  const { status, data: idioms } = useIdiomsQuery({
    enabled,
    select: (idioms) => idioms.map(idiomToSearchEntry),
  });
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScope>('all');

  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => {
    if (!idioms) {
      return [];
    }
    return filterSearchEntries(idioms, deferredQuery, scope);
  }, [idioms, deferredQuery, scope]);

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
