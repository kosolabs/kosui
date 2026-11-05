---
"kosui": minor
---

Menus follow the ARIA menu button pattern, take a trigger snippet like Tooltip, and expose checked items and labelled groups.

- Enter, Space or Down Arrow on the trigger opens the menu on its first item, and Up Arrow on its last. A click focuses the menu, so the arrow keys work.
- The menu is named by its trigger. Items are reached with the arrow keys, Home, End and typeahead, which cycles through items that start with a repeated letter and skips disabled items.
- Tab closes the menu and moves on, and moving the pointer out of the menu keeps focus in it.
- `MenuItem` takes `checked`, which renders `menuitemcheckbox` with `aria-checked` and a check mark, and `color`, which defaults to `plain` (on-surface). `MenuActions` uses it for selected actions.
- The new `MenuGroup` labels a set of items, as a `group` named by its `label`. `MenuActions` groups each category this way.
- Menus use Material 3's menu surface (`surface-container`) with a shadow, and `Menu` takes `placement` (default `bottom-start`) and `shape` (default `xs`).
- **Breaking:** `Menu` takes a `trigger` snippet that receives props to spread on any button. `MenuTrigger` and `MenuTriggerButton` are removed.
- **Breaking:** `MenuContent` is removed. `Menu` renders the menu, with `placement`, `shape`, `class` and other attributes passed to it, and its `el` is now the menu element instead of the anchor.
- **Breaking:** `MenuHeader` is removed in favor of `MenuGroup`.
- **Breaking:** `MenuItem`'s `onSelect` no longer receives the element, runs after the menu closes, and `MenuItem` no longer takes `variant` or `shape`.
- **Breaking:** `MenuContext`, `getMenuContext` and `setMenuContext` are no longer exported.
