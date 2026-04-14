# Adding a New Content Type

> Step-by-step tutorial for extending the project with a new content type using the extensible registry pattern.

For an overview of the registry architecture, see [Technical Architecture](./architecture.md#data--content-architecture).

## Step 1: Define the Zod Schema

Create a schema file at `src/configurations/schemas/<type>.ts` (using `slangs` as an example):

```ts
import { z } from 'zod';
import { BaseFrontmatterSchema, JyutpingSchema } from './baseSchema';

export const SlangFrontmatterSchema = BaseFrontmatterSchema.extend({
  term: z.string().min(1),
  termJyutping: JyutpingSchema,
  meaning: z.string().min(1),
});

export type SlangFrontmatter = z.infer<typeof SlangFrontmatterSchema>;
```

It is mandatory for all content schemas to extend `BaseFrontmatterSchema`, which automatically provides the `id` field.

## Step 2: Register the Content Type

1. **Update `ContentTypeSchema`:** Append the new type to the enum in `src/configurations/schemas/contentTypeSchema.ts`:

   ```ts
   export const ContentTypeSchema = z.enum(['idioms', 'slangs']);
   ```

2. **Add to `contentRegistry`:** Define the standard label and assign the corresponding schema inside `src/configurations/registry.ts`:

   ```ts
   import { SlangFrontmatterSchema } from './schemas/slangs';

   export const contentRegistry = {
     idioms: {
       /* existing */
     },
     slangs: {
       contentType: 'slangs',
       schema: SlangFrontmatterSchema,
       label: '俗語',
     },
   } as const satisfies { [K in ContentType]: ContentRegistryConfig<K> };
   ```

## Step 3: Implement Providers and Renderers

Integrate the new content type systematically across the application by updating the corresponding configuration files:

1. **`src/configurations/renderers.tsx`**: Add dedicated rendering logic for both content lists (e.g., displaying cards) and individual detail views.
2. **`src/configurations/searchProviders.ts`**: Configure how this content type should be indexed, mapped, and queried through the global search functionality.
3. **`src/configurations/seoProviders.ts`**: Declare specific SEO and metadata logic (e.g., Open Graph attributes) for the new content type routes.
4. **`src/configurations/templateProviders.ts`**: Define the default Markdown template structure, establishing a boilerplate for the content generation script.

## Step 4: Create Data Entries

Utilize the provided CLI tool to create your first piece of content (e.g., `揸流攤`). This will automatically create the `src/contents/slangs` directory if it doesn't already exist and prepopulate the `揸流攤.md` frontmatter from the template provider:

```bash
pnpm gen:content slangs "揸流攤"
```

## Step 5: Validate and Build

Ensure your newly added content and configuration schemas are fully compliant by running the required validation suite:

```bash
pnpm test     # Executes dataset shape validation and unit testing
pnpm lint     # Verifies code quality and styling guidelines
pnpm build    # Validates that the static Next.js production build succeeds
```
