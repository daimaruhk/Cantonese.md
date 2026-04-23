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
import { ContentGrid } from '@/components/features/content/ContentGrid';
import { normalizeUrl } from '@/lib/utils';

export default function Home() {
  return (
    <Layout
      seo={{
        title: '開源粵語知識庫',
        description:
          '一個開源嘅粵語知識庫，收錄歇後語、俗語同文化。所有內容用 Markdown 格式保存，為粵語保育同 AI 訓練提供高質素嘅數據。',
        canonicalUrl: normalizeUrl(),
        ogType: 'website',
      }}
    >
      <HeroSection />
      <IntroductionSection />
      <ContentGrid contentType="idioms" />
    </Layout>
  );
}

const features = [
  {
    icon: <IconArchive />,
    title: '保育粵語文化',
    description:
      '記錄粵語嘅歇後語、俗語同文化，唔好等依啲珍貴嘅語言遺產靜靜咁消失。',
  },
  {
    icon: <IconBook />,
    title: '開源 — 每個人都可以貢獻',
    description:
      '所有內容完全開源，任何人都可以透過 GitHub 出一分力，一齊充實依個資料庫。',
  },
  {
    icon: <IconRobot />,
    title: '高質素 AI 訓練數據',
    description:
      '所有內容用結構化嘅 Markdown 格式保存，可以直接攞嚟做高質素嘅粵語 AI 訓練數據。',
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
          傳承計劃
        </Typography>
        <Typography variant="lead" className="text-center md:text-left">
          我哋用心記低、整理同傳承粵語最精彩嘅部分。由老一輩嘅民間智慧到而家嘅潮語，為下一代留住最地道嘅粵語印記。
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
            暸解更多
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative mt-8 mr-4 ml-auto w-[90%] max-w-[480px] md:mt-0 md:mr-0 md:w-[85%] lg:w-[80%]">
          <Image
            src="/assets/hero.webp"
            alt="Hong Kong Neon Street"
            className="aspect-4/5 rounded-[2rem] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.3)] grayscale sm:aspect-3/4"
          />
          <Card className="absolute -bottom-6 -left-8 w-[240px] shadow-xl sm:-bottom-12 sm:-left-16 sm:w-xs">
            <CardHeader>
              <Typography variant="muted">每日一語</Typography>
              <CardTitle variant="h4">阿茂整餅</CardTitle>
              <CardDescription>
                形容人多此一舉，結果自己攞嚟煩。
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
      subtitle="保育粵語文化，人人都有份。"
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
