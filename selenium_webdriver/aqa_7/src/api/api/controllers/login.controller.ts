
import { apiConfig } from "../../../config/apiConfig";
import { IRequestOptions, IResponseFields } from "../../../data/types/api.types";
import { IAPICredentials as ICredentials} from "../../../data/types/login.types";
import { logStep } from "../../../utils/reporter/decorator";
import { AxiosApiClient } from "../apiClients/axios.apiClient";

class LoginController {
  constructor(private apiClient = new AxiosApiClient()) {}

  @logStep("Login via API")
  async login(credentials: ICredentials) {
    const options: IRequestOptions = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: credentials,
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Login,
    };
    return await this.apiClient.send<IResponseFields>(options);
  }
}
export default new LoginController();