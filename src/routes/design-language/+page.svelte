<script lang="ts">
  import {
    Avatar,
    Button,
    Chip,
    Markdown,
    type Color,
    type Shape,
    type Size,
    type Variant,
  } from "#lib/index.js";
  import { GuidanceTable, Section } from "#ui";
  import { Plus } from "@lucide/svelte";
  import {
    INTRO,
    PRINCIPLES,
    ROW_HEIGHTS,
    SCALES,
    VOCABULARY,
    VOCABULARY_INTRO,
  } from "./docs.js";
</script>

{#snippet scale({ title, description }: { title: string; description: string })}
  <h3 class="text-xl font-light">{title}</h3>
  <Markdown value={description} class="max-w-prose" />
{/snippet}

<div class="flex max-w-5xl flex-col gap-12">
  <Markdown value={INTRO} class="max-w-prose text-lg" />

  <Section title="Principles">
    <Markdown value={PRINCIPLES} class="max-w-prose" />
  </Section>

  <Section title="Shared vocabulary">
    <Markdown value={VOCABULARY_INTRO} class="max-w-prose" />

    {@render scale(SCALES.variant)}
    <GuidanceTable heading="Variant" rows={SCALES.variant.rows}>
      {#snippet example(variant)}
        <div class="flex items-center gap-2">
          <Button variant={variant as Variant}>Save</Button>
          <Chip variant={variant as Variant}>Design</Chip>
        </div>
      {/snippet}
    </GuidanceTable>

    {@render scale(SCALES.color)}
    <GuidanceTable heading="Color" rows={SCALES.color.rows}>
      {#snippet example(color)}
        <div class="flex items-center gap-2">
          <Button color={color as Color}>Save</Button>
          <Chip color={color as Color} variant="tonal">Design</Chip>
        </div>
      {/snippet}
    </GuidanceTable>

    {@render scale(SCALES.shape)}
    <GuidanceTable heading="Shape" rows={SCALES.shape.rows}>
      {#snippet example(shape)}
        <div class="flex items-center gap-2">
          <Button shape={shape as Shape}>Save</Button>
          <Button shape={shape as Shape} icon={Plus} aria-label="Add" />
          <Chip shape={shape as Shape}>Design</Chip>
          <Avatar shape={shape as Shape}>AL</Avatar>
        </div>
      {/snippet}
    </GuidanceTable>

    {@render scale(SCALES.size)}
    <GuidanceTable heading="Size" rows={SCALES.size.rows}>
      {#snippet example(size)}
        <div
          class={[
            "flex items-center gap-2 rounded-md bg-m3-surface-container",
            ROW_HEIGHTS[size as Size].row,
          ]}
        >
          <Button size={size as Size}>Save</Button>
          <Button size={size as Size} icon={Plus} aria-label="Add" />
          <Chip size={size as Size}>Design</Chip>
        </div>
      {/snippet}
    </GuidanceTable>

    <h3 class="text-xl font-light">Where each prop appears</h3>
    <div class="overflow-x-auto rounded-md border">
      <table class="w-full text-left text-sm">
        <thead class="bg-m3-surface-container">
          <tr>
            <th class="p-3 font-medium">Prop</th>
            <th class="p-3 font-medium">Values</th>
            <th class="p-3 font-medium">Components</th>
          </tr>
        </thead>
        <tbody>
          {#each VOCABULARY as row (row.prop)}
            <tr class="border-t">
              <td class="p-3"><code>{row.prop}</code></td>
              <td class="min-w-48 p-3">{row.values}</td>
              <td class="min-w-64 p-3">{row.components}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Section>
</div>
