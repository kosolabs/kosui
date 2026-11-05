# Kosui

Apply the Design Philosophy in the README when deciding how to build or change a component.

When you hand-roll something because a browser lacks a platform feature, add it to `WORKAROUNDS` in `src/workarounds.test.ts` with its [web-features](https://github.com/web-platform-dx/web-features) id. The test fails once the feature becomes Baseline, so we know to adopt it.

@README.md
@DEVELOPMENT.md
