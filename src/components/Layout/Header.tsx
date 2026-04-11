import { useEffect, useEffectEvent, useState } from 'react';
import { IconMenu2, IconSearch } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { SearchModal } from '@/components/features/search/SearchModal';
import { SearchBar } from '@/components/features/search/SearchBar';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleGlobalShortcutOpen = useEffectEvent((event: KeyboardEvent) => {
    if (isSearchOpen || !isSearchShortcut(event)) {
      return;
    }

    event.preventDefault();
    setIsSearchOpen(true);
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      handleGlobalShortcutOpen(event);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <MobileHeader onOpenSearch={() => setIsSearchOpen(true)} />
        <DesktopHeader onOpenSearch={() => setIsSearchOpen(true)} />
      </Container>
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};

const navItems = [
  { label: '首頁', href: '/' },
  { label: '歇後語', href: '/idioms' },
  { label: '關於我哋', href: '/about-us' },
  { label: '點樣貢獻', href: '/contribute' },
];

type ResponsiveHeaderProps = {
  onOpenSearch: () => void;
};

const MobileHeader = ({ onOpenSearch }: ResponsiveHeaderProps) => {
  return (
    <>
      <div className="flex flex-1 items-center justify-start md:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="-ml-2">
                <IconMenu2 />
              </Button>
            }
          />
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-2 px-6">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="link"
                  className="justify-start"
                  render={<Link href={item.href} />}
                  nativeButton={false}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-1 items-center justify-center md:hidden">
        <Logo />
      </div>

      <div className="flex flex-1 items-center justify-end md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={onOpenSearch}
          aria-label="Open search"
        >
          <IconSearch />
        </Button>
      </div>
    </>
  );
};

const DesktopHeader = ({ onOpenSearch }: ResponsiveHeaderProps) => {
  return (
    <>
      <div className="hidden flex-1 items-center justify-start md:flex">
        <Logo />
      </div>

      <div className="hidden flex-1 items-center justify-center md:flex">
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="link"
              size="sm"
              render={<Link href={item.href} />}
              nativeButton={false}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="hidden flex-1 items-center justify-end md:flex">
        <SearchBar className="max-w-[240px]" onOpen={onOpenSearch} />
      </div>
    </>
  );
};

const isSearchShortcut = (event: KeyboardEvent) => {
  return (
    (event.metaKey || event.ctrlKey) &&
    !event.altKey &&
    !event.shiftKey &&
    !event.repeat &&
    event.key.toLowerCase() === 'k'
  );
};
