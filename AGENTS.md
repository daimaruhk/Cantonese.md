# AGENTS.md

## Project Architecture

### Core Technologies

- **Runtime**: Node 24
- **Package Manager**: pnpm 10
- **UI Framework**: Next.js 16 (Page Router SSG), React 19, TypeScript 5, Tailwind CSS 4, Shadcn UI (using **Base UI** primitives and **Tabler** icons)
- **Validation**: Zod for both runtime and build-time content validation
- **Data Fetching**: TanStack Query for data fetching and state management
- **Testing**: Vitest for unit and integration testing

## Folder Structure

```text
src/
├── components/      # UI components
│   ├── features/    # Feature-specific components (e.g., IdiomCard, ContentGrid)
│   └── ui/          # Core UI primitives (mostly from Shadcn)
├── configurations/  # Content type registry, data providers, route handlers, renderers
│   └── schemas/     # Zod validation schemas (base + per content type)
├── contents/        # Primary data storage (Markdown files with frontmatter)
├── hooks/           # Custom React hooks (e.g., useSearch, useContentMetadataQuery)
├── lib/             # Shared utilities (cn, URL helpers, api fetchers)
├── pages/           # Next.js routes using the Page Router (SSG)
├── scripts/         # Developer tooling (e.g., content generator, API generator)
├── styles/          # Global CSS and Tailwind 4 configuration
└── tests/           # Comprehensive testing suite (Vitest)
```

## Data & Content Architecture

The project leverages an extensible registry pattern for content management. Primary data is organized into directories at `src/contents/<type>`, where each entry is stored as a markdown (`.md`) file containing strictly typed frontmatter.

- **Registry (`src/configurations/registry.ts`)**: The central configuration hub that maps each registered content type to its respective Zod schema, rendering labels, and configuration metadata.
- **Schemas (`src/configurations/schemas/`)**: Defines the strict frontmatter shape for each content type. All schemas **must** extend `BaseFrontmatterSchema` to ensure core fields like `id` are consistently present.
- **Data Providers (`src/configurations/dataProviders.ts`)**: Centralizes the data-fetching architecture by exposing type-safe `getAllMetadata()` and `getContentData()` utilities.
- **Route Handlers (`src/configurations/routeHandlers.ts`)**: Manages Next.js SSG requirements by providing modular `getStaticPaths` and `getStaticProps` generators for dynamic content routes.
- **Renderers (`src/configurations/renderers.tsx`)**: Injects content-specific UI components (e.g., standard cards, search result items) for both aggregate and detailed views.
- **Validation (`src/tests/contents.test.ts`)**: A comprehensive build-time test suite that guarantees all markdown files are well-formed, strictly adhere to their assigned schemas, and are free of ID collisions.
- **Management**: A developer CLI tool (`pnpm gen:content <type> <term>`) that automates the generation of compliant `.md` files using predefined template providers.

## Build and Test Commands

Perform these actions using `pnpm`:

- `pnpm dev`: Start development server at `http://localhost:3000`
- `pnpm build`: Generate static production build into `out/`
- `pnpm lint`: Run ESLint checks
- `pnpm format`: Format code with Prettier
- `pnpm test`: Execute Vitest suites (includes content validation)
- `pnpm gen:content <type> <term>`: Create a new entry template
- `pnpm gen:api`: Generate API files to `public/api/`

## Code Style Guidelines

### Component Development

- **Primitive Components**: Always check for or add new primitives to `src/components/ui/` using Shadcn first.
- **Naming**: Use PascalCase for components and camelCase for functions/variables.
- **Styling**: Prefer Tailwind classes. Use `cn()` utility from `@/lib/utils` for conditional classes.
- **Arrow Functions**: Always use arrow functions for component definitions and utility functions, except for Next.js pages.

### Import Conventions

- Use the `@/` alias for `src/` directory.
- Group imports:
  1. Node.js built-ins
  2. External dependencies
  3. Internal aliased imports (`@/`)
  4. Relative internal imports

### Exports

- Use **default exports** for Next.js pages in `src/pages/`.
- Use **named exports** for all other components, hooks, and utilities.

## Validation Checklist

Before marking a task as complete or submitting a PR, ensure the following status checks pass:

```bash
pnpm test     # Ensure unit tests and data validation pass
pnpm lint     # Ensure code quality standards are met
pnpm format   # Ensure consistent code formatting
pnpm build    # Ensure the static build succeeds without errors
```

## Boundaries

- **Never:** Edit `node_modules/`
- **Always:** prioritize human readability and reviewability
