import { useEffect, useEffectEvent, useState } from 'react';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/Section';
import { useContentMetadataQuery } from '@/hooks/useQuery';
import type { ContentMetadata } from '@/configurations/types';
import { type ContentType } from '@/configurations/registry';
import { renderers } from '@/configurations/renderers';
import { CardGrid } from './CardGrid';

type ContentGridProps<T extends ContentType> = {
  contentType: T;
  excludedId?: string;
};

export const ContentGrid = <T extends ContentType>({
  contentType,
  excludedId,
}: ContentGridProps<T>) => {
  const { status, data: entries } = useContentMetadataQuery({ contentType });
  const [currentEntries, setCurrentEntries] = useState<ContentMetadata<T>[]>(
    [],
  );

  const isReady = status === 'success';

  const refreshEntries = () => {
    if (entries) {
      setCurrentEntries(getRandomEntries(entries, 4, excludedId));
    }
  };

  const initializeEntriesEvent = useEffectEvent(() => {
    if (entries) {
      setCurrentEntries(entries.slice(0, 4)); // render the most recent 4 entries initially
    }
  });

  useEffect(() => {
    initializeEntriesEvent();
  }, [entries]);

  const renderer = renderers[contentType];

  return (
    <Section
      title={renderer.renderContentGridTitle()}
      subtitle={renderer.renderContentGridSubtitle()}
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
        <CardGrid contentType={contentType} entries={currentEntries} />
        <Button
          variant="link"
          render={<Link href={`/${contentType}`} />}
          nativeButton={false}
        >
          睇多啲
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
