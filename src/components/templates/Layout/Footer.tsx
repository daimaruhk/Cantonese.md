import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Logo } from '@/components/atoms/Logo';
import { Separator } from '@/components/atoms/Separator';
import { Typography } from '@/components/atoms/Typography';
import { Container } from '@/components/templates/Container';
import { homepage } from '../../../../package.json';

export const Footer = () => {
  return (
    <footer>
      <Separator />
      <Container className="text-muted-foreground flex flex-col items-center gap-4 py-10 text-sm md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <Logo />
          <Typography variant="muted">保存粵語，由每一個人開始。</Typography>
        </div>

        <div className="flex items-center gap-6">
          <Button
            variant="link"
            size="sm"
            render={<Link href={homepage} />}
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
