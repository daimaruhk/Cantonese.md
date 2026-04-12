import type z from 'zod';
import { IdiomFrontmatterSchema } from './schemas/idioms';
import { ContentTypeSchema } from './schemas/contentTypeSchema';

export type ContentType = z.infer<typeof ContentTypeSchema>;

// `typeof contentRegistry` gives us a strongly typed object that maps each ContentType to its configuration.
// The `satisfies` keyword ensures that the `contentRegistry` object has the correct shape.
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
