import { test, expect } from "@playwright/test";
import { UserApi } from "../../src/api/user_api.ts";

test("Create account by api", async ({ request }) => {
  const userApi = new UserApi(request);

  const loginResponse = await userApi.loginUser("km_user", "katka1234");

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
        startBalance: 666,
        type: "test",
      },
    }
  );

  expect(createAccount.status(), "Created account has response 201").toBe(201);
});
