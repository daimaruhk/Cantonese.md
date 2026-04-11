import type z from 'zod';
import { IdiomFrontmatterSchema } from './schemas/idioms';
import { ContentTypeSchema } from './schemas/contentTypeSchema';

export type ContentType = z.infer<typeof ContentTypeSchema>;

export type ContentRegistry = typeof contentRegistry;

type ContentRegistryConfig<T extends ContentType> = {
  contentType: T;
  schema: z.ZodType;
  label: string;
  subtitle: string;
};

export const contentRegistry = {
  idioms: {
    contentType: 'idioms', // This should match the key name and the content directory name
    schema: IdiomFrontmatterSchema,
    label: '歇後語',
    subtitle: '細味歇後語，領略粵語嘅智慧同幽默。',
  },
} as const satisfies { [K in ContentType]: ContentRegistryConfig<K> };
