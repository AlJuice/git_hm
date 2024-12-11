import { BasePage } from "../pages/base.page";

export abstract class SalesPortalPage extends BasePage {
    readonly Notification = ".toast-body";
    readonly Spinner = ".spinner-border";

    abstract waitForPageOpened(): Promise<void>
    
    async getNotificationText(){
        await this.waitForDisplayed(this.Notification)
        return await this.getText(this.Notification)
    }

    async waitForSpinnersToBeHidden(page: string){
        const spinners = await this.findElements(this.Spinner)
        await browser.waitUntil(async () => {
            return await spinners.every(async (spinner) => !(await spinner.isDisplayed()))
        },
        { 
            timeout: 30000, 
            timeoutMsg: `Spinners hadn't disappeared in 30 sec on ${page} Page`,
        })
    }
}