---
"kosui": minor
---

The command palette is one accessible `CommandPalette`, registering actions in an effect no longer hangs, and single-key shortcuts don't fire while typing.

- `Registry.register` and `unregister` no longer track the actions they change, so `$effect(() => registry.register(...))` works instead of re-running forever.
- `CommandPalette` is a dialog named by `label`, whose search field is a `combobox` controlling a `listbox` of actions with `aria-activedescendant`. Selected actions set `aria-checked`, and "No matching commands" is announced.
- The first match is highlighted; Down and Up Arrow wrap, and Enter or a click closes the palette and then runs the action.
- Shortcuts without Ctrl, Alt or ⌘ don't run while focus is in a text field.
- **Breaking:** `Commander` is now `CommandPalette`, and its `command` prop is now `registry`. It also takes `label` and `placeholder`.
- **Breaking:** `Command`, `CommandInput`, `CommandSearch`, `CommandContent`, `CommandItem`, `CommandDivider`, `CommandHeader`, `CommandContext`, `getCommandContext` and `setCommandContext` are removed, along with `Header` and `ItemContext`.
