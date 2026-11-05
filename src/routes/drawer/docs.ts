import type { ComponentDocs } from "#ui";
import FiltersExample from "./examples/filters.svelte";
import filtersSource from "./examples/filters.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Drawers slide in from the edge of the screen, above the page, to hold navigation or a panel like filters. On wide screens, show the same navigation in a sidebar instead, as this site does.",
  examples: [
    {
      title: "A panel of filters",
      description:
        'Use `side="end"` for panels that act on the page, like filters or details, and name the drawer with `aria-labelledby` pointing at its heading. Set `open` to false to close it after an action.',
      source: filtersSource,
      component: FiltersExample,
    },
  ],
  accessibility: [
    "Drawer is a [Modal](/modal): a native `<dialog>` that makes the rest of the page inert and keeps focus inside. Name it with `aria-label` or `aria-labelledby`.",
    'Escape, a click on the backdrop and Android\'s back gesture close it, and focus returns to the button that opened it. Give that button `aria-haspopup="dialog"` and `aria-expanded`.',
    "`start` is the left edge in left-to-right languages and the right edge in right-to-left ones.",
    "Drawers don't slide when reduced motion is requested.",
  ],
  api: [
    {
      rows: [
        {
          name: "open",
          type: "boolean",
          default: "false",
          description:
            "Bindable. Whether the drawer is showing. Escape and backdrop clicks set it to false.",
        },
        {
          name: "side",
          type: `"start" | "end"`,
          default: `"start"`,
          description: "The edge the drawer slides in from.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"lg"`,
          description: "The radius of the corners on the open edge.",
        },
        {
          name: "onCancel",
          type: "() => void",
          description:
            "Called when someone dismisses the drawer with Escape, the backdrop or the back gesture.",
        },
        {
          name: "el",
          type: "HTMLDialogElement",
          description: "Bindable. The `<dialog>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the drawer, such as its width or padding. It's 20rem wide by default and leaves a strip of the page showing on phones.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The drawer's content.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the `<dialog>`.",
    },
  ],
};
