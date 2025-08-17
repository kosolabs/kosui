<script module lang="ts">
  import { CommandContext, setCommandContext } from "$lib/command/index.js";
  import { type ClassName } from "$lib/utils.js";
  import { type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  export type CommandProps = {
    children: Snippet<[]>;
  } & ClassName;
</script>

<script lang="ts">
  let { children, class: className }: CommandProps = $props();
  setCommandContext(new CommandContext());
</script>

<div class={twMerge("flex h-full flex-col p-1", className)}>
  {@render children()}
</div>
