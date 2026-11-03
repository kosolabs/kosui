<script module lang="ts">
  import type { Snippet } from "svelte";

  export type GuidanceRow<T extends string = string> = {
    name: T;
    use: string;
  };

  export type GuidanceTableProps<T extends string = string> = {
    heading: string;
    rows: GuidanceRow<T>[];
    example: Snippet<[T]>;
  };
</script>

<script lang="ts" generics="T extends string">
  let { heading, rows, example }: GuidanceTableProps<T> = $props();
</script>

<div class="overflow-x-auto rounded-md border">
  <table class="w-full text-left text-sm">
    <thead class="bg-m3-surface-container">
      <tr>
        <th class="p-3 font-medium">Example</th>
        <th class="p-3 font-medium">{heading}</th>
        <th class="p-3 font-medium">Use it for</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.name)}
        <tr class="border-t">
          <td class="p-3">{@render example(row.name)}</td>
          <td class="p-3"><code>{row.name}</code></td>
          <td class="min-w-64 p-3">{row.use}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
