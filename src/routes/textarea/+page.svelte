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
  let placeholder: string = $state("Input component");

  const code = $derived.by(() => {
    const props = [];

    if (variant !== "filled") props.push(`variant="${variant}"`);
    if (color !== "primary") props.push(`color="${color}"`);
    if (size !== "sm") props.push(`size="${size}"`);
    if (radius !== "md") props.push(`radius="${radius}"`);
    if (disabled) props.push("disabled");
    if (placeholder !== "") props.push(`placeholder="${placeholder}"`);

    const propsString = props.length > 0 ? `\n  ${props.join("\n  ")}` : "";

    return [
      `<${"script"} lang="ts">`,
      `  import { Textarea } from "kosui";`,
      ``,
      `  let checked: boolean = $state(false);`,
      `</${"script"}>`,
      ``,
      `<Textarea `,
      `  bind:value${propsString}`,
      `/>`,
    ].join("\n");
  });
</script>

<h1 class="text-4xl">Textarea</h1>

<Usage {code}>
  {#snippet component()}
    <Textarea
      {variant}
      {color}
      {size}
      {radius}
      {disabled}
      placeholder="Textarea component"
    />
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
</Usage>
