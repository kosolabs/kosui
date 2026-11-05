import { expect, test, type Locator } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

function pagePosition(control: Locator) {
  return control.evaluate(async (el) => {
    await document.fonts.ready;
    const scroller = el.closest("main")!;
    const rect = el.getBoundingClientRect();
    const origin = scroller.getBoundingClientRect();
    return {
      x: Math.round(rect.x - origin.x + scroller.scrollLeft),
      y: Math.round(rect.y - origin.y + scroller.scrollTop),
    };
  });
}

async function expectToStayPut(control: Locator, use: () => Promise<void>) {
  const before = await pagePosition(control);
  await use();
  await expect.poll(() => pagePosition(control)).toEqual(before);
}

async function expectCentered(control: Locator) {
  const offset = await control.evaluate(async (el) => {
    await document.fonts.ready;
    const example = el.closest('[data-testid="example"]')!;
    const center = (rect: DOMRect) => rect.x + rect.width / 2;
    return (
      center(el.getBoundingClientRect()) -
      center(example.getBoundingClientRect())
    );
  });
  expect(Math.abs(offset)).toBeLessThan(1);
}

test.describe("Example Layout Tests", () => {
  test("Modal's buttons stay put when their status changes", async ({
    page,
  }) => {
    await page.goto("/modal");
    const showTerms = page.getByRole("button", { name: "Show terms" });
    await expectToStayPut(showTerms, async () => {
      await showTerms.click();
      await page.keyboard.press("Escape");
      await expect(page.getByText("Dismissed", { exact: true })).toBeVisible();
    });

    const rename = page.getByRole("button", { name: "Rename" });
    await expectToStayPut(rename, async () => {
      await rename.click();
      await page
        .getByRole("textbox", { name: "Name" })
        .fill("A much longer project name");
      await page.keyboard.press("Enter");
      await expect(
        page.getByText("Project: A much longer project name"),
      ).toBeVisible();
    });
  });

  test("Toggle Group's examples center their groups", async ({ page }) => {
    await page.goto("/toggles");
    for (const name of ["Theme", "Text alignment"]) {
      await expectCentered(page.getByRole("radiogroup", { name }));
    }
  });
});
