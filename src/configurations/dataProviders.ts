// Server only

import { z } from 'zod';
import { contentRegistry, type ContentType } from './registry';
import type { ContentMetadata, ContentData, Frontmatter } from './types';
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

const createApiForType = <T extends ContentType>(
  contentType: T,
): DataProvider<T> => {
  const getAllMetadata = () => {
    const fileNames = getContentFileNames(contentType);
    const metadataList = fileNames.map((fileName) => {
      const { frontmatter } = readContentFile(contentType, fileName);
      return buildContentMetadata(contentType, frontmatter, fileName);
    });
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

export const dataProviders = Object.fromEntries(
  Object.values(contentRegistry).map((config) => [
    config.contentType,
    createApiForType(config.contentType),
  ]),
) as DataProviders;

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
    ...(validationResult.data as Frontmatter<T>),
    contentType: contentType,
    fileName,
  };
};
