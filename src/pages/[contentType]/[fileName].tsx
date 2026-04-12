import { Container } from '@/components/Container';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Layout } from '@/components/Layout';
import { ContentGrid } from '@/components/features/content/ContentGrid';
import { HeroSection } from '@/components/features/content/HeroSection';
import { seoProviders } from '@/configurations/seoProviders';
import {
  routeHandlers,
  type DetailPageProps,
} from '@/configurations/routeHandlers';
import type { ContentType } from '@/configurations/registry';

export default function DetailPage<T extends ContentType>({
  contentData,
}: DetailPageProps<T>) {
  const { contentType } = contentData;
  const seoProvider = seoProviders[contentType].detailPage;

  return (
    <Layout
      title={seoProvider.title(contentData)}
      description={seoProvider.description(contentData)}
    >
      <HeroSection contentData={contentData} />
      <Container>
        <MarkdownRenderer content={contentData.content} />
      </Container>
      <ContentGrid contentType={contentType} excludedId={contentData.id} />
    </Layout>
  );
}

export const getStaticPaths = routeHandlers.getDetailPageStaticPaths;

export const getStaticProps = routeHandlers.getDetailPageStaticProps;
