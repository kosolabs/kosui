<script lang="ts">
  import {
    Switch,
    type SwitchColor,
    type SwitchRadius,
    type SwitchSize,
  } from "$lib";
  import ColorSetting from "$ui/color-setting.svelte";
  import DisabledSetting from "$ui/disabled-setting.svelte";
  import RadiusSetting from "$ui/radius-setting.svelte";
  import SizeSetting from "$ui/size-setting.svelte";
  import Usage from "$ui/usage.svelte";

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
