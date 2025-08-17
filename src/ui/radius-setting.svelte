<script lang="ts">
  import { RADII, ToggleButton, ToggleGroup, type Radius } from "$lib/index.js";
  import { Setting } from "$ui/index.js";

  export type RadiusSettingProps = {
    radius: Radius;
    radiiOptions?: readonly Radius[];
  };
  let { radius = $bindable(), radiiOptions = RADII }: RadiusSettingProps =
    $props();
</script>

<Setting label="radius">
  <ToggleGroup id="radius" aria-label="radius" bind:value={radius}>
    {#each radiiOptions as radius (radius)}
      <ToggleButton value={radius}>{radius}</ToggleButton>
    {/each}
  </ToggleGroup>
</Setting>
