// Shadcn component
import type { ComponentProps } from 'react';

import { type TypographyVariant, Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

export const Card = ({
  className,
  size = 'default',
  ...props
}: ComponentProps<'div'> & { size?: 'default' | 'sm' }) => {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card bg-card text-card-foreground ring-foreground/5 dark:ring-foreground/10 flex flex-col gap-6 overflow-hidden rounded-4xl py-6 text-sm shadow-sm ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl',
        className,
      )}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-4xl px-6 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4',
        className,
      )}
      {...props}
    />
  );
};

export const CardTitle = ({
  className,
  variant = 'h6',
  ...props
}: ComponentProps<'div'> & { variant?: TypographyVariant }) => {
  return (
    <Typography
      as="div"
      variant={variant}
      data-slot="card-title"
      className={cn('font-heading', className)}
      {...props}
    />
  );
};

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<'p'>) => {
  return (
    <Typography
      variant="muted"
      data-slot="card-description"
      className={className}
      {...props}
    />
  );
};

export const CardAction = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
};

export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6 group-data-[size=sm]/card:px-4', className)}
      {...props}
    />
  );
};

export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center rounded-b-4xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4',
        className,
      )}
      {...props}
    />
  );
};
