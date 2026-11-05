import type { ComponentDocs } from "#ui";
import PageActionsExample from "./examples/page-actions.svelte";
import pageActionsSource from "./examples/page-actions.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "A command palette searches every action in the app and runs one from the keyboard. Register `Action`s in a `Registry`, and `CommandPalette` lists them and runs their keyboard shortcuts.",
  examples: [
    {
      title: "Registering actions",
      description:
        "`register` returns a function that unregisters, so return it from an `$effect` to offer an action only while a component or condition is active. Create one `Registry` for the app and share it through context.",
      source: pageActionsSource,
      component: PageActionsExample,
    },
  ],
  accessibility: [
    "The palette is a modal dialog named by `label`. Its search field is a `combobox` that controls a `listbox` of actions, and the first match is highlighted.",
    "Down and Up Arrow move the highlight and wrap, Enter or a click runs it, and Escape closes the palette and returns focus to where it was.",
    "Actions with a `selected` state show a check mark and set `aria-checked`. Disabled actions are left out.",
    "Shortcuts without Ctrl, Alt or Command don't run while someone is typing in a text field, so a shortcut like `?` doesn't interrupt typing.",
  ],
  api: [
    {
      name: "CommandPalette",
      rows: [
        {
          name: "registry",
          type: "Registry",
          description:
            "The actions to list. Their shortcuts run whenever the palette is mounted.",
        },
        {
          name: "open",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the palette is showing.",
        },
        {
          name: "query",
          type: "string",
          default: `""`,
          description:
            "Bindable. The search text, cleared when the palette closes.",
        },
        {
          name: "label",
          type: "string",
          default: `"Command palette"`,
          description: "The dialog's accessible name.",
        },
        {
          name: "placeholder",
          type: "string",
          default: `"Search commands"`,
          description: "The search field's placeholder and name.",
        },
      ],
    },
    {
      name: "Action",
      rows: [
        { name: "id", type: "string", description: "Unique id." },
        {
          name: "callback",
          type: "() => void",
          description: "Runs the action, after the palette closes.",
        },
        {
          name: "name",
          type: "string",
          default: "id",
          description: "The label in the palette and menus.",
        },
        {
          name: "category",
          type: "string",
          description:
            "Shown before the name, matched by search, and used to group MenuActions.",
        },
        {
          name: "description",
          type: "string",
          default: "name",
          description: "Matched by search and shown as a tooltip.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          default: "CircleSlash",
          description: "Shown before the name.",
        },
        {
          name: "shortcut",
          type: "Shortcut",
          description: "A key combination that runs the action.",
        },
        {
          name: "enabled",
          type: "() => boolean",
          description: "When false, the action is hidden and its shortcut off.",
        },
        {
          name: "selected",
          type: "() => boolean",
          description: "Makes the action checkable, with a check when true.",
        },
      ],
    },
    {
      name: "Registry",
      rows: [
        {
          name: "register",
          type: "(...actions: Action[]) => () => void",
          description:
            "Adds actions and returns a function that removes them. Ids and shortcuts must be unique.",
        },
        {
          name: "unregister",
          type: "(...actions: Action[]) => void",
          description: "Removes actions.",
        },
        {
          name: "call",
          type: "(id: string) => void",
          description: "Runs an action by id.",
        },
        {
          name: "actions",
          type: "Action[]",
          description: "Every registered action, newest first.",
        },
      ],
    },
  ],
};
