import { useEffect, useState } from 'react';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';

import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/Section';
import {
  IdiomCard,
  IdiomCardSkeleton,
} from '@/components/features/idioms/IdiomCard';
import type { Idiom } from '@/schema/idioms';

type IdiomSuggestionSectionProps = {
  idioms: Idiom[];
};

export const IdiomSuggestionSection = ({
  idioms,
}: IdiomSuggestionSectionProps) => {
  const [currentIdioms, setCurrentIdioms] = useState<Idiom[]>([]);

  useEffect(() => {
    // avoid hydration error
    setCurrentIdioms(getRandomIdioms(idioms, 4));
  }, [idioms]);

  const refreshIdioms = () => {
    setCurrentIdioms(getRandomIdioms(idioms, 4));
  };

  return (
    <Section
      title="歇後語"
      subtitle="細味歇後語，領略粵語嘅智慧同幽默。"
      actionButton={
        <>
          <Button
            variant="outline"
            onClick={refreshIdioms}
            className="hidden md:inline-flex"
          >
            <IconRefresh />
            換一批
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={refreshIdioms}
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
const getRandomIdioms = (idioms: Idiom[], count: number) => {
  return idioms.toSorted(() => Math.random() - 0.5).slice(0, count);
};
