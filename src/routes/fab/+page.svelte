<script lang="ts">
  import {
    COLORS,
    Fab,
    SHAPES,
    SIZES,
    VARIANTS,
    type Color,
    type FabProps,
    type Shape,
    type Size,
    type Variant,
  } from "#lib/index.js";
  import {
    Code,
    DisabledSetting,
    DocPage,
    Playground,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import { Plus } from "@lucide/svelte";

  const CONTENTS = ["icon", "both"];
  const CONTAINERS = ["empty", "tall", "wide", "block"];

  let variant: Variant = $state("elevated");
  let color: Color = $state("primary");
  let shape: Shape = $state("lg");
  let size: Size = $state("lg");
  let content = $state("icon");
  let container = $state("tall");
  let clear = $state(false);
  let tooltip = $state(true);
  let disabled = $state(false);
  let presses = $state(0);

  let hasLabel = $derived(content === "both");
  let lines = $derived(
    container === "empty"
      ? []
      : Array.from({ length: 20 }, (_, i) =>
          container === "wide"
            ? `Line ${i + 1} is long enough to overflow its container sideways, so it scrolls both ways`
            : `Line ${i + 1}`,
        ),
  );
  let tooltipText = $derived(tooltip ? "New task" : "");
  let ariaLabel = $derived(!hasLabel && !tooltip ? "New task" : "");

  let fabProps: FabProps = $derived({
    variant,
    color,
    shape,
    size,
    clear,
    disabled,
    icon: Plus,
    tooltip: tooltipText || undefined,
    "aria-label": ariaLabel || undefined,
    onclick: () => presses++,
  });
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex w-full min-w-0 flex-col items-center gap-3">
          <div
            data-testid="container"
            class={[
              "h-72 w-full overflow-auto rounded-lg bg-m3-surface-container-highest p-2",
              container !== "block" && "flex flex-col",
            ]}
          >
            {#each lines as line (line)}
              <div class="text-nowrap">{line}</div>
            {/each}
            {#if hasLabel}
              <Fab {...fabProps}>New task</Fab>
            {:else}
              <Fab {...fabProps} />
            {/if}
          </div>
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
          bind:value={size}
          options={[...SIZES]}
          label="Size"
        />
        <ToggleButtonSetting
          bind:value={content}
          options={CONTENTS}
          label="Content"
        />
        <ToggleButtonSetting
          bind:value={container}
          options={CONTAINERS}
          label="Container"
        />
        <SwitchSetting label="Clear" bind:value={clear} />
        <SwitchSetting label="Tooltip" bind:value={tooltip} />
        <DisabledSetting bind:disabled />
      {/snippet}
      {#snippet code()}
        <Code
          component="Fab"
          defaults={{
            variant: "elevated",
            color: "primary",
            shape: "lg",
            size: "lg",
            clear: false,
            tooltip: "",
            "aria-label": "",
            disabled: false,
          }}
          values={{
            variant,
            color,
            shape,
            size,
            clear,
            tooltip: tooltipText,
            "aria-label": ariaLabel,
            disabled,
          }}
          expressions={{ icon: "Plus" }}
          imports={[`import { Plus } from "@lucide/svelte";`]}
          children={hasLabel ? "New task" : undefined}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
