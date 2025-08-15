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
  } from "$lib";
  import ColorSetting from "$ui/color-setting.svelte";
  import DisabledSetting from "$ui/disabled-setting.svelte";
  import RadiusSetting from "$ui/radius-setting.svelte";
  import Setting from "$ui/setting.svelte";
  import SizeSetting from "$ui/size-setting.svelte";
  import Usage from "$ui/usage.svelte";

  let variant: InputVariant = $state("filled");
  let color: InputColor = $state("primary");
  let size: InputSize = $state("sm");
  let radius: InputRadius = $state("md");
  let disabled: boolean = $state(false);
</script>

<h1 class="text-4xl">Input</h1>

<Usage>
  {#snippet component()}
    <Input
      {variant}
      {color}
      {size}
      {radius}
      {disabled}
      placeholder="Input component"
    />
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
  {/snippet}
  {#snippet code()}
    Code
  {/snippet}
</Usage>
