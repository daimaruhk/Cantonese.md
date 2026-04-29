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
const DEFAULT_PAGE_VALUE = 1;
const ITEMS_PER_PAGE = 8;

const parseListOptionsFromQuery = (
  query: NextRouter['query'],
  totalPages: number,
) => {
  const sort = typeof query['sort'] === 'string' ? query['sort'] : undefined;
  const order = typeof query['order'] === 'string' ? query['order'] : undefined;
  const page =
    typeof query['page'] === 'string' ? Number(query['page']) : undefined;

  let currentSortOption: string = DEFAULT_SORT_VALUE;
  let currentPage = DEFAULT_PAGE_VALUE;

  if (sort && order) {
    const value = `${sort}-${order}`;
    if (SORT_OPTIONS.some((opt) => opt.value === value)) {
      currentSortOption = value;
    }
  }

  if (page && page > 0 && page <= totalPages && Number.isInteger(page)) {
    currentPage = page;
  }

  return { currentSortOption, currentPage };
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

export const useList = <T extends ContentType>(
  entries: ContentMetadata<T>[],
) => {
  const router = useRouter();

  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);

  const { currentSortOption, currentPage } = parseListOptionsFromQuery(
    router.isReady ? router.query : {},
    totalPages,
  );

  const sortedEntries = useMemo(() => {
    if (currentSortOption === DEFAULT_SORT_VALUE) return entries;

    const option = SORT_OPTIONS.find((opt) => opt.value === currentSortOption);
    if (!option) return entries;

    return entries.toSorted((a, b) =>
      compareEntries(a, b, option.field, option.order),
    );
  }, [entries, currentSortOption]);

  const paginatedEntries = useMemo(() => {
    return sortedEntries.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
  }, [sortedEntries, currentPage]);

  const handleSortOptionChange = (value: string | null) => {
    if (value === null) return;

    const option = SORT_OPTIONS.find((opt) => opt.value === value);
    if (!option) return;

    const { ...queryParams } = router.query;
    delete queryParams['sort'];
    delete queryParams['order'];
    delete queryParams['page'];

    const query =
      value === DEFAULT_SORT_VALUE
        ? queryParams
        : { ...queryParams, sort: option.field, order: option.order };

    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  const handlePageChange = (page: number) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage ||
      !Number.isInteger(page)
    ) {
      return;
    }

    const { ...queryParams } = router.query;
    delete queryParams['page'];

    const query =
      page === DEFAULT_PAGE_VALUE ? queryParams : { ...queryParams, page };

    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  return {
    paginatedEntries,
    sortOptions: SORT_OPTIONS,
    currentSortOption,
    handleSortOptionChange,
    currentPage,
    totalPages,
    handlePageChange,
  };
};
