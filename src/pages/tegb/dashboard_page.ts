import { Locator, Page, expect } from "@playwright/test";
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
  readonly profileDetailsForm: Locator;
  readonly profileDetailsTitle: Locator;
  readonly profileDetailName: Locator;
  readonly profileDetailSurname: Locator;
  readonly profileDetailEmail: Locator;
  readonly profileDetailPhone: Locator;
  readonly profileDetailAge: Locator;
  readonly editProfileButton: Locator;
  readonly profileDetailColumn: Locator;
  readonly accountsTitle: Locator;
  readonly accountNumberHeading: Locator;
  readonly accountBalanceHeading: Locator;
  readonly accountTypeHeading: Locator;
  readonly accountNumber: Locator;
  readonly accountBalance: Locator;
  readonly accountType: Locator;
  readonly createAccountButton: Locator;
  readonly profileDetailNameInput: Locator;
  readonly profileDetailSurnameInput: Locator;
  readonly profileDetailEmailInput: Locator;
  readonly profileDetailPhoneInput: Locator;
  readonly profileDetailAgeInput: Locator;
  readonly profileDetailSaveChangesButton: Locator;
  readonly succesfullProfileUpdateMessage: Locator;

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
    this.accountNumberHeading = page.locator(
      "//th[@data-testid='account-number-heading']"
    );
    this.accountBalanceHeading = page.locator(
      "//th[@data-testid='account-balance-heading']"
    );
    this.accountTypeHeading = page.locator(
      "//th[@data-testid='account-type-heading']"
    );
    this.accountNumber = page.locator("//td[@data-testid='account-number']");
    this.accountBalance = page.locator("//td[@data-testid='account-balance']");
    this.accountType = page.locator("//td[@data-testid='account-type']");
    this.createAccountButton = page.locator(
      "//button[@class='account-action']"
    );
    this.profileDetailNameInput = page.locator(
      "//input[@data-testid='chage-name-input']"
    );
    this.profileDetailSurnameInput = page.locator(
      "//input[@data-testid='chage-surname-input']"
    );
    this.profileDetailEmailInput = page.locator(
      "//input[@data-testid='chage-email-input']"
    );
    this.profileDetailPhoneInput = page.locator(
      "//input[@data-testid='chage-phone-input']"
    );
    this.profileDetailAgeInput = page.locator(
      "//input[@data-testid='chage-age-input']"
    );
    this.profileDetailSaveChangesButton = page.locator(
      "//button[@data-testid='save-changes-button']"
    );
    this.succesfullProfileUpdateMessage = page.locator(
      "//div[@class='update-message']"
    );
    this.profileDetailsForm = page.locator("//form");
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
    await expect(this.profileDetailsForm).toBeEnabled();
    await expect(this.createAccountButton).toBeVisible();
    return this;
  }

  async fillNameInProfileDetails(name: string): Promise<DashboardPage> {
    await this.profileDetailNameInput.fill(name);
    return this;
  }

  async fillSurnameInProfileDetails(surname: string): Promise<DashboardPage> {
    await this.profileDetailSurnameInput.fill(surname);
    return this;
  }

  async fillEmailInProfileDetails(email: string): Promise<DashboardPage> {
    await this.profileDetailEmailInput.fill(email);
    return this;
  }

  async fillPhoneInProfileDetails(phone: string): Promise<DashboardPage> {
    await this.profileDetailPhoneInput.fill(phone);
    return this;
  }

  async fillAgeInProfileDetails(age: number): Promise<DashboardPage> {
    await this.profileDetailAgeInput.fill(String(age));
    return this;
  }

  async clickSaveChangesInProfileDetails(): Promise<DashboardPage> {
    await this.profileDetailSaveChangesButton.click();
    return this;
  }

  async clickCreateAccount(): Promise<DashboardPage> {
    await this.createAccountButton.click();
    return this;
  }
}
