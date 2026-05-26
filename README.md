# Kosui

A Svelte component library used by [Koso](https://koso.app) and [Cipherly](https://cipherly.app).

## Design Philosophy

These principles are listed in order of priority. When they conflict, the higher principle wins.

**Svelte First** — Write idiomatic Svelte. Prefer runes, snippets, and Svelte's built-in reactivity over external state management or patterns that fight the framework.

**Be Parsimonious** — Keep components as simple as possible. Reach for CSS first; use JavaScript only when CSS can't do it. Don't add abstractions that aren't earning their weight.

**Accessible by Default** — ARIA roles, keyboard navigation, and focus management are built in, not bolted on. A component isn't done until it works without a mouse.

**Convention over Invention** — If a component is standard across major platforms and frameworks — iOS, Android, Windows, macOS, and the web — it belongs in the library. Its behavior should be unsurprising: implement it the way those platforms do, not the way we imagine it might work.

**Transparent Props** — Components don't hide their underlying DOM element. Every component spreads `...restProps` and provides an `el` binding so consumers can always reach the element without fighting the component.

**Composable over Configurable** — Prefer Svelte snippets and composition over a proliferation of boolean props and string options. When a component needs customization, reach for `{#snippet}` before adding another prop.

**Minimal Dependencies** — As few external dependencies as possible. Every dependency is a maintenance burden and a potential breaking change. A little copied, well-understood code beats a large transitive dependency graph.

**Modern Baseline** — Target current, evergreen browsers. Dropping legacy browser support is acceptable in exchange for simpler code.

## Changesets

Add a new changeset:

```
pnpm changeset
```
