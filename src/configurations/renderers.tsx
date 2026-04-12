import type React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  IdiomCard,
  IdiomCardSkeleton,
} from '@/components/features/content/IdiomCard';
import { Typography } from '@/components/ui/Typography';
import { contentRegistry, type ContentType } from './registry';
import type { ContentMetadata, ContentData } from './types';
import type { SearchEntry } from './searchProviders';

type Renderer = {
  [K in ContentType]: {
    renderCard: (metadata: ContentMetadata<K>) => React.ReactNode;
    renderCardSkeleton: () => React.ReactNode;
    renderSearchCard: (searchEntry: SearchEntry<K>) => React.ReactNode;
    renderContentGridSubtitle: () => string;
    renderListPageSubtitle: () => string;
    renderDetailPageHero: (contentData: ContentData<K>) => React.ReactNode;
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
        <Badge variant="secondary">{contentRegistry.idioms.label}</Badge>
      </>
    ),
    renderContentGridSubtitle: () => '細味歇後語，領略粵語嘅智慧同幽默。',
    renderListPageSubtitle: () =>
      '歇後語係粵語文化中極具智慧且風趣嘅表達方式，結構上分為「謎面」同「謎底」兩部分。謎面一般係比喻或情境描述，而謎底先係真正含意，通常交俾對方自己領悟。歇後語大致可以分為兩大類：一種係邏輯型，謎底係由謎面推理出嚟；另一種係諧音型，謎底加入咗諧音要素。歇後語同時具備好強嘅時代性同地域性，我哋可以從中窺探唔同年代、唔同地方嘅社會文化同民間智慧。',
    renderDetailPageHero: (contentData) => (
      <>
        <Typography variant="h1">
          {contentData.term} ── {contentData.answer}
        </Typography>
        <Typography variant="code" as="span" className="text-base">
          {contentData.termJyutping} ── {contentData.answerJyutping}
        </Typography>
      </>
    ),
  },
};
