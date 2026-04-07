/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
};

export const Image = ({ alt, ...rest }: ImageProps) => {
  // Allow future optimization
  return <img alt={alt} {...rest} />;
};
