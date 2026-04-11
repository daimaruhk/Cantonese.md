import {
  IconBook,
  IconPalette,
  IconSparkles,
  IconBrandGithub,
} from '@tabler/icons-react';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { Typography } from '@/components/ui/Typography';
import { Backdrop } from '@/components/Backdrop';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { getGithubHomepageUrl } from '@/lib/utils';

const contributions = [
  {
    icon: <IconBook />,
    title: '內容貢獻',
    subtitle: '擴展粵語資料庫',
    description:
      '你可以透過 GitHub 貢獻新內容（例如未收錄嘅歇後語，或者長輩成日講嘅俗語）、豐富現有內容、糾正錯誤等，我哋希望建立最齊全嘅粵語資料庫。',
  },
  {
    icon: <IconPalette />,
    title: '用戶體驗',
    subtitle: '改善網站設計和用戶體驗',
    description:
      '如果你擅長設計或者網頁開發，我哋非常歡迎你協助改善網站嘅界面設計同使用者體驗，令所有人都可以更舒服、流暢地瀏覽。',
  },
  {
    icon: <IconSparkles />,
    title: '任何貢獻',
    subtitle: '任何有價值嘅諗法',
    description:
      '無論係發現網站嘅 Bug、建議新功能、改善文檔、或者純粹幫手宣傳呢個計劃，只要你認為對保育粵語有價值嘅嘢，我哋都非常歡迎。',
  },
];

export default function ContributePage() {
  return (
    <Layout
      title="點樣貢獻 | Cantonese.md"
      description="暸解點樣為 Cantonese.md 貢獻你的力量。我哋歡迎任何人一齊參與開源保育粵語文化。"
    >
      <Section className="flex max-w-full flex-col items-center gap-6 text-center md:max-w-lg">
        <Backdrop />
        <Typography variant="h1">點樣貢獻</Typography>
        <Typography variant="lead">
          Cantonese.md 係一個開源專案，你可以透過以下方式為社群出一分力
        </Typography>
        <Button
          size="xl"
          render={<Link href={getGithubHomepageUrl()} />}
          nativeButton={false}
        >
          <IconBrandGithub />
          前往 GitHub 貢獻
        </Button>
      </Section>

      <Section className="flex max-w-3xl flex-col gap-16">
        {contributions.map(({ icon, title, subtitle, description }, index) => {
          return (
            <>
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
            </>
          );
        })}
      </Section>
    </Layout>
  );
}
