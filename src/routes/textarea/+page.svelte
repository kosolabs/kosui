<script lang="ts">
  import {
    SHAPES,
    Input,
    Textarea,
    TEXTAREA_VARIANTS,
    ToggleButton,
    ToggleGroup,
    type TextareaColor,
    type Shape,
    type TextareaSize,
    type TextareaVariant,
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

  let variant: TextareaVariant = $state("filled");
  let color: TextareaColor = $state("primary");
  let size: TextareaSize = $state("sm");
  let shape: Shape = $state("xs");
  let disabled: boolean = $state(false);
  let placeholder: string = $state("Text area component");
</script>

<h1 class="text-4xl">Textarea</h1>

<Playground>
  {#snippet component()}
    <Textarea {variant} {color} {size} {shape} {disabled} {placeholder} />
  {/snippet}
  {#snippet controls()}
    <Setting label="Variant">
      <ToggleGroup bind:value={variant}>
        {#each TEXTAREA_VARIANTS as variant (variant)}
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
      component="Textarea"
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
