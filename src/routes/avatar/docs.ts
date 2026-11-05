import type { ComponentDocs } from "#ui";
import WithNameExample from "./examples/with-name.svelte";
import withNameSource from "./examples/with-name.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Avatars show a person's picture, with initials or an icon when there's no picture or it fails to load.",
  examples: [
    {
      title: "Next to a name",
      description:
        "When the person's name is right beside the avatar, leave out `alt` so screen readers don't read the name twice.",
      source: withNameSource,
      component: WithNameExample,
    },
  ],
  accessibility: [
    "With `alt`, the avatar is an image named by it, whether it shows the picture or the fallback.",
    "Without `alt`, the avatar is decorative: the picture is hidden from screen readers, and fallback text is read as text.",
  ],
  api: [
    {
      rows: [
        {
          name: "src",
          type: "string",
          description:
            "The picture's URL. It's cropped to fill the avatar. When it's empty or fails to load, the avatar shows its children.",
        },
        {
          name: "alt",
          type: "string",
          description:
            "The person's name, announced for the picture and the fallback alike.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"tonal"`,
          description: "The fallback's background style.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"secondary"`,
          description: "The theme color the fallback uses.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The avatar's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the avatar. Set its size with a height or size class, like `size-16`; fallback text scales with it.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The fallback, like initials or an icon.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the avatar's `<div>`.",
    },
  ],
};
