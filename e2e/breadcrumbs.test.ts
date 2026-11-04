import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Breadcrumbs Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/breadcrumbs");
  });

  const crumbs = (page: Page) =>
    page.getByTestId("preview").getByRole("navigation", { name: "Breadcrumb" });
  const folders = (page: Page) =>
    page
      .getByRole("main")
      .getByRole("navigation", { name: "Breadcrumb" })
      .nth(1);
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();

  test("breadcrumbs are a navigation landmark with a list of levels", async ({
    page,
  }) => {
    await expect(crumbs(page).getByRole("listitem")).toHaveCount(3);
    await choose(page, "Depth", "4");
    await expect(crumbs(page).getByRole("listitem")).toHaveCount(4);
  });

  test("separators aren't read", async ({ page }) => {
    await expect(crumbs(page)).toContainText("›");
    expect(await crumbs(page).ariaSnapshot()).not.toContain("›");
  });

  test("only the last crumb is the current page", async ({ page }) => {
    const links = crumbs(page).getByRole("link");
    await expect(links.last()).toHaveAttribute("aria-current", "page");
    await expect(links.first()).not.toHaveAttribute("aria-current");
  });

  test("levels can share a name", async ({ page }) => {
    await expect(
      folders(page).getByRole("link", { name: "Archive", exact: true }),
    ).toHaveCount(2);
  });

  test("long trails wrap inside their container", async ({ page }) => {
    await expect
      .poll(() =>
        folders(page).evaluate((el) => el.scrollWidth <= el.clientWidth),
      )
      .toBe(true);
  });
});
