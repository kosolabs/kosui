<script lang="ts">
  import { Markdown, Textarea } from "#lib/index.js";
  import { Code, DocPage, Playground, SwitchSetting } from "#ui";

  let value = $state(`# Weekly update

The new editor shipped with **bold**, *italic*, ~~strikethrough~~ and \`inline code\`.

> Keep messages short and link to the details.

## Next steps

1. Review the [design notes](https://svelte.dev)
2. Ship the beta
   - Write release notes
   - Tell the team

- [x] Fix the menu focus bug
- [ ] Update the docs

| Task     | Owner | Points |
| :------- | :---: | -----: |
| Editor   |  Ana  |      5 |
| Settings |  Raj  |     13 |

\`\`\`ts
const greeting = "hello";
\`\`\`

---

![An example avatar](/avatar-example.svg)`);
  let gfm = $state(true);
  let breaks = $state(false);

  import { docs } from "./docs.js";
</script>

<DocPage {docs}>
  {#snippet playground()}
    <Playground>
      {#snippet component()}
        <div class="grid w-full gap-6 md:grid-cols-2">
          <Textarea
            bind:value
            aria-label="Markdown"
            rows={20}
            class="font-mono text-xs"
          />
          <Markdown {value} {gfm} {breaks} />
        </div>
      {/snippet}
      {#snippet controls()}
        <SwitchSetting bind:value={gfm} label="gfm" />
        <SwitchSetting bind:value={breaks} label="breaks" />
      {/snippet}
      {#snippet code()}
        <Code
          component="Markdown"
          defaults={{ gfm: true, breaks: false }}
          values={{ gfm, breaks }}
          expressions={{ value: "comment.body" }}
        />
      {/snippet}
    </Playground>
  {/snippet}
</DocPage>
