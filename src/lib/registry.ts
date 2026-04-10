import path from 'node:path';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { z } from 'zod';
import { IdiomFrontmatterSchema } from '@/schema/idioms';
import {
  getGitMetadata,
  getMarkdownFilePath,
  getMarkdownFilePaths,
  readContentFile,
  type Frontmatter,
  type GitMetadata,
} from './content';

export type ContentType = 'idioms';

export type ContentData<T extends Frontmatter> = T &
  GitMetadata & {
    content: string;
  };

type PathParams = { slug: string };

export type ContentPageProps<T extends Frontmatter> = {
  entry: ContentData<T>;
};

type ContentRegistryConfig<T extends Frontmatter> = {
  type: ContentType;
  schema: z.ZodType<T>;
};

export type ContentRegistry<T extends Frontmatter> = {
  getAllFrontmatter: () => T[];
  getStaticPaths: GetStaticPaths<PathParams>;
  getStaticProps: GetStaticProps<ContentPageProps<T>, PathParams>;
};

export const createContentRegistry = <T extends Frontmatter>({
  type,
  schema,
}: ContentRegistryConfig<T>): ContentRegistry<T> => {
  const validateFrontmatter = (frontmatter: unknown, filePath: string) => {
    const validationResult = schema.safeParse(frontmatter);

    if (!validationResult.success) {
      throw new Error(
        `Invalid frontmatter in "${filePath}": ${z.prettifyError(validationResult.error)}`,
      );
    }

    return validationResult.data;
  };

  const getAllFrontmatter = () => {
    const filePaths = getMarkdownFilePaths(type);
    return filePaths.map((filePath) => {
      const { frontmatter } = readContentFile(filePath);
      return validateFrontmatter(frontmatter, filePath);
    });
  };

  const getFullEntry = (fileName: string) => {
    const filePath = getMarkdownFilePath(type, fileName);
    const { frontmatter, content } = readContentFile(filePath);
    const validatedFrontmatter = validateFrontmatter(frontmatter, filePath);
    const gitMetadata = getGitMetadata(filePath);

    return {
      ...validatedFrontmatter,
      ...gitMetadata,
      content,
    };
  };

  const getStaticPaths: GetStaticPaths<PathParams> = () => {
    const filePaths = getMarkdownFilePaths(type);

    return {
      paths: filePaths.map((filePath) => ({
        params: { slug: path.basename(filePath, '.md') },
      })),
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

    const entry = getFullEntry(slug);

    return {
      props: {
        entry,
      },
    };
  };

  return {
    getAllFrontmatter,
    getStaticPaths,
    getStaticProps,
  };
};

export const idiomRegistry = createContentRegistry({
  type: 'idioms',
  schema: IdiomFrontmatterSchema,
});
