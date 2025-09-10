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
    Code,
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
</script>

<Usage>
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
  {#snippet code()}
    <Code
      component="Alert"
      defaults={{
        variant: "tonal",
        color: "primary",
        radius: "sm",
        outlined: false,
        elevated: false,
      }}
      values={{
        variant,
        color,
        radius,
        outlined,
        elevated,
      }}
    />
  {/snippet}
</Usage>
