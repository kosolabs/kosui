---
"kosui": patch
---

- `Link` classes now update when `class`, `variant`, `color`, `shape`, or `underline` change after mount.
- `Tooltip` now responds to changes to `click` after mount.
- `Slider` now uses the latest `label`, `onChange`, and `onChangeEnd` props.
- `Popover` no longer logs to the console when rendered without children.
- `icon` props on `Button`, `Dialog`, dialoguer, and command actions are typed as `LucideIcon`, which fixes type errors with current `@lucide/svelte`. The minimum `@lucide/svelte` version is now 1.1.0.
