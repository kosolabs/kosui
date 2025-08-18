<script lang="ts">
  import { Label } from "$ui/index.js";
  import { type Snippet } from "svelte";

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
