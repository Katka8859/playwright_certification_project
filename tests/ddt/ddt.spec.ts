import accountAmountData from "../../../playwright_certification_project/src/assets/ddt/account_amount_data.json";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";
import { UserApi } from "../../src/api/user_api.ts";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page.ts";

test.describe("Create an accounts with account balances from account_amount_data.json", () => {
  const username = faker.internet.username();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const runnableData = accountAmountData.filter(
    (filter) => filter.run === true
  );

  runnableData.forEach((accountdata, index) => {
    test(`${index + 1} DDT: Create Account type: ${
      accountdata.description
    }`, async ({ request, page }) => {
      const loginPage = new LoginPage(page);

      await loginPage
        .openTegBLoginPage()
        .then((register) => register.clickRegisterUser())
        .then((register) =>
          register.registerNewUser(username, password, email)
        );

      const userApi = new UserApi(request);
      const loginResponse = await userApi.loginUser(username, password);
      expect(loginResponse.status(), "Login Response Status is 201").toBe(201);

      const loginResponseBody = await loginResponse.json();
      const accessToken = loginResponseBody.access_token;

      const createAccount = await userApi.createAccount(
        accessToken,
        accountdata.start_balance,
        accountdata.type
      );

      expect(createAccount.status(), "Created account has response 201").toBe(
        201
      );
      await loginPage.loginUser(username, password);

      const dashBoardPage = new DashboardPage(page);
      const expectedBalance = `${Number(accountdata.start_balance).toFixed(
        2
      )} Kč`;
      await expect(dashBoardPage.accountBalance).toHaveText(expectedBalance);
      await expect(dashBoardPage.accountType).toHaveText(accountdata.type);
    });
  });
});
