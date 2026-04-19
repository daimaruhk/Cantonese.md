import { IconSearch, IconCommand } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

type SearchBarProps = {
  className?: string;
  onOpen: () => void;
};

export const SearchBar = ({ className, onOpen }: SearchBarProps) => {
  return (
    <Button
      variant="outline"
      onClick={onOpen}
      className={cn(
        'bg-muted text-muted-foreground h-10 w-full justify-between px-3',
        className,
      )}
      aria-label="開啟搜尋 (Command/Control K)"
    >
      <span className="flex min-w-0 items-center gap-2">
        <IconSearch data-icon="inline-start" />
        <Typography variant="muted" className="truncate">
          搜尋...
        </Typography>
      </span>
      <span className="hidden px-2 sm:flex sm:items-center">
        <IconCommand className="text-muted-foreground" />
        <Typography variant="code">K</Typography>
      </span>
    </Button>
  );
};
