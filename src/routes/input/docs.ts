import type { ComponentDocs } from "#ui";
import CheckedByAppExample from "./examples/checked-by-app.svelte";
import FormFieldExample from "./examples/form-field.svelte";
import SearchExample from "./examples/search.svelte";
import checkedByAppSource from "./examples/checked-by-app.svelte?raw";
import formFieldSource from "./examples/form-field.svelte?raw";
import searchSource from "./examples/search.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Inputs let people type a single line of text, like a name, an email address or a search.",
  examples: [
    {
      title: "Form field",
      description:
        'Name an input with a `<label>`, and connect a hint with `aria-describedby`. Native validation, like `required` and `type="email"`, shows in the error color once someone has edited the field or tried to submit.',
      source: formFieldSource,
      component: FormFieldExample,
    },
    {
      title: "Checked by your app",
      description:
        'For errors your app finds, like a username that\'s taken, set `aria-invalid="true"` and point `aria-describedby` at the message.',
      source: checkedByAppSource,
      component: CheckedByAppExample,
    },
    {
      title: "Search",
      description:
        "Without a visible label, name the input with `aria-label`. A placeholder isn't a name: it disappears as soon as someone types.",
      source: searchSource,
      component: SearchExample,
    },
  ],
  accessibility: [
    "Input renders a native `<input>`. Give it a name with a `<label>` or `aria-label`; a placeholder isn't one.",
    "Focus draws a 2-pixel outline in the input's color, in every variant and color.",
    "At rest, the outlined variant's outline and the filled variant's bottom line contrast at least 3:1 with the input's background.",
    'Invalid inputs turn the error color: after someone edits a field that fails native validation, or whenever `aria-invalid` is `"true"`. Describe the error in text too, and connect it with `aria-describedby`.',
  ],
  api: [
    {
      rows: [
        {
          name: "value",
          type: "string | number",
          description: "Bindable. The input's value.",
        },
        {
          name: "variant",
          type: `"outlined" | "filled" | "plain"`,
          default: `"outlined"`,
          description:
            "An outline, a fill with a bottom line, or no container for inputs that sit in their own surface.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The color of the focus outline.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The row height: 28, 36, 44, 52 or 60 pixels, with text to match. Inputs line up with buttons of the same size.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xs"`,
          description: "Corner rounding.",
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
            "Classes for the input. Your classes override the input's.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the `<input>`, including `type`, `required`, `disabled` and `autocomplete`.",
    },
  ],
};
