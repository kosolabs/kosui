import type { ComponentDocs } from "#ui";
import FormExample from "./examples/form.svelte";
import SettingsExample from "./examples/settings.svelte";
import formSource from "./examples/form.svelte?raw";
import settingsSource from "./examples/settings.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Switches turn a single setting on or off, and the change takes effect right away.",
  examples: [
    {
      title: "Settings",
      description:
        "Name each switch with a `<label>`, which also toggles it when clicked, and connect any explanation with `aria-describedby`.",
      source: settingsSource,
      component: SettingsExample,
    },
    {
      title: "In a form",
      description:
        "Switch is a checkbox underneath, so it submits its `name` and `value` with a form when it's on, and `required` works too.",
      source: formSource,
      component: FormExample,
    },
  ],
  accessibility: [
    'Switch renders `<input type="checkbox" role="switch">`, so screen readers announce it as a switch that\'s on or off, and Space toggles it.',
    "Give it a name with a `<label>` or `aria-label`.",
    "Off, the edge and thumb contrast at least 3:1 with the page; on, the track fills with the switch's color. The thumb's position shows the state too, so it doesn't rely on color alone.",
    "From `sm` up, a switch is at least 24 pixels tall, the smallest comfortable target.",
  ],
  api: [
    {
      rows: [
        {
          name: "checked",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the switch is on.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description:
            "The color of the track when on. Plain and inherit use the surrounding text color.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The track, 16×28, 24×40, 28×48, 32×52 or 36×60 pixels, sits inside the shared row of the same size.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding, for the track and its thumb.",
        },
        {
          name: "el",
          type: "HTMLInputElement",
          description: "Bindable. The `<input>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the switch. Your classes override the switch's.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the `<input>`, including `name`, `value`, `required`, `disabled` and `onchange`.",
    },
  ],
};
