# Contributing to Cantonese.md

First off, thank you for considering contributing to **Cantonese.md**! We welcome everyone who wants to help preserve and promote Cantonese language and culture.

The following is a set of guidelines for contributing to Cantonese.md. These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Improving Cantonese Library](#improving-cantonese-library)
  - [Writing Code](#writing-code)
  - [Reporting Bugs](#reporting-bugs)
  - [Requesting Features](#requesting-features)
- [Project Structure](#project-structure)
- [Local Development Setup](#local-development-setup)
- [Adding a New Content Type](#adding-a-new-content-type)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
  - [Commit Messages](#commit-messages)
  - [Import Order](#import-order)

---

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Improving Cantonese Library

#### Adding New Content

You can add new Cantonese idioms (歇後語) using the generation script:

1. Run the script with the idiom term:
   ```bash
   pnpm run gen:idiom "賣魚佬沖涼"
   ```
2. This creates a new file in `src/contents/idioms/賣魚佬沖涼.md`.
3. Fill in the required frontmatter and the Markdown body.

#### Improving Existing Content

Feel free to edit any Markdown file in `src/contents/` for typos, grammatical errors, missing details, or incorrect information. Please ensure:

- The Jyutping follows the standard format: lowercase syllables followed by tone numbers 1-6.
- Do not use anything other than Jyutping, such as Yale or other romanization systems.
- The `id` in the frontmatter remains untouched.

### Writing Code

Bug fixes, new features, UI/UX improvements, tooling updates, and documentation improvements are all welcome. Refer to [Style Guidelines](#style-guidelines) for more information.

### Reporting Bugs

If you find a bug, please check the existing issues first. If you do need to create one, please use the [bug report template](https://github.com/daimaruhk/Cantonese.md/issues/new?template=bug_report.md).

### Requesting Features

Before creating a feature request, check the existing issues first. If you do need to create one, please use the [feature request template](https://github.com/daimaruhk/Cantonese.md/issues/new?template=feature_request.md).

## Project Structure

```text
src/
├── components/      # UI components
│   ├── features/    # Feature-specific components (e.g., IdiomCard)
│   └── ui/          # Core UI primitives (mostly from Shadcn)
├── configurations/  # Content type registry, schemas, data providers, renderers, and route handlers
│   └── schemas/     # Zod validation schemas for each content type
├── contents/        # Primary data storage (Markdown files with frontmatter)
├── hooks/           # Custom React hooks (e.g., useSearch, useQuery wrappers)
├── lib/             # Shared utilities (cn, URL helpers, api fetchers)
├── pages/           # Next.js routes using the Page Router (SSG)
├── scripts/         # Developer tooling (e.g., content generator, API generator)
├── styles/          # Global CSS and Tailwind 4 configuration
└── tests/           # Comprehensive testing suite (Vitest)
```

### Dependencies

1. **Next.js Page Router**: Intentionally using Page Router SSG because the entire website is designed to be static.
2. **Tailwind**: Leveraging the latest utility-first CSS framework.
3. **Shadcn with Base UI**: If you need new components, please refer to [Shadcn UI](https://ui.shadcn.com/). We use **Base UI** instead of Radix for its superior flexibility and active maintenance.
4. **TanStack Query**: For data fetching and state management.
5. **Vitest**: Our primary testing framework for unit and content validation.

## Local Development Setup

### Requirements

- **Node.js:** `24.x`
- **pnpm:** `10.x`

### Steps

1. **Fork and Clone:** Fork the repository and clone it to your local machine.
2. **Install Dependencies:**
   ```bash
   pnpm install
   ```
3. **Start Development Server:**
   ```bash
   pnpm dev
   ```
   The site will be available at `http://localhost:3000`.

### Other Commands

| Command                              | Description                                 |
| :----------------------------------- | :------------------------------------------ |
| `pnpm build`                         | Build the static export into `out/`         |
| `pnpm lint`                          | Run ESLint to check for code quality issues |
| `pnpm format`                        | Run Prettier to format the codebase         |
| `pnpm test`                          | Run the test suite using Vitest             |
| `pnpm gen:content <type> <fileName>` | Create a new entry template                 |
| `pnpm gen:api`                       | Generate API files to `public/api/`         |

## Adding a New Content Type

This project leverages an extensible registry pattern for managing content. All centralized configurations for different content types reside in the `src/configurations/` directory.

Follow these steps to incorporate a new content type (using `slangs` as an example):

### Step 1: Define the Zod Schema

Create a schema file at `src/configurations/schemas/slangs.ts`:

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

### Step 2: Register the Content Type

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

### Step 3: Implement Providers and Renderers

Integrate the new content type systematically across the application by updating the corresponding configuration files:

1. **`src/configurations/renderers.tsx`**: Add dedicated rendering logic for both content lists (e.g., displaying cards) and individual detail views.
2. **`src/configurations/searchProviders.ts`**: Configure how this content type should be indexed, mapped, and queried through the global search functionality.
3. **`src/configurations/seoProviders.ts`**: Declare specific SEO and metadata logic (e.g., Open Graph attributes) for the new content type routes.
4. **`src/configurations/templateProviders.ts`**: Define the default Markdown template structure, establishing a boilerplate for the content generation script.

### Step 4: Create Data Entries

Utilize the provided CLI tool to create your first piece of content (e.g., `揸流攤`). This will automatically create the `src/contents/slangs` directory if it doesn't already exist and prepopulate the `揸流攤.md` frontmatter from the template provider:

```bash
pnpm gen:content slangs "揸流攤"
```

### Step 5: Validate and Build

Ensure your newly added content and configuration schemas are fully compliant by running the required validation suite:

```bash
pnpm test     # Executes dataset shape validation and unit testing
pnpm lint     # Verifies code quality and styling guidelines
pnpm build    # Validates that the static Next.js production build succeeds
```

## Pull Request Process

1. **Branch:** Create a new branch from `main` (for example, `feat/new-idiom` or `fix/typo`).
2. **Develop:** Make your changes and ensure they follow the project standards.
3. **Tests:** Add new tests if necessary.
4. **Quality Check**: Run `pnpm test`, `pnpm lint`, and `pnpm format` to ensure the code is production-ready.
5. **Commit:** Follow the [Commit Styleguide](#commit-messages).
6. **Push & PR:** Push to your fork and submit a Pull Request to the upstream `main` branch.
7. **Review:** Wait for maintainer review and address any feedback.

## Code Style Guidelines

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This helps us maintain a clean Git history.

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

Example:

```bash
feat: add idiom recommendation section to detail page
fix: resolve jyutping regex failing on single character terms
```

### Import Order

Group import statements in the following order:

1. Node.js Built-ins: `fs`, `path`, `process`, etc.
2. External Packages: `react`, `zod`, etc.
3. Internal Alias: `@/components`, `@/lib`, `@/schema`, etc.
4. Relative Imports: `./`, `..`, etc.
5. Side Effects: `"@/styles/globals.css"`
