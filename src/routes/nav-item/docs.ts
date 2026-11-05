import type { ComponentDocs } from "#ui";
import CountsExample from "./examples/counts.svelte";
import GroupsExample from "./examples/groups.svelte";
import countsSource from "./examples/counts.svelte?raw";
import groupsSource from "./examples/groups.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Nav items are the links in a navigation list, like a sidebar or a [Drawer](/drawer). The current page gets a filled indicator. `NavGroup` labels a group of them.",
  examples: [
    {
      title: "Groups",
      description:
        "`NavGroup` puts a label above related items and names the group for screen readers.",
      source: groupsSource,
      component: GroupsExample,
    },
    {
      title: "Counts",
      description:
        "Children can hold more than a label. Push a count to the end with `ml-auto`, and add visually hidden text so it reads as more than a number.",
      source: countsSource,
      component: CountsExample,
    },
  ],
  accessibility: [
    "Put nav items in a `<nav>` with an `aria-label`, so screen readers list it as a navigation landmark.",
    'The current item gets `aria-current="page"`, which screen readers announce, as well as the filled indicator.',
    "A `NavGroup` is a `group` named by its label. Icons are decorative.",
  ],
  api: [
    {
      name: "NavItem",
      rows: [
        { name: "href", type: "string", description: "Where the item links." },
        {
          name: "current",
          type: "boolean",
          default: "false",
          description:
            "Whether the item is the current page. In SvelteKit, compare href with page.url.pathname.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          description: "An icon before the label.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"md"`,
          description: "The item's height, from the shared size scale.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "The corner radius of the indicator.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The `<a>`.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The label, and anything after it.",
        },
      ],
      note: "Other attributes pass through to the `<a>`.",
    },
    {
      name: "NavGroup",
      rows: [
        { name: "label", type: "string", description: "The group's label." },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The group's `<div>`.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The group's nav items.",
        },
      ],
    },
  ],
};
