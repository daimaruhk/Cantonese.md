import { useQuery } from '@tanstack/react-query';
import type { IdiomFrontmatter } from '@/schema/idioms';

type UseIdiomsQueryOptions<TData> = {
  enabled?: boolean;
  select?: (idioms: IdiomFrontmatter[]) => TData;
};

export const useIdiomsQuery = <TData = IdiomFrontmatter[]>(
  options: UseIdiomsQueryOptions<TData> = {},
) => {
  return useQuery<IdiomFrontmatter[], Error, TData>({
    queryKey: ['idioms'],
    queryFn: () =>
      fetch('/api/idioms.json').then(
        (res) => res.json() as Promise<IdiomFrontmatter[]>,
      ),
    staleTime: 'static',
    ...options,
  });
};
