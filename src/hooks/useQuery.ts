import { useQueries, useQuery } from '@tanstack/react-query';
import { contentTypes, type ContentType } from '@/configurations/registry';
import { fetchContentMetadata } from '@/lib/api';

type QueryOptions<T extends ContentType = ContentType> = {
  contentType: T;
  enabled?: boolean;
};

const getQueryOptions = <T extends ContentType>({
  contentType,
  enabled,
}: QueryOptions<T>) => ({
  queryKey: [contentType],
  queryFn: () => fetchContentMetadata(contentType),
  staleTime: 'static' as const,
  enabled,
});

export const useContentMetadataQuery = <T extends ContentType>(
  options: QueryOptions<T>,
) => {
  return useQuery(getQueryOptions(options));
};

export const useContentMetadataQueries = ({
  enabled,
}: Pick<QueryOptions, 'enabled'>) => {
  return useQueries({
    queries: contentTypes.map((contentType) =>
      getQueryOptions({ contentType, enabled }),
    ),
  });
};
