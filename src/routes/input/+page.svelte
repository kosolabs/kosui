<script lang="ts">
  import {
    Input,
    INPUT_VARIANTS,
    ToggleButton,
    ToggleGroup,
    type InputColor,
    type InputRadius,
    type InputSize,
    type InputVariant,
  } from "$lib/index.js";
  import {
    Code,
    ColorSetting,
    DisabledSetting,
    RadiusSetting,
    Setting,
    SizeSetting,
    Usage,
  } from "$ui/index.js";

  let variant: InputVariant = $state("filled");
  let color: InputColor = $state("primary");
  let size: InputSize = $state("sm");
  let radius: InputRadius = $state("md");
  let disabled: boolean = $state(false);
  let placeholder: string = $state("Input component");
</script>

<h1 class="text-4xl">Input</h1>

<Usage>
  {#snippet component()}
    <Input {variant} {color} {size} {radius} {disabled} {placeholder} />
  {/snippet}
  {#snippet controls()}
    <Setting label="Variant">
      <ToggleGroup bind:value={variant}>
        {#each INPUT_VARIANTS as variant (variant)}
          <ToggleButton value={variant}>{variant}</ToggleButton>
        {/each}
      </ToggleGroup>
    </Setting>
    <ColorSetting bind:color />
    <SizeSetting bind:size />
    <RadiusSetting bind:radius />
    <DisabledSetting bind:disabled />
    <Setting label="Placeholder">
      <Input variant="filled" bind:value={placeholder} />
    </Setting>
  {/snippet}
  {#snippet code()}
    <Code
      component="Input"
      bindables={["value"]}
      defaults={{
        value: "",
        variant: "filled",
        color: "primary",
        size: "sm",
        radius: "md",
        disabled: false,
        placeholder: "",
      }}
      values={{
        variant,
        color,
        size,
        radius,
        disabled,
        placeholder,
      }}
    />
  {/snippet}
</Usage>
