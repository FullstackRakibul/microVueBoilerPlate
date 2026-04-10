# Contributing to microVueBoilerPlate

Thank you for your interest in contributing! 🎉 This guide will help you get started.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this standard. Please report unacceptable behavior to [fullstackrakibul@gmail.com](mailto:fullstackrakibul@gmail.com).

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/microVueBoilerPlate.git
   cd microVueBoilerPlate
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Workflow

```bash
# Start the dev server
npm run dev

# Run type checking
npm run type-check

# Build for production (validates your changes)
npm run build
```

Before submitting a PR, ensure:
- ✅ `npm run type-check` passes with no errors
- ✅ `npm run build` completes successfully
- ✅ The app runs correctly with `npm run dev`
- ✅ No console errors or warnings in the browser

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear, consistent commit history.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, or dependency changes |
| `ci` | CI/CD configuration changes |

### Examples

```bash
feat(auth): add OAuth2 login integration
fix(router): resolve redirect loop on expired tokens
docs(readme): update installation instructions
refactor(stores): extract API calls into composables
```

---

## Pull Request Process

1. **Update documentation** if your change affects the public API or user-facing behavior
2. **Ensure your branch is up to date** with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
3. **Fill out the PR template** with:
   - What the PR does
   - Why the change is needed
   - How it was tested
   - Screenshots (for UI changes)
4. **Request a review** from a maintainer
5. **Address feedback** promptly — we aim for a collaborative review process

### PR Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have added comments for hard-to-understand areas
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
- [ ] The build (`npm run build`) passes successfully

---

## Style Guide

### Vue Components

- Use `<script setup lang="ts">` for all components
- Use Composition API (no Options API)
- Keep components focused — extract logic into composables when it grows
- Use PascalCase for component filenames: `MyComponent.vue`

### TypeScript

- Always type function parameters and return values
- Use interfaces for object shapes, types for unions/intersections
- Avoid `any` — use `unknown` if the type is truly unknown

### CSS / Tailwind

- Use Tailwind utility classes for styling
- Extract repeated patterns into reusable components, not custom CSS
- Use the project's color tokens defined in `tailwind.config.js`

### File Organization

- Components go in `src/components/` (grouped by feature)
- Views/pages go in `src/views/`
- State management goes in `src/stores/`
- Layout components go in `src/layouts/`

---

## Reporting Bugs

Use [GitHub Issues](https://github.com/FullstackRakibul/microVueBoilerPlate/issues/new) and include:

- **Environment**: OS, Node.js version, browser
- **Steps to reproduce**: Minimal, clear steps
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Screenshots/logs**: If applicable

---

## Suggesting Features

We love feature ideas! Open a [GitHub Issue](https://github.com/FullstackRakibul/microVueBoilerPlate/issues/new) with:

- **Problem statement**: What problem does this solve?
- **Proposed solution**: How would you approach it?
- **Alternatives considered**: Any other approaches you thought of?
- **Additional context**: Mockups, examples, or related issues

---

Thank you for contributing! Every improvement matters. 🚀
