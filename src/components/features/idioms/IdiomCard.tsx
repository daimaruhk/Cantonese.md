import { useState } from 'react';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';

import { Button, buttonVariants } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';
import { Typography } from '@/components/ui/Typography';
import { cn, isMobile } from '@/lib/utils';
import type { Idiom } from '@/schema/idioms';

type IdiomCardProps = {
  idiom: Idiom;
  className?: string;
};

const cardClassNames =
  "absolute inset-0 backface-hidden grid place-items-center text-center bg-[url('/card_bg.webp')] bg-cover bg-center bg-no-repeat";

const cardButtonClassNames =
  'absolute bottom-3 md:bottom-6 inset-x-0 text-muted-foreground';

export const IdiomCard = ({ idiom, className }: IdiomCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const onMouseLeave = () => isMobile() && setIsFlipped(false); // when user clicks anywhere outside the card, flip it back

  const onFlip = () => isMobile() && setIsFlipped(true);

  const onUnflip = () => isMobile() && setIsFlipped(false);

  return (
    <div
      className={cn('group perspective-distant', className)}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          'relative aspect-5/7 transition-transform duration-700 transform-3d md:group-hover:rotate-y-180',
          isFlipped ? 'rotate-y-180' : '',
        )}
      >
        <Card className={cardClassNames} onClick={onFlip}>
          <Watermark />
          <CardContent className="relative z-10">
            <Typography variant="h3">{idiom.term}</Typography>
            <Typography variant="code" as="span" className="mt-1">
              {idiom.termJyutping}
            </Typography>
          </CardContent>
          <span
            className={buttonVariants({
              variant: 'ghost',
              className: cn(cardButtonClassNames, 'md:pointer-events-none'),
            })}
          >
            <IconRefresh />
            翻轉
          </span>
        </Card>
        <Card className={cn(cardClassNames, 'rotate-y-180')} onClick={onUnflip}>
          <Watermark />
          <CardContent className="relative z-10">
            <Typography variant="h3">{idiom.answer}</Typography>
            <Typography variant="code" as="span" className="mt-1">
              {idiom.answerJyutping}
            </Typography>
          </CardContent>
          <Button
            variant="link"
            render={
              <Link
                href={`/idioms/${encodeURIComponent(idiom.term)}`}
                onClick={(e) => e.stopPropagation()} // Prevent the card from flipping back when clicking the link
              />
            }
            className={cardButtonClassNames}
            nativeButton={false}
          >
            深入瞭解
            <IconArrowRight />
          </Button>
        </Card>
      </div>
    </div>
  );
};

const Watermark = () => {
  return (
    <>
      <div className="absolute top-3 left-3 text-5xl font-bold text-[#9ba597] opacity-20 select-none">
        粵
      </div>
      <div className="absolute right-3 bottom-3 text-5xl font-bold text-[#9ba597] opacity-20 select-none">
        語
      </div>
    </>
  );
};

export const IdiomCardSkeleton = () => <Skeleton className="aspect-5/7" />;
