import { Fragment } from 'react';
import { Typography } from '@/components/ui/Typography';
import { Backdrop } from '@/components/Backdrop';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { useContentMetadataQuery } from '@/hooks/useContentMetadataQuery';
import { contentCardRenderers } from '@/configurations/renderers';
import { Container } from '@/components/Container';

export default function IdiomsPage() {
  const { status, data: idioms } = useContentMetadataQuery('idioms');
  return (
    <Layout
      title="歇後語 | Cantonese.md"
      description="探索所有粵語歇後語，暸解背後嘅文化同民間智慧。"
    >
      <Section className="flex max-w-4xl flex-col items-center gap-8">
        <Backdrop />
        <Typography variant="h1">歇後語</Typography>
        <Typography
          variant="lead"
          className="text-center sm:max-w-xl md:max-w-3xl"
        >
          歇後語係粵語文化中極具智慧且風趣嘅表達方式，結構上分為「謎面」同「謎底」兩部分。謎面一般係比喻或情境描述，而謎底先係真正含意，通常交俾對方自己領悟。
          <br />
          歇後語大致可以分為兩大類：一種係邏輯型，謎底係由謎面推理出嚟；另一種係諧音型，謎底加入咗諧音要素。
          <br />
          歇後語同時具備好強嘅時代性同地域性，我哋可以從中窺探唔同年代、唔同地方嘅社會文化同民間智慧。
        </Typography>
      </Section>
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {status === 'success'
            ? idioms.map((idiom) => (
                <Fragment key={idiom.id}>
                  {contentCardRenderers.idioms.renderCard(idiom)}
                </Fragment>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Fragment key={i}>
                  {contentCardRenderers.idioms.renderSkeleton()}
                </Fragment>
              ))}
        </div>
      </Container>
    </Layout>
  );
}
