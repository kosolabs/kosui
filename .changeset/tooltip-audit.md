---
"kosui": minor
---

Tooltips can be hovered, work with a mouse on touchscreen computers, and click tooltips behave like disclosures.

- Moving the pointer from the trigger onto the tooltip keeps it open, as WCAG's Content on Hover or Focus requires.
- Hover is decided per pointer, so a mouse or pen shows tooltips on touch-capable laptops, where before it never did.
- With `click`, the trigger toggles the tooltip and has `aria-expanded` and `aria-controls`, the content comes right after the trigger in the tab order, and it has no tooltip role, so it can hold a link.
- **Breaking:** `TooltipTriggerProps` has `onpointerenter` and `onpointerleave` instead of `onmouseenter` and `onmouseleave`, plus `aria-expanded` and `aria-controls` in click mode.
- **Breaking:** the tooltip renders after its trigger instead of before it.
