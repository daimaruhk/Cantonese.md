import { IconSearch } from '@tabler/icons-react';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

type SearchBarProps = {
  className?: string;
  onOpen: () => void;
};

export const SearchBar = ({ className, onOpen }: SearchBarProps) => {
  const modifierKeyLabel = 'Cmd/Ctrl';

  return (
    <Button
      variant="outline"
      onClick={onOpen}
      className={cn(
        'bg-muted text-muted-foreground h-10 w-full justify-between px-3',
        className,
      )}
      aria-label={`Open search (${modifierKeyLabel} K)`}
    >
      <span className="flex min-w-0 items-center gap-2">
        <IconSearch data-icon="inline-start" />
        <Typography variant="muted" className="truncate">
          搜尋...
        </Typography>
      </span>
      <span className="hidden gap-1 sm:flex sm:items-center">
        <Typography
          variant="code"
          className="rounded-full px-2 py-1 text-[11px] outline"
        >
          {modifierKeyLabel}
        </Typography>
        <Typography
          variant="code"
          className="rounded-full px-2 py-1 text-[11px] outline"
        >
          K
        </Typography>
      </span>
    </Button>
  );
};
