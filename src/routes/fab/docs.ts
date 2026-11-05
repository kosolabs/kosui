import type { ComponentDocs } from "#ui";
import PlacementExample from "./examples/placement.svelte";
import placementSource from "./examples/placement.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "A floating action button (Fab) holds the main action on a screen, like creating a task. It's a [Button](/button) with more presence: elevated by default, two sizes larger, and it floats in the bottom corner of its container. Give it a label to make an extended Fab.",
  examples: [
    {
      title: "Placing a Fab",
      description:
        'Make Fab the last child of a scrolling container. It floats in the bottom corner while the content scrolls. Set `clear` so that at the end it sits below the last item instead of covering it, as in this list. To pin it to the window, pass `class="fixed inset-auto right-4 bottom-4"`.',
      source: placementSource,
      component: PlacementExample,
    },
  ],
  accessibility: [
    "Fab renders a native `<button>`, so Enter and Space activate it. With an `href`, it renders a native `<a>` instead.",
    "Give an icon-only Fab a name, with a string `tooltip` or an `aria-label`.",
    "Fab comes after the content it follows, so it's also last in the tab order and reading order of its container.",
  ],
  api: [
    {
      rows: [
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"elevated"`,
          description: "How much attention the Fab draws.",
        },
        {
          name: "clear",
          type: "boolean",
          default: "false",
          description:
            "Make room below the content, so at the end of a scroll the Fab sits below the last item instead of covering it.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"lg"`,
          description:
            "The row height, on Button's scale: 28, 36, 44, 52 or 60 pixels. The default, 52, is two sizes above Button's.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"lg"`,
          description:
            "Corner rounding. The default, 16 pixels, is Material 3's FAB shape.",
        },
      ],
      note: "Fab takes every other Button prop, including `color`, `href`, `icon` and `tooltip`, with the same defaults. Every attribute, event handler and attachment passes through to the rendered element.",
    },
  ],
};
