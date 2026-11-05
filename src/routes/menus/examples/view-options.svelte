<script lang="ts">
  import {
    Button,
    Menu,
    MenuDivider,
    MenuGroup,
    MenuItem,
  } from "#lib/index.js";
  import { ChevronDown } from "@lucide/svelte";

  type Sort = "name" | "modified" | "size";

  let sort: Sort = $state("name");
  let hidden = $state(false);
  let extensions = $state(true);
</script>

<div class="flex items-center gap-3">
  <Menu>
    {#snippet trigger(props)}
      <Button {...props} variant="tonal">
        View <ChevronDown size={16} />
      </Button>
    {/snippet}
    <MenuGroup label="Sort by">
      <MenuItem checked={sort === "name"} onSelect={() => (sort = "name")}>
        Name
      </MenuItem>
      <MenuItem
        checked={sort === "modified"}
        onSelect={() => (sort = "modified")}
      >
        Date modified
      </MenuItem>
      <MenuItem checked={sort === "size"} onSelect={() => (sort = "size")}>
        Size
      </MenuItem>
    </MenuGroup>
    <MenuDivider />
    <MenuGroup label="Show">
      <MenuItem checked={hidden} onSelect={() => (hidden = !hidden)}>
        Hidden files
      </MenuItem>
      <MenuItem
        checked={extensions}
        onSelect={() => (extensions = !extensions)}
      >
        File extensions
      </MenuItem>
    </MenuGroup>
  </Menu>
  <span class="text-sm">
    Sorted by {sort}{hidden ? ", hidden files shown" : ""}{extensions
      ? ""
      : ", extensions hidden"}
  </span>
</div>
