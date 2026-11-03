---
"kosui": minor
---

- **Breaking:** `Link` always renders an `<a>`, and `href` is required. To migrate, replace a `Link` without `href` with `<Button variant="text">`, since actions belong to Button.
- **Breaking:** text links are underlined by default (`underline="always"`), so links in text don't rely on color alone. Button-like variants default to no underline. To keep the old look in navigation, pass `underline="hover"`. `Breadcrumbs` does this already.
- `Button` and button-like `Link`s are now inline-level (`inline-flex`), like native buttons, so they can sit inside a line of text.
