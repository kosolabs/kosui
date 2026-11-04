import { expect, test, type Locator, type Page } from "@playwright/test";

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

  const placed = async (anchor: Locator, popover: Locator) => {
    const a = (await anchor.boundingBox())!;
    const p = (await popover.boundingBox())!;
    const below = p.y - (a.y + a.height);
    const above = a.y - (p.y + p.height);
    const right = p.x - (a.x + a.width);
    const left = a.x - (p.x + p.width);
    const gap = Math.round(Math.max(below, above, right, left));
    const side = [
      ["bottom", below],
      ["top", above],
      ["right", right],
      ["left", left],
    ].find(([, distance]) => Math.round(distance as number) === gap)![0];
    const offset =
      side === "top" || side === "bottom"
        ? p.x + p.width / 2 - (a.x + a.width / 2)
        : p.y + p.height / 2 - (a.y + a.height / 2);
    return { side, gap, centered: Math.abs(offset) <= 1 };
  };

  test("each placement puts the popover 6 pixels away, centered", async ({
    page,
  }) => {
    const details = page.getByRole("button", { name: "Details", exact: true });
    const popover = page.getByRole("dialog", { name: "Details" });
    for (const placement of ["top", "right", "bottom", "left"]) {
      await page
        .getByRole("radiogroup", { name: "Placement" })
        .getByRole("radio", { name: placement, exact: true })
        .click();
      await details.click();
      await expect(popover).toBeVisible();
      await expect
        .poll(() => placed(details, popover))
        .toEqual({ side: placement, gap: 6, centered: true });
      await page.keyboard.press("Escape");
      await expect(popover).toBeHidden();
    }
  });

  test("a popover flips to the other side when there's no room", async ({
    page,
  }) => {
    await trigger(page).evaluate((el) => el.scrollIntoView({ block: "end" }));
    await trigger(page).focus();
    await page.keyboard.press("Enter");
    await expect(panel(page)).toBeVisible();
    await expect
      .poll(async () => (await placed(trigger(page), panel(page))).side)
      .toBe("top");
  });

  test("reopening while it closes shows the popover", async ({ page }) => {
    const details = page.getByRole("button", { name: "Details", exact: true });
    const popover = page.getByRole("dialog", { name: "Details" });
    await details.click();
    await expect(popover).toBeVisible();
    await page.keyboard.press("Escape");
    await details.click();
    await expect(details).toHaveAttribute("aria-expanded", "true");
    await expect(popover).toBeVisible();
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
