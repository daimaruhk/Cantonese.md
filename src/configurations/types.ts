import type z from 'zod';
import type { ContentRegistry, ContentType } from './registry';

export type Frontmatter<T extends ContentType> = z.infer<
  ContentRegistry[T]['schema']
>;

export type ContentMetadata<T extends ContentType> = Frontmatter<T> & {
  fileName: string;
  contentType: T;
};

export type ContentData<T extends ContentType = ContentType> = GitMetadata &
  ContentMetadata<T> & {
    content: string;
  };

export type GitMetadata = {
  contributors: string[];
  createdAt: string;
  updatedAt: string;
};
