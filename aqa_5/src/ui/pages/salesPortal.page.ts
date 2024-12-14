import { GetTextMethod } from "../../data/types/base.types";
import { BasePage } from "./base.page";

export abstract class SalesPortalPage extends BasePage {
    readonly ["Notification container"] = "div.toast-container";
    readonly Notification = `${this["Notification container"]} .toast-body`;
    readonly Spinner = ".spinner-border";
    readonly ['Close Notification Button'] = 'button[title="Close"]'


    abstract waitForPageOpened(): Promise<void>
    
    async getNotificationByText(text: string, method: GetTextMethod = "with") {
      let notification: WebdriverIO.Element | undefined;
      await browser.waitUntil(
        async () => {
          const notifications = await this.findElements(this.Notification);
          const foundNotification = await notifications.find<WebdriverIO.Element>(async (n) => {
            const notificationText = await n.getText();
            return method === "contains" ? notificationText.includes(text) : notificationText === text;
          });
          if (foundNotification) {
            notification = foundNotification;
          }
          return foundNotification;
        },
        {
          timeout: 10000,
          timeoutMsg: `Notification ${method} text ${text} not found`,
        }
      );
      if (!notification) throw notification;
      return notification;
    }
  
    async getNotificationText(text: string, method: GetTextMethod = "with") {
      const notification = await this.getNotificationByText(text, method);
      return await notification.getText();
    }

    async closeNotification(){
      await this.waitForDisplayed(this['Close Notification Button'])
      await this.click(this['Close Notification Button'])
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