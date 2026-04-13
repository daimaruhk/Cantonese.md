import { IconHeartHandshake, IconCpu, IconBook } from '@tabler/icons-react';

import { Icon } from '@/components/ui/Icon';
import { Separator } from '@/components/ui/Separator';
import { Typography } from '@/components/ui/Typography';
import { Backdrop } from '@/components/Backdrop';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { normalizeUrl } from '@/lib/utils';

const mission = [
  {
    icon: <IconBook />,
    title: '文化保育',
    subtitle: '傳承民間語言智慧',
    description:
      '粵語蘊含大量民間智慧同獨特嘅表達方式，好似歇後語、俗語等。隨住時代發展，好多珍貴嘅本土語言文化正面臨流失。Cantonese.md 希望可以提供一個現代化、易用且開放嘅平台，將呢啲寶貴嘅粵語文化遺產以文字方式妥善保存落嚟。',
  },
  {
    icon: <IconHeartHandshake />,
    title: '擁抱開源',
    subtitle: '共同建立社群知識庫',
    description:
      '呢個計劃係完全開源嘅。無論你係熟悉粵語嘅母語者、文化研究者，還是純粹對粵語充滿熱情嘅朋友，我哋都非常歡迎你伸出援手。透過貢獻新詞彙、糾正錯誤、或者改善網站功能，你都可以為保育粵語出一分力。',
  },
  {
    icon: <IconCpu />,
    title: 'AI 數據集',
    subtitle: '為人工智能時代作準備',
    description:
      '喺人工智能時代，語言嘅生存好大程度上取決於佢喺互聯網上嘅足跡。由於缺乏高質素嘅粵語資料，現時嘅 AI 喺處理粵語方面仍有好大嘅進步空間。Cantonese.md 將所有資料以 Markdown (.md) 格式儲存。咁樣做唔單止方便大家透過 GitHub 協作編輯，更可以作為高質素嘅粵語數據集，用嚟訓練人工智能模型，提升 AI 對粵語嘅理解能力。',
  },
];

export default function AboutUsPage() {
  return (
    <Layout
      seo={{
        title: '關於我哋',
        description:
          '暸解 Cantonese.md 嘅理念。我哋致力於保育粵語文化，並建立高質素嘅開源 AI 訓練語料庫。',
        canonicalUrl: normalizeUrl('about-us'),
        ogType: 'website',
      }}
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
        {mission.map(({ icon, title, subtitle, description }, index) => {
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
