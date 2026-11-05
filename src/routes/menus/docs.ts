import type { ComponentDocs } from "#ui";
import ActionsExample from "./examples/actions.svelte";
import IconTriggerExample from "./examples/icon-trigger.svelte";
import ViewOptionsExample from "./examples/view-options.svelte";
import actionsSource from "./examples/actions.svelte?raw";
import iconTriggerSource from "./examples/icon-trigger.svelte?raw";
import viewOptionsSource from "./examples/view-options.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Menus offer a list of actions or choices from a button. Pass the button as the `trigger` snippet and the items as children.",
  examples: [
    {
      title: "Checkable items and groups",
      description:
        "A `checked` item shows a check mark and tells screen readers whether it's on. `MenuGroup` labels a set of items, and `MenuDivider` separates groups.",
      source: viewOptionsSource,
      component: ViewOptionsExample,
    },
    {
      title: "Icon button trigger",
      description:
        "The `trigger` snippet receives props to spread on any button, including an icon button named by its tooltip. Disabled items are skipped by the arrow keys.",
      source: iconTriggerSource,
      component: IconTriggerExample,
    },
    {
      title: "From actions",
      description:
        "`MenuActions` builds items from the same `Action` objects as the command palette, grouped by category, with their shortcuts and a check mark for selected actions.",
      source: actionsSource,
      component: ActionsExample,
    },
  ],
  accessibility: [
    "The trigger gets `aria-haspopup` and `aria-expanded`, and the menu is named by the trigger. Give an icon-only trigger a name, for example with a tooltip.",
    "Enter, Space or Down Arrow on the trigger opens the menu on its first item, and Up Arrow on its last. A click opens it with focus on the menu, ready for the arrow keys.",
    "In the menu, the arrow keys, Home and End move between items, skipping disabled ones, and typing a letter jumps to the next item that starts with it. Enter or Space chooses an item.",
    "Escape closes the menu and returns focus to the trigger, and Tab closes it and moves on, as in the ARIA menu button pattern.",
    "Checked items are `menuitemcheckbox` with `aria-checked`, and a `MenuGroup` is a `group` labelled by its heading.",
  ],
  api: [
    {
      name: "Menu",
      rows: [
        {
          name: "trigger",
          type: "Snippet<[MenuTriggerProps]>",
          description:
            "The button that opens the menu. Spread the props it receives onto it.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "Menu items, groups and dividers.",
        },
        {
          name: "open",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the menu is showing.",
        },
        {
          name: "placement",
          type: `"top" | "right" | "bottom" | "left", optionally with "-start" or "-end"`,
          default: `"bottom-start"`,
          description:
            "Where the menu sits next to the trigger. It flips when there isn't room.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xs"`,
          description: "The corner radius.",
        },
        {
          name: "el",
          type: "HTMLDivElement",
          description: "Bindable. The menu element.",
        },
      ],
    },
    {
      name: "MenuItem",
      rows: [
        {
          name: "onSelect",
          type: "() => void",
          description:
            "Called when the item is chosen, after the menu closes and focus returns to the trigger.",
        },
        {
          name: "checked",
          type: "boolean",
          description:
            "Makes the item checkable, with a check mark when true. Leave it out for plain items.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"plain"`,
          description: "The text color. Use error for destructive actions.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Shows the item but can't be chosen or focused.",
        },
        {
          name: "el",
          type: "HTMLButtonElement",
          description: "Bindable. The item's `<button>`.",
        },
      ],
    },
    {
      name: "MenuGroup, MenuDivider and MenuActions",
      rows: [
        {
          name: "MenuGroup label",
          type: "string",
          description: "The heading shown above the group, which names it.",
        },
        {
          name: "MenuDivider",
          type: "HTMLAttributes<HTMLHRElement>",
          description: "A separator line between items or groups.",
        },
        {
          name: "MenuActions actions",
          type: "Action[]",
          description:
            "Renders a group of items for each category, in order, with dividers between them.",
        },
      ],
      note: "Other attributes and event handlers pass through to each component's element: the menu, the item's `<button>`, the group or the `<hr>`.",
    },
  ],
};
