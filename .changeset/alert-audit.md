---
"kosui": minor
---

Alert is a Box with `role="alert"`, so it takes the shared `variant`, `color` and `shape`.

- **Breaking:** Alert takes all six shared variants, and no longer takes `outlined`, `elevated` or `radius`. Use `variant="outlined"` or `variant="elevated"`, and `shape` for corners. For the old outlined-and-elevated look, use `variant="elevated"` with `class="border"`.
- **Breaking:** `ALERT_COLORS`, `ALERT_RADII`, `ALERT_VARIANT` and the `AlertColor`, `AlertColorProp`, `AlertElevated`, `AlertElevatedProp`, `AlertOutlined`, `AlertOutlinedProp`, `AlertRadius`, `AlertRadiusProp`, `AlertVariant` and `AlertVariantProp` types are gone. Use the shared types, like `Variant` and `Color`.
- Alert takes a bindable `el`.
- Alert's docs show `role="status"` for messages that shouldn't interrupt screen readers.
