import { Locator, Page, test, expect } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { LoginPage } from "./login_page.ts";

export class RegisterPage {
  readonly page: Page;
  readonly registerUsernameInput: Locator;
  readonly registerPasswordInput: Locator;
  readonly emailInput: Locator;
  readonly registerButton: Locator;
  readonly backToLoginButton: Locator;
  readonly registerSuccess: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerUsernameInput = page.locator(
      "//input[@data-testid='username-input']"
    );
    this.registerPasswordInput = page.locator(
      "//input[@data-testid='password-input']"
    );
    this.emailInput = page.locator("//input[@data-testid='email-input']");
    this.registerButton = page.locator(
      "//button[@data-testid='submit-button']"
    );
    this.backToLoginButton = page.locator("//button[@class='link-button']");
    this.registerSuccess = page.locator("//div[@class='success-message']");
  }

  async fillRegisterUsername(username: string): Promise<this> {
    await this.registerUsernameInput.fill(username);
    return this;
  }

  async fillRegisterPassword(password: string): Promise<this> {
    await this.registerPasswordInput.fill(password);
    return this;
  }

  async fillEmail(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  async clickRegister(): Promise<DashboardPage> {
    await this.registerButton.click();
    return new DashboardPage(this.page);
  }

  async registerNewUser(
    username: string,
    password: string,
    email: string
  ): Promise<LoginPage> {
    await test.step("Register new user to TEGB", async () => {
      await this.fillRegisterUsername(username);
      await this.fillRegisterPassword(password);
      await this.fillEmail(email);
      await this.clickRegister();
      await expect(this.registerSuccess).toHaveText(
        "🎉 Registrace úspěšná! Vítejte v TEG#B! 🎉",
        { timeout: 5000 }
      );
    });

    return new LoginPage(this.page);
  }

  async clickBackToLogin(): Promise<LoginPage> {
    await this.backToLoginButton.click();
    return new LoginPage(this.page);
  }
}
