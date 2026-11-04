import { expect, test, type Locator, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Fab Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/fab");
  });

  const preview = (page: Page) => page.getByTestId("preview");
  const fab = (page: Page) =>
    preview(page).getByRole("button", { name: "New task" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();

  test("an icon-only fab is named by its tooltip", async ({ page }) => {
    await expect(fab(page)).toBeVisible();
    await expect(fab(page)).toHaveText("");
  });

  test("an icon-only fab without a tooltip is named by aria-label", async ({
    page,
  }) => {
    await page.getByRole("switch", { name: "Tooltip" }).click();
    await expect(fab(page)).toHaveAttribute("aria-label", "New task");
  });

  test("an extended fab is named by its label", async ({ page }) => {
    await choose(page, "Content", "both");
    await expect(fab(page)).toHaveText("New task");
  });

  test("fabs activate when enter is pressed", async ({ page }) => {
    await fab(page).focus();
    await page.keyboard.press("Enter");
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("fabs activate when space is pressed", async ({ page }) => {
    await fab(page).focus();
    await page.keyboard.press("Space");
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  const container = (page: Page) => preview(page).getByTestId("container");
  const gaps = async (fab: Locator, box: Locator) => {
    const f = (await fab.boundingBox())!;
    const b = (await box.boundingBox())!;
    return {
      right: Math.round(b.x + b.width - f.x - f.width),
      bottom: Math.round(b.y + b.height - f.y - f.height),
    };
  };

  test("a fab renders only its button", async ({ page }) => {
    await choose(page, "Container", "empty");
    await expect(container(page).locator("> *")).toHaveCount(1);
  });

  for (const option of ["empty", "tall", "wide", "block"]) {
    test(`a fab sits in the bottom corner of the "${option}" container`, async ({
      page,
    }) => {
      await choose(page, "Container", option);
      await expect
        .poll(() => gaps(fab(page), container(page)))
        .toEqual({ right: 8, bottom: 8 });
    });
  }

  test("a fab stays in the corner while its container scrolls", async ({
    page,
  }) => {
    const box = container(page);
    await box.evaluate((el) => el.scrollTo(0, el.scrollHeight / 3));
    expect(await gaps(fab(page), box)).toEqual({ right: 8, bottom: 8 });
  });

  for (const content of ["icon", "both"]) {
    test(`a fab with ${content} content stays in the corner while its container scrolls sideways`, async ({
      page,
    }) => {
      await choose(page, "Content", content);
      await choose(page, "Container", "wide");
      const box = container(page);
      for (const fraction of [0.5, 1]) {
        await box.evaluate(
          (el, f) => el.scrollTo(el.scrollWidth * f, el.scrollHeight * f),
          fraction,
        );
        await expect
          .poll(() => gaps(fab(page), box))
          .toEqual({ right: 8, bottom: 8 });
      }
    });
  }

  test("at the end of the content, a fab sits below the last item", async ({
    page,
  }) => {
    const list = page.getByRole("list", { name: "Tasks" });
    await list.evaluate((el) => {
      const scroller = el.parentElement!;
      scroller.scrollTo(0, scroller.scrollHeight);
    });
    const lastItem = (await list.getByRole("listitem").last().boundingBox())!;
    const placed = (await page
      .getByRole("main")
      .getByRole("button", { name: "New task" })
      .last()
      .boundingBox())!;
    expect(placed.y).toBeGreaterThanOrEqual(lastItem.y + lastItem.height);
  });
});
