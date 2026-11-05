<script lang="ts">
  import {
    CircularProgress,
    COLORS,
    SIZES,
    type Color,
    type Size,
  } from "#lib/index.js";
  import {
    Code,
    DocPage,
    Playground,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";

  const PROGRESSES = ["spinner", "0%", "25%", "60%", "100%"];

  let shown = $state("60%");
  let size: Size = $state("lg");
  let color: Color = $state("primary");
  let label = $state(true);

  let progress = $derived(
    shown === "spinner" ? undefined : parseInt(shown) / 100,
  );
  let text = $derived(label && progress !== undefined ? shown : undefined);
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <CircularProgress {progress} {size} {color}>{text}</CircularProgress>
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={shown}
          options={PROGRESSES}
          label="Progress"
        />
        <ToggleButtonSetting
          bind:value={size}
          options={[...SIZES]}
          label="Size"
        />
        <ToggleButtonSetting
          bind:value={color}
          options={[...COLORS]}
          label="Color"
        />
        <SwitchSetting label="Percentage" bind:value={label} />
      {/snippet}
      {#snippet code()}
        <Code
          component="CircularProgress"
          defaults={{ size: "sm", color: "primary" }}
          values={{ size, color }}
          expressions={{ progress: progress?.toString() }}
          children={text}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
