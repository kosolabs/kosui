---
"kosui": minor
---

Box is a `<div>` with the shared `variant`, `color` and `shape`, and nothing else of its own.

- **Breaking:** Box no longer takes `centered` or `backdrop`. Use `class="flex items-center justify-center"` for `centered` and `class="bg-m3-surface-container"` for `backdrop`. `backdrop` was also silently ignored with the elevated, filled and tonal variants.
- **Breaking:** Skeleton no longer takes `backdrop`. It keeps its surface background unless you give it a `variant`, and `class` can still change it.
- Box has a docs page.
