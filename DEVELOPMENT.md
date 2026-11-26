# Kosui Development Guide

This guide covers how to set up Kosui for local development, run tests, and release new versions.

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

To run all E2E tests in Chromium, Firefox and WebKit:

```bash
pnpm test:e2e
```

To run them in one browser:

```bash
pnpm test:e2e --project=webkit
```

On a Mac, WebKit's keyboard tests need **Keyboard navigation** turned on in System Settings › Keyboard. Without it, Tab skips buttons, as it does in Safari.

To run a specific test file:

```bash
pnpm exec playwright test e2e/button.test.ts
```

---

## Releasing

Kosui releases with [release-please](https://github.com/googleapis/release-please). PRs are squash-merged, so each PR title becomes a commit on `main` and must be a [Conventional Commit](https://www.conventionalcommits.org/), like `feat: Add Drawer` or `fix!: Slider is a styled native range input`. The titles of `feat` and `fix` PRs, and of any breaking change, become the release notes. To explain a breaking change in the notes, add a `BREAKING CHANGE:` footer to the squash commit's body.

Each merge to `main` updates a `chore(main): release` PR with the next version and changelog. Merging that PR tags the release, and the release workflow publishes it to npm.

---

For more details, see the [Kosui repository](https://github.com/kosolabs/kosui).
