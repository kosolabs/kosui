---
"kosui": minor
---

Switch is a styled `<input type="checkbox" role="switch">`, shows its state in every color, and is easy to see when off.

- Switch takes part in forms: it submits its `name` and `value` when on, and `required` works. Labels, Space and `bind:checked` are native.
- On and off look different in every color. Plain and inherit fill the track with the surrounding text color, where before the thumb was invisible.
- Off, the switch has an outline-colored edge and thumb that contrast at least 3:1, as in Material 3.
- Sizes sit inside the shared row: 16×28, 24×40, 28×48, 32×52 and 36×60 pixels, so `sm` and up are at least 24 pixels tall.
- Switch has a bindable `el`, and `checked` can be bound to `undefined`, as on a native checkbox.
- **Breaking:** Switch renders an `<input>`, not a `<button>`, so its attributes and events are an input's.
- **Breaking:** `SwitchThumb` and the `thumb` snippet are removed.
- **Breaking:** `SWITCH_COLORS`, `SWITCH_SIZES`, `SwitchColor`, `SwitchColorProp`, `SwitchSize` and `SwitchSizeProp` are removed; use `COLORS`, `SIZES` and their types.
