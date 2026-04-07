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
import { homepage } from '../../package.json';

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
          Cantonese.md 係一個開源專案，你可以透過以下方式為社群出一分力：
        </Typography>
        <Button
          size="xl"
          render={<Link href={homepage} />}
          nativeButton={false}
        >
          <IconBrandGithub />
          前往 GitHub 貢獻
        </Button>
      </Section>

      <Section className="flex max-w-3xl flex-col gap-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex flex-col items-start gap-2 md:w-1/4">
            <Icon>
              <IconBook />
            </Icon>
            <Typography variant="h3" className="hidden md:block">
              內容貢獻
            </Typography>
          </div>
          <div className="md:w-3/4">
            <Typography variant="h4" className="mb-3">
              新增和編輯歇後語
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              你可以透過 GitHub
              新增仲未被收錄嘅歇後語，或者為現有嘅內容提供更多文化背景、出處、或者例子。我哋希望建立最齊全嘅粵語知識庫。
            </Typography>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex flex-col items-start gap-2 md:w-1/4">
            <Icon>
              <IconPalette />
            </Icon>
            <Typography variant="h3" className="hidden md:block">
              用戶體驗
            </Typography>
          </div>
          <div className="md:w-3/4">
            <Typography variant="h4" className="mb-3">
              改善網站設計和用戶體驗
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              如果你擅長設計或者網頁開發，我哋非常歡迎你協助改善網站嘅界面設計同使用者體驗，令所有人都可以更舒服、流暢地瀏覽。
            </Typography>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex flex-col items-start gap-2 md:w-1/4">
            <Icon>
              <IconSparkles />
            </Icon>
            <Typography variant="h3" className="hidden md:block">
              任何貢獻
            </Typography>
          </div>
          <div className="md:w-3/4">
            <Typography variant="h4" className="mb-3">
              任何有價值嘅諗法
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              無論係發現網站嘅
              Bug、建議新功能、改善文檔、或者純粹幫手宣傳呢個計劃，只要你認為對保育粵語有價值嘅嘢，我哋都非常歡迎。
            </Typography>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
