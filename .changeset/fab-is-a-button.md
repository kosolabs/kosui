---
"kosui": minor
---

- **Breaking:** `Fab` takes Button's default shape, `rounded`. Pass `shape="circle"` to keep the old circle.
- `Fab` renders only its button, with no spacer `<div>`. It still floats in the bottom corner of its container and sits below the last item once the content is scrolled to the end.
- `Fab` now stays pinned to the right when its container scrolls sideways, and right-aligns in containers that aren't flex columns.
- To place `Fab` elsewhere, override its position with classes, for example `class="fixed right-4 bottom-4 left-auto"`.
- `FabProps` is now `ButtonProps`.
