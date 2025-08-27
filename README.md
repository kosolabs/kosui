<p align="center">
  <img src="src/ui/kosui.svg" alt="Kosui Logo" width="120" />
</p>

# Kosui

Kosui is a modern, modular Svelte UI component library. It provides a comprehensive set of accessible, customizable components for building beautiful web applications with Svelte 5 and Tailwind CSS.

[![NPM Version](https://img.shields.io/npm/v/kosui?style=flat-square)](https://www.npmjs.com/package/kosui)
[![MIT License](https://img.shields.io/npm/l/kosui?style=flat-square)](LICENSE)

---

## Features

- Built for Svelte 5
- Tailwind CSS compatible
- Accessible and composable components
- Modular structure for tree-shaking
- Includes common UI elements: buttons, dialogs, menus, alerts, inputs, markdown, and more

## Installation

Kosui is published on [NPM](https://www.npmjs.com/package/kosui).

```bash
pnpm add kosui
# or
npm install kosui
# or
yarn add kosui
```

Kosui requires Svelte 5 and Tailwind CSS 4+ as peer dependencies.

## Usage

Import components directly from `kosui`:

```svelte
<script>
  import { Button, Alert, Dialog } from "kosui";
</script>

<Button>Click me</Button>
<Alert type="success">Success!</Alert>
<Dialog open={true}>Dialog content</Dialog>
```

Or import specific components:

```svelte
<script>
  import Button from "kosui/button";
  import Alert from "kosui/alert";
</script>
```

### Tailwind CSS Setup

Kosui uses Tailwind CSS for styling. Make sure your project is configured with Tailwind CSS 4+ and includes Kosui's CSS:

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{svelte,js,ts}", "node_modules/kosui/dist/**/*.js"],
  // ...other config
};
```

Import Kosui's base CSS in your root file (e.g., `src/app.css` or `src/app.html`):

```css
@import "kosui/dist/theme.css";
```

### SvelteKit Example

Kosui works out of the box with SvelteKit:

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import { Button } from "kosui";
</script>

<Button>Primary</Button>
```

## Components

Kosui provides:

- Alerts
- Autocomplete
- Avatar
- Badge
- Box
- Breadcrumbs
- Button
- Chip
- Command
- Dialog
- FAB
- Input
- Link
- Markdown
- Menu
- Modal
- Popover
- Portal
- Progress
- Shortcut
- Skeleton
- Slider
- Switch
- Textarea
- Toggle
- Tooltip

See the [src/lib](src/lib) directory for all available components.

## Documentation & Examples

- [NPM Package](https://www.npmjs.com/package/kosui)
- [GitHub Repository](https://github.com/kosolabs/kosui)
- Example usage: see `src/routes/` for SvelteKit demo pages

## Contributing

Kosui is MIT licensed. Contributions and issues are welcome!

---

© Kosolabs. Licensed under MIT.
