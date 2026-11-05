import {
  COLORS,
  SHAPES,
  SIZES,
  VARIANTS,
  type Color,
  type Shape,
  type Size,
  type Variant,
} from "#lib/index.js";
import type { GuidanceRow } from "#ui";
import readme from "../../../README.md?raw";

export const INTRO =
  "Kosui's components speak one design language. A handful of principles decide how each component behaves, and a shared vocabulary of props means the same thing on every component that takes it.";

export const PRINCIPLES = readme
  .split(/^## Design Philosophy$/m)[1]
  .split(/^## /m)[0]
  .trim();

export const VOCABULARY_INTRO =
  'Learn a prop once and it works everywhere. Each component picks its own defaults, but a value like `variant="tonal"` or `size="md"` looks and behaves the same wherever it appears.';

export const ROW_HEIGHTS: Record<Size, { pixels: number; row: string }> = {
  xs: { pixels: 28, row: "h-7" },
  sm: { pixels: 36, row: "h-9" },
  md: { pixels: 44, row: "h-11" },
  lg: { pixels: 52, row: "h-13" },
  xl: { pixels: 60, row: "h-15" },
};

export const SCALES = {
  variant: {
    title: "Variant",
    description: "How much attention a component draws.",
    rows: [
      {
        name: "elevated",
        use: "A container with a shadow, to stand out from busy backgrounds.",
      },
      {
        name: "filled",
        use: "The strongest emphasis, in a solid theme color.",
      },
      {
        name: "tonal",
        use: "A softer container color, for weight without dominating.",
      },
      {
        name: "outlined",
        use: "A thin outline and no fill, for medium emphasis.",
      },
      {
        name: "plain",
        use: "No container until hover, for low emphasis.",
      },
      {
        name: "text",
        use: "Just text, for the lightest touch in dense layouts.",
      },
    ] satisfies GuidanceRow<Variant>[],
  },
  color: {
    title: "Color",
    description: "Which theme color a component uses.",
    rows: [
      { name: "primary", use: "Your theme's main color." },
      {
        name: "secondary",
        use: "Your theme's secondary color, for less prominence.",
      },
      {
        name: "tertiary",
        use: "Your theme's tertiary color, for contrasting accents.",
      },
      { name: "error", use: "Errors and destructive actions." },
      { name: "plain", use: "The surrounding text color." },
      { name: "inherit", use: "The surrounding text color." },
    ] satisfies GuidanceRow<Color>[],
  },
  shape: {
    title: "Shape",
    description:
      "How rounded a component's corners are, on Material 3's shape scale. Each component defaults to the shape Material 3 gives it: buttons are pills, chips are slightly rounded, and text fields are nearly square. For a one-off radius, use `class`.",
    rows: [
      { name: "none", use: "Square corners." },
      { name: "xs", use: "4 pixels, for text fields and menus." },
      { name: "sm", use: "8 pixels, for chips." },
      { name: "md", use: "12 pixels, for cards and alerts." },
      { name: "lg", use: "16 pixels, for Fabs." },
      { name: "xl", use: "28 pixels, for large surfaces like dialogs." },
      {
        name: "full",
        use: "Fully round ends: a pill when there's a label, a circle when the component is square. For buttons, avatars, switches and sliders.",
      },
    ] satisfies GuidanceRow<Shape>[],
  },
  size: {
    title: "Size",
    description:
      "A size is the height of a row. Controls like Button and Fab fill the row, and smaller components like Chip sit inside it, so components of the same size line up. Text and icons grow with the row. Sizes are names, not numbers; for a one-off height, use `class`.",
    rows: SIZES.map((name) => ({
      name,
      use: `A ${ROW_HEIGHTS[name].pixels}-pixel row.`,
    })) satisfies GuidanceRow<Size>[],
  },
};

export const VOCABULARY = [
  {
    prop: "variant",
    values: VARIANTS.join(", "),
    components:
      "Alert, Avatar, Badge, Box, Button, Chip, Fab, Skeleton. Input and Textarea take outlined, filled and plain.",
  },
  {
    prop: "color",
    values: COLORS.join(", "),
    components:
      "Alert, Avatar, Badge, Box, Breadcrumbs, Button, Chip, Circular Progress, Fab, Input, Link, Menu Item, Skeleton, Slider, Switch, Textarea, Toggle Group",
  },
  {
    prop: "shape",
    values: SHAPES.join(", "),
    components:
      "Alert, Avatar, Box, Button, Chip, Dialog, Drawer, Fab, Input, Menu, Modal, Nav Item, Skeleton, Slider, Switch, Textarea, Toggle Group",
  },
  {
    prop: "size",
    values: SIZES.join(", "),
    components:
      "Button, Chip, Circular Progress, Fab, Input, Nav Item, Slider, Switch, Textarea, Toggle Group",
  },
  {
    prop: "underline",
    values: "always, hover, none",
    components: "Link",
  },
];

function table(head: string[], rows: string[][]): string {
  return [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

export const markdown = [
  INTRO,
  "## Principles",
  PRINCIPLES,
  "## Shared vocabulary",
  VOCABULARY_INTRO,
  ...Object.values(SCALES).flatMap((scale) => [
    `### ${scale.title}`,
    scale.description,
    table(
      [scale.title, "Use it for"],
      scale.rows.map((row) => ["`" + row.name + "`", row.use]),
    ),
  ]),
  "### Where each prop appears",
  table(
    ["Prop", "Values", "Components"],
    VOCABULARY.map((row) => ["`" + row.prop + "`", row.values, row.components]),
  ),
].join("\n\n");
