<script lang="ts">
  import {
    Textarea,
    TEXTAREA_COLORS,
    TEXTAREA_RADII,
    TEXTAREA_SIZES,
    TEXTAREA_VARIANTS,
    ToggleButton,
    ToggleGroup,
    type TextareaColor,
    type TextareaRadius,
    type TextareaSize,
    type TextareaVariant,
  } from "$lib";
  import {} from "$lib/input/input.svelte";
  import Label from "../label.svelte";
  import Usage from "../usage.svelte";

  let variant: TextareaVariant = $state("filled");
  let color: TextareaColor = $state("primary");
  let size: TextareaSize = $state("sm");
  let radius: TextareaRadius = $state("md");
  let disabled: boolean = $state(false);
</script>

<h1 class="text-4xl">Textarea</h1>

<Usage>
  {#snippet component()}
    <Textarea
      {variant}
      {color}
      {size}
      {radius}
      {disabled}
      placeholder="Input component"
    />
  {/snippet}
  {#snippet controls()}
    <Label for="variant">Variant</Label>
    <ToggleGroup id="variant" bind:value={variant}>
      {#each TEXTAREA_VARIANTS as variant (variant)}
        <ToggleButton value={variant}>{variant}</ToggleButton>
      {/each}
    </ToggleGroup>
    <Label for="color">Color</Label>
    <ToggleGroup id="color" bind:value={color}>
      {#each TEXTAREA_COLORS as color (color)}
        <ToggleButton value={color}>{color}</ToggleButton>
      {/each}
    </ToggleGroup>
    <Label for="size">Size</Label>
    <ToggleGroup id="size" bind:value={size}>
      {#each TEXTAREA_SIZES as size (size)}
        <ToggleButton value={size}>{size}</ToggleButton>
      {/each}
    </ToggleGroup>
    <Label for="radius">Radius</Label>
    <ToggleGroup id="radius" bind:value={radius}>
      {#each TEXTAREA_RADII as radius (radius)}
        <ToggleButton value={radius}>{radius}</ToggleButton>
      {/each}
    </ToggleGroup>
    <Label for="disabled">Disabled</Label>
    <ToggleGroup id="disabled" bind:value={disabled}>
      {#each [true, false] as disabled (disabled)}
        <ToggleButton value={disabled}>{disabled}</ToggleButton>
      {/each}
    </ToggleGroup>
  {/snippet}
  {#snippet code()}
    Code
  {/snippet}
</Usage>
