# Development Guide

> Single source of truth for local setup, build commands, and developer tooling.

## Requirements

- **Node.js:** `24.x`
- **pnpm:** `10.x`

## Local Setup

1. **Fork and Clone:** Fork the repository and clone it to your local machine.

   ```bash
   git clone https://github.com/daimaruhk/Cantonese.md.git
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Start Development Server:**

   ```bash
   pnpm dev
   ```

   The site will be available at `http://localhost:3000`.

## Build and Test Commands

| Command                              | Description                                                           |
| :----------------------------------- | :-------------------------------------------------------------------- |
| `pnpm dev`                           | Start development server at `http://localhost:3000`                   |
| `pnpm build`                         | Build the static export into `out/`                                   |
| `pnpm lint`                          | Run ESLint to check for code quality issues                           |
| `pnpm format`                        | Run Prettier to format the codebase                                   |
| `pnpm test`                          | Run the test suite using Vitest                                       |
| `pnpm gen:content <type> <fileName>` | Create a new entry template                                           |
| `pnpm gen:api`                       | Generate API files to `public/api/`                                   |
| `pnpm gen:staticFiles`               | Generate static files to `public/`, include sitemap.xml and \_headers |

## Validation Checklist

Before marking a task as complete or submitting a PR, ensure the following status checks pass:

```bash
pnpm test     # Ensure unit tests and data validation pass
pnpm lint     # Ensure code quality standards are met
pnpm format   # Ensure consistent code formatting
pnpm build    # Ensure the static build succeeds without errors
```
