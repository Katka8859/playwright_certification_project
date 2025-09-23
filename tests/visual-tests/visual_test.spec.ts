import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";

test("Visual test - Profile detail box is filled", async ({ page }) => {
  const username = process.env.TEGB_USERNAME as string;
  const password = process.env.TEGB_PASSWORD as string;
  const loginPage = new LoginPage(page);

  await loginPage
    .openTegBLoginPage()
    .then((login) => login.loginUser(username, password))
    .then((dashboardPage) => dashboardPage.takeScreenshotOfProfiledetailBox());
});
