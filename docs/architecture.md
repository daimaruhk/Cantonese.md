# Technical Architecture

> Single source of truth for the project's technology stack, folder structure, and data architecture.

## Core Technologies

- **Runtime**: Node 24
- **Package Manager**: pnpm 10
- **UI Framework**: Next.js 16 (Page Router SSG), React 19, TypeScript 5, Tailwind CSS 4, Shadcn UI (using **Base UI** primitives and **Tabler** icons)
- **Validation**: Zod for both runtime and build-time content validation
- **Data Fetching**: TanStack Query 5 for data fetching and state management
- **Testing**: Vitest for unit and integration testing

### Key Dependency Decisions

1. **Next.js Page Router**: Intentionally using Page Router SSG because the entire website is designed to be static.
2. **Shadcn with Base UI**: We use **Base UI** instead of Radix for its superior flexibility and active maintenance. If you need new components, please refer to [Shadcn UI](https://ui.shadcn.com/).

## Folder Structure

```text
src/
├── components/      # UI components
│   ├── features/    # Feature-specific components (e.g., IdiomCard, ContentGrid, SearchModal)
│   └── ui/          # Core UI primitives (mostly from Shadcn)
├── configurations/  # Content type registry, data providers, route handlers, renderers
│   └── schemas/     # Zod validation schemas (base + per content type)
├── contents/        # Primary data storage (Markdown files with frontmatter)
├── hooks/           # Custom React hooks (e.g., useSearch, useQuery)
├── lib/             # Shared utilities (cn, URL helpers, api fetchers)
├── pages/           # Next.js routes using the Page Router (SSG)
├── scripts/         # Developer tooling (e.g., content generator, API generator)
├── styles/          # Global CSS and Tailwind 4 configuration
└── tests/           # Comprehensive testing suite
```

## Data & Content Architecture

The project leverages an extensible registry pattern for content management. Primary data is organized into directories at `src/contents/<type>`, where each entry is stored as a markdown (`.md`) file containing strictly typed frontmatter.

- **Registry (`src/configurations/registry.ts`)**: The central configuration hub that maps each registered content type to its respective Zod schema, rendering labels, and configuration metadata.
- **Schemas (`src/configurations/schemas/`)**: Defines the strict frontmatter shape for each content type. All schemas **must** extend `BaseFrontmatterSchema` to ensure core fields like `id` are consistently present.
- **Data Providers (`src/configurations/dataProviders.ts`)**: Centralizes the data-fetching architecture by exposing type-safe `getAllMetadata()` and `getContentData()` utilities.
- **Route Handlers (`src/configurations/routeHandlers.ts`)**: Manages Next.js SSG requirements by providing modular `getStaticPaths` and `getStaticProps` generators for dynamic content routes.
- **Renderers (`src/configurations/renderers.tsx`)**: Injects content-specific UI components (e.g., standard cards, search result items) for both aggregate and detailed views.
- **Search Providers (`src/configurations/searchProviders.ts`)**: Transforms content metadata into `SearchEntry` objects for the global search, mapping each entry's text and Jyutping into searchable fields.
- **SEO Providers (`src/configurations/seoProviders.ts`)**: Declares per-content-type SEO metadata (title, description, canonical URL, Open Graph, JSON-LD) for both list and detail pages.
- **Template Providers (`src/configurations/templateProviders.ts`)**: Defines the default frontmatter skeleton for each content type, used by the `pnpm gen:content` CLI to scaffold new `.md` files with a random `id`.
- **Validation (`src/tests/contents.test.ts`)**: A comprehensive build-time test suite that guarantees all markdown files are well-formed, strictly adhere to their assigned schemas, and are free of ID collisions.
- **Management**: A developer CLI tool (`pnpm gen:content <type> <term>`) that automates the generation of compliant `.md` files using predefined template providers.

### Routing

Content routes are fully dynamic and statically generated at build time. Any markdown file at `src/contents/<type>/<fileName>.md` is automatically rendered at the `/<type>/<fileName>` URL path. No manual route registration is required — the route handlers derive all paths from the content registry.

### Content Entry Format

Every entry in `src/contents/` is a Markdown file. A typical entry looks like this:

```markdown
---
id: iRNL7TmVZbOW
term: 阿茂整餅
termJyutping: aa3 mau6 zing2 beng2
answer: 冇嗰樣整嗰樣
answerJyutping: mou5 go2 joeng6 zing2 go2 joeng6
---

# 阿茂整餅──冇嗰樣整嗰樣

## 字面意思

相傳以前廣州有位出色嘅做餅師傅叫「阿茂」...
```
