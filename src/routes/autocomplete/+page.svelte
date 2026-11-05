<script lang="ts">
  import {
    Autocomplete,
    INPUT_VARIANTS,
    SIZES,
    type InputVariant,
    type Size,
  } from "#lib/index.js";
  import { Code, DocPage, Playground, ToggleButtonSetting } from "#ui";
  import { COUNTRIES } from "./countries.js";

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
  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
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
          <p class="text-sm" aria-live="polite">
            {chosen ? `Chose ${chosen}` : "Nothing chosen yet"}
          </p>
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
  {/snippet}
</DocPage>
