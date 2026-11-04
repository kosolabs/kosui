---
"kosui": minor
---

Skeleton hides its children, respects reduced motion, and is one line tall by default.

- **Breaking:** Children no longer show. They set the skeleton's size, invisibly, and screen readers don't read them.
- The pulse stops when people ask for reduced motion.
- A skeleton without a height class is one line of text tall instead of 0 pixels.
- Skeleton's docs show how to mark a loading region with `aria-busy`.
