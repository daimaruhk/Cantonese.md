import { useMemo } from 'react';
import { useRouter, type NextRouter } from 'next/router';
import type { ContentMetadata } from '@/configurations/types';
import type { ContentType } from '@/configurations/registry';

type SortField = 'updatedAt' | 'searchJyutping';

type SortOrder = 'asc' | 'desc';

type SortOption = {
  label: string;
  value: string;
  field: SortField;
  order: SortOrder;
};

const SORT_OPTIONS = [
  {
    label: '由新到舊',
    value: 'updatedAt-desc',
    field: 'updatedAt',
    order: 'desc',
  },
  {
    label: '由舊到新',
    value: 'updatedAt-asc',
    field: 'updatedAt',
    order: 'asc',
  },
  {
    label: '粵拼 (A-Z)',
    value: 'searchJyutping-asc',
    field: 'searchJyutping',
    order: 'asc',
  },
  {
    label: '粵拼 (Z-A)',
    value: 'searchJyutping-desc',
    field: 'searchJyutping',
    order: 'desc',
  },
] as const satisfies SortOption[];

const DEFAULT_SORT_VALUE = SORT_OPTIONS[0].value;

const parseSortFromQuery = (query: NextRouter['query']) => {
  const sort = typeof query['sort'] === 'string' ? query['sort'] : undefined;
  const order = typeof query['order'] === 'string' ? query['order'] : undefined;

  if (sort && order) {
    const value = `${sort}-${order}`;
    if (SORT_OPTIONS.some((opt) => opt.value === value)) {
      return value;
    }
  }

  return DEFAULT_SORT_VALUE;
};

const compareEntries = <T extends ContentType>(
  a: ContentMetadata<T>,
  b: ContentMetadata<T>,
  field: SortField,
  order: SortOrder,
) => {
  const aVal = a[field] ?? '';
  const bVal = b[field] ?? '';

  const comparison =
    field === 'updatedAt'
      ? new Date(aVal).getTime() - new Date(bVal).getTime()
      : String(aVal).localeCompare(String(bVal));

  return order === 'asc' ? comparison : -comparison;
};

export const useSort = <T extends ContentType>(
  entries: ContentMetadata<T>[],
) => {
  const router = useRouter();

  const currentSortOption = router.isReady
    ? parseSortFromQuery(router.query)
    : DEFAULT_SORT_VALUE;

  const sortedEntries = useMemo(() => {
    if (currentSortOption === DEFAULT_SORT_VALUE) return entries;

    const option = SORT_OPTIONS.find((opt) => opt.value === currentSortOption);
    if (!option) return entries;

    return entries.toSorted((a, b) =>
      compareEntries(a, b, option.field, option.order),
    );
  }, [entries, currentSortOption]);

  const handleSortOptionChange = (value: string | null) => {
    if (value === null) return;

    const option = SORT_OPTIONS.find((opt) => opt.value === value);
    if (!option) return;

    const { ...queryParams } = router.query;
    delete queryParams['sort'];
    delete queryParams['order'];

    const query =
      value === DEFAULT_SORT_VALUE
        ? queryParams
        : { ...queryParams, sort: option.field, order: option.order };

    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  return {
    sortedEntries,
    sortOptions: SORT_OPTIONS,
    currentSortOption,
    handleSortOptionChange,
  };
};
