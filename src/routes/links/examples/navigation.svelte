<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { Link } from "#lib/index.js";

  const pages = [
    { title: "Button", href: resolve("button") },
    { title: "Links", href: resolve("links") },
    { title: "Tooltips", href: resolve("tooltips") },
  ];

  function isCurrent(href: string) {
    return page.url.pathname === href;
  }
</script>

<nav aria-label="Components">
  <ul class="flex gap-4">
    {#each pages as { title, href } (href)}
      <li>
        <Link
          {href}
          underline="hover"
          aria-current={isCurrent(href) ? "page" : undefined}
          class={{ "font-semibold": isCurrent(href) }}
        >
          {title}
        </Link>
      </li>
    {/each}
  </ul>
</nav>
