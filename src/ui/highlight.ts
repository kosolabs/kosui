import hljs from "highlight.js";
import svelte from "highlight.svelte";

hljs.registerLanguage("svelte", svelte);

export function highlight(code: string): string {
  return hljs.highlight(code, { language: "svelte" }).value;
}
