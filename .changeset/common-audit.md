---
"kosui": minor
---

Divider and Header bind `el`, and Divider stays inside its container.

- Divider and Header take a bindable `el`, like every other component. This includes their aliases MenuDivider, MenuHeader, CommandDivider and CommandHeader.
- Divider no longer has a negative horizontal margin, so it never overflows its container. In menus, separators sit 4 pixels in from each edge.
