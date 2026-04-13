import { useEffect, useEffectEvent, useState } from 'react';
import { IconMenu2, IconSearch } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { SearchModal } from '@/components/features/search/SearchModal';
import { SearchBar } from '@/components/features/search/SearchBar';
import { contentRegistry } from '@/configurations/registry';

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
  { label: '關於我哋', href: '/about-us' },
  { label: '點樣貢獻', href: '/contribute' },
] as const;

const cultureItems = Object.values(contentRegistry).map((config) => ({
  label: config.label,
  href: `/${config.contentType}`,
}));

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
              <Button
                variant="link"
                className="justify-start"
                render={<Link href={navItems[0].href} />}
                nativeButton={false}
              >
                {navItems[0].label}
              </Button>
              <div className="flex flex-col gap-1">
                <Typography
                  variant="muted"
                  className="px-3 py-2 text-sm font-medium"
                >
                  粵語文化
                </Typography>
                <div className="flex flex-col gap-1 pl-3">
                  {cultureItems.map((item) => (
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
              </div>
              {navItems.slice(1).map((item) => (
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
          <Button
            variant="link"
            size="sm"
            render={<Link href={navItems[0].href} />}
            nativeButton={false}
          >
            {navItems[0].label}
          </Button>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>粵語文化</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-48">
                    {cultureItems.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink
                          render={<Link href={item.href}>{item.label}</Link>}
                        />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {navItems.slice(1).map((item) => (
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
