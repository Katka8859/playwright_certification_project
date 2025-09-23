import { Locator, Page, test } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { RegisterPage } from "./register_page.ts";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgottenPasswordButton: Locator;
  readonly registerButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@data-testid='username-input']");
    this.passwordInput = page.locator("//input[@data-testid='password-input']");
    this.loginButton = page.locator("//button[@data-testid='submit-button']");
    this.forgottenPasswordButton = page.locator(
      "//button[@data-testid='registration-link']"
    );
    this.registerButton = page.locator(
      "//button[@data-testid='register-button']"
    );
    this.pageTitle = page.locator("//h1[@class='title']");
  }

  async openTegBLoginPage(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin(): Promise<DashboardPage> {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async loginUser(username: string, password: string): Promise<DashboardPage> {
    await test.step("Login to TEGB", async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLogin();
    });

    return new DashboardPage(this.page);
  }

  async clickRegisterUser(): Promise<RegisterPage> {
    await this.registerButton.click();
    return new RegisterPage(this.page);
  }
}
