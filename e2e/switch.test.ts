import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Switch Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/switch");
  });

  test("switch should have correct role and ARIA attributes", async ({
    page,
  }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");
    await expect(switchElement).toBeVisible();
    await expect(switchElement).toHaveAttribute("role", "switch");
    await expect(switchElement).toHaveAttribute("type", "button");
  });

  test("switch should toggle when clicked", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");

    // Initially unchecked
    await expect(switchElement).not.toBeChecked();

    // Click the switch to toggle it
    await switchElement.click();
    await expect(switchElement).toBeChecked();

    // Click again to uncheck
    await switchElement.click();
    await expect(switchElement).not.toBeChecked();
  });

  test("switch should toggle when space key is pressed", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");

    // Focus the switch
    await switchElement.focus();
    await expect(switchElement).toBeFocused();

    // Initially unchecked
    await expect(switchElement).not.toBeChecked();

    // Press space to toggle
    await page.keyboard.press("Space");
    await expect(switchElement).toBeChecked();

    // Press space again to toggle back
    await page.keyboard.press("Space");
    await expect(switchElement).not.toBeChecked();
  });

  test("switch component supports disabled attribute", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");
    const disabledControlSwitch = page.getByRole("switch", {
      name: "disabled",
    });

    // Disable the switch
    await disabledControlSwitch.click();
    await expect(switchElement).toBeDisabled();

    // Try to click the disabled switch - it should not change state
    await switchElement.click({ force: true });
    await expect(switchElement).not.toBeChecked();

    // Try keyboard interaction - should also not work when disabled
    await switchElement.focus();
    await page.keyboard.press("Space");
    await expect(switchElement).not.toBeChecked();

    // Re-enable the switch
    await disabledControlSwitch.click();
    await expect(switchElement).not.toBeDisabled();

    // Verify it works again
    await switchElement.click();
    await expect(switchElement).toBeChecked();
  });
});
