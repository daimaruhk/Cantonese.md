import { IconHeartHandshake, IconCpu, IconBook } from '@tabler/icons-react';

import { Backdrop } from '@/components/atoms/Backdrop';
import { Icon } from '@/components/atoms/Icon';
import { Separator } from '@/components/atoms/Separator';
import { Typography } from '@/components/atoms/Typography';
import { Layout } from '@/components/templates/Layout';
import { Section } from '@/components/templates/Section';

export default function AboutUsPage() {
  return (
    <Layout
      title="關於我哋 | Cantonese.md"
      description="暸解 Cantonese.md 嘅理念。我哋致力於開源保育粵語文化，並建立高質素嘅 AI 訓練語料庫。"
    >
      <Section className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <Backdrop />
        <Typography variant="h1">關於我哋</Typography>
        <Typography variant="lead">
          Cantonese.md
          係一個由開源社群驅動嘅計劃，目的係記錄、整理同傳承豐富嘅粵語文化。
        </Typography>
      </Section>

      <Section className="flex max-w-3xl flex-col gap-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex flex-col items-start gap-2 md:w-1/4">
            <Icon>
              <IconBook />
            </Icon>
            <Typography variant="h3" className="hidden md:block">
              文化保育
            </Typography>
          </div>
          <div className="md:w-3/4">
            <Typography variant="h4" className="mb-3">
              傳承民間語言智慧
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              粵語擁有多姿多彩嘅民間智慧同獨特嘅表達方式，好似歇後語同俗語。隨住時代發展，好多珍貴嘅本土語言文化正面臨流失。Cantonese.md
              希望可以提供一個現代化、易用且開放嘅平台，將呢啲寶貴嘅粵語文化遺產以文字方式妥善保存落嚟。
            </Typography>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex flex-col items-start gap-2 md:w-1/4">
            <Icon>
              <IconHeartHandshake />
            </Icon>
            <Typography variant="h3" className="hidden md:block">
              擁抱開源
            </Typography>
          </div>
          <div className="md:w-3/4">
            <Typography variant="h4" className="mb-3">
              共同建立社群知識庫
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              呢個計劃係完全開源嘅。無論你係熟悉粵語嘅母語者、文化研究者，還是純粹對粵語充滿熱情嘅朋友，我哋都非常歡迎你伸出援手。透過貢獻新詞彙、糾正錯誤、或者改善網站功能，你都可以為保育粵語出一分力。
            </Typography>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex flex-col items-start gap-2 md:w-1/4">
            <Icon>
              <IconCpu />
            </Icon>
            <Typography variant="h3" className="hidden md:block">
              AI 數據集
            </Typography>
          </div>
          <div className="md:w-3/4">
            <Typography variant="h4" className="mb-3">
              為人工智能時代作準備
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              除咗供人閱讀同學習，Cantonese.md 將所有資料結構化為 Markdown (.md)
              格式。咁樣做唔單止方便大家透過 GitHub
              協作編輯，更可以作為高質素嘅粵語數據集，用嚟訓練人工智能模型，提升
              AI 對粵語嘅理解能力。
            </Typography>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
