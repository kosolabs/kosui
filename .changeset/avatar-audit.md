---
"kosui": minor
---

- **Breaking:** `Avatar`'s `alt` now names the avatar itself (`role="img"` with `aria-label`), so the name holds whether it shows the picture or the fallback. Without `alt`, the avatar is decorative and its picture gets `alt=""`.
- **Breaking:** `Avatar` no longer accepts Box's `centered` and `backdrop` props.
- After a picture fails to load, a new `src` is tried instead of staying on the fallback.
- Pictures are cropped to fill the avatar instead of being letterboxed.
- Fallback text scales with the avatar's size.
