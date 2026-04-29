import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
  IconChevronLeft,
  IconChevronRight,
  IconDots,
} from '@tabler/icons-react';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = React.ComponentProps<typeof Button> & {
  isActive?: boolean;
};

function PaginationLink({
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  text = '上一頁',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="去上一頁"
      size="default"
      className={cn('pl-2!', className)}
      {...props}
    >
      <IconChevronLeft data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = '下一頁',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="去下一頁"
      size="default"
      className={cn('pr-2!', className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <IconChevronRight data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <IconDots />
      <span className="sr-only">更多頁數</span>
    </span>
  );
}

type PaginationRangeItem =
  | {
      type: 'ellipsis';
    }
  | {
      type: 'page';
      page: number;
      isActive: boolean;
    };

type PaginationRangeProps = {
  totalPages: number;
  currentPage: number;
  children: (item: PaginationRangeItem) => React.ReactNode;
};

function PaginationRange({
  totalPages,
  currentPage,
  children: renderer,
}: PaginationRangeProps) {
  const rangeItems = React.useMemo(
    () =>
      Array.from(
        new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages]),
      )
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b)
        .reduce((rangeItems, page, i, pages) => {
          const prevPage = i - 1 >= 0 ? pages[i - 1] : undefined;
          if (prevPage !== undefined && page - prevPage > 1) {
            rangeItems.push({ type: 'ellipsis' });
          }
          rangeItems.push({
            type: 'page',
            page,
            isActive: page === currentPage,
          });
          return rangeItems;
        }, [] as PaginationRangeItem[]),
    [totalPages, currentPage],
  );

  return (
    <>
      {rangeItems.map((item, i) => (
        <PaginationItem
          key={`${item.type}-${item.type === 'ellipsis' ? i : item.page}`}
        >
          {renderer(item)}
        </PaginationItem>
      ))}
    </>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationRange,
};
