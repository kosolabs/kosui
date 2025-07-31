<script lang="ts">
  import { Shortcut, ShortcutBadge } from "$lib/shortcut";
</script>

<div class="flex flex-wrap items-center gap-4">
  <div>
    Reboot:
    <ShortcutBadge
      shortcut={new Shortcut({ key: "Delete", ctrl: true, alt: true })}
    />
  </div>
  <div>
    Palette:
    <ShortcutBadge
      shortcut={new Shortcut({ key: "Delete", ctrl: true, alt: true })}
    />
  </div>
</div>
