import type { ComponentDocs } from "#ui";
import AlignmentExample from "./examples/alignment.svelte";
import EqualWidthsExample from "./examples/equal-widths.svelte";
import FormExample from "./examples/form.svelte";
import ThemeExample from "./examples/theme.svelte";
import alignmentSource from "./examples/alignment.svelte?raw";
import equalWidthsSource from "./examples/equal-widths.svelte?raw";
import formSource from "./examples/form.svelte?raw";
import themeSource from "./examples/theme.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Toggle groups let people pick one of a few options, like a view or a mode, from a row of connected buttons.",
  examples: [
    {
      title: "Icons and labels",
      description:
        "Buttons take any content. Name the group with `aria-label`, and use `onChange` to act on a choice as it's made.",
      source: themeSource,
      component: ThemeExample,
    },
    {
      title: "Icons only",
      description:
        "Without visible text, name each button with `aria-label`; a `title` adds a hover hint.",
      source: alignmentSource,
      component: AlignmentExample,
    },
    {
      title: "Equal widths",
      description:
        "Buttons are as wide as their content. To make them all as wide as the widest, give the group `inline-grid auto-cols-fr grid-flow-col`; with `grid` and a width instead, they share the width equally.",
      source: equalWidthsSource,
      component: EqualWidthsExample,
    },
    {
      title: "In a form",
      description:
        "With a `name`, the group submits its value with a form, like radio buttons.",
      source: formSource,
      component: FormExample,
    },
  ],
  accessibility: [
    "A toggle group is a `radiogroup` of native radio buttons. Tab moves into the group once, onto the chosen button, and the arrow keys move between buttons and choose them.",
    "Name the group with `aria-label` or `aria-labelledby`. A button is named by its content, or by its own `aria-label` when it shows only an icon.",
    "The chosen button fills with the group's color. In plain and inherit, it's tinted and outlined with a thicker edge in the text color.",
    "Focus draws a 2-pixel outline in the group's color, above the neighboring buttons.",
  ],
  api: [
    {
      name: "ToggleGroup",
      rows: [
        {
          name: "value",
          type: "T",
          description: "Bindable. The chosen button's value.",
        },
        {
          name: "onChange",
          type: "(value: T) => void",
          description: "Called when someone chooses a button.",
        },
        {
          name: "name",
          type: "string",
          description:
            "The name the value submits under in a form. Without it, the group has a generated name.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The color of the edges, the chosen button and focus.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The row height: 28, 36, 44, 52 or 60 pixels, the same as a Button of that size.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding at the group's two ends.",
        },
        {
          name: "el",
          type: "HTMLDivElement",
          description: "Bindable. The group's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the group.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the group's `<div>`.",
    },
    {
      name: "ToggleButton",
      rows: [
        {
          name: "value",
          type: "T",
          description: "The value the group takes when this button is chosen.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The button's content.",
        },
        {
          name: "el",
          type: "HTMLInputElement",
          description: "Bindable. The button's radio `<input>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the visible button, a `<label>` around the radio. Your classes override the button's.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the radio `<input>`, including `disabled`, `aria-label` and `title`.",
    },
  ],
};
