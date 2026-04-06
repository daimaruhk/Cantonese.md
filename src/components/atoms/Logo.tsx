import { Link } from '@/components/atoms/Link';

export const Logo = () => {
  return (
    <Link
      href="/"
      className="text-foreground text-base font-bold tracking-tight md:text-lg lg:text-xl"
    >
      Cantonese
      <span className="text-muted-foreground">.md</span>
    </Link>
  );
};
