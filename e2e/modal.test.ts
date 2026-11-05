import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Modal Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/modal");
  });

  const showTerms = (page: Page) =>
    page.getByRole("button", { name: "Show terms" });
  const terms = (page: Page) =>
    page.getByRole("dialog", { name: "Terms of service" });

  test("a modal is a named dialog that takes focus", async ({ page }) => {
    const rename = page.getByRole("button", { name: "Rename" });
    await rename.click();
    await expect(
      page.getByRole("dialog", { name: "Rename project" }),
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Name" })).toBeFocused();
  });

  test("Escape closes it, calls onCancel and returns focus", async ({
    page,
  }) => {
    await showTerms(page).focus();
    await page.keyboard.press("Enter");
    await expect(terms(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(terms(page)).toBeHidden();
    await expect(page.getByText("Dismissed", { exact: true })).toBeVisible();
    await expect(showTerms(page)).toBeFocused();
  });

  test("clicking the backdrop closes it, clicking inside doesn't", async ({
    page,
  }) => {
    await showTerms(page).click();
    await expect(terms(page)).toBeVisible();
    const box = (await terms(page).boundingBox())!;
    await page.mouse.click(box.x + 10, box.y + 10);
    await expect(terms(page)).toBeVisible();
    await page.mouse.click(box.x / 2, box.y / 2);
    await expect(terms(page)).toBeHidden();
  });

  test("a drag between the backdrop and the modal doesn't close it", async ({
    page,
  }) => {
    await showTerms(page).click();
    await expect(terms(page)).toBeVisible();
    const box = (await terms(page).boundingBox())!;
    const inside = { x: box.x + 10, y: box.y + 10 };
    const outside = { x: box.x / 2, y: box.y / 2 };
    for (const [from, to] of [
      [outside, inside],
      [inside, outside],
    ]) {
      await page.mouse.move(from.x, from.y);
      await page.mouse.down();
      await page.mouse.move(to.x, to.y);
      await page.mouse.up();
      await expect(terms(page)).toBeVisible();
    }
  });

  test("a form in a modal submits and returns focus to its opener", async ({
    page,
  }) => {
    const rename = page.getByRole("button", { name: "Rename" });
    await rename.focus();
    await page.keyboard.press("Enter");
    const name = page.getByRole("textbox", { name: "Name" });
    await expect(name).toBeFocused();
    await name.fill("Annual plan");
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("dialog", { name: "Rename project" }),
    ).toBeHidden();
    await expect(page.getByText("Project: Annual plan")).toBeVisible();
    await expect(rename).toBeFocused();
  });

  test("page shortcuts don't fire while a modal is open", async ({ page }) => {
    await page.evaluate(() => {
      (window as unknown as { keys: number }).keys = 0;
      window.addEventListener(
        "keydown",
        () => (window as unknown as { keys: number }).keys++,
      );
    });
    await showTerms(page).click();
    await expect(terms(page)).toBeVisible();
    await page.keyboard.press("x");
    expect(
      await page.evaluate(() => (window as unknown as { keys: number }).keys),
    ).toBe(0);
  });
});

test.describe("Modal with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("a modal opens without animating", async ({ page }) => {
    await page.goto("/modal");
    await page.getByRole("button", { name: "Show terms" }).click();
    const terms = page.getByRole("dialog", { name: "Terms of service" });
    await expect(terms).toBeVisible();
    expect(await terms.evaluate((el) => el.getAnimations().length)).toBe(0);
  });
});
