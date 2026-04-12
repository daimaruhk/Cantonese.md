import { useRouter } from 'next/router';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Separator } from '@/components/ui/Separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';
import { Typography } from '@/components/ui/Typography';
import { useSearch, type SearchScope } from '@/hooks/useSearch';
import { contentRegistry, type ContentType } from '@/configurations/registry';
import { renderers } from '@/configurations/renderers';
import type { SearchEntry } from '@/configurations/searchProviders';

type SearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const scopeOptions: { label: string; value: SearchScope }[] = [
  { label: '全部', value: 'all' },
  ...Object.values(contentRegistry).map((config) => ({
    label: config.label,
    value: config.contentType,
  })),
];

export const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const router = useRouter();
  const {
    query,
    setQuery,
    scope,
    setScope,
    results,
    isLoading,
    isError,
    reset,
  } = useSearch({ enabled: open });

  const closeModal = () => {
    reset();
    onOpenChange(false);
  };

  const handleSelect = async (searchEntry: SearchEntry) => {
    closeModal();
    await router.push(searchEntry.path);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          reset();
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.18)]"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>搜尋 Cantonese.md</DialogTitle>
          <DialogDescription>
            用戶可以中文或粵拼搜尋。使用上下箭咀選擇結果，撳 Enter
            前往該頁面，或者撳 Esc 關閉搜尋框。
          </DialogDescription>
        </DialogHeader>
        <Command loop shouldFilter={false} label="搜尋 Cantonese.md">
          <div className="p-4">
            <CommandInput
              autoFocus
              placeholder="搜尋歇後語..."
              value={query}
              onValueChange={setQuery}
            />

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <ToggleGroup
                aria-label="搜尋範圍"
                spacing={2}
                value={[scope]}
                onValueChange={([selected]) => {
                  setScope((selected ?? 'all') as SearchScope);
                }}
              >
                {scopeOptions.map((option) => (
                  <ToggleGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <Typography variant="muted" className="hidden sm:block">
                撳上下箭咀選擇，撳 Enter 前往，撳 Esc 退出
              </Typography>
            </div>
          </div>

          <Separator />

          <CommandList aria-busy={isLoading} className="max-h-[26rem] p-2">
            {isLoading ? (
              <Typography variant="muted" className="px-4 py-8">
                搜尋中...
              </Typography>
            ) : isError ? (
              <Typography
                variant="muted"
                className="text-destructive px-4 py-8"
              >
                搜尋失敗，請稍後再試。
              </Typography>
            ) : results.length === 0 ? (
              <CommandEmpty>揾唔到任何嘢</CommandEmpty>
            ) : (
              <CommandGroup heading="搜尋結果">
                {results.map((searchEntry) => (
                  <CommandItem
                    key={searchEntry.id}
                    value={`${searchEntry.searchText} ${searchEntry.searchJyutping}`}
                    onSelect={() => {
                      handleSelect(searchEntry);
                    }}
                  >
                    {renderSearchResult(searchEntry)}
                    <Badge variant="secondary">
                      {contentRegistry[searchEntry.contentType].label}
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

/* 
  Introduce a type-safe dispatch helper to render search results based on their content type,
  to avoid 'Correlated Union' problem: TypeScript 
  cannot guarantee that the renderer for a specific contentType matches 
  the union member of the current searchEntry during iteration.
*/
const renderSearchResult = <T extends ContentType>(entry: SearchEntry<T>) =>
  renderers[entry.contentType].renderSearchCard(entry);
