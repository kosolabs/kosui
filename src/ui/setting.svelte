<script lang="ts">
  import type { Snippet } from "svelte";
  import Label from "./label.svelte";

  export type SettingProps = {
    label: string;
    children: Snippet;
  };
  let { label, children }: SettingProps = $props();
</script>

<div class="flex flex-col">
  <Label for={label}>{label}</Label>
  {@render children()}
</div>
