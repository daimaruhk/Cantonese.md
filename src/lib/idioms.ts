import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';

import { type IdiomData, IdiomSchema } from '@/schema/idioms';

export const idiomsDirectory = path.join(process.cwd(), 'src/contents/idioms');

export const getAllIdioms = () => {
  const filenames = fs.readdirSync(idiomsDirectory);

  return filenames
    .filter((name) => name.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(idiomsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContents);
      return IdiomSchema.parse(data);
    });
};

export const getIdiomDataByTerm = (term: string) => {
  const filePath = path.join(idiomsDirectory, `${term}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Idiom with term "${term}" not found`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);
  const frontmatter = IdiomSchema.parse(data);
  const contributionHistory = getContributionHistory(filePath);

  return {
    ...frontmatter,
    ...contributionHistory,
    content,
  } as IdiomData;
};

const getContributionHistory = (filePath: string) => {
  const authorsStr = execSync(
    `git log --format="%aN" -- "${filePath}"`,
  ).toString();
  const authors = authorsStr.split('\n').filter(Boolean);
  const uniqueContributors = Array.from(new Set(authors));

  const datesStr = execSync(
    `git log --format="%as" -- "${filePath}"`,
  ).toString();
  const dates = datesStr.split('\n').filter(Boolean);

  if (uniqueContributors.length === 0 || dates.length === 0) {
    throw new Error(`No git metadata found for idiom "${filePath}"`);
  }

  const updatedAt = dates[0]; // Newest commit
  const createdAt = dates[dates.length - 1]; // Oldest commit

  return {
    contributors: uniqueContributors,
    createdAt,
    updatedAt,
  };
};
