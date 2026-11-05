import type { ComponentDocs } from "#ui";
import LoadingProfileExample from "./examples/loading-profile.svelte";
import SizedByContentExample from "./examples/sized-by-content.svelte";
import loadingProfileSource from "./examples/loading-profile.svelte?raw";
import sizedByContentSource from "./examples/sized-by-content.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Skeletons stand in for content while it loads, in roughly its shape, so the page doesn't jump when the content arrives.",
  examples: [
    {
      title: "Loading a profile",
      description:
        "Mark the loading region with `aria-busy`, and swap the skeletons for the content when it arrives.",
      source: loadingProfileSource,
      component: LoadingProfileExample,
    },
    {
      title: "Sized by content",
      description:
        "Children set a skeleton's size without being shown or read, so a skeleton can match a button or a heading exactly.",
      source: sizedByContentSource,
      component: SizedByContentExample,
    },
  ],
  accessibility: [
    "Skeletons are hidden from screen readers. Children only set the size; they're invisible and aren't read.",
    'Set `aria-busy="true"` on the region that\'s loading, and `false` once the content is in, so screen readers wait for the real content.',
    "The pulse stops for people who ask for reduced motion in their system settings.",
  ],
  api: [
    {
      rows: [
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xs"`,
          description: "Corner rounding.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          description:
            "A container style in place of the default surface background.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          description: "The theme color a variant uses.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The skeleton's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the skeleton, like its width and height. Without a height, it's one line of text tall.",
        },
        {
          name: "children",
          type: "Snippet",
          description:
            "Content that sets the skeleton's size. It's invisible and isn't read.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the skeleton's `<div>`.",
    },
  ],
};
