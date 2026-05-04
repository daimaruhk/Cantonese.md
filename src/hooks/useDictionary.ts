import { useQuery } from '@tanstack/react-query';
import { fetchDictionary, type TrieNode } from '@/lib/api';

export const useDictionaryQuery = () => {
  return useQuery<TrieNode>({
    queryKey: ['dictionary'],
    queryFn: fetchDictionary,
    staleTime: 'static' as const,
  });
};
