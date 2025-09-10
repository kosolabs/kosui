<script lang="ts">
  import {
    Switch,
    type SwitchColor,
    type SwitchRadius,
    type SwitchSize,
  } from "$lib/index.js";
  import {
    Code,
    ColorSetting,
    DisabledSetting,
    RadiusSetting,
    SizeSetting,
    Usage,
  } from "$ui/index.js";

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
    <Code
      component="Switch"
      bindables={["checked"]}
      defaults={{
        color: "primary",
        size: "sm",
        radius: "xl",
        disabled: false,
        checked: false,
      }}
      values={{
        color,
        size,
        radius,
        disabled,
        checked,
      }}
    />
  {/snippet}
</Usage>
