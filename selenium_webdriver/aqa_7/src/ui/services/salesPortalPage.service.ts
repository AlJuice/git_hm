import { GetTextMethod } from "../../data/types/base.types";
import { logStep } from "../../utils/reporter/decorator";
import loginPage from "../pages/login.page";

export abstract class SalesPortalPageService {
    private basePage = loginPage;

    @logStep("Validate Notification")
    async validateNotification(text: string, method: GetTextMethod = "with") {
      const notification = await this.basePage.getNotificationText(text, method);
      expect(notification).toBe(text);
      await this.basePage.closeNotification();
    }
  
    @logStep("Log out")
    async signOut() {
      await this.basePage.deleteCookies(["Authorization"]);
    }

    async getToken(){
      const token = await this.basePage.getCookie('Authorization')
      return token.value
    }
  }
