import { useQuery } from '@tanstack/react-query';
import type { ContentMetadata } from '@/configurations/types';
import type { ContentType } from '@/configurations/registry';

type UseContentMetadataQueryOptions<
  TType extends ContentType,
  TOutput = unknown,
> = {
  enabled?: boolean;
  select?: (metadata: ContentMetadata<TType>[]) => TOutput;
};

// This hook is designed for fetching content metadata (frontmatter + filePath + contentType) for all kinds of content
export const useContentMetadataQuery = <
  TType extends ContentType,
  TOutput = ContentMetadata<TType>[],
>(
  contentType: TType,
  options: UseContentMetadataQueryOptions<TType, TOutput> = {},
) => {
  return useQuery<ContentMetadata<TType>[], Error, TOutput>({
    queryKey: [contentType],
    queryFn: () =>
      fetch(`/api/${contentType}.json`).then(
        (res) => res.json() as Promise<ContentMetadata<TType>[]>,
      ),
    staleTime: 'static',
    ...options,
  });
};
