<script lang="ts">
  import {
    Input,
    Textarea,
    TEXTAREA_VARIANTS,
    ToggleButton,
    ToggleGroup,
    type TextareaColor,
    type TextareaRadius,
    type TextareaSize,
    type TextareaVariant,
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

  let variant: TextareaVariant = $state("filled");
  let color: TextareaColor = $state("primary");
  let size: TextareaSize = $state("sm");
  let radius: TextareaRadius = $state("md");
  let disabled: boolean = $state(false);
  let placeholder: string = $state("Text area component");
</script>

<h1 class="text-4xl">Textarea</h1>

<Usage>
  {#snippet component()}
    <Textarea {variant} {color} {size} {radius} {disabled} {placeholder} />
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
    <RadiusSetting bind:radius />
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
