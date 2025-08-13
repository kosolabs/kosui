<script lang="ts">
  import {
    Textarea,
    TEXTAREA_VARIANTS,
    ToggleButton,
    ToggleGroup,
    type TextareaColor,
    type TextareaRadius,
    type TextareaSize,
    type TextareaVariant,
  } from "$lib";
  import ColorSetting from "$ui/color-setting.svelte";
  import DisabledSetting from "$ui/disabled-setting.svelte";
  import RadiusSetting from "$ui/radius-setting.svelte";
  import Setting from "$ui/setting.svelte";
  import SizeSetting from "$ui/size-setting.svelte";
  import Usage from "$ui/usage.svelte";

  let variant: TextareaVariant = $state("filled");
  let color: TextareaColor = $state("primary");
  let size: TextareaSize = $state("sm");
  let radius: TextareaRadius = $state("md");
  let disabled: boolean = $state(false);
</script>

<h1 class="text-4xl">Textarea</h1>

<Usage>
  {#snippet component()}
    <Textarea
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
        {#each TEXTAREA_VARIANTS as variant (variant)}
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
