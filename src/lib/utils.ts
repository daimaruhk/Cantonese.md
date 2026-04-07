import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { homepage } from '../../package.json';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth < 768;
};

export const getGithubHomepageUrl = () => homepage;

export const getGithubMarkdownUrl = (name: string) =>
  `${homepage}/blob/main/src/contents/idioms/${encodeURIComponent(name)}.md`;
