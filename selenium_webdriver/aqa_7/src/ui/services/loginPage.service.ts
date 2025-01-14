import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../config/environment";
import { IUICredentials as ICredentials } from "../../data/types/login.types";
import { logStep } from "../../utils/reporter/decorator";
import homePage from "../pages/home.page";
import loginPage from "../pages/login.page";
import { SalesPortalPageService } from "./salesPortalPage.service";

class LoginPageService extends SalesPortalPageService {
    private loginPage = loginPage
    private homePage = homePage

    @logStep('Open Sales Portal')
    async openSalesPortal(){
        await this.loginPage.open()
    }

    @logStep('Login to Sales Portal')
    async login(credentials: ICredentials){
        await this.loginPage.fillCredentials(credentials)
        await this.loginPage.clickOnLoginButton()
        await this.homePage.waitForPageOpened()
    }

    @logStep('Login as Admin')
    async loginAsAdmin(){
        await this.login({
            email: ADMIN_USERNAME,
            password: ADMIN_PASSWORD,
        })
    }
}
export default new LoginPageService();

