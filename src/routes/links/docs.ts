import type { ComponentDocs } from "#ui";
import ExternalExample from "./examples/external.svelte";
import InTextExample from "./examples/in-text.svelte";
import NavigationExample from "./examples/navigation.svelte";
import externalSource from "./examples/external.svelte?raw";
import inTextSource from "./examples/in-text.svelte?raw";
import navigationSource from "./examples/navigation.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Links take people to another page, or to another place on the same page. To take an action, like saving or deleting, use a [Button](/button) instead.",
  sections: [
    {
      title: "Choosing an underline",
      description:
        "People recognize links by their underline. Keep it wherever links sit in text, and drop it only where something else makes a link obvious.",
      table: {
        heading: "Underline",
        rows: [
          {
            name: "always",
            use: "Links in running text, where the underline is what marks them. The default for text links.",
          },
          {
            name: "hover",
            use: "Navigation, menus and breadcrumbs, where a link's position already marks it.",
          },
          {
            name: "none",
            use: "Links marked by another cue, like an icon or a card around them.",
          },
        ],
      },
    },
    {
      title: "Links that look like buttons",
      description:
        "For navigation that should look like a button, like a call to action, give a [Button](/button) an `href`. It renders a link with all of Button's variants.",
    },
  ],
  examples: [
    {
      title: "Links in text",
      description:
        "The default underline marks links without relying on color alone.",
      source: inTextSource,
      component: InTextExample,
    },
    {
      title: "Navigation",
      description:
        'In navigation, position marks the links, so underline on hover. Mark the current page with `aria-current="page"`, and pass SvelteKit paths through `resolve()`.',
      source: navigationSource,
      component: NavigationExample,
    },
    {
      title: "Opening a new tab",
      description:
        "Say when a link opens a new tab, with an icon for sighted people and hidden text for screen readers.",
      source: externalSource,
      component: ExternalExample,
    },
  ],
  accessibility: [
    "Link renders a native `<a>`, so Enter follows it and it appears in a screen reader's list of links.",
    "Text links are underlined by default, so they don't depend on color alone to stand out from the text around them.",
    "A focus ring appears for keyboard focus only, not after a mouse click.",
    'Write link text that names the destination, like "Svelte docs", rather than "click here".',
    'Say when a link opens a new tab, and mark the current page in navigation with `aria-current="page"`.',
  ],
  api: [
    {
      rows: [
        {
          name: "href",
          type: "string",
          description: "Required. Where the link goes.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The link text.",
        },
        {
          name: "underline",
          type: `"always" | "hover" | "none"`,
          default: `"always"`,
          description:
            "When the link is underlined. Keep `always` for links in text.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The theme color the link uses.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The rendered `<a>` element.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Strings, arrays or objects, like Svelte's `class` attribute. Your classes override the link's.",
        },
      ],
      note: "Every other `<a>` attribute, like `target`, `rel` or `download`, and every event handler and attachment passes through to the element.",
    },
  ],
};
