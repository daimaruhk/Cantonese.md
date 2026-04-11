// Server only

import { execFileSync } from 'node:child_process';
import path, { basename } from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import type { GitMetadata } from './types';
import type { ContentType } from './registry';

const getContentTypeDirectory = (contentType: ContentType) =>
  path.join(process.cwd(), 'src', 'contents', contentType);

export const getContentFilePath = (
  contentType: ContentType,
  fileName: string,
) => path.join(getContentTypeDirectory(contentType), `${fileName}.md`);

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

export const getGitMetadata = (
  contentType: ContentType,
  fileName: string,
): GitMetadata => {
  const filePath = getContentFilePath(contentType, fileName);

  const runGitLog = (format: string) => {
    try {
      return execFileSync(
        'git',
        ['log', `--format=${format}`, '--', filePath],
        {
          cwd: process.cwd(),
          encoding: 'utf8',
        },
      );
    } catch (error) {
      throw new Error(`Unable to retrieve git metadata for "${filePath}"`, {
        cause: error,
      });
    }
  };

  const contributors = Array.from(
    new Set(runGitLog('%aN').split('\n').filter(Boolean)),
  );
  const dates = runGitLog('%as').split('\n').filter(Boolean);

  if (contributors.length === 0 || dates.length === 0) {
    // When the file is not committed yet, use a fallback metadata.
    const today = new Date().toISOString().slice(0, 10);
    return {
      contributors: ['Development'],
      createdAt: today,
      updatedAt: today,
    };
  }

  return {
    contributors,
    createdAt: dates[dates.length - 1] ?? '',
    updatedAt: dates[0] ?? '',
  };
};
