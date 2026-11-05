import type { ComponentDocs } from "#ui";
import PeopleExample from "./examples/people.svelte";
import SearchExample from "./examples/search.svelte";
import peopleSource from "./examples/people.svelte?raw";
import searchSource from "./examples/search.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Autocomplete suggests values as someone types into a text field. Pass the suggestions that match what's typed as `options`; the list opens while typing and closes when there are none.",
  examples: [
    {
      title: "Objects and custom options",
      description:
        "Options can be any type. `getOptionLabel` turns one into the text that fills the field, and the `option` snippet renders it in the list. `onSelect` receives the chosen option.",
      source: peopleSource,
      component: PeopleExample,
    },
    {
      title: "Search as you type",
      description:
        "Options can come from a server. The list opens when results arrive, and Enter submits the form unless a suggestion is highlighted.",
      source: searchSource,
      component: SearchExample,
    },
  ],
  accessibility: [
    "The field is a `combobox` with `aria-expanded` and `aria-controls` pointing at a `listbox` of options, as in the ARIA combobox pattern. Label it with a `<label>` or `aria-label`.",
    "Focus stays in the field. Down and Up Arrow highlight options, and `aria-activedescendant` tells screen readers which one is highlighted.",
    "Enter or a click chooses the highlighted option, fills the field with its label and closes the list. With nothing highlighted, Enter submits the form.",
    "Escape closes the list without changing the field, and Tab or leaving the field closes it too.",
  ],
  api: [
    {
      rows: [
        {
          name: "options",
          type: "T[]",
          description:
            "The suggestions to show, already filtered by what's typed. The list closes when it's empty.",
        },
        {
          name: "value",
          type: "string",
          default: `""`,
          description:
            "Bindable. The field's text, set to an option's label when it's chosen.",
        },
        {
          name: "getOptionLabel",
          type: "(option: T) => string",
          default: "String",
          description: "The text for an option.",
        },
        {
          name: "option",
          type: "Snippet<[T]>",
          description: "Renders an option in the list. Defaults to its label.",
        },
        {
          name: "onSelect",
          type: "(option: T) => void",
          description: "Called when an option is chosen.",
        },
        {
          name: "el",
          type: "HTMLInputElement",
          description: "Bindable. The `<input>`.",
        },
      ],
      note: "Autocomplete takes every Input prop, like `variant`, `size`, `shape` and `placeholder`, and passes other attributes and event handlers to the `<input>`.",
    },
  ],
};
