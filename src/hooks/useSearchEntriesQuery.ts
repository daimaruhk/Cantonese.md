import { useQueries } from '@tanstack/react-query';
import { contentRegistry } from '@/configurations/registry';
import { searchProviders } from '@/configurations/searchProviders';
import type { ContentMetadata } from '@/configurations/types';
import { fetchContentMetadata } from '@/lib/api';

type UseSearchEntriesQueryOptions = {
  enabled?: boolean;
};

export const useSearchEntriesQuery = ({
  enabled,
}: UseSearchEntriesQueryOptions) => {
  return useQueries({
    queries: Object.values(contentRegistry).map(({ contentType }) => ({
      queryKey: [contentType], // same queryKey as useContentMetadataQuery to leverage caching
      queryFn: () => fetchContentMetadata(contentType),
      staleTime: 'static',
      enabled,
      select: (metadataList: ContentMetadata<typeof contentType>[]) =>
        metadataList.map(searchProviders[contentType].toSearchEntry),
    })),
  });
};
