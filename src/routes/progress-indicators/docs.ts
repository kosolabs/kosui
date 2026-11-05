import type { ComponentDocs } from "#ui";
import UploadExample from "./examples/upload.svelte";
import WithMessageExample from "./examples/with-message.svelte";
import uploadSource from "./examples/upload.svelte?raw";
import withMessageSource from "./examples/with-message.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Circular progress shows that something is loading: how far along it is when you know, or a spinner when you don't.",
  examples: [
    {
      title: "Upload",
      description:
        "Name the ring after what's loading, and show the percentage inside it.",
      source: uploadSource,
      component: UploadExample,
    },
    {
      title: "Next to a message",
      description:
        'When text already says what\'s happening, hide the spinner from screen readers and put the text in a `role="status"` region.',
      source: withMessageSource,
      component: WithMessageExample,
    },
  ],
  accessibility: [
    'The ring is a progress bar named "Loading". Pass `aria-label` to say what\'s loading.',
    "With `progress`, screen readers announce its value as a percentage. A spinner has no value.",
    "When nearby text says what's loading, pass `aria-hidden=\"true\"` so it isn't announced twice. Inside a button, this keeps the spinner out of the button's name.",
  ],
  api: [
    {
      rows: [
        {
          name: "progress",
          type: "number",
          description:
            "How far along it is, from 0 to 1. Leave it out for a spinner.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "16, 24, 32, 40 or 48 pixels, to fit inside a row of the same size. For a larger ring, use a size class, like `size-24`.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description:
            "The theme color of the ring, its track and its text. Use inherit inside buttons.",
        },
        {
          name: "aria-label",
          type: "string",
          default: `"Loading"`,
          description: "What's loading, for screen readers.",
        },
        {
          name: "el",
          type: "SVGSVGElement",
          description: "Bindable. The ring's `<svg>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the ring. Your classes override its own.",
        },
        {
          name: "children",
          type: "Snippet",
          description:
            "Text in the middle, like a percentage. Screen readers announce the value instead.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the ring's `<svg>`.",
    },
  ],
};
