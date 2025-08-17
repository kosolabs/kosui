<script lang="ts">
  import {
    SWITCH_SIZES,
    ToggleButton,
    ToggleGroup,
    type Size,
  } from "$lib/index.js";
  import { Setting } from "$ui/index.js";

  export type SizeSettingProps = {
    size: Size;
  };
  let { size = $bindable() }: SizeSettingProps = $props();
</script>

<Setting label="size">
  <ToggleGroup id="size" aria-label="size" bind:value={size}>
    {#each SWITCH_SIZES as size (size)}
      <ToggleButton value={size}>{size}</ToggleButton>
    {/each}
  </ToggleGroup>
</Setting>
