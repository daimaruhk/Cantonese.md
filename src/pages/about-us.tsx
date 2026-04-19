import { Fragment } from 'react';
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
      '粵語入面有好多民間智慧同獨特嘅表達方式，好似歇後語、俗語咁。不過隨住時代變遷，好多珍貴嘅本土語言文化都慢慢流失緊。Cantonese.md 想做一個現代化、易用又開放嘅平台，將依啲寶貴嘅粵語文化遺產好好咁保存落嚟。',
  },
  {
    icon: <IconHeartHandshake />,
    title: '擁抱開源',
    subtitle: '一齊建立社群知識庫',
    description:
      '依個計劃係完全開源嘅。無論你係粵語母語人士、文化研究者，定係純粹鍾意粵語嘅朋友，我哋都歡迎你嚟幫手。你可以貢獻新詞彙、改正錯漏、又或者幫手改善網站功能，為保育粵語出一分力。',
  },
  {
    icon: <IconCpu />,
    title: 'AI 數據集',
    subtitle: '為 AI 時代做好準備',
    description:
      '喺 AI 時代，一種語言能唔能夠生存，好大程度上睇佢喺網上有幾多足跡。偏偏高質素嘅粵語資料好少，依家嘅 AI 處理粵語仲有好大進步空間。Cantonese.md 將所有資料用 Markdown (.md) 格式儲存，唔單止方便大家透過 GitHub 一齊編輯，仲可以用作高質素嘅粵語數據集，幫 AI 更加識聽、識講粵語。',
  },
];

export default function AboutUsPage() {
  return (
    <Layout
      seo={{
        title: '關於我哋',
        description:
          '暸解 Cantonese.md 嘅理念。我哋專注保育粵語文化，同時建立高質素嘅開源 AI 訓練語料庫。',
        canonicalUrl: normalizeUrl('about-us'),
        ogType: 'website',
      }}
    >
      <Section className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <Backdrop />
        <Typography variant="h1">關於我哋</Typography>
        <Typography variant="lead">
          Cantonese.md
          係一個由開源社群推動嘅計劃，一齊記錄、整理同傳承我哋珍貴嘅粵語文化。
        </Typography>
      </Section>

      <Section className="flex max-w-3xl flex-col gap-16">
        {mission.map(({ icon, title, subtitle, description }, index) => {
          return (
            <Fragment key={title}>
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
