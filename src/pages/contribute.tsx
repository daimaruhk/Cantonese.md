import { Fragment } from 'react';
import {
  IconBook,
  IconPalette,
  IconSparkles,
  IconBrandGithub,
  IconMail,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { Typography } from '@/components/ui/Typography';
import { Backdrop } from '@/components/Backdrop';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { getGithubHomepageUrl, normalizeUrl } from '@/lib/utils';

const contributions = [
  {
    icon: <IconBook />,
    title: '內容貢獻',
    subtitle: '擴展粵語資料庫',
    description:
      '你可以透過 GitHub 加入新內容，例如未收錄嘅歇後語、老一輩成日講嘅俗語、又或者最新嘅網絡潮語。改正錯漏、豐富現有內容，幫我哋建立最齊全嘅粵語資料庫。',
  },
  {
    icon: <IconPalette />,
    title: '用戶體驗',
    subtitle: '幫手改善網站設計',
    description:
      '如果你擅長設計或者網頁開發，歡迎你嚟幫手改善網站嘅介面同使用體驗，令大家用得更加舒服、流暢。',
  },
  {
    icon: <IconSparkles />,
    title: '任何貢獻',
    subtitle: '你嘅諗法好重要',
    description:
      '無論係發現 Bug、建議新功能、改善網站內容，定係幫手同身邊嘅人宣傳依個計劃，只要你覺得對保育粵語有幫助嘅嘢，我哋都非常歡迎。',
  },
];

export default function ContributePage() {
  return (
    <Layout
      seo={{
        title: '點樣貢獻',
        description:
          '暸解點樣為 Cantonese.md 出一分力。歡迎任何人一齊參與，用開源方式保育粵語文化。',
        canonicalUrl: normalizeUrl('contribute'),
        ogType: 'website',
      }}
    >
      <Section className="flex max-w-full flex-col items-center gap-6 text-center md:max-w-lg">
        <Backdrop />
        <Typography variant="h1">點樣貢獻</Typography>
        <Typography variant="lead">
          Cantonese.md 係一個開源計劃，以下幾個方向都歡迎你嚟幫手
        </Typography>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button
            size="xl"
            render={<Link href={getGithubHomepageUrl()} />}
            nativeButton={false}
          >
            <IconBrandGithub className="mr-2 size-5" />
            前往 GitHub 貢獻
          </Button>
          <Button
            size="xl"
            variant="outline"
            render={<Link href="mailto:daimaruhk@duck.com" />}
            nativeButton={false}
          >
            <IconMail className="mr-2 size-5" />
            電郵至 daimaruhk@duck.com
          </Button>
        </div>
      </Section>

      <Section className="flex max-w-3xl flex-col gap-16">
        {contributions.map(({ icon, title, subtitle, description }, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <Separator />}
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
                <div className="flex flex-col items-center gap-2 md:w-1/4 md:items-start">
                  <Icon>{icon}</Icon>
                  <Typography variant="h3" className="hidden md:block">
                    {title}
                  </Typography>
                </div>
                <div className="text-center md:w-3/4 md:text-left">
                  <Typography variant="h4" className="mb-3">
                    {subtitle}
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground">
                    {description}
                  </Typography>
                </div>
              </div>
            </Fragment>
          );
        })}
      </Section>
    </Layout>
  );
}
