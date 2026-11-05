<script lang="ts">
  import { Breadcrumbs, COLORS, type Color } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";

  const PATH = [
    { title: "Home", href: "#home" },
    { title: "Projects", href: "#projects" },
    { title: "Kosui", href: "#kosui" },
    { title: "Docs", href: "#docs" },
  ];
  const SEPARATORS = ["›", "/", "·"];

  let depth = $state("3");
  let separator = $state("›");
  let color: Color = $state("primary");

  let path = $derived(PATH.slice(0, Number(depth)));
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <Breadcrumbs {path} {separator} {color} />
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={depth}
          options={["2", "3", "4"]}
          label="Depth"
        />
        <ToggleButtonSetting
          bind:value={separator}
          options={SEPARATORS}
          label="Separator"
        />
        <ToggleButtonSetting
          bind:value={color}
          options={[...COLORS]}
          label="Color"
        />
      {/snippet}
      {#snippet code()}
        <Code
          component="Breadcrumbs"
          defaults={{ separator: "›", color: "primary" }}
          values={{ separator, color }}
          expressions={{
            path: `[\n${path.map((c) => `    { title: "${c.title}", href: "${c.href}" },`).join("\n")}\n  ]`,
          }}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
