import type { ComponentDocs } from "#ui";
import ChooseExample from "./examples/choose.svelte";
import HelpersExample from "./examples/helpers.svelte";
import NestedExample from "./examples/nested.svelte";
import chooseSource from "./examples/choose.svelte?raw";
import helpersSource from "./examples/helpers.svelte?raw";
import nestedSource from "./examples/nested.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Dialogs ask a question or confirm an action before the page continues. Each has a title, a message and a row of actions. Call `getDialogs()` for an alert, a confirmation or a prompt, or render a `Dialog` for anything else.",
  examples: [
    {
      title: "Alert, confirm and prompt",
      description:
        "Put `<DialogProvider>` around your app once, in the root `+layout.svelte`. Then `getDialogs()` returns `alert`, `confirm` and `prompt`, which work like the browser's own and return a promise with the answer.",
      source: helpersSource,
      component: HelpersExample,
    },
    {
      title: "Choose between options",
      description:
        "`show` takes any list of actions and resolves with the value of the one chosen, or `undefined` if the dialog is dismissed.",
      source: chooseSource,
      component: ChooseExample,
    },
    {
      title: "Dialog with a form",
      description:
        "A `Dialog` can hold a form, with its submit button among the actions. Here, cancelling with unsaved changes asks for confirmation in a second dialog on top of the first.",
      source: nestedSource,
      component: NestedExample,
    },
  ],
  accessibility: [
    "The `title` renders as a heading and names the dialog. Give a dialog without a title an `aria-label`. Alerts, confirmations and prompts also use their message as the description.",
    "Focus moves to the action marked as the default, or the first field or action, and returns to the button that opened the dialog when it closes, even when dialogs close together.",
    "Escape, a click on the backdrop, and Android's back gesture dismiss a dialog: `onSelect` gets `undefined`, `confirm` resolves `false`, and `prompt` resolves `undefined`.",
    "A prompt's field is a form: Enter submits it, and its validation, like `required`, applies.",
    "Dialog is built on Modal, so the page behind it is inert and nothing animates when reduced motion is requested.",
  ],
  api: [
    {
      name: "Dialog",
      rows: [
        {
          name: "open",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the dialog is showing.",
        },
        {
          name: "title",
          type: "string",
          description: "The heading, which also names the dialog.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          description: "An icon above the title, which centers the title.",
        },
        {
          name: "actions",
          type: "Snippet<[select: (value: T | undefined) => void]>",
          description:
            "The buttons along the bottom. Call select to close the dialog with a value.",
        },
        {
          name: "onSelect",
          type: "(value: T | undefined) => void",
          description:
            "Called when the dialog closes through select, or with undefined when it's dismissed.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xl"`,
          description: "The corner radius.",
        },
        {
          name: "el",
          type: "HTMLDialogElement",
          description: "Bindable. The `<dialog>`.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The message or other content.",
        },
      ],
      note: "Every other Modal prop, attribute and event handler passes through to the `<dialog>`.",
    },
    {
      name: "getDialogs()",
      description:
        "Each method takes an `icon`, a `title` and a `message` (a string or snippet), plus the options below. A request made while a dialog is showing waits for it to close.",
      rows: [
        {
          name: "alert",
          type: "({ acceptText? }) => Promise<void>",
          description: "Shows a message with an OK button.",
        },
        {
          name: "confirm",
          type: "({ cancelText?, acceptText? }) => Promise<boolean>",
          description:
            "Asks to go ahead. Resolves true for OK, false for Cancel or dismissal.",
        },
        {
          name: "prompt",
          type: "({ input?, cancelText?, acceptText? }) => Promise<string | undefined>",
          description:
            "Asks for a value. input takes Input props, like value, type and required. Resolves undefined when cancelled.",
        },
        {
          name: "show",
          type: "<T>({ actions: DialogAction<T>[] }) => Promise<T | undefined>",
          description:
            "Offers any actions, each { text, value, default?, variant?, color?, shape? }. default gives it focus.",
        },
      ],
    },
  ],
};
