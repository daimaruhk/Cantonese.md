import type { GetStaticPaths, GetStaticProps } from 'next';
import { z } from 'zod';
import { IdiomFrontmatterSchema } from '@/schema/idioms';
import {
  getGitMetadata,
  getMarkdownFilePaths,
  readContentFile,
  type Frontmatter,
  type GitMetadata,
} from './content';

type ContentType = 'idioms';

export type ContentData<T extends Frontmatter> = T &
  GitMetadata & {
    content: string;
  };

type PathParams = { slug: string };

export type ContentPageProps<T extends Frontmatter> = {
  entry: ContentData<T>;
  restEntries: ContentData<T>[];
};

type ContentRegistryConfig<T extends Frontmatter> = {
  type: ContentType;
  schema: z.ZodType<T>;
  getSlug: (entry: ContentData<T>) => string;
};

export type ContentRegistry<T extends Frontmatter> = {
  getAllEntries: () => ContentData<T>[];
  getStaticPaths: GetStaticPaths<PathParams>;
  getStaticProps: GetStaticProps<ContentPageProps<T>, PathParams>;
};

export const createContentRegistry = <T extends Frontmatter>({
  type,
  schema,
  getSlug,
}: ContentRegistryConfig<T>): ContentRegistry<T> => {
  let cachedEntries: ContentData<T>[] | null = null;

  const getAllEntries = () => {
    if (!cachedEntries) {
      const filePaths = getMarkdownFilePaths(type);

      cachedEntries = filePaths.map((filePath) => {
        const { frontmatter, content } = readContentFile(filePath);
        const validationResult = schema.safeParse(frontmatter);

        if (!validationResult.success) {
          throw new Error(
            `Invalid frontmatter in "${filePath}": ${z.prettifyError(validationResult.error)}`,
          );
        }

        return {
          ...validationResult.data,
          ...getGitMetadata(filePath),
          content,
        };
      });
    }

    return cachedEntries;
  };

  const getStaticPaths: GetStaticPaths<PathParams> = () => {
    const entries = getAllEntries();

    return {
      paths: entries.map((entry) => ({ params: { slug: getSlug(entry) } })),
      fallback: false,
    };
  };

  const getStaticProps: GetStaticProps<ContentPageProps<T>, PathParams> = ({
    params,
  }) => {
    const slug = params?.slug;

    if (!slug) {
      return { notFound: true };
    }

    const entries = getAllEntries();
    const entry = entries.find((candidate) => getSlug(candidate) === slug);
    const restEntries = entries.filter(
      (candidate) => getSlug(candidate) !== slug,
    );

    if (!entry) {
      throw new Error(
        `Content entry with slug "${slug}" not found for type "${type}"`,
      );
    }

    return {
      props: {
        entry,
        restEntries,
      },
    };
  };

  return {
    getAllEntries,
    getStaticPaths,
    getStaticProps,
  };
};

export const idiomRegistry = createContentRegistry({
  type: 'idioms',
  schema: IdiomFrontmatterSchema,
  getSlug: (entry) => entry.term,
});
