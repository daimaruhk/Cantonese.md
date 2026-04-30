import { useQuery } from '@tanstack/react-query';
import { fetchDictionary, type Dictionary } from '@/lib/api';

export const useDictionaryQuery = () => {
  return useQuery<Dictionary>({
    queryKey: ['dictionary'],
    queryFn: fetchDictionary,
    staleTime: 'static' as const,
  });
};
