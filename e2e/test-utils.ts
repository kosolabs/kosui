import { expect, type Page } from "@playwright/test";

export const gotoComponent = async (page: Page, component: string) => {
  await page.goto(`/${component.toLowerCase()}`);
  //   await page.goto("/");
  //   await page.getByRole("link", { name: component }).click();
  //   await page.waitForURL(`**/${component.toLowerCase()}`);
  await page.waitForSelector("body.hydrated", { timeout: 6000 });
  await expect(
    page.getByRole("heading", { name: component }).first(),
  ).toBeVisible();
};
