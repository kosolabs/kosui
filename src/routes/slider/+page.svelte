<script lang="ts">
  import {
    events,
    Shortcut,
    Slider,
    type Mark,
    type SliderColor,
    type SliderRadius,
    type SliderSize,
  } from "$lib/index.js";
  import {
    ColorSetting,
    DisabledSetting,
    RadiusSetting,
    SizeSetting,
    SwitchSetting,
    Usage,
  } from "$ui/index.js";
  import { onMount } from "svelte";

  let color: SliderColor = $state("primary");
  let size: SliderSize = $state("md");
  let radius: SliderRadius = $state("full");
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

  const code = $derived.by(() => {
    const props = [];

    if (color !== "primary") props.push(`color="${color}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (radius !== "full") props.push(`radius="${radius}"`);
    if (disabled) props.push("disabled");
    if (labelAlwaysOn) props.push("labelAlwaysOn");
    if (inverted) props.push("inverted");
    if (withMarks) props.push("marks={marks}");
    if (restrictToMarks) props.push("restrictToMarks");

    const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";

    const lines = [
      `<${"script"} lang="ts">`,
      `  import { Slider } from "kosui";`,
      ``,
      `  let value: number = $state(30);`,
    ];

    if (withMarks) {
      lines.push(
        ``,
        `  const marks = [`,
        `    { value: 20, label: "20%" },`,
        `    { value: 50, label: "50%" },`,
        `    { value: 80, label: "80%" },`,
        `  ];`,
      );
    }

    lines.push(
      `</${"script"}>`,
      ``,
      `<Slider bind:value${propsString} />`,
      `<div class="text-sm">Value: {value}</div>`,
    );

    return lines.join("\n");
  });

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

<Usage {code}>
  {#snippet component()}
    <div class="w-full max-w-md">
      <Slider
        bind:value
        {color}
        {size}
        {radius}
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
    <RadiusSetting bind:radius />
    <DisabledSetting bind:disabled />
    <SwitchSetting label="Label always on" bind:value={labelAlwaysOn} />
    <SwitchSetting label="Inverted" bind:value={inverted} />
    <SwitchSetting label="Show marks" bind:value={withMarks} />
    <SwitchSetting label="Restrict to marks" bind:value={restrictToMarks} />
  {/snippet}
</Usage>
