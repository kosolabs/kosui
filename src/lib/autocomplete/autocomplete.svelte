<script module lang="ts">
  import {
    AutocompleteContext,
    setAutocompleteContext,
  } from "$lib/autocomplete/index.js";
  import type { ClassName } from "$lib/utils.js";
  import type { Snippet } from "svelte";

  export type AutocompleteProps = {
    children: Snippet;
  } & ClassName;
</script>

<script lang="ts">
  let { children }: AutocompleteProps = $props();

  setAutocompleteContext(new AutocompleteContext());
</script>

{@render children()}
