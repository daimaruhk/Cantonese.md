// Shadcn component
import { createContext, useContext, type CSSProperties } from 'react';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import type { VariantProps } from 'class-variance-authority';
import { toggleVariants } from '@/components/ui/Toggle';
import { cn } from '@/lib/utils';

type ToggleGroupContextValue = VariantProps<typeof toggleVariants> & {
  orientation: 'horizontal' | 'vertical';
};

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  variant: 'default',
  size: 'default',
  orientation: 'horizontal',
});

export const ToggleGroup = ({
  className,
  variant,
  size,
  spacing = 0,
  orientation = 'horizontal',
  children,
  style,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: 'horizontal' | 'vertical';
  }) => {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-orientation={orientation}
      className={cn(
        'flex w-fit items-center',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
      style={{
        gap: `calc(var(--spacing) * ${spacing})`,
        ...(style as CSSProperties),
      }}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
};

export const ToggleGroupItem = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) => {
  const context = useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(
        'shrink-0',
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        className,
      )}
      {...props}
    />
  );
};
