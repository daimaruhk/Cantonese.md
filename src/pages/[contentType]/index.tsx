import { Typography } from '@/components/ui/Typography';
import { Backdrop } from '@/components/Backdrop';
import { Container } from '@/components/Container';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { CardGrid } from '@/components/features/content/CardGrid';
import { useContentMetadataQuery } from '@/hooks/useQuery';
import { contentRegistry, type ContentType } from '@/configurations/registry';
import { renderers } from '@/configurations/renderers';
import {
  routeHandlers,
  type ListPageProps,
} from '@/configurations/routeHandlers';
import { seoProviders } from '@/configurations/seoProviders';

export default function ListPage<T extends ContentType>({
  contentType,
}: ListPageProps<T>) {
  const config = contentRegistry[contentType];
  const renderer = renderers[contentType];
  const seoProvider = seoProviders[contentType].listPage;
  const { data: entries } = useContentMetadataQuery({ contentType });

  return (
    <Layout
      title={`${config.label} | Cantonese.md`}
      description={seoProvider.description}
    >
      <Section className="flex max-w-4xl flex-col items-center gap-8">
        <Backdrop />
        <Typography variant="h1">{config.label}</Typography>
        <Typography
          variant="lead"
          className="text-center sm:max-w-xl md:max-w-3xl"
        >
          {renderer.renderListPageSubtitle()}
        </Typography>
      </Section>
      <Container>
        <CardGrid contentType={contentType} entries={entries ?? []} />
      </Container>
    </Layout>
  );
}

export const getStaticPaths = routeHandlers.getListPageStaticPaths;

export const getStaticProps = routeHandlers.getListPageStaticProps;
