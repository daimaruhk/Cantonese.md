# Contributing to Cantonese.md

First off, thank you for considering contributing to **Cantonese.md**! We welcome everyone to help preserve and promote Cantonese culture.

The following is a set of guidelines for contributing to Cantonese.md. These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Improving Cantonese Library](#improving-cantonese-library)
  - [Reporting Bugs](#reporting-bugs)
  - [Requesting Features](#requesting-features)
  - [Writing Code](#writing-code)
- [Project Structure](#project-structure)
- [Local Development Setup](#local-development-setup)
- [Pull Request Process](#pull-request-process)
- [Commit Styleguide](#commit-styleguide)

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
3. Fill in the required frontmatter and the markdown body.

#### Improving Existing Content

Feel free to edit any markdown file in `src/contents/idioms/` for typos, grammatical errors, missing or incorrect information. Please ensure:

- The Jyutping follows the standard format (lowercase syllables followed by tone numbers 1-6).
- Do not use anything other than Jyutping, such as Yale or other romanization systems.
- The `id` in the frontmatter remains untouched.

### Writing Code

Bug fixes, new features, UI/UX improvements, etc. are all welcome.

### Reporting Bugs

If you find a bug, please check the existing issues as you might find out that you don't need to create one. If you do need to create one, please use the [bug report template](https://github.com/daimaruhk/Cantonese.md/issues/new?template=bug_report.md).

### Requesting Features

Before creating a feature request, check the existing issues. If you do need to create one, please use the [feature request template](https://github.com/daimaruhk/Cantonese.md/issues/new?template=feature_request.md).

## Project Structure

```text
src/
├── components/   # Reusable UI components
│   ├── features/ # Feature-specific components
│   └── ui/       # Core UI primitives
├── contents/     # Markdown-based content
├── lib/          # Shared utilities and logic
├── pages/        # Next.js routes (Page Router)
├── schema/       # Zod data validation schemas
├── styles/       # Global CSS (Tailwind 4)
└── tests/        # Testing suite (Vitest)
scripts/          # Developer tooling and automation
```

### Dependencies

1. **Next.js Page Router**: Intentionally using Page Router SSG because the entire website is designed to be static.
2. **Tailwind**: Leveraging the latest utility-first CSS framework.
3. **Shadcn with Base UI**: If you need new components, please refer to [Shadcn UI](https://ui.shadcn.com/). We use **Base UI** instead of Radix for its superior flexibility and active maintenance.
4. **Vitest**: Our primary testing framework for unit and content validation.

## Local Development Setup

### Requirements

- **Node.js**: 24.x or higher
- **pnpm**: 10.x or higher

### Steps

1. **Fork and Clone**: Fork the repository and clone it to your local machine.
2. **Install Dependencies**:
   ```bash
   pnpm install
   ```
3. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   The site will be available at `http://localhost:3000`.

### Other Commands

| Command       | Description                                 |
| :------------ | :------------------------------------------ |
| `pnpm build`  | Build the project for production            |
| `pnpm lint`   | Run ESLint to check for code quality issues |
| `pnpm format` | Run Prettier to format the codebase         |
| `pnpm test`   | Run the test suite using Vitest             |

## Pull Request Process

1. **Branch**: Create a new branch from `main` (e.g., `feat/new-idiom` or `fix/typo`).
2. **Develop**: Make your changes and ensure they follow the project standards.
3. **Commit**: Follow the [Commit Styleguide](#commit-styleguide).
4. **Tests**: Add new tests if necessary.
5. **Quality Check**: Run `pnpm test`, `pnpm lint`, and `pnpm format` to ensure the code is production-ready.
6. **Push & PR**: Push to your fork and submit a Pull Request to the upstream `main` branch.
7. **Review**: Wait for maintainer review and address any feedback.

## Commit Styleguide

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This helps us maintain a clean git history.

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
