import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Markdown Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/markdown");
  });

  test("renders without warnings", async ({ page }) => {
    const warnings: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "warning") {
        warnings.push(msg.text());
      }
    });

    await page.goto("/markdown");
    await expect(page.getByTitle("markdown").getByText("EOF")).toBeVisible();

    expect(warnings).toEqual([]);
  });

  test("blockquote", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("blockquote"),
    ).toBeVisible();
  });

  test("break", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("paragraph").locator("br"),
    ).toBeAttached();
  });

  test("code", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("code").getByText("key"),
    ).toBeVisible();
  });

  test("codespan", async ({ page }) => {
    await expect(
      page
        .getByTitle("markdown")
        .getByRole("paragraph")
        .getByText("Markdown")
        .getByRole("code")
        .getByText("inline"),
    ).toBeVisible();
  });

  test("del", async ({ page }) => {
    await expect(
      page
        .getByTitle("markdown")
        .getByRole("paragraph")
        .getByText("Markdown")
        .getByRole("deletion"),
    ).toBeVisible();
  });

  test("emphasis", async ({ page }) => {
    await expect(
      page
        .getByTitle("markdown")
        .getByRole("paragraph")
        .getByText("Markdown")
        .getByRole("emphasis"),
    ).toBeVisible();
  });

  test("heading", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("heading", { name: "Heading 1" }),
    ).toBeVisible();

    await expect(
      page.getByTitle("markdown").getByRole("heading", { name: "Heading 2" }),
    ).toBeVisible();

    await expect(
      page.getByTitle("markdown").getByRole("heading", { name: "Heading 3" }),
    ).toBeVisible();
  });

  test("hr", async ({ page }) => {
    await expect(page.getByTitle("markdown").locator("hr")).toBeVisible();
  });

  test("html", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("paragraph").getByText("HTML"),
    ).toBeVisible();
  });

  test("image", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("img", { name: "image" }),
    ).toBeVisible();
  });

  test("link", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("link").getByText("link"),
    ).toBeVisible();
  });

  test("list", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("list").getByText("ol"),
    ).toHaveCount(2);
    await expect(
      page.getByTitle("markdown").getByRole("list").getByText("ul"),
    ).toHaveCount(2);
    await expect(
      page.getByTitle("markdown").getByRole("list").getByText("sub"),
    ).toHaveCount(2);
  });

  test("paragraph", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("paragraph").getByText("paragraph"),
    ).toBeVisible();
  });

  test("strong", async ({ page }) => {
    await expect(
      page
        .getByTitle("markdown")
        .getByRole("paragraph")
        .getByText("Markdown")
        .getByRole("strong"),
    ).toBeVisible();
  });

  test("table", async ({ page }) => {
    await expect(page.getByTitle("markdown").getByRole("table")).toBeVisible();
  });

  test("text", async ({ page }) => {
    await expect(
      page.getByTitle("markdown").getByRole("paragraph").getByText("Markdown"),
    ).toBeVisible();
  });
});
