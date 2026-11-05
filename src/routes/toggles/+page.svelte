<script lang="ts">
  import {
    COLORS,
    SHAPES,
    SIZES,
    ToggleButton,
    ToggleGroup,
    type Color,
    type Shape,
    type Size,
  } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";

  let color: Color = $state("primary");
  let size: Size = $state("sm");
  let shape: Shape = $state("full");
  let view = $state("week");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="flex flex-col items-center gap-3">
          <ToggleGroup
            bind:value={view}
            {color}
            {size}
            {shape}
            aria-label="View"
          >
            <ToggleButton value="day">Day</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
          </ToggleGroup>
          <p class="text-sm" aria-live="polite">Showing the {view}</p>
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
      {/snippet}
      {#snippet code()}
        <Code
          component="ToggleGroup"
          components={["ToggleButton"]}
          bindables={["value"]}
          defaults={{
            color: "primary",
            size: "sm",
            shape: "full",
            "aria-label": "",
          }}
          values={{ color, size, shape, "aria-label": "View" }}
          children={`<ToggleButton value="day">Day</ToggleButton>
      <ToggleButton value="week">Week</ToggleButton>
      <ToggleButton value="month">Month</ToggleButton>`}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
