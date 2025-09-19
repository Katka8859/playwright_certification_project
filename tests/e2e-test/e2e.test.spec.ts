import { test, expect } from "@playwright/test";
import { UserApi } from "../../src/api/user_api.ts";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { RegisterPage } from "../../src/pages/tegb/register_page.ts";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page.ts";

test.describe("E2E test", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openTegBLoginPage();
  });

  test("Register user, create account, login user, edit profile, logout user -  tests", async ({
    page,
    request,
  }) => {
    const username = faker.internet.username();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.firstName("female");
    const surname = faker.person.lastName("female");
    const phone = faker.phone.number({ style: "international" });
    const age = faker.number.int({ min: 18, max: 100 });
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const dashBoardPage = new DashboardPage(page);

    await test.step("Register user", async () => {
      await loginPage
        .clickRegisterUser()
        .then((register) =>
          register.registerNewUser(username, password, email)
        );
      await expect(registerPage.registerSuccess).toHaveText(
        "🎉 Registrace úspěšná! Vítejte v TEG#B! 🎉"
      );
    });

    await test.step("Create account by api", async () => {
      const userApi = new UserApi(request);

      const loginResponse = await userApi.loginUser(username, password);
      expect(loginResponse.status(), "Login Response Status is 201").toBe(201);

      const loginResponseBody = await loginResponse.json();
      const accessToken = loginResponseBody.access_token;

      const createAccount = await request.post(
        "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            startBalance: 66666,
            type: "Credit",
          },
        }
      );
      expect(createAccount.status(), "Created account has response 201").toBe(
        201
      );
    });
    await test.step("Login new User", async () => {
      await loginPage.loginUser(username, password);
      await expect(dashBoardPage.logoutButton).toBeVisible();
    });

    await test.step("Checking the visibility of the created account", async () => {
      const userAccountNumber = dashBoardPage.accountNumber;
      await expect(userAccountNumber).toBeVisible();

      const userAccountBalance = dashBoardPage.accountBalance;
      await expect(userAccountBalance).toBeVisible();
      await expect(userAccountBalance).toHaveText("66666.00 Kč");

      const userAccountType = dashBoardPage.accountType;
      await expect(userAccountType).toHaveText("Credit");
    });

    await test.step("Edit user profile", async () => {
      await dashBoardPage.clickEditProfile();
      await expect(dashBoardPage.editProfileButton).toHaveText("Zrušit úpravy");
      await expect(dashBoardPage.profileDetailSaveChangesButton).toHaveText(
        "Uložit změny"
      );
      await dashBoardPage
        .fillNameInProfileDetails(name)
        .then((profileDetail) =>
          profileDetail.fillSurnameInProfileDetails(surname)
        )
        .then((profileDetail) => profileDetail.fillEmailInProfileDetails(email))
        .then((profileDetail) => profileDetail.fillPhoneInProfileDetails(phone))
        .then((profileDetail) => profileDetail.fillAgeInProfileDetails(age))
        .then((profileDetail) =>
          profileDetail.clickSaveChangesInProfileDetails()
        );
      await expect(dashBoardPage.profileDetailName).toHaveText(
        `Jméno: ${name}`
      );
      await expect(dashBoardPage.profileDetailSurname).toHaveText(
        `Příjmení: ${surname}`
      );
      await expect(dashBoardPage.profileDetailEmail).toHaveText(
        `Email: ${email}`
      );
      await expect(dashBoardPage.profileDetailPhone).toHaveText(
        `Telefon: ${phone}`
      );
      await expect(dashBoardPage.profileDetailAge).toHaveText(`Věk: ${age}`);
      await expect(dashBoardPage.succesfullProfileUpdateMessage).toHaveText(
        "Profile updated successfully!"
      );
    });

    await test.step("Logout user", async () => {
      const logout = await dashBoardPage.clickLogout();
      await expect(logout.loginButton).toBeVisible();
    });
  });
});
