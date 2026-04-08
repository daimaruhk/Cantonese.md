import { execFileSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';

export type Frontmatter = Record<string, unknown>;

export type GitMetadata = {
  contributors: string[];
  createdAt: string;
  updatedAt: string;
};

const getContentDirectory = (type: string) =>
  path.join(process.cwd(), 'src/contents', type);

export const getMarkdownFilePaths = (type: string) => {
  const directory = getContentDirectory(type);

  if (!fs.existsSync(directory)) {
    throw new Error(
      `Content directory for type "${type}" not found at "${directory}"`,
    );
  }

  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(directory, name));
};

export const readContentFile = (filePath: string) => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContents);

  return {
    frontmatter,
    content,
  };
};

export const getGitMetadata = (filePath: string): GitMetadata => {
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
        cause: error instanceof Error ? error : undefined,
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
