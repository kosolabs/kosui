<script lang="ts">
  import {
    SHAPES,
    events,
    Shortcut,
    Slider,
    type Mark,
    type SliderColor,
    type Shape,
    type SliderSize,
  } from "#lib/index.js";
  import {
    Code,
    ColorSetting,
    DisabledSetting,
    SizeSetting,
    SwitchSetting,
    Playground,
    ToggleButtonSetting,
  } from "#ui";
  import { onMount } from "svelte";

  let color: SliderColor = $state("primary");
  let size: SliderSize = $state("md");
  let shape: Shape = $state("full");
  let disabled: boolean = $state(false);
  let value: number = $state(30);
  let labelAlwaysOn: boolean = $state(false);
  let inverted: boolean = $state(false);
  let withMarks: boolean = $state(true);
  let restrictToMarks: boolean = $state(false);

  let marks: Mark[] = $state([
    { value: 20, label: "20%" },
    { value: 50, label: "50%" },
    { value: 80, label: "80%" },
  ]);

  onMount(() => {
    events.on("keydown", (e) => {
      if (Shortcut.ENTER.matches(e)) {
        console.log("set");
        value = 50;
        disabled = true;
        marks = [];
      }
    });
  });
</script>

<h1 class="text-4xl">Slider</h1>

<Playground>
  {#snippet component()}
    <div class="w-full max-w-md">
      <Slider
        bind:value
        {color}
        {size}
        {shape}
        {disabled}
        {labelAlwaysOn}
        {inverted}
        {restrictToMarks}
        marks={withMarks ? marks : []}
        min={0}
        max={100}
        step={1}
      />
      <div role="status" class="mt-2 text-sm">Value: {value}</div>
    </div>
  {/snippet}
  {#snippet controls()}
    <ColorSetting bind:color />
    <SizeSetting bind:size />
    <ToggleButtonSetting
      bind:value={shape}
      options={[...SHAPES]}
      label="Shape"
    />
    <DisabledSetting bind:disabled />
    <SwitchSetting label="Label always on" bind:value={labelAlwaysOn} />
    <SwitchSetting label="Inverted" bind:value={inverted} />
    <SwitchSetting label="Show marks" bind:value={withMarks} />
    <SwitchSetting label="Restrict to marks" bind:value={restrictToMarks} />
  {/snippet}
  {#snippet code()}
    <Code
      component="Slider"
      bindables={["value"]}
      defaults={{
        value: 30,
        color: "primary",
        size: "md",
        shape: "full",
        disabled: false,
        labelAlwaysOn: false,
        inverted: false,
        marks: [],
        restrictToMarks: false,
      }}
      values={{
        value,
        color,
        size,
        shape,
        disabled,
        labelAlwaysOn,
        inverted,
        marks: withMarks ? marks : [],
        restrictToMarks,
      }}
    />
  {/snippet}
</Playground>
