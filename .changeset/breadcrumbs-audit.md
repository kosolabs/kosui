---
"kosui": minor
---

Breadcrumbs follow the ARIA breadcrumb pattern and behave like their `<nav>`.

- **Breaking:** Breadcrumbs render `<nav aria-label="Breadcrumb">` with an ordered list of levels, instead of a `<div>`. Separators are hidden from screen readers, and the last crumb is marked `aria-current="page"` and shown in the surrounding text color.
- **Breaking:** Attributes, event handlers and attachments go to the `<nav>` instead of to every link, and `el` binds the `<nav>`. Of the old link props, only `color` remains, and it colors the links.
- Two levels with the same title no longer crash.
- Long trails wrap between levels.
- `BreadcrumbsProps` and `Crumb` are exported.
