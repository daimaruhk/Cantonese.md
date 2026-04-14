# Contributing to Cantonese.md

First off, thank you for considering contributing to **Cantonese.md**! We welcome everyone who wants to help preserve and promote Cantonese language and culture.

The following is a set of guidelines for contributing to Cantonese.md. These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [AI Contribution Policy](#ai-contribution-policy)
- [Code Style](#code-style)

---

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Improving Cantonese Library

#### Adding New Content

For step-by-step instructions on creating content entries using the CLI, see [Adding a Content Type](./docs/content-management.md).

#### Improving Existing Content

Feel free to edit any Markdown file in `src/contents/` for typos, grammatical errors, missing details, or incorrect information. Please ensure the `id` in the frontmatter remains untouched, and follow the [Jyutping format](./docs/style-guide.md#jyutping-format) specified in the Style Guide.

### Writing Code

Bug fixes, new features, UI/UX improvements, tooling updates, and documentation improvements are all welcome. Refer to the [Code Style Guide](./docs/style-guide.md) for conventions.

### Reporting Bugs

If you find a bug, please check the existing issues first. If you do need to create one, please use the [bug report template](https://github.com/daimaruhk/Cantonese.md/issues/new?template=bug_report.md).

### Requesting Features

Before creating a feature request, check the existing issues first. If you do need to create one, please use the [feature request template](https://github.com/daimaruhk/Cantonese.md/issues/new?template=feature_request.md).

## Development Setup

For local setup instructions, build commands, and the full CLI reference, see the [Development Guide](./docs/development.md).

For a deep dive into the project's folder structure and registry architecture, see the [Technical Architecture](./docs/architecture.md).

## Pull Request Process

1. **Branch:** Create a new branch from `main` (for example, `feat/new-idiom` or `fix/typo`).
2. **Develop:** Make your changes and ensure they follow the project standards.
3. **Tests:** Add new tests if necessary.
4. **Quality Check**: Run `pnpm test`, `pnpm lint`, and `pnpm format` to ensure the code is production-ready.
5. **Commit:** Follow the [Commit Styleguide](./docs/style-guide.md#commit-messages).
6. **Push & PR:** Push to your fork and submit a Pull Request to the upstream `main` branch.
7. **Review:** Wait for maintainer review and address any feedback.

### PR Requirements

- **Keep PRs compact.** Each Pull Request must be small enough for a human reviewer to thoroughly audit.
- **Single-purpose only.** One PR = one logical change. Do not bundle unrelated content additions, feature work, or refactors.
- **No mega-drops.** Break large content contributions into small, reviewable batches.
- **Demonstrate diligence.** If a reviewer suspects content was bulk-generated and rubber-stamped, the PR will be sent back.

Pull Requests that violate these requirements will be closed by a maintainer with a stated reason.

## AI Contribution Policy

Using AI tools (e.g., GitHub Copilot, ChatGPT, Claude) for writing code and generating content is **encouraged**. AI accelerates development velocity and helps us scale the Cantonese knowledgebase faster. That said, speed without accountability is a liability.

### Human Review is Non-Negotiable

- A **human contributor must rigorously review, verify, and take full responsibility** for every piece of AI-generated output before it is submitted.
- This applies equally to **code and content** — Cantonese idiom entries, component logic, configuration changes, tests, and documentation.
- If you use AI to generate a Cantonese idiom entry, **you** are responsible for verifying the term, Jyutping, meaning, and cultural accuracy. The AI is a tool; you are the author.

### Zero Tolerance for AI Slop

**"AI slop"** is defined as any AI-generated code or content submitted without thorough human review. This includes but is not limited to:

- Unreviewed bulk content dumps
- Code with hallucinated APIs, imports, or logic
- Generic or inaccurate Cantonese translations and Jyutping
- Boilerplate filler that adds no real value

**AI slop will be immediately rejected.** Quality always supersedes quantity.

## Code Style

For the full set of coding conventions, see the [Code Style Guide](./docs/style-guide.md).
