import type { ComponentDocs } from "#ui";
import CardExample from "./examples/card.svelte";
import LabelsExample from "./examples/labels.svelte";
import cardSource from "./examples/card.svelte?raw";
import labelsSource from "./examples/labels.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "A Box is a `<div>` that speaks the [design language](/design-language): it takes `variant`, `color` and `shape`, and everything else is yours to set with `class`. Avatar, Chip and Skeleton are built on it.",
  examples: [
    {
      title: "Card",
      description:
        'A box that groups content people navigate to can be a landmark: give it `role="region"` and name it after its heading.',
      source: cardSource,
      component: CardExample,
    },
    {
      title: "Labels",
      description:
        "Small boxes make labels. Layout, padding and text size come from `class`.",
      source: labelsSource,
      component: LabelsExample,
    },
  ],
  accessibility: [
    'A box is a `<div>` with no role, so on its own it adds nothing for screen readers. Give it a role when it means something, like `role="region"` with `aria-labelledby`.',
    'The `filled` and `tonal` variants set the text color with the background, from your theme\'s matching "on" color, so text stays readable.',
  ],
  api: [
    {
      rows: [
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          description:
            "The box's container style. Without one, the box has no background or outline.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          description: "The theme color the box uses.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          description: "Corner rounding.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The box's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the box. Your classes override the box's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The box's content.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the box's `<div>`.",
    },
  ],
};
