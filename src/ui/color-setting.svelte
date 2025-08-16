<script lang="ts">
  import { SWITCH_COLORS, ToggleButton, ToggleGroup, type Color } from "$lib";
  import Setting from "./setting.svelte";

  export type ColorSettingProps = {
    color: Color;
  };
  let { color = $bindable() }: ColorSettingProps = $props();
</script>

<Setting label="color">
  <ToggleGroup id="color" aria-label="color" bind:value={color}>
    {#each SWITCH_COLORS as color (color)}
      <ToggleButton value={color}>{color}</ToggleButton>
    {/each}
  </ToggleGroup>
</Setting>
