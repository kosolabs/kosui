<script lang="ts">
  import {
    SHAPES,
    Switch,
    type SwitchColor,
    type Shape,
    type SwitchSize,
  } from "#lib/index.js";
  import {
    Code,
    ColorSetting,
    DisabledSetting,
    SizeSetting,
    Playground,
    ToggleButtonSetting,
  } from "#ui";

  let color: SwitchColor = $state("primary");
  let size: SwitchSize = $state("sm");
  let shape: Shape = $state("full");
  let disabled: boolean = $state(false);
  let checked: boolean = $state(false);
</script>

<h1 class="text-4xl">Switch</h1>

<Playground>
  {#snippet component()}
    <Switch bind:checked {color} {size} {shape} {disabled} />
  {/snippet}
  {#snippet controls()}
    <ColorSetting bind:color />
    <SizeSetting bind:size />
    <ToggleButtonSetting
      bind:value={shape}
      options={[...SHAPES]}
      label="Shape"
    />
    <DisabledSetting bind:disabled />
  {/snippet}
  {#snippet code()}
    <Code
      component="Switch"
      bindables={["checked"]}
      defaults={{
        color: "primary",
        size: "sm",
        shape: "full",
        disabled: false,
        checked: false,
      }}
      values={{
        color,
        size,
        shape,
        disabled,
        checked,
      }}
    />
  {/snippet}
</Playground>
