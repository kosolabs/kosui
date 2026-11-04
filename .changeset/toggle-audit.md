---
"kosui": minor
---

Toggle Group is a radio group of native radio buttons, shows the chosen option in every color, and fills the shared row.

- Arrow keys move between buttons and choose them, Tab enters the group once, and with a `name` the group submits its value with a form.
- The chosen button is visible in every color: plain and inherit tint it and thicken its edge in the text color, where before it looked unselected.
- Focus draws a 2-pixel outline in the group's color, above the neighboring buttons.
- Buttons fill the shared row: 28, 36, 44, 52 or 60 pixels.
- **Breaking:** the group is `role="radiogroup"` and each button a radio `<input>` inside a `<label>`, not `role="listbox"` and `role="option"` buttons. Button attributes, events and `el` now go to the radio; `class` goes to the label.
- **Breaking:** `color` and `shape` move from ToggleButton to ToggleGroup, which also takes `size` and `name`.
- **Breaking:** `ToggleContext`, `getToggleContext` and `setToggleContext` are no longer exported.
