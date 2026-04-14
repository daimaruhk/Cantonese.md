# Code Style Guide

> Single source of truth for coding conventions, naming rules, import order, and commit message format.

## Component Development

- **Primitive Components**: Always check for or add new primitives to `src/components/ui/` using Shadcn first.
- **Naming**: Use PascalCase for components and camelCase for functions/variables.
- **Styling**: Prefer Tailwind classes. Use `cn()` utility from `@/lib/utils` for conditional classes.
- **Arrow Functions**: Always use arrow functions for component definitions and utility functions, except for Next.js pages.

## Import Conventions

Use the `@/` alias for the `src/` directory. Group import statements in the following order:

1. **Node.js Built-ins:** `fs`, `path`, `process`, etc.
2. **External Packages:** `react`, `zod`, etc.
3. **Internal Alias:** `@/components`, `@/lib`, `@/schema`, etc.
4. **Relative Imports:** `./`, `..`, etc.
5. **Side Effects:** `"@/styles/globals.css"`

## Exports

- Use **default exports** for Next.js pages in `src/pages/`.
- Use **named exports** for all other components, hooks, and utilities.

## Jyutping Format

- Use **Jyutping only** — do not use Yale or other romanization systems.
- Format: lowercase syllables followed by tone numbers 1–6, separated by spaces (e.g., `jat1 go3 syun1 mui4`).

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This helps us maintain a clean Git history.

| Prefix     | Purpose                                                               |
| :--------- | :-------------------------------------------------------------------- |
| `feat`     | A new feature                                                         |
| `fix`      | A bug fix                                                             |
| `docs`     | Documentation only changes                                            |
| `style`    | Changes that do not affect the meaning of the code (formatting, etc.) |
| `refactor` | A code change that neither fixes a bug nor adds a feature             |
| `perf`     | A code change that improves performance                               |
| `test`     | Adding missing tests or correcting existing tests                     |
| `chore`    | Changes to the build process or auxiliary tools and libraries         |

### Examples

```bash
feat: add idiom recommendation section to detail page
fix: resolve jyutping regex failing on single character terms
```
