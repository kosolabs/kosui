---
"kosui": minor
---

- `Button` and `Link` show a focus ring for keyboard focus only: a 3px outline with a 2px offset in the secondary color, following Material 3. Focus styles no longer stay on after a mouse click.
- Menu items highlight under the pointer and on keyboard focus.
- `Tooltip` opens immediately on keyboard focus, closes on blur, and is linked to its trigger with `aria-describedby`.
- An icon-only `Button` with a string `tooltip` uses it as its accessible name.
- `class` props accept Svelte's object and array class values on every component.
- Attachments (`{@attach}`) passed to components now reach the element.
- Adds `cn()`, which resolves class values the way Svelte's `class` attribute does and merges conflicting Tailwind classes.
- `tailwind-merge` and `clsx` are now declared dependencies. `tailwind-merge` was already required at runtime but wasn't declared.
