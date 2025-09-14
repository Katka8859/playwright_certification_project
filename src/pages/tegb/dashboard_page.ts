import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly pageLogo: Locator;
  readonly logoutButton: Locator;
  readonly sidebarNavigationHome: Locator;
  readonly sidebarNavigationAccounts: Locator;
  readonly sidebarNavigationTransactions: Locator;
  readonly sidebarNavigationSupport: Locator;
  readonly profileDetailsTitle: Locator;
  readonly profileDetailName: Locator;
  readonly profileDetailSurname: Locator;
  readonly profileDetailEmail: Locator;
  readonly profileDetailPhone: Locator;
  readonly profileDetailAge: Locator;
  readonly editProfileButton: Locator;
  readonly profileDetailColumn: Locator;
  readonly accountsTitle: Locator;
  readonly accountNumber: Locator;
  readonly accountBalance: Locator;
  readonly accountType: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.locator("//span[@class='app-title']");
    this.pageLogo = page.locator("//img[@alt='Tredgate Logo']");
    this.logoutButton = page.locator("//button[@class='logout-link']");
    this.sidebarNavigationHome = page.locator(
      "(//aside[@class='dashboard-sidebar']//li)[1]"
    );
    this.sidebarNavigationAccounts = page.locator(
      "(//aside[@class='dashboard-sidebar']//li)[2]"
    );
    this.sidebarNavigationTransactions = page.locator(
      "(//aside[@class='dashboard-sidebar']//li)[3]"
    );
    this.sidebarNavigationSupport = page.locator(
      "(//aside[@class='dashboard-sidebar']//li)[4]"
    );
    this.profileDetailsTitle = page.locator(
      "//h2[@data-testid='profile-details-title']"
    );
    this.profileDetailName = page.locator("//div[@data-testid='name']");
    this.profileDetailSurname = page.locator("//div[@data-testid='surname']");
    this.profileDetailEmail = page.locator("//div[@data-testid='email']");
    this.profileDetailPhone = page.locator("//div[@data-testid='phone']");
    this.profileDetailAge = page.locator("//div[@data-testid='age']");
    this.editProfileButton = page.locator(
      "//button[@data-testid='toggle-edit-profile-button']"
    );
    this.profileDetailColumn = page.locator("//div[@class='profile-detail']");
    this.accountsTitle = page.locator("//h2[@data-testid='accounts-title']");
    this.accountNumber = page.locator(
      "//th[@data-testid='account-number-heading']"
    );
    this.accountBalance = page.locator(
      "//th[@data-testid='account-balance-heading']"
    );
    this.accountType = page.locator(
      "//th[@data-testid='account-type-heading']"
    );
    this.createAccountButton = page.locator(
      "//button[@class='account-action']"
    );
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async clickAllMenuButtons(): Promise<DashboardPage> {
    for (let i = 1; i <= 4; i++) {
      await this.page
        .locator(`(//aside[@class='dashboard-sidebar']//li)[${i}]`)
        .click();
    }
    return this;
  }

  async clickEditProfile(): Promise<DashboardPage> {
    await this.editProfileButton.click();
    return this;
  }

  async clickCreateAccount(): Promise<DashboardPage> {
    await this.createAccountButton.click();
    return this;
  }
}
