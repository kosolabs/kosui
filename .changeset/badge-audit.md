---
"kosui": minor
---

- **Breaking:** `Badge` defaults to `color="error"`, as Material 3 badges do. Pass `color="primary"` to keep the old look.
- **Breaking:** `Badge` no longer accepts Box's `shape`, `backdrop` and `centered` props, which it ignored or always set.
- `Badge` passes every other attribute, event handler and attachment to the badge's element, and `bind:el` binds it. `BadgeProps` is now exported.
- `Badge` renders `<span>`s instead of `<div>`s, so it's valid inside a button, and its wrapper fits its element, so the badge stays on the element in any container.
- The badge comes after its element, so screen readers read the element first, and it grows into a pill for longer content like `999+`.
- `content` also accepts a snippet, for icons.
