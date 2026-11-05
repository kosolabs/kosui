import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

const SITE = "https://kosui.kosolabs.com";

test.describe("LLM Docs Tests", () => {
  test("llms.txt explains setup and links every page", async ({
    page,
    request,
  }) => {
    const response = await request.get("/llms.txt");
    expect(response.ok()).toBe(true);
    const text = await response.text();
    expect(text).toMatch(/^# Kosui\n\n> /);
    expect(text).toContain('@import "kosui/theme.css";');
    const links = [...text.matchAll(/^- \[([^\]]+)\]\(([^)]+)\): .+$/gm)];
    await page.goto("/");
    const cards = page
      .getByRole("main")
      .getByRole("region", { name: "Components" })
      .getByRole("link");
    await expect(cards.first()).toBeVisible();
    expect(links.length).toBe((await cards.count()) + 1);
    for (const [, name, url] of links) {
      expect(url.startsWith(`${SITE}/`), url).toBe(true);
      const path = url.slice(SITE.length);
      expect(path).toMatch(/^\/[a-z-]+\.md$/);
      const page = await request.get(path);
      expect(page.ok(), url).toBe(true);
      expect(page.headers()["content-type"]).toContain("text/markdown");
      expect((await page.text()).startsWith(`# ${name}\n`), url).toBe(true);
    }
  });

  test("a component page has its intro, examples and API", async ({
    request,
  }) => {
    const text = await (await request.get("/button.md")).text();
    expect(text).toContain("Buttons let people take an action");
    expect(text).toContain(`[Link](${SITE}/links.md)`);
    expect(text).toContain("## Examples");
    expect(text).toContain('import { Button } from "kosui";');
    expect(text).not.toContain("#lib");
    expect(text).toContain("## Accessibility");
    expect(text).toContain(
      '| `variant` | `"elevated" \\| "filled" \\| "tonal" \\| "outlined" \\| "plain" \\| "text"` | `"outlined"` |',
    );
  });

  test("llms-full.txt holds every page", async ({ request }) => {
    const index = await (await request.get("/llms.txt")).text();
    const full = await (await request.get("/llms-full.txt")).text();
    for (const [, name] of index.matchAll(/^- \[([^\]]+)\]/gm)) {
      expect(full).toContain(`\n## ${name}\n`);
    }
  });
});
