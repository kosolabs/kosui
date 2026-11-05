<script module lang="ts">
  import { Link } from "#lib/link/index.js";
  import { cn } from "#lib/utils.js";
  import type { MarkedToken, Tokens } from "marked";
  import type { Snippet } from "svelte";
  import type { MarkdownRenderers, MarkdownSnippetProps } from "./types.js";

  export type MarkdownTokensProps = {
    tokens: MarkedToken[];
    renderers: MarkdownRenderers;
  };

  type AnyRenderer = Snippet<[MarkdownSnippetProps<MarkedToken>]>;

  const HEADINGS = ["text-2xl", "text-xl", "text-lg"];

  function rendererFor(token: MarkedToken, renderers: MarkdownRenderers) {
    const name = token.type === "list_item" ? "listItem" : token.type;
    return (renderers as Record<string, AnyRenderer | undefined>)[name];
  }

  function language(info: string | undefined) {
    const name = info?.split(/\s/)[0];
    return name ? `language-${name}` : undefined;
  }
</script>

<script lang="ts">
  import Self from "./markdown-tokens.svelte";

  let { tokens, renderers }: MarkdownTokensProps = $props();
</script>

{#snippet cell(token: Tokens.TableCell)}
  {#snippet children()}
    <Self tokens={token.tokens as MarkedToken[]} {renderers} />
  {/snippet}
  {#if renderers.tableCell}
    {@render renderers.tableCell({ token, children })}
  {:else}
    <svelte:element
      this={token.header ? "th" : "td"}
      style:text-align={token.align}
      class={cn(
        "border border-m3-outline-variant px-3 py-1.5 text-start",
        token.header && "bg-m3-surface-container font-medium",
      )}
    >
      {@render children()}
    </svelte:element>
  {/if}
{/snippet}

{#snippet defaultRenderer({
  token,
  children,
}: MarkdownSnippetProps<MarkedToken>)}
  {#if token.type === "blockquote"}
    <blockquote
      class="flex flex-col gap-3 border-l-4 border-m3-outline-variant pl-4 text-m3-on-surface-variant"
    >
      {@render children()}
    </blockquote>
  {:else if token.type === "br"}
    <br />
  {:else if token.type === "checkbox"}
    <input
      type="checkbox"
      checked={token.checked}
      disabled
      class="mr-2 size-4 align-[-0.125em] accent-m3-primary"
    />
  {:else if token.type === "code"}
    <pre
      class="overflow-x-auto rounded-md bg-m3-surface-container p-3 text-sm"><code
        class={language(token.lang)}>{token.text}</code
      ></pre>
  {:else if token.type === "codespan"}
    <code class="rounded-sm bg-m3-surface-container px-1 py-0.5 text-[0.875em]"
      >{token.text}</code
    >
  {:else if token.type === "del"}
    <del>{@render children()}</del>
  {:else if token.type === "em"}
    <em>{@render children()}</em>
  {:else if token.type === "heading"}
    <svelte:element
      this={`h${token.depth}`}
      class={cn("font-medium", HEADINGS[token.depth - 1] ?? "text-base")}
    >
      {@render children()}
    </svelte:element>
  {:else if token.type === "hr"}
    <hr class="border-m3-outline-variant" />
  {:else if token.type === "image"}
    {#if token.href}
      <img
        src={token.href}
        alt={token.text}
        title={token.title}
        loading="lazy"
        class="inline max-w-full"
      />
    {:else}
      {token.text}
    {/if}
  {:else if token.type === "link"}
    {#if token.href}
      <Link href={token.href} title={token.title}>{@render children()}</Link>
    {:else}
      {@render children()}
    {/if}
  {:else if token.type === "list"}
    <svelte:element
      this={token.ordered ? "ol" : "ul"}
      start={token.ordered && token.start !== 1
        ? token.start || undefined
        : undefined}
      class={cn("space-y-1 pl-6", token.ordered ? "list-decimal" : "list-disc")}
    >
      {@render children()}
    </svelte:element>
  {:else if token.type === "list_item"}
    <li class={cn("space-y-2", token.task && "list-none")}>
      {@render children()}
    </li>
  {:else if token.type === "paragraph"}
    <p>{@render children()}</p>
  {:else if token.type === "strong"}
    <strong>{@render children()}</strong>
  {:else if token.type === "table"}
    <div class="overflow-x-auto">
      <table class="border-collapse text-sm">
        {@render children()}
      </table>
    </div>
  {:else if token.type !== "def" && token.type !== "space"}
    {@render children()}
  {/if}
{/snippet}

{#each tokens as token, index (index)}
  {#snippet children()}
    {#if token.type === "list"}
      <Self tokens={token.items as MarkedToken[]} {renderers} />
    {:else if token.type === "table"}
      <thead>
        <tr>
          {#each token.header as header, column (column)}
            {@render cell(header)}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each token.rows as row, rowIndex (rowIndex)}
          <tr>
            {#each row as data, column (column)}
              {@render cell(data)}
            {/each}
          </tr>
        {/each}
      </tbody>
    {:else if "tokens" in token && token.tokens}
      <Self tokens={token.tokens as MarkedToken[]} {renderers} />
    {:else if "text" in token}
      {token.text}
    {/if}
  {/snippet}
  {@render (rendererFor(token, renderers) ?? defaultRenderer)({
    token,
    children,
  })}
{/each}
