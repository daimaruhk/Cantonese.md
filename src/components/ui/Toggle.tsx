// Shadcn component
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-full border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 aria-pressed:bg-primary aria-pressed:text-primary-foreground data-[pressed=true]:bg-primary data-[pressed=true]:text-primary-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted/60 hover:bg-muted',
        outline:
          'border-border bg-background hover:bg-muted dark:bg-transparent dark:hover:bg-input/30',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const Toggle = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) => {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
};
