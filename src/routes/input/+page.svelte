<script lang="ts">
  import {
    Input,
    INPUT_COLORS,
    INPUT_RADII,
    INPUT_SIZES,
    INPUT_VARIANTS,
    ToggleButton,
    ToggleGroup,
    type InputColor,
    type InputRadius,
    type InputSize,
    type InputVariant,
  } from "$lib";
  import {} from "$lib/input/input.svelte";
  import Label from "../label.svelte";
  import Usage from "../usage.svelte";

  let variant: InputVariant = $state("filled");
  let color: InputColor = $state("primary");
  let size: InputSize = $state("sm");
  let radius: InputRadius = $state("md");
  let disabled: boolean = $state(false);
</script>

<h1 class="text-4xl">Input</h1>

<Usage>
  {#snippet component()}
    <Input
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
      {#each INPUT_VARIANTS as variant (variant)}
        <ToggleButton value={variant}>{variant}</ToggleButton>
      {/each}
    </ToggleGroup>
    <Label for="color">Color</Label>
    <ToggleGroup id="color" bind:value={color}>
      {#each INPUT_COLORS as color (color)}
        <ToggleButton value={color}>{color}</ToggleButton>
      {/each}
    </ToggleGroup>
    <Label for="size">Size</Label>
    <ToggleGroup id="size" bind:value={size}>
      {#each INPUT_SIZES as size (size)}
        <ToggleButton value={size}>{size}</ToggleButton>
      {/each}
    </ToggleGroup>
    <Label for="radius">Radius</Label>
    <ToggleGroup id="radius" bind:value={radius}>
      {#each INPUT_RADII as radius (radius)}
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
