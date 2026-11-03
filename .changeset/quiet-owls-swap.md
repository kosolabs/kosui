---
"kosui": minor
---

`Markdown` and `Slider` now pick up renderer snippet props that change after mount.

Breaking: `MarkdownContext` and `SliderContext` constructors take getter functions for renderers instead of snippet values. `new MarkdownContext(renderers, tableCell)` becomes `new MarkdownContext(() => renderers, () => tableCell)`, and each `SliderContext` renderer argument becomes `() => snippet`. Reading renderers from the context is unchanged, but the `SliderContext` renderer properties are now read-only.
