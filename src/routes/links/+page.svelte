<script lang="ts">
  import {
    COLORS,
    Link,
    UNDERLINES,
    type Color,
    type Underline,
  } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";

  const HREF = "https://svelte.dev/docs/svelte";

  let color: Color = $state("primary");
  let underline: Underline = $state("always");
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <p class="max-w-prose">
          Kosui components are written in Svelte. Read the
          <Link href={HREF} {color} {underline}>Svelte docs</Link>
          to learn more.
        </p>
      {/snippet}
      {#snippet controls()}
        <ToggleButtonSetting
          bind:value={color}
          options={[...COLORS]}
          label="Color"
        />
        <ToggleButtonSetting
          bind:value={underline}
          options={[...UNDERLINES]}
          label="Underline"
        />
      {/snippet}
      {#snippet code()}
        <Code
          component="Link"
          defaults={{ href: "", color: "primary", underline: "always" }}
          values={{ href: HREF, color, underline }}
          children="Svelte docs"
        />
      {/snippet}
    </Playground>
  {/snippet}
  {#snippet tableExample(_section, name)}
    <Link href={HREF} underline={name as Underline}>Svelte docs</Link>
  {/snippet}
</DocPage>
