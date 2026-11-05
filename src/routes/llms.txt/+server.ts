import { CATEGORIES, GUIDES, type NavItem } from "../nav.js";
import {
  DOCUMENTED,
  SITE,
  SUMMARY,
  markdownResponse,
  setupMarkdown,
  slugOf,
} from "../docs.js";

export const prerender = true;

function link(item: NavItem): string {
  return `- [${item.name}](${SITE}/${slugOf(item)}.md): ${item.description}`;
}

export function GET() {
  const documented = (items: NavItem[]) =>
    items.filter((item) => DOCUMENTED.includes(item));
  return markdownResponse(
    [
      "# Kosui",
      `> ${SUMMARY} Import components from \`kosui\`. Every component spreads extra attributes onto the element it renders and shares the props \`variant\`, \`color\`, \`shape\` and \`size\`.`,
      setupMarkdown(),
      `The full documentation in one file is at ${SITE}/llms-full.txt.`,
      ...[{ name: "Guides", items: GUIDES }, ...CATEGORIES]
        .filter((section) => documented(section.items).length > 0)
        .map((section) =>
          [`## ${section.name}`, ...documented(section.items).map(link)].join(
            "\n",
          ),
        ),
    ].join("\n\n"),
  );
}
