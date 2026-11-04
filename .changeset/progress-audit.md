---
"kosui": minor
---

CircularProgress is an accessible progress bar that takes the shared `color` and `size`.

- **Breaking:** The ring has `role="progressbar"`, named "Loading" unless you pass `aria-label`. A determinate ring reports its value as a percentage. Hide a ring that sits beside text saying the same thing, like a spinner inside a button, with `aria-hidden="true"`.
- **Breaking:** `size` takes the shared scale, fitting inside each row: `xs` 16, `sm` 24 (the default), `md` 32, `lg` 40 and `xl` 48 pixels. For other sizes, use a class, like `class="size-25"` for `size="100"`.
- **Breaking:** `color` takes a theme color, defaulting to `primary`. `class="text-m3-primary"` is no longer needed. Inside a filled button, use `color="inherit"`. `trackColor` and `textColor` are gone; the track and text follow the ring's color.
- Attributes, event handlers and attachments pass through to the `<svg>`. `el` binds it, and `class` takes any class value.
