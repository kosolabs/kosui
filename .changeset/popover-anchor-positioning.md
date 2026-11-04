---
"kosui": minor
---

Popovers are positioned with CSS anchor positioning instead of Floating UI, so kosui no longer depends on `@floating-ui/dom`.

- The browser places a popover next to its anchor, flips it to the other side when there's no room, and keeps it on screen, with no JavaScript measuring on scroll or resize.
- A popover reopened while it's closing now shows, where before it stayed hidden while `open` was true.
- **Breaking:** popovers and tooltips no longer have arrows: `arrow` and `arrowClass` are removed from Popover and Tooltip.
- **Breaking:** `placement` is typed `PopoverPlacement` (a side, optionally with `-start` or `-end`) instead of Floating UI's `Placement`.
