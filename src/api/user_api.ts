import { APIRequestContext } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl = "https://tegb-backend-877a0b063d29.herokuapp.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async loginUser(username: string, password: string) {
    const response = this.request.post(`${this.apiUrl}/tegb/login`, {
      data: {
        username,
        password,
      },
    });
    return response;
  }

  async registerUser(username: string, password: string, email: string) {
    const response = this.request.post(`${this.apiUrl}/tegb/register`, {
      data: {
        username,
        password,
        email,
      },
    });
    return response;
  }
}
