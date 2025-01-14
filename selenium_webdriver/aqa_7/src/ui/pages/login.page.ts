import { SALES_PORTAL_URL } from "../../config/environment";
import { IUICredentials as ICredentials } from "../../data/types/login.types";
import { SalesPortalPage } from "./salesPortal.page";

class LoginPage extends SalesPortalPage {
    readonly ['Email input'] = '#emailinput'
    readonly ['Password input'] = '#passwordinput'
    readonly ['Login Button'] = 'button[type="submit"]'

    async waitForPageOpened(){
        await this.waitForDisplayed(this['Login Button'])
    }

    async fillCredentials(credentials: ICredentials){
        credentials.email && (await this.setValue(this['Email input'], credentials.email))
        credentials.password && (await this.setValue(this['Password input'], credentials.password))
    }

    async clickOnLoginButton(){
        await this.click(this['Login Button'])
    }

    async open(){
        await this.openPage(SALES_PORTAL_URL)
    }
} 

export default new LoginPage()
