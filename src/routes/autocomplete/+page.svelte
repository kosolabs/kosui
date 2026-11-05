<script lang="ts">
  import {
    Autocomplete,
    INPUT_VARIANTS,
    SIZES,
    type InputVariant,
    type Size,
  } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import { COUNTRIES } from "./countries.js";
  import PeopleExample from "./examples/people.svelte";
  import peopleSource from "./examples/people.svelte?raw";
  import SearchExample from "./examples/search.svelte";
  import searchSource from "./examples/search.svelte?raw";

  let variant: InputVariant = $state("outlined");
  let size: Size = $state("sm");
  let country = $state("");
  let chosen = $state("");

  const matches = $derived(
    country.trim()
      ? COUNTRIES.filter((name) =>
          name.toLowerCase().startsWith(country.trim().toLowerCase()),
        )
      : [],
  );
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Autocomplete suggests values as someone types into a text field. Pass the
    suggestions that match what's typed as <code>options</code>; the list opens
    while typing and closes when there are none.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex min-h-72 w-full max-w-xs flex-col gap-2">
        <label class="flex flex-col gap-1 text-sm">
          Country
          <Autocomplete
            bind:value={country}
            options={matches}
            {variant}
            {size}
            onSelect={(name) => (chosen = name)}
          />
        </label>
        <p class="text-sm" aria-live="polite">{chosen && `Chose ${chosen}`}</p>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={variant}
        options={[...INPUT_VARIANTS]}
        label="Variant"
      />
      <ToggleButtonSetting
        bind:value={size}
        options={[...SIZES]}
        label="Size"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Autocomplete"
        bindables={["value"]}
        defaults={{ value: "", variant: "outlined", size: "sm" }}
        values={{ variant, size }}
        expressions={{ options: "matches" }}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Objects and custom options" source={peopleSource}>
      {#snippet description()}
        Options can be any type. <code>getOptionLabel</code> turns one into the
        text that fills the field, and the <code>option</code> snippet renders
        it in the list. <code>onSelect</code> receives the chosen option.
      {/snippet}
      <PeopleExample />
    </Example>

    <Example title="Search as you type" source={searchSource}>
      {#snippet description()}
        Options can come from a server. The list opens when results arrive, and
        Enter submits the form unless a suggestion is highlighted.
      {/snippet}
      <SearchExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        The field is a <code>combobox</code> with
        <code>aria-expanded</code> and <code>aria-controls</code> pointing at a
        <code>listbox</code> of options, as in the ARIA combobox pattern. Label
        it with a <code>&lt;label&gt;</code> or <code>aria-label</code>.
      </li>
      <li>
        Focus stays in the field. Down and Up Arrow highlight options, and
        <code>aria-activedescendant</code> tells screen readers which one is highlighted.
      </li>
      <li>
        Enter or a click chooses the highlighted option, fills the field with
        its label and closes the list. With nothing highlighted, Enter submits
        the form.
      </li>
      <li>
        Escape closes the list without changing the field, and Tab or leaving
        the field closes it too.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "options",
          type: "T[]",
          description:
            "The suggestions to show, already filtered by what's typed. The list closes when it's empty.",
        },
        {
          name: "value",
          type: "string",
          default: `""`,
          description:
            "Bindable. The field's text, set to an option's label when it's chosen.",
        },
        {
          name: "getOptionLabel",
          type: "(option: T) => string",
          default: "String",
          description: "The text for an option.",
        },
        {
          name: "option",
          type: "Snippet<[T]>",
          description: "Renders an option in the list. Defaults to its label.",
        },
        {
          name: "onSelect",
          type: "(option: T) => void",
          description: "Called when an option is chosen.",
        },
        {
          name: "el",
          type: "HTMLInputElement",
          description: "Bindable. The `<input>`.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Autocomplete takes every Input prop, like <code>variant</code>,
      <code>size</code>, <code>shape</code> and <code>placeholder</code>, and
      passes other attributes and event handlers to the
      <code>&lt;input&gt;</code>.
    </p>
  </Section>
</div>
