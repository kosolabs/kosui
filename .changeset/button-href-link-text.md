---
"kosui": minor
---

- **Breaking:** `Link` is for text links only, so its `variant` and `shape` props are gone. To migrate, use `<Button href>` for navigation that should look like a button.
- `Button` accepts `href` and renders an `<a>` with all of Button's variants. The new `ButtonActionProps` and `ButtonLinkProps` types describe each form, and `ButtonProps` is either.
- **Breaking (types):** components no longer accept `underline`, `hover` or `focus` props. They had no effect and ended up as attributes on the element. `Link` keeps `underline`. `baseClasses` takes the new `BaseClassOptions` type, while `Variants` is now `variant`, `color` and `shape`.
- `DialogButton` and `MenuTrigger`'s button accept only button props, since they never navigate.
