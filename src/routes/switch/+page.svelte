<script lang="ts">
  import {
    COLORS,
    SHAPES,
    SIZES,
    Switch,
    type Color,
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

  let color: Color = $state("primary");
  let size: Size = $state("sm");
  let shape: Shape = $state("full");
  let disabled = $state(false);
  let checked = $state(false);
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex flex-col items-center gap-3">
          <Switch
            bind:checked
            {color}
            {size}
            {shape}
            {disabled}
            aria-label="Wi-Fi"
          />
          <p class="text-sm" aria-live="polite">
            Wi-Fi {checked ? "on" : "off"}
          </p>
        </div>
      {/snippet}
      {#snippet controls()}
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
      {/snippet}
      {#snippet code()}
        <Code
          component="Switch"
          bindables={["checked"]}
          defaults={{
            color: "primary",
            size: "sm",
            shape: "full",
            disabled: false,
            "aria-label": "",
          }}
          values={{ color, size, shape, disabled, "aria-label": "Wi-Fi" }}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
