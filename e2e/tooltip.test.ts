import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Tooltip Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tooltips");
  });

  test("spreading trigger props anchors the tooltip to the trigger", async ({
    page,
  }) => {
    const trigger = page.getByRole("main").getByText("Just a Div");
    const tooltip = page
      .getByRole("tooltip")
      .filter({ hasText: "Trigger is just a styled div" });

    await expect(async () => {
      await page.mouse.move(0, 0);
      await trigger.hover();
      await expect(tooltip).toBeVisible({ timeout: 2000 });
    }).toPass();

    const triggerBox = await trigger.boundingBox();
    const tooltipBox = await tooltip.boundingBox();
    expect(triggerBox).not.toBeNull();
    expect(tooltipBox).not.toBeNull();
    const gap = Math.min(
      Math.abs(tooltipBox!.y + tooltipBox!.height - triggerBox!.y),
      Math.abs(triggerBox!.y + triggerBox!.height - tooltipBox!.y),
    );
    expect(gap).toBeLessThan(24);
    const tooltipCenter = tooltipBox!.x + tooltipBox!.width / 2;
    expect(tooltipCenter).toBeGreaterThan(triggerBox!.x - tooltipBox!.width);
    expect(tooltipCenter).toBeLessThan(
      triggerBox!.x + triggerBox!.width + tooltipBox!.width,
    );
  });
});
