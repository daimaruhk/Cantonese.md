// Shadcn component
import type { ComponentProps } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { IconSearch } from '@tabler/icons-react';
import { InputGroup, InputGroupAddon } from '@/components/ui/InputGroup';
import { cn } from '@/lib/utils';

export const Command = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) => {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn('flex size-full flex-col overflow-hidden', className)}
      {...props}
    />
  );
};

export const CommandInput = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) => {
  return (
    <div data-slot="command-input-wrapper">
      <InputGroup className="bg-background/80 h-12 rounded-[1.25rem] shadow-none">
        <InputGroupAddon align="inline-start" className="text-muted-foreground">
          <IconSearch />
        </InputGroupAddon>
        <CommandPrimitive.Input
          data-slot="input-group-control"
          data-command-slot="command-input"
          className={cn(
            'placeholder:text-muted-foreground flex h-full w-full rounded-none border-0 bg-transparent px-0 py-0 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
      </InputGroup>
    </div>
  );
};

export const CommandList = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) => {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn('overflow-x-hidden overflow-y-auto', className)}
      {...props}
    />
  );
};

export const CommandEmpty = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Empty>) => {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        'text-muted-foreground py-10 text-center text-sm',
        className,
      )}
      {...props}
    />
  );
};

export const CommandGroup = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) => {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:pb-2 **:[[cmdk-group-heading]]:text-[11px] **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:tracking-[0.24em] **:[[cmdk-group-heading]]:uppercase',
        className,
      )}
      {...props}
    />
  );
};

export const CommandSeparator = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) => {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  );
};

export const CommandItem = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) => {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'aria-selected:bg-muted aria-selected:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground relative flex cursor-default items-center gap-3 rounded-[1.25rem] px-3 py-3 text-sm transition-[background-color,box-shadow,transform] outline-none select-none aria-selected:shadow-sm data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
};

export const CommandShortcut = ({
  className,
  ...props
}: ComponentProps<'span'>) => {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-[11px] font-medium tracking-[0.18em] uppercase',
        className,
      )}
      {...props}
    />
  );
};
