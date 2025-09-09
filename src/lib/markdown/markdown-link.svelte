<script lang="ts">
  import type { MarkdownComponentProps } from "$lib/markdown/index.js";
  import type { Tokens } from "marked";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  let {
    token,
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.Link> & HTMLAnchorAttributes = $props();
</script>

<!-- Maybe there's a better way to handle this. See https://github.com/sveltejs/eslint-plugin-svelte/issues/1314-->
<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href={token.href} title={token.title} {...restProps}>
  {@render children()}
</a>
