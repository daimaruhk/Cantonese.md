import { Fragment } from 'react';
import { Typography } from '@/components/ui/Typography';
import { Backdrop } from '@/components/Backdrop';
import { Container } from '@/components/Container';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { useContentMetadataQuery } from '@/hooks/useContentMetadataQuery';
import { contentRegistry } from '@/configurations/registry';
import { renderers } from '@/configurations/renderers';
import {
  routeHandlers,
  type ListPageProps,
} from '@/configurations/routeHandlers';
import { seoProviders } from '@/configurations/seoProviders';

export default function ListPage({ contentType }: ListPageProps) {
  const config = contentRegistry[contentType];
  const seoProvider = seoProviders[contentType].listPage;
  const { status, data: entries } = useContentMetadataQuery(contentType);

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
          {config.listPageSubtitle}
        </Typography>
      </Section>
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {status === 'success'
            ? entries.map((entry) => (
                <Fragment key={entry.id}>
                  {renderers[contentType].renderCard(entry)}
                </Fragment>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Fragment key={i}>
                  {renderers[contentType].renderCardSkeleton()}
                </Fragment>
              ))}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticPaths = routeHandlers.getListPageStaticPaths;

export const getStaticProps = routeHandlers.getListPageStaticProps;
