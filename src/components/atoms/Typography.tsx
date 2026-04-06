import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl',
      h2: 'text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl',
      h3: 'text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl lg:text-3xl',
      h4: 'text-lg font-semibold leading-tight tracking-tight text-foreground md:text-xl lg:text-2xl',
      h5: 'text-base font-medium leading-snug tracking-tight text-foreground md:text-lg lg:text-xl',
      h6: 'text-sm font-medium leading-snug text-foreground md:text-base lg:text-lg',
      body: 'text-sm leading-normal text-foreground md:text-base',
      lead: 'text-base leading-relaxed text-muted-foreground md:text-lg lg:text-xl',
      muted: 'text-xs leading-relaxed text-muted-foreground md:text-sm',
      code: 'font-mono text-xs leading-none tracking-wide text-muted-foreground',
      blockquote:
        'my-4 border-s-4 border-primary/50 bg-muted p-4 text-base italic text-muted-foreground leading-relaxed [&_p]:leading-relaxed [&_p]:text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

// Map variants to their default HTML elements
const defaultElements: Record<string, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  lead: 'p',
  muted: 'p',
  code: 'code',
  blockquote: 'blockquote',
};

export type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>['variant']
>;

type TypographyProps<T extends React.ElementType = 'p'> = {
  as?: T;
  variant?: TypographyVariant;
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export const Typography = <T extends React.ElementType = 'p'>({
  as,
  variant = 'body',
  className,
  children,
  ...props
}: TypographyProps<T>) => {
  const Component = as ?? defaultElements[variant] ?? 'p';

  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};
