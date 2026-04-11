import type { ContentType } from '@/configurations/registry';
import type { ContentMetadata } from '@/configurations/types';

export const fetchContentMetadata = async <T extends ContentType>(
  contentType: T,
) => {
  try {
    const response = await fetch(`/api/${contentType}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${contentType} metadata`);
    }
    // We can safely cast because the api is generated in build time with thorough testing.
    return response.json() as Promise<ContentMetadata<T>[]>;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown error occurred while fetching content metadata', {
          cause: error,
        });
  }
};
