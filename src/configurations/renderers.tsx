import type React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  IdiomCard,
  IdiomCardSkeleton,
} from '@/components/features/content/IdiomCard';
import type { ContentType } from './registry';
import type { ContentMetadata } from './types';
import type { SearchEntry } from './searchProviders';

type Renderer = {
  [K in ContentType]: {
    renderCard: (metadata: ContentMetadata<K>) => React.ReactNode;
    renderCardSkeleton: () => React.ReactNode;
    renderSearchCard: (searchEntry: SearchEntry<K>) => React.ReactNode;
  };
};

export const renderers: Renderer = {
  idioms: {
    renderCard: (metadata) => <IdiomCard metadata={metadata} />,
    renderCardSkeleton: () => <IdiomCardSkeleton />,
    renderSearchCard: (searchEntry) => (
      <>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate font-semibold tracking-tight">
            {searchEntry.entry.term}
          </span>
          <span className="text-muted-foreground truncate text-sm">
            {searchEntry.entry.answer}
          </span>
        </div>
        <Badge variant="secondary">歇後語</Badge>
      </>
    ),
  },
};
