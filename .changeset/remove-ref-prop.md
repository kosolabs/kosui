---
"kosui": minor
---

- **Breaking:** the `ref` prop is removed from every component. To run code with the element, pass an attachment, which every component forwards to its element. For example, `ref={(el) => el.focus()}` becomes `{@attach (el) => el.focus()}`. To keep a reference instead, use `bind:el`.
- **Breaking:** `Modal` and `Dialog` rename their bindable `ref` to `el`, like every other component, so `bind:ref` becomes `bind:el`.
- **Breaking (types):** `TooltipTriggerProps` no longer has `ref`. Spread the trigger props onto your element with `{...props}`. The tooltip's anchor comes along as an attachment, so `use:ref` is no longer needed.
