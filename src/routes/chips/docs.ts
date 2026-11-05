import type { ComponentDocs } from "#ui";
import RecipientsExample from "./examples/recipients.svelte";
import TagsExample from "./examples/tags.svelte";
import recipientsSource from "./examples/recipients.svelte?raw";
import tagsSource from "./examples/tags.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Chips show short pieces of information, like tags or the recipients of a message. They can be clicked, removed, or both.",
  examples: [
    {
      title: "Recipients",
      description:
        "Removable chips work inside forms without submitting them. Each remove button is named after its chip, and Backspace or Delete removes a focused chip.",
      source: recipientsSource,
      component: RecipientsExample,
    },
    {
      title: "Tags",
      description:
        "Without `onClick` or `onDelete`, a chip is plain text and stays out of the tab order. A `title` adds a hover hint.",
      source: tagsSource,
      component: TagsExample,
    },
  ],
  accessibility: [
    "With `onClick`, the label is a native `<button>`; without it, the label is text.",
    'The remove button is named "Remove" plus the chip\'s label, like "Remove ada@example.com", and is at least 24 pixels square from the `sm` size up.',
    "Backspace or Delete on a focused chip calls `onDelete`.",
    'Chip\'s buttons have `type="button"`, so they never submit a form.',
  ],
  api: [
    {
      rows: [
        {
          name: "onClick",
          type: "(event: MouseEvent | KeyboardEvent) => void",
          description: "Makes the label a button that calls this.",
        },
        {
          name: "onDelete",
          type: "(event: MouseEvent | KeyboardEvent) => void",
          description:
            "Adds a remove button, and Backspace or Delete on the focused chip, that call this.",
        },
        {
          name: "title",
          type: "string",
          description: "A hover hint for the label.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"filled"`,
          description: "How much attention the chip draws.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The theme color the chip uses.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"sm"`,
          description: "Corner rounding.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "Text size and padding. The remove button grows with it, and is 24 pixels or larger from `sm` up.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The chip's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the chip. Your classes override the chip's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The label.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the chip's `<div>`. A native `onclick` there fires for the whole chip, including its remove button; use `onClick` for the chip's own action.",
    },
  ],
};
