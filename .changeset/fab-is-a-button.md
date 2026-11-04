---
"kosui": minor
---

- **Breaking:** `Fab` floats over the content by default, so at the end of a scroll it covers the last item. Pass `clear` to keep the old behavior, where it makes room and sits below the last item.
- **Breaking:** `Fab` takes Button's default shape, `rounded`. Pass `shape="circle"` to keep the old circle.
- `Fab` renders only its button, with no spacer `<div>`.
- `Fab` now stays in the bottom-right corner in more layouts: when its container scrolls sideways, and in containers that aren't flex columns, even when their content is short.
- To place `Fab` elsewhere, override its position with classes, for example `class="fixed inset-auto right-4 bottom-4"`.
- `FabProps` is `ButtonProps` plus `clear`.
