import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Dialog Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dialogs");
  });

  const button = (page: Page, name: string) =>
    page.getByRole("button", { name, exact: true });
  const status = (page: Page) => page.getByText(/^Project:/);

  async function press(page: Page, name: string) {
    await button(page, name).focus();
    await page.keyboard.press("Enter");
  }

  test("a dialog is named by its title and closes with a value", async ({
    page,
  }) => {
    await press(page, "Discard draft");
    const dialog = page.getByRole("dialog", { name: "Discard draft?" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading")).toHaveText("Discard draft?");
    await dialog.getByRole("button", { name: "Discard" }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText("Discarded")).toBeVisible();
  });

  test("confirm is described by its message, focuses OK and returns focus", async ({
    page,
  }) => {
    await press(page, "Delete");
    const dialog = page.getByRole("dialog", { name: "Delete project?" });
    await expect(dialog).toHaveAccessibleDescription(
      "Quarterly plan and its tasks will be deleted for everyone.",
    );
    await expect(dialog.getByRole("button", { name: "Delete" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect(status(page)).toHaveText(
      "Project: Quarterly plan · Deleted Quarterly plan",
    );
    await expect(button(page, "Delete")).toBeFocused();
  });

  test("dismissing confirm resolves false", async ({ page }) => {
    await press(page, "Delete");
    const dialog = page.getByRole("dialog", { name: "Delete project?" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(status(page)).toHaveText("Project: Quarterly plan · Kept");
    await expect(button(page, "Delete")).toBeFocused();
  });

  test("clicking the backdrop dismisses a dialog", async ({ page }) => {
    await press(page, "Delete");
    const dialog = page.getByRole("dialog", { name: "Delete project?" });
    await expect(dialog).toBeVisible();
    const box = (await dialog.boundingBox())!;
    await page.mouse.click(box.x / 2, box.y / 2);
    await expect(dialog).toBeHidden();
    await expect(status(page)).toHaveText("Project: Quarterly plan · Kept");
  });

  test("Enter submits a prompt, and its field's validation applies", async ({
    page,
  }) => {
    await press(page, "Rename");
    const dialog = page.getByRole("dialog", { name: "Rename project" });
    const field = dialog.getByRole("textbox", { name: "Name" });
    await expect(field).toBeFocused();
    await expect(field).toHaveValue("Quarterly plan");
    await field.fill("");
    await page.keyboard.press("Enter");
    await expect(dialog).toBeVisible();
    await field.fill("Roadmap");
    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect(status(page)).toHaveText("Project: Roadmap");
    await expect(button(page, "Rename")).toBeFocused();
  });

  test("alert closes with OK", async ({ page }) => {
    await press(page, "Share");
    const dialog = page.getByRole("dialog", { name: "Link copied" });
    await expect(dialog.getByRole("button", { name: "OK" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect(status(page)).toHaveText("Project: Quarterly plan · Shared");
  });

  test("show resolves with the chosen value, or undefined when dismissed", async ({
    page,
  }) => {
    await press(page, "Ship order");
    const dialog = page.getByRole("dialog", { name: "Choose shipping" });
    await expect(dialog.getByRole("button", { name: "Express" })).toBeFocused();
    await dialog.getByRole("button", { name: "Standard" }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText("Shipping: standard")).toBeVisible();

    await press(page, "Ship order");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByText("Shipping: not chosen")).toBeVisible();
  });

  test("requests made while a dialog is open wait their turn", async ({
    page,
  }) => {
    await press(page, "Share");
    const alert = page.getByRole("dialog", { name: "Link copied" });
    await expect(alert).toBeVisible();
    await button(page, "Delete").dispatchEvent("click");
    await expect(alert).toBeVisible();
    await page.keyboard.press("Enter");
    const confirm = page.getByRole("dialog", { name: "Delete project?" });
    await expect(confirm.getByRole("button", { name: "Delete" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(confirm).toBeHidden();
    await expect(status(page)).toHaveText("Project: Quarterly plan · Kept");
  });

  test("closing nested dialogs together returns focus to the first opener", async ({
    page,
  }) => {
    await press(page, "Edit profile");
    const profile = page.getByRole("dialog", { name: "Edit profile" });
    await profile.getByRole("textbox", { name: "Name" }).fill("Grace Hopper");
    await profile.getByRole("button", { name: "Cancel" }).click();
    const discard = page.getByRole("dialog", { name: "Discard changes?" });
    await discard.getByRole("button", { name: "Discard" }).click();
    await expect(discard).toBeHidden();
    await expect(profile).toBeHidden();
    await expect(page.getByText("Name: Ada Lovelace")).toBeVisible();
    await expect(button(page, "Edit profile")).toBeFocused();
  });

  test("closing a nested dialog returns focus inside the first", async ({
    page,
  }) => {
    await press(page, "Edit profile");
    const profile = page.getByRole("dialog", { name: "Edit profile" });
    await profile.getByRole("textbox", { name: "Name" }).fill("Grace Hopper");
    const cancel = profile.getByRole("button", { name: "Cancel" });
    await cancel.focus();
    await page.keyboard.press("Enter");
    const discard = page.getByRole("dialog", { name: "Discard changes?" });
    await expect(discard).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(discard).toBeHidden();
    await expect(profile).toBeVisible();
    await expect(cancel).toBeFocused();
  });

  test("a form in a dialog submits from its actions", async ({ page }) => {
    await press(page, "Edit profile");
    const profile = page.getByRole("dialog", { name: "Edit profile" });
    await profile.getByRole("textbox", { name: "Name" }).fill("Grace Hopper");
    await page.keyboard.press("Enter");
    await expect(profile).toBeHidden();
    await expect(page.getByText("Name: Grace Hopper")).toBeVisible();
  });
});
