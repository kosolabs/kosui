import { error } from "@sveltejs/kit";
import { DOCUMENTED, markdownResponse, pageMarkdown, slugOf } from "../docs.js";
import type { EntryGenerator, RequestHandler } from "./$types.js";

export const prerender = true;

export const entries: EntryGenerator = () =>
  DOCUMENTED.map((item) => ({ page: slugOf(item) }));

export const GET: RequestHandler = ({ params }) => {
  const item = DOCUMENTED.find((item) => slugOf(item) === params.page);
  if (!item) error(404);
  return markdownResponse(pageMarkdown(item));
};
