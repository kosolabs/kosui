import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Tooltip Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tooltips");
    await page.evaluate(() => document.fonts.ready);
  });

  const archive = (page: Page) => page.getByRole("button", { name: "Archive" });
  const tooltip = (page: Page, text: string | RegExp) =>
    page.getByRole("tooltip").filter({ hasText: text });

  test("hovering shows the tooltip next to its trigger", async ({ page }) => {
    await archive(page).hover();
    const tip = tooltip(page, "Moves the project");
    await expect(tip).toBeVisible();
    const trigger = (await archive(page).boundingBox())!;
    const box = (await tip.boundingBox())!;
    expect(Math.round(trigger.y - (box.y + box.height))).toBe(6);
  });

  test("the pointer can move onto a tooltip without it closing", async ({
    page,
  }) => {
    await archive(page).hover();
    const tip = tooltip(page, "Moves the project");
    await expect(tip).toBeVisible();
    const box = (await tip.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
      steps: 8,
    });
    await page.waitForTimeout(300);
    await expect(tip).toBeVisible();
    await page.mouse.move(1, 1);
    await expect(tip).toBeHidden();
  });

  test("keyboard focus shows the tooltip and it describes the trigger", async ({
    page,
  }) => {
    const trigger = page.getByRole("button", { name: "3–5 business days" });
    await trigger.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(tooltip(page, "Monday to Friday")).toBeVisible();
    await expect(trigger).toHaveAccessibleDescription(
      "Monday to Friday, excluding public holidays",
    );
    await page.keyboard.press("Escape");
    await expect(tooltip(page, "Monday to Friday")).toBeHidden();
  });

  test("a click tooltip toggles like a disclosure and follows its trigger", async ({
    page,
  }) => {
    const info = page.getByRole("button", { name: "About estimates" });
    await info.click();
    await expect(info).toHaveAttribute("aria-expanded", "true");
    const link = page.getByRole("link", { name: "Read about story points" });
    await expect(link).toBeVisible();
    expect(
      await info.evaluate(
        (el, link) =>
          !!(
            el.compareDocumentPosition(link!) & Node.DOCUMENT_POSITION_FOLLOWING
          ),
        await link.elementHandle(),
      ),
    ).toBe(true);
    await info.click();
    await expect(info).toHaveAttribute("aria-expanded", "false");
    await expect(link).toBeHidden();
  });

  test("icon-only buttons are named by their tooltip, others described", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Copy link" })).toBeVisible();
    const duplicate = page.getByRole("button", { name: "Duplicate" });
    await duplicate.hover();
    await expect(duplicate).toHaveAccessibleDescription(
      "Saves a copy you can edit",
    );
  });
});

test.describe("Tooltip on a touch-capable computer", () => {
  test.use({ hasTouch: true });

  test("a mouse hover still shows the tooltip", async ({ page }) => {
    await page.goto("/tooltips");
    await page.getByRole("button", { name: "Archive" }).hover();
    await expect(
      page.getByRole("tooltip").filter({ hasText: "Moves the project" }),
    ).toBeVisible();
  });
});
