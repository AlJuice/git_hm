import { STATUS_CODES } from "../../../data/api/statusCodes";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment";
import signInController from "../controllers/login.controller";
import { validateResponse } from "../../../utils/validation/apiValidation";

export class SignInApiService {
  private token: string | null = null;

  constructor(private controller = signInController) {}

  async signInAsAdmin() {
    const response = await this.controller.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    this.setToken(response.headers["authorization"]);
    return this.getToken();
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token as string;
  }

  removeToken() {
    this.token = null;
  }
}

