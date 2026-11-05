<script lang="ts">
  import { SHAPES, Skeleton, type Shape } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";

  const STAND_INS: Record<string, string> = {
    "text line": "w-48",
    block: "h-20 w-48",
    avatar: "size-9",
  };

  let standIn = $state("text line");
  let shape: Shape = $state("xs");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <Skeleton {shape} class={STAND_INS[standIn]} />
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={standIn}
          options={Object.keys(STAND_INS)}
          label="Stand-in for"
        />
        <ToggleButtonSetting
          bind:value={shape}
          options={[...SHAPES]}
          label="Shape"
        />
      {/snippet}
      {#snippet code()}
        <Code
          component="Skeleton"
          defaults={{ shape: "xs" }}
          values={{ shape, class: STAND_INS[standIn] }}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
