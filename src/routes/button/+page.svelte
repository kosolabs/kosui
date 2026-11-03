<script lang="ts">
  import {
    Button,
    COLORS,
    SHAPES,
    VARIANTS,
    type ButtonProps,
    type Color,
    type Shape,
    type Variant,
  } from "#lib/index.js";
  import {
    Code,
    DisabledSetting,
    SwitchSetting,
    ToggleButtonSetting,
    Usage,
  } from "#ui";
  import { Save } from "@lucide/svelte";

  const CONTENTS = ["label", "icon", "both"];

  let variant: Variant = $state("outlined");
  let color: Color = $state("primary");
  let shape: Shape = $state("rounded");
  let content = $state("label");
  let tooltip = $state(false);
  let disabled = $state(false);
  let presses = $state(0);

  let hasIcon = $derived(content !== "label");
  let hasLabel = $derived(content !== "icon");
  let tooltipText = $derived(tooltip ? "Save changes" : "");
  let ariaLabel = $derived(!hasLabel && !tooltip ? "Save" : "");

  let buttonProps: ButtonProps = $derived({
    variant,
    color,
    shape,
    disabled,
    icon: hasIcon ? Save : undefined,
    tooltip: tooltipText || undefined,
    "aria-label": ariaLabel || undefined,
    onclick: () => presses++,
  });
</script>

<Usage>
  {#snippet component()}
    <div class="flex flex-col items-center gap-3">
      {#if hasLabel}
        <Button {...buttonProps}>Save</Button>
      {:else}
        <Button {...buttonProps} />
      {/if}
      <p class="text-sm" aria-live="polite">
        Pressed {presses}
        {presses === 1 ? "time" : "times"}
      </p>
    </div>
  {/snippet}
  {#snippet controls()}
    <ToggleButtonSetting
      bind:value={variant}
      options={[...VARIANTS]}
      label="Variant"
    />
    <ToggleButtonSetting
      bind:value={color}
      options={[...COLORS]}
      label="Color"
    />
    <ToggleButtonSetting
      bind:value={shape}
      options={[...SHAPES]}
      label="Shape"
    />
    <ToggleButtonSetting
      bind:value={content}
      options={CONTENTS}
      label="Content"
    />
    <SwitchSetting label="Tooltip" bind:value={tooltip} />
    <DisabledSetting bind:disabled />
  {/snippet}
  {#snippet code()}
    <Code
      component="Button"
      defaults={{
        variant: "outlined",
        color: "primary",
        shape: "rounded",
        tooltip: "",
        "aria-label": "",
        disabled: false,
      }}
      values={{
        variant,
        color,
        shape,
        tooltip: tooltipText,
        "aria-label": ariaLabel,
        disabled,
      }}
      expressions={{ icon: hasIcon ? "Save" : undefined }}
      imports={hasIcon ? [`import { Save } from "@lucide/svelte";`] : []}
      children={hasLabel ? "Save" : undefined}
    />
  {/snippet}
</Usage>
