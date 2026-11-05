---
"kosui": minor
---

Shortcuts work across platforms and keyboard layouts, and `ShortcutHint` is readable by screen readers.

- Add `mod` to `Shortcut`: ⌘ on Apple devices and Ctrl everywhere else.
- Letters match whatever their case, so `{ key: "k", shift: true }` matches Shift+K.
- When a key types a character outside ASCII, like Option+L on a Mac or Ctrl+K on a Russian layout, the physical key is matched.
- Shortcuts show ⌃⌥⇧⌘ in Apple's order on Apple devices and Ctrl, Alt and Shift by name elsewhere.
- Add `Shortcut.equals` and `Shortcut.keys()`.
- **Breaking:** `ShortcutBadge` is now `ShortcutHint`. It renders `<kbd>` keys with visually hidden text like "Command+K", passes other attributes to the outer `<kbd>`, and no longer takes `badgeClass`.
- **Breaking:** `toString()` returns readable text like "Command+K" or "Ctrl+K" instead of glyphs, and `Shortcut` is no longer iterable; use `keys()`.
- **Breaking:** The `Dead` key no longer displays as ☠️.
- `MenuActions` shows shortcuts with `ShortcutHint`.
