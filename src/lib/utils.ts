import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { homepage } from '../../package.json';
import type { ContentType } from '@/configurations/registry';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth < 768;
};

export const getGithubHomepageUrl = () => homepage;

export const getGithubMarkdownUrl = (
  contentType: ContentType,
  fileName: string,
) =>
  `${homepage}/blob/main/src/contents/${contentType}/${encodeURIComponent(
    fileName,
  )}.md`;
