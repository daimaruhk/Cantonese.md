import { Fragment } from 'react';
import type { ContentMetadata } from '@/configurations/types';
import type { ContentType } from '@/configurations/registry';
import { renderers } from '@/configurations/renderers';

type ContentGridProps<T extends ContentType> = {
  contentType: T;
  entries: ContentMetadata<T>[];
};

export const CardGrid = <T extends ContentType>({
  contentType,
  entries,
}: ContentGridProps<T>) => {
  const renderer = renderers[contentType];
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
      {entries.length > 0
        ? entries.map((entry) => (
            <Fragment key={entry.id}>{renderer.renderCard(entry)}</Fragment>
          ))
        : Array.from({ length: 4 }).map((_, i) => (
            <Fragment key={i}>{renderer.renderCardSkeleton()}</Fragment>
          ))}
    </div>
  );
};
