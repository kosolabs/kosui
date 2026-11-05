import type { ComponentDocs } from "#ui";
import RenameExample from "./examples/rename.svelte";
import renameSource from "./examples/rename.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Modals hold a task in front of the page and block the rest of it until the task is done or dismissed. Dialog builds on Modal for common prompts like confirmations.",
  examples: [
    {
      title: "Form in a modal",
      description:
        "Name the modal with `aria-labelledby` pointing at its heading. Focus moves into the modal when it opens, starting at an element with `autofocus`, and returns to the button that opened it when it closes.",
      source: renameSource,
      component: RenameExample,
    },
  ],
  accessibility: [
    "Modal renders a native `<dialog>` opened with `showModal()`, so the rest of the page is inert and focus stays inside it.",
    'Name it with `aria-labelledby` or `aria-label`, or screen readers announce just "dialog".',
    "Escape, a click on the backdrop, and Android's back gesture close it, and focus returns to the element that had it before the modal opened.",
    "While a modal is open, keyboard shortcuts registered on the page don't fire, so they can't act on the page behind it.",
    "Modals don't animate when reduced motion is requested.",
  ],
  api: [
    {
      rows: [
        {
          name: "open",
          type: "boolean",
          default: "false",
          description:
            "Bindable. Whether the modal is showing. Escape and backdrop clicks set it to false.",
        },
        {
          name: "onCancel",
          type: "() => void",
          description:
            "Called when someone dismisses the modal with Escape, the backdrop or the back gesture.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xl"`,
          description: "The corner radius.",
        },
        {
          name: "transition",
          type: "(node: Element) => TransitionConfig",
          default: "a quick zoom",
          description:
            "The Svelte transition for opening and closing. Drawer uses it to slide in.",
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
            "Classes for the dialog box, such as its width. It has Material 3's dialog surface by default.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The modal's content.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the `<dialog>`.",
    },
  ],
};
