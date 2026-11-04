---
"kosui": minor
---

- **Breaking:** `Portal` and `Proxy` are removed. Nothing used them, and overlays render in the browser's top layer instead: use the Popover API (as Popover does) or `<dialog>` (as Modal does).
