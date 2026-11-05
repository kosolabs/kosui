import type { ComponentDocs } from "#ui";
import FoldersExample from "./examples/folders.svelte";
import foldersSource from "./examples/folders.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Breadcrumbs show where a page sits in a hierarchy, with a link to each level above it.",
  examples: [
    {
      title: "Folders",
      description:
        "A `separator` snippet can hold an icon. Long trails wrap between levels, and levels can share a name.",
      source: foldersSource,
      component: FoldersExample,
    },
  ],
  accessibility: [
    'Breadcrumbs are a navigation landmark named "Breadcrumb", so screen reader users can jump to them. Pass `aria-label` to rename it.',
    "Levels are an ordered list, so screen readers announce how many there are. Separators are hidden from them.",
    'The last crumb is the current page: it\'s marked `aria-current="page"` and shown in the surrounding text color.',
  ],
  api: [
    {
      rows: [
        {
          name: "path",
          type: "{ title: string; href: string }[]",
          description:
            "The levels, from the top of the hierarchy to the current page.",
        },
        {
          name: "separator",
          type: "string | Snippet",
          default: `"›"`,
          description: "Shown between levels, and hidden from screen readers.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description:
            "The links' theme color. The current page uses the surrounding text color.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The breadcrumbs' `<nav>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the `<nav>`.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the `<nav>`.",
    },
  ],
};
