// Server only

import { z } from 'zod';
import { contentRegistry, type ContentType } from './registry';
import type { ContentMetadata, ContentData } from './types';
import {
  getContentFileNames,
  readContentFile,
  getGitMetadata,
  getContentFilePath,
} from './utils';

type DataProvider<T extends ContentType> = {
  getAllMetadata: () => ContentMetadata<T>[];
  getContentData: (fileName: string) => ContentData<T>;
};

type DataProviders = {
  [K in ContentType]: DataProvider<K>;
};

const cache: { [K in ContentType]: ContentMetadata<K>[] | null } = {
  idioms: null,
};

const createApiForType = <T extends ContentType>(
  contentType: T,
): DataProvider<T> => {
  const getAllMetadata = () => {
    if (cache[contentType]) {
      return cache[contentType];
    }

    const fileNames = getContentFileNames(contentType);
    const metadataList = fileNames.map((fileName) => {
      const { frontmatter } = readContentFile(contentType, fileName);
      return buildContentMetadata(contentType, frontmatter, fileName);
    });
    cache[contentType] = metadataList;
    return metadataList;
  };

  const getContentData = (fileName: string) => {
    const { frontmatter, content } = readContentFile(contentType, fileName);
    const contentMetadata = buildContentMetadata(
      contentType,
      frontmatter,
      fileName,
    );
    const gitMetadata = getGitMetadata(contentType, fileName);

    return {
      ...contentMetadata,
      ...gitMetadata,
      content,
    };
  };

  return { getAllMetadata, getContentData };
};

export const dataProviders = Object.values(contentRegistry).reduce(
  (providers, config) => {
    providers[config.contentType] = createApiForType(config.contentType);
    return providers;
  },
  {} as DataProviders,
);

const buildContentMetadata = <T extends ContentType>(
  contentType: T,
  frontmatter: unknown,
  fileName: string,
): ContentMetadata<T> => {
  const schema = contentRegistry[contentType].schema;
  const validationResult = schema.safeParse(frontmatter);

  if (!validationResult.success) {
    const filePath = getContentFilePath(contentType, fileName);
    throw new Error(
      `Invalid frontmatter in "${filePath}": ${z.prettifyError(validationResult.error)}`,
    );
  }

  // Cast since we know we are returning ContentMetadata<T> which intersects with ContentType / fileName
  return {
    ...validationResult.data,
    contentType: contentType,
    fileName,
  } as ContentMetadata<T>;
};
