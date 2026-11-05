import type { ComponentDocs } from "#ui";
import FilterExample from "./examples/filter.svelte";
import filterSource from "./examples/filter.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Popovers float content next to the element that opened it, above the rest of the page. Tooltip, Menu and Autocomplete are built on Popover; use it directly for anything else, like a small panel of settings.",
  examples: [
    {
      title: "Settings panel",
      description:
        'For interactive content, give the popover `role="dialog"` and a name, and give its trigger `aria-expanded` and `aria-controls`. Escape closes it and returns focus to the trigger, and a click outside closes it.',
      source: filterSource,
      component: FilterExample,
    },
  ],
  accessibility: [
    "Popover renders in the browser's top layer with the Popover API, so it sits above everything without moving in the DOM. Place it right after its trigger, so it comes next in the tab order.",
    "Popover adds no role. Give it one that matches its content: `dialog` for a panel of controls, or use Tooltip, Menu or Autocomplete, which set their own.",
    "Escape closes the most recently opened popover and moves focus back to its anchor. Clicking outside the popover and its anchor closes it.",
    "Popovers don't animate when reduced motion is requested.",
  ],
  api: [
    {
      rows: [
        {
          name: "open",
          type: "boolean",
          default: "false",
          description:
            "Bindable. Whether the popover is showing. Escape and clicks outside set it to false.",
        },
        {
          name: "anchorEl",
          type: "HTMLElement",
          description:
            "The element the popover sits next to, and gets focus back on Escape.",
        },
        {
          name: "placement",
          type: `"top" | "right" | "bottom" | "left", optionally with "-start" or "-end"`,
          default: `"top"`,
          description:
            "Where the popover goes, positioned with CSS anchor positioning. It flips to the other side and shifts along the edge to stay on screen.",
        },
        {
          name: "onKeydownWhileOpen",
          type: "(event: KeyboardEvent) => void",
          description:
            "Called for every key pressed anywhere while the popover is open, for keyboard navigation like a menu's.",
        },
        {
          name: "el",
          type: "HTMLDivElement",
          description: "Bindable. The popover's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the popover. It has no styles of its own beyond the browser's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The popover's content.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the popover's `<div>`, and clicks inside it bubble like any other element's.",
    },
  ],
};
