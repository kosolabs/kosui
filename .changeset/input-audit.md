---
"kosui": minor
---

Input shows focus and errors in every variant and color, its edge is easy to see, and it fills the shared row height.

- Focus draws a 2-pixel outline in the input's color, including the plain and inherit colors, which showed no focus before.
- Invalid inputs turn the error color, for native validation (after someone edits the field or tries to submit) and for `aria-invalid="true"`.
- The outlined variant's outline and the filled variant's new bottom line contrast at least 3:1 with the fill. Placeholders use `on-surface-variant`.
- **Breaking:** sizes are the shared row heights, 28, 36, 44, 52 and 60 pixels, so the default `sm` grows from 32 to 36.
- **Breaking:** the `inherit` variant is now `plain`.
- **Breaking:** `INPUT_COLORS`, `INPUT_SIZES`, `InputColor`, `InputColorProp`, `InputSize`, `InputSizeProp` and `InputVariantProp` are removed; use `COLORS`, `SIZES` and their types.
- **Breaking:** `el` is an `HTMLInputElement`, and so is `AutocompleteContext`'s `anchorEl`.
