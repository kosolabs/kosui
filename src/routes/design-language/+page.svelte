<script lang="ts">
  import {
    Avatar,
    Button,
    Chip,
    COLORS,
    Markdown,
    SHAPES,
    SIZES,
    VARIANTS,
    type Color,
    type Shape,
    type Size,
    type Variant,
  } from "#lib/index.js";
  import { GuidanceTable, Section, type GuidanceRow } from "#ui";
  import { Plus } from "@lucide/svelte";
  import readme from "../../../README.md?raw";

  const principles = readme
    .split(/^## Design Philosophy$/m)[1]
    .split(/^## /m)[0]
    .trim();

  const VARIANT_GUIDANCE: GuidanceRow<Variant>[] = [
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
  ];

  const COLOR_GUIDANCE: GuidanceRow<Color>[] = [
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
  ];

  const SHAPE_GUIDANCE: GuidanceRow<Shape>[] = [
    { name: "square", use: "Square corners." },
    { name: "rounded", use: "Slightly rounded corners." },
    {
      name: "circle",
      use: "Fully round ends: a pill when there's a label, a circle when the component is square.",
    },
  ];

  const ROW_HEIGHTS: Record<Size, { pixels: number; row: string }> = {
    xs: { pixels: 28, row: "h-7" },
    sm: { pixels: 36, row: "h-9" },
    md: { pixels: 44, row: "h-11" },
    lg: { pixels: 52, row: "h-13" },
    xl: { pixels: 60, row: "h-15" },
  };
  const SIZE_GUIDANCE: GuidanceRow<Size>[] = SIZES.map((name) => ({
    name,
    use: `A ${ROW_HEIGHTS[name].pixels}-pixel row.`,
  }));

  const VOCABULARY = [
    {
      prop: "variant",
      values: VARIANTS.join(", "),
      components:
        "Avatar, Badge, Box, Button, Chip, Fab, Menu, Skeleton. Input and Textarea take outlined, filled and inherit; Alert takes filled, tonal and plain.",
    },
    {
      prop: "color",
      values: COLORS.join(", "),
      components:
        "Alert, Avatar, Badge, Box, Button, Chip, Fab, Input, Link, Menu, Skeleton, Slider, Switch, Textarea",
    },
    {
      prop: "shape",
      values: SHAPES.join(", "),
      components: "Avatar, Box, Button, Chip, Fab, Menu, Skeleton",
    },
    {
      prop: "size",
      values: SIZES.join(", "),
      components: "Button, Chip, Fab, Input, Slider, Switch, Textarea",
    },
    {
      prop: "radius",
      values: "none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full",
      components: "Alert, Input, Slider, Switch, Textarea",
    },
    {
      prop: "underline",
      values: "always, hover, none",
      components: "Link",
    },
  ];
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Kosui's components speak one design language. A handful of principles decide
    how each component behaves, and a shared vocabulary of props means the same
    thing on every component that takes it.
  </p>

  <Section title="Principles">
    <div class="flex max-w-prose flex-col gap-3">
      <Markdown value={principles} />
    </div>
  </Section>

  <Section title="Shared vocabulary">
    <p class="max-w-prose">
      Learn a prop once and it works everywhere. Each component picks its own
      defaults, but a value like <code>variant="tonal"</code> or
      <code>size="md"</code> looks and behaves the same wherever it appears.
    </p>

    <h3 class="text-xl font-light">Variant</h3>
    <p class="max-w-prose">How much attention a component draws.</p>
    <GuidanceTable heading="Variant" rows={VARIANT_GUIDANCE}>
      {#snippet example(variant)}
        <div class="flex items-center gap-2">
          <Button {variant}>Save</Button>
          <Chip {variant}>Design</Chip>
        </div>
      {/snippet}
    </GuidanceTable>

    <h3 class="text-xl font-light">Color</h3>
    <p class="max-w-prose">Which theme color a component uses.</p>
    <GuidanceTable heading="Color" rows={COLOR_GUIDANCE}>
      {#snippet example(color)}
        <div class="flex items-center gap-2">
          <Button {color}>Save</Button>
          <Chip {color} variant="tonal">Design</Chip>
        </div>
      {/snippet}
    </GuidanceTable>

    <h3 class="text-xl font-light">Shape</h3>
    <p class="max-w-prose">The style of a component's corners.</p>
    <GuidanceTable heading="Shape" rows={SHAPE_GUIDANCE}>
      {#snippet example(shape)}
        <div class="flex items-center gap-2">
          <Button {shape}>Save</Button>
          <Button {shape} icon={Plus} aria-label="Add" />
          <Chip {shape}>Design</Chip>
          <Avatar {shape}>AL</Avatar>
        </div>
      {/snippet}
    </GuidanceTable>

    <h3 class="text-xl font-light">Size</h3>
    <p class="max-w-prose">
      A size is the height of a row. Controls like Button and Fab fill the row,
      and smaller components like Chip sit inside it, so components of the same
      size line up. Text and icons grow with the row. Sizes are names, not
      numbers; for a one-off height, use <code>class</code>.
    </p>
    <GuidanceTable heading="Size" rows={SIZE_GUIDANCE}>
      {#snippet example(size)}
        <div
          class={[
            "flex items-center gap-2 rounded-md bg-m3-surface-container",
            ROW_HEIGHTS[size].row,
          ]}
        >
          <Button {size}>Save</Button>
          <Button {size} icon={Plus} aria-label="Add" />
          <Chip {size}>Design</Chip>
        </div>
      {/snippet}
    </GuidanceTable>

    <h3 class="text-xl font-light">Where each prop appears</h3>
    <div class="overflow-x-auto rounded-md border">
      <table class="w-full text-left text-sm">
        <thead class="bg-m3-surface-container">
          <tr>
            <th class="p-3 font-medium">Prop</th>
            <th class="p-3 font-medium">Values</th>
            <th class="p-3 font-medium">Components</th>
          </tr>
        </thead>
        <tbody>
          {#each VOCABULARY as row (row.prop)}
            <tr class="border-t">
              <td class="p-3"><code>{row.prop}</code></td>
              <td class="min-w-48 p-3">{row.values}</td>
              <td class="min-w-64 p-3">{row.components}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Section>
</div>
