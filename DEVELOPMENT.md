# Kosui Development Guide

This guide covers how to set up Kosui for local development, run tests, manage releases, and publish updates to NPM.

---

## Getting Started

Kosui uses [pnpm](https://pnpm.io/) for package management.

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

---

## Running Tests

To run all tests and lints:

```bash
pnpm test
```

### Running unit tests

```bash
pnpm test:unit
```

## Running End-to-End Tests

Kosui uses [Playwright](https://playwright.dev/) for E2E tests located in the [e2e](/e2e/) directory. Tests may be ran via the CLI or directly in VS Code using the Playwright extension.

Install playwright dependencies:

```bash
pnpm exec playwright install
```

To run all E2E tests:

```bash
pnpm test:e2e
```

To run a specific test file:

```bash
pnpm exec playwright test e2e/button.test.ts
```

---

## Adding Release Notes with Changesets

Kosui uses [Changesets](https://github.com/changesets/changesets) to manage release notes and versioning.

To add a new changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes. For more info, see the [common questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md).

---

## Publishing a New Version to NPM

Publishing is automated via GitHub Actions:

1. Create a pull request
2. Run `pnpm changeset` to add release notes and version bumps.
3. Merge your feature/fix PRs into `main`.
4. Push your changes. This will create a `chore: update versions` pull request.
5. Enable auto-merge on the `chore: update versions` PR.
6. Once auto-merge completes, the release workflow will publish the new version to NPM.

---

For more details, see the [Kosui repository](https://github.com/kosolabs/kosui).
