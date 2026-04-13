import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ContentType } from '@/configurations/registry';
import { homepage } from '../../package.json';

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

export const getShareUrl = (contentType: ContentType, fileName: string) =>
  `${window.location.origin}/${contentType}/${fileName}`;

export const getGithubProfileUrl = (username: string) =>
  `https://github.com/${username}`;

export const getGithubProfilePicUrl = (username: string) =>
  `https://github.com/${username}.png?size=32`;

export const normalize = (text: string) => text.trim().toLowerCase();

export const normalizeUrl = (path?: string) => {
  const url = `https://cantonese.md/`;

  if (!path || path === '/') {
    return url;
  }

  path = path.startsWith('/') ? path.slice(1) : path; // remove leading slash
  path = path.endsWith('/') ? path.slice(0, -1) : path; // remove trailing slash

  return `${url}${path}/`;
};
