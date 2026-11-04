---
"kosui": minor
---

Popover lets clicks bubble, respects reduced motion, shows its arrow without extra classes, and has a docs page.

- Clicks inside a popover reach the rest of the page, where before they were stopped, so document listeners never saw them.
- Popovers, and with them Menu, Tooltip and Autocomplete, don't animate when reduced motion is requested.
- With `arrow`, the popover is `overflow-visible` itself, so the arrow isn't clipped.
- **Breaking:** `strategy` is removed; popovers render in the top layer, where they're always fixed.
- **Breaking:** `el` is an `HTMLDivElement`.
