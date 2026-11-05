<script lang="ts">
  import {
    Box,
    COLORS,
    SHAPES,
    VARIANTS,
    type Color,
    type Shape,
    type Variant,
  } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";

  let variant: Variant = $state("elevated");
  let color: Color = $state("primary");
  let shape: Shape = $state("md");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
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
  {/snippet}
</DocPage>
