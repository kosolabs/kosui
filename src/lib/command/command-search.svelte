<script module lang="ts">
  import { CommandInput, type CommandInputProps } from "$lib/command/index.js";
  import { SearchIcon } from "@lucide/svelte";

  export type CommandSearchProps = {} & CommandInputProps;
</script>

<script lang="ts">
  import { twMerge } from "tailwind-merge";

  let {
    value = $bindable(""),
    placeholder = "Search...",
    class: className,
    ...restProps
  }: CommandSearchProps = $props();
</script>

<div class={twMerge("flex items-center gap-2 px-2", className)}>
  <SearchIcon size={16} />
  <CommandInput
    autofocus
    bind:value
    {placeholder}
    class="h-10"
    {...restProps}
  />
</div>
