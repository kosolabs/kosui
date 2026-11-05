---
"kosui": patch
---

Fix `Modal`, `Drawer` and `Dialog` not closing on a backdrop click or tap in Safari, which doesn't support `closedby="any"`. A press that starts or ends inside the modal no longer closes it.
