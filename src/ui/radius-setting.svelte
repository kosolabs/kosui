<script lang="ts">
  import { RADII, Slider, type Radius } from "$lib/index.js";
  import { Setting } from "$ui/index.js";

  export type RadiusSettingProps = {
    radius: Radius;
    radii?: readonly Radius[];
  };
  let { radius = $bindable(), radii: radii = RADII }: RadiusSettingProps =
    $props();

  const v2r: Record<number, Radius> = Object.fromEntries(
    radii.map((radius, index) => [index, radius]),
  );
  const r2v: Record<Radius, number> = Object.fromEntries(
    radii.map((radius, index) => [radius, index]),
  ) as Record<Radius, number>;
</script>

<Setting label="radius">
  <Slider
    bind:value={() => r2v[radius], (v) => (radius = v2r[v])}
    max={6}
    marks={radii.map((label, value) => ({ label, value }))}
    label={(value) => v2r[value]}
    restrictToMarks
  />
</Setting>
