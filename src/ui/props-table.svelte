<script lang="ts">
  export type PropRow = {
    name: string;
    type: string;
    default?: string;
    description: string;
  };

  export type PropsTableProps = {
    rows: PropRow[];
  };
  let { rows }: PropsTableProps = $props();

  function segments(text: string): { code: boolean; text: string }[] {
    return text
      .split("`")
      .map((part, index) => ({ code: index % 2 === 1, text: part }));
  }
</script>

<div class="overflow-x-auto rounded-md border">
  <table class="w-full text-left text-sm">
    <thead class="bg-m3-surface-container">
      <tr>
        <th class="p-3 font-medium">Prop</th>
        <th class="p-3 font-medium">Type</th>
        <th class="p-3 font-medium">Default</th>
        <th class="p-3 font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.name)}
        <tr class="border-t align-top">
          <td class="p-3"><code>{row.name}</code></td>
          <td class="p-3 text-m3-on-surface-variant">
            <code>{row.type}</code>
          </td>
          <td class="p-3">
            {#if row.default}<code>{row.default}</code>{:else}—{/if}
          </td>
          <td class="min-w-64 p-3">
            {#each segments(row.description) as segment, index (index)}
              {#if segment.code}<code>{segment.text}</code
                >{:else}{segment.text}{/if}
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
