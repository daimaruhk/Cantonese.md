import type { ComponentProps } from 'react';
import NextLink from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'target' | 'rel'> & {
  hideExternalIcon?: boolean;
};

export const Link = ({
  href,
  className,
  children,
  hideExternalIcon = false,
  ...props
}: LinkProps) => {
  const hrefStr = typeof href === 'string' ? href : (href.pathname ?? '');
  const external = isExternalHref(hrefStr);

  return (
    <NextLink
      href={href}
      className={cn(external && 'inline-flex items-center gap-1', className)}
      {...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      {...props}
    >
      {children}
      {external && !hideExternalIcon && <IconExternalLink />}
    </NextLink>
  );
};

const isExternalHref = (href: string) => {
  return href.startsWith('http://') || href.startsWith('https://');
};
