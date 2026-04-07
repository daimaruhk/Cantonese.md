import type { GetStaticProps } from 'next';
import { IconArchive, IconBook, IconRobot } from '@tabler/icons-react';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Image } from '@/components/ui/Image';
import { Link } from '@/components/ui/Link';
import { Typography } from '@/components/ui/Typography';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { IdiomSuggestionSection } from '@/components/features/idioms/IdiomSuggestionSection';
import { getAllIdioms } from '@/lib/idioms';
import type { Idiom } from '@/schema/idioms';

type HomeProps = {
  idioms: Idiom[];
};

export default function Home({ idioms }: HomeProps) {
  return (
    <Layout
      title="開源粵語知識庫 | Cantonese.md"
      description="一個開源嘅粵語知識庫，記錄歇後語、俗語、文化。所有內容以 Markdown 格式保存，為粵語保育同 AI 訓練提供高質素數據。"
    >
      <HeroSection />
      <IntroductionSection />
      <IdiomSuggestionSection idioms={idioms} />
    </Layout>
  );
}

export const getStaticProps = (() => {
  const idioms = getAllIdioms();
  return {
    props: {
      idioms,
    },
  };
}) satisfies GetStaticProps<HomeProps>;

const features = [
  {
    icon: <IconArchive />,
    title: '保育粵語文化',
    description: '記錄粵語嘅歇後語、俗語、文化，等呢啲珍貴嘅語言遺產唔會消失。',
  },
  {
    icon: <IconBook />,
    title: '開源 — 每個人都可以貢獻',
    description:
      '所有內容都係開源嘅，任何人都可以透過 GitHub 貢獻新內容，一齊建設呢個知識庫。',
  },
  {
    icon: <IconRobot />,
    title: '高質素 AI 訓練數據',
    description:
      '所有內容以結構化嘅 Markdown 格式保存，可以直接用作高質素嘅粵語 AI 訓練數據。',
  },
];

const HeroSection = () => {
  return (
    <Section className="flex flex-col items-center justify-between gap-16 md:flex-row md:gap-12">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 md:items-start md:gap-8">
        <Typography
          variant="h1"
          className="text-7xl leading-[1.1] tracking-tighter md:text-7xl lg:text-8xl"
        >
          粵語文化
          <br />
          存檔計畫
        </Typography>
        <Typography variant="lead" className="text-center md:text-left">
          我們致力於紀錄、整理與傳承粵語的精髓。從民間智慧到當代語境，為下一代保留最道地的廣東話印記。
        </Typography>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            size="xl"
            render={<Link href="/idioms" />}
            nativeButton={false}
          >
            開始探索
          </Button>
          <Button
            variant="outline"
            size="xl"
            render={<Link href="/about-us" />}
            nativeButton={false}
          >
            了解更多
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative mt-8 mr-4 ml-auto w-[90%] max-w-[480px] md:mt-0 md:mr-0 md:w-[85%] lg:w-[80%]">
          <Image
            src="/hero.webp"
            alt="Hong Kong Neon Street"
            className="aspect-4/5 rounded-[2rem] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.3)] grayscale sm:aspect-3/4"
          />
          <Card className="absolute -bottom-6 -left-8 w-[240px] shadow-xl sm:-bottom-12 sm:-left-16 sm:w-[320px]">
            <CardHeader>
              <Typography variant="muted">每日一語</Typography>
              <CardTitle variant="h4">阿茂整餅</CardTitle>
              <CardDescription>
                用嚟形容人多此一舉，結果只係自製麻煩。
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Section>
  );
};

const IntroductionSection = () => {
  return (
    <Section
      title="點解要搞 Cantonese.md？"
      subtitle="我哋相信，保育文化係每一個人嘅責任。"
    >
      <div className="grid gap-3 md:grid-cols-3 md:gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="shadow-none ring-0">
            <CardHeader className="place-items-center text-center">
              <Icon>{feature.icon}</Icon>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
};
