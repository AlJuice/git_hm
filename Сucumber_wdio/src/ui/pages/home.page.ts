import { MenuItemNames } from "../../data/types/home.types";
import { SalesPortalPage } from "./salesPortal.page";
// setTimeout(function() {debugger;}, 0) 

class HomePage extends SalesPortalPage {
  readonly ["Menu Button"] = (menuItemName: MenuItemNames) => `[name="${menuItemName}"]`;
  readonly ["Welcome label"] = ".welcome-text";
  readonly ["Logged User label"] = "#dropdownUser1";
  readonly ["Products button"] = `[name="Products"]`;

  async clickOnMenuButton(menuItemName: MenuItemNames) {
    await this.click(this["Menu Button"](menuItemName));
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForSpinnersToBeHidden("Home");
    await this.waitForDisplayed(this["Welcome label"]);
  }
}

export default new HomePage();
