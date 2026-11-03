<script module lang="ts">
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  export type DividerProps = {} & ClassName & HTMLAttributes<HTMLHRElement>;
</script>

<script lang="ts">
  let { class: className, ...restProps }: DividerProps = $props();
</script>

<hr class={cn("-mx-1 my-1", className)} {...restProps} />
