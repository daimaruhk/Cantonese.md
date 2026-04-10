import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { IdiomFrontmatter } from '@/schema/idioms';

export const useIdiomsQuery = (
  options?: Omit<
    UseQueryOptions<IdiomFrontmatter[]>,
    'queryKey' | 'queryFn' | 'staleTime'
  >,
) => {
  return useQuery({
    ...options,
    queryKey: ['idioms'],
    queryFn: () =>
      fetch('/api/idioms.json').then(
        (res) => res.json() as Promise<IdiomFrontmatter[]>,
      ),
    staleTime: 'static',
  });
};
