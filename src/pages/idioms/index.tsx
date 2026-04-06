import type { GetStaticProps } from 'next';

import { IdiomCard } from '@/components/molecules/IdiomCard';
import { Layout } from '@/components/templates/Layout';
import { Section } from '@/components/templates/Section';
import { getAllIdioms } from '@/lib/idioms';
import type { Idiom } from '@/schema/idioms';

type IdiomsPageProps = {
  idioms: Idiom[];
};

export default function IdiomsPage({ idioms }: IdiomsPageProps) {
  return (
    <Layout
      title="歇後語 | Cantonese.md"
      description="探索所有粵語歇後語，暸解背後嘅文化同民間智慧。"
    >
      <Section
        title="所有歇後語"
        subtitle="探索粵語民間智慧，暸解每一個歇後語背後嘅有趣故事。"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {idioms.map((idiom) => (
            <IdiomCard key={idiom.id} idiom={idiom} />
          ))}
        </div>
      </Section>
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
}) satisfies GetStaticProps<IdiomsPageProps>;
