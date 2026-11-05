import {
  DOCUMENTED,
  SUMMARY,
  markdownResponse,
  pageMarkdown,
  setupMarkdown,
} from "../docs.js";

export const prerender = true;

export function GET() {
  return markdownResponse(
    [
      "# Kosui",
      `> ${SUMMARY}`,
      setupMarkdown(),
      ...DOCUMENTED.map((item) => pageMarkdown(item).replaceAll(/^#/gm, "##")),
    ].join("\n\n"),
  );
}
