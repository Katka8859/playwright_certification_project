import { test, expect } from "@playwright/test";
import { UserApi } from "../../src/api/user_api.ts";

// TODO schování přihlašovacích údajů

test("Login user by api and checking his token", async ({ request }) => {
  const userApi = new UserApi(request);

  const loginResponse = await userApi.loginUser("km_api", "123456");
  expect(loginResponse.status(), "Login response status is 201").toBe(201);

  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;
  expect(
    accessToken,
    "Login Response body.access_token is defined"
  ).toBeDefined();
  expect(
    typeof loginResponseBody.access_token,
    "Login Response body.access_token is a String"
  ).toBe("string");
});
