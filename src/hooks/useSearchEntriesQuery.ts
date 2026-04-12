import { useQueries } from '@tanstack/react-query';
import { contentTypes, type ContentType } from '@/configurations/registry';
import { searchProviders } from '@/configurations/searchProviders';
import type { ContentMetadata } from '@/configurations/types';
import { fetchContentMetadata } from '@/lib/api';

type UseSearchEntriesQueryOptions = {
  enabled?: boolean;
};

const createSearchQuery = <T extends ContentType>(
  contentType: T,
  enabled?: boolean,
) => ({
  queryKey: [contentType], // same queryKey as useContentMetadataQuery to leverage caching
  queryFn: () => fetchContentMetadata(contentType),
  staleTime: 'static' as const,
  enabled,
  select: (metadataList: ContentMetadata<T>[]) =>
    metadataList.map(searchProviders[contentType].toSearchEntry),
});

export const useSearchEntriesQuery = ({
  enabled,
}: UseSearchEntriesQueryOptions) => {
  return useQueries({
    queries: contentTypes.map((contentType) =>
      createSearchQuery(contentType, enabled),
    ),
  });
};
