import { BasePage } from "./base.page";

class LoginPage extends BasePage {
    readonly ['Email Selector'] = '#emailinput'
    readonly ['Password Selector'] = '#passwordinput'
    readonly ['Login Button Selector'] = 'button[type="submit"]'

    async fillCredentials(username?: string, password?: string){
        username && (await this.setValue(this['Email Selector'], username))
        password && (await this.setValue(this['Password Selector'], password))
    }

    async clickOnLoginButton(){
        await this.click(this['Login Button Selector'])
    }
} 

export default new LoginPage()
