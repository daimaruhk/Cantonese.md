import { useQuery } from '@tanstack/react-query';
import { type ContentType } from '@/configurations/registry';
import { fetchContentMetadata } from '@/lib/api';

type UseContentMetadataQueryOptions = {
  enabled?: boolean;
};

export const useContentMetadataQuery = <T extends ContentType>(
  contentType: T,
  options: UseContentMetadataQueryOptions = {},
) => {
  return useQuery({
    queryKey: [contentType],
    queryFn: () => fetchContentMetadata(contentType),
    staleTime: 'static',
    ...options,
  });
};
