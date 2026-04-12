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
  listPageSubtitle: string;
  contentGridSubtitle: string;
};

export const contentRegistry = {
  idioms: {
    contentType: 'idioms', // This should match the key name and the content directory name
    schema: IdiomFrontmatterSchema,
    label: '歇後語',
    listPageSubtitle:
      '歇後語係粵語文化中極具智慧且風趣嘅表達方式，結構上分為「謎面」同「謎底」兩部分。謎面一般係比喻或情境描述，而謎底先係真正含意，通常交俾對方自己領悟。歇後語大致可以分為兩大類：一種係邏輯型，謎底係由謎面推理出嚟；另一種係諧音型，謎底加入咗諧音要素。歇後語同時具備好強嘅時代性同地域性，我哋可以從中窺探唔同年代、唔同地方嘅社會文化同民間智慧。',
    contentGridSubtitle: '細味歇後語，領略粵語嘅智慧同幽默。',
  },
} as const satisfies { [K in ContentType]: ContentRegistryConfig<K> };

export const contentTypes = Object.values(contentRegistry).map(
  (config) => config.contentType,
);
