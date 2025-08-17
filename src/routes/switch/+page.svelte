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

  const code = $derived.by(() => {
    const props = [];

    if (color !== "primary") props.push(`color="${color}"`);
    if (size !== "sm") props.push(`size="${size}"`);
    if (radius !== "xl") props.push(`radius="${radius}"`);
    if (disabled) props.push("disabled");

    const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";

    return [
      `<${"script"} lang="ts">`,
      `  import { Switch } from "kosui";`,
      ``,
      `  let checked: boolean = $state(false);`,
      `</${"script"}>`,
      ``,
      `<Switch bind:checked${propsString} />`,
    ].join("\n");
  });
</script>

<h1 class="text-4xl">Switch</h1>

<Usage {code}>
  {#snippet component()}
    <Switch bind:checked {color} {size} {radius} {disabled} />
  {/snippet}
  {#snippet controls()}
    <ColorSetting bind:color />
    <SizeSetting bind:size />
    <RadiusSetting bind:radius />
    <DisabledSetting bind:disabled />
  {/snippet}
</Usage>
