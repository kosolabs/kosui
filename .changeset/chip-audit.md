---
"kosui": minor
---

- **Breaking:** `Chip` is larger by default (`text-sm`, with `px-3 py-1` padding on its label), the size Koso and Cipherly already set by hand. Its padding moved from the container to the label, so remove `px-*` and `py-*` overrides from your chips.
- **Breaking:** `Chip` no longer has `role="option"`, and a chip without `onClick` renders its label as text instead of a button.
- `Chip`'s buttons have `type="button"`, so clicking a chip or its remove button no longer submits a surrounding form.
- The remove button is named after its chip ("Remove ada@example.com"), is 24 pixels square, and Backspace or Delete on a focused chip calls `onDelete`.
- `ChipProps` omits Box's `centered` and `backdrop`.
