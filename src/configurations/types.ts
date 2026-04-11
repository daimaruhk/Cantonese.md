import type z from 'zod';
import type { ContentRegistry, ContentType } from './registry';

export type ContentMetadata<T extends ContentType> = z.infer<
  ContentRegistry[T]['schema']
> & {
  fileName: string;
  contentType: T;
};

export type ContentData<T extends ContentType> = GitMetadata &
  ContentMetadata<T> & {
    content: string;
  };

export type GitMetadata = {
  contributors: string[];
  createdAt: string;
  updatedAt: string;
};

export type SearchEntry = {
  id: string;
  searchText: string;
  searchJyutping: string;
  path: string;
} & {
  contentType: 'idioms';
  entry: ContentMetadata<'idioms'>;
};
