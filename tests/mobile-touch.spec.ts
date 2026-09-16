import { test, expect, devices } from "@playwright/test";
test.use({
  ...devices["iPhone 13"],
  browserName: process.env.MOBILE_WEBKIT ? "webkit" : "chromium",
  channel: process.env.MOBILE_WEBKIT ? "" : "chrome",
});
for (const target of [".enter-link", ".inline-ad .ad-action"]) {
  test(`スマホでタップして演出が完了する ${target}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(process.env.MOBILE_TEST_URL || "/");
    const button = page.locator(target).first();
    await button.scrollIntoViewIfNeeded();
    await button.tap();
    await expect(button).toBeDisabled();
    await expect(page.locator(".storm-popup").first()).toBeVisible();
    await expect(page.locator(".release-page")).toBeVisible({ timeout: 15000 });
    expect(errors).toEqual([]);
  });
}
