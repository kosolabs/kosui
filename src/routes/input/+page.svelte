<script lang="ts">
  import {
    SHAPES,
    Input,
    INPUT_VARIANTS,
    ToggleButton,
    ToggleGroup,
    type InputColor,
    type Shape,
    type InputSize,
    type InputVariant,
  } from "#lib/index.js";
  import {
    Code,
    ColorSetting,
    DisabledSetting,
    Setting,
    SizeSetting,
    Playground,
    ToggleButtonSetting,
  } from "#ui";

  let variant: InputVariant = $state("filled");
  let color: InputColor = $state("primary");
  let size: InputSize = $state("sm");
  let shape: Shape = $state("xs");
  let disabled: boolean = $state(false);
  let placeholder: string = $state("Input component");
</script>

<h1 class="text-4xl">Input</h1>

<Playground>
  {#snippet component()}
    <Input {variant} {color} {size} {shape} {disabled} {placeholder} />
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
    <ToggleButtonSetting
      bind:value={shape}
      options={[...SHAPES]}
      label="Shape"
    />
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
        shape: "xs",
        disabled: false,
        placeholder: "",
      }}
      values={{
        variant,
        color,
        size,
        shape,
        disabled,
        placeholder,
      }}
    />
  {/snippet}
</Playground>
