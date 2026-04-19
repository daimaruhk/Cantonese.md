import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { getGithubHomepageUrl } from '@/lib/utils';

export const Footer = () => {
  return (
    <footer>
      <Separator />
      <Container className="text-muted-foreground flex flex-col items-center gap-4 py-10 text-sm md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <Logo />
          <Typography variant="muted">保育粵語，由你我做起。</Typography>
        </div>

        <div className="flex items-center gap-6">
          <Button
            variant="link"
            size="sm"
            render={<Link href={getGithubHomepageUrl()} />}
            nativeButton={false}
          >
            GitHub
          </Button>
          <span>© {new Date().getFullYear()} Cantonese.md</span>
        </div>
      </Container>
    </footer>
  );
};
