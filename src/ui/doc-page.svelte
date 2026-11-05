<script lang="ts">
  import { Markdown } from "#lib/index.js";
  import type { Snippet } from "svelte";
  import type { ComponentDocs, DocExample, DocSection } from "./docs.js";
  import Example from "./example.svelte";
  import GuidanceTable from "./guidance-table.svelte";
  import PropsTable from "./props-table.svelte";
  import Section from "./section.svelte";

  export type DocPageProps = {
    docs: ComponentDocs;
    playground?: Snippet;
    tableExample?: Snippet<[DocSection, string]>;
  };
  let { docs, playground, tableExample }: DocPageProps = $props();
</script>

{#snippet examples(list: DocExample[])}
  {#each list as example (example.title)}
    <Example title={example.title} source={example.source}>
      {#snippet description()}
        <Markdown value={example.description} />
      {/snippet}
      <example.component />
    </Example>
  {/each}
{/snippet}

<div class="flex max-w-5xl flex-col gap-12">
  <Markdown value={docs.intro} class="max-w-prose text-lg" />

  {@render playground?.()}

  {#each docs.sections ?? [] as section (section.title)}
    <Section title={section.title}>
      <Markdown value={section.description} class="max-w-prose" />
      {#if section.table}
        <GuidanceTable
          heading={section.table.heading}
          rows={section.table.rows}
        >
          {#snippet example(name)}
            {@render tableExample?.(section, name)}
          {/snippet}
        </GuidanceTable>
      {/if}
    </Section>
  {/each}

  <Section title="Examples">
    {@render examples(docs.examples)}
    {#if docs.examplesNote}
      <Markdown value={docs.examplesNote} class="max-w-prose" />
    {/if}
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      {#each docs.accessibility as item (item)}
        <li><Markdown value={item} /></li>
      {/each}
    </ul>
  </Section>

  <Section title="API">
    {#each docs.api as api, index (index)}
      {#if api.name}
        <h3 class={["text-xl", index > 0 && "mt-6"]}>{api.name}</h3>
      {/if}
      {#if api.description}
        <Markdown value={api.description} class="max-w-prose" />
      {/if}
      <PropsTable rows={api.rows} />
      {#if api.note}
        <Markdown
          value={api.note}
          class="max-w-prose text-sm text-m3-on-surface-variant"
        />
      {/if}
    {/each}
  </Section>

  {#if docs.advanced}
    <Section title="Advanced">
      {@render examples(docs.advanced)}
    </Section>
  {/if}
</div>
