import type { ComponentDocs } from "#ui";
import DestructiveExample from "./examples/destructive.svelte";
import destructiveSource from "./examples/destructive.svelte?raw";
import DialogActionsExample from "./examples/dialog-actions.svelte";
import dialogActionsSource from "./examples/dialog-actions.svelte?raw";
import ElementExample from "./examples/element.svelte";
import elementSource from "./examples/element.svelte?raw";
import FormSubmitExample from "./examples/form-submit.svelte";
import formSubmitSource from "./examples/form-submit.svelte?raw";
import IconButtonsExample from "./examples/icon-buttons.svelte";
import iconButtonsSource from "./examples/icon-buttons.svelte?raw";
import LoadingExample from "./examples/loading.svelte";
import loadingSource from "./examples/loading.svelte?raw";
import NavigateExample from "./examples/navigate.svelte";
import navigateSource from "./examples/navigate.svelte?raw";
import PrimaryButtonExample from "./examples/primary-button-example.svelte";
import primaryButtonSource from "./examples/primary-button.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Buttons let people take an action, like saving a form, opening a dialog or deleting an item. Give a button an `href` when navigation should look like a button; for links in text, use a [Link](/links).",
  sections: [
    {
      title: "Choosing a variant",
      description:
        "Variants set how much attention a button draws. Give each view one clearly most important action, and step down in emphasis from there.",
      table: {
        heading: "Variant",
        rows: [
          {
            name: "filled",
            use: "The main action in a view, like Save or Submit. Use one per view.",
          },
          {
            name: "tonal",
            use: "Secondary actions that still need weight, often next to a filled button.",
          },
          {
            name: "elevated",
            use: "Like tonal, with a shadow that separates it from busy or patterned backgrounds.",
          },
          {
            name: "outlined",
            use: "The default. Medium emphasis for actions that matter but aren't the main one.",
          },
          {
            name: "plain",
            use: "Low emphasis with no container until hover. Good for Cancel, toolbars and icon buttons.",
          },
          {
            name: "text",
            use: "The lightest touch: text that fades slightly on hover, for actions inside dense layouts.",
          },
        ],
      },
    },
    {
      title: "Choosing a color",
      description:
        "Colors come from your theme. Most buttons stay primary; reach for the others to separate kinds of actions, not for decoration.",
      table: {
        heading: "Color",
        rows: [
          { name: "primary", use: "The default, for most actions." },
          {
            name: "secondary",
            use: "Less prominent actions, in your theme's secondary color.",
          },
          {
            name: "tertiary",
            use: "Contrasting accents, in your theme's tertiary color.",
          },
          { name: "error", use: "Destructive actions, like Delete." },
          { name: "plain", use: "Uses the surrounding text color." },
          { name: "inherit", use: "Uses the surrounding text color." },
        ],
      },
    },
  ],
  examples: [
    {
      title: "Dialog actions",
      description:
        "Pair one filled button for the action with a plain button to back out.",
      source: dialogActionsSource,
      component: DialogActionsExample,
    },
    {
      title: "Destructive action",
      description: "Use the error color, and say exactly what will be deleted.",
      source: destructiveSource,
      component: DestructiveExample,
    },
    {
      title: "Icon buttons",
      description:
        "Icon-only buttons need a name. A string `tooltip` provides one, and shows it on hover and keyboard focus.",
      source: iconButtonsSource,
      component: IconButtonsExample,
    },
    {
      title: "Submitting a form",
      description:
        'Buttons default to `type="button"`, unlike HTML. Set `type="submit"` on the button that submits a form.',
      source: formSubmitSource,
      component: FormSubmitExample,
    },
    {
      title: "Showing progress",
      description:
        "Compose a `CircularProgress` inside the label. Keeping the button enabled and ignoring repeat presses keeps keyboard focus in place, which disabling it would lose.",
      source: loadingSource,
      component: LoadingExample,
    },
    {
      title: "Navigating",
      description:
        "With an `href`, Button renders a link. Use it for navigation that should stand out, like a call to action. It keeps link semantics: Enter follows it, and it appears in a screen reader's list of links.",
      source: navigateSource,
      component: NavigateExample,
    },
  ],
  accessibility: [
    "Button renders a native `<button>`, so Enter and Space activate it and it works inside forms. With an `href`, it renders a native `<a>` instead.",
    "A focus ring appears for keyboard focus only, not after a mouse click.",
    "`disabled` removes the button from the tab order.",
    "Give every icon-only button a name, with a string `tooltip` or an `aria-label`.",
    "A `tooltip` appears on hover and keyboard focus, and screen readers announce it as the button's description.",
  ],
  api: [
    {
      rows: [
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"outlined"`,
          description: "How much attention the button draws.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The theme color the button uses.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding.",
        },
        {
          name: "href",
          type: "string",
          description:
            "Renders an `<a>` that navigates there, instead of a `<button>`.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          description: "An icon shown before the label.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The row height: 28, 36, 44, 52 or 60 pixels, with text and icon to match. Buttons, inputs and other controls of the same size line up. Icon-only buttons are square.",
        },
        {
          name: "tooltip",
          type: "string | Snippet",
          description:
            "Shown on hover and keyboard focus. A string tooltip also names an icon-only button.",
        },
        {
          name: "type",
          type: `"button" | "submit" | "reset"`,
          default: `"button"`,
          description:
            "Unlike HTML, defaults to `button`. Set `submit` to submit a form. Not used with `href`.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description:
            "Bindable. The rendered `<button>`, or `<a>` with `href`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Strings, arrays or objects, like Svelte's `class` attribute. Your classes override the button's.",
        },
        { name: "children", type: "Snippet", description: "The label." },
      ],
      note: "Every other attribute of the rendered element (`<button>`, or `<a>` with `href`), every event handler and every attachment passes through to it.",
    },
  ],
  advanced: [
    {
      title: "Reaching the element",
      description:
        "Attachments passed to Button reach its `<button>`. Use `{@attach}` to run code with the element, or `bind:el` to keep a reference to it.",
      source: elementSource,
      component: ElementExample,
    },
    {
      title: "Wrapping Button",
      description:
        "To make your own button, spread the remaining props onto Button. Labels, handlers, classes and attachments all pass through, and your defaults can still be overridden.",
      source: primaryButtonSource,
      component: PrimaryButtonExample,
    },
  ],
};
