# Kosui

A Svelte component library used by [Koso](https://koso.app) and [Cipherly](https://cipherly.app).

## Design Philosophy

These principles are listed in order of priority. When they conflict, the higher principle wins.

**Svelte First** — Write idiomatic, current Svelte. Use runes, snippets, and attachments, and reach for Svelte's built-ins before writing our own: `$derived` (writable when needed) over effects that sync state, `createContext` for context, `$props.id()` for ids. When Svelte adds a built-in for something we hand-rolled, adopt it.

**Be Parsimonious** — Keep components as simple as possible. Reach for CSS first; use JavaScript only when CSS can't do it. Don't add abstractions that aren't earning their weight.

**Accessible by Default** — ARIA roles, keyboard navigation, and focus management are built in, not bolted on. A component isn't done until it works without a mouse.

**Convention over Invention** — If a component is standard across major platforms and frameworks — iOS, Android, Windows, macOS, and the web — it belongs in the library. Its behavior should be unsurprising: implement it the way those platforms do, not the way we imagine it might work.

**Transparent Props** — Components behave like the element they render. Every component spreads `...restProps` onto that element, attachments included, and provides an `el` binding. Props like `class` accept whatever the native element accepts.

**Composable over Configurable** — Prefer Svelte snippets and composition over a proliferation of boolean props and string options. When a component needs customization, reach for `{#snippet}` before adding another prop.

**Minimal Dependencies** — As few external dependencies as possible. Every dependency is a maintenance burden and a potential breaking change. A little copied, well-understood code beats a large transitive dependency graph.

**Modern Baseline** — Target current, evergreen browsers. Dropping legacy browser support is acceptable in exchange for simpler code.

## Changesets

Add a new changeset:

```
pnpm changeset
```
