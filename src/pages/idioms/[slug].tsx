import { useState } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
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
import { IdiomSuggestionSection } from '@/components/features/idioms/IdiomSuggestionSection';
import type { IdiomData, Idiom } from '@/schema/idioms';
import { getAllIdioms, getIdiomDataByTerm } from '@/lib/idioms';
import { homepage } from '../../../package.json';

type IdiomPageProps = {
  idiomData: IdiomData;
  idioms: Idiom[];
};

export default function IdiomPage({ idiomData, idioms }: IdiomPageProps) {
  return (
    <Layout
      title={`${idiomData.term} | Cantonese.md`}
      description={`${idiomData.term} ── ${idiomData.answer}。粵拼：${idiomData.termJyutping} ── ${idiomData.answerJyutping}。`}
    >
      <HeroSection idiomData={idiomData} />
      <Container>
        <MarkdownRenderer content={idiomData.content} />
      </Container>
      <IdiomSuggestionSection idioms={idioms} excludeId={idiomData.id} />
    </Layout>
  );
}

type Params = { slug: string };

export const getStaticPaths = (() => {
  const idioms = getAllIdioms();
  return {
    paths: idioms.map((idiom) => ({ params: { slug: idiom.term } })),
    fallback: false,
  };
}) satisfies GetStaticPaths<Params>;

export const getStaticProps = (({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const { slug } = params;
  const idiomData = getIdiomDataByTerm(slug);
  const idioms = getAllIdioms();
  return {
    props: {
      idiomData,
      idioms,
    },
  };
}) satisfies GetStaticProps<IdiomPageProps, Params>;

const HeroSection = ({ idiomData }: { idiomData: IdiomData }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator === 'undefined') {
      return;
    }

    // don't need to encode URI otherwise it becomes unreadable
    const url = `${window.location.origin}/idioms/${idiomData.term}`;
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Section className="flex flex-col items-center gap-6 text-center">
      <Backdrop />
      <Typography variant="h1">
        {idiomData.term} ── {idiomData.answer}
      </Typography>
      <Typography variant="code" as="span" className="text-base">
        {idiomData.termJyutping} ── {idiomData.answerJyutping}
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
              href={`${homepage}/blob/main/src/contents/idioms/${encodeURIComponent(idiomData.term)}.md`}
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
            {idiomData.contributors.map((username) => (
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
          <Typography className="text-sm">{idiomData.createdAt}</Typography>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IconGitCommit size={16} />
            <Typography variant="muted">最後更新</Typography>
          </div>
          <Typography className="text-sm">{idiomData.updatedAt}</Typography>
        </div>
      </div>
    </Section>
  );
};
