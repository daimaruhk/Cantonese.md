import { IconArrowsSort } from '@tabler/icons-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Typography } from '@/components/ui/Typography';
import { Backdrop } from '@/components/Backdrop';
import { Container } from '@/components/Container';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { CardGrid } from '@/components/features/content/CardGrid';
import { Pagination } from '@/components/features/pagination';
import { useContentMetadataQuery } from '@/hooks/useQuery';
import { useList } from '@/hooks/useList';
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
  const renderer = renderers[contentType];
  const { data: entries = [] } = useContentMetadataQuery({ contentType });
  const seo = seoProviders[contentType].listPage(entries);
  const {
    paginatedEntries,
    sortOptions,
    currentSortOption,
    handleSortOptionChange,
    currentPage,
    totalPages,
    handlePageChange,
  } = useList(entries);

  return (
    <Layout seo={seo}>
      <Section className="flex max-w-4xl flex-col items-center gap-8">
        <Backdrop />
        <Typography variant="h1">
          {contentRegistry[contentType].label}
        </Typography>
        <Typography
          variant="lead"
          className="text-center sm:max-w-xl md:max-w-3xl"
        >
          {renderer.renderListPageSubtitle()}
        </Typography>
      </Section>
      <Container>
        <div className="mb-6 flex items-center justify-end gap-2">
          <IconArrowsSort className="text-primary" />
          <Select
            value={currentSortOption}
            onValueChange={handleSortOptionChange}
            items={sortOptions}
          >
            <SelectTrigger aria-label="排序" className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardGrid contentType={contentType} entries={paginatedEntries} />
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticPaths = routeHandlers.getListPageStaticPaths;

export const getStaticProps = routeHandlers.getListPageStaticProps;
