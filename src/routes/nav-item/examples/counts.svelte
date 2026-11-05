<script lang="ts">
  import { NavItem } from "#lib/index.js";
  import { Inbox, Send, Star } from "@lucide/svelte";

  const FOLDERS = [
    { name: "Inbox", icon: Inbox, unread: 12 },
    { name: "Starred", icon: Star, unread: 0 },
    { name: "Sent", icon: Send, unread: 0 },
  ];

  let current = $state("Inbox");
</script>

<nav aria-label="Mail" class="flex w-64 flex-col gap-0.5">
  {#each FOLDERS as folder (folder.name)}
    <NavItem
      href="#{folder.name.toLowerCase()}"
      icon={folder.icon}
      current={current === folder.name}
      onclick={(event) => {
        event.preventDefault();
        current = folder.name;
      }}
    >
      {folder.name}
      {#if folder.unread}
        <span class="ml-auto text-xs">
          {folder.unread}
          <span class="sr-only">unread</span>
        </span>
      {/if}
    </NavItem>
  {/each}
</nav>
