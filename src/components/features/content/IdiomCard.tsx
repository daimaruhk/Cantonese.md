import { useRef, useState } from 'react';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import type { ContentMetadata } from '@/configurations/types';

type IdiomCardProps = {
  metadata: ContentMetadata<'idioms'>;
};

export const IdiomCard = ({ metadata }: IdiomCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only flip when user clicks on the card itself, not the link
    if (e.target !== buttonRef.current) {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
      // Only flip when user focuses on the card itself, not the link
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  const onPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      setIsFlipped(true);
    }
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      setIsFlipped(false);
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget === buttonRef.current) {
      // User is tabbing to the link, don't flip back
      return;
    }

    setIsFlipped(false);
  };

  return (
    <div
      className="group perspective-distant"
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      aria-expanded={isFlipped}
      aria-label={`歇後語咭片: ${metadata.term}`}
    >
      <div
        className={cn(
          'relative aspect-5/7 transition-transform duration-700 transform-3d',
          isFlipped ? 'rotate-y-180' : '',
        )}
      >
        <Card className={cardClassNames} aria-hidden={isFlipped}>
          <Watermark />
          <CardContent className="relative z-10">
            <Typography variant="h3">{metadata.term}</Typography>
            <Typography variant="code" as="span" className="mt-1">
              {metadata.termJyutping}
            </Typography>
          </CardContent>
          <span
            className={buttonVariants({
              variant: 'ghost',
              className: cn(cardButtonClassNames, 'pointer-events-none'),
            })}
          >
            <IconRefresh />
            翻轉
          </span>
        </Card>
        <Card
          className={cn(cardClassNames, 'rotate-y-180')}
          aria-hidden={!isFlipped}
        >
          <Watermark />
          <CardContent className="relative z-10">
            <Typography variant="h3">{metadata.answer}</Typography>
            <Typography variant="code" as="span" className="mt-1">
              {metadata.answerJyutping}
            </Typography>
          </CardContent>
          <Button
            variant="link"
            tabIndex={isFlipped ? 0 : -1} // Only focusable when card is flipped
            ref={buttonRef}
            render={
              <Link href={`/idioms/${encodeURIComponent(metadata.fileName)}`} />
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

export const IdiomCardSkeleton = () => <Skeleton className="aspect-5/7" />;

const cardClassNames =
  "absolute inset-0 backface-hidden grid place-items-center text-center bg-[url('/card_bg.webp')] bg-cover bg-center bg-no-repeat";

const cardButtonClassNames =
  'absolute bottom-3 md:bottom-6 inset-x-0 text-muted-foreground';

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
