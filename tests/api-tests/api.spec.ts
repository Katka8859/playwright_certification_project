import { test, expect } from "@playwright/test";
import { UserApi } from "../../src/api/user_api.ts";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test("Login user by api and checking his token", async ({ request }) => {
  const username = process.env.TEGB_USERNAME as string;
  const password = process.env.TEGB_PASSWORD as string;
  const userApi = new UserApi(request);

  const loginResponse = await userApi.loginUser(username, password);
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

//verze vypracování číslo 2: S registrací a přihlášením nově registrovaného uživatele
test("Register and Login new user by api", async ({ request }) => {
  const username = faker.internet.username();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const userApi = new UserApi(request);

  const registerResponse = await userApi.registerUser(
    username,
    password,
    email
  );
  expect(registerResponse.status(), "Register response status is 201").toBe(
    201
  );
  expect(
    registerResponse.statusText(),
    "Register response have status text Created"
  ).toBe("Created");

  const loginResponse = await userApi.loginUser(username, password);
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
