<script lang="ts">
  import {
    COLORS,
    SHAPES,
    SIZES,
    Slider,
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

  const MARKS = [
    { value: 0, label: "0%" },
    { value: 50, label: "50%" },
    { value: 100, label: "100%" },
  ];

  let color: Color = $state("primary");
  let size: Size = $state("sm");
  let shape: Shape = $state("full");
  let withMarks = $state(false);
  let showValue = $state(false);
  let disabled = $state(false);
  let value = $state(30);
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex w-full max-w-sm flex-col items-center gap-3 pt-8">
          <Slider
            bind:value
            {color}
            {size}
            {shape}
            {showValue}
            {disabled}
            marks={withMarks ? MARKS : []}
            format={(v) => `${v}%`}
            aria-label="Brightness"
          />
          <p class="text-sm">Brightness {value}%</p>
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
        <SwitchSetting label="Marks" bind:value={withMarks} />
        <SwitchSetting label="Show value" bind:value={showValue} />
        <SwitchSetting label="Disabled" bind:value={disabled} />
      {/snippet}
      {#snippet code()}
        <Code
          component="Slider"
          bindables={["value"]}
          defaults={{
            color: "primary",
            size: "sm",
            shape: "full",
            showValue: false,
            disabled: false,
            "aria-label": "",
          }}
          values={{
            color,
            size,
            shape,
            showValue,
            disabled,
            "aria-label": "Brightness",
          }}
          expressions={{
            marks: withMarks
              ? `[{ value: 0, label: "0%" }, { value: 50, label: "50%" }, { value: 100, label: "100%" }]`
              : undefined,
            format: "(v) => `${v}%`",
          }}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
