import { expect, test } from "@playwright/test";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page.ts";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";

test.describe("Atomic tests for user dashboard page", () => {
  let dashBoardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashBoardPage = await loginPage
      .openTegBLoginPage()
      .then((login) => login.loginUser("km_user", "katka1234"));
    //dashBoardPage = await loginPage.loginUser("km_user", "katka1234");
  });

  test("User Dashboard", async () => {
    await test.step("Header (Title, Logo, Logout button) tests", async () => {
      await expect.soft(dashBoardPage.dashboardTitle).toBeVisible();
      await expect
        .soft(dashBoardPage.dashboardTitle)
        .toHaveText("TEG#B Dashboard");
      await expect(dashBoardPage.pageLogo).toBeVisible();
      await expect(dashBoardPage.pageLogo).toHaveClass("logo"); //!
      await expect(dashBoardPage.logoutButton).toBeVisible();
      await expect.soft(dashBoardPage.logoutButton).toHaveText("Odhlásit se");
    });

    await test.step("Dashboard sidebar tests", async () => {
      await expect.soft(dashBoardPage.sidebarNavigationHome).toBeVisible();
      await expect.soft(dashBoardPage.sidebarNavigationHome).toHaveText("Domů");
      await expect.soft(dashBoardPage.sidebarNavigationAccounts).toBeVisible();
      await expect
        .soft(dashBoardPage.sidebarNavigationAccounts)
        .toHaveText("Účty");
      await expect
        .soft(dashBoardPage.sidebarNavigationTransactions)
        .toBeVisible();
      await expect
        .soft(dashBoardPage.sidebarNavigationTransactions)
        .toHaveText("Transakce");
      await expect.soft(dashBoardPage.sidebarNavigationSupport).toBeVisible();
      await expect
        .soft(dashBoardPage.sidebarNavigationSupport)
        .toHaveText("Podpora");
    });

    await test.step.skip(
      "Dashboard sidebar is clickable tests - will be implemented after development completed",
      async () => {
        await dashBoardPage.clickAllMenuButtons();
        // TODO: expect
      }
    );

    await test.step("User profile details tests", async () => {
      await expect.soft(dashBoardPage.profileDetailsTitle).toBeVisible();
      await expect
        .soft(dashBoardPage.profileDetailsTitle)
        .toHaveText("Detaily Profilu");
      await expect.soft(dashBoardPage.profileDetailName).toBeVisible();
      await expect
        .soft(dashBoardPage.profileDetailName)
        .toHaveText("Jméno: test");
      await expect.soft(dashBoardPage.profileDetailSurname).toBeVisible();
      await expect
        .soft(dashBoardPage.profileDetailSurname)
        .toHaveText("Příjmení: test");
      await expect.soft(dashBoardPage.profileDetailEmail).toBeVisible();
      await expect
        .soft(dashBoardPage.profileDetailEmail)
        .toHaveText("Email: N/A");
      await expect.soft(dashBoardPage.profileDetailPhone).toBeVisible();
      await expect
        .soft(dashBoardPage.profileDetailPhone)
        .toHaveText("Telefon: N/A");
      await expect.soft(dashBoardPage.profileDetailAge).toBeVisible();
      await expect.soft(dashBoardPage.profileDetailAge).toHaveText("Věk: 1");
      await expect.soft(dashBoardPage.profileDetailColumn).toHaveCount(5);
    });

    await test.step("User profile details - Edit profile button", async () => {
      await expect
        .soft(dashBoardPage.editProfileButton)
        .toHaveText("Upravit profil");
      await dashBoardPage.clickEditProfile();
      await expect
        .soft(dashBoardPage.editProfileButton)
        .toHaveText("Zrušit úpravy");
    });

    await test.step("Accounts details tests", async () => {
      await expect.soft(dashBoardPage.accountsTitle).toBeVisible();
      await expect.soft(dashBoardPage.accountsTitle).toHaveText("Účty");
      await expect.soft(dashBoardPage.accountNumberHeading).toBeVisible();
      await expect
        .soft(dashBoardPage.accountNumberHeading)
        .toHaveText("Číslo účtu");
      await expect.soft(dashBoardPage.accountBalanceHeading).toBeVisible();
      await expect
        .soft(dashBoardPage.accountBalanceHeading)
        .toHaveText("Zůstatek");
      await expect.soft(dashBoardPage.accountTypeHeading).toBeVisible();
      await expect
        .soft(dashBoardPage.accountTypeHeading)
        .toHaveText("Typ účtu");
      await expect.soft(dashBoardPage.accountNumber).toBeVisible();
      await expect.soft(dashBoardPage.accountNumber).toHaveText("1011566");
      await expect.soft(dashBoardPage.accountBalance).toBeVisible();
      await expect.soft(dashBoardPage.accountBalance).toHaveText("666.00 Kč");
      await expect.soft(dashBoardPage.accountType).toBeVisible();
      await expect.soft(dashBoardPage.accountType).toHaveText("test");
    });

    await test.step("Accounts - Create Accounts button tests", async () => {
      await expect.soft(dashBoardPage.createAccountButton).toBeVisible();
      await expect
        .soft(dashBoardPage.createAccountButton)
        .toHaveText("Přidat účet");
      await dashBoardPage.clickCreateAccount();
      // TODO: After fixing the button functionality on FE, add expect
    });

    await test.step("Logout button tests", async () => {
      await expect.soft(dashBoardPage.logoutButton).toBeVisible();
      await expect.soft(dashBoardPage.logoutButton).toHaveText("Odhlásit se");
      const logout = await dashBoardPage.clickLogout();
      await expect.soft(logout.pageTitle).toBeVisible();
    });
  });
});
