---
"kosui": minor
---

Button and Fab take `size` from the shared `xs`–`xl` scale, where each size is a row height: 28, 36, 44, 52 or 60 pixels, with text, padding and icon to match.

- **Breaking:** Button's and Fab's `size` no longer sets the icon's pixel size. Replace `size={20}` with the size whose row fits, like `size="md"`, or set the height with `class`.
- **Breaking:** Icon-only buttons are square and as tall as labeled buttons of the same size, so at the default `sm` they grow from 32 to 36 pixels.
- Fab defaults to `size="lg"`, 52 pixels, the same as before.
