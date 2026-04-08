# AGENTS.md

## Project Architecture

### Core Technologies

- **Runtime**: Node 24
- **Package Manager**: pnpm 10
- **UI Framework**: Next.js 16 (Page Router SSG), React 19, TypeScript 5, Tailwind CSS 4, Shadcn UI (using **Base UI** primitives and **Tabler** icons)
- **Validation**: Zod for both runtime and build-time content validation
- **Testing**: Vitest for unit and integration testing

## Folder Structure

```text
src/
├── components/   # UI components
│   ├── features/ # Feature-specific components (e.g., IdiomCard)
│   └── ui/       # Core UI primitives (mostly from Shadcn)
├── contents/     # Primary data storage (Markdown files with frontmatter)
├── lib/          # Shared utilities, hooks, and data-fetching logic
├── pages/        # Next.js routes using the Page Router (SSG)
├── schema/       # Zod data validation schemas (ensures data integrity)
├── styles/       # Global CSS and Tailwind 4 configuration
└── tests/        # Comprehensive testing suite (Vitest)
scripts/          # Developer tooling (e.g., idiom generator)
```

## Data & Content

The project's primary data resides in `src/contents/<type>`. Each entry is stored as a `.md` file with structured frontmatter.

- **Schema**: All content types must follow the schema defined in `src/schema/<type>.ts`.
- **Validation**: Build-time tests in `src/tests/contents/<type>.test.ts` ensure all content files are valid, unique, and well-formed.
- **Management**: Use `pnpm gen:<type> <term>` to create new entries using the standard template.

## Build and Test Commands

Perform these actions using `pnpm`:

- `pnpm dev`: Start development server at `http://localhost:3000`
- `pnpm build`: Generate static production build into `out/`
- `pnpm lint`: Run ESLint checks
- `pnpm format`: Format code with Prettier
- `pnpm test`: Execute Vitest suites (includes content validation)
- `pnpm gen:<type> <term>`: Create a new entry template

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
