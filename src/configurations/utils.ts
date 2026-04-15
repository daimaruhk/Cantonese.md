// Server only

import path, { basename } from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import type { ContentType } from './registry';
import type { ContentMetadata } from './types';

// ========== Markdown File Handling ==========

export const getContentTypeDirectory = (contentType: ContentType) =>
  path.join(process.cwd(), 'src', 'contents', contentType);

export const getContentFileNames = (contentType: ContentType) => {
  const directory = getContentTypeDirectory(contentType);

  if (!fs.existsSync(directory)) {
    throw new Error(
      `Content directory for type "${contentType}" not found at "${directory}"`,
    );
  }

  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => basename(name, '.md'));
};

export const getContentFilePath = (
  contentType: ContentType,
  fileName: string,
) => path.join(getContentTypeDirectory(contentType), `${fileName}.md`);

export const readContentFile = (contentType: ContentType, fileName: string) => {
  const path = getContentFilePath(contentType, fileName);

  if (!fs.existsSync(path)) {
    throw new Error(
      `Content file not found for type "${contentType}" and file name "${fileName}" at "${path}"`,
    );
  }

  const fileContents = fs.readFileSync(path, 'utf8');
  const { data: frontmatter, content } = matter(fileContents);

  return {
    frontmatter,
    content,
  };
};

// ========== API File Handling ==========

export const getContentMetadataDirectory = () =>
  path.join(process.cwd(), 'public', 'api');

export const getContentMetadataFilePath = (contentType: ContentType) =>
  path.join(getContentMetadataDirectory(), `${contentType}.json`);

export const getAllMetadata = <T extends ContentType>(contentType: T) => {
  const filePath = getContentMetadataFilePath(contentType);
  const contentMetadataList = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(contentMetadataList) as ContentMetadata<T>[];
};

// ========== Full Content Aggregation ==========

export const getContentData = (contentType: ContentType, fileName: string) => {
  const metadataList = getAllMetadata(contentType);
  const metadata = metadataList.find(
    (metadata) => metadata.fileName === fileName,
  );

  if (!metadata) {
    throw new Error(
      `Metadata entry for "${fileName}" not found in generated API file for "${contentType}"`,
    );
  }

  const { content } = readContentFile(contentType, fileName);

  return {
    ...metadata,
    content,
  };
};
