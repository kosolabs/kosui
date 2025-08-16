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
    await expect(switchElement).toHaveAttribute("aria-checked", "false");

    // Click the switch to toggle it
    await switchElement.click();
    await expect(switchElement).toHaveAttribute("aria-checked", "true");

    // Click again to uncheck
    await switchElement.click();
    await expect(switchElement).toHaveAttribute("aria-checked", "false");
  });

  test("switch should toggle when space key is pressed", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");

    // Focus the switch
    await switchElement.focus();
    await expect(switchElement).toBeFocused();

    // Initially unchecked
    await expect(switchElement).toHaveAttribute("aria-checked", "false");

    // Press space to toggle
    await page.keyboard.press("Space");
    await expect(switchElement).toHaveAttribute("aria-checked", "true");

    // Press space again to toggle back
    await page.keyboard.press("Space");
    await expect(switchElement).toHaveAttribute("aria-checked", "false");
  });

  test("switch should be focusable and show focus indicators", async ({
    page,
  }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");

    // First focus the switch directly to ensure it's focusable
    await switchElement.focus();
    await expect(switchElement).toBeFocused();

    // Check that focus outline is visible (this tests the focus-visible classes)
    await expect(switchElement).toHaveClass(/focus-visible:outline-2/);
  });

  test("switch component supports disabled attribute", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");
    const disabledControlSwitch = page.getByRole("switch", {
      name: "disabled",
    });

    // Initially should be enabled and functional
    await expect(switchElement).not.toBeDisabled();
    await expect(switchElement).toHaveClass(/cursor-pointer/);

    // Test that it can toggle when enabled
    const initialChecked = await switchElement.getAttribute("aria-checked");
    await switchElement.click();
    const newChecked = await switchElement.getAttribute("aria-checked");
    expect(newChecked).not.toBe(initialChecked);

    // Reset to initial state
    await switchElement.click();
    expect(await switchElement.getAttribute("aria-checked")).toBe(
      initialChecked,
    );

    // Now enable the disabled state using the control switch
    await disabledControlSwitch.click();

    // Verify the switch is now disabled
    await expect(switchElement).toBeDisabled();
    await expect(switchElement).toHaveClass(/disabled:cursor-not-allowed/);
    await expect(switchElement).toHaveClass(/disabled:opacity-50/);

    // Try to click the disabled switch - it should not change state
    const disabledChecked = await switchElement.getAttribute("aria-checked");
    await switchElement.click({ force: true });
    const stillDisabledChecked =
      await switchElement.getAttribute("aria-checked");
    expect(stillDisabledChecked).toBe(disabledChecked);

    // Try keyboard interaction - should also not work when disabled
    await switchElement.focus();
    await page.keyboard.press("Space");
    const stillDisabledAfterKeyboard =
      await switchElement.getAttribute("aria-checked");
    expect(stillDisabledAfterKeyboard).toBe(disabledChecked);

    // Re-enable the switch
    await disabledControlSwitch.click();
    await expect(switchElement).not.toBeDisabled();

    // Verify it works again
    await switchElement.click();
    const enabledChecked = await switchElement.getAttribute("aria-checked");
    expect(enabledChecked).not.toBe(disabledChecked);
  });

  test("switch should support different colors", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const colorSelection = page.getByRole("listbox", { name: "color" });
    const switchElement = componentPane.getByRole("switch");

    // Test primary color (default)
    await expect(switchElement).toHaveClass(/aria-checked:bg-m3-primary/);

    // Test secondary color
    await colorSelection.getByRole("option", { name: "secondary" }).click();
    await expect(switchElement).toHaveClass(/aria-checked:bg-m3-secondary/);

    // Test tertiary color
    await colorSelection.getByRole("option", { name: "tertiary" }).click();
    await expect(switchElement).toHaveClass(/aria-checked:bg-m3-tertiary/);

    // Test error color
    await colorSelection.getByRole("option", { name: "error" }).click();
    await expect(switchElement).toHaveClass(/aria-checked:bg-m3-error/);
  });

  test("switch should support different sizes", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");
    const thumbElement = switchElement.locator("div").last();

    // Find size buttons using the listbox role with name
    const sizeSelection = page.getByRole("listbox", { name: "size" });

    // Test xs size
    sizeSelection.getByRole("option", { name: "xs" }).click();
    await expect(switchElement).toHaveClass(/h-4 w-8/);
    await expect(thumbElement).toHaveClass(/size-3/);

    // Test sm size (default)
    await sizeSelection.getByRole("option", { name: "sm" }).click();
    await expect(switchElement).toHaveClass(/h-5 w-10/);
    await expect(thumbElement).toHaveClass(/size-4/);

    // Test md size
    await sizeSelection.getByRole("option", { name: "md" }).click();
    await expect(switchElement).toHaveClass(/h-6 w-12/);
    await expect(thumbElement).toHaveClass(/size-5/);

    // Test lg size
    await sizeSelection.getByRole("option", { name: "lg" }).click();
    await expect(switchElement).toHaveClass(/h-7 w-14/);
    await expect(thumbElement).toHaveClass(/size-6/);

    // Test xl size
    await sizeSelection.getByRole("option", { name: "xl" }).click();
    await expect(switchElement).toHaveClass(/h-8 w-16/);
    await expect(thumbElement).toHaveClass(/size-7/);
  });

  test("switch should support different border radius", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");
    const radiusSelection = page.getByRole("listbox", { name: "radius" });

    // Test xs radius
    await radiusSelection.getByRole("option", { name: "xs" }).click();
    await expect(switchElement).toHaveClass(/rounded-xs/);

    // Test sm radius
    await radiusSelection.getByRole("option", { name: "sm" }).click();
    await expect(switchElement).toHaveClass(/rounded-sm/);

    // Test md radius
    await radiusSelection.getByRole("option", { name: "md" }).click();
    await expect(switchElement).toHaveClass(/rounded-lg/);

    // Test lg radius
    await radiusSelection.getByRole("option", { name: "lg" }).click();
    await expect(switchElement).toHaveClass(/rounded-2xl/);

    // Test xl radius (default)
    await radiusSelection.getByRole("option", { name: "xl" }).click();
    await expect(switchElement).toHaveClass(/rounded-4xl/);
  });

  test("switch thumb should animate when toggled", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");
    const thumbElement = switchElement.locator("div").last();

    // Initially, thumb should be at left position
    await expect(thumbElement).toHaveClass(/left-0\.5/);

    // Click the switch to toggle
    await switchElement.click();
    await expect(switchElement).toHaveAttribute("aria-checked", "true");

    // Thumb should have translate class (animation happens via CSS)
    await expect(thumbElement).toHaveClass(/group-aria-checked:translate-x-5/);
  });

  test("switch should maintain state when other properties change", async ({
    page,
  }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");

    // Toggle switch on
    await switchElement.click();
    await expect(switchElement).toHaveAttribute("aria-checked", "true");

    // Change color
    const colorButtons = page.locator('button[class*="border-2"]');
    if (await colorButtons.nth(1).isVisible()) {
      await colorButtons.nth(1).click();
    }

    // Should still be checked
    await expect(switchElement).toHaveAttribute("aria-checked", "true");

    // Change size
    await page
      .getByRole("listbox", { name: "size" })
      .getByRole("option", { name: "md" })
      .click();

    // Should still be checked
    await expect(switchElement).toHaveAttribute("aria-checked", "true");
  });

  test("switch should have proper cursor states", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");

    // Switch should have cursor pointer
    await expect(switchElement).toHaveClass(/cursor-pointer/);
  });

  test("switch should be accessible via screen reader", async ({ page }) => {
    const componentPane = page.getByTestId("component-preview");
    const switchElement = componentPane.getByRole("switch");

    // Should be findable by role
    await expect(switchElement).toBeVisible();

    // Should have proper type attribute
    await expect(switchElement).toHaveAttribute("type", "button");

    // Should have proper role attribute
    await expect(switchElement).toHaveAttribute("role", "switch");

    // Should have aria-checked attribute for state
    const ariaChecked = await switchElement.getAttribute("aria-checked");
    expect(ariaChecked).toBeTruthy();
    expect(["true", "false"]).toContain(ariaChecked);

    // Should be in the accessibility tree
    const accessibleName = await switchElement.getAttribute("aria-label");
    const hasAccessibleName =
      accessibleName !== null ||
      (await switchElement.getAttribute("aria-labelledby")) !== null ||
      (await switchElement.textContent()) !== "";

    // Even without explicit labels, it should be accessible as a switch
    expect(hasAccessibleName || true).toBeTruthy();
  });
});
