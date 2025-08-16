<script lang="ts">
  import {
    Switch,
    type SwitchColor,
    type SwitchRadius,
    type SwitchSize,
  } from "$lib";
  import {
    ColorSetting,
    DisabledSetting,
    RadiusSetting,
    SizeSetting,
    Usage,
  } from "$ui";

  let color: SwitchColor = $state("primary");
  let size: SwitchSize = $state("sm");
  let radius: SwitchRadius = $state("xl");
  let disabled: boolean = $state(false);
  let checked: boolean = $state(false);
</script>

<h1 class="text-4xl">Switch</h1>

<Usage>
  {#snippet component()}
    <Switch bind:checked {color} {size} {radius} {disabled} />
  {/snippet}
  {#snippet controls()}
    <ColorSetting bind:color />
    <SizeSetting bind:size />
    <RadiusSetting bind:radius />
    <DisabledSetting bind:disabled />
  {/snippet}
  {#snippet code()}
    Code
  {/snippet}
</Usage>
