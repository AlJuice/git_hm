import { ICredentials } from "../../data/types/login.types";
import homePage from "../pages/home.page";
import loginPage from "../pages/login.page";
import { SalesPortalPageService } from "./salesPortalPage.service";

class LoginPageService extends SalesPortalPageService {
    private loginPage = loginPage
    private homePage = homePage

    async openSalesPortal(){
        await this.loginPage.open()
    }

    async login(credentials: ICredentials){
        await this.loginPage.fillCredentials(credentials)
        await this.loginPage.clickOnLoginButton()
        await this.homePage.waitForPageOpened()

    }

    async loginAsAdmin(){
        await this.login({
            email: "aqacourse@gmail.com",
            password: "password",
        })
    }
}
export default new LoginPageService();

