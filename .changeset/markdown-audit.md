---
"kosui": minor
---

Markdown is safe for content people write, styled by default, and one component.

- Raw HTML and code blocks render as text, so they can't run scripts.
- Link and image URLs with schemes other than http, https, mailto and tel are dropped, including in tokens passed to snippets.
- GitHub Flavored Markdown is on by default, and task list items render disabled checkboxes.
- Every element is styled with theme tokens. Links use `Link`, and tables honor column alignment and scroll when wide.
- Code spans with double backticks, reference definitions and custom `tableCell` children render correctly.
- Editing `value` updates elements in place instead of rebuilding the whole document.
- **Breaking:** `options` is replaced by `gfm` (default `true`) and `breaks` props.
- **Breaking:** Markdown renders inside a `<div>` that takes `class`, `el` and other attributes.
- **Breaking:** The per-token components (`MarkdownHeading`, `MarkdownList`, …), `MarkdownToken`, `MarkdownTokens`, `MarkdownContext` and its helpers are removed. Override an element with its snippet instead. `MarkdownComponentProps` is now `MarkdownSnippetProps`.
- **Breaking:** The `def`, `escape` and `space` snippets are removed.
