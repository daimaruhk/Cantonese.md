import { Typography } from '@/components/ui/Typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Backdrop } from '@/components/Backdrop';
import { Container } from '@/components/Container';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { CardGrid } from '@/components/features/content/CardGrid';
import { useContentMetadataQuery } from '@/hooks/useQuery';
import { useSort } from '@/hooks/useSort';
import { contentRegistry, type ContentType } from '@/configurations/registry';
import { renderers } from '@/configurations/renderers';
import {
  routeHandlers,
  type ListPageProps,
} from '@/configurations/routeHandlers';
import { seoProviders } from '@/configurations/seoProviders';
import { IconArrowsSort } from '@tabler/icons-react';

export default function ListPage<T extends ContentType>({
  contentType,
}: ListPageProps<T>) {
  const renderer = renderers[contentType];
  const seo = seoProviders[contentType].listPage();
  const { data: entries = [] } = useContentMetadataQuery({ contentType });
  const {
    sortedEntries,
    sortOptions,
    currentSortOption,
    handleSortOptionChange,
  } = useSort(entries);

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
        <CardGrid contentType={contentType} entries={sortedEntries} />
      </Container>
    </Layout>
  );
}

export const getStaticPaths = routeHandlers.getListPageStaticPaths;

export const getStaticProps = routeHandlers.getListPageStaticProps;
