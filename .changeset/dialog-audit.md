---
"kosui": minor
---

Dialogs are named by their title, take the theme's surface in dark mode, and the dialog helpers use the web's alert, confirm and prompt vocabulary.

- Dialog's `title` renders as a heading and names the dialog with `aria-labelledby`. The helpers' message describes it with `aria-describedby`.
- Modal, and so Dialog, uses Material 3's dialog surface (`surface-container-high`, `on-surface`) with 24px padding and takes a `shape` prop, defaulting to `xl`. Dialogs no longer stay white in dark mode.
- Closing nested modals together returns focus to the element that opened the first one.
- A prompt's field is a form, so Enter submits it and validation like `required` applies.
- Requests made while a dialog is showing wait for it to close instead of leaving the earlier promise unresolved.
- **Breaking:** `Dialoguer` is now `DialogProvider`, and `getDialoguerContext()` is now `getDialogs()`, returning a `Dialogs`.
- **Breaking:** `notice()` is now `alert()`, and `input()` is now `prompt()`, whose `props` option is now `input`.
- **Breaking:** `confirm()` resolves `false` when dismissed, `show<T>()` returns `Promise<T | undefined>`, and `confirm()` and `prompt()` label their accept button "OK" by default.
- **Breaking:** `DialoguerButtonProps` is now `DialogAction`.
- **Breaking:** `DialogButton` is removed. Dialog's `actions` snippet receives a `select(value)` function to call from any Button.
- **Breaking:** Dialog no longer adds `role="dialog"` or `aria-modal`, which the native modal `<dialog>` already provides.
