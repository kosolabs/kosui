<script lang="ts">
  import {
    Button,
    Chip,
    COLORS,
    SHAPES,
    SIZES,
    VARIANTS,
    type Color,
    type Shape,
    type Size,
    type Variant,
  } from "#lib/index.js";
  import {
    Code,
    DocPage,
    Playground,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";

  const LABELS = ["Design", "Frontend", "Urgent"];

  let variant: Variant = $state("filled");
  let color: Color = $state("primary");
  let shape: Shape = $state("sm");
  let size: Size = $state("sm");
  let clickable = $state(false);
  let deletable = $state(true);
  let labels = $state([...LABELS]);
  let last = $state("");

  let actions = $derived({
    onClick: clickable
      ? (label: string) => () => (last = `Clicked ${label}`)
      : undefined,
    onDelete: deletable
      ? (label: string) => () => {
          labels.splice(labels.indexOf(label), 1);
          last = `Removed ${label}`;
        }
      : undefined,
  });
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex flex-col items-center gap-3">
          <div class="flex flex-wrap justify-center gap-2">
            {#each labels as label (label)}
              <Chip
                {variant}
                {color}
                {shape}
                {size}
                onClick={actions.onClick?.(label)}
                onDelete={actions.onDelete?.(label)}
              >
                {label}
              </Chip>
            {/each}
          </div>
          {#if labels.length < LABELS.length}
            <Button variant="text" onclick={() => (labels = [...LABELS])}>
              Restore chips
            </Button>
          {/if}
          <p class="text-sm" aria-live="polite">{last}</p>
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
        <SwitchSetting label="Clickable" bind:value={clickable} />
        <SwitchSetting label="Deletable" bind:value={deletable} />
      {/snippet}
      {#snippet code()}
        <Code
          component="Chip"
          defaults={{
            variant: "filled",
            color: "primary",
            shape: "sm",
            size: "sm",
          }}
          values={{ variant, color, shape, size }}
          expressions={{
            onClick: clickable ? "() => open(tag)" : undefined,
            onDelete: deletable ? "() => remove(tag)" : undefined,
          }}
          children={"{tag}"}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
