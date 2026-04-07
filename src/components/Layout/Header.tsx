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
import { SearchBar } from './SearchBar';

export const Header = () => {
  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <MobileHeader />
        <DesktopHeader />
      </Container>
    </header>
  );
};

const navItems = [
  { label: '首頁', href: '/' },
  { label: '歇後語', href: '/idioms' },
  { label: '關於我哋', href: '/about-us' },
  { label: '點樣貢獻', href: '/contribute' },
];

const MobileHeader = () => {
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
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <IconSearch />
        </Button>
      </div>
    </>
  );
};

const DesktopHeader = () => {
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
        <SearchBar className="w-full max-w-[200px] lg:max-w-[240px]" />
      </div>
    </>
  );
};
