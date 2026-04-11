import { useState } from 'react';
import {
  IconBrandGithub,
  IconCalendar,
  IconCheck,
  IconGitCommit,
  IconShare,
  IconUsers,
} from '@tabler/icons-react';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Typography } from '@/components/ui/Typography';
import { Backdrop } from '@/components/Backdrop';
import { Container } from '@/components/Container';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';

import { getGithubMarkdownUrl } from '@/lib/utils';
import {
  routeHandlers,
  type ContentPageProps,
} from '@/configurations/routeHandlers';
import { ContentGrid } from '@/components/features/content/ContentGrid';

export default function IdiomPage({ contentData }: ContentPageProps<'idioms'>) {
  return (
    <Layout
      title={`${contentData.term} | Cantonese.md`}
      description={`${contentData.term} ── ${contentData.answer}。粵拼：${contentData.termJyutping} ── ${contentData.answerJyutping}。`}
    >
      <HeroSection contentData={contentData} />
      <Container>
        <MarkdownRenderer content={contentData.content} />
      </Container>
      <ContentGrid contentType="idioms" excludedId={contentData.id} />
    </Layout>
  );
}

export const getStaticPaths = routeHandlers.idioms.getStaticPaths;

export const getStaticProps = routeHandlers.idioms.getStaticProps;

const HeroSection = ({
  contentData,
}: {
  contentData: ContentPageProps<'idioms'>['contentData'];
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator === 'undefined') {
      return;
    }

    // don't need to encode URI otherwise it becomes unreadable
    const url = `${window.location.origin}/${contentData.contentType}/${contentData.fileName}`;
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Section className="flex flex-col items-center gap-6 text-center">
      <Backdrop />
      <Typography variant="h1">
        {contentData.term} ── {contentData.answer}
      </Typography>
      <Typography variant="code" as="span" className="text-base">
        {contentData.termJyutping} ── {contentData.answerJyutping}
      </Typography>
      <div className="mt-2 flex items-center gap-3">
        <Button
          onClick={handleShare}
          className={
            isCopied
              ? 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-700'
              : ''
          }
        >
          {isCopied ? (
            <IconCheck className="animate-in zoom-in spin-in" />
          ) : (
            <IconShare className="animate-in zoom-in" />
          )}
          {isCopied ? '已複製' : '分享'}
        </Button>
        <Button
          variant="outline"
          render={
            <Link
              href={getGithubMarkdownUrl(
                contentData.contentType,
                contentData.fileName,
              )}
            />
          }
          nativeButton={false}
        >
          <IconBrandGithub />
          編輯
        </Button>
      </div>
      <div className="text-muted-foreground flex flex-col items-center justify-center gap-4 text-sm sm:flex-row sm:gap-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IconUsers size={16} />
            <Typography variant="muted">貢獻者</Typography>
          </div>
          <AvatarGroup>
            {contentData.contributors.map((username) => (
              <Link
                href={`https://github.com/${username}`}
                hideExternalIcon
                key={username}
              >
                <Avatar>
                  <AvatarImage
                    src={`https://github.com/${username}.png?size=32`}
                    alt={username}
                  />
                  <AvatarFallback>
                    {username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ))}
          </AvatarGroup>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IconCalendar size={16} />
            <Typography variant="muted">創建日期</Typography>
          </div>
          <Typography className="text-sm">{contentData.createdAt}</Typography>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IconGitCommit size={16} />
            <Typography variant="muted">最後更新</Typography>
          </div>
          <Typography className="text-sm">{contentData.updatedAt}</Typography>
        </div>
      </div>
    </Section>
  );
};
