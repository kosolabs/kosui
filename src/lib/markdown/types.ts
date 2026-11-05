import type { Tokens } from "marked";
import type { Snippet } from "svelte";

export type MarkdownSnippetProps<T> = {
  token: T;
  children: Snippet;
};

type Renderer<T> = Snippet<[MarkdownSnippetProps<T>]>;

export type MarkdownRenderers = {
  blockquote?: Renderer<Tokens.Blockquote>;
  br?: Renderer<Tokens.Br>;
  code?: Renderer<Tokens.Code>;
  codespan?: Renderer<Tokens.Codespan>;
  del?: Renderer<Tokens.Del>;
  em?: Renderer<Tokens.Em>;
  heading?: Renderer<Tokens.Heading>;
  hr?: Renderer<Tokens.Hr>;
  html?: Renderer<Tokens.HTML | Tokens.Tag>;
  image?: Renderer<Tokens.Image>;
  link?: Renderer<Tokens.Link>;
  list?: Renderer<Tokens.List>;
  listItem?: Renderer<Tokens.ListItem>;
  paragraph?: Renderer<Tokens.Paragraph>;
  strong?: Renderer<Tokens.Strong>;
  table?: Renderer<Tokens.Table>;
  tableCell?: Renderer<Tokens.TableCell>;
  text?: Renderer<Tokens.Text>;
};
