<script lang="ts">
  import { Autocomplete } from "#lib/index.js";

  type Person = { name: string; email: string };

  const people: Person[] = [
    { name: "Ada Lovelace", email: "ada@example.com" },
    { name: "Alan Turing", email: "alan@example.com" },
    { name: "Grace Hopper", email: "grace@example.com" },
    { name: "Katherine Johnson", email: "katherine@example.com" },
    { name: "Margaret Hamilton", email: "margaret@example.com" },
  ];

  let query = $state("");
  let assignee: Person | undefined = $state();

  const matches = $derived(
    people.filter(({ name, email }) =>
      `${name} ${email}`.toLowerCase().includes(query.trim().toLowerCase()),
    ),
  );
</script>

<div class="flex max-w-sm flex-col gap-2">
  <label class="flex flex-col gap-1 text-sm">
    Assignee
    <Autocomplete
      bind:value={query}
      options={matches}
      getOptionLabel={(person) => person.name}
      onSelect={(person) => (assignee = person)}
    >
      {#snippet option(person)}
        <span class="flex flex-col">
          {person.name}
          <span class="text-xs text-m3-on-surface-variant">{person.email}</span>
        </span>
      {/snippet}
    </Autocomplete>
  </label>
  <p class="text-sm">Assigned to {assignee?.email ?? "nobody"}</p>
</div>
