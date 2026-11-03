import { expect, test, type Locator, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Link Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/links");
  });

  const preview = (page: Page) => page.getByTestId("preview");
  const link = (page: Page) =>
    preview(page).getByRole("link", { name: "Svelte docs" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();
  const decoration = (locator: Locator) =>
    locator.evaluate((el) => getComputedStyle(el).textDecorationLine);

  test("renders a link to its href, never a button", async ({ page }) => {
    await expect(link(page)).toHaveAttribute(
      "href",
      "https://svelte.dev/docs/svelte",
    );
    await expect(preview(page).getByRole("button")).toHaveCount(0);
  });

  test("text links are underlined at rest", async ({ page }) => {
    expect(await decoration(link(page))).toBe("underline");
  });

  test("hover underline leaves links undecorated at rest", async ({ page }) => {
    await choose(page, "Underline", "hover");
    expect(await decoration(link(page))).toBe("none");
  });

  test("button-like variants stay links without an underline", async ({
    page,
  }) => {
    await choose(page, "Variant", "filled");
    await choose(page, "Underline", "none");
    await expect(link(page)).toBeVisible();
    expect(await decoration(link(page))).toBe("none");
  });

  test("links take keyboard focus", async ({ page }) => {
    await link(page).focus();
    await expect(link(page)).toBeFocused();
  });

  test("links in text examples are underlined", async ({ page }) => {
    const inText = page.getByRole("main").getByRole("link", { name: "Svelte" });
    expect(await decoration(inText.first())).toBe("underline");
  });

  test("navigation marks the current page", async ({ page }) => {
    await expect(
      page
        .getByRole("navigation", { name: "Components" })
        .getByRole("link", { name: "Links" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
