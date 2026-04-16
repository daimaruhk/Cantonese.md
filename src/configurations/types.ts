import type z from 'zod';
import type { ContentRegistry, ContentType } from './registry';

export type Frontmatter<T extends ContentType> = z.infer<
  ContentRegistry[T]['schema']
>;

export type GitMetadata = {
  contributors: string[];
  createdAt: string;
  updatedAt: string;
};

export type SearchMetadata = {
  searchText: string;
  searchJyutping: string;
};

export type ContentMetadata<T extends ContentType> = Frontmatter<T> &
  GitMetadata &
  SearchMetadata & {
    fileName: string;
    contentType: T;
  };

export type ContentData<T extends ContentType = ContentType> =
  ContentMetadata<T> & {
    content: string;
  };
