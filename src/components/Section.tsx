import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/Container';
import { cn } from '@/lib/utils';

type SectionProps = {
  title?: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const Section = ({
  title,
  subtitle,
  actionButton,
  children,
  className,
}: SectionProps) => {
  const isHeaderVisible = title || subtitle || actionButton;
  return (
    <Container className={cn('py-16 md:py-20 lg:py-24', className)}>
      {isHeaderVisible && (
        <div className="relative mb-8 flex flex-col items-center gap-3">
          {title && <Typography variant="h2">{title}</Typography>}
          {subtitle && <Typography variant="muted">{subtitle}</Typography>}
          {actionButton && (
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              {actionButton}
            </div>
          )}
        </div>
      )}
      {children}
    </Container>
  );
};
