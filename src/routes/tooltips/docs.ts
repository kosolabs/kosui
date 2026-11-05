import type { ComponentDocs } from "#ui";
import ButtonsExample from "./examples/buttons.svelte";
import ClickExample from "./examples/click.svelte";
import CustomTriggerExample from "./examples/custom-trigger.svelte";
import buttonsSource from "./examples/buttons.svelte?raw";
import clickSource from "./examples/click.svelte?raw";
import customTriggerSource from "./examples/custom-trigger.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Tooltips show a short label or description when someone hovers over or focuses an element. Buttons take one directly with their `tooltip` prop.",
  examples: [
    {
      title: "Buttons",
      description:
        "A string `tooltip` names an icon-only button and describes a button with a label. A snippet `tooltip` can hold richer content.",
      source: buttonsSource,
      component: ButtonsExample,
    },
    {
      title: "Any element",
      description:
        "The `trigger` snippet receives props to spread on any element. Use one that takes keyboard focus, like a `<button>`, so keyboard users can reach the tooltip too.",
      source: customTriggerSource,
      component: CustomTriggerExample,
    },
    {
      title: "Click to show",
      description:
        "With `click`, the trigger toggles the tooltip like a disclosure, with `aria-expanded`, and its content comes next in the tab order, so it can hold a link.",
      source: clickSource,
      component: ClickExample,
    },
  ],
  accessibility: [
    "A tooltip shows after a short delay when the pointer rests on its trigger, and right away when the trigger gets keyboard focus. While it's open, the trigger's `aria-describedby` points at it.",
    "The pointer can move onto a tooltip without it closing, and Escape closes it, as WCAG's Content on Hover or Focus requires.",
    "Hover works with a mouse or pen on any device, including touchscreen laptops; on touch, a long press shows it.",
    "Hover tooltips can't be reached with the keyboard, so keep their content to text. For links or actions, use `click`, or a Popover.",
  ],
  api: [
    {
      rows: [
        {
          name: "trigger",
          type: "Snippet<[TooltipTriggerProps]>",
          description:
            "The element the tooltip belongs to. Spread the props it receives onto that element.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The tooltip's content.",
        },
        {
          name: "click",
          type: "boolean",
          default: "false",
          description:
            "Show and hide on click instead of hover and focus, like a disclosure.",
        },
        {
          name: "rich",
          type: "boolean",
          default: "false",
          description: "A larger surface for more than a short label.",
        },
        {
          name: "delay",
          type: "number",
          default: "500",
          description: "Milliseconds the pointer rests before it shows.",
        },
        {
          name: "placement",
          type: `"top" | "right" | "bottom" | "left", optionally with "-start" or "-end"`,
          default: `"top"`,
          description: "Where the tooltip goes. It flips to stay on screen.",
        },
        {
          name: "open",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the tooltip is showing.",
        },
        {
          name: "anchorEl",
          type: "HTMLElement",
          description:
            "The element to sit next to when there's no trigger snippet; show and hide it yourself with show(), hide() and cancel().",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the tooltip.",
        },
      ],
      note: "Tooltip takes every Popover prop. Every other attribute passes through to the tooltip's `<div>`.",
    },
  ],
};
