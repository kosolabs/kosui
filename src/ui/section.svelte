<script lang="ts">
  import type { Snippet } from "svelte";

  export type SectionProps = {
    title: string;
    children: Snippet;
  };
  let { title, children }: SectionProps = $props();

  let id = $derived(title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-"));
</script>

<section class="flex flex-col gap-4" aria-labelledby={id}>
  <h2 {id} class="text-2xl font-light">{title}</h2>
  {@render children()}
</section>
