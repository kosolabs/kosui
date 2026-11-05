<script lang="ts">
  import { NavGroup, NavItem } from "#lib/index.js";

  const GROUPS = [
    { label: "Workspace", items: ["Overview", "Projects", "Members"] },
    { label: "Account", items: ["Profile", "Billing"] },
  ];

  let current = $state("Projects");
</script>

<nav aria-label="Settings" class="flex w-56 flex-col">
  {#each GROUPS as group (group.label)}
    <NavGroup label={group.label}>
      {#each group.items as item (item)}
        <NavItem
          href="#{item.toLowerCase()}"
          current={current === item}
          size="sm"
          onclick={(event) => {
            event.preventDefault();
            current = item;
          }}
        >
          {item}
        </NavItem>
      {/each}
    </NavGroup>
  {/each}
</nav>
