import type { Component } from "svelte";
import type { GuidanceRow } from "./guidance-table.svelte";
import type { PropRow } from "./props-table.svelte";

export type DocExample = {
  title: string;
  description: string;
  source: string;
  component: Component;
};

export type DocSection = {
  title: string;
  description: string;
  table?: { heading: string; rows: GuidanceRow[] };
};

export type DocApi = {
  name?: string;
  description?: string;
  rows: PropRow[];
  note?: string;
};

export type ComponentDocs = {
  intro: string;
  sections?: DocSection[];
  examples: DocExample[];
  examplesNote?: string;
  accessibility: string[];
  api: DocApi[];
  advanced?: DocExample[];
};

export function exampleCode(source: string): string {
  return source.replaceAll(`"#lib/index.js"`, `"kosui"`).trimEnd();
}

function table(head: string[], rows: string[][]): string {
  const escape = (cell: string) => cell.replaceAll("|", "\\|");
  return [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escape).join(" | ")} |`),
  ].join("\n");
}

function examples(heading: string, list: DocExample[]): string[] {
  return [
    `## ${heading}`,
    ...list.flatMap((example) => [
      `### ${example.title}`,
      example.description,
      "```svelte\n" + exampleCode(example.source) + "\n```",
    ]),
  ];
}

export function toMarkdown(
  name: string,
  summary: string,
  docs: ComponentDocs,
): string {
  return [
    `# ${name}`,
    `> ${summary}`,
    docs.intro,
    ...(docs.sections ?? []).flatMap((section) => [
      `## ${section.title}`,
      section.description,
      ...(section.table
        ? [
            table(
              [section.table.heading, "Use it for"],
              section.table.rows.map((row) => ["`" + row.name + "`", row.use]),
            ),
          ]
        : []),
    ]),
    ...examples("Examples", docs.examples),
    ...(docs.examplesNote ? [docs.examplesNote] : []),
    "## Accessibility",
    docs.accessibility.map((item) => `- ${item}`).join("\n"),
    "## API",
    ...docs.api.flatMap((api) => [
      ...(api.name ? [`### ${api.name}`] : []),
      ...(api.description ? [api.description] : []),
      table(
        ["Prop", "Type", "Default", "Description"],
        api.rows.map((row) => [
          "`" + row.name + "`",
          "`" + row.type + "`",
          row.default ? "`" + row.default + "`" : "",
          row.description,
        ]),
      ),
      ...(api.note ? [api.note] : []),
    ]),
    ...(docs.advanced ? examples("Advanced", docs.advanced) : []),
  ].join("\n\n");
}
