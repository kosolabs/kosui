import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Drawer Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/drawer");
  });

  const opener = (page: Page) =>
    page.getByRole("button", { name: "Open drawer" });
  const drawer = (page: Page) => page.getByRole("dialog", { name: "Mail" });

  test("a drawer is a named dialog along the start edge", async ({ page }) => {
    await opener(page).click();
    await expect(drawer(page)).toBeVisible();
    await expect(opener(page)).toHaveAttribute("aria-expanded", "true");
    await expect
      .poll(async () => {
        const box = await drawer(page).boundingBox();
        const viewport = page.viewportSize()!;
        return [box!.x, box!.y, box!.height === viewport.height];
      })
      .toEqual([0, 0, true]);
    await expect(
      drawer(page).getByRole("link", { name: "Inbox" }),
    ).toBeFocused();
  });

  test("the end side and right-to-left pages use the other edge", async ({
    page,
  }) => {
    const viewport = page.viewportSize()!;
    const rightEdge = async () => {
      const box = await drawer(page).boundingBox();
      return Math.round(box!.x + box!.width);
    };
    await page.getByRole("radio", { name: "end" }).click();
    await opener(page).click();
    await expect.poll(rightEdge).toBe(viewport.width);
    await page.keyboard.press("Escape");
    await expect(drawer(page)).toBeHidden();
    await page.getByRole("radio", { name: "start" }).click();
    await page.evaluate(() => (document.documentElement.dir = "rtl"));
    await opener(page).click();
    await expect.poll(rightEdge).toBe(viewport.width);
  });

  test("Escape and the backdrop close it and return focus", async ({
    page,
  }) => {
    await opener(page).focus();
    await page.keyboard.press("Enter");
    await expect(drawer(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer(page)).toBeHidden();
    await expect(opener(page)).toBeFocused();
    await opener(page).click();
    await expect(drawer(page)).toBeVisible();
    const viewport = page.viewportSize()!;
    await page.mouse.click(viewport.width - 10, viewport.height / 2);
    await expect(drawer(page)).toBeHidden();
  });

  test("Tab never reaches the page behind it", async ({
    page,
    browserName,
  }) => {
    await opener(page).click();
    await expect(drawer(page)).toBeVisible();
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
      const outside = await page.evaluate(() => {
        const active = document.activeElement;
        return (
          !!active && active !== document.body && !active.closest("dialog")
        );
      });
      expect(outside, "focus reached the page").toBe(false);
    }
  });

  test("choosing an item closes it", async ({ page }) => {
    await opener(page).click();
    await drawer(page).getByRole("link", { name: "Starred" }).click();
    await expect(drawer(page)).toBeHidden();
    await expect(page.getByText("Showing Starred")).toBeVisible();
  });

  test("a form in a drawer applies and closes", async ({ page }) => {
    await page.getByRole("button", { name: "Filters" }).click();
    const filters = page.getByRole("dialog", { name: "Filters" });
    await filters.getByRole("switch", { name: "Unread only" }).click();
    await filters.getByRole("button", { name: "Apply" }).click();
    await expect(filters).toBeHidden();
    await expect(
      page.getByText("Showing unread, with attachments"),
    ).toBeVisible();
  });

  test("it doesn't slide when reduced motion is requested", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await opener(page).click();
    expect(await drawer(page).evaluate((el) => el.getAnimations().length)).toBe(
      0,
    );
  });
});
