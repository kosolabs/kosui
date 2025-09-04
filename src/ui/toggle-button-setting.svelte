<script lang="ts">
  import { ToggleButton, ToggleGroup } from "$lib/index.js";
  import { Setting } from "$ui/index.js";

  export type ToggleButtonSettingProps = {
    value: string;
    options: string[];
    label: string;
  };
  let {
    value = $bindable(),
    options,
    label,
  }: ToggleButtonSettingProps = $props();
</script>

<Setting {label}>
  <ToggleGroup id={label} aria-label={label} bind:value>
    {#each options as value (value)}
      <ToggleButton {value}>{value}</ToggleButton>
    {/each}
  </ToggleGroup>
</Setting>
