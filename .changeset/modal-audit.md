---
"kosui": minor
---

Modal returns focus to its opener, closes through the dialog's native close requests, and respects reduced motion.

- Closing a modal returns focus to the element that had it before it opened, where before focus fell to the page body.
- Escape, backdrop clicks and Android's back gesture close a modal through `<dialog closedby="any">` and its `cancel` event, replacing hand-written key and click handlers.
- Modals don't animate when reduced motion is requested; the backdrop fades in and out with CSS otherwise.
- Modal has a docs page.
