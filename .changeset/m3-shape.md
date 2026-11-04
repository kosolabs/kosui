---
"kosui": minor
---

`shape` is now Material 3's corner scale, shared by every component that has corners, and each component defaults to its Material 3 shape.

- **Breaking:** `shape` takes `none`, `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (28px) or `full`. Replace `square` with `none` and `circle` with `full`. `rounded` was 6px; the nearest steps are `xs` and `sm`.
- **Breaking:** `radius` is replaced by `shape` on Input, Textarea, Switch, SwitchThumb and Slider. `RADII`, `Radius`, `RadiusProp`, `INPUT_RADII`, `TEXTAREA_RADII`, `SWITCH_RADII`, `SLIDER_RADII` and their `*Radius`/`*RadiusProp` types are removed.
- **Breaking:** Defaults follow Material 3. Button, ToggleButton, Avatar, Switch and Slider are `full`; Fab is `lg`; Alert is `md`; Chip is `sm`; Input, Textarea, Skeleton, Menu, Command and Autocomplete are `xs`. Pass `shape` to keep the old look.
