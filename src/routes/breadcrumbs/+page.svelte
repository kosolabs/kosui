<script>
  import { resolve } from "$app/paths";
  import { Breadcrumbs } from "$lib/index.js";
</script>

<Breadcrumbs
  path={[
    { title: "Home", href: resolve("/") },
    { title: "Breadcrumbs", href: resolve("/breadcrumbs") },
  ]}
/>
