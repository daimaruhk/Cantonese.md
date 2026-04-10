import { useEffect, useEffectEvent, useState } from 'react';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';

import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/Section';
import {
  IdiomCard,
  IdiomCardSkeleton,
} from '@/components/features/idioms/IdiomCard';
import { useIdiomsQuery } from '@/hooks/useIdiomsQuery';
import type { IdiomFrontmatter } from '@/schema/idioms';

type IdiomSuggestionSectionProps = {
  excludedIdiomId?: string;
};

export const IdiomSuggestionSection = ({
  excludedIdiomId,
}: IdiomSuggestionSectionProps) => {
  const { status, data: idioms } = useIdiomsQuery();
  const [currentIdioms, setCurrentIdioms] = useState<IdiomFrontmatter[]>([]);

  const refreshIdioms = () => {
    if (idioms) {
      setCurrentIdioms(getRandomIdioms(idioms, 4, excludedIdiomId));
    }
  };

  const refreshIdiomsEvent = useEffectEvent(refreshIdioms);

  useEffect(() => {
    refreshIdiomsEvent();
  }, [idioms]);

  return (
    <Section
      title="歇後語"
      subtitle="細味歇後語，領略粵語嘅智慧同幽默。"
      actionButton={
        <>
          <Button
            variant="outline"
            onClick={refreshIdioms}
            disabled={status !== 'success'}
            className="hidden md:inline-flex"
          >
            <IconRefresh />
            換一批
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={refreshIdioms}
            disabled={status !== 'success'}
            className="md:hidden"
          >
            <IconRefresh />
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-8">
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {currentIdioms.length > 0
            ? currentIdioms.map((idiom) => (
                <IdiomCard key={idiom.id} idiom={idiom} />
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <IdiomCardSkeleton key={i} /> // avoid layout shift for initial render
              ))}
        </div>
        <Button
          variant="link"
          render={<Link href="/idioms" />}
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
const getRandomIdioms = (
  idioms: IdiomFrontmatter[],
  count: number,
  excludedId?: string,
) => {
  let filteredIdioms = idioms;

  if (excludedId) {
    filteredIdioms = idioms.filter((idiom) => idiom.id !== excludedId);
  }

  return filteredIdioms.toSorted(() => Math.random() - 0.5).slice(0, count);
};
