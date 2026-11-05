<script lang="ts">
  import { Link, Markdown } from "#lib/index.js";

  const description = `# Release notes

This release adds **dark mode**. Read the [announcement](https://svelte.dev/blog).

## Fixes

- Menus close on Tab`;
</script>

<section class="flex max-w-prose flex-col gap-3">
  <h2 class="text-xl">Project description</h2>
  <Markdown value={description} class="text-sm">
    {#snippet heading({ token, children })}
      <svelte:element
        this={`h${Math.min(token.depth + 2, 6)}`}
        class="font-medium"
      >
        {@render children()}
      </svelte:element>
    {/snippet}
    {#snippet link({ token, children })}
      <Link href={token.href} target="_blank" rel="noopener noreferrer">
        {@render children()}
      </Link>
    {/snippet}
  </Markdown>
</section>
