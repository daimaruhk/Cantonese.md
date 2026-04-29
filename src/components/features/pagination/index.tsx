import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationRange,
} from '@/components/ui/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;
  const pageOptions = Array.from({ length: totalPages }).map((_, i) => i + 1);

  return (
    <>
      <PaginationContainer className="hidden md:flex">
        <PaginationContent>
          <PaginationItem>
            <PreviousPageButton {...props} />
          </PaginationItem>
          <PaginationRange totalPages={totalPages} currentPage={currentPage}>
            {(item) =>
              item.type === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(item.page)}
                  isActive={item.isActive}
                >
                  {item.page}
                </PaginationLink>
              )
            }
          </PaginationRange>
          <PaginationItem>
            <NextPageButton {...props} />
          </PaginationItem>
        </PaginationContent>
      </PaginationContainer>
      <PaginationContainer className="md:hidden">
        <PreviousPageButton {...props} />
        <Select
          value={currentPage.toString()}
          onValueChange={(val) => onPageChange(Number(val))}
        >
          <SelectTrigger aria-label="選擇頁數" className="w-[100px]">
            <SelectValue>{`第 ${currentPage} 頁`}</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {pageOptions.map((page) => (
              <SelectItem key={page} value={page.toString()}>
                {`第 ${page} 頁`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <NextPageButton {...props} />
      </PaginationContainer>
    </>
  );
};

const PreviousPageButton = ({ currentPage, onPageChange }: PaginationProps) => {
  return (
    <PaginationPrevious
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      aria-disabled={currentPage <= 1}
      className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
    />
  );
};

const NextPageButton = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <PaginationNext
      onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      aria-disabled={currentPage >= totalPages}
      className={
        currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
      }
    />
  );
};
