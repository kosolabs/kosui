<script lang="ts">
  import {
    Box,
    COLORS,
    Link,
    SHAPES,
    VARIANTS,
    type Color,
    type Shape,
    type Variant,
  } from "#lib/index.js";
  import { resolve } from "$app/paths";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import CardExample from "./examples/card.svelte";
  import cardSource from "./examples/card.svelte?raw";
  import LabelsExample from "./examples/labels.svelte";
  import labelsSource from "./examples/labels.svelte?raw";

  let variant: Variant = $state("elevated");
  let color: Color = $state("primary");
  let shape: Shape = $state("rounded");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    A Box is a <code>&lt;div&gt;</code> that speaks the
    <Link href={resolve("design-language")}>design language</Link>: it takes
    <code>variant</code>, <code>color</code> and <code>shape</code>, and
    everything else is yours to set with <code>class</code>. Avatar, Chip and
    Skeleton are built on it.
  </p>

  <Playground>
    {#snippet component()}
      <Box {variant} {color} {shape} class="p-4">A box of content</Box>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={variant}
        options={[...VARIANTS]}
        label="Variant"
      />
      <ToggleButtonSetting
        bind:value={color}
        options={[...COLORS]}
        label="Color"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Box"
        defaults={{}}
        values={{ variant, color, shape, class: "p-4" }}
        children="A box of content"
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Card" source={cardSource}>
      {#snippet description()}
        A box that groups content people navigate to can be a landmark: give it <code
          >role="region"</code
        > and name it after its heading.
      {/snippet}
      <CardExample />
    </Example>

    <Example title="Labels" source={labelsSource}>
      {#snippet description()}
        Small boxes make labels. Layout, padding and text size come from
        <code>class</code>.
      {/snippet}
      <LabelsExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        A box is a <code>&lt;div&gt;</code> with no role, so on its own it adds
        nothing for screen readers. Give it a role when it means something, like
        <code>role="region"</code>
        with <code>aria-labelledby</code>.
      </li>
      <li>
        The <code>filled</code> and <code>tonal</code> variants set the text color
        with the background, from your theme's matching "on" color, so text stays
        readable.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          description:
            "The box's container style. Without one, the box has no background or outline.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          description: "The theme color the box uses.",
        },
        {
          name: "shape",
          type: `"square" | "rounded" | "circle"`,
          description: "Corner style.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The box's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description: "Classes for the box. Your classes override the box's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The box's content.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      box's <code>&lt;div&gt;</code>.
    </p>
  </Section>
</div>
