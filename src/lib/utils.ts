import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth < 768;
};
