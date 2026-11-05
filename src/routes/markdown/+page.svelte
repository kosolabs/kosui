<script lang="ts">
  import { Markdown, Textarea } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
  } from "#ui";
  import EmbeddedExample from "./examples/embedded.svelte";
  import embeddedSource from "./examples/embedded.svelte?raw";
  import UserContentExample from "./examples/user-content.svelte";
  import userContentSource from "./examples/user-content.svelte?raw";

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

  const SNIPPETS = [
    ["blockquote", "Blockquote", "> quotes"],
    ["br", "Br", "Line breaks"],
    ["code", "Code", "Fenced and indented code blocks"],
    ["codespan", "Codespan", "`inline code`"],
    ["del", "Del", "~~strikethrough~~"],
    ["em", "Em", "*emphasis*"],
    ["heading", "Heading", "# headings, with depth 1 to 6"],
    ["hr", "Hr", "--- rules"],
    ["html", "HTML | Tokens.Tag", "Raw HTML, shown as text by default"],
    ["image", "Image", "![alt](url) images"],
    ["link", "Link", "[text](url) links and bare URLs"],
    ["list", "List", "Ordered and unordered lists"],
    ["listItem", "ListItem", "List items, including tasks"],
    ["paragraph", "Paragraph", "Paragraphs"],
    ["strong", "Strong", "**strong** text"],
    ["table", "Table", "Tables; children renders the head and body"],
    ["tableCell", "TableCell", "Header and body cells, with align"],
    ["text", "Text", "Plain text"],
  ];
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Markdown renders Markdown text, like a comment or a description, as styled
    HTML. It supports GitHub Flavored Markdown and is safe for content people
    write: HTML shows as text and only web, email and phone links work.
  </p>

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

  <Section title="Examples">
    <Example title="Content people write" source={userContentSource}>
      {#snippet description()}
        Raw HTML is shown as text, and links and images with schemes other than
        http, https, mailto and tel are dropped, so a comment can't run scripts.
        To allow some HTML, render it in an <code>html</code> snippet through a sanitizer
        like DOMPurify.
      {/snippet}
      <UserContentExample />
    </Example>

    <Example title="Changing how elements render" source={embeddedSource}>
      {#snippet description()}
        Each element has a snippet that receives its marked
        <code>token</code> and its rendered <code>children</code>. Here,
        headings move down two levels so they fit under the section's heading,
        and links open in a new tab. Use <code>class</code> to set the text size.
      {/snippet}
      <EmbeddedExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Markdown renders semantic HTML: headings, lists, tables with header
        cells, quotes and emphasis keep their meaning for assistive technology.
      </li>
      <li>
        A <code>#</code> heading is an <code>h1</code>. When Markdown sits
        inside a page that has its own headings, override
        <code>heading</code> to shift the levels so the outline stays in order.
      </li>
      <li>
        Images use the text in <code>![alt text](url)</code> as their
        <code>alt</code>, so ask writers to describe them.
      </li>
      <li>
        Task list checkboxes are disabled: they show whether a task is done but
        can't be changed.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "value",
          type: "string",
          description: "The Markdown to render.",
        },
        {
          name: "gfm",
          type: "boolean",
          default: "true",
          description:
            "GitHub Flavored Markdown: tables, task lists, strikethrough and bare URLs as links.",
        },
        {
          name: "breaks",
          type: "boolean",
          default: "false",
          description: "Turns single line breaks into <br>, as in chat apps.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The outer <div>.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Other attributes, like <code>class</code>, are passed to the outer
      <code>&lt;div&gt;</code>, which stacks blocks with a gap and inherits its
      text size and color.
    </p>

    <h3 class="mt-6 text-xl">Snippets</h3>
    <p class="max-w-prose">
      Each snippet replaces how one kind of element renders. It receives
      <code>{`{ token, children }`}</code>: the marked token, whose type is
      listed below, and a snippet that renders the element's content. Link and
      image URLs in tokens are already cleaned.
    </p>
    <PropsTable
      rows={SNIPPETS.map(([name, token, description]) => ({
        name,
        type: `Tokens.${token}`,
        description,
      }))}
    />
  </Section>
</div>
