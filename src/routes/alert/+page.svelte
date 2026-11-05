<script lang="ts">
  import {
    Alert,
    COLORS,
    SHAPES,
    VARIANTS,
    type Color,
    type Shape,
    type Variant,
  } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";

  let variant: Variant = $state("tonal");
  let color: Color = $state("primary");
  let shape: Shape = $state("md");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <Alert {variant} {color} {shape}>
          Your trial ends in 3 days. Add a payment method to keep your projects.
        </Alert>
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
          component="Alert"
          defaults={{ variant: "tonal", color: "primary", shape: "md" }}
          values={{ variant, color, shape }}
          children="Your trial ends in 3 days. Add a payment method to keep your projects."
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
