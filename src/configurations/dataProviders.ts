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

const cache: { [K in ContentType]: ContentMetadata<K>[] | null } = {
  idioms: null,
};

const createApiForType = <T extends ContentType>(contentType: T) => {
  const getAllMetadata = (): ContentMetadata<T>[] => {
    if (!cache[contentType]) {
      const fileNames = getContentFileNames(contentType);
      const metadataList = fileNames.map((fileName) => {
        const { frontmatter } = readContentFile(contentType, fileName);
        return buildContentMetadata(contentType, frontmatter, fileName);
      });
      cache[contentType] = metadataList;
    }

    return cache[contentType];
  };

  const getContentData = (fileName: string): ContentData<T> => {
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

export const dataProviders: {
  [K in ContentType]: {
    getAllMetadata: () => ContentMetadata<K>[];
    getContentData: (fileName: string) => ContentData<K>;
  };
} = {
  idioms: createApiForType('idioms'),
};

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
