<script module lang="ts">
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";

  export type CommandContentProps = { children: Snippet } & ClassName;
</script>

<script lang="ts">
  let { class: className, children }: CommandContentProps = $props();
</script>

<div class={cn("h-full overflow-scroll", className)}>
  {@render children()}
</div>
