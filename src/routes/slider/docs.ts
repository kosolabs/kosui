import type { ComponentDocs } from "#ui";
import EffortExample from "./examples/effort.svelte";
import VolumeExample from "./examples/volume.svelte";
import effortSource from "./examples/effort.svelte?raw";
import volumeSource from "./examples/volume.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Sliders let people pick a number from a range by dragging, like a volume or a price limit.",
  examples: [
    {
      title: "Volume",
      description:
        "Name a slider with `aria-label` or a `<label>`. Use `oninput` to follow the value as it moves and `onchange` to act when someone lets go.",
      source: volumeSource,
      component: VolumeExample,
    },
    {
      title: "Steps with marks",
      description:
        "A `step` and labeled `marks` turn a slider into a short scale. `format` gives each value a name, which screen readers announce instead of the number.",
      source: effortSource,
      component: EffortExample,
    },
  ],
  accessibility: [
    'Slider renders a native `<input type="range">`. Arrow keys move it by a step, Page Up and Page Down by larger jumps, and Home and End to the ends.',
    'Give it a name with a `<label>` or `aria-label`. `format` also sets `aria-valuetext`, so screen readers announce "40%" or "Medium" rather than a bare number.',
    "The thumb and filled track use the slider's color, including plain and inherit, and keyboard focus draws an outline around the thumb.",
    "Marks and the value label are decoration; the input's value text carries their meaning.",
  ],
  api: [
    {
      rows: [
        {
          name: "value",
          type: "number",
          description:
            "Bindable. The chosen number. Without one, a slider starts in the middle, as a native range input does.",
        },
        {
          name: "min",
          type: "number",
          default: "0",
          description: "The smallest value.",
        },
        {
          name: "max",
          type: "number",
          default: "100",
          description: "The largest value.",
        },
        {
          name: "step",
          type: `number | "any"`,
          default: "1",
          description: "The increment between values.",
        },
        {
          name: "marks",
          type: "{ value: number; label?: string }[]",
          description: "Dots on the track, with optional labels below.",
        },
        {
          name: "format",
          type: "(value: number) => string",
          description:
            "Turns the value into text for the value label and for screen readers.",
        },
        {
          name: "showValue",
          type: "boolean",
          default: "false",
          description:
            "Always show the value label. Otherwise it shows while someone hovers, drags or focuses the slider with the keyboard.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The color of the thumb and the filled track.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The thumb, 12 to 28 pixels, on an input 20 to 36 pixels tall that sits inside the shared row.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding, for the track and the thumb.",
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
            "Classes for the slider's wrapper, which also holds the marks and value label. Use it to set the width.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the `<input>`, including `name`, `disabled`, `oninput` and `onchange`.",
    },
  ],
};
