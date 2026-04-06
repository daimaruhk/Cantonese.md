# Contributing to Cantonese.md

First off, thank you for considering contributing to **Cantonese.md**! We welcome everyone to help preserve and promote Cantonese culture.

The following is a set of guidelines for contributing to Cantonese.md. These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
- [Local Development Setup](#local-development-setup)
- [Pull Request Process](#pull-request-process)
- [Styleguides](#styleguides)

---

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to [Email Address].

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps** to reproduce the problem.
- **Provide specific examples** to demonstrate the steps (e.g., code snippets or links to a reproducible repository).
- **Describe the behavior you observed** after following the steps and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected** to see instead and why.
- **Include environment details** (OS, framework version, language version, etc.).

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Before creating an enhancement request, check the existing issues. When creating one, please provide:

- **A clear and descriptive title**.
- **A step-by-step description** of the suggested enhancement.
- **Specific examples** to demonstrate the steps or intended usage.
- **An explanation of why** this enhancement would be useful to most users.

## Local Development Setup

To build and run [Project Name] locally, follow these steps:

1. **Fork the repository** on GitHub.
2. **Clone your fork locally**:
   ```bash
   git clone [https://github.com/YOUR-USERNAME/](https://github.com/YOUR-USERNAME/)[Project Name].git
   cd [Project Name]
   ```
3. **Install dependencies**:

```Bash
# [Insert your package manager command, e.g., npm install, pip install -r requirements.txt, cargo build]
```

4. **Run the local development server/build**:

```Bash
# [Insert command, e.g., npm run dev]
```

5. **Run the test suite to ensure everything is working**:

```Bash
# [Insert test command, e.g., npm test]
```

## Pull Request Process

1. Branching: Create a new branch from main (e.g., feature/add-new-api or bugfix/issue-123).

2. Commit: Make your changes. Ensure your commit messages follow our Commit Styleguide.

3. Test: Add tests for your changes. Ensure the entire test suite passes locally.

4. Document: If you changed the API, UI, or setup process, update the README.md or documentation folder accordingly.

5. Push & PR: Push to your fork and submit a Pull Request against the main branch of the upstream repository.

6. Review: Maintainers will review your PR. Be prepared to respond to feedback and make necessary updates.

_Note: All PRs must pass the CI/CD pipeline checks before they can be merged._

## Styleguides

### Code Style

- We follow [Insert Standard, e.g., PEP 8, Airbnb JavaScript Style Guide].
- We use [Insert Linter/Formatter, e.g., Prettier, ESLint, Ruff] to enforce this. Run the formatter before committing:

```Bash
# [Insert format command, e.g., npm run format]
```

### Commit Messages

We use Conventional Commits for our commit messages.

- Examples: feat: add user authentication, fix: resolve crash on startup, docs: update setup instructions.
