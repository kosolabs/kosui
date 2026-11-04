---
"kosui": minor
---

- **Breaking:** `Fab` takes Button's default shape, `rounded`. Pass `shape="circle"` to keep the old circle.
- `Fab` renders only its button, with no spacer `<div>`. It still floats in the bottom corner of its container and sits below the last item once the content is scrolled to the end.
- `Fab` now stays in the bottom-right corner in more layouts: when its container scrolls sideways, and in containers that aren't flex columns, even when their content is short.
- New `overlap` prop: the Fab floats over the end of the content instead of making room below it.
- To place `Fab` elsewhere, override its position with classes, for example `class="fixed inset-auto right-4 bottom-4"`.
- `FabProps` is `ButtonProps` plus `overlap`.
