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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import { Typography } from '@/components/ui/Typography';
import { useSearch, type SearchScope } from '@/hooks/useSearch';
import { contentRegistry, type ContentType } from '@/configurations/registry';
import { renderers } from '@/configurations/renderers';
import type { ContentMetadata } from '@/configurations/types';
import { normalize } from '@/lib/utils';

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

  const handleSelect = async (metadata: ContentMetadata) => {
    closeModal();
    await router.push(`/${metadata.contentType}/${metadata.fileName}`);
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
            你可以用中文或者粵拼搜尋。用上下箭咀揀結果，撳 Enter
            去該頁面，或者撳 Esc 關閉搜尋。
          </DialogDescription>
        </DialogHeader>
        <Command loop shouldFilter={false} label="搜尋 Cantonese.md">
          <div className="p-4">
            <CommandInput
              autoFocus
              placeholder="搜尋文字或粵拼..."
              value={query}
              onValueChange={setQuery}
            />

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Select
                items={scopeOptions}
                value={scope}
                onValueChange={(value) => setScope(value ?? 'all')}
              >
                <SelectTrigger aria-label="搜尋範圍" className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {scopeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Typography variant="muted" className="hidden sm:block">
                撳上下箭咀選擇，撳 Enter 前往，撳 Esc 退出
              </Typography>
            </div>
          </div>

          <Separator />

          <CommandList aria-busy={isLoading} className="max-h-[26rem] p-2">
            {normalize(query).length === 0 ? (
              <CommandEmpty>輸入文字或粵拼開始搜尋</CommandEmpty>
            ) : isLoading ? (
              <CommandEmpty>搜尋中...</CommandEmpty>
            ) : isError ? (
              <CommandEmpty className="text-destructive">
                搜尋失敗，請稍後再試。
              </CommandEmpty>
            ) : results.length === 0 ? (
              <CommandEmpty>揾唔到任何嘢</CommandEmpty>
            ) : (
              <CommandGroup heading="搜尋結果">
                {results.map((metadata) => (
                  <CommandItem
                    key={metadata.id}
                    value={`${metadata.searchText} ${metadata.searchJyutping}`}
                    onSelect={() => {
                      handleSelect(metadata);
                    }}
                  >
                    {renderSearchResult(metadata)}
                    <Badge variant="secondary">
                      {contentRegistry[metadata.contentType].label}
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
  the union member of the current metadata during iteration.
*/
const renderSearchResult = <T extends ContentType>(
  metadata: ContentMetadata<T>,
) => renderers[metadata.contentType].renderSearchCard(metadata);
