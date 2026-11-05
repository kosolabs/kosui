import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Command Palette Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, "platform", {
        get: () => "MacIntel",
      });
    });
    await page.goto("/command");
  });

  const opener = (page: Page) =>
    page.getByRole("button", { name: "Open command palette" });
  const palette = (page: Page) =>
    page.getByRole("dialog", { name: "Command palette" });
  const search = (page: Page) =>
    palette(page).getByRole("combobox", { name: "Search commands" });
  const status = (page: Page) => page.getByText(/^Theme: (light|dark)/);

  async function open(page: Page) {
    await opener(page).focus();
    await page.keyboard.press("Enter");
    await expect(search(page)).toBeFocused();
  }

  async function highlighted(page: Page) {
    const id = await search(page).getAttribute("aria-activedescendant");
    return page.locator(`[id="${id}"]`);
  }

  test("the palette is a named dialog with a combobox and listbox", async ({
    page,
  }) => {
    await open(page);
    await expect(palette(page)).toMatchAriaSnapshot(`
      - dialog "Command palette":
        - combobox "Search commands" [expanded]
        - listbox "Command palette":
          - 'option "View: Command palette Command+K" [selected]'
          - 'option "Share: Copy link Option+L"'
          - 'option "Help: Keyboard shortcuts Shift+?"'
          - 'option "Theme: Light" [checked]'
          - 'option "Theme: Dark"'
    `);
  });

  test("disabled actions are left out", async ({ page }) => {
    await open(page);
    await page.keyboard.type("paste");
    await expect(page.getByRole("option")).toHaveCount(0);
    await expect(page.getByRole("status")).toHaveText("No matching commands");
  });

  test("typing filters, arrows move the highlight and Enter runs it", async ({
    page,
  }) => {
    await open(page);
    await page.keyboard.type("theme");
    await expect(page.getByRole("option")).toHaveCount(2);
    await expect(await highlighted(page)).toHaveText("Theme: Light");
    await page.keyboard.press("ArrowDown");
    await expect(await highlighted(page)).toHaveText("Theme: Dark");
    await page.keyboard.press("ArrowDown");
    await expect(await highlighted(page)).toHaveText("Theme: Light");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    await expect(palette(page)).toBeHidden();
    await expect(status(page)).toHaveText("Theme: dark");
    await expect(opener(page)).toBeFocused();
  });

  test("clicking an action runs it", async ({ page }) => {
    await open(page);
    await page.getByRole("option", { name: /Copy link/ }).click();
    await expect(palette(page)).toBeHidden();
    await expect(status(page)).toHaveText("Theme: light · Copied link");
  });

  test("Escape closes the palette, clears the search and returns focus", async ({
    page,
  }) => {
    await open(page);
    await page.keyboard.type("dark");
    await page.keyboard.press("Escape");
    await expect(palette(page)).toBeHidden();
    await expect(opener(page)).toBeFocused();
    await open(page);
    await expect(search(page)).toHaveValue("");
  });

  test("shortcuts run actions, including one that opens the palette", async ({
    page,
  }) => {
    await opener(page).focus();
    await page.keyboard.press("Alt+l");
    await expect(status(page)).toHaveText("Theme: light · Copied link");
    await page.keyboard.press("Shift+?");
    await expect(status(page)).toHaveText("Theme: light · Showed shortcuts");
    await page.keyboard.press("Meta+k");
    await expect(search(page)).toBeFocused();
  });

  test("shortcuts don't run while the palette is open", async ({ page }) => {
    await open(page);
    await page.keyboard.press("Alt+l");
    await page.keyboard.press("Escape");
    await expect(status(page)).toHaveText("Theme: light");
  });

  test("single-key shortcuts don't run while typing in a field", async ({
    page,
  }) => {
    const notes = page.getByRole("textbox", { name: "Notes" });
    await notes.click();
    await page.keyboard.press("Shift+?");
    await expect(notes).toHaveValue("?");
    await expect(status(page)).toHaveText("Theme: light");
    await page.keyboard.press("Alt+l");
    await expect(status(page)).toHaveText("Theme: light · Copied link");
  });

  test("actions registered in an effect come and go with it", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Show archive" }).click();
    await page.getByRole("button", { name: "Commands", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog.getByRole("option")).toHaveText([
      "File: Archive",
      "File: New file",
      "Edit: Find",
    ]);
    await page.keyboard.type("arch");
    await page.keyboard.press("Enter");
    await expect(page.getByText("Archived", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Hide archive" }).click();
    await page.getByRole("button", { name: "Commands", exact: true }).click();
    await expect(dialog.getByRole("option")).toHaveText([
      "File: New file",
      "Edit: Find",
    ]);
  });
});
