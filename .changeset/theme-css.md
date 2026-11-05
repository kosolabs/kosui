---
"kosui": minor
---

Add `kosui/theme.css`. Import it after Tailwind to get the Material 3 color utilities, a default light and dark palette, and scanning of Kosui's components, instead of copying a Tailwind config and the color variables into each app.

```css
@import "tailwindcss";
@import "kosui/theme.css";
```
