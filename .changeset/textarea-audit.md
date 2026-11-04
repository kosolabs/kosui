---
"kosui": minor
---

Textarea shares Input's field style, so it shows focus and errors in every variant and color, and one row lines up with the shared row height.

- Focus draws a 2-pixel outline in the textarea's color, the resting edge contrasts at least 3:1, and invalid textareas turn the error color, exactly as Input does.
- Each size pads one row to the shared row height (28, 36, 44, 52 or 60 pixels), so `rows={1}` lines up with an Input or Button of the same size.
- Textarea has a bindable `el`.
- **Breaking:** the `inherit` variant is now `plain`, and the variant's type is `InputVariant`.
- **Breaking:** `TEXTAREA_COLORS`, `TEXTAREA_SIZES`, `TEXTAREA_VARIANTS`, `TextareaColor`, `TextareaColorProp`, `TextareaSize`, `TextareaSizeProp`, `TextareaVariant` and `TextareaVariantProp` are removed; use `COLORS`, `SIZES`, `INPUT_VARIANTS` and their types.
