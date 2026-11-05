import type { ComponentDocs } from "#ui";
import EmbeddedExample from "./examples/embedded.svelte";
import UserContentExample from "./examples/user-content.svelte";
import embeddedSource from "./examples/embedded.svelte?raw";
import userContentSource from "./examples/user-content.svelte?raw";

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

export const docs: ComponentDocs = {
  intro:
    "Markdown renders Markdown text, like a comment or a description, as styled HTML. It supports GitHub Flavored Markdown and is safe for content people write: HTML shows as text and only web, email and phone links work.",
  examples: [
    {
      title: "Content people write",
      description:
        "Raw HTML is shown as text, and links and images with schemes other than http, https, mailto and tel are dropped, so a comment can't run scripts. To allow some HTML, render it in an `html` snippet through a sanitizer like DOMPurify.",
      source: userContentSource,
      component: UserContentExample,
    },
    {
      title: "Changing how elements render",
      description:
        "Each element has a snippet that receives its marked `token` and its rendered `children`. Here, headings move down two levels so they fit under the section's heading, and links open in a new tab. Use `class` to set the text size.",
      source: embeddedSource,
      component: EmbeddedExample,
    },
  ],
  accessibility: [
    "Markdown renders semantic HTML: headings, lists, tables with header cells, quotes and emphasis keep their meaning for assistive technology.",
    "A `#` heading is an `h1`. When Markdown sits inside a page that has its own headings, override `heading` to shift the levels so the outline stays in order.",
    "Images use the text in `![alt text](url)` as their `alt`, so ask writers to describe them.",
    "Task list checkboxes are disabled: they show whether a task is done but can't be changed.",
  ],
  api: [
    {
      rows: [
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
          description: "Turns single line breaks into `<br>`, as in chat apps.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The outer `<div>`.",
        },
      ],
      note: "Other attributes, like `class`, are passed to the outer `<div>`, which stacks blocks with a gap and inherits its text size and color.",
    },
    {
      name: "Snippets",
      description:
        "Each snippet replaces how one kind of element renders. It receives `{ token, children }`: the marked token, whose type is listed below, and a snippet that renders the element's content. Link and image URLs in tokens are already cleaned.",
      rows: SNIPPETS.map(([name, token, description]) => ({
        name,
        type: `Tokens.${token}`,
        description,
      })),
    },
  ],
};
