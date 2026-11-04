import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Popover Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/popover");
    await page.evaluate(() => document.fonts.ready);
  });

  const trigger = (page: Page) =>
    page.getByRole("button", { name: "View options" });
  const panel = (page: Page) =>
    page.getByRole("dialog", { name: "View options" });
  const gap = (page: Page, name: string, dialog: string) =>
    page.evaluate(
      ([name, dialog]) => {
        const button = [...document.querySelectorAll("button")]
          .find((b) => b.textContent?.trim() === name)!
          .getBoundingClientRect();
        const popover = document
          .querySelector(`[role=dialog][aria-label="${dialog}"]`)!
          .getBoundingClientRect();
        return {
          apart: Math.round(
            Math.max(popover.top - button.bottom, button.top - popover.bottom),
          ),
          left: Math.round(popover.left - button.left),
        };
      },
      [name, dialog],
    );

  test("a popover opens 6 pixels from its anchor, aligned to its start", async ({
    page,
  }) => {
    await trigger(page).evaluate((el) =>
      el.scrollIntoView({ block: "center" }),
    );
    await trigger(page).click();
    await expect(panel(page)).toBeVisible();
    await expect(trigger(page)).toHaveAttribute("aria-expanded", "true");
    await expect
      .poll(() => gap(page, "View options", "View options"))
      .toEqual({ apart: 6, left: 0 });
  });

  test("the arrow points at the anchor", async ({ page }) => {
    await page.getByRole("button", { name: "Details", exact: true }).click();
    const details = page.getByRole("dialog", { name: "Details" });
    await expect(details).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() => {
          const anchor = [...document.querySelectorAll("button")]
            .find((b) => b.textContent?.trim() === "Details")!
            .getBoundingClientRect();
          const arrow = document
            .querySelector('[role=dialog][aria-label="Details"] > .rotate-45')!
            .getBoundingClientRect();
          return Math.round(
            arrow.left + arrow.width / 2 - (anchor.left + anchor.width / 2),
          );
        }),
      )
      .toBe(0);
    await expect(details).toHaveCSS("overflow", "visible");
  });

  test("Escape closes the popover and returns focus to its anchor", async ({
    page,
  }) => {
    await trigger(page).click();
    await page.getByRole("switch", { name: "Show archived tasks" }).focus();
    await page.keyboard.press("Escape");
    await expect(panel(page)).toBeHidden();
    await expect(trigger(page)).toBeFocused();
  });

  test("clicking outside closes it, clicking inside doesn't", async ({
    page,
  }) => {
    await trigger(page).click();
    await page.getByRole("switch", { name: "Show archived tasks" }).click();
    await expect(panel(page)).toBeVisible();
    await expect(page.getByText(/and archived tasks/)).toBeVisible();
    await page.mouse.click(5, 5);
    await expect(panel(page)).toBeHidden();
  });

  test("clicks inside a popover reach the rest of the page", async ({
    page,
  }) => {
    await trigger(page).click();
    await page.evaluate(() => {
      (window as unknown as { clicks: number }).clicks = 0;
      document.addEventListener(
        "click",
        () => (window as unknown as { clicks: number }).clicks++,
      );
    });
    await page.getByRole("switch", { name: "Show done tasks" }).click();
    expect(
      await page.evaluate(
        () => (window as unknown as { clicks: number }).clicks,
      ),
    ).toBeGreaterThan(0);
  });
});

test.describe("Popover with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("a popover opens without animating", async ({ page }) => {
    await page.goto("/popover");
    await page.getByRole("button", { name: "View options" }).click();
    const panel = page.getByRole("dialog", { name: "View options" });
    await expect(panel).toBeVisible();
    expect(await panel.evaluate((el) => el.getAnimations().length)).toBe(0);
  });
});
