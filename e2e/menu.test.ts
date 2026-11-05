import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Menu Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/menus");
  });

  const options = (page: Page) => page.getByRole("button", { name: "Options" });
  const menu = (page: Page, name = "Options") =>
    page.getByRole("menu", { name });
  const item = (page: Page, name: string) =>
    page.getByRole("menuitem", { name, exact: true });

  async function openWith(page: Page, key: string) {
    await options(page).focus();
    await page.keyboard.press(key);
    await expect(menu(page)).toBeVisible();
  }

  test("the trigger and menu are linked and the menu is named", async ({
    page,
  }) => {
    await expect(options(page)).toHaveAttribute("aria-haspopup", "menu");
    await expect(options(page)).toHaveAttribute("aria-expanded", "false");
    await openWith(page, "Enter");
    await expect(options(page)).toHaveAttribute("aria-expanded", "true");
    await expect(menu(page)).toMatchAriaSnapshot(`
      - menu "Options":
        - menuitem "Rename"
        - menuitem "Duplicate"
        - separator
        - menuitem "Delete"
    `);
  });

  for (const key of ["Enter", "Space", "ArrowDown"]) {
    test(`${key} on the trigger opens the menu on its first item`, async ({
      page,
    }) => {
      await openWith(page, key === "Space" ? " " : key);
      await expect(item(page, "Rename")).toBeFocused();
    });
  }

  test("ArrowUp on the trigger opens the menu on its last item", async ({
    page,
  }) => {
    await openWith(page, "ArrowUp");
    await expect(item(page, "Delete")).toBeFocused();
  });

  test("a click opens the menu with focus on the menu", async ({ page }) => {
    await options(page).click();
    await expect(menu(page)).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(item(page, "Rename")).toBeFocused();
  });

  test("arrow keys, Home and End move between items and wrap", async ({
    page,
  }) => {
    await openWith(page, "Enter");
    await page.keyboard.press("ArrowDown");
    await expect(item(page, "Duplicate")).toBeFocused();
    await page.keyboard.press("End");
    await expect(item(page, "Delete")).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(item(page, "Rename")).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(item(page, "Delete")).toBeFocused();
    await page.keyboard.press("Home");
    await expect(item(page, "Rename")).toBeFocused();
  });

  test("typing a letter cycles through items that start with it", async ({
    page,
  }) => {
    await openWith(page, "Enter");
    await page.keyboard.press("d");
    await expect(item(page, "Duplicate")).toBeFocused();
    await page.keyboard.press("d");
    await expect(item(page, "Delete")).toBeFocused();
    await page.keyboard.press("d");
    await expect(item(page, "Duplicate")).toBeFocused();
  });

  test("Enter and Space choose an item and return focus", async ({ page }) => {
    await openWith(page, "Enter");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(menu(page)).toBeHidden();
    await expect(page.getByText("Duplicated")).toBeVisible();
    await expect(options(page)).toBeFocused();

    await openWith(page, "Enter");
    await page.keyboard.press(" ");
    await expect(menu(page)).toBeHidden();
    await expect(page.getByText("Renamed")).toBeVisible();
    await expect(options(page)).toBeFocused();
  });

  test("clicking an item chooses it", async ({ page }) => {
    await options(page).click();
    await item(page, "Delete").click();
    await expect(menu(page)).toBeHidden();
    await expect(page.getByText("Deleted")).toBeVisible();
  });

  test("Escape closes the menu and returns focus to the trigger", async ({
    page,
  }) => {
    await openWith(page, "Enter");
    await page.keyboard.press("Escape");
    await expect(menu(page)).toBeHidden();
    await expect(options(page)).toBeFocused();
  });

  test("Tab closes the menu and moves on", async ({ page }) => {
    await openWith(page, "Enter");
    await page.keyboard.press("Tab");
    await expect(menu(page)).toBeHidden();
    await expect(options(page)).not.toBeFocused();
    await expect(item(page, "Rename")).toHaveCount(0);
  });

  test("the pointer moves focus, and leaving keeps it in the menu", async ({
    page,
  }) => {
    await options(page).click();
    await item(page, "Duplicate").hover();
    await expect(item(page, "Duplicate")).toBeFocused();
    const box = (await menu(page).boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height + 40);
    await expect(menu(page)).toBeFocused();
  });

  test("checked items and groups are exposed", async ({ page }) => {
    const view = page.getByRole("button", { name: "View" });
    await view.focus();
    await page.keyboard.press("Enter");
    const viewMenu = menu(page, "View");
    await expect(
      viewMenu.getByRole("group", { name: "Sort by" }),
    ).toBeVisible();
    const hidden = viewMenu.getByRole("menuitemcheckbox", {
      name: "Hidden files",
    });
    await expect(hidden).not.toBeChecked();
    await hidden.click();
    await view.focus();
    await page.keyboard.press("Enter");
    await expect(hidden).toBeChecked();
  });

  test("disabled items are skipped", async ({ page }) => {
    const more = page.getByRole("button", { name: "More actions" });
    await more.focus();
    await page.keyboard.press("ArrowUp");
    const moreMenu = menu(page, "More actions");
    await expect(
      moreMenu.getByRole("menuitem", { name: "Archive" }),
    ).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(
      moreMenu.getByRole("menuitem", { name: "Share" }),
    ).toBeFocused();
  });

  test("a menu divider is a separator inset from the menu's edges", async ({
    page,
  }) => {
    await options(page).click();
    const separator = menu(page).getByRole("separator");
    await expect(separator).toBeVisible();
    await expect
      .poll(async () => {
        const [outer, line] = await Promise.all([
          menu(page).boundingBox(),
          separator.boundingBox(),
        ]);
        return (
          line!.x - outer!.x >= 4 &&
          outer!.x + outer!.width - (line!.x + line!.width) >= 4
        );
      })
      .toBe(true);
  });
});
