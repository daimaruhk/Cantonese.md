import type React from 'react';
import {
  IdiomCard,
  IdiomCardSkeleton,
} from '@/components/features/content/IdiomCard';
import { Typography } from '@/components/ui/Typography';
import { type ContentType } from './registry';
import type { ContentMetadata, ContentData } from './types';

type Renderer = {
  [K in ContentType]: {
    renderCard: (metadata: ContentMetadata<K>) => React.ReactNode;
    renderCardSkeleton: () => React.ReactNode;
    renderSearchCard: (metadata: ContentMetadata<K>) => React.ReactNode;
    renderContentGridTitle: () => string;
    renderContentGridSubtitle: () => string;
    renderListPageSubtitle: () => string;
    renderDetailPageHero: (contentData: ContentData<K>) => React.ReactNode;
  };
};

export const renderers: Renderer = {
  idioms: {
    renderCard: (metadata) => <IdiomCard metadata={metadata} />,
    renderCardSkeleton: () => <IdiomCardSkeleton />,
    renderSearchCard: (metadata) => (
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-semibold tracking-tight">
          {metadata.term}
        </span>
        <span className="text-muted-foreground truncate text-sm">
          {metadata.answer}
        </span>
      </div>
    ),
    renderContentGridTitle: () => '歇後語',
    renderContentGridSubtitle: () => '細味歇後語，感受粵語嘅智慧同幽默。',
    renderListPageSubtitle: () =>
      '歇後語係粵語文化入面最有智慧嘅表達方式，分做「謎面」同「謎底」兩部分。謎面通常係一個比喻或者情景，謎底先係真正嘅意思，一般留俾你自己去諗。歇後語大致分兩類：一種靠邏輯推理，另一種玩諧音。每一句歇後語都帶住嗰個年代同地方嘅社會文化，係真正嘅民間智慧結晶。',
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
