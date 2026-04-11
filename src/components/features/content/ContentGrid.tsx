import { Fragment, useEffect, useEffectEvent, useState } from 'react';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/Section';
import { useContentMetadataQuery } from '@/hooks/useContentMetadataQuery';
import type { ContentMetadata } from '@/configurations/types';
import { contentRegistry, type ContentType } from '@/configurations/registry';
import { contentCardRenderers } from '@/configurations/renderers';

type ContentGridProps<T extends ContentType> = {
  contentType: T;
  excludedId?: string;
};

export const ContentGrid = <T extends ContentType>({
  contentType,
  excludedId,
}: ContentGridProps<T>) => {
  const { status, data: entries } = useContentMetadataQuery(contentType);
  const [currentEntries, setCurrentEntries] = useState<ContentMetadata<T>[]>(
    [],
  );

  const isReady = status === 'success';

  const refreshEntries = () => {
    if (entries) {
      setCurrentEntries(getRandomEntries(entries, 4, excludedId));
    }
  };

  const refreshEntriesEvent = useEffectEvent(refreshEntries);

  useEffect(() => {
    refreshEntriesEvent();
  }, [entries]);

  return (
    <Section
      title={contentRegistry[contentType].label}
      subtitle={contentRegistry[contentType].subtitle}
      actionButton={
        <>
          <Button
            variant="outline"
            onClick={refreshEntries}
            disabled={!isReady}
            className="hidden md:inline-flex"
          >
            <IconRefresh />
            換一批
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={refreshEntries}
            disabled={!isReady}
            className="md:hidden"
          >
            <IconRefresh />
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-8">
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {currentEntries.length > 0
            ? currentEntries.map((entry) => (
                <Fragment key={entry.id}>
                  {contentCardRenderers[contentType].renderCard(entry)}
                </Fragment>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Fragment key={i}>
                  {contentCardRenderers[contentType].renderSkeleton()}
                </Fragment>
              ))}
        </div>
        <Button
          variant="link"
          render={
            <Link href={`/${contentRegistry[contentType].contentType}`} />
          }
          nativeButton={false}
        >
          查看更多
          <IconArrowRight />
        </Button>
      </div>
    </Section>
  );
};

// TODO: when the idiom list is getting larger, refactor this function to avoid array shuffle
const getRandomEntries = <T extends ContentType>(
  entries: ContentMetadata<T>[],
  count: number,
  excludedId?: string,
) => {
  let filteredEntries = entries;

  if (excludedId) {
    filteredEntries = entries.filter((entry) => entry.id !== excludedId);
  }

  return filteredEntries.toSorted(() => Math.random() - 0.5).slice(0, count);
};
