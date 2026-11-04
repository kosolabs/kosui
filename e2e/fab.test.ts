import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Fab Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/fab");
  });

  const preview = (page: Page) => page.getByTestId("preview");
  const fab = (page: Page) =>
    preview(page).getByRole("button", { name: "New task" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();

  test("an icon-only fab is named by its tooltip", async ({ page }) => {
    await expect(fab(page)).toBeVisible();
    await expect(fab(page)).toHaveText("");
  });

  test("an icon-only fab without a tooltip is named by aria-label", async ({
    page,
  }) => {
    await page.getByRole("switch", { name: "Tooltip" }).click();
    await expect(fab(page)).toHaveAttribute("aria-label", "New task");
  });

  test("an extended fab is named by its label", async ({ page }) => {
    await choose(page, "Content", "both");
    await expect(fab(page)).toHaveText("New task");
  });

  test("fabs activate when enter is pressed", async ({ page }) => {
    await fab(page).focus();
    await page.keyboard.press("Enter");
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("fabs activate when space is pressed", async ({ page }) => {
    await fab(page).focus();
    await page.keyboard.press("Space");
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("a fab renders only its button", async ({ page }) => {
    const before = await fab(page).evaluate(
      (el) => el.previousElementSibling?.outerHTML ?? null,
    );
    expect(before).toBeNull();
  });

  test("a placed fab stays in its corner while the list scrolls", async ({
    page,
  }) => {
    const list = page.getByRole("list", { name: "Tasks" });
    const placed = page
      .getByRole("main")
      .getByRole("button", { name: "New task" })
      .last();
    const corner = async () => {
      const box = await placed.boundingBox();
      const container = await list.boundingBox();
      return {
        right: Math.round(
          container!.x + container!.width - box!.x - box!.width,
        ),
        bottom: Math.round(
          container!.y + container!.height - box!.y - box!.height,
        ),
      };
    };
    const before = await corner();
    await list.evaluate((el) => el.scrollTo(0, el.scrollHeight));
    expect(await corner()).toEqual(before);
    expect(before).toEqual({ right: 16, bottom: 16 });
  });
});
