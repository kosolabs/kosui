<script lang="ts">
  import {
    COLORS,
    Input,
    INPUT_VARIANTS,
    SHAPES,
    SIZES,
    type Color,
    type InputVariant,
    type Shape,
    type Size,
  } from "#lib/index.js";
  import {
    Code,
    DocPage,
    Playground,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";

  let variant: InputVariant = $state("outlined");
  let color: Color = $state("primary");
  let size: Size = $state("sm");
  let shape: Shape = $state("xs");
  let disabled = $state(false);
  let invalid = $state(false);
  let value = $state("");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <Input
          bind:value
          {variant}
          {color}
          {size}
          {shape}
          {disabled}
          aria-invalid={invalid || undefined}
          aria-label="Email"
          placeholder="you@example.com"
        />
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={variant}
          options={[...INPUT_VARIANTS]}
          label="Variant"
        />
        <ToggleButtonSetting
          bind:value={color}
          options={[...COLORS]}
          label="Color"
        />
        <ToggleButtonSetting
          bind:value={size}
          options={[...SIZES]}
          label="Size"
        />
        <ToggleButtonSetting
          bind:value={shape}
          options={[...SHAPES]}
          label="Shape"
        />
        <SwitchSetting label="Disabled" bind:value={disabled} />
        <SwitchSetting label="Invalid" bind:value={invalid} />
      {/snippet}
      {#snippet code()}
        <Code
          component="Input"
          bindables={["value"]}
          defaults={{
            variant: "outlined",
            color: "primary",
            size: "sm",
            shape: "xs",
            disabled: false,
            "aria-invalid": false,
            "aria-label": "",
            placeholder: "",
          }}
          values={{
            variant,
            color,
            size,
            shape,
            disabled,
            "aria-invalid": invalid,
            "aria-label": "Email",
            placeholder: "you@example.com",
          }}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
