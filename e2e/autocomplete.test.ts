import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Autocomplete Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/autocomplete");
  });

  const country = (page: Page) =>
    page.getByRole("combobox", { name: "Country" });
  const listbox = (page: Page) => page.getByRole("listbox");

  async function type(page: Page, text: string) {
    await country(page).click();
    await page.keyboard.type(text);
    await expect(listbox(page)).toBeVisible();
  }

  async function highlighted(page: Page) {
    const id = await country(page).getAttribute("aria-activedescendant");
    return id ? page.locator(`[id="${id}"]`).textContent() : undefined;
  }

  test("the field is a combobox that controls a listbox", async ({ page }) => {
    await expect(country(page)).toHaveAttribute("aria-expanded", "false");
    await type(page, "Sw");
    await expect(country(page)).toHaveAttribute("aria-expanded", "true");
    await expect(country(page)).toHaveAttribute(
      "aria-controls",
      (await listbox(page).getAttribute("id"))!,
    );
    await expect(listbox(page)).toMatchAriaSnapshot(`
      - listbox:
        - option "Sweden"
        - option "Switzerland"
    `);
  });

  test("arrow keys highlight options and wrap", async ({ page }) => {
    await type(page, "Sw");
    await expect(country(page)).not.toHaveAttribute("aria-activedescendant");
    await page.keyboard.press("ArrowDown");
    expect(await highlighted(page)).toBe("Sweden");
    await expect(page.getByRole("option", { name: "Sweden" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await page.keyboard.press("ArrowDown");
    expect(await highlighted(page)).toBe("Switzerland");
    await page.keyboard.press("ArrowDown");
    expect(await highlighted(page)).toBe("Sweden");
    await page.keyboard.press("ArrowUp");
    expect(await highlighted(page)).toBe("Switzerland");
  });

  test("Enter chooses the highlighted option and closes the list", async ({
    page,
  }) => {
    await type(page, "Sw");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    await expect(country(page)).toHaveValue("Switzerland");
    await expect(listbox(page)).toBeHidden();
    await expect(country(page)).toBeFocused();
    await expect(page.getByText("Chose Switzerland")).toBeVisible();
  });

  test("clicking an option chooses it and keeps focus in the field", async ({
    page,
  }) => {
    await type(page, "Sw");
    await page.getByRole("option", { name: "Sweden" }).click();
    await expect(country(page)).toHaveValue("Sweden");
    await expect(listbox(page)).toBeHidden();
    await expect(country(page)).toBeFocused();
  });

  test("Escape closes the list without changing the field", async ({
    page,
  }) => {
    await type(page, "Sw");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Escape");
    await expect(listbox(page)).toBeHidden();
    await expect(country(page)).toHaveValue("Sw");
    await expect(country(page)).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("ArrowDown");
    await expect(listbox(page)).toBeVisible();
    expect(await highlighted(page)).toBe("Sweden");
  });

  test("the list closes when nothing matches or the field loses focus", async ({
    page,
  }) => {
    await type(page, "Sw");
    await page.keyboard.type("x");
    await expect(listbox(page)).toBeHidden();
    await page.keyboard.press("Backspace");
    await expect(listbox(page)).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(listbox(page)).toBeHidden();
  });

  test("the list is as wide as the field", async ({ page }) => {
    await type(page, "Sw");
    await expect
      .poll(async () => {
        const [field, list] = await Promise.all([
          country(page).boundingBox(),
          listbox(page).boundingBox(),
        ]);
        return Math.round(list!.width - field!.width);
      })
      .toBe(0);
  });

  test("objects use their label and custom rendering", async ({ page }) => {
    const assignee = page.getByRole("combobox", { name: "Assignee" });
    await assignee.scrollIntoViewIfNeeded();
    await assignee.fill("hop");
    const option = page.getByRole("option", { name: /Grace Hopper/ });
    await expect(option).toContainText("grace@example.com");
    await assignee.press("ArrowDown");
    await assignee.press("Enter");
    await expect(assignee).toHaveValue("Grace Hopper");
    await expect(page.getByText("Assigned to grace@example.com")).toBeVisible();
  });

  test("Enter submits the form when nothing is highlighted", async ({
    page,
  }) => {
    const search = page.getByRole("combobox", { name: "Search countries" });
    await search.scrollIntoViewIfNeeded();
    await search.fill("land");
    await expect(listbox(page)).toBeVisible();
    await search.press("Enter");
    await expect(page.getByText("Searched for: land")).toBeVisible();
  });
});
