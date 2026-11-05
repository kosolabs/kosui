<script lang="ts">
  import { Autocomplete } from "#lib/index.js";
  import { COUNTRIES } from "../countries.js";

  let query = $state("");
  let results: string[] = $state([]);
  let submitted = $state("");

  async function search(text: string): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const words = text.trim().toLowerCase();
    return words
      ? COUNTRIES.filter((name) => name.toLowerCase().includes(words))
      : [];
  }

  $effect(() => {
    const text = query;
    let current = true;
    search(text).then((found) => {
      if (current) results = found;
    });
    return () => (current = false);
  });
</script>

<form
  class="flex w-full max-w-sm flex-col gap-2"
  onsubmit={(event) => {
    event.preventDefault();
    submitted = query;
  }}
>
  <Autocomplete
    bind:value={query}
    options={results}
    type="search"
    aria-label="Search countries"
    placeholder="Search countries"
  />
  <p class="text-sm">Searched for: {submitted || "nothing yet"}</p>
</form>
