import { expect, Locator, Page, test } from "@playwright/test";
import { gotoComponent } from "./test-utils";

test.describe.configure({ mode: "parallel" });

async function getSliderValue(page: Page): Promise<number> {
  const sliderValue = await page
    .getByTestId("preview")
    .getByRole("slider")
    .getAttribute("aria-valuenow");
  expect(sliderValue).toBeDefined();
  return parseInt(sliderValue!);
}

function expectSliderValue(page: Page): ReturnType<typeof expect.poll<number>> {
  return expect.poll(async () => await getSliderValue(page));
}

async function getSliderBoundingBox(
  slider: Locator,
): Promise<{ x: number; y: number; width: number; height: number }> {
  const sliderBox = await slider.boundingBox();
  expect(sliderBox).toBeDefined();
  return sliderBox!;
}

test.describe("Slider Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponent(page, "Slider");
  });

  test("slider should have correct role and ARIA attributes", async ({
    page,
  }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");

    await expect(sliderElement).toBeVisible();
    await expect(sliderElement).toHaveAttribute("role", "slider");
    await expect(sliderElement).toHaveAttribute("aria-valuenow");
    await expect(sliderElement).toHaveAttribute("aria-valuemin", "0");
    await expect(sliderElement).toHaveAttribute("aria-valuemax", "100");
    await expect(sliderElement).toHaveAttribute("tabindex", "0");
  });

  test("slider should display current value", async ({ page }) => {
    const valueDisplay = page.getByTestId("preview").getByRole("status");

    // Check that the value text contains a number
    await expect(valueDisplay).toContainText(/Value: \d+/);
  });

  test("slider should change value when clicked", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");
    const valueDisplay = page.getByTestId("preview").getByRole("status");

    // Get the bounding box so that we can click specific spots
    const sliderBox = await getSliderBoundingBox(sliderElement);

    // Click around 30%
    await page.mouse.click(
      sliderBox.x + sliderBox.width * 0.3,
      sliderBox.y + sliderBox.height / 2,
    );

    // Check that the ARIA value is around 30
    const firstValue = await getSliderValue(page);
    expect(firstValue).toBeCloseTo(30, -1);

    // Verify the display value is the same
    await expect(valueDisplay).toContainText(`Value: ${firstValue}`);

    // Click 80%
    await page.mouse.click(
      sliderBox.x + sliderBox.width * 0.8,
      sliderBox.y + sliderBox.height / 2,
    );

    // Check that the ARIA value is around 80
    const secondValue = await getSliderValue(page);
    expect(secondValue).toBeCloseTo(80, -1);

    // Verify the display value is the same
    await expect(valueDisplay).toContainText(`Value: ${secondValue}`);
  });

  test("slider should increase on ArrowRight", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");

    // Focus the slider
    await sliderElement.focus();

    // Get initial value
    const initialValue = await getSliderValue(page);

    // Test arrow right increases value
    await page.keyboard.press("ArrowRight");
    await expectSliderValue(page).toBeGreaterThan(initialValue);
  });

  test("slider should increase on ArrowUp", async ({ page }) => {
    // Focus the slider
    await page.getByTestId("preview").getByRole("slider").focus();

    // Get initial value
    const initialValue = await getSliderValue(page);

    // Test arrow up increases value
    await page.keyboard.press("ArrowUp");
    await expectSliderValue(page).toBeGreaterThan(initialValue);
  });

  test("slider should decrease on ArrowLeft", async ({ page }) => {
    // Focus the slider
    await page.getByTestId("preview").getByRole("slider").focus();

    // Get initial value
    const initialValue = await getSliderValue(page);

    // Test arrow left decreases value
    await page.keyboard.press("ArrowLeft");
    await expectSliderValue(page).toBeLessThan(initialValue);
  });

  test("slider should decrease on ArrowDown", async ({ page }) => {
    // Focus the slider
    await page.getByTestId("preview").getByRole("slider").focus();

    // Get initial value
    const initialValue = await getSliderValue(page);

    // Test arrow down decreases value
    await page.keyboard.press("ArrowDown");
    await expectSliderValue(page).toBeLessThan(initialValue);
  });

  test("slider have minimum value on Home", async ({ page }) => {
    // Focus the slider
    await page.getByTestId("preview").getByRole("slider").focus();

    // Test home sets value to min
    await page.keyboard.press("Home");
    const currentValue = await getSliderValue(page);
    expect(currentValue).toBe(0);
  });

  test("slider have maximum value on End", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");

    // Focus the slider
    await sliderElement.focus();

    // Test end sets value to max
    await page.keyboard.press("End");
    await expectSliderValue(page).toBe(100);
  });

  test("slider should support drag interaction", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");
    const sliderBox = await getSliderBoundingBox(sliderElement);

    // Start drag from left side
    await page.mouse.move(
      sliderBox.x + sliderBox.width * 0.2,
      sliderBox.y + sliderBox.height / 2,
    );
    await page.mouse.down();

    expect(await getSliderValue(page)).toBeLessThan(50);

    // Drag to right side
    await page.mouse.move(
      sliderBox.x + sliderBox.width * 0.8,
      sliderBox.y + sliderBox.height / 2,
    );

    // Check value changed during drag
    await expectSliderValue(page).toBeGreaterThan(50);

    await page.mouse.up();

    // Value should remain after releasing
    await expectSliderValue(page).toBeGreaterThan(50);
  });

  test("disabled slider should not respond to interactions", async ({
    page,
  }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");
    const disabledSwitch = page.getByRole("switch", { name: "disabled" });

    // Disable the slider
    await disabledSwitch.click();

    // Check slider is disabled
    await expect(sliderElement).toHaveAttribute("aria-disabled", "true");
    await expect(sliderElement).toHaveAttribute("tabindex", "-1");

    // Get initial value
    const initialValue = await sliderElement.getAttribute("aria-valuenow");

    // Try to click - should not change value
    const sliderBox = await getSliderBoundingBox(sliderElement);
    await page.mouse.click(
      sliderBox.x + sliderBox.width * 0.8,
      sliderBox.y + sliderBox.height / 2,
    );

    // Value should not have changed
    const newValue = await sliderElement.getAttribute("aria-valuenow");
    expect(newValue).toBe(initialValue);

    // Try keyboard - should not work when disabled
    await sliderElement.focus();
    await page.keyboard.press("ArrowRight");
    const keyboardValue = await sliderElement.getAttribute("aria-valuenow");
    expect(keyboardValue).toBe(initialValue);
  });

  test("slider should display marks when enabled", async ({ page }) => {
    const showMarksSwitch = page.getByRole("switch", { name: "Show marks" });

    // Ensure marks are enabled (should be by default)
    await expect(showMarksSwitch).toBeChecked();

    // Check that mark labels are visible
    await expect(page.getByTestId("preview").getByText("50%")).toBeVisible();

    // Disable marks
    await showMarksSwitch.click();

    // Check that marks are hidden
    await expect(
      page.getByTestId("preview").getByText("50%"),
    ).not.toBeVisible();
  });

  test("slider should change value when a mark is clicked", async ({
    page,
  }) => {
    // Click the 20% mark
    await page
      .getByTestId("preview")
      .getByRole("button", { name: "20%" })
      .click();

    // Value should be 20
    await expectSliderValue(page).toBe(20);

    // Click the 50% mark
    await page
      .getByTestId("preview")
      .getByRole("button", { name: "50%" })
      .click();

    // Value should be 50
    await expectSliderValue(page).toBe(50);
  });

  test("label should appear when thumb is hovered", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");
    const sliderBox = await getSliderBoundingBox(sliderElement);

    // Click the slider which will set the slider position and also hover
    await page.mouse.click(
      sliderBox.x + sliderBox.width * 0.2,
      sliderBox.y + sliderBox.height / 2,
    );

    // The label should be visible
    const currentValue = await getSliderValue(page);
    await expect(
      page.getByTestId("preview").getByRole("tooltip"),
    ).toContainText(`${currentValue}`);
  });

  test("label should appear when focused", async ({ page }) => {
    // Focus the slider
    await page.getByTestId("preview").getByRole("slider").focus();

    // The label should be visible
    const currentValue = await getSliderValue(page);
    await expect(
      page.getByTestId("preview").getByRole("tooltip"),
    ).toContainText(`${currentValue}`);
  });

  test("label should appear when dragging", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");
    const sliderBox = await getSliderBoundingBox(sliderElement);

    // Start dragging
    await page.mouse.move(
      sliderBox.x + sliderBox.width * 0.2,
      sliderBox.y + sliderBox.height / 2,
    );
    await page.mouse.down();

    // Check that the label is visible and less than 50
    let currentValue = await getSliderValue(page);
    expect(currentValue).toBeLessThan(50);
    await expect(
      page.getByTestId("preview").getByRole("tooltip"),
    ).toContainText(`${currentValue}`);

    // Drag
    await page.mouse.move(
      sliderBox.x + sliderBox.width * 0.8,
      sliderBox.y + sliderBox.height / 2,
    );

    // Check that the label is visible and more than 50
    currentValue = await getSliderValue(page);
    expect(currentValue).toBeGreaterThan(50);
    await expect(
      page.getByTestId("preview").getByRole("tooltip"),
    ).toContainText(`${currentValue}`);

    // Stop dragging
    await page.mouse.up();
  });

  test("label should appear when always on is enabled", async ({ page }) => {
    const labelAlwaysOnSwitch = page.getByRole("switch", {
      name: "Label always on",
    });

    // Enable label always on
    await labelAlwaysOnSwitch.click();

    // The label should be visible
    const currentValue = await getSliderValue(page);
    await expect(
      page.getByTestId("preview").getByRole("tooltip"),
    ).toContainText(`${currentValue}`);
  });

  test("inverted slider should behave correctly", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");
    const sliderBox = await getSliderBoundingBox(sliderElement);
    const invertedSwitch = page.getByRole("switch", { name: "Inverted" });

    // Get initial value and position
    const initialValue = await getSliderValue(page);

    // Enable inverted mode
    await invertedSwitch.click();

    // Click on the left side of the slider - in inverted mode this should increase value
    await page.mouse.click(
      sliderBox.x + sliderBox.width * 0.2,
      sliderBox.y + sliderBox.height / 2,
    );

    // In inverted mode, clicking on the left should result in a higher value
    // than clicking on the right in normal mode
    await expectSliderValue(page).toBeGreaterThan(initialValue);
  });

  test("restrict to marks should snap to mark values", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");
    const sliderBox = await getSliderBoundingBox(sliderElement);

    // Ensure marks are visible
    await expect(
      page.getByRole("switch", { name: "Show marks" }),
    ).toBeChecked();

    // Enable restrict to marks
    await page.getByRole("switch", { name: "Restrict to marks" }).click();

    // Click around 60%, should snap to 50%
    await page.mouse.click(
      sliderBox.x + sliderBox.width * 0.6,
      sliderBox.y + sliderBox.height / 2,
    );

    // Should snap to either 20 or 50 (the defined marks)
    await expectSliderValue(page).toBe(50);
  });

  test("slider should be focusable and have visible focus state", async ({
    page,
  }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");

    // Focus the slider
    await sliderElement.focus();
    await expect(sliderElement).toBeFocused();

    // Check that the slider can lose focus
    await page.keyboard.press("Tab");
    await expect(sliderElement).not.toBeFocused();
  });

  test("slider value should stay within min/max bounds", async ({ page }) => {
    const sliderElement = page.getByTestId("preview").getByRole("slider");

    await sliderElement.focus();

    // Go to minimum
    await page.keyboard.press("Home");
    expect(await getSliderValue(page)).toBe(0);

    // Try to go below minimum
    await page.keyboard.press("ArrowLeft");
    expect(await getSliderValue(page)).toBe(0); // Should stay at minimum

    // Go to maximum
    await page.keyboard.press("End");
    expect(await getSliderValue(page)).toBe(100);

    // Try to go above maximum
    await page.keyboard.press("ArrowRight");
    expect(await getSliderValue(page)).toBe(100); // Should stay at maximum
  });
});
