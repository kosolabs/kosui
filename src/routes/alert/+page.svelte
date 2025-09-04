<script lang="ts">
  import {
    Alert,
    ALERT_VARIANT,
    type AlertColor,
    type AlertElevated,
    type AlertOutlined,
    type AlertRadius,
    type AlertVariant,
  } from "$lib/index.js";
  import {
    ColorSetting,
    RadiusSetting,
    SwitchSetting,
    ToggleButtonSetting,
    Usage,
  } from "$ui";

  let variant: AlertVariant = $state("tonal");
  let color: AlertColor = $state("primary");
  let radius: AlertRadius = $state("sm");
  let outlined: AlertOutlined = $state(false);
  let elevated: AlertElevated = $state(false);

  const code = $derived.by(() => {
    const props = [];

    if (variant !== "tonal") props.push(`variant="${variant}"`);
    if (color !== "primary") props.push(`color="${color}"`);
    if (radius !== "sm") props.push(`radius="${radius}"`);
    if (outlined) props.push("outlined");
    if (elevated) props.push("elevated");
    const propsString = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    return [
      `<${"script"} lang="ts">`,
      `  import { Alert } from "kosui";`,
      `</${"script"}>`,
      ``,
      `<Alert${propsString}/>`,
    ].join("\n");
  });
</script>

<Usage {code}>
  {#snippet component()}
    <Alert {radius} {variant} {color} {outlined} {elevated}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Alert>
  {/snippet}
  {#snippet controls()}
    <ToggleButtonSetting
      bind:value={variant}
      options={[...ALERT_VARIANT]}
      label="Variant"
    />
    <ColorSetting bind:color />
    <RadiusSetting bind:radius />
    <SwitchSetting label="Outlined" bind:value={outlined} />
    <SwitchSetting label="Elevated" bind:value={elevated} />
  {/snippet}
</Usage>
