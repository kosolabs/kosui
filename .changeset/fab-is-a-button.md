---
"kosui": minor
---

- **Breaking:** `Fab` no longer positions itself or renders a spacer `<div>`. It renders only its button, so place it with classes: `absolute right-4 bottom-4` inside a `relative` container that doesn't scroll, or `fixed right-4 bottom-4` for the window. To migrate, add one of those to each `Fab`, and the `relative` class to its container if needed.
- **Breaking:** `Fab` takes Button's default shape, `rounded`. Pass `shape="circle"` to keep the old circle.
- `FabProps` is now `ButtonProps`.
