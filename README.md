# Kosui

Accessible Svelte 5 components, styled with Material 3 and Tailwind CSS. Used by [Cipherly](https://cipherly.app).

**Docs and live examples: [kosui.kosolabs.com](https://kosui.kosolabs.com)**

## Getting Started

Kosui needs Svelte 5 and Tailwind CSS 4.

```
pnpm add kosui
```

Import Kosui's theme after Tailwind in your app's CSS. It adds the Material 3 colors as utilities like `bg-m3-primary`, a default palette, and tells Tailwind to scan Kosui's components.

```css
@import "tailwindcss";
@import "kosui/theme.css";
```

Then use the components:

```svelte
<script lang="ts">
  import { Button } from "kosui";
</script>

<Button variant="filled">Save</Button>
```

To use your own colors, override the `--md-sys-color-*` variables, for example with a palette from the [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/). Add the `dark` class to `<html>` for the dark palette.

## Design Philosophy

These principles are listed in order of priority. When they conflict, the higher principle wins.

**Svelte First** — Write idiomatic, current Svelte. Use runes, snippets, and attachments, and reach for Svelte's built-ins before writing our own: `$derived` (writable when needed) over effects that sync state, `createContext` for context, `$props.id()` for ids. When Svelte adds a built-in for something we hand-rolled, adopt it.

**Be Parsimonious** — Keep components as simple as possible. Reach for CSS first; use JavaScript only when CSS can't do it. Don't add abstractions that aren't earning their weight.

**Accessible by Default** — ARIA roles, keyboard navigation, and focus management are built in, not bolted on. A component isn't done until it works without a mouse.

**Convention over Invention** — If a component is standard across major platforms and frameworks — iOS, Android, Windows, macOS, and the web — it belongs in the library. Its behavior should be unsurprising: implement it the way those platforms do, not the way we imagine it might work.

**Shared Vocabulary** — A concept has one name across the library. `variant`, `color`, `shape`, `size`, and `underline` take the same values and mean the same thing on every component that uses them, so a prop learned once works everywhere. A `size` is a row height (`xs` 28px, `sm` 36px, `md` 44px, `lg` 52px, `xl` 60px): components at the same size line up in a row, each choosing its own default. A `shape` is a corner radius on Material 3's scale (`none`, `xs` 4px, `sm` 8px, `md` 12px, `lg` 16px, `xl` 28px, `full`), and each component defaults to the shape Material 3 gives it. Components adopt a shared prop wherever its concept applies, and never reuse a shared name for something else.

**Transparent Props** — Components behave like the element they render. Every component spreads `...restProps` onto that element, attachments included, and provides an `el` binding. Props like `class` accept whatever the native element accepts.

**Composable over Configurable** — Prefer Svelte snippets and composition over a proliferation of boolean props and string options. When a component needs customization, reach for `{#snippet}` before adding another prop.

**Minimal Dependencies** — As few external dependencies as possible. Every dependency is a maintenance burden and a potential breaking change. A little copied, well-understood code beats a large transitive dependency graph.

**Modern Baseline** — Target current, evergreen browsers. Dropping legacy browser support is acceptable in exchange for simpler code.

## Changesets

Add a new changeset:

```
pnpm changeset
```
