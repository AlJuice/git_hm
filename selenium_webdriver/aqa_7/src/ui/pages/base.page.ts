import { logAction, logStep } from "../../utils/reporter/decorator";

export type ActionContext = {
    isSecretValue?: boolean;
};

export abstract class BasePage {
    async findElement(selector: string) {
        return $(selector)
    }

    async findElements(selector: string) {
        return await $$(selector).getElements()
    }

    async waitForDisplayed(selector: string, reverse = false, timeout = 30000){
        const element = await this.findElement(selector)
        await element.waitForDisplayed({ 
            reverse, 
            timeout
        })
        return element
    }

    @logAction("Click on element with selector {selector}")
    async click(selector: string) {
        const element = await this.waitForDisplayed(selector)
        await element.waitForEnabled()
        await element.click()
    }

    @logAction("Set {text} into element with selector {selector}")
    async setValue(selector: string, value: string | number){
        const input = await this.waitForDisplayed(selector)
        await input.setValue(value)
    }

    @logAction("Select dropdown value from {selector}")
    async selectDropdownValue(selector: string, value: string | number) {
        const select = await this.waitForDisplayed(selector)
        await select.selectByVisibleText(value)
    }

    @logStep("Get text from ${selector}")
    async getText(selector: string){
        const element = await this.waitForDisplayed(selector)
        return await element.getText()
    }

    @logStep("Open page")
    async openPage(url: string){
        await browser.url(url)
    }

    async deleteCookies(cookieNames: string[]) {
        await browser.deleteCookies(cookieNames);
    }

    async getCookie(cookieName: string){
       return (await browser.getCookies(cookieName))[0];
    }

    @logAction("get attribute from ${selector}")
    async getAttribute(selector: string, name: string) {
        const element = await this.waitForDisplayed(selector);
        const atribute = await element.getAttribute(name);
        return atribute;
    }

}